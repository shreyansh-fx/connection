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
  connection_id?: string | null;
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

  const [showShareModal, setShowShareModal] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  const [profileSearch, setProfileSearch] = useState("");
  const [sharing, setSharing] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const [copied, setCopied] = useState(false);

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

    const [acceptedResult, ownResult, applicantResult, connectionsResult] =
      await Promise.all([
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
        user?.id === value.creator_id
          ? supabase
            .from("connections")
            .select("id, request_id, user1_id, user2_id")
            .eq("request_id", id)
          : Promise.resolve({ data: [] }),
      ]);

    setAccepted(acceptedResult.count ?? 0);
    setApplicationStatus(
      (ownResult.data as { status: string } | null)?.status ?? null,
    );
    const connectionRows = connectionsResult.data ?? [];
    setApplications(
      (applicantResult.data ?? []).map((application) => {
        const normalizedProfile = Array.isArray(application.profile)
          ? (application.profile[0] ?? null)
          : application.profile;
        const connection = connectionRows.find(
          (row) =>
            row.request_id === id &&
            ((row.user1_id === value.creator_id &&
              row.user2_id === application.applicant_id) ||
              (row.user2_id === value.creator_id &&
                row.user1_id === application.applicant_id)),
        );
        return {
          ...application,
          profile: normalizedProfile,
          connection_id: connection?.id ?? null,
        };
      }) as Application[],
    );
    setLoading(false);
  }, [id, supabase, user]);

  const loadProfilesForSharing = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("profile")
      .select("id, full_name, email, branch, year")
      .neq("id", user.id)
      .order("full_name");

    if (error) {
      console.error("Error loading profiles:", error);
      setShareMessage("Could not load profiles.");
      return;
    }

    setProfiles((data ?? []) as Profile[]);
  };

  const filteredProfiles = profiles.filter((profile) =>
    (profile.full_name ?? "")
      .toLowerCase()
      .includes(profileSearch.toLowerCase()),
  );

  const toggleProfile = (profileId: string) => {
    setSelectedProfiles((current) =>
      current.includes(profileId)
        ? current.filter((id) => id !== profileId)
        : [...current, profileId],
    );
  };

  const copyRequestLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
      setShareMessage("Could not copy the link.");
    }
  };

  const sendInvitations = async () => {
    if (!request || selectedProfiles.length === 0) {
      setShareMessage("Select at least one person.");
      return;
    }

    setSharing(true);
    setShareMessage("");

    const { error } = await supabase.rpc("send_request_invites", {
      p_request_id: request.id,
      p_user_ids: selectedProfiles,
    });

    if (error) {
      console.error("Error sending invitations:", error);
      setShareMessage(error.message || "Failed to send invitations.");
      setSharing(false);
      return;
    }

    setShareMessage("Invitations sent successfully!");
    setSelectedProfiles([]);
    setProfileSearch("");
    setSharing(false);

    setTimeout(() => {
      setShowShareModal(false);
      setShareMessage("");
    }, 1200);
  };

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

    const { data: existingConnection, error: lookupError } = await supabase
      .from("connections")
      .select("id")
      .eq("request_id", id)
      .or(
        `and(user1_id.eq.${request.creator_id},user2_id.eq.${application.applicant_id}),and(user1_id.eq.${application.applicant_id},user2_id.eq.${request.creator_id})`,
      )
      .maybeSingle();
    if (lookupError) {
      setSaving(false);
      setMessage(lookupError.message);
      return;
    }
    if (!existingConnection) {
      const { error: connectionError } = await supabase
        .from("connections")
        .insert({
          request_id: id,
          user1_id: request.creator_id,
          user2_id: application.applicant_id,
        });
      if (connectionError && connectionError.code !== "23505") {
        setSaving(false);
        setMessage(connectionError.message);
        return;
      }
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

  async function rejectApplicant(application: Application) {
    if (
      !window.confirm(
        `Reject ${application.profile?.full_name || "this applicant"}?`,
      )
    ) {
      return;
    }
    setSaving(true);
    setMessage("");
    const { error } = await supabase
      .from("applications")
      .update({ status: "rejected" })
      .eq("id", application.id)
      .eq("request_id", id)
      .eq("status", "pending");
    setSaving(false);
    if (error) {
      setMessage(error.message);
      return;
    }
    setMessage("Applicant rejected.");
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

  // The creator and anyone who has applied can invite friends.
  // Accepted applicants are included automatically.
  const canShareRequest =
    !!user &&
    !!request &&
    (user.id === request.creator_id ||
      applicationStatus !== null);

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
          className={`mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${unavailable ? "opacity-75" : ""
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
            {canShareRequest && (
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-sm font-medium text-slate-500">
                  {ownRequest
                    ? "You created this request."
                    : applicationStatus === "accepted"
                      ? "You are a member of this team."
                      : "You have applied to this request."}
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setShowShareModal(true);
                    setShareMessage("");
                    loadProfilesForSharing();
                  }}
                  className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition"
                >
                  Invite Friends
                </button>
              </div>
            )}
            {applicationStatus && (
              <p
                className={`text-sm font-semibold ${applicationStatus === "accepted"
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
                              {application.profile?.email && (
                                <p className="text-xs text-slate-500">
                                  {application.profile.email}
                                </p>
                              )}
                              <p className="text-xs text-slate-500">
                                {[
                                  application.profile?.branch,
                                  application.profile?.year,
                                  application.profile?.gender,
                                ]
                                  .filter(Boolean)
                                  .join(" · ")}
                              </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                              {applicantUserId && (
                                <Link
                                  href={profileLink}
                                  className="rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-100 transition-colors"
                                >
                                  View Profile →
                                </Link>
                              )}
                              {application.status === "accepted" &&
                                application.connection_id && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      router.push(
                                        `/chat/${application.connection_id}`,
                                      )
                                    }
                                    className="rounded-lg bg-indigo-600 px-3 py-1 text-xs font-semibold text-white hover:bg-indigo-700"
                                  >
                                    Chat
                                  </button>
                                )}
                              <span
                                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${application.status === "accepted" ? "bg-emerald-50 text-emerald-700" : application.status === "rejected" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}
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
                            <div className="mt-4 flex gap-2">
                              <button
                                onClick={() => acceptApplicant(application)}
                                disabled={saving}
                                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 cursor-pointer transition"
                              >
                                Accept applicant
                              </button>
                              <button
                                onClick={() => rejectApplicant(application)}
                                disabled={saving}
                                className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50"
                              >
                                Reject
                              </button>
                            </div>
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
                {request.profile?.email && (
                  <p className="text-sm text-slate-500">
                    {request.profile.email}
                  </p>
                )}
                <p className="text-sm text-slate-600">
                  {[
                    request.profile?.branch,
                    request.profile?.year,
                    request.profile?.gender,
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

        {/* Share Request Modal */}
        {showShareModal && (
          <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Invite Friends
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Invite people to view this collaboration request.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowShareModal(false);
                    setSelectedProfiles([]);
                    setProfileSearch("");
                    setShareMessage("");
                  }}
                  className="text-slate-500 hover:text-slate-800"
                >
                  ✕
                </button>
              </div>

              {/* Copy Link */}
              <div className="mt-6">
                <p className="mb-2 text-sm font-semibold text-slate-900">
                  Copy Request Link
                </p>

                <button
                  type="button"
                  onClick={copyRequestLink}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  {copied ? "✓ Link copied!" : "Copy Request Link"}
                </button>
              </div>

              <div className="my-6 border-t border-slate-200" />

              {/* Profile Search */}
              <div>
                <p className="mb-2 text-sm font-semibold text-slate-900">
                  Share with Campus Collab Profiles
                </p>

                <input
                  type="text"
                  value={profileSearch}
                  onChange={(e) => setProfileSearch(e.target.value)}
                  placeholder="Search profiles..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Profiles */}
              <div className="mt-3 max-h-56 overflow-y-auto rounded-xl border border-slate-200">
                {filteredProfiles.length === 0 ? (
                  <p className="p-4 text-sm text-slate-500">
                    No profiles found.
                  </p>
                ) : (
                  filteredProfiles.map((profile) => {
                    const selected = selectedProfiles.includes(profile.id);

                    return (
                      <button
                        key={profile.id}
                        type="button"
                        onClick={() => toggleProfile(profile.id)}
                        className={`flex w-full items-center justify-between border-b border-slate-100 px-4 py-3 text-left last:border-b-0 transition ${selected ? "bg-indigo-50" : "hover:bg-slate-50"
                          }`}
                      >
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {profile.full_name || "Campus student"}
                          </p>

                          {profile.email && (
                            <p className="text-xs text-slate-500">
                              {profile.email}
                            </p>
                          )}

                          <p className="text-xs text-slate-500">
                            {profile.branch || "Branch not specified"}
                            {profile.year ? ` • ${profile.year}` : ""}
                          </p>
                        </div>

                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded border text-xs ${selected
                              ? "border-indigo-600 bg-indigo-600 text-white"
                              : "border-slate-300 bg-white"
                            }`}
                        >
                          {selected && "✓"}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Selected count */}
              {selectedProfiles.length > 0 && (
                <p className="mt-3 text-sm font-medium text-slate-600">
                  {selectedProfiles.length}{" "}
                  {selectedProfiles.length === 1 ? "person" : "people"} selected
                </p>
              )}

              {/* Message */}
              {shareMessage && (
                <p className="mt-3 rounded-lg bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-700">
                  {shareMessage}
                </p>
              )}

              {/* Actions */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowShareModal(false);
                    setSelectedProfiles([]);
                    setProfileSearch("");
                    setShareMessage("");
                  }}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={sharing || selectedProfiles.length === 0}
                  onClick={sendInvitations}
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 transition"
                >
                  {sharing ? "Sending..." : "Send Invitations"}
                </button>
              </div>
            </div>
          </div>
        )}

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
