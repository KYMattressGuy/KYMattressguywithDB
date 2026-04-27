"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { CATS, STORES } from "@/lib/constants";
import { getRank } from "@/lib/utils";

export default function Manager() {
  const [reps, setReps] = useState([]);
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(null);
  const [storeFilter, setStoreFilter] = useState("all");

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

  const filteredReps = storeFilter === "all" ? reps : reps.filter((r) => r.store_location === storeFilter);
  const repCats = (id) => cats.filter((c) => c.user_id === id);

  const stats = [
    { l: "Reps", v: filteredReps.length, icon: "👥" },
    { l: "Avg Score", v: (filteredReps.length ? Math.round(filteredReps.reduce((a, r) => a + (r.avg_score || 0), 0) / filteredReps.length) : 0) + "%", icon: "📊" },
    { l: "Quizzes", v: filteredReps.reduce((a, r) => a + (r.total_quizzes || 0), 0), icon: "📝" },
  ];

  return (
    <div className="min-h-screen bg-surface safe-top">
      <div className="bg-surface-dark px-5 pt-6 pb-5">
        <h1 className="text-xl font-bold text-white mb-3">📊 Dashboard</h1>
        <div className="flex gap-1.5 overflow-x-auto">
          <button onClick={() => setStoreFilter("all")} className={`px-3 py-1.5 rounded-lg text-[11px] font-medium border-none cursor-pointer transition shrink-0 ${storeFilter === "all" ? "bg-primary text-white" : "bg-white/10 text-white/40"}`}>All</button>
          {STORES.map((s) => (
            <button key={s.id} onClick={() => setStoreFilter(s.id)} className={`px-3 py-1.5 rounded-lg text-[11px] font-medium border-none cursor-pointer transition shrink-0 ${storeFilter === s.id ? "bg-primary text-white" : "bg-white/10 text-white/40"}`}>
              {s.icon} {s.id}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4 pb-6">
        <div className="grid grid-cols-3 gap-2 mb-4">
          {stats.map((s, i) => (
            <div key={s.l} className="bg-white rounded-xl py-3 px-2 text-center shadow-sm animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="text-lg mb-0.5">{s.icon}</div>
              <div className="font-bold text-surface-dark text-lg">{s.v}</div>
              <div className="text-muted text-[10px]">{s.l}</div>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="text-center p-10"><div className="inline-block w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin" /></div>
        ) : filteredReps.length === 0 ? (
          <div className="text-center p-10 bg-white rounded-2xl shadow-sm">
            <div className="text-3xl mb-2">👥</div>
            <div className="text-surface-dark font-semibold">No reps found</div>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredReps.map((rep, i) => {
              const isOpen = open === rep.id;
              const rank = getRank(rep.total_xp || 0);
              const scoreColor = rep.avg_score >= 80 ? "text-success" : rep.avg_score >= 60 ? "text-accent" : "text-error";
              const rc = repCats(rep.id);

              return (
                <div key={rep.id} className="bg-white rounded-xl overflow-hidden shadow-sm animate-slide-up" style={{ animationDelay: `${i * 30}ms` }}>
                  <div onClick={() => setOpen(isOpen ? null : rep.id)} className="p-3 flex items-center gap-2.5 cursor-pointer active:bg-slate-100/50 transition">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {rep.full_name?.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-surface-dark text-sm truncate">{rep.full_name}</div>
                      <div className="text-muted text-[11px]">{rank.icon} {rank.label}</div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold text-base ${scoreColor}`}>{rep.avg_score || 0}%</div>
                      <div className="text-muted text-[10px]">{rep.total_xp || 0} XP</div>
                    </div>
                    <div className={`text-muted text-[10px] transition-transform ${isOpen ? "rotate-180" : ""}`}>▼</div>
                  </div>

                  {isOpen && (
                    <div className="border-t border-slate-100 p-3.5 bg-slate-100/30 animate-fade-in">
                      <div className="text-[10px] font-bold text-primary tracking-wider uppercase mb-2">Categories</div>
                      {rc.length === 0 ? (
                        <div className="text-muted text-sm">No quizzes yet.</div>
                      ) : (
                        <div className="space-y-2">
                          {rc.map((c) => {
                            const cat = CATS.find((x) => x.id === c.category);
                            const barColor = c.avg_percent >= 80 ? "bg-success" : c.avg_percent >= 60 ? "bg-accent" : "bg-error";
                            return (
                              <div key={c.category}>
                                <div className="flex justify-between text-[12px] mb-1">
                                  <span className="text-surface-dark">{cat?.icon} {cat?.label || c.category}</span>
                                  <span className="font-semibold">{c.avg_percent}%</span>
                                </div>
                                <div className="bg-slate-200 rounded-full h-1 overflow-hidden">
                                  <div className={`h-1 rounded-full ${barColor}`} style={{ width: `${c.avg_percent}%` }} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
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
