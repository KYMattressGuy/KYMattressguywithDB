"use client";

import { useState } from "react";
import { Q } from "@/lib/questions";
import { supabase } from "@/lib/supabase";
import { shuffle } from "@/lib/utils";

export default function Quiz({ cat, userId, onDone }) {
  const pool = Q[cat.id] || [];
  const [{ questions, shuffledOpts }] = useState(() => {
    const qs = shuffle(pool).slice(0, Math.min(10, pool.length));
    return { questions: qs, shuffledOpts: qs.map((q) => shuffle(q.o)) };
  });
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);

  const q = questions[idx];
  const opts = shuffledOpts[idx] || [];

  async function saveResult(fs) {
    setSaving(true);
    const total = questions.length;
    const pct = Math.round((fs / total) * 100);
    const xpE = pct >= 80 ? 50 : pct >= 60 ? 30 : 10;
    await supabase.from("quiz_results").insert({
      user_id: userId,
      category: cat.id,
      score: fs,
      total,
      percent: pct,
      xp_earned: xpE,
    });
    const { data: s } = await supabase
      .from("streaks")
      .select("*")
      .eq("user_id", userId)
      .single();
    const today = new Date().toISOString().split("T")[0];
    const ns =
      s?.last_played_date !== today
        ? (s?.current_streak || 0) + 1
        : s?.current_streak || 0;
    await supabase.from("streaks").upsert({
      user_id: userId,
      current_streak: ns,
      longest_streak: Math.max(ns, s?.longest_streak || 0),
      last_played_date: today,
      total_xp: (s?.total_xp || 0) + xpE,
    });
    setSaving(false);
  }

  function answer(opt) {
    if (sel) return;
    setSel(opt);
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
        if (opt === correct) setScore(ns);
      }
    }, 1200);
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const xpE = pct >= 80 ? 50 : pct >= 60 ? 30 : 10;
    const emoji = pct >= 80 ? "🏆" : pct >= 60 ? "⭐" : "📚";
    const msg = pct >= 80 ? "Crushed it!" : pct >= 60 ? "Solid work!" : "Keep grinding!";

    return (
      <div className="min-h-screen gradient-radial flex items-center justify-center p-6">
        <div className="text-center max-w-[340px] animate-fade-in">
          <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center text-6xl mx-auto mb-6 animate-pulse-ring">
            {emoji}
          </div>
          <h2 className="text-3xl font-bold gradient-text mb-2">{msg}</h2>
          <div className="text-7xl font-bold text-white my-6">{pct}%</div>
          <div className="text-white/50 mb-2">
            {score} of {questions.length} correct
          </div>
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent/15 text-accent text-sm font-semibold mb-2">
            +{xpE} XP earned
          </div>
          <div className="text-white/30 text-xs mb-10">
            {saving ? "Saving..." : "✓ Saved to your record"}
          </div>
          <button
            onClick={onDone}
            className="px-10 py-4 bg-gradient-to-r from-accent to-accent-light border-none rounded-full text-surface-dark font-bold text-base cursor-pointer shadow-lg shadow-accent/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
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
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
            style={{ backgroundColor: `${cat.color}15` }}
          >
            {cat.icon}
          </div>
          <span className="font-bold text-surface-dark text-sm">{cat.label}</span>
        </div>
        <div className="px-3 py-1 rounded-full bg-white text-muted text-xs font-semibold shadow-sm">
          {idx + 1} / {questions.length}
        </div>
      </div>

      {/* Progress */}
      <div className="bg-black/[0.06] rounded-full h-2 mb-6 overflow-hidden">
        <div
          className="h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%`, backgroundColor: cat.color }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl p-6 mb-5 shadow-sm animate-fade-in" key={idx}>
        <div className="font-semibold text-lg text-surface-dark leading-relaxed">
          {q.q}
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {opts.map((opt, i) => {
          const isCorrect = opt === correct;
          const isSelected = opt === sel;
          let classes =
            "w-full p-4 rounded-2xl cursor-pointer text-left text-[15px] font-medium transition-all duration-300 border-2 animate-slide-up ";

          if (sel) {
            if (isCorrect) {
              classes += "bg-success/10 border-success text-surface-dark shadow-sm shadow-success/10";
            } else if (isSelected) {
              classes += "bg-error/10 border-error text-surface-dark";
            } else {
              classes += "bg-white border-transparent text-muted opacity-50";
            }
          } else {
            classes +=
              "bg-white border-transparent text-surface-dark hover:border-indigo/20 hover:shadow-md hover:-translate-y-0.5";
          }

          return (
            <button
              key={opt}
              onClick={() => answer(opt)}
              className={classes}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    sel && isCorrect
                      ? "bg-success text-white"
                      : sel && isSelected
                      ? "bg-error text-white"
                      : "bg-surface text-muted"
                  }`}
                >
                  {sel && isCorrect ? "✓" : sel && isSelected ? "✗" : String.fromCharCode(65 + i)}
                </div>
                <span>{opt}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
