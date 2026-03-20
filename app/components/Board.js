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

  return (
    <div className="min-h-screen bg-light p-5 font-sans">
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={onBack}
          className="bg-transparent border-none text-xl cursor-pointer text-navy hover:opacity-70 transition"
        >
          ←
        </button>
        <div className="font-serif text-xl font-bold text-navy">
          🏆 Leaderboard
        </div>
      </div>

      {loading ? (
        <div className="text-center p-10 text-navy/60">Loading...</div>
      ) : data.length === 0 ? (
        <div className="text-center p-10 text-black/40">
          No reps yet — be the first! 🚀
        </div>
      ) : (
        data.map((rep, i) => {
          const rank = getRank(rep.total_xp || 0);
          return (
            <div
              key={rep.id}
              className={`bg-white rounded-[14px] p-3.5 mb-2 flex items-center gap-3 ${
                i < 3 ? "shadow-md" : "shadow-sm"
              } ${i === 0 ? "border-2 border-gold" : "border-2 border-transparent"}`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold shrink-0 ${
                  i < 3
                    ? "bg-gold text-white text-lg"
                    : "bg-light text-navy text-sm"
                }`}
              >
                {medals[i] || i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-navy truncate">
                  {rep.full_name}
                </div>
                <div className="text-black/40 text-xs">
                  {rank.icon} {rank.label} · {rep.store_location}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-bold text-gold text-base">
                  {rep.total_xp || 0} XP
                </div>
                <div className="text-black/40 text-[11px]">
                  {rep.avg_score || 0}% avg · {rep.total_quizzes || 0} quizzes
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
