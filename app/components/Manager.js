"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { CATS } from "@/lib/constants";
import { getRank } from "@/lib/utils";

export default function Manager({ onBack }) {
  const [reps, setReps] = useState([]);
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    Promise.all([
      supabase.from("leaderboard").select("*"),
      supabase.from("category_averages").select("*"),
    ]).then(([{ data: r }, { data: c }]) => {
      setReps(r || []);
      setCats(c || []);
      setLoading(false);
    });
  }, []);

  const repCats = (id) => cats.filter((c) => c.user_id === id);

  const stats = [
    { l: "Total Reps", v: reps.length },
    {
      l: "Avg Score",
      v:
        (reps.length
          ? Math.round(
              reps.reduce((a, r) => a + (r.avg_score || 0), 0) / reps.length
            )
          : 0) + "%",
    },
    {
      l: "Total Quizzes",
      v: reps.reduce((a, r) => a + (r.total_quizzes || 0), 0),
    },
  ];

  return (
    <div className="min-h-screen bg-light p-5 font-sans">
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={onBack}
          className="bg-transparent border-none text-xl cursor-pointer text-navy hover:opacity-70 transition"
        >
          ←
        </button>
        <div className="font-serif text-xl font-bold text-navy">
          📊 Manager Dashboard
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2.5 mb-4">
        {stats.map((s) => (
          <div
            key={s.l}
            className="bg-white rounded-xl py-3.5 px-2.5 text-center shadow-sm"
          >
            <div className="font-bold text-navy text-xl">{s.v}</div>
            <div className="text-black/40 text-[11px] mt-0.5">{s.l}</div>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="text-center p-10">Loading...</div>
      ) : reps.length === 0 ? (
        <div className="text-center p-10 text-black/40">
          No reps signed up yet.
        </div>
      ) : (
        reps.map((rep) => {
          const isOpen = open === rep.id;
          const rank = getRank(rep.total_xp || 0);
          const scoreColor =
            rep.avg_score >= 80
              ? "text-green-600"
              : rep.avg_score >= 60
              ? "text-gold"
              : "text-red-600";
          const rc = repCats(rep.id);

          return (
            <div
              key={rep.id}
              className="bg-white rounded-[14px] mb-2.5 overflow-hidden shadow-sm"
            >
              <div
                onClick={() => setOpen(isOpen ? null : rep.id)}
                className="p-3.5 flex items-center gap-3 cursor-pointer hover:bg-black/[0.02] transition"
              >
                <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-gold font-bold text-base shrink-0">
                  {rep.full_name?.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-navy text-[15px] truncate">
                    {rep.full_name}
                  </div>
                  <div className="text-black/40 text-xs">
                    {rank.icon} {rank.label} · {rep.store_location}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold text-[17px] ${scoreColor}`}>
                    {rep.avg_score || 0}%
                  </div>
                  <div className="text-black/35 text-[11px]">
                    {rep.total_xp || 0} XP · {rep.current_streak || 0}🔥
                  </div>
                </div>
                <div className="text-black/30 text-xs">
                  {isOpen ? "▲" : "▼"}
                </div>
              </div>

              {isOpen && (
                <div className="border-t border-black/[0.06] p-4 bg-light">
                  <div className="text-[11px] font-bold text-navy tracking-wider uppercase mb-2.5">
                    Category Breakdown
                  </div>
                  {rc.length === 0 ? (
                    <div className="text-black/40 text-[13px]">
                      No quizzes completed yet.
                    </div>
                  ) : (
                    rc.map((c) => {
                      const cat = CATS.find((x) => x.id === c.category);
                      const barColor =
                        c.avg_percent >= 80
                          ? "bg-green-500"
                          : c.avg_percent >= 60
                          ? "bg-gold"
                          : "bg-red-500";
                      const textColor =
                        c.avg_percent >= 80
                          ? "text-green-600"
                          : c.avg_percent >= 60
                          ? "text-gold"
                          : "text-red-600";
                      return (
                        <div key={c.category} className="mb-2.5">
                          <div className="flex justify-between text-[13px] mb-1">
                            <span className="text-navy">
                              {cat?.icon} {cat?.label || c.category}
                            </span>
                            <span className={`font-bold ${textColor}`}>
                              {c.avg_percent}%{" "}
                              <span className="text-black/30 font-normal">
                                ({c.attempts} quiz
                                {c.attempts !== 1 ? "zes" : ""})
                              </span>
                            </span>
                          </div>
                          <div className="bg-black/[0.08] rounded h-[5px]">
                            <div
                              className={`h-[5px] rounded ${barColor}`}
                              style={{ width: `${c.avg_percent}%` }}
                            />
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div className="mt-2.5 py-2.5 px-3 bg-white rounded-lg flex justify-between text-xs">
                    <span className="text-black/50">
                      Total quizzes:{" "}
                      <strong className="text-navy">
                        {rep.total_quizzes || 0}
                      </strong>
                    </span>
                    <span className="text-black/50">
                      Best streak:{" "}
                      <strong className="text-navy">
                        {rep.longest_streak || 0}🔥
                      </strong>
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
