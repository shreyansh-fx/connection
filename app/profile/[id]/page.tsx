"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { fetchUserProfile } from "@/lib/supabase/profile";
import { Profile } from "@/types/profile";
import { useAuth } from "@/context/AuthContext";
import ProfileView from "@/components/ProfileView";
import Navbar from "@/components/Navbar";

export default function PublicUserProfilePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const supabase = createClient();
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const isOwner = Boolean(user && user.id === id);

  useEffect(() => {
    if (!id) return;

    let isMounted = true;
    async function loadProfile() {
      setProfileLoading(true);
      setFetchError(null);
      console.log("[PUBLIC PROFILE] Fetching profile for ID:", id);
      const { profile: profileData, error: profileError } = await fetchUserProfile(supabase, id);

      if (!isMounted) return;

      if (profileError) {
        console.error("[PUBLIC PROFILE] Error fetching profile for id:", id, profileError);
        setFetchError(profileError.message || "Failed to load student profile.");
      } else if (profileData) {
        setProfile(profileData);
      } else {
        setFetchError("Profile not found.");
      }

      setProfileLoading(false);
    }

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [id, supabase]);

  if (profileLoading) {
    return (
      <main className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-slate-600">
            <div className="w-8 h-8 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
            <p className="text-sm font-medium">Loading profile...</p>
          </div>
        </div>
      </main>
    );
  }

  if (fetchError || !profile) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="mx-auto max-w-4xl px-6 py-12">
          <button
            onClick={() => router.back()}
            className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
          >
            ← Back
          </button>
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
              !
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Profile Not Found</h2>
            <p className="text-slate-500 text-sm mb-6">
              {fetchError || "The requested student profile could not be found or is unavailable."}
            </p>
            <button
              onClick={() => router.back()}
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition cursor-pointer"
            >
              Go Back
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <ProfileView
      profile={profile}
      isOwner={isOwner}
      userEmail={isOwner ? user?.email : null}
      fetchError={fetchError}
      showBackButton={true}
    />
  );
}
