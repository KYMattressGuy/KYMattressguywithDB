"use client";

import { Q } from "@/lib/questions";
import { CATS } from "@/lib/constants";
import { getRank } from "@/lib/utils";
import { RANKS } from "@/lib/constants";

export default function Home({ profile, streak, onQuiz, onBoard, onManager, onSignOut }) {
  const xp = streak?.total_xp || 0;
  const rank = getRank(xp);
  const next = RANKS.find((r) => r.min > xp);
  const prog = next
    ? Math.round(((xp - rank.min) / (next.min - rank.min)) * 100)
    : 100;
  const totalQ = Object.values(Q).reduce((a, c) => a + c.length, 0);

  return (
    <div className="min-h-screen bg-surface">
      {/* Gradient Header */}
      <div className="gradient-header px-5 pt-6 pb-8 rounded-b-[2rem]">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-lg">
              🎓
            </div>
            <span className="text-white/80 font-semibold text-sm">RetailSleep</span>
          </div>
          <button
            onClick={onSignOut}
            className="bg-white/10 border-none text-white/60 px-4 py-2 rounded-full cursor-pointer text-xs font-medium hover:bg-white/20 hover:text-white transition-all"
          >
            Sign Out
          </button>
        </div>

        <div className="text-white text-2xl font-bold mb-1">
          Hey, {profile?.full_name?.split(" ")[0]}! 👋
        </div>
        <div className="text-white/40 text-sm mb-5">
          {profile?.store_location}
        </div>

        {/* XP Card */}
        <div className="glass rounded-2xl p-5">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{rank.icon}</span>
              <div>
                <div className="text-accent font-bold text-sm">{rank.label}</div>
                <div className="text-white/40 text-xs">
                  {xp} XP{next && ` · ${next.min - xp} to next`}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-bold text-lg">{prog}%</div>
            </div>
          </div>
          <div className="bg-white/10 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-accent to-accent-light h-2.5 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${prog}%` }}
            />
          </div>
          <div className="flex justify-between mt-3">
            <span className="text-white/40 text-xs flex items-center gap-1">
              🔥 {streak?.current_streak || 0} day streak
            </span>
            <span className="text-white/40 text-xs flex items-center gap-1">
              📚 {totalQ} questions
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 -mt-4 pb-10">
        {/* Action buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={onBoard}
            className="flex-1 py-3.5 bg-white border-none rounded-2xl text-primary font-bold text-sm cursor-pointer shadow-md shadow-black/5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>🏆</span> Leaderboard
          </button>
          {profile?.role === "manager" && (
            <button
              onClick={onManager}
              className="flex-1 py-3.5 bg-primary border-none rounded-2xl text-white font-bold text-sm cursor-pointer shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>📊</span> Dashboard
            </button>
          )}
        </div>

        <div className="font-bold text-surface-dark text-base mb-4">
          Training Categories
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 gap-3">
          {CATS.map((cat, i) => {
            const count = (Q[cat.id] || []).length;
            return (
              <button
                key={cat.id}
                onClick={() => onQuiz(cat)}
                className="relative p-5 bg-white border-none rounded-2xl cursor-pointer text-left shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group overflow-hidden animate-slide-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div
                  className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-[0.07] -translate-y-1/2 translate-x-1/2"
                  style={{ backgroundColor: cat.color }}
                />
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl mb-3"
                  style={{ backgroundColor: `${cat.color}15` }}
                >
                  {cat.icon}
                </div>
                <div className="text-surface-dark font-bold text-[13px] leading-tight mb-1">
                  {cat.label}
                </div>
                <div className="text-muted text-xs">
                  {count} questions
                </div>
                <div
                  className="absolute bottom-0 left-0 w-full h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: cat.color }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
