"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [store, setStore] = useState("Richmond, KY");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  async function go() {
    setErr("");
    setOk("");
    setLoading(true);
    try {
      if (mode === "signup") {
        if (!name) {
          setErr("Enter your name.");
          setLoading(false);
          return;
        }
        const { data, error: e } = await supabase.auth.signUp({
          email,
          password: pw,
        });
        if (e) throw e;
        if (data.user) {
          await supabase.from("profiles").insert({
            id: data.user.id,
            full_name: name,
            store_location: store,
            role: "rep",
          });
          await supabase.from("streaks").insert({ user_id: data.user.id });
        }
        setOk("Account created! Check your email to confirm, then log in.");
      } else {
        const { error: e } = await supabase.auth.signInWithPassword({
          email,
          password: pw,
        });
        if (e) throw e;
      }
    } catch (e) {
      setErr(e.message || "Something went wrong.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-8">
          <div className="text-5xl">🛏️</div>
          <div className="font-serif text-gold text-2xl font-bold mt-2">
            KY Mattress Guy Pro
          </div>
          <div className="text-white/50 text-sm mt-1">
            Sales Training Platform — v10
          </div>
        </div>

        <div className="bg-white/[0.06] rounded-2xl p-7">
          <div className="flex mb-5 bg-black/30 rounded-lg p-1">
            {["login", "signup"].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2 rounded-md border-none cursor-pointer font-bold text-sm transition-colors ${
                  mode === m
                    ? "bg-gold text-navy"
                    : "bg-transparent text-white/50 hover:text-white/70"
                }`}
              >
                {m === "login" ? "Log In" : "Sign Up"}
              </button>
            ))}
          </div>

          {mode === "signup" && (
            <>
              <input
                className="w-full px-3.5 py-3 rounded-lg border border-white/15 bg-white/[0.08] text-white text-[15px] outline-none mb-3 placeholder:text-white/40"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="w-full px-3.5 py-3 rounded-lg border border-white/15 bg-white/[0.08] text-white text-[15px] outline-none mb-3 placeholder:text-white/40"
                placeholder="Store location (e.g. Richmond, KY)"
                value={store}
                onChange={(e) => setStore(e.target.value)}
              />
            </>
          )}

          <input
            className="w-full px-3.5 py-3 rounded-lg border border-white/15 bg-white/[0.08] text-white text-[15px] outline-none mb-3 placeholder:text-white/40"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full px-3.5 py-3 rounded-lg border border-white/15 bg-white/[0.08] text-white text-[15px] outline-none mb-3 placeholder:text-white/40"
            type="password"
            placeholder="Password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && go()}
          />

          {err && <div className="text-red-400 text-sm mb-2.5">{err}</div>}
          {ok && <div className="text-green-400 text-sm mb-2.5">{ok}</div>}

          <button
            onClick={go}
            disabled={loading}
            className="w-full py-3.5 rounded-lg border-none cursor-pointer bg-gold text-navy font-bold text-base hover:brightness-110 transition disabled:opacity-60"
          >
            {loading ? "..." : mode === "login" ? "Log In" : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
}
