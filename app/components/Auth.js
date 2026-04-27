"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { STORES } from "@/lib/constants";

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [store, setStore] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  async function go() {
    setErr("");
    setOk("");
    setLoading(true);
    try {
      if (mode === "signup") {
        if (!name) { setErr("Enter your name."); setLoading(false); return; }
        if (!store) { setErr("Select your store."); setLoading(false); return; }
        const { data, error: e } = await supabase.auth.signUp({ email, password: pw });
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
        const { error: e } = await supabase.auth.signInWithPassword({ email, password: pw });
        if (e) throw e;
      }
    } catch (e) {
      setErr(e.message || "Something went wrong.");
    }
    setLoading(false);
  }

  const inputCls = "w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/[0.05] text-white text-[15px] outline-none placeholder:text-white/25 focus:border-primary-light/40 focus:bg-white/[0.08] transition-all";

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-6">
      <div className="w-full max-w-[400px] animate-fade-in">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 mb-4">
            <span className="text-3xl">🎓</span>
          </div>
          <h1 className="text-2xl font-bold text-white">
            RetailSleep Academy
          </h1>
          <p className="text-muted text-sm mt-1.5">Train smarter. Sell better.</p>
        </div>

        <div className="glass rounded-2xl p-7">
          <div className="flex mb-6 bg-white/[0.05] rounded-xl p-1">
            {["login", "signup"].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2.5 rounded-lg border-none cursor-pointer font-semibold text-sm transition-all ${
                  mode === m
                    ? "bg-primary text-white shadow-md"
                    : "bg-transparent text-white/40 hover:text-white/60"
                }`}
              >
                {m === "login" ? "Log In" : "Sign Up"}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {mode === "signup" && (
              <>
                <input className={inputCls} placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} />
                <div className="grid grid-cols-3 gap-2">
                  {STORES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setStore(s.id)}
                      className={`py-3 px-2 rounded-xl border-2 text-center cursor-pointer transition-all text-xs font-medium ${
                        store === s.id
                          ? "border-primary bg-primary/20 text-white"
                          : "border-white/10 bg-white/[0.03] text-white/50 hover:border-white/20"
                      }`}
                    >
                      <div className="text-lg mb-1">{s.icon}</div>
                      {s.label.split(" ").map((w, i) => <div key={i}>{w}</div>)}
                    </button>
                  ))}
                </div>
              </>
            )}
            <input className={inputCls} type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className={inputCls} type="password" placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)} onKeyDown={(e) => e.key === "Enter" && go()} />
          </div>

          {err && <div className="mt-3 px-3 py-2 rounded-lg bg-error/10 text-error text-sm animate-fade-in">{err}</div>}
          {ok && <div className="mt-3 px-3 py-2 rounded-lg bg-success/10 text-success text-sm animate-fade-in">{ok}</div>}

          <button
            onClick={go}
            disabled={loading}
            className="w-full mt-5 py-3.5 rounded-xl border-none cursor-pointer bg-primary text-white font-semibold text-[15px] shadow-lg shadow-primary/25 hover:bg-primary-light hover:-translate-y-0.5 transition-all disabled:opacity-50"
          >
            {loading ? <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : mode === "login" ? "Log In" : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
}
