"use client";

import { useAuth } from "@/context/AuthContext";

export default function LogoutButton() {
  const { signOut } = useAuth();

  return (
    <button
      onClick={() => signOut()}
      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500 shadow-sm cursor-pointer"
    >
      Log Out
    </button>
  );
}
