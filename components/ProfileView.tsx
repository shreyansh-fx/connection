"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Profile } from "@/types/profile";
import Navbar from "@/components/Navbar";

function parseArrayField(field: unknown): string[] {
  if (!field) return [];
  if (Array.isArray(field)) {
    return field.map(String).map((s) => s.trim()).filter(Boolean);
  }
  if (typeof field === "string") {
    const trimmed = field.trim();
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          return parsed.map(String).map((s) => s.trim()).filter(Boolean);
        }
      } catch {}
    }
    return trimmed.split(",").map((s) => s.trim()).filter(Boolean);
  }
  return [];
}

interface ProfileViewProps {
  profile: Profile;
  isOwner?: boolean;
  userEmail?: string | null;
  fetchError?: string | null;
  showBackButton?: boolean;
}

export default function ProfileView({
  profile,
  isOwner = false,
  userEmail = null,
  fetchError = null,
  showBackButton = false,
}: ProfileViewProps) {
  const router = useRouter();

  const displayName =
    profile.full_name ||
    (isOwner ? userEmail : null) ||
    "Student Profile";

  const displaySubtitle = [profile.course, profile.year, profile.college]
    .filter(Boolean)
    .join(" • ");

  const skillsList = parseArrayField(profile.skills);
  const interestsList = parseArrayField(profile.interests);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Shared Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        {showBackButton && (
          <button
            onClick={() => router.back()}
            className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
          >
            ← Back
          </button>
        )}

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          {/* Header Card */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-200 pb-6 gap-4">
            <div className="flex items-center gap-4">
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={displayName}
                  className="w-16 h-16 rounded-full object-cover border border-slate-200"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-2xl">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                  Verified Student Profile
                </p>
                <h2 className="mt-1 text-3xl font-bold text-slate-900">
                  {displayName}
                </h2>
                {displaySubtitle && (
                  <p className="mt-1 text-sm text-slate-500 font-medium">
                    {displaySubtitle}
                  </p>
                )}
                {isOwner && userEmail && (
                  <p className="mt-0.5 text-xs text-slate-400">{userEmail}</p>
                )}
              </div>
            </div>

            {isOwner && (
              <Link
                href="/profile/view"
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white transition hover:bg-indigo-700 text-sm"
              >
                Edit Profile
              </Link>
            )}
          </div>

          {fetchError && (
            <div className="mt-6 rounded-lg bg-red-50 p-4 border border-red-200 text-sm text-red-700 font-medium">
              Error: {fetchError}
            </div>
          )}

          {/* Bio / About */}
          {profile.bio && (
            <section className="mt-8">
              <h3 className="text-lg font-semibold text-slate-900">Bio</h3>
              <p className="mt-2 text-slate-600 leading-relaxed whitespace-pre-line">
                {profile.bio}
              </p>
            </section>
          )}

          {/* Skills */}
          <section className="mt-8">
            <h3 className="text-lg font-semibold text-slate-900">Skills</h3>
            {skillsList.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {skillsList.map((skill, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 border border-indigo-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm text-slate-400 italic">No skills listed yet.</p>
            )}
          </section>

          {/* Interests */}
          <section className="mt-8">
            <h3 className="text-lg font-semibold text-slate-900">Interests</h3>
            {interestsList.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {interestsList.map((interest, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700 border border-emerald-100"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm text-slate-400 italic">No interests listed yet.</p>
            )}
          </section>

          {/* Experience */}
          {profile.experience && (
            <section className="mt-8">
              <h3 className="text-lg font-semibold text-slate-900">Experience</h3>
              <p className="mt-2 leading-7 text-slate-600 whitespace-pre-line">
                {profile.experience}
              </p>
            </section>
          )}

          {/* Achievements */}
          {profile.achievements && (
            <section className="mt-8">
              <h3 className="text-lg font-semibold text-slate-900">Achievements</h3>
              <p className="mt-2 leading-7 text-slate-600 whitespace-pre-line">
                {profile.achievements}
              </p>
            </section>
          )}

          {/* Social Links */}
          {(profile.github || profile.linkedin) && (
            <section className="mt-8 border-t border-slate-200 pt-6">
              <h3 className="text-lg font-semibold text-slate-900">Links</h3>
              <div className="mt-3 flex flex-wrap gap-4 text-sm font-medium">
                {profile.github && (
                  <a
                    href={
                      profile.github.startsWith("http")
                        ? profile.github
                        : `https://${profile.github}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline flex items-center gap-1.5"
                  >
                    🔗 GitHub
                  </a>
                )}
                {profile.linkedin && (
                  <a
                    href={
                      profile.linkedin.startsWith("http")
                        ? profile.linkedin
                        : `https://${profile.linkedin}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline flex items-center gap-1.5"
                  >
                    🔗 LinkedIn
                  </a>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
