"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading: authLoading, signInWithGoogle } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      console.log("[LOGIN PAGE] User already authenticated, redirecting to /profile:", user.email);
      router.push("/profile");
    }
  }, [user, authLoading, router]);

  async function handleGoogleLogin() {
    setSubmitting(true);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      alert(err?.message || "Failed to start Google login");
      setSubmitting(false);
    }
  }

  const isButtonDisabled = authLoading || submitting;

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen flex flex-col justify-between">
      {/* Header */}
      <header className="w-full border-b border-outline-variant bg-surface-container-lowest/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin h-16 flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary font-headline-sm font-bold text-headline-sm">
              C
            </div>
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">
              Campus Collab
            </span>
          </div>
          <div className="flex items-center gap-space-xs px-2.5 py-1 rounded-full bg-surface-container-low border border-outline-variant">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
              Verified Campus Network
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full flex-1 flex flex-col items-center justify-center px-margin-mobile md:px-margin py-space-xl bg-surface">
        <div className="flex flex-col w-full max-w-7xl mx-auto md:py-space-md">
          {/* Split Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-8 items-stretch">
            {/* LEFT PANEL: Brand, Matchmaking Visualization & Tags */}
            <div className="lg:col-span-7 flex flex-col justify-between p-space-md md:p-space-lg lg:p-space-xl rounded-xl bg-surface-container-low/60 shadow-sm relative overflow-hidden">
              {/* Subtle Decorative Atmospheric Blur */}
              <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary-fixed/40 blur-3xl pointer-events-none -z-10"></div>
              <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-secondary-fixed/50 blur-3xl pointer-events-none -z-10"></div>

              <div className="flex flex-col gap-space-md">
                {/* Verification Pill Header */}
                <div className="inline-flex items-center gap-space-xs px-3.5 py-1.5 rounded-full bg-surface-container-lowest shadow-sm self-start">
                  <span className="text-sm leading-none">🎓</span>
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold tracking-wide">
                    Campus Network Exclusive • Verified .edu Students Only
                  </span>
                </div>

                {/* Hero Typography */}
                <div className="flex flex-col gap-space-xs">
                  <h1 className="font-display-hero text-headline-lg md:text-display-hero text-on-surface font-bold tracking-tight max-w-xl">
                    Find the right people to{" "}
                    <span className="text-primary-container">build with.</span>
                  </h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
                    Discover students with the skills, interests, and ideas you need for your next campus event, hackathon, or breakthrough project.
                  </p>
                </div>

                {/* Direct Matchmaking Mechanics Showcase */}
                <div className="my-space-md relative w-full p-space-md md:p-space-lg rounded-xl bg-surface-container-lowest shadow-md">
                  {/* Fine Background Grid Texture */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1b1b1e_1px,transparent_1px)] [background-size:16px_16px]"></div>

                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-space-md lg:gap-space-sm">
                    {/* Card A: I CAN DO */}
                    <div className="w-full md:w-5/12 p-space-md rounded-lg bg-surface-container-low shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
                      <div className="flex items-center gap-space-sm mb-space-sm pb-space-xs">
                        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline-sm font-bold text-headline-sm shadow-sm">
                          AP
                        </div>
                        <div className="min-w-0">
                          <div className="font-headline-sm text-headline-sm text-on-surface truncate">
                            Anya Patel
                          </div>
                          <div className="font-label-sm text-label-sm text-on-surface-variant truncate">
                            CS '26 • Stanford
                          </div>
                        </div>
                      </div>
                      <div className="inline-block px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-semibold uppercase tracking-wider mb-space-xs">
                        I CAN DO
                      </div>
                      <div className="font-headline-sm text-headline-sm text-on-surface mb-space-md">
                        Full-stack &amp; PyTorch
                      </div>
                      <div className="flex items-center gap-space-xs px-2.5 py-1.5 rounded-md bg-surface-container-lowest shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="font-body-sm text-body-sm text-on-surface truncate">
                          For: TreeHacks 2025
                        </span>
                      </div>
                    </div>

                    {/* Match Center Hub Connector */}
                    <div className="flex flex-col items-center justify-center py-space-xs px-space-xs relative">
                      <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary shadow-lg ring-4 ring-primary-fixed/50">
                        <span
                          className="material-symbols-outlined text-xl"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          auto_awesome
                        </span>
                      </div>
                      <div className="font-code-sm text-code-sm font-semibold text-primary mt-1 tracking-wider uppercase">
                        Match 98%
                      </div>
                    </div>

                    {/* Card B: NEED SOMEONE */}
                    <div className="w-full md:w-5/12 p-space-md rounded-lg bg-surface-container-low shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
                      <div className="flex items-center gap-space-sm mb-space-sm pb-space-xs">
                        <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary font-headline-sm font-bold text-headline-sm shadow-sm">
                          MK
                        </div>
                        <div className="min-w-0">
                          <div className="font-headline-sm text-headline-sm text-on-surface truncate">
                            Marcus Kim
                          </div>
                          <div className="font-label-sm text-label-sm text-on-surface-variant truncate">
                            Design '25 • Berkeley
                          </div>
                        </div>
                      </div>
                      <div className="inline-block px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold uppercase tracking-wider mb-space-xs">
                        NEED SOMEONE
                      </div>
                      <div className="font-headline-sm text-headline-sm text-on-surface mb-space-md">
                        AI Engineer / ML Dev
                      </div>
                      <div className="flex items-center gap-space-xs px-2.5 py-1.5 rounded-md bg-surface-container-lowest shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                        <span className="font-body-sm text-body-sm text-on-surface truncate">
                          For: TreeHacks 2025
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Verified Banner in Match Box */}
                  <div className="mt-space-md pt-space-sm flex items-center justify-center">
                    <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded-full bg-surface-container-high/80 text-on-surface shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="font-label-sm text-label-sm font-semibold">
                        Verified .edu Students Roster
                      </span>
                      <span className="material-symbols-outlined text-sm text-on-surface-variant ml-1">
                        north_east
                      </span>
                    </div>
                  </div>
                </div>

                {/* Campus Domain Interest Badges */}
                <div className="flex flex-wrap items-center gap-space-xs pt-space-xs">
                  <span className="font-label-sm text-label-sm text-on-surface-variant mr-1">
                    Trending Tracks:
                  </span>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest shadow-sm text-on-surface font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-sm text-primary">
                      terminal
                    </span>
                    <span>Hackathons</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest shadow-sm text-on-surface font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-sm text-tertiary-container">
                      memory
                    </span>
                    <span>Robotics &amp; Hardware</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest shadow-sm text-on-surface font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-sm text-secondary">
                      palette
                    </span>
                    <span>Design &amp; UX</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest shadow-sm text-on-surface font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-sm text-primary">
                      rocket_launch
                    </span>
                    <span>Venture &amp; Startups</span>
                  </div>
                </div>
              </div>

              {/* Quick Trust Metric Footer */}
              <div className="mt-space-lg pt-space-md flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <div className="flex -space-x-2">
                    <div className="w-7 h-7 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-label-sm text-label-sm font-bold shadow-xs">
                      S
                    </div>
                    <div className="w-7 h-7 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-label-sm text-label-sm font-bold shadow-xs">
                      B
                    </div>
                    <div className="w-7 h-7 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-label-sm text-label-sm font-bold shadow-xs">
                      M
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    Joined by builders from 140+ collegiate hubs
                  </span>
                </div>
                <div className="font-code-sm text-code-sm text-on-surface-variant">
                  v2.4.0_campus_auth
                </div>
              </div>
            </div>

            {/* RIGHT PANEL: Dedicated Google OAuth Sign-in Card */}
            <div className="lg:col-span-5 flex flex-col justify-center items-center">
              <div className="w-full max-w-md bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-xl relative overflow-hidden">
                {/* Top Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-primary-container to-secondary-container"></div>

                {/* Identity & Header */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-lg bg-surface-container-low flex items-center justify-center shadow-sm mb-space-md p-2">
                    <img
                      alt="Campus Collab Mark"
                      className="w-full h-full object-contain rounded-md"
                      src="https://lh3.googleusercontent.com/aida/AEtjO1XpI56LL9P9UP1QdVSdI0OYvRUulAIM_8Z5e5HyIYoeKt-lrrDaO9r5Punvt6As_Thw9vmBnV33InET1RkOMlJP_2Y6gGB3BWCeR529FsYMMiT0ss56u02c_CHlm_Be4WY3p2FyFta_bXm_S__oFZWPYYZvohP3OmYVZwvFEiwX6qhlhOHIV22I2sp0hDpVpZKRipytl5if7EkgUc3PS8siwVExwqrlqkNdhnLLNphE0jnwqtAg03VYis4"
                    />
                  </div>
                  <span className="font-headline-sm text-headline-sm text-primary-container font-semibold tracking-tight uppercase mb-space-xs">
                    Campus Collab
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">
                    Sign in to Campus Collab
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1.5">
                    Find teammates and build together across campus.
                  </p>
                </div>

                {/* Google OAuth Primary Action Section */}
                <div className="mt-space-lg flex flex-col gap-space-sm w-full">
                  <button
                    onClick={handleGoogleLogin}
                    disabled={isButtonDisabled}
                    type="button"
                    className="w-full h-12 px-space-md rounded-lg bg-surface-container-lowest hover:bg-surface-container-low active:scale-[0.99] transition-all duration-150 flex items-center justify-center gap-space-sm shadow-md cursor-pointer group disabled:opacity-75 disabled:pointer-events-none"
                  >
                    {submitting ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin"></span>
                        <span className="font-headline-sm text-body-lg text-on-surface font-semibold tracking-tight">
                          Redirecting to Google...
                        </span>
                      </>
                    ) : (
                      <>
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-105"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                            fill="#4285F4"
                          ></path>
                          <path
                            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                            fill="#34A853"
                          ></path>
                          <path
                            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.43.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                            fill="#FBBC05"
                          ></path>
                          <path
                            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                            fill="#EA4335"
                          ></path>
                        </svg>
                        <span className="font-headline-sm text-body-lg text-on-surface font-semibold tracking-tight">
                          Continue with Google
                        </span>
                      </>
                    )}
                  </button>

                  {/* Credential Verification Helper */}
                  <div className="flex items-center justify-center gap-1.5 text-on-surface-variant pt-space-xs">
                    <span className="material-symbols-outlined text-base text-primary">
                      lock
                    </span>
                    <span className="font-label-sm text-label-sm font-medium">
                      Use your college Google account to continue.
                    </span>
                  </div>
                </div>

                {/* Strict Domain Policy Information Callout */}
                <div className="mt-space-md p-space-md rounded-lg bg-surface-container-low shadow-sm flex items-start gap-space-sm">
                  <span className="material-symbols-outlined text-lg text-primary-container flex-shrink-0 mt-0.5">
                    verified
                  </span>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold tracking-tight">
                      University Restriction Active
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-relaxed">
                      Only verified university emails (
                      <code className="font-code-sm text-code-sm text-primary font-medium">
                        .edu
                      </code>
                      ,{" "}
                      <code className="font-code-sm text-code-sm text-primary font-medium">
                        .ac.in
                      </code>
                      , or accredited collegiate workspace domains) can access listings and profiles.
                    </p>
                  </div>
                </div>

                {/* Campus Support Checklist */}
                <div className="mt-space-md grid grid-cols-2 gap-space-xs">
                  <div className="flex items-center gap-1.5 p-2 rounded-md bg-surface-container-low">
                    <span className="material-symbols-outlined text-sm text-emerald-600">
                      check_circle
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
                      Instant .edu sync
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded-md bg-surface-container-low">
                    <span className="material-symbols-outlined text-sm text-emerald-600">
                      check_circle
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
                      Zero passwords
                    </span>
                  </div>
                </div>

                {/* Terms and Legal Disclaimer */}
                <div className="mt-space-lg text-center">
                  <p className="font-label-sm text-label-sm text-on-surface-variant leading-normal">
                    By continuing, you agree to Campus Collab's{" "}
                    <a className="text-primary hover:underline font-medium" href="#terms">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a className="text-primary hover:underline font-medium" href="#privacy">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-outline-variant bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin h-14 flex flex-col sm:flex-row items-center justify-between gap-space-sm">
          <p className="font-label-sm text-label-sm text-on-surface-variant">
            © 2025 Campus Collab Platform. Strictly for accredited collegiate builders.
          </p>
          <div className="flex items-center gap-space-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-sm text-primary">
              verified_user
            </span>
            <span className="font-label-sm text-label-sm font-medium">
              College Network Safety Protocol Active
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
