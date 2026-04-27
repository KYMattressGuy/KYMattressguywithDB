"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { getRank } from "@/lib/utils";

export default function Board({ onBack }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("leaderboard").select("*").limit(25).then(({ data: d }) => {
      setData(d || []);
      setLoading(false);
    });
  }, []);

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="min-h-screen bg-surface">
      <div className="bg-surface-dark px-5 pt-5 pb-8">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-8 h-8 rounded-lg bg-white/10 border-none flex items-center justify-center text-white cursor-pointer hover:bg-white/20 transition">←</button>
          <h1 className="text-lg font-bold text-white">🏆 Leaderboard</h1>
        </div>
      </div>

      <div className="px-5 -mt-3 pb-10">
        {loading ? (
          <div className="text-center p-10"><div className="inline-block w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin" /></div>
        ) : data.length === 0 ? (
          <div className="text-center p-10 bg-white rounded-2xl shadow-sm">
            <div className="text-3xl mb-2">🚀</div>
            <div className="text-surface-dark font-semibold">No reps yet</div>
            <div className="text-muted text-sm">Be the first!</div>
          </div>
        ) : (
          <div className="space-y-2">
            {data.map((rep, i) => {
              const rank = getRank(rep.total_xp || 0);
              return (
                <div key={rep.id} className={`bg-white rounded-xl p-3.5 flex items-center gap-3 shadow-sm animate-slide-up ${i === 0 ? "ring-1 ring-accent/30" : ""}`} style={{ animationDelay: `${i * 30}ms` }}>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold shrink-0 text-sm ${i < 3 ? "bg-primary/10 text-lg" : "bg-slate-100 text-muted"}`}>
                    {medals[i] || i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-surface-dark text-sm truncate">{rep.full_name}</div>
                    <div className="text-muted text-xs">{rank.icon} {rank.label} · {rep.store_location}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-bold text-primary text-sm">{rep.total_xp || 0} XP</div>
                    <div className="text-muted text-[11px]">{rep.avg_score || 0}% · {rep.total_quizzes || 0} quizzes</div>
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
