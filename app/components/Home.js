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
    <div className="min-h-screen bg-light font-sans">
      {/* Header */}
      <div className="bg-navy px-5 pt-5 pb-6 rounded-b-3xl">
        <div className="flex justify-between items-center mb-3.5">
          <div className="text-gold font-serif font-bold text-[17px]">
            🛏️ KY Mattress Guy Pro
          </div>
          <button
            onClick={onSignOut}
            className="bg-white/10 border-none text-white/60 px-3 py-1.5 rounded-lg cursor-pointer text-xs hover:bg-white/20 transition"
          >
            Sign Out
          </button>
        </div>

        <div className="text-white text-xl font-bold">
          Hey, {profile?.full_name?.split(" ")[0]}! 👋
        </div>
        <div className="text-white/50 text-[13px] mb-3.5">
          {profile?.store_location}
        </div>

        {/* XP / Rank card */}
        <div className="bg-white/[0.08] rounded-xl p-3.5">
          <div className="flex justify-between mb-2">
            <span className="text-gold font-bold">
              {rank.icon} {rank.label}
            </span>
            <span className="text-white/60 text-[13px]">
              {xp} XP{next && ` → ${next.min}`}
            </span>
          </div>
          <div className="bg-white/15 rounded h-1.5">
            <div
              className="bg-gold h-1.5 rounded transition-all duration-500"
              style={{ width: `${prog}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-white/50 text-xs">
              🔥 {streak?.current_streak || 0} day streak
            </span>
            <span className="text-white/50 text-xs">
              📚 {totalQ} questions total
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-[18px] pb-10">
        <div className="flex gap-2.5 mb-3.5">
          <button
            onClick={onBoard}
            className="flex-1 p-3 bg-white border-2 border-gold rounded-xl text-navy font-bold text-sm cursor-pointer hover:bg-gold/10 transition"
          >
            🏆 Leaderboard
          </button>
          {profile?.role === "manager" && (
            <button
              onClick={onManager}
              className="flex-1 p-3 bg-navy border-none rounded-xl text-white font-bold text-sm cursor-pointer hover:bg-navy/90 transition"
            >
              📊 Dashboard
            </button>
          )}
        </div>

        <div className="font-bold text-navy text-[15px] mb-3">
          Choose Your Training Category
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {CATS.map((cat) => {
            const count = (Q[cat.id] || []).length;
            return (
              <button
                key={cat.id}
                onClick={() => onQuiz(cat)}
                className="p-4 bg-white border-2 border-transparent rounded-[14px] cursor-pointer text-center shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all group"
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = cat.color)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "transparent")}
              >
                <div className="text-[26px]">{cat.icon}</div>
                <div className="text-navy font-bold text-xs mt-1.5 leading-tight">
                  {cat.label}
                </div>
                <div className="text-black/35 text-[11px] mt-1">
                  {count} questions
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
