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
    { l: "Reps", v: reps.length, icon: "👥" },
    {
      l: "Avg Score",
      v:
        (reps.length
          ? Math.round(
              reps.reduce((a, r) => a + (r.avg_score || 0), 0) / reps.length
            )
          : 0) + "%",
      icon: "📊",
    },
    {
      l: "Quizzes",
      v: reps.reduce((a, r) => a + (r.total_quizzes || 0), 0),
      icon: "📝",
    },
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
          <h1 className="text-xl font-bold text-white">📊 Manager Dashboard</h1>
        </div>
      </div>

      <div className="px-5 -mt-4 pb-10">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {stats.map((s, i) => (
            <div
              key={s.l}
              className="bg-white rounded-2xl py-4 px-3 text-center shadow-sm animate-slide-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="font-bold text-surface-dark text-xl">{s.v}</div>
              <div className="text-muted text-[11px] mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="text-center p-10">
            <div className="inline-block w-8 h-8 border-3 border-indigo/20 border-t-indigo rounded-full animate-spin" />
          </div>
        ) : reps.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-2xl shadow-sm">
            <div className="text-4xl mb-3">👥</div>
            <div className="text-surface-dark font-bold mb-1">No reps yet</div>
            <div className="text-muted text-sm">Waiting for sign-ups</div>
          </div>
        ) : (
          <div className="space-y-3">
            {reps.map((rep, i) => {
              const isOpen = open === rep.id;
              const rank = getRank(rep.total_xp || 0);
              const scoreColor =
                rep.avg_score >= 80
                  ? "text-success"
                  : rep.avg_score >= 60
                  ? "text-accent"
                  : "text-error";
              const rc = repCats(rep.id);

              return (
                <div
                  key={rep.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm animate-slide-up"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div
                    onClick={() => setOpen(isOpen ? null : rep.id)}
                    className="p-4 flex items-center gap-3 cursor-pointer hover:bg-surface/50 transition-all"
                  >
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo to-violet flex items-center justify-center text-white font-bold text-base shrink-0">
                      {rep.full_name?.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-surface-dark text-[15px] truncate">
                        {rep.full_name}
                      </div>
                      <div className="text-muted text-xs mt-0.5">
                        {rank.icon} {rank.label} · {rep.store_location}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold text-lg ${scoreColor}`}>
                        {rep.avg_score || 0}%
                      </div>
                      <div className="text-muted text-[11px]">
                        {rep.total_xp || 0} XP · {rep.current_streak || 0}🔥
                      </div>
                    </div>
                    <div className={`text-muted text-xs transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                      ▼
                    </div>
                  </div>

                  {isOpen && (
                    <div className="border-t border-black/[0.04] p-5 bg-surface/50 animate-fade-in">
                      <div className="text-[11px] font-bold text-primary tracking-wider uppercase mb-3">
                        Category Breakdown
                      </div>
                      {rc.length === 0 ? (
                        <div className="text-muted text-sm">
                          No quizzes completed yet.
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {rc.map((c) => {
                            const cat = CATS.find((x) => x.id === c.category);
                            const barColor =
                              c.avg_percent >= 80
                                ? "bg-success"
                                : c.avg_percent >= 60
                                ? "bg-accent"
                                : "bg-error";
                            const textColor =
                              c.avg_percent >= 80
                                ? "text-success"
                                : c.avg_percent >= 60
                                ? "text-accent"
                                : "text-error";
                            return (
                              <div key={c.category}>
                                <div className="flex justify-between text-sm mb-1.5">
                                  <span className="text-surface-dark">
                                    {cat?.icon} {cat?.label || c.category}
                                  </span>
                                  <span className={`font-bold ${textColor}`}>
                                    {c.avg_percent}%{" "}
                                    <span className="text-muted font-normal text-xs">
                                      ({c.attempts} quiz
                                      {c.attempts !== 1 ? "zes" : ""})
                                    </span>
                                  </span>
                                </div>
                                <div className="bg-black/[0.06] rounded-full h-1.5 overflow-hidden">
                                  <div
                                    className={`h-1.5 rounded-full ${barColor} transition-all duration-500`}
                                    style={{ width: `${c.avg_percent}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      <div className="mt-4 py-3 px-4 bg-white rounded-xl flex justify-between text-xs">
                        <span className="text-muted">
                          Total quizzes:{" "}
                          <strong className="text-surface-dark">
                            {rep.total_quizzes || 0}
                          </strong>
                        </span>
                        <span className="text-muted">
                          Best streak:{" "}
                          <strong className="text-surface-dark">
                            {rep.longest_streak || 0}🔥
                          </strong>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
