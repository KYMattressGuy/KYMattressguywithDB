"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { CATS, STORES } from "@/lib/constants";
import { getRank } from "@/lib/utils";

export default function Manager({ onBack }) {
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
    <div className="min-h-screen bg-surface">
      <div className="bg-surface-dark px-5 pt-5 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="w-8 h-8 rounded-lg bg-white/10 border-none flex items-center justify-center text-white cursor-pointer hover:bg-white/20 transition">←</button>
          <h1 className="text-lg font-bold text-white">📊 Manager Dashboard</h1>
        </div>
        {/* Store filter */}
        <div className="flex gap-2">
          <button onClick={() => setStoreFilter("all")} className={`px-3 py-1.5 rounded-lg text-xs font-medium border-none cursor-pointer transition ${storeFilter === "all" ? "bg-primary text-white" : "bg-white/10 text-white/50 hover:text-white/70"}`}>
            All Stores
          </button>
          {STORES.map((s) => (
            <button key={s.id} onClick={() => setStoreFilter(s.id)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border-none cursor-pointer transition ${storeFilter === s.id ? "bg-primary text-white" : "bg-white/10 text-white/50 hover:text-white/70"}`}>
              {s.icon} {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 -mt-3 pb-10">
        <div className="grid grid-cols-3 gap-2.5 mb-5">
          {stats.map((s, i) => (
            <div key={s.l} className="bg-white rounded-xl py-3.5 px-3 text-center shadow-sm animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="text-xl mb-0.5">{s.icon}</div>
              <div className="font-bold text-surface-dark text-xl">{s.v}</div>
              <div className="text-muted text-[11px]">{s.l}</div>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="text-center p-10"><div className="inline-block w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin" /></div>
        ) : filteredReps.length === 0 ? (
          <div className="text-center p-10 bg-white rounded-2xl shadow-sm">
            <div className="text-3xl mb-2">👥</div>
            <div className="text-surface-dark font-semibold">No reps found</div>
            <div className="text-muted text-sm">Try a different store filter</div>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredReps.map((rep, i) => {
              const isOpen = open === rep.id;
              const rank = getRank(rep.total_xp || 0);
              const scoreColor = rep.avg_score >= 80 ? "text-success" : rep.avg_score >= 60 ? "text-accent" : "text-error";
              const rc = repCats(rep.id);
              const storeLabel = STORES.find((s) => s.id === rep.store_location)?.label || rep.store_location;

              return (
                <div key={rep.id} className="bg-white rounded-xl overflow-hidden shadow-sm animate-slide-up" style={{ animationDelay: `${i * 40}ms` }}>
                  <div onClick={() => setOpen(isOpen ? null : rep.id)} className="p-3.5 flex items-center gap-3 cursor-pointer hover:bg-slate-100/50 transition">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {rep.full_name?.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-surface-dark text-sm truncate">{rep.full_name}</div>
                      <div className="text-muted text-xs">{rank.icon} {rank.label} · {storeLabel}</div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold text-base ${scoreColor}`}>{rep.avg_score || 0}%</div>
                      <div className="text-muted text-[11px]">{rep.total_xp || 0} XP · {rep.current_streak || 0}🔥</div>
                    </div>
                    <div className={`text-muted text-[10px] transition-transform ${isOpen ? "rotate-180" : ""}`}>▼</div>
                  </div>

                  {isOpen && (
                    <div className="border-t border-slate-100 p-4 bg-slate-100/30 animate-fade-in">
                      <div className="text-[11px] font-semibold text-primary tracking-wider uppercase mb-2.5">Category Breakdown</div>
                      {rc.length === 0 ? (
                        <div className="text-muted text-sm">No quizzes yet.</div>
                      ) : (
                        <div className="space-y-2.5">
                          {rc.map((c) => {
                            const cat = CATS.find((x) => x.id === c.category);
                            const barColor = c.avg_percent >= 80 ? "bg-success" : c.avg_percent >= 60 ? "bg-accent" : "bg-error";
                            const textColor = c.avg_percent >= 80 ? "text-success" : c.avg_percent >= 60 ? "text-accent" : "text-error";
                            return (
                              <div key={c.category}>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-surface-dark">{cat?.icon} {cat?.label || c.category}</span>
                                  <span className={`font-semibold ${textColor}`}>{c.avg_percent}% <span className="text-muted font-normal text-xs">({c.attempts})</span></span>
                                </div>
                                <div className="bg-slate-200 rounded-full h-1.5 overflow-hidden">
                                  <div className={`h-1.5 rounded-full ${barColor}`} style={{ width: `${c.avg_percent}%` }} />
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
