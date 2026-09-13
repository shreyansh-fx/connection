"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/lib/supabase/client";

type Connection = {
  id: string;
  request_id: string;
  user1_id: string;
  user2_id: string;
  otherUser: {
    full_name: string | null;
    email: string | null;
    avatar_url: string | null;
  } | null;
};

export default function ConnectionsPage() {
  const supabase = useMemo(() => createClient(), []);
  const { user, loading: authLoading } = useAuth();
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      return;
    }
    const currentUser = user;

    let isMounted = true;
    async function loadConnections() {
      setLoading(true);
      setError(null);

      const { data, error: connectionError } = await supabase
        .from("connections")
        .select("id, request_id, user1_id, user2_id")
        .or(`user1_id.eq.${currentUser.id},user2_id.eq.${currentUser.id}`)
        .order("created_at", { ascending: false });

      if (connectionError) {
        if (isMounted) setError(connectionError.message);
        setLoading(false);
        return;
      }

      const rows = await Promise.all(
        (data ?? []).map(async (connection) => {
          const otherUserId =
            connection.user1_id === currentUser.id
              ? connection.user2_id
              : connection.user1_id;
          const { data: profile } = await supabase
            .from("profile")
            .select("full_name, email, avatar_url")
            .eq("id", otherUserId)
            .maybeSingle();

          return { ...connection, otherUser: profile };
        }),
      );

      if (isMounted) setConnections(rows);
      setLoading(false);
    }

    void loadConnections();
    return () => {
      isMounted = false;
    };
  }, [authLoading, supabase, user]);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-bold text-slate-900">Connections</h1>
        <p className="mt-2 text-slate-600">
          Chat with people you have connected with.
        </p>

        {loading && (
          <p className="mt-8 text-sm text-slate-500">Loading connections...</p>
        )}
        {error && (
          <p className="mt-8 rounded-lg bg-red-50 p-4 text-sm text-red-700">
            {error}
          </p>
        )}
        {!loading && !error && connections.length === 0 && (
          <p className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
            No connections yet.
          </p>
        )}

        <div className="mt-8 space-y-4">
          {connections.map((connection) => {
            const name = connection.otherUser?.full_name || "Campus student";
            return (
              <article
                key={connection.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex min-w-0 items-center gap-3">
                  {connection.otherUser?.avatar_url ? (
                    <img
                      src={connection.otherUser.avatar_url}
                      alt=""
                      className="h-11 w-11 rounded-full object-cover"
                    />
                  ) : (
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-indigo-100 font-bold text-indigo-700">
                      {name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-900">
                      {name}
                    </p>
                    {connection.otherUser?.email && (
                      <p className="truncate text-xs text-slate-500">
                        {connection.otherUser.email}
                      </p>
                    )}
                  </div>
                </div>
                <Link
                  href={`/chat/${connection.id}`}
                  className="shrink-0 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Chat
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
