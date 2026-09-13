"use client";

import Navbar from "@/components/Navbar";

// ==========================================
// SIMPLE LINK COMPONENT
// ==========================================

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
};

const Link = ({ to, children, className, ...props }: LinkProps) => (
  <a href={to} className={className} {...props}>
    {children}
  </a>
);

// ==========================================
// HERO SECTION
// ==========================================

function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-indigo-50/70 via-white to-white pb-20 pt-12 md:pb-28 md:pt-20">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-indigo-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-emerald-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">

          {/* LEFT SIDE */}
          <div className="space-y-6 text-center lg:col-span-7 lg:text-left">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-100/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-indigo-800">
              <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-600" />
              Campus Collaboration Platform
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Find Your{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-indigo-700 bg-clip-text text-transparent">
                Perfect Team.
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto max-w-2xl text-lg font-normal leading-relaxed text-slate-600 sm:text-xl lg:mx-0">
              Discover opportunities, connect with students who complement
              your skills, and build teams that can actually make things happen.
            </p>

            {/* CTA */}
            <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row lg:justify-start">
              <Link
                to="/events"
                className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-md shadow-indigo-600/20 transition-all duration-200 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/30 active:scale-[0.98] sm:w-auto"
              >
                <span>Explore Events</span>

                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>

            {/* Categories */}
            <p className="pt-1 text-xs font-medium tracking-wide text-slate-500 sm:text-sm">
              Hackathons{" "}
              <span className="text-indigo-600">•</span>{" "}
              Cultural Events{" "}
              <span className="text-indigo-600">•</span>{" "}
              Sports{" "}
              <span className="text-indigo-600">•</span>{" "}
              Competitions
            </p>
          </div>

          {/* RIGHT SIDE - VISUAL */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="relative mx-auto max-w-md">

              {/* Main card */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60">

                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                      CampusCollab
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-slate-900">
                      Build something together.
                    </h3>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
                    <svg
                      className="h-6 w-6 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Three stages */}
                <div className="space-y-3">

                  <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-bold text-indigo-600 shadow-sm">
                      01
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900">
                        Discover
                      </p>
                      <p className="text-xs text-slate-500">
                        Find opportunities around you
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-sm">
                      02
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900">
                        Connect
                      </p>
                      <p className="text-xs text-slate-500">
                        Find people with complementary skills
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-bold text-indigo-600 shadow-sm">
                      03
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900">
                        Collaborate
                      </p>
                      <p className="text-xs text-slate-500">
                        Turn an idea into a team
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-6 -left-8 rounded-2xl border border-indigo-100 bg-white px-5 py-4 shadow-lg">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Your advantage
                </p>

                <p className="mt-1 text-sm font-bold text-slate-900">
                  Your skills are discoverable.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ==========================================
// WHY CAMPUSCOLLAB
// ==========================================

function WhyCampusCollab() {
  const features = [
    {
      title: "Discover Opportunities",
      text: "Find hackathons, competitions, cultural events, sports and other campus activities in one place.",
      icon: (
        <svg
          className="h-6 w-6 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
    },

    {
      title: "Find the Right People",
      text: "Connect with students whose skills, interests and experience complement what your team needs.",
      icon: (
        <svg
          className="h-6 w-6 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },

    {
      title: "Build Better Teams",
      text: "Create or join teams based on the skills, experience and availability that actually matter.",
      icon: (
        <svg
          className="h-6 w-6 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="border-y border-slate-100 bg-slate-50/60 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mx-auto mb-12 max-w-2xl text-center">

          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Why CampusCollab?
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            The right opportunity needs the right people.
          </h2>

          <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">
            CampusCollab brings opportunities and students together so that
            good ideas don't stay stuck because you couldn't find a team.
          </p>

        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50">
                {feature.icon}
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {feature.text}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

// ==========================================
// HOW IT WORKS
// ==========================================

function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Discover",
      text: "Explore opportunities happening across your campus.",
      icon: (
        <svg
          className="h-6 w-6 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
    },

    {
      id: 2,
      title: "Find Your Match",
      text: "Tell us what your team needs and discover students with complementary skills.",
      icon: (
        <svg
          className="h-6 w-6 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },

    {
      id: 3,
      title: "Collaborate",
      text: "Connect with teammates, build your team and get started.",
      icon: (
        <svg
          className="h-6 w-6 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mx-auto mb-14 max-w-2xl text-center">

          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Simple by design
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            How CampusCollab Works
          </h2>

          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            Go from finding an opportunity to building a team in three simple steps.
          </p>

        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

          {steps.map((step) => (
            <div
              key={step.id}
              className="group relative flex flex-col items-start rounded-2xl border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md"
            >

              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 transition-colors group-hover:bg-indigo-100/70">
                {step.icon}
              </div>

              <div className="mb-2 flex items-center gap-2">

                <span className="rounded bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-600">
                  Step 0{step.id}
                </span>

                <h3 className="text-xl font-bold text-slate-900">
                  {step.title}
                </h3>

              </div>

              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {step.text}
              </p>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

// ==========================================
// PROFILE CTA
// ==========================================

function ProfileCTA() {
  return (
    <section className="bg-indigo-50/50 py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        <div className="rounded-3xl border border-indigo-100 bg-white p-8 shadow-sm sm:p-12">

          <div className="grid items-center gap-10 md:grid-cols-2">

            {/* LEFT */}
            <div>

              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Build your profile
              </span>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
                Let people discover what you bring to the table.
              </h2>

              <p className="mt-4 leading-relaxed text-slate-600">
                Add your skills, interests, experience and availability.
                Your profile helps CampusCollab understand where you can
                contribute and which teams could be a great fit for you.
              </p>

              <Link
                to="/profile"
                className="mt-6 inline-flex items-center rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
              >
                Complete Your Profile

                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>

            </div>

            {/* RIGHT */}
            <div className="rounded-2xl bg-slate-50 p-6">

              <div className="space-y-4">

                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Skills
                  </p>

                  <p className="mt-2 font-semibold text-slate-900">
                    Show what you can contribute
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Interests
                  </p>

                  <p className="mt-2 font-semibold text-slate-900">
                    Tell people what you enjoy
                  </p>
                </div>

                <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                    Better matches
                  </p>

                  <p className="mt-2 font-semibold text-slate-900">
                    A complete profile helps you find better teammates
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

// ==========================================
// FINAL CTA
// ==========================================

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-800 to-emerald-950 py-20 text-white">

      {/* Background decoration */}
      <div className="pointer-events-none absolute right-1/4 top-0 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">

        <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-200">
          Ready to collaborate?
        </span>

        <h2 className="mb-4 mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          Your next team is waiting.
        </h2>

        <p className="mx-auto mb-8 max-w-2xl text-lg font-normal leading-relaxed text-indigo-100/90 sm:text-xl">
          Find an opportunity. Find your people. Build something together.
        </p>

        <Link
          to="/events"
          className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-bold text-indigo-900 shadow-xl shadow-indigo-950/30 transition duration-200 hover:scale-[1.02] hover:bg-indigo-50 active:scale-[0.98]"
        >
          <span>Explore Events</span>

          <svg
            className="ml-2 h-5 w-5 text-indigo-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </Link>

      </div>
    </section>
  );
}

// ==========================================
// FOOTER
// ==========================================

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">

          {/* BRAND */}
          <div className="text-center sm:text-left">

            <div className="flex items-center justify-center gap-2.5 sm:justify-start">

              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white">

                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>

              </div>

              <span className="text-lg font-bold text-slate-900">
                Campus<span className="text-indigo-600">Collab</span>
              </span>

            </div>

            <p className="mt-1.5 text-xs text-slate-500">
              Find people. Build teams. Make something together.
            </p>

          </div>

          {/* LINKS */}
          <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">

            <Link
              to="/"
              className="transition hover:text-indigo-600"
            >
              Home
            </Link>

            <Link
              to="/events"
              className="transition hover:text-indigo-600"
            >
              Events
            </Link>

            <Link
              to="/teams"
              className="transition hover:text-indigo-600"
            >
              My Teams
            </Link>

            <Link
              to="/profile"
              className="transition hover:text-indigo-600"
            >
              Profile
            </Link>

          </nav>

        </div>

        {/* BOTTOM */}
        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-slate-100 pt-6 text-xs text-slate-400 sm:flex-row">

          <p>
            © {new Date().getFullYear()} CampusCollab. Built for college
            creators & competitors.
          </p>

          <p>
            Built with React.js + Tailwind CSS + Supabase
          </p>

        </div>

      </div>
    </footer>
  );
}

// ==========================================
// MAIN HOME PAGE
// ==========================================

function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">

      <Navbar />

      <main className="flex-grow">

        <HeroSection />

        <WhyCampusCollab />

        <HowItWorks />

        <ProfileCTA />

        <FinalCTA />

      </main>

      <Footer />

    </div>
  );
}

// ==========================================
// APP
// ==========================================

export default function App() {
  return <Home />;
}