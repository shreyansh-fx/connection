"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await signOut();
    } catch (e) {
      console.error("[NAVBAR] Logout error:", e);
      setLoggingOut(false);
    }
  };

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Brand */}
        <a href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
            C
          </div>
          <span className="text-xl font-bold text-indigo-600 tracking-tight">
            Campus Collab
          </span>
        </a>

        {/* Nav Links */}
        <nav className="flex items-center gap-6 text-sm font-medium">
          <a
            href="/dashboard"
            className={
              pathname === "/dashboard"
                ? "font-semibold text-indigo-600"
                : "text-slate-600 hover:text-indigo-600 transition"
            }
          >
            Dashboard
          </a>
          <a
            href="/profile/view"
            className={
              pathname === "/profile/view"
                ? "font-semibold text-indigo-600"
                : "text-slate-600 hover:text-indigo-600 transition"
            }
          >
            View Profile
          </a>
          <a
            href="/profile"
            className={
              pathname === "/profile"
                ? "font-semibold text-indigo-600"
                : "text-slate-600 hover:text-indigo-600 transition"
            }
          >
            Edit Profile
          </a>
          <a
            href="/events"
            className={
              pathname.startsWith("/events") || pathname.startsWith("/requests")
                ? "font-semibold text-indigo-600"
                : "text-slate-600 hover:text-indigo-600 transition"
            }
          >
            Events
          </a>
        </nav>

        {/* User Info & Logout */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              {user.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="User avatar"
                  className="w-8 h-8 rounded-full border border-slate-200 object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-semibold text-xs">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="hidden md:inline-block text-xs font-medium text-slate-600 truncate max-w-[150px]">
                {user.email}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="rounded-lg bg-red-50 px-3.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 transition border border-red-200 disabled:opacity-50 cursor-pointer"
              >
                {loggingOut ? "Logging out..." : "Log Out"}
              </button>
            </div>
          ) : (
            <a
              href="/login"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition"
            >
              Sign In
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
