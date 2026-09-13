"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/lib/supabase/client";

type Profile = {
  full_name: string | null;
  gender: string | null;
  branch: string | null;
  year: string | null;
};
type CollaborationRequest = {
  id: string;
  title: string;
  description: string | null;
  members_needed: number;
  skills_needed: string[] | null;
  status: string;
  profile: Profile | null;
};
type CampusEvent = {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  date: string;
  location: string | null;
  image_url: string | null;
};

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const { user, loading: authLoading } = useAuth();
  const [event, setEvent] = useState<CampusEvent | null>(null);
  const [requests, setRequests] = useState<CollaborationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const load = useCallback(async () => {
    setLoading(true);
    const [eventResult, requestsResult] = await Promise.all([
      supabase.from("events").select("*").eq("id", id).single(),
      supabase
        .from("requests")
        .select("*, profile:creator_id(full_name, gender, branch, year)")
        .eq("event_id", id)
        .order("created_at", { ascending: false }),
    ]);
    if (eventResult.error || requestsResult.error)
      setMessage("Could not load this event right now.");
    else {
      setEvent(eventResult.data as CampusEvent);
      setRequests((requestsResult.data ?? []) as CollaborationRequest[]);
    }
    setLoading(false);
  }, [id, supabase]);
  useEffect(() => {
    load();
  }, [load]);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user) return router.push("/login");
    const form = new FormData(e.currentTarget);
    setSaving(true);
    const { error } = await supabase.from("requests").insert({
      event_id: id,
      creator_id: user.id,
      title: form.get("title"),
      description: form.get("description"),
      members_needed: Number(form.get("members_needed")),
      skills_needed: String(form.get("skills") || "")
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
      status: "open",
    });
    setSaving(false);
    if (error) setMessage(error.message);
    else {
      setShowForm(false);
      setMessage("Collaboration request created.");
      load();
    }
  }
  if (loading)
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />
        <p className="py-24 text-center text-slate-500">Loading event…</p>
      </main>
    );
  if (!event)
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />
        <p className="py-24 text-center text-red-600">
          {message || "Event not found."}
        </p>
      </main>
    );
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <a href="/events" className="text-sm font-semibold text-indigo-600">
            ← All events
          </a>
          <div className="mt-5 flex flex-col gap-6 md:flex-row md:justify-between">
            <div>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                {event.category || "Other"}
              </span>
              <h1 className="mt-4 text-4xl font-bold text-slate-900">
                {event.name}
              </h1>
              <p className="mt-4 max-w-2xl whitespace-pre-line leading-7 text-slate-600">
                {event.description ||
                  "Join other students at this campus event."}
              </p>
              <p className="mt-5 text-sm font-semibold text-slate-700">
                {new Date(`${event.date}T00:00:00`).toLocaleDateString(
                  "en-IN",
                  { day: "numeric", month: "long", year: "numeric" },
                )}{" "}
                · {event.location || "Location TBA"}
              </p>
            </div>
            {event.image_url && (
              <img
                src={event.image_url}
                alt=""
                className="h-44 w-full rounded-2xl object-cover md:w-64"
              />
            )}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Collaboration requests
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Find a team, or invite the skills you need.
            </p>
          </div>
          <button
            onClick={() => (user ? setShowForm(true) : router.push("/login"))}
            disabled={authLoading}
            className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            Create Collaboration Request
          </button>
        </div>
        {message && (
          <p className="mt-5 rounded-lg bg-indigo-50 px-4 py-3 text-sm text-indigo-700">
            {message}
          </p>
        )}
        <div className="mt-6 space-y-4">
          {requests.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-12 text-center text-slate-500">
              No requests yet. Be the first to start a team.
            </div>
          ) : (
            requests.map((request) => (
              <article
                key={request.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {request.profile?.full_name || "Campus student"}
                    </p>
                    <p className="text-xs text-slate-500">
                      {[
                        request.profile?.branch,
                        request.profile?.year,
                        request.profile?.gender,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {request.status}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  {request.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {request.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {request.skills_needed?.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
                    >
                      {skill}
                    </span>
                  ))}
                  <span className="ml-auto text-sm text-slate-600">
                    {request.members_needed} needed
                  </span>
                </div>
                <a
                  href={`/requests/${request.id}`}
                  className="mt-5 inline-block text-sm font-semibold text-indigo-600"
                >
                  View request →
                </a>
              </article>
            ))
          )}
        </div>
      </section>
      {showForm && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4">
          <form
            onSubmit={submit}
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">
                Create a collaboration request
              </h2>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-slate-500"
              >
                ✕
              </button>
            </div>
            <label className="mt-5 block text-sm font-medium">
              Title
              <input
                required
                name="title"
                className="mt-1 w-full rounded-lg border border-slate-300 p-3"
                placeholder="Looking for a guitarist"
              />
            </label>
            <label className="mt-4 block text-sm font-medium">
              Description
              <textarea
                required
                name="description"
                className="mt-1 min-h-24 w-full rounded-lg border border-slate-300 p-3"
                placeholder="Tell students about the team and role."
              />
            </label>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <label className="text-sm font-medium">
                Members needed
                <input
                  required
                  min="1"
                  type="number"
                  name="members_needed"
                  defaultValue="1"
                  className="mt-1 w-full rounded-lg border border-slate-300 p-3"
                />
              </label>
              <label className="text-sm font-medium">
                Skills needed
                <input
                  name="skills"
                  className="mt-1 w-full rounded-lg border border-slate-300 p-3"
                  placeholder="Guitar, vocals"
                />
              </label>
            </div>
            <button
              disabled={saving}
              className="mt-6 w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              {saving ? "Creating…" : "Create request"}
            </button>
          </form>
        </div>
      )}
    </main>
  );
}
