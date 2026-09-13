import { SupabaseClient } from "@supabase/supabase-js";
import { Profile } from "@/types/profile";

export async function fetchUserProfile(
  supabase: SupabaseClient,
  userId: string,
): Promise<{ profile: Profile | null; error: any }> {
  try {
    let { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (
      error &&
      (error.code === "42P01" || error.message?.includes("relation"))
    ) {
      const fallback = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();
      if (!fallback.error) {
        data = fallback.data;
        error = null;
      }
    }

    if (error) {
      console.error("[PROFILE HELPER] Error querying profile table:", error);
      return { profile: null, error };
    }

    return { profile: data as Profile | null, error: null };
  } catch (err) {
    console.error("[PROFILE HELPER] Unexpected error querying profile:", err);
    return { profile: null, error: err };
  }
}

export async function saveUserProfile(
  supabase: SupabaseClient,
  payload: Omit<Partial<Profile>, "email"> & { id: string },
  email: string | null | undefined,
): Promise<{ data: any; error: any }> {
  try {
    let { data, error } = await supabase
      .from("profile")
      .upsert({ ...payload, email: email || null }, { onConflict: "id" })
      .select()
      .maybeSingle();

    if (
      error &&
      (error.code === "42P01" || error.message?.includes("relation"))
    ) {
      const fallback = await supabase
        .from("profiles")
        .upsert({ ...payload, email: email || null }, { onConflict: "id" })
        .select()
        .maybeSingle();
      data = fallback.data;
      error = fallback.error;
    }

    return { data, error };
  } catch (err) {
    console.error("[PROFILE HELPER] Unexpected error saving profile:", err);
    return { data: null, error: err };
  }
}
