"use client";

import { useState, useEffect, useCallback, useReducer } from "react";
import { supabase } from "@/lib/supabase";
import Auth from "./components/Auth";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Board from "./components/Board";
import Manager from "./components/Manager";
import Spinner from "./components/Spinner";
import BottomNav from "./components/BottomNav";

function reducer(state, action) {
  switch (action.type) {
    case "session":
      return { ...state, session: action.session, profileLoaded: false };
    case "profile":
      return { ...state, profile: action.profile, streak: action.streak, profileLoaded: true };
    case "clear":
      return { ...state, profile: null, streak: null, profileLoaded: false };
    default:
      return state;
  }
}

export default function Page() {
  const [state, dispatch] = useReducer(reducer, {
    session: undefined, profile: null, streak: null, profileLoaded: false,
  });
  const [screen, setScreen] = useState("home");
  const [activeCat, setActiveCat] = useState(null);
  const [activeStore, setActiveStore] = useState(null);

  const { session, profile, streak, profileLoaded } = state;
  const currentStore = activeStore || profile?.store_location || "MW";

  const load = useCallback(async (uid) => {
    const [{ data: p }, { data: s }] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", uid).single(),
      supabase.from("streaks").select("*").eq("user_id", uid).single(),
    ]);
    dispatch({ type: "profile", profile: p, streak: s });
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) =>
      dispatch({ type: "session", session: s })
    );
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) =>
      dispatch({ type: "session", session: s })
    );
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session?.user) { dispatch({ type: "clear" }); return; }
    let cancelled = false;
    (async () => {
      const [{ data: p, error: pErr }, { data: s, error: sErr }] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", session.user.id).single(),
        supabase.from("streaks").select("*").eq("user_id", session.user.id).single(),
      ]);
      if (!cancelled) {
        if (pErr) console.warn("Profile fetch error:", pErr.message);
        if (sErr) console.warn("Streak fetch error:", sErr.message);
        dispatch({
          type: "profile",
          profile: p || { id: session.user.id, full_name: session.user.email?.split("@")[0] || "User", store_location: "", role: "rep" },
          streak: s || { user_id: session.user.id, current_streak: 0, longest_streak: 0, total_xp: 0 },
        });
      }
    })();
    return () => { cancelled = true; };
  }, [session]);

  if (session === undefined) return <Spinner />;
  if (!session) return <Auth />;
  if (!profileLoaded) return <Spinner />;

  if (screen === "quiz" && activeCat)
    return (
      <Quiz
        cat={activeCat}
        userId={session.user.id}
        userStore={currentStore}
        userXp={streak?.total_xp || 0}
        onDone={() => { setScreen("home"); load(session.user.id); }}
      />
    );

  const isManager = profile?.role === "manager";

  return (
    <div className="min-h-screen pb-20">
      <div className={screen === "home" ? "animate-fade-in" : "animate-slide-in"} key={screen}>
        {screen === "home" && (
          <Home
            profile={profile}
            streak={streak}
            activeStore={currentStore}
            onStoreChange={setActiveStore}
            onQuiz={(cat) => { setActiveCat(cat); setScreen("quiz"); }}
          />
        )}
        {screen === "board" && <Board onBack={() => setScreen("home")} />}
        {screen === "manager" && <Manager onBack={() => setScreen("home")} />}
        {screen === "profile" && (
          <ProfileScreen
            profile={profile}
            streak={streak}
            onSignOut={() => supabase.auth.signOut()}
          />
        )}
      </div>
      <BottomNav
        screen={screen}
        onNavigate={setScreen}
        isManager={isManager}
      />
    </div>
  );
}

function ProfileScreen({ profile, streak, onSignOut }) {
  const { getRank } = require("@/lib/utils");
  const { RANKS, STORES } = require("@/lib/constants");
  const xp = streak?.total_xp || 0;
  const rank = getRank(xp);
  const next = RANKS.find((r) => r.min > xp);
  const storeName = STORES.find((s) => s.id === profile?.store_location)?.label || profile?.store_location;

  return (
    <div className="min-h-screen bg-surface safe-top">
      <div className="bg-surface-dark px-5 pt-8 pb-10 text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white text-3xl font-bold mx-auto mb-3">
          {profile?.full_name?.charAt(0)}
        </div>
        <div className="text-white text-xl font-bold">{profile?.full_name}</div>
        <div className="text-muted text-sm mt-1">{storeName}</div>
        <div className="text-accent text-sm font-medium mt-1">{rank.icon} {rank.label}</div>
      </div>
      <div className="px-5 -mt-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="grid grid-cols-3 gap-4 text-center mb-5">
            <div>
              <div className="text-2xl font-bold text-surface-dark">{xp}</div>
              <div className="text-muted text-xs">Total XP</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-surface-dark">{streak?.current_streak || 0}</div>
              <div className="text-muted text-xs">Day Streak</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-surface-dark">{streak?.longest_streak || 0}</div>
              <div className="text-muted text-xs">Best Streak</div>
            </div>
          </div>
          {next && (
            <div className="text-center text-sm text-muted mb-4">
              {next.min - xp} XP to <span className="font-medium text-surface-dark">{next.icon} {next.label}</span>
            </div>
          )}
          <button
            onClick={onSignOut}
            className="w-full py-3 rounded-xl border-2 border-error/20 bg-error/5 text-error font-semibold text-sm cursor-pointer hover:bg-error/10 transition"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
