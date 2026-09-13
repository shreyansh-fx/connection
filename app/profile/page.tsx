"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { fetchUserProfile } from "@/lib/supabase/profile";
import { Profile } from "@/types/profile";
import { useAuth } from "@/context/AuthContext";
import ProfileView from "@/components/ProfileView";

export default function ProfileViewPage() {
  const router = useRouter();
  const supabase = createClient();
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      console.log("[PROFILE VIEW] No user session found, redirecting to /login");
      router.push("/login");
      return;
    }

    if (user) {
      let isMounted = true;
      async function loadProfile() {
        setProfileLoading(true);
        setFetchError(null);
        console.log("[PROFILE VIEW] Loading profile for user:", user!.id);
        const { profile: profileData, error: profileError } = await fetchUserProfile(supabase, user!.id);

        if (!isMounted) return;

        if (profileError) {
          console.error("[PROFILE VIEW] Error fetching profile view:", profileError.message || profileError);
          setFetchError(profileError.message || "Failed to load profile details");
        } else if (profileData) {
          setProfile(profileData);
        } else {
          console.log("[PROFILE VIEW] No profile row found. Redirecting to /profile/view (Make Profile)...");
          router.push("/profile/view");
          return;
        }

        setProfileLoading(false);
      }

      loadProfile();

      return () => {
        isMounted = false;
      };
    }
  }, [user, authLoading, router, supabase]);

  if (authLoading || (user && profileLoading)) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-600">
          <div className="w-8 h-8 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
          <p className="text-sm font-medium">Loading profile details...</p>
        </div>
      </main>
    );
  }

  if (!profile) return null;

  return (
    <ProfileView
      profile={profile}
      isOwner={true}
      userEmail={user?.email}
      fetchError={fetchError}
    />
  );
}