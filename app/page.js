"use client";

import { useState, useEffect, useCallback, useReducer } from "react";
import { supabase } from "@/lib/supabase";
import Auth from "./components/Auth";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Board from "./components/Board";
import Manager from "./components/Manager";
import Spinner from "./components/Spinner";

function reducer(state, action) {
  switch (action.type) {
    case "session":
      return { ...state, session: action.session, profileLoaded: false };
    case "profile":
      return {
        ...state,
        profile: action.profile,
        streak: action.streak,
        profileLoaded: true,
      };
    case "clear":
      return { ...state, profile: null, streak: null, profileLoaded: false };
    default:
      return state;
  }
}

export default function Page() {
  const [state, dispatch] = useReducer(reducer, {
    session: undefined,
    profile: null,
    streak: null,
    profileLoaded: false,
  });
  const [screen, setScreen] = useState("home");
  const [activeCat, setActiveCat] = useState(null);

  const { session, profile, streak, profileLoaded } = state;

  const load = useCallback(async (uid) => {
    const [{ data: p }, { data: s }] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", uid).single(),
      supabase.from("streaks").select("*").eq("user_id", uid).single(),
    ]);
    dispatch({ type: "profile", profile: p, streak: s });
  }, []);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session: s } }) =>
        dispatch({ type: "session", session: s })
      );
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, s) =>
      dispatch({ type: "session", session: s })
    );
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session?.user) {
      dispatch({ type: "clear" });
      return;
    }
    let cancelled = false;
    (async () => {
      const [{ data: p, error: pErr }, { data: s, error: sErr }] =
        await Promise.all([
          supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single(),
          supabase
            .from("streaks")
            .select("*")
            .eq("user_id", session.user.id)
            .single(),
        ]);
      if (!cancelled) {
        if (pErr) {
          console.warn("Profile fetch error:", pErr.message);
        }
        if (sErr) {
          console.warn("Streak fetch error:", sErr.message);
        }
        dispatch({
          type: "profile",
          profile: p || {
            id: session.user.id,
            full_name: session.user.email?.split("@")[0] || "User",
            store_location: "",
            role: "rep",
          },
          streak: s || {
            user_id: session.user.id,
            current_streak: 0,
            longest_streak: 0,
            total_xp: 0,
          },
        });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [session]);

  if (session === undefined) return <Spinner />;
  if (!session) return <Auth />;
  if (!profileLoaded) return <Spinner />;

  if (screen === "quiz" && activeCat)
    return (
      <Quiz
        cat={activeCat}
        userId={session.user.id}
        onDone={() => {
          setScreen("home");
          load(session.user.id);
        }}
      />
    );
  if (screen === "board") return <Board onBack={() => setScreen("home")} />;
  if (screen === "manager")
    return <Manager onBack={() => setScreen("home")} />;

  return (
    <Home
      profile={profile}
      streak={streak}
      onQuiz={(cat) => {
        setActiveCat(cat);
        setScreen("quiz");
      }}
      onBoard={() => setScreen("board")}
      onManager={() => setScreen("manager")}
      onSignOut={() => supabase.auth.signOut()}
    />
  );
}
