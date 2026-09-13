"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/lib/supabase/client";

type Message = {
  id: string;
  connection_id: string;
  sender_id: string;
  content: string;
  created_at: string;
};

type Profile = {
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
};

export default function ChatPage() {
  const { connectionId } = useParams<{ connectionId: string }>();
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const { user, loading: authLoading } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [otherUser, setOtherUser] = useState<Profile | null>(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (authLoading || !connectionId) return;
    if (!user) {
      router.push("/login");
      return;
    }
    const currentUser = user;

    let isMounted = true;
    let channel: ReturnType<typeof supabase.channel> | null = null;

    async function loadChat() {
      setLoading(true);
      setError(null);
      const { data: connection, error: connectionError } = await supabase
        .from("connections")
        .select("id, user1_id, user2_id")
        .eq("id", connectionId)
        .maybeSingle();

      if (connectionError || !connection) {
        if (isMounted) {
          setAccessDenied(true);
          setLoading(false);
        }
        return;
      }

      const isMember =
        connection.user1_id === currentUser.id ||
        connection.user2_id === currentUser.id;
      if (!isMember) {
        if (isMounted) {
          setAccessDenied(true);
          setLoading(false);
        }
        return;
      }

      const otherUserId =
        connection.user1_id === currentUser.id
          ? connection.user2_id
          : connection.user1_id;
      const [{ data: profile }, { data: chatMessages, error: messagesError }] =
        await Promise.all([
          supabase
            .from("profile")
            .select("full_name, email, avatar_url")
            .eq("id", otherUserId)
            .maybeSingle(),
          supabase
            .from("chat_messages")
            .select("*")
            .eq("connection_id", connectionId)
            .order("created_at", { ascending: true }),
        ]);

      if (!isMounted) return;
      if (messagesError) {
        setError(messagesError.message);
      } else {
        setOtherUser(profile);
        setMessages(chatMessages ?? []);
      }
      setLoading(false);

      channel = supabase
        .channel(`chat-${connectionId}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "chat_messages",
            filter: `connection_id=eq.${connectionId}`,
          },
          (payload) => {
            const message = payload.new as Message;
            setMessages((current) =>
              current.some((item) => item.id === message.id)
                ? current
                : [...current, message],
            );
          },
        )
        .subscribe();
    }

    void loadChat();
    return () => {
      isMounted = false;
      if (channel) void supabase.removeChannel(channel);
    };
  }, [authLoading, connectionId, router, supabase, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = content.trim();
    if (!user || !trimmed || sending || accessDenied) return;

    setSending(true);
    setError(null);
    const { error: sendError } = await supabase.from("chat_messages").insert({
      connection_id: connectionId,
      sender_id: user.id,
      content: trimmed,
    });
    setSending(false);

    if (sendError) {
      setError(sendError.message);
      return;
    }
    setContent("");
  }

  if (loading || authLoading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />
        <p className="py-24 text-center text-slate-500">Loading chat...</p>
      </main>
    );
  }

  if (accessDenied) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />
        <p className="mx-auto max-w-xl px-6 py-24 text-center text-red-600">
          You do not have access to this chat.
        </p>
      </main>
    );
  }

  const name = otherUser?.full_name || "Campus student";
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="mx-auto flex h-[calc(100vh-73px)] max-w-3xl flex-col px-4 py-6 sm:px-6">
        <header className="flex items-center gap-3 border-b border-slate-200 pb-4">
          {otherUser?.avatar_url ? (
            <img
              src={otherUser.avatar_url}
              alt=""
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="grid h-10 w-10 place-items-center rounded-full bg-indigo-100 font-bold text-indigo-700">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="text-xl font-bold text-slate-900">{name}</h1>
            {otherUser?.email && (
              <p className="text-sm text-slate-500">{otherUser.email}</p>
            )}
          </div>
        </header>
        <div className="flex-1 space-y-3 overflow-y-auto py-6">
          {messages.map((message) => {
            const isMine = message.sender_id === user?.id;
            return (
              <div
                key={message.id}
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${isMine ? "bg-indigo-600 text-white" : "bg-white text-slate-800 shadow-sm"}`}
                >
                  {message.content}
                </div>
              </div>
            );
          })}
          {error && <p className="text-center text-sm text-red-600">{error}</p>}
          <div ref={messagesEndRef} />
        </div>
        <form
          onSubmit={sendMessage}
          className="flex gap-2 border-t border-slate-200 pt-4"
        >
          <input
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Type a message..."
            className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={!content.trim() || sending}
            className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {sending ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </main>
  );
}
