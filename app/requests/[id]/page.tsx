"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { Profile } from "@/types/profile";

type CollaborationRequest = {
  id: string;
  event_id: string;
  creator_id: string;
  title: string;
  description: string | null;
  members_needed: number;
  skills_needed: string[] | null;
  status: string;
  event: { name: string } | null;
  profile: Profile | null;
};

type Application = {
  id: string;
  applicant_id?: string;
  message: string | null;
  status: string;
  profile: Profile | null;
};

export default function RequestDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const { user, loading: authLoading } = useAuth();
  const [request, setRequest] = useState<CollaborationRequest | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [accepted, setAccepted] = useState(0);
  const [applicationStatus, setApplicationStatus] = useState<string | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("requests")
      .select("*, event:event_id(name), profile:creator_id(*)")
      .eq("id", id)
      .single();

    if (error || !data) {
      setMessage("This collaboration request is unavailable.");
      setLoading(false);
      return;
    }
    const value = data as CollaborationRequest;
    setRequest(value);

    const [acceptedResult, ownResult, applicantResult] = await Promise.all([
      supabase
        .from("applications")
        .select("*", { count: "exact", head: true })
        .eq("request_id", id)
        .eq("status", "accepted"),
      user
        ? supabase
            .from("applications")
            .select("status")
            .eq("request_id", id)
            .eq("applicant_id", user.id)
            .maybeSingle()
        : Promise.resolve({ data: null }),
      user?.id === value.creator_id
        ? supabase
            .from("applications")
            .select(
              "id, applicant_id, message, status, profile:applicant_id(*)",
            )
            .eq("request_id", id)
            .order("created_at", { ascending: false })
        : Promise.resolve({ data: [] }),
    ]);

    setAccepted(acceptedResult.count ?? 0);
    setApplicationStatus(
      (ownResult.data as { status: string } | null)?.status ?? null,
    );
    setApplications(
      (applicantResult.data ?? []).map((application) => ({
        ...application,
        profile: Array.isArray(application.profile)
          ? (application.profile[0] ?? null)
          : application.profile,
      })) as Application[],
    );
    setLoading(false);
  }, [id, supabase, user]);

  useEffect(() => {
    load();
  }, [load]);

  async function apply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return router.push("/login");
    setSaving(true);
    const { error } = await supabase.from("applications").insert({
      request_id: id,
      applicant_id: user.id,
      message: new FormData(event.currentTarget).get("message"),
      status: "pending",
    });
    setSaving(false);

    if (error) {
      setMessage(
        error.code === "23505"
          ? "You have already applied to this request."
          : error.message,
      );
      return;
    }

    setApplicationStatus("pending");
    setShowForm(false);
    setMessage("Application sent successfully.");
  }

  async function acceptApplicant(application: Application) {
    if (
      !request ||
      !window.confirm(
        `Accept ${application.profile?.full_name || "this applicant"} into the team?`,
      )
    )
      return;
    setSaving(true);
    setMessage("");
    const { error } = await supabase
      .from("applications")
      .update({ status: "accepted" })
      .eq("id", application.id)
      .eq("request_id", id);
    if (error) {
      setSaving(false);
      setMessage(error.message);
      return;
    }

    if (accepted + 1 >= request.members_needed) {
      const { error: requestError } = await supabase
        .from("requests")
        .update({ status: "full" })
        .eq("id", id);
      if (requestError) {
        setSaving(false);
        setMessage(requestError.message);
        return;
      }
      const { error: remainingError } = await supabase
        .from("applications")
        .update({ status: "rejected" })
        .eq("request_id", id)
        .eq("status", "pending");
      if (remainingError) {
        setSaving(false);
        setMessage(remainingError.message);
        return;
      }

      setMessage(
        "Applicant accepted. This request is now full and applications are closed.",
      );
    } else {
      setMessage(
        "Applicant accepted. The request remains open for more members.",
      );
    }
    setSaving(false);
    await load();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />
        <p className="py-24 text-center text-slate-500">Loading request…</p>
      </main>
    );
  }

  if (!request) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />
        <p className="py-24 text-center text-slate-500">{message}</p>
      </main>
    );
  }

  const ownRequest = user?.id === request.creator_id;
  const unavailable =
    accepted >= request.members_needed || request.status !== "open";
  const canApply = Boolean(
    user && !ownRequest && !applicationStatus && !unavailable,
  );
  const statusClass =
    request.status === "open"
      ? "bg-emerald-50 text-emerald-700"
      : "bg-slate-200 text-slate-600";

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <section className="mx-auto max-w-4xl px-6 py-10">
        <a
          href={`/events/${request.event_id}`}
          className="text-sm font-semibold text-indigo-600 hover:underline"
        >
          ← Back to {request.event?.name || "event"}
        </a>
        <article
          className={`mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${
            unavailable ? "opacity-75" : ""
          }`}
        >
          <p className="text-sm font-semibold text-indigo-600">
            {request.event?.name}
          </p>
          <div className="mt-3 flex flex-wrap justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                {request.title}
              </h1>
              <p className="mt-4 whitespace-pre-line leading-7 text-slate-600">
                {request.description}
              </p>
            </div>
            <span
              className={`h-fit rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}
            >
              {request.status}
            </span>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {request.skills_needed?.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700"
              >
                {skill}
              </span>
            ))}
          </div>
          <p className="mt-5 text-sm text-slate-600">
            {request.members_needed} members needed · {accepted} accepted
          </p>
          {message && (
            <p className="mt-5 rounded-lg bg-indigo-50 px-4 py-3 text-sm text-indigo-700">
              {message}
            </p>
          )}
          <div className="mt-6">
            {!authLoading && !user && (
              <button
                onClick={() => router.push("/login")}
                className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition"
              >
                Sign in to request to join
              </button>
            )}
            {ownRequest && (
              <p className="text-sm font-medium text-slate-500">
                You created this request.
              </p>
            )}
            {applicationStatus && (
              <p
                className={`text-sm font-semibold ${
                  applicationStatus === "accepted"
                    ? "text-emerald-700"
                    : applicationStatus === "rejected"
                      ? "text-red-700"
                      : "text-slate-600"
                }`}
              >
                {applicationStatus === "accepted"
                  ? "You have been accepted into this team."
                  : applicationStatus === "rejected"
                    ? "This team is now full. You were not selected."
                    : "Your application is pending."}
              </p>
            )}
            {user && !ownRequest && unavailable && !applicationStatus && (
              <p className="text-sm font-medium text-slate-500">
                This request is full. Applications are closed.
              </p>
            )}
            {canApply && (
              <button
                onClick={() => setShowForm(true)}
                className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition"
              >
                Request to Join
              </button>
            )}
          </div>
        </article>

        {/* Applicants Section */}
        {ownRequest && (
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-bold text-slate-900">
              Applicants ({applications.length})
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Only you can see applications to your request. Click an applicant
              to view their full profile.
            </p>
            <div className="mt-5 space-y-4">
              {applications.length === 0 ? (
                <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                  No applications yet.
                </p>
              ) : (
                applications.map((application) => {
                  const applicantUserId =
                    application.profile?.id || application.applicant_id;
                  const profileLink = applicantUserId
                    ? `/profile/${applicantUserId}`
                    : "#";

                  return (
                    <article
                      key={application.id}
                      className="rounded-xl border border-slate-200 p-4 transition hover:border-slate-300"
                    >
                      <div className="flex items-start gap-3">
                        {applicantUserId ? (
                          <Link
                            href={profileLink}
                            className="shrink-0 hover:opacity-85 transition-opacity"
                            title="View Profile"
                          >
                            {application.profile?.avatar_url ? (
                              <img
                                src={application.profile.avatar_url}
                                alt=""
                                className="h-11 w-11 rounded-full object-cover border border-slate-200"
                              />
                            ) : (
                              <div className="grid h-11 w-11 place-items-center rounded-full bg-indigo-100 font-bold text-indigo-700">
                                {(application.profile?.full_name || "S")[0]}
                              </div>
                            )}
                          </Link>
                        ) : application.profile?.avatar_url ? (
                          <img
                            src={application.profile.avatar_url}
                            alt=""
                            className="h-11 w-11 rounded-full object-cover border border-slate-200"
                          />
                        ) : (
                          <div className="grid h-11 w-11 place-items-center rounded-full bg-indigo-100 font-bold text-indigo-700">
                            {(application.profile?.full_name || "S")[0]}
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap justify-between items-start gap-2">
                            <div>
                              {applicantUserId ? (
                                <Link
                                  href={profileLink}
                                  className="font-semibold text-slate-900 hover:text-indigo-600 transition-colors inline-block"
                                >
                                  {application.profile?.full_name ||
                                    "Campus student"}
                                </Link>
                              ) : (
                                <h3 className="font-semibold text-slate-900">
                                  {application.profile?.full_name ||
                                    "Campus student"}
                                </h3>
                              )}
                              <p className="text-xs text-slate-500">
                                {[
                                  application.profile?.course,
                                  application.profile?.year,
                                  application.profile?.college,
                                ]
                                  .filter(Boolean)
                                  .join(" · ")}
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              {applicantUserId && (
                                <Link
                                  href={profileLink}
                                  className="rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-100 transition-colors"
                                >
                                  View Profile →
                                </Link>
                              )}
                              <span
                                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                  application.status === "accepted"
                                    ? "bg-emerald-50 text-emerald-700"
                                    : "bg-amber-50 text-amber-700"
                                }`}
                              >
                                {application.status}
                              </span>
                            </div>
                          </div>

                          <p className="mt-3 text-sm leading-6 text-slate-600">
                            {application.message}
                          </p>

                          {Array.isArray(application.profile?.skills) && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {application.profile.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          )}

                          {application.status === "pending" && !unavailable && (
                            <button
                              onClick={() => acceptApplicant(application)}
                              disabled={saving}
                              className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 cursor-pointer transition"
                            >
                              Accept applicant
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </section>
        )}

        {/* Creator Section */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-bold text-slate-900">
            About the creator
          </h2>
          <div className="mt-5 flex items-center justify-between gap-4">
            <div className="flex gap-4 items-center">
              {request.creator_id ? (
                <Link
                  href={`/profile/${request.creator_id}`}
                  className="shrink-0 hover:opacity-85 transition-opacity"
                >
                  {request.profile?.avatar_url ? (
                    <img
                      src={request.profile.avatar_url}
                      alt=""
                      className="h-14 w-14 rounded-full object-cover border border-slate-200"
                    />
                  ) : (
                    <div className="grid h-14 w-14 place-items-center rounded-full bg-indigo-100 font-bold text-indigo-700">
                      {(request.profile?.full_name || "S")[0]}
                    </div>
                  )}
                </Link>
              ) : request.profile?.avatar_url ? (
                <img
                  src={request.profile.avatar_url}
                  alt=""
                  className="h-14 w-14 rounded-full object-cover border border-slate-200"
                />
              ) : (
                <div className="grid h-14 w-14 place-items-center rounded-full bg-indigo-100 font-bold text-indigo-700">
                  {(request.profile?.full_name || "S")[0]}
                </div>
              )}

              <div>
                {request.creator_id ? (
                  <Link
                    href={`/profile/${request.creator_id}`}
                    className="font-bold text-slate-900 hover:text-indigo-600 transition-colors text-lg inline-block"
                  >
                    {request.profile?.full_name || "Campus student"}
                  </Link>
                ) : (
                  <h3 className="font-bold text-slate-900 text-lg">
                    {request.profile?.full_name || "Campus student"}
                  </h3>
                )}
                <p className="text-sm text-slate-600">
                  {[
                    request.profile?.course,
                    request.profile?.year,
                    request.profile?.college,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>
            </div>

            {request.creator_id && (
              <Link
                href={`/profile/${request.creator_id}`}
                className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-100 transition-colors"
              >
                View Profile →
              </Link>
            )}
          </div>
          {request.profile?.bio && (
            <p className="mt-5 leading-7 text-slate-600">
              {request.profile.bio}
            </p>
          )}
        </section>

        {/* Join Application Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4">
            <form
              onSubmit={apply}
              className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
            >
              <div className="flex justify-between">
                <h2 className="text-xl font-bold">Request to join</h2>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-slate-500 hover:text-slate-800"
                >
                  ✕
                </button>
              </div>
              <label className="mt-5 block text-sm font-medium">
                Why should the team select you?
                <textarea
                  required
                  name="message"
                  className="mt-2 min-h-32 w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  placeholder="Share relevant skills and experience."
                />
              </label>
              <button
                disabled={saving}
                className="mt-5 w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60 transition cursor-pointer"
              >
                {saving ? "Sending…" : "Send application"}
              </button>
            </form>
          </div>
        )}
      </section>
    </main>
  );
}
