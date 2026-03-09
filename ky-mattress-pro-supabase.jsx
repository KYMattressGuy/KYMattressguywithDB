import { useState, useEffect, useCallback } from "react";

import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = "https://iefgjjgoswtymucyqlzn.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllZmdqamdvc3d0eW11Y3lxbHpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNjI2NzQsImV4cCI6MjA4ODYzODY3NH0.uoNQcUyaLxgzAczx0sbn9Snabh2jKC4jcmZeYFQFnf0";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── BRAND ──────────────────────────────────────────────────
const NAVY = "#1B2B4B";
const GOLD = "#C9A84C";
const LIGHT = "#F7F8FA";

const CATEGORIES = [
  { id: "mattresses", label: "Mattresses", icon: "🛏️" },
  { id: "adjustable", label: "Adjustable Bases", icon: "⚙️" },
  { id: "soft_goods", label: "Soft Goods", icon: "🧣" },
  { id: "objections", label: "Objection Handling", icon: "🥊" },
  { id: "sleep_science", label: "Sleep Science", icon: "🧠" },
  { id: "competitive", label: "Competitive Intel", icon: "⚔️" },
];

const SAMPLE_QUESTIONS = {
  mattresses: [
    {
      q: "What does 'ILD' stand for in foam mattresses?",
      a: "Indentation Load Deflection — measures foam firmness",
      options: [
        "Indentation Load Deflection — measures foam firmness",
        "Internal Layer Density — measures foam weight",
        "Integrated Latex Design — a construction method",
        "Individual Lumbar Definition — a support zone term",
      ],
    },
    {
      q: "What is the typical lifespan of a quality mattress?",
      a: "7–10 years",
      options: ["3–5 years", "7–10 years", "12–15 years", "20+ years"],
    },
    {
      q: "Which sleep position benefits most from a softer mattress?",
      a: "Side sleeper",
      options: [
        "Stomach sleeper",
        "Back sleeper",
        "Side sleeper",
        "All positions equally",
      ],
    },
  ],
  adjustable: [
    {
      q: "What is the primary benefit of Zero Gravity position?",
      a: "Reduces pressure on the spine and heart",
      options: [
        "Maximizes mattress surface contact",
        "Reduces pressure on the spine and heart",
        "Improves edge support",
        "Increases airflow under the mattress",
      ],
    },
    {
      q: "Which mattress type works BEST with an adjustable base?",
      a: "Memory foam or latex",
      options: [
        "Traditional innerspring",
        "Memory foam or latex",
        "Pillow-top only",
        "Bonnell coil",
      ],
    },
  ],
  objections: [
    {
      q: "Customer says: 'I need to think about it.' Best response?",
      a: "Ask what specifically they need to think through so you can help",
      options: [
        "Give them your card and let them leave",
        "Ask what specifically they need to think through so you can help",
        "Offer a discount immediately",
        "Tell them the sale ends today",
      ],
    },
    {
      q: "Customer says: 'It's too expensive.' Best first move?",
      a: "Explore what budget they had in mind and anchor to cost-per-night",
      options: [
        "Show them a cheaper mattress right away",
        "Explain why quality costs more",
        "Explore what budget they had in mind and anchor to cost-per-night",
        "Match a competitor's price",
      ],
    },
  ],
  sleep_science: [
    {
      q: "How many sleep cycles does a healthy adult complete per night?",
      a: "4–6 cycles",
      options: ["1–2 cycles", "2–3 cycles", "4–6 cycles", "7–9 cycles"],
    },
    {
      q: "What body temperature change triggers sleep onset?",
      a: "Core body temperature drops slightly",
      options: [
        "Core body temperature rises",
        "Core body temperature drops slightly",
        "Skin temperature drops sharply",
        "Brain temperature spikes then falls",
      ],
    },
  ],
  soft_goods: [
    {
      q: "What thread count range is considered luxury for sheets?",
      a: "400–800",
      options: ["100–200", "200–400", "400–800", "1000+"],
    },
    {
      q: "What fill power rating indicates premium down pillows?",
      a: "600+ fill power",
      options: [
        "200–300 fill power",
        "400–500 fill power",
        "600+ fill power",
        "Fill power doesn't apply to pillows",
      ],
    },
  ],
  competitive: [
    {
      q: "Sleep Number's biggest weakness vs. traditional mattresses?",
      a: "Air chambers can leak and require maintenance",
      options: [
        "They only come in one firmness",
        "Air chambers can leak and require maintenance",
        "No warranty offered",
        "Only sold online",
      ],
    },
    {
      q: "What is Mattress Firm's most common sales tactic to counter?",
      a: "Artificial urgency — 'sale ends tonight'",
      options: [
        "Offering free delivery",
        "Artificial urgency — 'sale ends tonight'",
        "Aggressive loyalty programs",
        "In-store sleep tracking demos",
      ],
    },
  ],
};

// ── RANK SYSTEM ────────────────────────────────────────────
const RANKS = [
  { min: 0, label: "Rookie", icon: "🛏️" },
  { min: 100, label: "Floor Starter", icon: "👟" },
  { min: 300, label: "Sleep Advisor", icon: "💬" },
  { min: 600, label: "Mattress Pro", icon: "⭐" },
  { min: 1000, label: "KY Certified", icon: "🏅" },
  { min: 2000, label: "Sleep Master", icon: "🏆" },
  { min: 5000, label: "Grand Mattress Master", icon: "👑" },
];

function getRank(xp) {
  return [...RANKS].reverse().find((r) => xp >= r.min) || RANKS[0];
}

// ── COMPONENTS ─────────────────────────────────────────────
function Spinner() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: NAVY,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🛏️</div>
        <div
          style={{ color: GOLD, fontFamily: "Georgia, serif", fontSize: 18 }}
        >
          Loading...
        </div>
      </div>
    </div>
  );
}

function AuthScreen({ onAuth }) {
  const [mode, setMode] = useState("login"); // login | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [store, setStore] = useState("Richmond, KY");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit() {
    setError("");
    setSuccess("");
    if (!email || !password) {
      setError("Email and password required.");
      return;
    }
    setLoading(true);
    try {
      if (mode === "signup") {
        if (!fullName) {
          setError("Enter your name.");
          setLoading(false);
          return;
        }
        const { data, error: err } = await supabase.auth.signUp({
          email,
          password,
        });
        if (err) throw err;
        if (data.user) {
          await supabase
            .from("profiles")
            .insert({
              id: data.user.id,
              full_name: fullName,
              store_location: store,
              role: "rep",
            });
          await supabase.from("streaks").insert({ user_id: data.user.id });
        }
        setSuccess(
          "Account created! Check your email to confirm, then log in."
        );
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (err) throw err;
      }
    } catch (e) {
      setError(e.message || "Something went wrong.");
    }
    setLoading(false);
  }

  const input = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box",
    marginBottom: 12,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: NAVY,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 52 }}>🛏️</div>
          <div
            style={{
              fontFamily: "Georgia, serif",
              color: GOLD,
              fontSize: 26,
              fontWeight: "bold",
              marginTop: 8,
            }}
          >
            KY Mattress Guy Pro
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 13,
              marginTop: 4,
            }}
          >
            Sales Training Platform
          </div>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.06)",
            borderRadius: 16,
            padding: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              marginBottom: 20,
              background: "rgba(0,0,0,0.3)",
              borderRadius: 8,
              padding: 4,
            }}
          >
            {["login", "signup"].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                style={{
                  flex: 1,
                  padding: "8px 0",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: 14,
                  background: mode === m ? GOLD : "transparent",
                  color: mode === m ? NAVY : "rgba(255,255,255,0.5)",
                  transition: "all 0.2s",
                }}
              >
                {m === "login" ? "Log In" : "Sign Up"}
              </button>
            ))}
          </div>

          {mode === "signup" && (
            <>
              <input
                style={input}
                placeholder="Your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <input
                style={input}
                placeholder="Store location (e.g. Richmond, KY)"
                value={store}
                onChange={(e) => setStore(e.target.value)}
              />
            </>
          )}
          <input
            style={input}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            style={input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />

          {error && (
            <div style={{ color: "#ff6b6b", fontSize: 13, marginBottom: 12 }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ color: "#51cf66", fontSize: 13, marginBottom: 12 }}>
              {success}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px 0",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              background: GOLD,
              color: NAVY,
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            {loading ? "..." : mode === "login" ? "Log In" : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
}

function HomeScreen({
  profile,
  streakData,
  onStartQuiz,
  onViewLeaderboard,
  onManagerDash,
  onSignOut,
}) {
  const rank = getRank(streakData?.total_xp || 0);
  const xp = streakData?.total_xp || 0;

  return (
    <div style={{ minHeight: "100vh", background: LIGHT, paddingBottom: 40 }}>
      {/* Header */}
      <div
        style={{
          background: NAVY,
          padding: "20px 20px 28px",
          borderRadius: "0 0 24px 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              color: GOLD,
              fontFamily: "Georgia, serif",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            🛏️ KY Mattress Guy Pro
          </div>
          <button
            onClick={onSignOut}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "none",
              color: "rgba(255,255,255,0.6)",
              padding: "6px 12px",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 12,
            }}
          >
            Sign Out
          </button>
        </div>
        <div style={{ color: "white" }}>
          <div style={{ fontSize: 22, fontWeight: "bold" }}>
            Hey, {profile?.full_name?.split(" ")[0]}! 👋
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 13,
              marginTop: 2,
            }}
          >
            {profile?.store_location}
          </div>
        </div>
        {/* XP Bar */}
        <div
          style={{
            marginTop: 16,
            background: "rgba(255,255,255,0.08)",
            borderRadius: 12,
            padding: 14,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <span style={{ color: GOLD, fontWeight: "bold" }}>
              {rank.icon} {rank.label}
            </span>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>
              {xp} XP
            </span>
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              borderRadius: 4,
              height: 6,
            }}
          >
            <div
              style={{
                background: GOLD,
                height: 6,
                borderRadius: 4,
                width: `${Math.min(100, (xp % 1000) / 10)}%`,
                transition: "width 0.5s",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 8,
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
              🔥 {streakData?.current_streak || 0} day streak
            </span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
              🎯 Best: {streakData?.longest_streak || 0} days
            </span>
          </div>
        </div>
      </div>

      <div style={{ padding: "20px 16px" }}>
        {/* Manager Dashboard Button */}
        {profile?.role === "manager" && (
          <button
            onClick={onManagerDash}
            style={{
              width: "100%",
              padding: 16,
              background: NAVY,
              border: "none",
              borderRadius: 12,
              color: "white",
              fontWeight: "bold",
              fontSize: 15,
              cursor: "pointer",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            📊 Manager Dashboard
          </button>
        )}

        {/* Category Grid */}
        <div
          style={{
            fontWeight: "bold",
            color: NAVY,
            fontSize: 16,
            marginBottom: 12,
          }}
        >
          Choose a Category
        </div>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onStartQuiz(cat)}
              style={{
                padding: "18px 12px",
                background: "white",
                border: "2px solid transparent",
                borderRadius: 14,
                cursor: "pointer",
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = GOLD)}
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "transparent")
              }
            >
              <div style={{ fontSize: 28 }}>{cat.icon}</div>
              <div
                style={{
                  color: NAVY,
                  fontWeight: "bold",
                  fontSize: 13,
                  marginTop: 6,
                }}
              >
                {cat.label}
              </div>
            </button>
          ))}
        </div>

        {/* Leaderboard Button */}
        <button
          onClick={onViewLeaderboard}
          style={{
            width: "100%",
            marginTop: 16,
            padding: 16,
            background: "white",
            border: `2px solid ${GOLD}`,
            borderRadius: 12,
            color: NAVY,
            fontWeight: "bold",
            fontSize: 15,
            cursor: "pointer",
          }}
        >
          🏆 View Leaderboard
        </button>
      </div>
    </div>
  );
}

function QuizScreen({ category, userId, onDone }) {
  const questions = SAMPLE_QUESTIONS[category.id] || [];
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);

  const q = questions[idx];

  async function saveResult(finalScore) {
    setSaving(true);
    const total = questions.length;
    const percent = Math.round((finalScore / total) * 100);
    const xpEarned = percent >= 80 ? 50 : percent >= 60 ? 30 : 10;

    await supabase
      .from("quiz_results")
      .insert({
        user_id: userId,
        category: category.id,
        score: finalScore,
        total,
        percent,
        xp_earned: xpEarned,
      });

    // Update streak + XP
    const { data: streak } = await supabase
      .from("streaks")
      .select("*")
      .eq("user_id", userId)
      .single();
    const today = new Date().toISOString().split("T")[0];
    const lastPlayed = streak?.last_played_date;
    const isNewDay = lastPlayed !== today;
    const newStreak = isNewDay
      ? (streak?.current_streak || 0) + 1
      : streak?.current_streak || 0;
    const newXP = (streak?.total_xp || 0) + xpEarned;

    await supabase
      .from("streaks")
      .upsert({
        user_id: userId,
        current_streak: newStreak,
        longest_streak: Math.max(newStreak, streak?.longest_streak || 0),
        last_played_date: today,
        total_xp: newXP,
      });
    setSaving(false);
  }

  function answer(opt) {
    if (selected) return;
    setSelected(opt);
    const correct = opt === q.a;
    const newScore = correct ? score + 1 : score;
    setTimeout(() => {
      if (idx + 1 >= questions.length) {
        setScore(newScore);
        setDone(true);
        saveResult(newScore);
      } else {
        setIdx(idx + 1);
        setSelected(null);
        if (correct) setScore(newScore);
      }
    }, 900);
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const msg =
      pct >= 80
        ? "Crushed it! 🔥"
        : pct >= 60
        ? "Solid work! 💪"
        : "Keep grinding! 📚";
    return (
      <div
        style={{
          minHeight: "100vh",
          background: NAVY,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <div style={{ textAlign: "center", color: "white" }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>
            {pct >= 80 ? "🏆" : pct >= 60 ? "⭐" : "📚"}
          </div>
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 28,
              color: GOLD,
              marginBottom: 8,
            }}
          >
            {msg}
          </div>
          <div style={{ fontSize: 48, fontWeight: "bold", margin: "16px 0" }}>
            {pct}%
          </div>
          <div style={{ color: "rgba(255,255,255,0.6)", marginBottom: 32 }}>
            {score} of {questions.length} correct —{" "}
            {saving ? "Saving..." : "Saved! ✓"}
          </div>
          <button
            onClick={onDone}
            style={{
              padding: "14px 32px",
              background: GOLD,
              border: "none",
              borderRadius: 12,
              color: NAVY,
              fontWeight: "bold",
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!q)
    return (
      <div
        style={{
          padding: 24,
          color: "white",
          background: NAVY,
          minHeight: "100vh",
        }}
      >
        No questions available.
      </div>
    );

  return (
    <div style={{ minHeight: "100vh", background: LIGHT, padding: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div style={{ fontWeight: "bold", color: NAVY }}>
          {category.icon} {category.label}
        </div>
        <div style={{ color: "rgba(0,0,0,0.4)", fontSize: 13 }}>
          {idx + 1} / {questions.length}
        </div>
      </div>
      <div
        style={{
          background: "rgba(201,168,76,0.15)",
          borderRadius: 4,
          height: 6,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            background: GOLD,
            height: 6,
            borderRadius: 4,
            width: `${((idx + 1) / questions.length) * 100}%`,
            transition: "width 0.3s",
          }}
        />
      </div>
      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: 24,
          marginBottom: 20,
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        }}
      >
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 18,
            color: NAVY,
            lineHeight: 1.5,
          }}
        >
          {q.q}
        </div>
      </div>
      {q.options.map((opt) => {
        let bg = "white",
          border = "2px solid rgba(0,0,0,0.08)",
          color = NAVY;
        if (selected) {
          if (opt === q.a) {
            bg = "#d4edda";
            border = "2px solid #28a745";
          } else if (opt === selected) {
            bg = "#f8d7da";
            border = "2px solid #dc3545";
          }
        }
        return (
          <button
            key={opt}
            onClick={() => answer(opt)}
            style={{
              width: "100%",
              padding: "14px 16px",
              marginBottom: 10,
              background: bg,
              border,
              borderRadius: 12,
              cursor: "pointer",
              textAlign: "left",
              color,
              fontSize: 14,
              fontWeight: "500",
              transition: "all 0.2s",
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function LeaderboardScreen({ onBack }) {
  const [board, setBoard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("leaderboard").select("*").limit(20);
      setBoard(data || []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: LIGHT, padding: 20 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 24,
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            fontSize: 22,
            cursor: "pointer",
          }}
        >
          ←
        </button>
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 22,
            fontWeight: "bold",
            color: NAVY,
          }}
        >
          🏆 Leaderboard
        </div>
      </div>
      {loading ? (
        <div style={{ textAlign: "center", color: NAVY, padding: 40 }}>
          Loading...
        </div>
      ) : board.length === 0 ? (
        <div
          style={{ textAlign: "center", padding: 40, color: "rgba(0,0,0,0.4)" }}
        >
          No reps yet — be the first! 🚀
        </div>
      ) : (
        board.map((rep, i) => {
          const rank = getRank(rep.total_xp || 0);
          return (
            <div
              key={rep.id}
              style={{
                background: "white",
                borderRadius: 14,
                padding: "14px 16px",
                marginBottom: 10,
                display: "flex",
                alignItems: "center",
                gap: 14,
                boxShadow:
                  i < 3
                    ? `0 2px 12px rgba(201,168,76,0.2)`
                    : "0 1px 6px rgba(0,0,0,0.05)",
                border: i === 0 ? `2px solid ${GOLD}` : "2px solid transparent",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background:
                    i === 0
                      ? GOLD
                      : i === 1
                      ? "#C0C0C0"
                      : i === 2
                      ? "#CD7F32"
                      : LIGHT,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  color: i < 3 ? "white" : NAVY,
                  fontSize: 16,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "bold", color: NAVY, fontSize: 15 }}>
                  {rep.full_name}
                </div>
                <div style={{ color: "rgba(0,0,0,0.45)", fontSize: 12 }}>
                  {rank.icon} {rank.label} · {rep.store_location}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: "bold", color: GOLD, fontSize: 16 }}>
                  {rep.total_xp || 0} XP
                </div>
                <div style={{ color: "rgba(0,0,0,0.4)", fontSize: 11 }}>
                  {rep.avg_score || 0}% avg
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

function ManagerDashboard({ onBack }) {
  const [reps, setReps] = useState([]);
  const [catData, setCatData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    async function load() {
      const [{ data: board }, { data: cats }] = await Promise.all([
        supabase.from("leaderboard").select("*"),
        supabase.from("category_averages").select("*"),
      ]);
      setReps(board || []);
      setCatData(cats || []);
      setLoading(false);
    }
    load();
  }, []);

  function repCats(repId) {
    return catData.filter((c) => c.user_id === repId);
  }

  return (
    <div style={{ minHeight: "100vh", background: LIGHT, padding: 20 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            fontSize: 22,
            cursor: "pointer",
          }}
        >
          ←
        </button>
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 22,
            fontWeight: "bold",
            color: NAVY,
          }}
        >
          📊 Manager Dashboard
        </div>
      </div>

      {/* Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 10,
          marginBottom: 20,
        }}
      >
        {[
          { label: "Total Reps", value: reps.length },
          {
            label: "Avg Score",
            value: reps.length
              ? Math.round(
                  reps.reduce((a, r) => a + (r.avg_score || 0), 0) / reps.length
                ) + "%"
              : "—",
          },
          {
            label: "Total Quizzes",
            value: reps.reduce((a, r) => a + (r.total_quizzes || 0), 0),
          },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: "white",
              borderRadius: 12,
              padding: "14px 12px",
              textAlign: "center",
              boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontWeight: "bold", color: NAVY, fontSize: 22 }}>
              {s.value}
            </div>
            <div
              style={{ color: "rgba(0,0,0,0.45)", fontSize: 11, marginTop: 2 }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 40 }}>Loading...</div>
      ) : reps.length === 0 ? (
        <div
          style={{ textAlign: "center", padding: 40, color: "rgba(0,0,0,0.4)" }}
        >
          No reps have signed up yet.
        </div>
      ) : (
        reps.map((rep) => {
          const isOpen = selected === rep.id;
          const cats = repCats(rep.id);
          const rank = getRank(rep.total_xp || 0);
          return (
            <div
              key={rep.id}
              style={{
                background: "white",
                borderRadius: 14,
                marginBottom: 10,
                overflow: "hidden",
                boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
              }}
            >
              <div
                onClick={() => setSelected(isOpen ? null : rep.id)}
                style={{
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: NAVY,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: GOLD,
                    fontWeight: "bold",
                    fontSize: 16,
                    flexShrink: 0,
                  }}
                >
                  {rep.full_name?.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "bold", color: NAVY }}>
                    {rep.full_name}
                  </div>
                  <div style={{ color: "rgba(0,0,0,0.45)", fontSize: 12 }}>
                    {rank.icon} {rank.label} · {rep.store_location}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontWeight: "bold",
                      color:
                        rep.avg_score >= 80
                          ? "#28a745"
                          : rep.avg_score >= 60
                          ? GOLD
                          : "#dc3545",
                      fontSize: 16,
                    }}
                  >
                    {rep.avg_score || 0}%
                  </div>
                  <div style={{ color: "rgba(0,0,0,0.4)", fontSize: 11 }}>
                    {rep.total_xp || 0} XP · {rep.current_streak || 0}🔥
                  </div>
                </div>
                <div style={{ color: "rgba(0,0,0,0.3)" }}>
                  {isOpen ? "▲" : "▼"}
                </div>
              </div>
              {isOpen && (
                <div
                  style={{
                    borderTop: "1px solid rgba(0,0,0,0.06)",
                    padding: "12px 16px",
                    background: LIGHT,
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                      color: NAVY,
                      marginBottom: 10,
                    }}
                  >
                    CATEGORY BREAKDOWN
                  </div>
                  {cats.length === 0 ? (
                    <div style={{ color: "rgba(0,0,0,0.4)", fontSize: 13 }}>
                      No quizzes completed yet.
                    </div>
                  ) : (
                    cats.map((c) => {
                      const cat = CATEGORIES.find((x) => x.id === c.category);
                      return (
                        <div key={c.category} style={{ marginBottom: 8 }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              fontSize: 13,
                              marginBottom: 4,
                            }}
                          >
                            <span style={{ color: NAVY }}>
                              {cat?.icon} {cat?.label || c.category}
                            </span>
                            <span
                              style={{
                                fontWeight: "bold",
                                color:
                                  c.avg_percent >= 80
                                    ? "#28a745"
                                    : c.avg_percent >= 60
                                    ? GOLD
                                    : "#dc3545",
                              }}
                            >
                              {c.avg_percent}%
                            </span>
                          </div>
                          <div
                            style={{
                              background: "rgba(0,0,0,0.08)",
                              borderRadius: 4,
                              height: 5,
                            }}
                          >
                            <div
                              style={{
                                background:
                                  c.avg_percent >= 80
                                    ? "#28a745"
                                    : c.avg_percent >= 60
                                    ? GOLD
                                    : "#dc3545",
                                height: 5,
                                borderRadius: 4,
                                width: `${c.avg_percent}%`,
                              }}
                            />
                          </div>
                        </div>
                      );
                      cdn.jsdelivr.net;
                    })
                  )}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

// ── MAIN APP ───────────────────────────────────────────────
export default function App() {
  const [session, setSession] = useState(undefined); // undefined = loading
  const [profile, setProfile] = useState(null);
  const [streakData, setStreakData] = useState(null);
  const [screen, setScreen] = useState("home"); // home | quiz | leaderboard | manager
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_e, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session?.user) loadProfile(session.user.id);
    else {
      setProfile(null);
      setStreakData(null);
    }
  }, [session]);

  async function loadProfile(uid) {
    const [{ data: p }, { data: s }] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", uid).single(),
      supabase.from("streaks").select("*").eq("user_id", uid).single(),
    ]);
    setProfile(p);
    setStreakData(s);
  }

  if (session === undefined) return <Spinner />;
  if (!session) return <AuthScreen onAuth={() => {}} />;
  if (!profile) return <Spinner />;

  if (screen === "quiz" && activeCategory) {
    return (
      <QuizScreen
        category={activeCategory}
        userId={session.user.id}
        onDone={() => {
          setScreen("home");
          loadProfile(session.user.id);
        }}
      />
    );
  }
  if (screen === "leaderboard")
    return <LeaderboardScreen onBack={() => setScreen("home")} />;
  if (screen === "manager")
    return <ManagerDashboard onBack={() => setScreen("home")} />;

  return (
    <HomeScreen
      profile={profile}
      streakData={streakData}
      onStartQuiz={(cat) => {
        setActiveCategory(cat);
        setScreen("quiz");
      }}
      onViewLeaderboard={() => setScreen("leaderboard")}
      onManagerDash={() => setScreen("manager")}
      onSignOut={() => supabase.auth.signOut()}
    />
  );
}
