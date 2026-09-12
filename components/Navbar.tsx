"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading, signOut } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      await signOut();
    } catch (error) {
      console.error("[NAVBAR] Logout error:", error);
      setLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* CampusCollab Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-lg font-bold text-white">
            C
          </div>

          <span className="text-xl font-bold tracking-tight text-indigo-600">
            CampusCollab
          </span>
        </a>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm font-medium">

          <a
            href="/"
            className={
              pathname === "/" || pathname === "/home"
                ? "rounded-full bg-indigo-500 px-5 py-2 text-white"
                : "text-slate-600 transition hover:text-indigo-600"
            }
          >
            Home
          </a>

          <a
            href="/events"
            className={
              pathname.startsWith("/events") ||
                pathname.startsWith("/requests")
                ? "font-semibold text-indigo-600"
                : "text-slate-600 transition hover:text-indigo-600"
            }
          >
            Events
          </a>

        </nav>

        {/* Login / Profile */}
        <div className="flex items-center gap-3">

          {loading ? null : user ? (
            <>
              <a
                href="/profile/view"
                className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600"
              >
                {user.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt="Profile"
                    className="h-8 w-8 rounded-full border border-slate-200 object-cover"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                    {user.email?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}

                <span>Profile</span>
              </a>

              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="text-sm font-medium text-slate-600 transition hover:text-red-600 disabled:opacity-50"
              >
                {loggingOut ? "Logging out..." : "Log Out"}
              </button>
            </>
          ) : (
            <a
              href="/login"
              className="text-sm font-medium text-slate-700 transition hover:text-indigo-600"
            >
              Login
            </a>
          )}

        </div>
      </div>
    </header>
  );
}