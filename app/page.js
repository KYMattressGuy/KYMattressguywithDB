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
      return { ...state, session: action.session };
    case "profile":
      return { ...state, profile: action.profile, streak: action.streak };
    case "clear":
      return { ...state, profile: null, streak: null };
    default:
      return state;
  }
}

export default function Page() {
  const [state, dispatch] = useReducer(reducer, {
    session: undefined,
    profile: null,
    streak: null,
  });
  const [screen, setScreen] = useState("home");
  const [activeCat, setActiveCat] = useState(null);

  const { session, profile, streak } = state;

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
      const [{ data: p }, { data: s }] = await Promise.all([
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
        dispatch({ type: "profile", profile: p, streak: s });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [session]);

  if (session === undefined) return <Spinner />;
  if (!session) return <Auth />;
  if (!profile) return <Spinner />;

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
