"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { fetchUserProfile, saveUserProfile } from "@/lib/supabase/profile";
import { Profile } from "@/types/profile";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

export default function ProfileFormPage() {
  const router = useRouter();
  const supabase = createClient();
  const { user, loading: authLoading } = useAuth();
  const [profileLoading, setProfileLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    full_name: "",
    college: "",
    course: "",
    year: "",
    bio: "",
    skills: "",
    interests: "",
    experience: "",
    achievements: "",
    github: "",
    linkedin: "",
    avatar_url: "",
  });

  useEffect(() => {
    // If auth is done loading and there is no user, redirect to /login
    if (!authLoading && !user) {
      console.log("[PROFILE FORM] No active session found, redirecting to /login");
      router.push("/login");
      return;
    }

    // If user is loaded, fetch their profile from Supabase
    if (user) {
      let isMounted = true;
      async function loadProfile() {
        setProfileLoading(true);
        console.log("[PROFILE FORM] Fetching profile from Supabase for user:", user!.id);
        const { profile: profileData, error: profileError } = await fetchUserProfile(supabase, user!.id);

        if (!isMounted) return;

        if (profileError) {
          console.error("[PROFILE FORM] Error fetching profile:", profileError.message || profileError);
          setErrorMessage(
            `Failed to load profile from Supabase: ${profileError.message || JSON.stringify(profileError)}`
          );
        } else if (profileData) {
          setIsEditMode(true);
          const p = profileData;
          const formatFieldToString = (val: unknown) => {
            if (!val) return "";
            if (typeof val === "string") return val;
            if (Array.isArray(val)) return val.join(", ");
            return String(val);
          };

          setFormData({
            full_name: p.full_name || "",
            college: p.college || "",
            course: p.course || "",
            year: p.year || "",
            bio: p.bio || "",
            skills: formatFieldToString(p.skills),
            interests: formatFieldToString(p.interests),
            experience: p.experience || "",
            achievements: p.achievements || "",
            github: p.github || "",
            linkedin: p.linkedin || "",
            avatar_url:
              p.avatar_url || user!.user_metadata?.avatar_url || "",
          });
        } else {
          setIsEditMode(false);
          // Pre-fill default details from Google Auth metadata if available
          setFormData((prev) => ({
            ...prev,
            full_name:
              user!.user_metadata?.full_name ||
              user!.user_metadata?.name ||
              "",
            avatar_url: user!.user_metadata?.avatar_url || "",
          }));
        }

        setProfileLoading(false);
      }

      loadProfile();

      return () => {
        isMounted = false;
      };
    }
  }, [user, authLoading, router, supabase]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      setErrorMessage("Your session has expired. Please log in again.");
      router.push("/login");
      return;
    }

    if (!formData.full_name.trim()) {
      setErrorMessage("Full Name is required.");
      return;
    }

    setSaving(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const payload = {
      id: user.id,
      full_name: formData.full_name.trim(),
      college: formData.college.trim() || null,
      course: formData.course.trim() || null,
      year: formData.year || null,
      bio: formData.bio.trim() || null,
      skills: formData.skills.trim() || null,
      interests: formData.interests.trim() || null,
      experience: formData.experience.trim() || null,
      achievements: formData.achievements.trim() || null,
      github: formData.github.trim() || null,
      linkedin: formData.linkedin.trim() || null,
      avatar_url: formData.avatar_url.trim() || null,
      updated_at: new Date().toISOString(),
    };

    console.log("[PROFILE FORM] Saving profile to Supabase with ID:", user.id);
    const { error } = await saveUserProfile(supabase, payload);

    setSaving(false);

    if (error) {
      const errMsg = error.message || error.details || error.hint || JSON.stringify(error);
      console.error("[PROFILE FORM] Profile save error:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });

      if (error.code === "42501" || errMsg.includes("row-level security")) {
        setErrorMessage(
          "Supabase RLS Policy Error: Row-Level Security on 'public.profile' blocked this operation. Please add an INSERT/UPDATE policy in Supabase SQL editor or temporarily disable RLS."
        );
      } else {
        setErrorMessage(`Save failed: ${errMsg}`);
      }
    } else {
      console.log("[PROFILE FORM] Profile saved successfully. Redirecting to /profile");
      setSuccessMessage("✓ Profile saved successfully!");
      router.push("/profile");
    }
  };

  if (authLoading || (user && profileLoading)) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-600">
          <div className="w-8 h-8 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
          <p className="text-sm font-medium">Checking authentication and profile...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Shared Navbar */}
      <Navbar />

      {/* Main Container */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Page Heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-indigo-600">
            {isEditMode ? "Edit Profile" : "Make Profile"}
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900">
            {isEditMode ? "Update your details" : "Tell us about yourself"}
          </h2>
          <p className="mt-3 text-slate-500">
            {isEditMode
              ? "Update your profile information for teams and opportunities across campus."
              : "Your profile helps Campus Collab match you with relevant teammates and opportunities across campus."}
          </p>
        </div>

        {/* Feedback Messages */}
        {successMessage && (
          <div className="mb-6 rounded-lg bg-green-50 p-4 border border-green-200 text-sm font-medium text-green-700 flex items-center justify-between">
            <span>{successMessage}</span>
            <button
              type="button"
              onClick={() => setSuccessMessage(null)}
              className="text-green-500 hover:text-green-800"
            >
              ✕
            </button>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 border border-red-200 text-sm font-medium text-red-700 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="font-semibold">Error saving profile:</span>
              <span>{errorMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="text-red-500 hover:text-red-800"
            >
              ✕
            </button>
          </div>
        )}

        {/* Profile Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
        >
          {/* Section: Personal Information */}
          <section>
            <h3 className="text-xl font-semibold text-slate-900">
              Personal Information
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Basic identification and academic details.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Rahul Sharma"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-slate-900"
                />
              </div>

              {/* College */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  College / University
                </label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="e.g. IIITDM Jabalpur"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-slate-900"
                />
              </div>

              {/* Course / Branch */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Course / Branch
                </label>
                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  placeholder="e.g. Computer Science Engineering"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-slate-900"
                />
              </div>

              {/* Academic Year */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Academic Year
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-slate-900"
                >
                  <option value="">Select year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Postgraduate">Postgraduate</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>
            </div>
          </section>

          <div className="my-10 border-t border-slate-200" />

          {/* Section: Bio / About */}
          <section>
            <h3 className="text-xl font-semibold text-slate-900">Bio</h3>
            <p className="mt-1 text-sm text-slate-500">
              A brief introduction for prospective teammates.
            </p>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
              placeholder="Full-stack developer interested in AI/ML hackathons and open-source software..."
              className="mt-5 w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-slate-900"
            />
          </section>

          <div className="my-10 border-t border-slate-200" />

          {/* Section: Skills */}
          <section>
            <h3 className="text-xl font-semibold text-slate-900">Skills</h3>
            <p className="mt-1 text-sm text-slate-500">
              Technical, design, or leadership capabilities.
            </p>
            <div className="mt-5">
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, Python, UI/UX, C++, TypeScript"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-slate-900"
              />
              <p className="mt-2 text-xs text-slate-400">
                Separate multiple skills with commas.
              </p>
            </div>
          </section>

          <div className="my-10 border-t border-slate-200" />

          {/* Section: Interests */}
          <section>
            <h3 className="text-xl font-semibold text-slate-900">Interests</h3>
            <p className="mt-1 text-sm text-slate-500">
              Domain focus or event types you want to work on.
            </p>
            <div className="mt-5">
              <input
                type="text"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                placeholder="Hackathons, Music, AI, Robotics, Web3"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-slate-900"
              />
              <p className="mt-2 text-xs text-slate-400">
                Separate multiple interests with commas.
              </p>
            </div>
          </section>

          <div className="my-10 border-t border-slate-200" />

          {/* Section: Experience & Achievements */}
          <section>
            <h3 className="text-xl font-semibold text-slate-900">
              Experience &amp; Achievements
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Highlights of your practical work, past teams, and recognitions.
            </p>

            <div className="mt-6 grid gap-6">
              {/* Experience */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Relevant Experience
                </label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Built a full-stack Next.js app, interned at a software startup..."
                  className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-slate-900"
                />
              </div>

              {/* Achievements */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Key Achievements
                </label>
                <textarea
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Winner of College Hackathon 2024, Published paper on computer vision..."
                  className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-slate-900"
                />
              </div>
            </div>
          </section>

          <div className="my-10 border-t border-slate-200" />

          {/* Section: External Links & Avatar */}
          <section>
            <h3 className="text-xl font-semibold text-slate-900">
              Social Links &amp; Avatar
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Connect your online presence and profile picture.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {/* GitHub */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  GitHub Profile
                </label>
                <input
                  type="text"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="https://github.com/yourusername"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-slate-900"
                />
              </div>

              {/* LinkedIn */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  LinkedIn Profile
                </label>
                <input
                  type="text"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/yourusername"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-slate-900"
                />
              </div>

              {/* Avatar URL */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Avatar Image URL
                </label>
                <input
                  type="text"
                  name="avatar_url"
                  value={formData.avatar_url}
                  onChange={handleChange}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-slate-900"
                />
              </div>
            </div>
          </section>

          {/* Action Footer */}
          <div className="mt-10 flex items-center justify-between border-t border-slate-200 pt-6">
            <button
              type="button"
              onClick={() => router.push("/profile")}
              className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            >
              View Profile
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
            >
              {saving ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                  <span>Saving to Supabase...</span>
                </>
              ) : (
                <span>Save Profile</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}