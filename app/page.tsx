"use client";

import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>("Coding");

  const popularSkills = [
    "Coding",
    "UI/UX",
    "Photography",
    "Singing",
    "Dancing",
    "Game Development",
    "Product Management",
    "Data Science",
  ];

  const upcomingEvents = [
    {
      id: "codestorm-2026",
      tag: "Hackathon",
      tagColor: "bg-surface-container-high text-primary",
      date: "Oct 5, 2026",
      title: "CodeStorm Hackathon",
      description:
        "A 24-hour college hackathon where students build innovative projects, prototypes, and technical solutions.",
    },
    {
      id: "dance-competition-2026",
      tag: "Cultural",
      tagColor: "bg-secondary-container text-on-secondary-container",
      date: "Oct 12, 2026",
      title: "College Dance Competition",
      description:
        "Compete with other students and build your perfect dance team for the inter-collegiate championship stage.",
    },
    {
      id: "game-jam-2026",
      tag: "Gaming",
      tagColor: "bg-tertiary-fixed text-on-tertiary-fixed",
      date: "Oct 20, 2026",
      title: "Game Jam 2026",
      description:
        "Build an original game with a team within a limited time. Open to writers, 2D/3D artists, sound designers, and devs.",
    },
    {
      id: "cricket-tournament-2026",
      tag: "Sports",
      tagColor: "bg-surface-container-high text-primary",
      date: "Nov 2, 2026",
      title: "Cricket Tournament",
      description:
        "Find teammates and participate in the college cricket tournament. Open to batsmen, bowlers, and all-rounders.",
    },
  ];

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen flex flex-col justify-between">
      {/* ── Fixed Navigation Header ── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-surface/85 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="h-16 max-w-7xl mx-auto px-gutter flex items-center justify-between">
          <div className="flex items-center gap-space-lg">
            <Link
              href="/"
              className="flex items-center gap-space-sm group focus:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary font-headline-sm font-bold shadow-sm">
                C
              </div>
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-semibold">
                CampusCollab
              </span>
            </Link>

            <nav className="hidden sm:flex items-center gap-2">
              <Link
                href="/"
                className="px-4 py-1.5 transition-colors bg-secondary-container text-on-secondary-container font-semibold rounded-full font-label-md"
              >
                Home
              </Link>
              <Link
                href="/events"
                className="px-4 py-1.5 transition-colors text-on-surface-variant hover:text-on-surface font-label-md"
              >
                Events
              </Link>
            </nav>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-1.5 rounded-full text-on-surface-variant font-label-md transition-colors hover:text-on-surface"
            >
              Log in
            </Link>
            <Link
              href="/profile"
              className="flex items-center gap-space-sm px-3.5 py-1.5 rounded-full bg-surface-container-low border border-outline-variant/40 text-on-surface font-label-md transition-colors hover:bg-surface-container"
            >
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined text-[16px]">
                  person
                </span>
              </div>
              <span>Profile</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex sm:hidden items-center gap-space-sm">
            <button
              aria-label="Toggle Menu"
              onClick={() => setMobileDrawerOpen((prev) => !prev)}
              className="p-space-xs rounded-lg text-on-surface-variant hover:text-on-surface focus:outline-none"
              type="button"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileDrawerOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileDrawerOpen && (
          <div className="sm:hidden border-t border-outline-variant/30 bg-surface px-gutter py-space-md animate-in fade-in slide-in-from-top-2 duration-150">
            <nav className="flex flex-col gap-space-xs">
              <Link
                href="/"
                onClick={() => setMobileDrawerOpen(false)}
                className="px-4 py-2 bg-secondary-container text-on-secondary-container font-semibold rounded-xl"
              >
                Home
              </Link>
              <Link
                href="/events"
                onClick={() => setMobileDrawerOpen(false)}
                className="px-4 py-2 text-on-surface-variant font-label-md rounded-xl hover:bg-surface-container-low"
              >
                Events
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileDrawerOpen(false)}
                className="px-4 py-2 text-on-surface-variant font-label-md rounded-xl hover:bg-surface-container-low"
              >
                Log In
              </Link>
              <Link
                href="/profile"
                onClick={() => setMobileDrawerOpen(false)}
                className="flex items-center gap-space-sm px-4 py-2 rounded-xl text-on-surface-variant font-label-md hover:text-on-surface hover:bg-surface-container-low"
              >
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-on-primary">
                  <span className="material-symbols-outlined text-[16px]">
                    person
                  </span>
                </div>
                <span>Profile</span>
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* ── Main Content Area ── */}
      <main className="w-full pt-16 min-h-[calc(100vh-16rem)] bg-surface">
        <div className="flex flex-col w-full">
          {/* ── 1. Hero Section ── */}
          <section className="relative w-full overflow-hidden bg-surface-bright pb-16 pt-8 md:pb-24 md:pt-16">
            <div className="absolute -top-32 right-10 -z-10 h-96 w-96 rounded-full bg-primary-fixed/20 blur-3xl pointer-events-none"></div>
            <div className="absolute top-1/2 -left-20 -z-10 h-80 w-80 rounded-full bg-secondary-container/25 blur-3xl pointer-events-none"></div>

            <div className="mx-auto max-w-7xl px-gutter">
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
                {/* Hero Content (Left) */}
                <div className="flex flex-col items-start lg:col-span-7">
                  <div className="inline-flex items-center gap-2 rounded-full bg-surface-container px-4 py-1.5 shadow-sm">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary animate-pulse"></span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      Campus Collaboration Platform
                    </span>
                  </div>

                  <h1 className="mt-6 font-display-hero text-headline-lg md:text-display-hero text-on-surface tracking-tight max-w-2xl text-balance">
                    Find Your Perfect{" "}
                    <span className="text-primary-container">Team.</span>
                  </h1>

                  <p className="mt-6 font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
                    Discover upcoming events, find people with the skills you
                    need, and build your team.
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Link
                      href="/events"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-label-md text-label-md text-on-primary shadow-lg shadow-primary/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-container active:scale-95"
                    >
                      <span>Explore Events</span>
                      <span className="material-symbols-outlined text-[20px]">
                        arrow_forward
                      </span>
                    </Link>
                    <div className="flex items-center gap-2 px-2 py-1 text-on-surface-variant font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-primary text-[18px]">
                        verified
                      </span>
                      <span>100% Student Verified Profiles</span>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-2 font-label-sm text-label-sm font-semibold tracking-wide uppercase text-tertiary">
                    <span>Hackathons</span>
                    <span className="text-outline-variant">•</span>
                    <span>Cultural Events</span>
                    <span className="text-outline-variant">•</span>
                    <span>Sports</span>
                    <span className="text-outline-variant">•</span>
                    <span>Competitions</span>
                  </div>
                </div>

                {/* Hero Graphic (Right) */}
                <div className="relative w-full lg:col-span-5">
                  <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl bg-surface-container-lowest p-6 shadow-xl shadow-on-surface/5">
                    {/* Decorative connection nodes backdrop */}
                    <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-surface-container-low to-surface-container opacity-60"></div>

                    {/* Mini Floating Status Bar */}
                    <div className="flex items-center justify-between rounded-2xl bg-surface-container-low px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-on-primary font-label-sm text-label-sm">
                          <span className="material-symbols-outlined text-[16px]">
                            groups
                          </span>
                        </div>
                        <span className="font-headline-sm text-label-md text-on-surface font-medium">
                          Campus Matchmaker
                        </span>
                      </div>
                      <span className="rounded-full bg-secondary-container px-3 py-0.5 font-label-sm text-label-sm text-on-secondary-container font-medium">
                        Open Matches
                      </span>
                    </div>

                    {/* Central Team Composition Visualization Card */}
                    <div className="mt-5 rounded-2xl bg-surface-container-lowest p-5 shadow-sm border border-outline-variant/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="font-headline-sm text-title-md text-on-surface font-semibold">
                            BioHacks 2026 Entry
                          </h2>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">
                            Team Alpha • 3 / 4 Members
                          </p>
                        </div>
                        <span className="rounded-full bg-surface-container-high px-2.5 py-1 font-label-sm text-label-sm text-primary font-medium">
                          Forming
                        </span>
                      </div>

                      {/* Connection Diagram Canvas Area */}
                      <div className="relative my-6 flex items-center justify-center py-2">
                        <svg
                          className="h-28 w-full"
                          fill="none"
                          viewBox="0 0 340 110"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {/* Connection Lines */}
                          <path
                            className="text-primary-fixed"
                            d="M 60 55 C 110 55, 120 55, 170 55"
                            stroke="currentColor"
                            strokeDasharray="4 4"
                            strokeWidth="2.5"
                          ></path>
                          <path
                            className="text-primary"
                            d="M 170 55 C 220 55, 230 55, 280 55"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          ></path>
                          <path
                            className="text-secondary-fixed-dim"
                            d="M 170 55 L 170 15"
                            stroke="currentColor"
                            strokeDasharray="3 3"
                            strokeWidth="2"
                          ></path>

                          {/* Node 1: Designer */}
                          <circle
                            className="fill-surface-container-high"
                            cx="60"
                            cy="55"
                            r="24"
                          ></circle>
                          <circle
                            className="fill-surface-container-lowest"
                            cx="60"
                            cy="55"
                            r="20"
                          ></circle>
                          <text
                            className="fill-on-surface font-semibold text-[13px]"
                            textAnchor="middle"
                            x="60"
                            y="60"
                          >
                            UX
                          </text>

                          {/* Central Hub: Team Request */}
                          <circle
                            className="fill-primary"
                            cx="170"
                            cy="55"
                            r="30"
                          ></circle>
                          <text
                            className="fill-on-primary font-bold text-[12px]"
                            textAnchor="middle"
                            x="170"
                            y="52"
                          >
                            CORE
                          </text>
                          <text
                            className="fill-primary-fixed text-[10px]"
                            textAnchor="middle"
                            x="170"
                            y="66"
                          >
                            TEAM
                          </text>

                          {/* Top Node: Lead */}
                          <circle
                            className="fill-secondary-container"
                            cx="170"
                            cy="15"
                            r="12"
                          ></circle>
                          <text
                            className="fill-on-secondary-container font-bold text-[9px]"
                            textAnchor="middle"
                            x="170"
                            y="19"
                          >
                            LEAD
                          </text>

                          {/* Node 2: Open Developer Spot */}
                          <circle
                            className="fill-primary-fixed"
                            cx="280"
                            cy="55"
                            r="24"
                          ></circle>
                          <circle
                            className="fill-surface-container-lowest"
                            cx="280"
                            cy="55"
                            r="20"
                          ></circle>
                          <text
                            className="fill-primary font-bold text-[13px]"
                            textAnchor="middle"
                            x="280"
                            y="60"
                          >
                            DEV
                          </text>
                        </svg>
                      </div>

                      {/* Skill Badges Deck */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="rounded-full bg-surface-container px-3 py-1 font-label-sm text-label-sm text-on-surface">
                          React
                        </span>
                        <span className="rounded-full bg-surface-container px-3 py-1 font-label-sm text-label-sm text-on-surface">
                          UI/UX
                        </span>
                        <span className="rounded-full bg-secondary-container px-3 py-1 font-label-sm text-label-sm text-on-secondary-container font-semibold">
                          Backend Wanted
                        </span>
                      </div>
                    </div>

                    {/* Mini Teammate Matching Indicator */}
                    <div className="mt-4 flex items-center justify-between rounded-xl bg-surface-container-low p-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-fixed text-on-primary-fixed">
                          <span className="material-symbols-outlined text-[20px]">
                            bolt
                          </span>
                        </div>
                        <div>
                          <div className="font-headline-sm text-label-md text-on-surface font-medium">
                            Smart Match Active
                          </div>
                          <div className="font-body-sm text-label-sm text-on-surface-variant">
                            24 campus members fit this request
                          </div>
                        </div>
                      </div>
                      <span className="font-headline-sm text-label-md text-primary font-bold">
                        98% Match
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── 2. How It Works Section ── */}
          <section className="w-full bg-surface py-20 border-t border-outline-variant/20">
            <div className="mx-auto max-w-7xl px-gutter">
              <div className="text-center max-w-2xl mx-auto">
                <span className="rounded-full bg-surface-container px-4 py-1.5 font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">
                  3 Simple Steps
                </span>
                <h2 className="mt-4 font-headline-lg text-headline-lg text-on-surface font-bold">
                  How CampusCollab Works
                </h2>
                <p className="mt-3 font-body-md text-body-md text-on-surface-variant">
                  A streamlined pathway designed to get you from solitary ideation
                  to a fully staffed team ready to compete.
                </p>
              </div>

              <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Step 1 */}
                <div className="group flex flex-col rounded-2xl bg-surface-container-lowest p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-outline-variant/30">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-fixed text-on-primary-fixed shadow-inner">
                    <span className="material-symbols-outlined text-[28px]">
                      search
                    </span>
                  </div>
                  <div className="mt-6 flex items-center gap-2">
                    <span className="font-headline-sm text-label-sm text-primary uppercase tracking-widest font-bold">
                      Step 01
                    </span>
                  </div>
                  <h3 className="mt-2 font-headline-md text-headline-md text-on-surface font-semibold">
                    Discover
                  </h3>
                  <p className="mt-3 font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Browse upcoming college events and activities across
                    hackathons, cultural festivals, competitions, and
                    tournaments.
                  </p>
                  <div className="mt-6 pt-4 flex items-center text-primary font-label-sm text-label-sm font-medium">
                    <span className="material-symbols-outlined text-[18px] mr-1">
                      explore
                    </span>
                    <span>Explore all open categories</span>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="group flex flex-col rounded-2xl bg-surface-container-lowest p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-outline-variant/30">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary-container text-on-secondary-container shadow-inner">
                    <span className="material-symbols-outlined text-[28px]">
                      join_inner
                    </span>
                  </div>
                  <div className="mt-6 flex items-center gap-2">
                    <span className="font-headline-sm text-label-sm text-primary uppercase tracking-widest font-bold">
                      Step 02
                    </span>
                  </div>
                  <h3 className="mt-2 font-headline-md text-headline-md text-on-surface font-semibold">
                    Find Your Match
                  </h3>
                  <p className="mt-3 font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Find people whose skills match what your team needs. Search
                    by specific languages, frameworks, or creative talents.
                  </p>
                  <div className="mt-6 pt-4 flex items-center text-primary font-label-sm text-label-sm font-medium">
                    <span className="material-symbols-outlined text-[18px] mr-1">
                      tune
                    </span>
                    <span>Precise skill calibration</span>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="group flex flex-col rounded-2xl bg-surface-container-lowest p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-outline-variant/30">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-tertiary-fixed text-on-tertiary-fixed shadow-inner">
                    <span className="material-symbols-outlined text-[28px]">
                      groups_3
                    </span>
                  </div>
                  <div className="mt-6 flex items-center gap-2">
                    <span className="font-headline-sm text-label-sm text-primary uppercase tracking-widest font-bold">
                      Step 03
                    </span>
                  </div>
                  <h3 className="mt-2 font-headline-md text-headline-md text-on-surface font-semibold">
                    Build Your Team
                  </h3>
                  <p className="mt-3 font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Apply to teams or create your own request and choose the
                    right teammates with full transparency and zero clutter.
                  </p>
                  <div className="mt-6 pt-4 flex items-center text-primary font-label-sm text-label-sm font-medium">
                    <span className="material-symbols-outlined text-[18px] mr-1">
                      handshake
                    </span>
                    <span>Frictionless approval</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── 3. Feature Section ("Why CampusCollab?") ── */}
          <section className="w-full bg-surface-container-low py-20">
            <div className="mx-auto max-w-7xl px-gutter">
              <div className="text-center max-w-2xl mx-auto">
                <span className="rounded-full bg-surface-container px-4 py-1.5 font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">
                  Why CampusCollab
                </span>
                <h2 className="mt-4 font-headline-lg text-headline-lg text-on-surface font-bold">
                  Everything You Need to Find Your People
                </h2>
                <p className="mt-3 font-body-md text-body-md text-on-surface-variant">
                  The purpose-built collegiate platform engineered for team
                  formation without unsolicited noise.
                </p>
              </div>

              <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Feature 1 */}
                <div className="flex flex-col rounded-2xl bg-surface-container-lowest p-6 shadow-sm border border-outline-variant/30">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container text-primary">
                    <span className="material-symbols-outlined text-[24px]">
                      tune
                    </span>
                  </div>
                  <h3 className="mt-5 font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Skill-Based Matching
                  </h3>
                  <p className="mt-2.5 font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Find teammates based on the skills your team actually needs,
                    preventing mismatched requirements.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="flex flex-col rounded-2xl bg-surface-container-lowest p-6 shadow-sm border border-outline-variant/30">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container text-primary">
                    <span className="material-symbols-outlined text-[24px]">
                      person_add
                    </span>
                  </div>
                  <h3 className="mt-5 font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Flexible Team Building
                  </h3>
                  <p className="mt-2.5 font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Create a request for one or multiple teammates and choose
                    from applicants who suit your goals.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="flex flex-col rounded-2xl bg-surface-container-lowest p-6 shadow-sm border border-outline-variant/30">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container text-primary">
                    <span className="material-symbols-outlined text-[24px]">
                      emoji_events
                    </span>
                  </div>
                  <h3 className="mt-5 font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Discover Opportunities
                  </h3>
                  <p className="mt-2.5 font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Find hackathons, competitions, cultural events, sports and
                    more with unified campus deadlines.
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="flex flex-col rounded-2xl bg-surface-container-lowest p-6 shadow-sm border border-outline-variant/30">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container text-primary">
                    <span className="material-symbols-outlined text-[24px]">
                      verified_user
                    </span>
                  </div>
                  <h3 className="mt-5 font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Safe Connections
                  </h3>
                  <p className="mt-2.5 font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Your contact information stays private until a team
                    connection is officially confirmed and accepted.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── 4. Upcoming Events Preview ── */}
          <section className="w-full bg-surface py-20 border-t border-outline-variant/20">
            <div className="mx-auto max-w-7xl px-gutter">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <span className="rounded-full bg-secondary-container px-3.5 py-1 font-label-sm text-label-sm font-semibold text-on-secondary-container">
                    Active Campus Activities
                  </span>
                  <h2 className="mt-3 font-headline-lg text-headline-lg text-on-surface font-bold">
                    Upcoming Events
                  </h2>
                  <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
                    Gather your roster or find an open crew for these scheduled
                    campus challenges.
                  </p>
                </div>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="group flex flex-col justify-between rounded-2xl bg-surface-container-lowest p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-outline-variant/30"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span
                          className={`rounded-full px-3 py-1 font-label-sm text-label-sm font-semibold ${event.tagColor}`}
                        >
                          {event.tag}
                        </span>
                        <span className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
                          <span className="material-symbols-outlined text-[16px]">
                            calendar_today
                          </span>
                          <span>{event.date}</span>
                        </span>
                      </div>
                      <h3 className="mt-4 font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors font-semibold">
                        {event.title}
                      </h3>
                      <p className="mt-2.5 font-body-sm text-body-sm text-on-surface-variant line-clamp-3">
                        {event.description}
                      </p>
                    </div>
                    <div className="mt-6 pt-4">
                      <Link
                        href="/events"
                        className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-surface-container-low px-4 py-2.5 font-label-md text-label-md text-primary font-semibold transition-colors hover:bg-primary hover:text-on-primary"
                      >
                        <span>View Event</span>
                        <span className="material-symbols-outlined text-[18px]">
                          chevron_right
                        </span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Centered Secondary Button */}
              <div className="mt-12 text-center">
                <Link
                  href="/events"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-surface-container px-8 py-3.5 font-label-md text-label-md text-primary font-semibold transition-all hover:bg-primary hover:text-on-primary"
                >
                  <span>View All Events</span>
                  <span className="material-symbols-outlined text-[20px]">
                    calendar_month
                  </span>
                </Link>
              </div>
            </div>
          </section>

          {/* ── 5. How Team Matching Works ── */}
          <section className="w-full bg-surface-container-low py-20">
            <div className="mx-auto max-w-7xl px-gutter">
              <div className="text-center max-w-2xl mx-auto">
                <span className="rounded-full bg-surface-container px-4 py-1.5 font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">
                  Engineered For Collaboration
                </span>
                <h2 className="mt-4 font-headline-lg text-headline-lg text-on-surface font-bold">
                  Find People With the Skills You Need
                </h2>
                <p className="mt-3 font-body-md text-body-md text-on-surface-variant">
                  A simple, transparent process to assemble winning teams
                  without friction.
                </p>
              </div>

              {/* Flow Diagram */}
              <div className="mt-16">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                  {[
                    {
                      step: "1",
                      title: "Your Team Needs",
                      desc: "Specify openings for your project or tournament.",
                    },
                    {
                      step: "2",
                      title: "Select Skills",
                      desc: "Pin target competencies like React, UI, or ML.",
                    },
                    {
                      step: "3",
                      title: "Campus Match",
                      desc: "CampusCollab filters and highlights matches.",
                    },
                    {
                      step: "4",
                      title: "Review Profiles",
                      desc: "Inspect portfolios, past projects, and validated skills.",
                    },
                    {
                      step: "5",
                      title: "Build Your Team",
                      desc: "Send invites and lock in your complete roster.",
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="flex flex-col items-center text-center p-5 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-on-primary font-headline-sm text-label-md font-bold shadow-sm">
                        {item.step}
                      </div>
                      <h3 className="mt-4 font-headline-sm text-title-md text-on-surface font-semibold">
                        {item.title}
                      </h3>
                      <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Skill Tag Cloud */}
              <div className="mt-12 rounded-2xl bg-surface-container-lowest p-6 md:p-8 shadow-sm border border-outline-variant/30">
                <div className="text-center font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-6 font-medium">
                  Popular Skills Across Campus Teams
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {popularSkills.map((skill) => {
                    const isSelected = selectedSkill === skill;
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() =>
                          setSelectedSkill(isSelected ? null : skill)
                        }
                        className={`cursor-pointer rounded-full px-4 py-2 font-label-md text-label-md transition-all duration-150 hover:scale-105 ${
                          isSelected
                            ? "bg-secondary-container text-on-secondary-container font-semibold shadow-sm ring-2 ring-primary/20"
                            : "bg-surface-container text-on-surface hover:bg-secondary-container hover:text-on-secondary-container"
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* ── 6. Final CTA Section ── */}
          <section className="w-full bg-surface py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-gutter">
              <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center text-on-primary shadow-xl shadow-primary/20 md:p-20">
                {/* Ambient blurred glow inside container */}
                <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-secondary-container opacity-20 blur-3xl pointer-events-none"></div>
                <div className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-primary-container opacity-30 blur-3xl pointer-events-none"></div>

                <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
                  <h2 className="font-display-hero text-headline-lg md:text-display-hero text-on-primary tracking-tight text-balance font-bold">
                    Your next team is waiting.
                  </h2>
                  <p className="mt-4 font-body-lg text-body-lg text-primary-fixed leading-relaxed">
                    Find an event. Find your people. Build something together.
                  </p>
                  <Link
                    href="/events"
                    className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-surface-container-lowest px-10 py-4 font-label-md text-body-lg text-primary font-bold shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
                  >
                    <span>Explore Events</span>
                    <span className="material-symbols-outlined text-[22px]">
                      rocket_launch
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30 py-space-xl">
        <div className="max-w-7xl mx-auto px-gutter flex flex-col md:flex-row items-center justify-between gap-space-lg text-center md:text-left">
          <div>
            <div className="font-headline-sm text-headline-sm text-primary font-bold">
              CampusCollab
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
              Find people. Build teams. Make something together.
            </p>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-space-lg font-label-md">
            <Link
              href="/"
              className="transition-colors text-primary font-semibold"
            >
              Home
            </Link>
            <Link
              href="/events"
              className="text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Events
            </Link>
            <Link
              href="/login"
              className="text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/profile"
              className="text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Profile
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
