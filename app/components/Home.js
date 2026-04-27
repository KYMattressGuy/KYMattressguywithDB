"use client";

import { Q } from "@/lib/questions";
import { CATS, STORES, RANKS } from "@/lib/constants";
import { getRank } from "@/lib/utils";

export default function Home({ profile, streak, activeStore, onStoreChange, onQuiz }) {
  const xp = streak?.total_xp || 0;
  const rank = getRank(xp);
  const next = RANKS.find((r) => r.min > xp);
  const prog = next ? Math.round(((xp - rank.min) / (next.min - rank.min)) * 100) : 100;

  const currentStore = STORES.find((s) => s.id === activeStore) || STORES[0];
  const competitor = STORES.find((s) => s.id === currentStore.competitor);
  const storeIncludes = currentStore.includes || [activeStore];
  const maxDiff = rank.maxDifficulty || 5;

  const getCount = (catId) => {
    const qs = Q[catId] || [];
    return qs.filter(
      (q) => (!q.s || q.s.some((tag) => storeIncludes.includes(tag))) && (!q.d || q.d <= maxDiff)
    ).length;
  };
  const totalQ = Object.keys(Q).reduce((a, k) => a + getCount(k), 0);

  return (
    <div className="min-h-screen bg-surface safe-top">
      {/* Header */}
      <div className="bg-surface-dark px-5 pt-6 pb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-white text-xl font-bold">
              Hey, {profile?.full_name?.split(" ")[0]}! 👋
            </div>
            <div className="text-muted text-xs mt-0.5">
              {currentStore.label}
              {competitor && <> · <span className="text-accent">vs {competitor.label}</span></>}
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold text-sm">
            {profile?.full_name?.charAt(0)}
          </div>
        </div>

        {/* Store Toggle */}
        <div className="flex gap-1 bg-white/[0.04] rounded-xl p-1 mb-4">
          {STORES.map((s) => (
            <button
              key={s.id}
              onClick={() => onStoreChange(s.id)}
              className={`flex-1 py-2 rounded-lg border-none cursor-pointer text-[11px] font-medium transition-all flex items-center justify-center gap-1 ${
                activeStore === s.id
                  ? "bg-primary text-white shadow"
                  : "bg-transparent text-white/35 hover:text-white/55"
              }`}
            >
              <span>{s.icon}</span> {s.id}
            </button>
          ))}
        </div>

        {/* XP Card */}
        <div className="bg-surface-mid rounded-2xl p-4 border border-white/5">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">{rank.icon}</span>
              <div>
                <div className="text-white font-semibold text-sm">{rank.label}</div>
                <div className="text-muted text-[11px]">{xp} XP{next && ` · ${next.min - xp} to next`}</div>
              </div>
            </div>
            <div className="text-accent font-bold">{prog}%</div>
          </div>
          <div className="bg-white/5 rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-primary-light h-1.5 rounded-full transition-all duration-700" style={{ width: `${prog}%` }} />
          </div>
          <div className="flex justify-between mt-2 text-muted text-[11px]">
            <span>🔥 {streak?.current_streak || 0} streak</span>
            <span>📊 Lv 1–{maxDiff}</span>
            <span>📚 {totalQ} Qs</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 pt-4 pb-6">
        <div className="text-surface-dark font-semibold text-[15px] mb-3">Start Training</div>
        <div className="grid grid-cols-2 gap-2.5">
          {CATS.map((cat, i) => {
            const count = getCount(cat.id);
            const isCompetitive = cat.id === "competitive";
            const subtitle = isCompetitive && competitor ? `vs ${competitor.label}` : null;
            return (
              <button
                key={cat.id}
                onClick={() => onQuiz(cat)}
                className="p-4 bg-white border-none rounded-2xl cursor-pointer text-left shadow-sm active:shadow-none active:bg-slate-100 transition-all animate-slide-up"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-2" style={{ backgroundColor: `${cat.color}10` }}>
                  {cat.icon}
                </div>
                <div className="text-surface-dark font-semibold text-[13px] leading-snug">{cat.label}</div>
                {subtitle && <div className="text-accent text-[11px] font-medium mt-0.5">{subtitle}</div>}
                <div className="text-muted text-[11px] mt-0.5">{count} questions</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
