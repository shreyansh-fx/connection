"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { fetchUserProfile } from "@/lib/supabase/profile";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const { user, loading: authLoading, signInWithGoogle } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [checkingProfile, setCheckingProfile] = useState(false);

  useEffect(() => {
    if (authLoading || !user) return;

    let isMounted = true;
    async function checkProfileAndRedirect() {
      setCheckingProfile(true);
      console.log("[LOGIN PAGE] Checking profile existence for authenticated user:", user!.id);
      const { profile, error } = await fetchUserProfile(supabase, user!.id);

      if (!isMounted) return;

      if (error) {
        console.error("[LOGIN PAGE] Profile query error:", error);
        // Do NOT assume no profile on database error. Redirect to /profile to handle state
        router.push("/profile");
      } else if (profile) {
        console.log("[LOGIN PAGE] Existing profile found. Redirecting to /profile");
        router.push("/profile");
      } else {
        console.log("[LOGIN PAGE] No profile found. Redirecting to /profile/view (Make Profile)");
        router.push("/profile/view");
      }
    }

    checkProfileAndRedirect();

    return () => {
      isMounted = false;
    };
  }, [user, authLoading, router, supabase]);

  async function handleGoogleLogin() {
    setSubmitting(true);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      alert(err?.message || "Failed to start Google login");
      setSubmitting(false);
    }
  }

  const isButtonDisabled = authLoading || submitting || checkingProfile;

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col">

      {/* Header */}
      <header className="w-full border-b border-outline-variant bg-surface-container-lowest/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin h-16 flex items-center justify-between">

          {/* Logo - clicking this goes to Home */}
          <Link href="/" className="flex items-center gap-space-sm">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary font-bold">
              C
            </div>

            <span className="font-semibold tracking-tight">
              Campus Collab
            </span>
          </Link>

          <div className="hidden sm:flex items-center gap-2 text-sm text-on-surface-variant">
            <span className="w-2 h-2 rounded-full bg-primary-container"></span>
            Verified Campus Network
          </div>

        </div>
      </header>


      {/* Main */}
      <main className="flex-1 flex items-center">
        <div className="w-full max-w-6xl mx-auto px-margin-mobile md:px-margin py-12 lg:py-16">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">


            {/* LEFT SIDE */}
            <section className="max-w-xl">

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-sm font-medium mb-6">
                <span>🎓</span>
                Built for campus collaboration
              </div>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                Find the right people
                <span className="text-primary-container">
                  {" "}to build with.
                </span>
              </h1>

              <p className="mt-5 text-lg text-on-surface-variant leading-relaxed max-w-lg">
                Discover students with the skills, interests, and ideas
                you need for your next project, hackathon, or campus event.
              </p>


              {/* Simple Explanation */}
              <div className="mt-10 space-y-4">

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 shrink-0 rounded-lg bg-primary-fixed text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">
                      person_search
                    </span>
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Discover students
                    </h3>

                    <p className="text-sm text-on-surface-variant mt-1">
                      Find people based on skills, interests, and experience.
                    </p>
                  </div>
                </div>


                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 shrink-0 rounded-lg bg-primary-fixed text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">
                      auto_awesome
                    </span>
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Get meaningful matches
                    </h3>

                    <p className="text-sm text-on-surface-variant mt-1">
                      Find teammates whose strengths complement yours.
                    </p>
                  </div>
                </div>


                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 shrink-0 rounded-lg bg-primary-fixed text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">
                      groups
                    </span>
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Build together
                    </h3>

                    <p className="text-sm text-on-surface-variant mt-1">
                      Connect with the right people and turn ideas into teams.
                    </p>
                  </div>
                </div>

              </div>

            </section>



            {/* RIGHT SIDE - LOGIN */}
            <section className="flex justify-center lg:justify-end">

              <div className="w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant p-7 md:p-9">

                <div className="w-12 h-12 rounded-xl bg-primary-fixed text-primary flex items-center justify-center font-bold text-xl mb-6">
                  C
                </div>

                <h2 className="text-2xl font-bold">
                  Welcome to Campus Collab
                </h2>

                <p className="mt-2 text-on-surface-variant">
                  Sign in with your college account to get started.
                </p>


                {/* Google Login */}
                <button
                  onClick={handleGoogleLogin}
                  disabled={isButtonDisabled}
                  type="button"
                  className="mt-8 w-full h-12 px-space-md rounded-xl bg-surface-container-lowest border border-outline-variant hover:bg-surface-container-low active:scale-[0.99] transition-all flex items-center justify-center gap-3 shadow-sm cursor-pointer disabled:opacity-60 disabled:pointer-events-none"
                >

                  {submitting ? (
                    <>
                      <span className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin"></span>

                      <span className="font-semibold">
                        Redirecting to Google...
                      </span>
                    </>
                  ) : (
                    <>
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.43.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                          fill="#EA4335"
                        />
                      </svg>

                      <span className="font-semibold">
                        Continue with Google
                      </span>
                    </>
                  )}

                </button>


                {/* College account note */}
                <div className="mt-5 flex items-start gap-3 p-4 rounded-xl bg-surface-container-low">

                  <span className="material-symbols-outlined text-primary">
                    verified_user
                  </span>

                  <div>
                    <p className="text-sm font-semibold">
                      College account required
                    </p>

                    <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">
                      Use your university Google account to access
                      Campus Collab.
                    </p>
                  </div>

                </div>


                {/* Terms */}
                <p className="mt-6 text-xs text-center text-on-surface-variant leading-relaxed">
                  By continuing, you agree to Campus Collab's{" "}
                  <a
                    href="#terms"
                    className="text-primary hover:underline font-medium"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#privacy"
                    className="text-primary hover:underline font-medium"
                  >
                    Privacy Policy
                  </a>.
                </p>

              </div>

            </section>

          </div>

        </div>
      </main>


      {/* Footer */}
      <footer className="border-t border-outline-variant bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin py-4 text-center">
          <p className="text-xs text-on-surface-variant">
            Campus Collab · Built for students, by students
          </p>
        </div>
      </footer>

    </div>
  );
}