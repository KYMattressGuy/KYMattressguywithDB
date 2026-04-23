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
    <div className="min-h-screen gradient-radial flex items-center justify-center p-6">
      <div className="w-full max-w-[420px] animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo to-violet shadow-lg shadow-indigo/30 mb-4">
            <span className="text-4xl">🎓</span>
          </div>
          <h1 className="text-3xl font-bold gradient-text mt-2">
            RetailSleep Academy
          </h1>
          <p className="text-muted text-sm mt-2">
            Train smarter. Sell better.
          </p>
        </div>

        {/* Card */}
        <div className="glass rounded-3xl p-8">
          {/* Tabs */}
          <div className="flex mb-6 bg-white/[0.06] rounded-full p-1">
            {["login", "signup"].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2.5 rounded-full border-none cursor-pointer font-semibold text-sm transition-all duration-300 ${
                  mode === m
                    ? "bg-accent text-surface-dark shadow-md shadow-accent/25"
                    : "bg-transparent text-white/50 hover:text-white/80"
                }`}
              >
                {m === "login" ? "Log In" : "Sign Up"}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {mode === "signup" && (
              <>
                <input
                  className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/[0.06] text-white text-[15px] outline-none placeholder:text-white/30 focus:border-indigo/50 focus:bg-white/[0.08] transition-all"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/[0.06] text-white text-[15px] outline-none placeholder:text-white/30 focus:border-indigo/50 focus:bg-white/[0.08] transition-all"
                  placeholder="Store location"
                  value={store}
                  onChange={(e) => setStore(e.target.value)}
                />
              </>
            )}

            <input
              className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/[0.06] text-white text-[15px] outline-none placeholder:text-white/30 focus:border-indigo/50 focus:bg-white/[0.08] transition-all"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/[0.06] text-white text-[15px] outline-none placeholder:text-white/30 focus:border-indigo/50 focus:bg-white/[0.08] transition-all"
              type="password"
              placeholder="Password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && go()}
            />
          </div>

          {err && (
            <div className="mt-3 px-3 py-2 rounded-lg bg-error/10 text-error text-sm animate-fade-in">
              {err}
            </div>
          )}
          {ok && (
            <div className="mt-3 px-3 py-2 rounded-lg bg-success/10 text-success text-sm animate-fade-in">
              {ok}
            </div>
          )}

          <button
            onClick={go}
            disabled={loading}
            className="w-full mt-5 py-4 rounded-full border-none cursor-pointer bg-gradient-to-r from-accent to-accent-light text-surface-dark font-bold text-base shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:translate-y-0"
          >
            {loading ? (
              <span className="inline-block w-5 h-5 border-2 border-surface-dark/30 border-t-surface-dark rounded-full animate-spin" />
            ) : mode === "login" ? (
              "Log In"
            ) : (
              "Create Account"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
