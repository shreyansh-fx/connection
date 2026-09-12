"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
  signInWithGoogle: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    console.log("[AUTH] Checking initial session on startup...");

    supabase.auth
      .getSession()
      .then(({ data: { session: initialSession }, error }) => {
        if (error) {
          console.error("[AUTH] Error getting initial session:", error.message);
        }
        console.log(
          "[AUTH] Current session on app startup:",
          initialSession ? initialSession.user.email : "No session"
        );
        setSession(initialSession);
        setUser(initialSession?.user ?? null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("[AUTH] Unexpected session fetch error:", err);
        setLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, newSession) => {
      console.log(`[AUTH] Auth state change event: ${event}`, {
        email: newSession?.user?.email ?? null,
      });

      if (event === "SIGNED_IN") {
        console.log("[AUTH] SIGNED_IN:", newSession?.user?.email);
        setSession(newSession);
        setUser(newSession?.user ?? null);
        setLoading(false);
      } else if (event === "SIGNED_OUT") {
        console.log("[AUTH] SIGNED_OUT event received");
        setSession(null);
        setUser(null);
        setLoading(false);
      } else {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    console.log("[AUTH] Starting Google OAuth signIn...");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          prompt: "select_account",
          access_type: "offline",
        },
      },
    });

    if (error) {
      console.error("[AUTH] Google signIn error:", error.message);
      throw error;
    }
  };

  const signOut = async () => {
    console.log("[AUTH] Executing full signOut...");
    try {
      // 1. Client-side global sign out
      await supabase.auth.signOut({ scope: "global" });
    } catch (err) {
      console.error("[AUTH] Client signOut error:", err);
    }

    try {
      // 2. Invalidate server-side cookies
      await fetch("/api/auth/signout", { method: "POST" });
    } catch (err) {
      console.error("[AUTH] Server signOut error:", err);
    }

    // 3. Clear any sb- cookies directly from document
    if (typeof document !== "undefined") {
      document.cookie.split(";").forEach((cookie) => {
        const name = cookie.split("=")[0].trim();
        if (name.startsWith("sb-")) {
          document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0`;
        }
      });
    }

    // 4. Clear React state
    setSession(null);
    setUser(null);
    console.log("[AUTH] SIGNED_OUT: Local state reset. Hard redirecting to /login");

    // 5. Full page navigation to /login to ensure clean state
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signOut,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
