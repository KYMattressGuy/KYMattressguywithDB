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
    }, 1000);
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const xpE = pct >= 80 ? 50 : pct >= 60 ? 30 : 10;
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center p-6 font-sans">
        <div className="text-center text-white max-w-[320px]">
          <div className="text-6xl mb-4">
            {pct >= 80 ? "🏆" : pct >= 60 ? "⭐" : "📚"}
          </div>
          <div className="font-serif text-2xl text-gold mb-2">
            {pct >= 80 ? "Crushed it! 🔥" : pct >= 60 ? "Solid work! 💪" : "Keep grinding! 📚"}
          </div>
          <div className="text-5xl font-bold my-4">{pct}%</div>
          <div className="text-white/50 mb-1.5">
            {score} of {questions.length} correct
          </div>
          <div className="text-gold text-[13px] mb-1.5">+{xpE} XP earned</div>
          <div className="text-white/40 text-xs mb-8">
            {saving ? "Saving..." : "✓ Saved to your record"}
          </div>
          <button
            onClick={onDone}
            className="px-10 py-3.5 bg-gold border-none rounded-xl text-navy font-bold text-base cursor-pointer hover:brightness-110 transition"
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
    <div className="min-h-screen bg-light p-5 font-sans">
      <div className="flex justify-between items-center mb-3.5">
        <div className="font-bold text-navy">
          {cat.icon} {cat.label}
        </div>
        <div className="text-black/40 text-[13px]">
          {idx + 1} / {questions.length}
        </div>
      </div>

      <div className="bg-black/[0.08] rounded h-1.5 mb-5">
        <div
          className="h-1.5 rounded transition-all duration-300"
          style={{ width: `${progress}%`, backgroundColor: cat.color }}
        />
      </div>

      <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
        <div className="font-serif text-[17px] text-navy leading-relaxed">
          {q.q}
        </div>
      </div>

      {opts.map((opt) => {
        let classes = "w-full p-3.5 mb-2 rounded-xl cursor-pointer text-left text-sm font-medium transition-all border-2 ";
        if (sel) {
          if (opt === correct) {
            classes += "bg-green-100 border-green-500 text-navy";
          } else if (opt === sel) {
            classes += "bg-red-100 border-red-500 text-navy";
          } else {
            classes += "bg-white border-black/[0.08] text-navy";
          }
        } else {
          classes += "bg-white border-black/[0.08] text-navy hover:border-black/20 hover:shadow-sm";
        }
        return (
          <button key={opt} onClick={() => answer(opt)} className={classes}>
            {opt}
          </button>
        );
      })}
    </div>
  );
}
