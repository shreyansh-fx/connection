"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/lib/supabase/client";

type NotificationItem = {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  related_id: string | null;
  is_read: boolean;
  created_at: string;
};

function formatRelativeTime(timestamp: string) {
  if (!timestamp) return "just now";

  const diffMs = Date.now() - new Date(timestamp).getTime();
  const diffMinutes = Math.max(1, Math.round(diffMs / 60000));

  if (diffMinutes < 60) return `${diffMinutes} min ago`;

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24)
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;

  const diffDays = Math.round(diffHours / 24);
  return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
}

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading, signOut } = useAuth();
  const supabase = useMemo(() => createClient(), []);
  const notificationRef = useRef<HTMLDivElement | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  useEffect(() => {
    if (!isNotificationOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isNotificationOpen]);

  useEffect(() => {
    if (!user?.id) {
      setNotifications([]);
      setUnreadCount(0);
      setIsNotificationOpen(false);
      return;
    }

    let isMounted = true;

    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!isMounted) return;

      if (error) {
        console.error("[NAVBAR] Notification fetch error:", error.message);
        setNotifications([]);
        setUnreadCount(0);
        return;
      }

      const nextNotifications = (data ?? []) as NotificationItem[];
      setNotifications(nextNotifications);
      setUnreadCount(nextNotifications.filter((item) => !item.is_read).length);
    };

    fetchNotifications();

    const channel = supabase
      .channel(`notifications:${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const newNotification = payload.new as NotificationItem;

          if (newNotification.user_id !== user.id) {
            console.log(
              "[NAVBAR] Realtime notification ignored for another user.",
            );
            return;
          }

          setNotifications((previous) => {
            if (previous.some((item) => item.id === newNotification.id)) {
              console.log("[NAVBAR] Duplicate realtime notification ignored.");
              return previous;
            }

            return [newNotification, ...previous];
          });

          if (!newNotification.is_read) {
            setUnreadCount((previous) => previous + 1);
          }

          console.log(
            "[NAVBAR] New notification received via realtime:",
            newNotification,
          );
        },
      )
      .subscribe((status) => {
        console.log("[NAVBAR] Notification subscription status:", status);
      });

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
      console.log("[NAVBAR] Notification channel removed.");
    };
  }, [supabase, user?.id]);

  const markAllNotificationsAsRead = async () => {
    if (!user || !notifications.some((notification) => !notification.is_read)) {
      return;
    }

    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", user.id)
      .eq("is_read", false);

    if (error) {
      console.error(
        "[NAVBAR] Failed to mark all notifications as read:",
        error.message,
      );
      return;
    }

    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        is_read: true,
      })),
    );
    setUnreadCount(0);
  };

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      await signOut();
    } catch (error) {
      console.error("[NAVBAR] Logout error:", error);
      setLoggingOut(false);
    }
  };

  const markNotificationAsRead = async (notification: NotificationItem) => {
    if (!user || notification.is_read) return;

    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", notification.id)
      .eq("user_id", user.id);

    if (error) {
      console.error(
        "[NAVBAR] Failed to mark notification as read:",
        error.message,
      );
      return;
    }

    setNotifications((previous) =>
      previous.map((item) =>
        item.id === notification.id ? { ...item, is_read: true } : item,
      ),
    );
    setUnreadCount((previous) => Math.max(previous - 1, 0));
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-lg font-bold text-white">
            C
          </div>

          <span className="text-xl font-bold tracking-tight text-indigo-600">
            CampusCollab
          </span>
        </a>

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
              pathname.startsWith("/events") || pathname.startsWith("/requests")
                ? "font-semibold text-indigo-600"
                : "text-slate-600 transition hover:text-indigo-600"
            }
          >
            Events
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {loading ? null : user ? (
            <>
              <div className="relative" ref={notificationRef}>
                <button
                  type="button"
                  onClick={() => {
                    if (!isNotificationOpen && user) {
                      void markAllNotificationsAsRead();
                    }
                    setIsNotificationOpen((previous) => !previous);
                  }}
                  className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-xl transition hover:border-indigo-300 hover:text-indigo-600"
                  aria-label="Notifications"
                >
                  🔔
                  {unreadCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                  )}
                </button>

                {isNotificationOpen && (
                  <div className="absolute right-0 mt-3 w-[22rem] rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl ring-1 ring-slate-100">
                    <div className="mb-3 flex items-center justify-between border-b border-slate-200 pb-2">
                      <h3 className="text-sm font-semibold text-slate-800">
                        Notifications
                      </h3>
                      {unreadCount > 0 && (
                        <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-indigo-700">
                          {unreadCount} unread
                        </span>
                      )}
                    </div>

                    <div className="max-h-80 space-y-2 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="px-2 py-6 text-center text-sm text-slate-500">
                          No notifications yet.
                        </p>
                      ) : (
                        notifications.map((notification) => (
                          <button
                            key={notification.id}
                            type="button"
                            onClick={() => markNotificationAsRead(notification)}
                            className={`w-full rounded-xl border p-3 text-left transition ${
                              notification.is_read
                                ? "border-slate-200 bg-slate-50"
                                : "border-indigo-100 bg-indigo-50/60"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs text-white">
                                {notification.type === "new_application"
                                  ? "●"
                                  : notification.type === "application_accepted"
                                    ? "✓"
                                    : "✕"}
                              </span>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-2">
                                  <p className="text-sm font-semibold text-slate-800">
                                    {notification.title}
                                  </p>
                                  {!notification.is_read && (
                                    <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                                  )}
                                </div>
                                <p className="mt-1 text-sm text-slate-600">
                                  {notification.message}
                                </p>
                                <p className="mt-2 text-[11px] uppercase tracking-wide text-slate-400">
                                  {formatRelativeTime(notification.created_at)}
                                </p>
                              </div>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              <a
                href="/profile"
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
