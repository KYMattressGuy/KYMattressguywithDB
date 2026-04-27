"use client";

import { useState } from "react";
import { Q } from "@/lib/questions";
import { supabase } from "@/lib/supabase";
import { shuffle } from "@/lib/utils";

import { STORES } from "@/lib/constants";
import { getRank } from "@/lib/utils";

export default function Quiz({ cat, userId, userStore, userXp, onDone }) {
  const storeConfig = STORES.find((s) => s.id === userStore) || STORES[0];
  const storeIncludes = storeConfig.includes || [userStore];
  const rank = getRank(userXp || 0);
  const maxDiff = rank.maxDifficulty || 5;
  const pool = (Q[cat.id] || []).filter(
    (q) => (!q.s || q.s.some((tag) => storeIncludes.includes(tag))) && (!q.d || q.d <= maxDiff)
  );
  const [{ questions, shuffledOpts }] = useState(() => {
    const qs = shuffle(pool).slice(0, Math.min(10, pool.length));
    return { questions: qs, shuffledOpts: qs.map((q) => shuffle(q.o)) };
  });
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const q = questions[idx];
  const opts = shuffledOpts[idx] || [];

  async function saveResult(fs) {
    setSaving(true);
    const total = questions.length;
    const pct = Math.round((fs / total) * 100);
    const xpE = pct >= 80 ? 50 : pct >= 60 ? 30 : 10;
    await supabase.from("quiz_results").insert({
      user_id: userId, category: cat.id, score: fs, total, percent: pct, xp_earned: xpE,
    });
    const { data: s } = await supabase.from("streaks").select("*").eq("user_id", userId).single();
    const today = new Date().toISOString().split("T")[0];
    const ns = s?.last_played_date !== today ? (s?.current_streak || 0) + 1 : s?.current_streak || 0;
    await supabase.from("streaks").upsert({
      user_id: userId, current_streak: ns,
      longest_streak: Math.max(ns, s?.longest_streak || 0),
      last_played_date: today, total_xp: (s?.total_xp || 0) + xpE,
    });
    setSaving(false);
  }

  function answer(opt) {
    if (sel) return;
    setSel(opt);
    setShowExplanation(true);
    const correct = q.o[q.a];
    const ns = opt === correct ? score + 1 : score;
    setTimeout(() => {
      if (idx + 1 >= questions.length) {
        setScore(ns);
        setDone(true);
        saveResult(ns);
      } else {
        setIdx(idx + 1);
        setSel(null);
        setShowExplanation(false);
        if (opt === correct) setScore(ns);
      }
    }, q.e ? 2500 : 1200);
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const xpE = pct >= 80 ? 50 : pct >= 60 ? 30 : 10;
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-6">
        <div className="text-center max-w-[340px] animate-fade-in">
          <div className="text-6xl mb-5">{pct >= 80 ? "🏆" : pct >= 60 ? "⭐" : "📚"}</div>
          <h2 className="text-2xl font-bold text-white mb-1">
            {pct >= 80 ? "Crushed it!" : pct >= 60 ? "Solid work!" : "Keep grinding!"}
          </h2>
          <div className="text-6xl font-bold text-white my-5">{pct}%</div>
          <div className="text-muted mb-1">{score} of {questions.length} correct</div>
          <div className="inline-block px-3 py-1 rounded-full bg-accent/15 text-accent text-sm font-semibold mb-1">+{xpE} XP</div>
          <div className="text-white/25 text-xs mb-8">{saving ? "Saving..." : "✓ Saved"}</div>
          <button onClick={onDone} className="px-8 py-3.5 bg-primary text-white border-none rounded-xl font-semibold cursor-pointer shadow-lg shadow-primary/25 hover:bg-primary-light transition-all">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!q) return null;
  const correct = q.o[q.a];
  const progress = ((idx + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-surface p-5">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base" style={{ backgroundColor: `${cat.color}12` }}>{cat.icon}</div>
          <span className="font-semibold text-surface-dark text-sm">{cat.label}</span>
        </div>
        <div className="px-3 py-1 rounded-full bg-white text-muted text-xs font-medium shadow-sm">{idx + 1} / {questions.length}</div>
      </div>

      <div className="bg-slate-200 rounded-full h-1.5 mb-5 overflow-hidden">
        <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: `${progress}%`, backgroundColor: cat.color }} />
      </div>

      <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm animate-fade-in" key={idx}>
        <div className="font-semibold text-[17px] text-surface-dark leading-relaxed">{q.q}</div>
      </div>

      <div className="space-y-2.5">
        {opts.map((opt, i) => {
          const isCorrect = opt === correct;
          const isSelected = opt === sel;
          let classes = "w-full p-3.5 rounded-xl cursor-pointer text-left text-sm font-medium transition-all border-2 ";
          if (sel) {
            if (isCorrect) classes += "bg-success/10 border-success text-surface-dark";
            else if (isSelected) classes += "bg-error/10 border-error text-surface-dark";
            else classes += "bg-white border-transparent text-muted opacity-40";
          } else {
            classes += "bg-white border-transparent text-surface-dark hover:border-primary/15 hover:shadow-sm";
          }
          return (
            <button key={opt} onClick={() => answer(opt)} className={classes} style={{ animationDelay: `${i * 50}ms` }}>
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                  sel && isCorrect ? "bg-success text-white" : sel && isSelected ? "bg-error text-white" : "bg-slate-100 text-muted"
                }`}>
                  {sel && isCorrect ? "✓" : sel && isSelected ? "✗" : String.fromCharCode(65 + i)}
                </div>
                <span>{opt}</span>
              </div>
            </button>
          );
        })}
      </div>

      {showExplanation && q.e && (
        <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/10 animate-fade-in">
          <div className="text-xs font-semibold text-primary mb-1">💡 Explanation</div>
          <div className="text-sm text-surface-dark leading-relaxed">{q.e}</div>
        </div>
      )}
    </div>
  );
}
