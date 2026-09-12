"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";

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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">

          <div className="space-y-6 text-center lg:col-span-7 lg:text-left">

            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-100/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-indigo-800">
              <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-600"></span>
              Campus Collaboration Platform
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Find Your{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-indigo-700 bg-clip-text text-transparent">
                Perfect Team.
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg font-normal leading-relaxed text-slate-600 sm:text-xl lg:mx-0">
              Discover upcoming events, find people with the skills you need,
              and build your team.
            </p>

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
      text: "Browse upcoming college events and activities.",
    },
    {
      id: 2,
      title: "Find Your Match",
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
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      text: "Find people whose skills match what your team needs.",
    },
    {
      id: 3,
      title: "Build Your Team",
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
      text: "Apply to teams or create your own request and choose the right teammates.",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            How CampusCollab Works
          </h2>

          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            A simple three-step workflow designed to take you from solo
            student to tournament-ready team.
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
// EVENT CARD
// ==========================================



// ==========================================
// MATCHING SECTION
// ==========================================

function MatchingSection() {
  const skills = [
    "Coding",
    "UI/UX",
    "Photography",
    "Singing",
    "Dancing",
    "Game Development",
  ];

  const flowSteps = [
    {
      title: "Your Team Needs",
      desc: "Define missing roles",
    },
    {
      title: "Select Skills",
      desc: "Pick from campus tags",
    },
    {
      title: "CampusCollab Finds Matches",
      desc: "Automated candidate filtering",
    },
    {
      title: "Review Profiles",
      desc: "Evaluate portfolios & past events",
    },
    {
      title: "Build Your Team",
      desc: "Confirm squad & start building",
    },
  ];

  const [selectedSkills, setSelectedSkills] = useState([
    "Coding",
    "UI/UX",
  ]);

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(
        selectedSkills.filter((s) => s !== skill)
      );
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  return (
    <section className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-indigo-50/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mx-auto mb-14 max-w-2xl text-center">

          <span className="rounded-full border border-indigo-200 bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-700">
            Precision Discovery
          </span>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Find People With the Skills You Need
          </h2>

          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            Select the skills your team needs and discover students who can
            contribute.
          </p>

        </div>

        <div className="mx-auto mb-16 max-w-2xl text-center">

          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Click to preview required skills:
          </p>

          <div className="flex flex-wrap justify-center gap-2.5">
            {skills.map((skill) => {
              const isSelected = selectedSkills.includes(skill);

              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${isSelected
                    ? "scale-105 bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-600/30"
                    : "border border-slate-300 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50"
                    }`}
                >
                  {isSelected ? "✓ " : "+ "}
                  {skill}
                </button>
              );
            })}
          </div>

        </div>

        <div className="mx-auto max-w-5xl">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">

            <div className="mb-8 text-center">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                The Matching Pipeline
              </h4>
            </div>

            <div className="relative grid grid-cols-1 gap-4 md:grid-cols-5">

              {flowSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="group relative flex flex-col items-center text-center"
                >

                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-indigo-200 bg-indigo-100 text-sm font-bold text-indigo-700 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                    {idx + 1}
                  </div>

                  <h5 className="mb-1 text-sm font-bold text-slate-900">
                    {step.title}
                  </h5>

                  <p className="text-xs text-slate-500">
                    {step.desc}
                  </p>

                  {idx < flowSteps.length - 1 && (
                    <div className="absolute -right-3 top-5 hidden font-bold text-slate-300 md:block">
                      <svg
                        className="h-5 w-5 text-indigo-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  )}

                  {idx < flowSteps.length - 1 && (
                    <div className="my-2 text-indigo-500 md:hidden">
                      ↓
                    </div>
                  )}

                </div>
              ))}

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
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-950 py-20 text-white">

      <div className="pointer-events-none absolute right-1/4 top-0 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl"></div>

      <div className="pointer-events-none absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-indigo-400/10 blur-3xl"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">

        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          Your next team is waiting.
        </h2>

        <p className="mx-auto mb-8 max-w-2xl text-lg font-normal leading-relaxed text-indigo-100/90 sm:text-xl">
          Find an event. Find your people. Build something together.
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
              to="/profile"
              className="transition hover:text-indigo-600"
            >
              Profile
            </Link>
          </nav>

        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-slate-100 pt-6 text-xs text-slate-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} CampusCollab. Built for college
            creators & competitors.
          </p>

          <p>Tailwind CSS + React.js + Supabase Ready</p>
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
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow">
        <HeroSection />
        <HowItWorks />
        <MatchingSection />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return <Home />;
}