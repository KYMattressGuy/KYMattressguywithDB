"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { getRank } from "@/lib/utils";

export default function Board({ onBack }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("leaderboard")
      .select("*")
      .limit(25)
      .then(({ data: d }) => {
        setData(d || []);
        setLoading(false);
      });
  }, []);

  const medals = ["🥇", "🥈", "🥉"];
  const podiumColors = [
    "from-accent to-accent-light",
    "from-slate-300 to-slate-400",
    "from-amber-600 to-amber-700",
  ];

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="gradient-header px-5 pt-6 pb-10 rounded-b-[2rem]">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/10 border-none flex items-center justify-center text-white cursor-pointer hover:bg-white/20 transition-all"
          >
            ←
          </button>
          <h1 className="text-xl font-bold text-white">🏆 Leaderboard</h1>
        </div>
        <p className="text-white/40 text-sm ml-12">Top performers across all stores</p>
      </div>

      <div className="px-5 -mt-4 pb-10">
        {loading ? (
          <div className="text-center p-10">
            <div className="inline-block w-8 h-8 border-3 border-indigo/20 border-t-indigo rounded-full animate-spin" />
          </div>
        ) : data.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-2xl shadow-sm">
            <div className="text-4xl mb-3">🚀</div>
            <div className="text-surface-dark font-bold mb-1">No reps yet</div>
            <div className="text-muted text-sm">Be the first to take a quiz!</div>
          </div>
        ) : (
          <div className="space-y-2.5">
            {data.map((rep, i) => {
              const rank = getRank(rep.total_xp || 0);
              return (
                <div
                  key={rep.id}
                  className={`bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-all animate-slide-up ${
                    i === 0 ? "ring-2 ring-accent/30" : ""
                  }`}
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 ${
                      i < 3
                        ? `bg-gradient-to-br ${podiumColors[i]} text-white text-xl shadow-sm`
                        : "bg-surface text-muted text-sm"
                    }`}
                  >
                    {medals[i] || i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-surface-dark truncate">
                      {rep.full_name}
                    </div>
                    <div className="text-muted text-xs mt-0.5">
                      {rank.icon} {rank.label} · {rep.store_location}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-bold text-primary text-base">
                      {rep.total_xp || 0} <span className="text-xs text-muted font-normal">XP</span>
                    </div>
                    <div className="text-muted text-[11px]">
                      {rep.avg_score || 0}% · {rep.total_quizzes || 0} quizzes
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
