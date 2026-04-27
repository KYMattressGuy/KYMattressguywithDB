"use client";

import { Q } from "@/lib/questions";
import { CATS, STORES, RANKS } from "@/lib/constants";
import { getRank } from "@/lib/utils";

export default function Home({ profile, streak, activeStore, onStoreChange, onQuiz, onBoard, onManager, onSignOut }) {
  const xp = streak?.total_xp || 0;
  const rank = getRank(xp);
  const next = RANKS.find((r) => r.min > xp);
  const prog = next ? Math.round(((xp - rank.min) / (next.min - rank.min)) * 100) : 100;

  const currentStore = STORES.find((s) => s.id === activeStore) || STORES[0];
  const competitor = STORES.find((s) => s.id === currentStore.competitor);
  const storeIncludes = currentStore.includes || [activeStore];

  const getCount = (catId) => {
    const qs = Q[catId] || [];
    return qs.filter((q) => !q.s || q.s.some((tag) => storeIncludes.includes(tag))).length;
  };
  const totalQ = Object.keys(Q).reduce((a, k) => a + getCount(k), 0);

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="bg-surface-dark px-5 pt-5 pb-7">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center text-lg">🎓</div>
            <div>
              <div className="text-white font-semibold text-sm">RetailSleep Academy</div>
            </div>
          </div>
          <button onClick={onSignOut} className="text-muted text-xs hover:text-white transition px-3 py-1.5 rounded-lg hover:bg-white/5 border-none bg-transparent cursor-pointer">
            Sign Out
          </button>
        </div>

        {/* Store Toggle */}
        <div className="flex gap-1.5 bg-white/[0.04] rounded-xl p-1 mb-4">
          {STORES.map((s) => (
            <button
              key={s.id}
              onClick={() => onStoreChange(s.id)}
              className={`flex-1 py-2 px-2 rounded-lg border-none cursor-pointer text-xs font-medium transition-all flex items-center justify-center gap-1 ${
                activeStore === s.id
                  ? "bg-primary text-white shadow-md"
                  : "bg-transparent text-white/40 hover:text-white/60"
              }`}
            >
              <span>{s.icon}</span>
              <span className="hidden sm:inline">{s.label}</span>
              <span className="sm:hidden">{s.id}</span>
            </button>
          ))}
        </div>

        <div className="text-white text-xl font-bold mb-1">
          Hey, {profile?.full_name?.split(" ")[0]}! 👋
        </div>
        <div className="text-muted text-xs mb-1">
          Training as <span className="text-white/70 font-medium">{currentStore.label}</span>
          {competitor && <> · Competitor: <span className="text-accent font-medium">{competitor.label}</span></>}
        </div>

        {/* XP Card */}
        <div className="mt-4 bg-surface-mid rounded-2xl p-4 border border-white/5">
          <div className="flex justify-between items-center mb-2.5">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">{rank.icon}</span>
              <div>
                <div className="text-white font-semibold text-sm">{rank.label}</div>
                <div className="text-muted text-xs">{xp} XP{next && ` · ${next.min - xp} to next`}</div>
              </div>
            </div>
            <div className="text-accent font-bold text-lg">{prog}%</div>
          </div>
          <div className="bg-white/5 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-primary-light h-2 rounded-full transition-all duration-700" style={{ width: `${prog}%` }} />
          </div>
          <div className="flex justify-between mt-2.5 text-muted text-xs">
            <span>🔥 {streak?.current_streak || 0} day streak</span>
            <span>📚 {totalQ} questions</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-5 pb-10">
        <div className="flex gap-2.5 mb-5">
          <button onClick={onBoard} className="flex-1 py-3 bg-white border-none rounded-xl text-surface-dark font-semibold text-sm cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1.5">
            🏆 Leaderboard
          </button>
          {profile?.role === "manager" && (
            <button onClick={onManager} className="flex-1 py-3 bg-primary border-none rounded-xl text-white font-semibold text-sm cursor-pointer shadow-sm shadow-primary/20 hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1.5">
              📊 Dashboard
            </button>
          )}
        </div>

        <div className="text-surface-dark font-semibold text-[15px] mb-3">Categories</div>

        <div className="grid grid-cols-2 gap-2.5">
          {CATS.map((cat, i) => {
            const count = getCount(cat.id);
            const isCompetitive = cat.id === "competitive";
            const subtitle = isCompetitive && competitor
              ? `vs ${competitor.label}`
              : null;
            return (
              <button
                key={cat.id}
                onClick={() => onQuiz(cat)}
                className="p-4 bg-white border-none rounded-2xl cursor-pointer text-left shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group animate-slide-up"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-2.5" style={{ backgroundColor: `${cat.color}12` }}>
                  {cat.icon}
                </div>
                <div className="text-surface-dark font-semibold text-[13px] leading-snug">{cat.label}</div>
                {subtitle && <div className="text-accent text-[11px] font-medium mt-0.5">{subtitle}</div>}
                <div className="text-muted text-xs mt-1">{count} questions</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
