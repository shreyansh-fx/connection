"use client";

import React, { useState } from "react";

// Plain anchor wrapper. No router or icon library required.
type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };
const Link = ({ to, children, className, ...props }: LinkProps) => (
  <a href={to} className={className} {...props}>
    {children}
  </a>
);

// ==========================================
// 1. NAVBAR COMPONENT (components/Navbar.jsx)
// ==========================================
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 backdrop-blur-md bg-white/90 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Left Logo + Brand & Home Link */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-green-600 text-white flex items-center justify-center shadow-sm group-hover:bg-green-700 transition-colors">
                {/* Reusable inline logo mark */}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Campus<span className="text-green-600">Collab</span>
              </span>
            </Link>

            <nav className="hidden sm:flex items-center">
              <Link
                to="/"
                className="text-sm font-semibold text-green-700 bg-green-50 px-3.5 py-1.5 rounded-lg hover:bg-green-100 transition-colors"
              >
                Home
              </Link>
            </nav>
          </div>

          {/* Right Profile Link */}
          <div className="hidden sm:flex items-center">
            <Link
              to="/profile"
              className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-green-600 px-3.5 py-2 rounded-lg border border-slate-200 hover:border-green-300 hover:bg-green-50/50 transition"
            >
              <svg className="w-4 h-4 text-slate-500 group-hover:text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Profile</span>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex sm:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-100 py-3 space-y-2">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-green-700 bg-green-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/profile"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-green-600 hover:bg-slate-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

// ==========================================
// 2. HERO SECTION (components/HeroSection.jsx)
// ==========================================
function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-green-50/70 via-white to-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100/80 border border-green-200 text-green-800 text-xs font-semibold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
              Campus Collaboration Platform
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-700">Perfect Team.</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Discover upcoming events, find people with the skills you need, and build your team.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/events"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-xl text-white bg-green-600 hover:bg-green-700 shadow-md shadow-green-600/20 hover:shadow-lg hover:shadow-green-600/30 transition-all duration-200 active:scale-[0.98]"
              >
                <span>Explore Events</span>
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            {/* Sub-line */}
            <p className="text-xs sm:text-sm font-medium text-slate-500 tracking-wide pt-1">
              Hackathons <span className="text-green-600">•</span> Cultural Events <span className="text-green-600">•</span> Sports <span className="text-green-600">•</span> Competitions
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

// ==========================================
// 3. HOW IT WORKS (components/HowItWorks.jsx)
// ==========================================
function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Discover",
      icon: (
        <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      text: "Browse upcoming college events and activities."
    },
    {
      id: 2,
      title: "Find Your Match",
      icon: (
        <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      text: "Find people whose skills match what your team needs."
    },
    {
      id: 3,
      title: "Build Your Team",
      icon: (
        <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
      text: "Apply to teams or create your own request and choose the right teammates."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            How CampusCollab Works
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            A simple three-step workflow designed to take you from solo student to tournament-ready team.
          </p>
        </div>

        {/* Responsive Tailwind Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="relative p-8 bg-white rounded-2xl border border-slate-200 hover:border-green-300 transition duration-300 hover:-translate-y-1 hover:shadow-md group flex flex-col items-start"
            >
              <div className="w-12 h-12 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center mb-6 group-hover:bg-green-100/70 transition-colors">
                {step.icon}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                  Step 0{step.id}
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {step.title}
                </h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mt-2">
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
// 5. EVENT CARD (components/EventCard.jsx)
// ==========================================
function EventCard({ event }: { event: { id: number; name: string; category: string; date: string; description: string } }) {
  // Color badge based on category
  const getCategoryBadgeClass = (category:any) => {
    switch (category.toLowerCase()) {
      case 'hackathon':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'cultural':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'gaming':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'sports':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-lg hover:border-green-300 transition-all duration-300 hover:-translate-y-1">
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${getCategoryBadgeClass(event.category)}`}>
            {event.category}
          </span>
          <div className="flex items-center text-xs font-medium text-slate-500">
            <svg className="w-4 h-4 mr-1.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {event.date}
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2 leading-snug">
          {event.name}
        </h3>

        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          {event.description}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <Link
          to={`/events/${event.id || 1}`}
          className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-semibold text-green-700 bg-green-50 hover:bg-green-600 hover:text-white border border-green-200 hover:border-transparent transition-colors duration-200"
        >
          <span>View Event</span>
          <svg className="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

// ==========================================
// 6. UPCOMING EVENTS (components/UpcomingEvents.jsx)
// Structure prepared for future Supabase hook-in
// ==========================================
function UpcomingEvents() {
  // Mock data ready to be swapped with:
  // const { data, error } = await supabase.from("events").select("*").order("event_date");
  const mockEvents = [
    {
      id: 1,
      name: "CodeStorm Hackathon",
      category: "Hackathon",
      date: "October 5, 2026",
      description: "A 24-hour college hackathon where students build innovative projects."
    },
    {
      id: 2,
      name: "College Dance Competition",
      category: "Cultural",
      date: "October 12, 2026",
      description: "Build your perfect dance team and compete with other students."
    },
    {
      id: 3,
      name: "Game Jam 2026",
      category: "Gaming",
      date: "October 20, 2026",
      description: "Build an original game with a team within a limited time."
    },
    {
      id: 4,
      name: "Cricket Tournament",
      category: "Sports",
      date: "November 2, 2026",
      description: "Find teammates and participate in the college cricket tournament."
    }
  ];

  const [events, setEvents] = useState(mockEvents);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-green-700 font-semibold text-xs tracking-wider uppercase bg-green-50 px-3 py-1 rounded-full border border-green-200">
              Featured Opportunities
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Upcoming Events
            </h2>
            <p className="mt-2 text-slate-600 text-base max-w-xl">
              Discover popular campus challenges and find open teammate positions waiting to be filled.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <span className="text-xs text-slate-400 font-mono">
              Prepared for Supabase integration
            </span>
          </div>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Bottom Button linking to /events */}
        <div className="mt-14 text-center">
          <Link
            to="/events"
            className="inline-flex items-center justify-center px-7 py-3 rounded-xl text-sm font-semibold text-slate-800 bg-white border border-slate-300 hover:border-green-500 hover:text-green-700 hover:bg-green-50/50 shadow-xs transition duration-200"
          >
            <span>View All Events</span>
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 7. MATCHING SECTION (components/MatchingSection.jsx)
// ==========================================
function MatchingSection() {
  const skills = [
    "Coding",
    "UI/UX",
    "Photography",
    "Singing",
    "Dancing",
    "Game Development"
  ];

  const flowSteps = [
    { title: "Your Team Needs", desc: "Define missing roles" },
    { title: "Select Skills", desc: "Pick from campus tags" },
    { title: "CampusCollab Finds Matches", desc: "Automated candidate filtering" },
    { title: "Review Profiles", desc: "Evaluate portfolios & past events" },
    { title: "Build Your Team", desc: "Confirm squad & start building" }
  ];

  const [selectedSkills, setSelectedSkills] = useState(["Coding", "UI/UX"]);

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-green-50/40 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-green-700 font-semibold text-xs tracking-wider uppercase bg-green-100 px-3 py-1 rounded-full border border-green-200">
            Precision Discovery
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Find People With the Skills You Need
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Select the skills your team needs and discover students who can contribute.
          </p>
        </div>

        {/* Interactive Skill Chips Demonstration */}
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
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
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${isSelected
                    ? "bg-green-600 text-white shadow-sm ring-2 ring-green-600/30 scale-105"
                    : "bg-white text-slate-700 border border-slate-300 hover:border-green-300 hover:bg-green-50"
                    }`}
                >
                  {isSelected ? "✓ " : "+ "}
                  {skill}
                </button>
              );
            })}
          </div>
        </div>

        {/* Visual Workflow Pipeline (Responsive Horizontal / Vertical flow) */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm">
            <div className="text-center mb-8">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                The Matching Pipeline
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
              {flowSteps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center relative group">
                  {/* Step Number Badge */}
                  <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 font-bold flex items-center justify-center text-sm mb-3 border border-green-200 group-hover:bg-green-600 group-hover:text-white transition-colors">
                    {idx + 1}
                  </div>

                  <h5 className="font-bold text-slate-900 text-sm mb-1">
                    {step.title}
                  </h5>
                  <p className="text-xs text-slate-500">
                    {step.desc}
                  </p>

                  {/* Arrow divider for larger screens (except last item) */}
                  {idx < flowSteps.length - 1 && (
                    <div className="hidden md:block absolute -right-3 top-5 text-slate-300 font-bold">
                      <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}

                  {/* Down arrow for mobile */}
                  {idx < flowSteps.length - 1 && (
                    <div className="md:hidden my-2 text-green-500">
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
// 8. FINAL CTA (components/FinalCTA.jsx)
// ==========================================
function FinalCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-green-900 via-green-800 to-emerald-950 text-white relative overflow-hidden">
      {/* Subtle decorative background blur */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-green-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-white">
          Your next team is waiting.
        </h2>
        <p className="text-lg sm:text-xl text-green-100/90 max-w-2xl mx-auto font-normal mb-8 leading-relaxed">
          Find an event. Find your people. Build something together.
        </p>

        <Link
          to="/events"
          className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-bold text-green-900 bg-white hover:bg-green-50 shadow-xl shadow-green-950/30 hover:scale-[1.02] active:scale-[0.98] transition duration-200"
        >
          <span>Explore Events</span>
          <svg className="w-5 h-5 ml-2 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

// ==========================================
// 9. FOOTER (components/Footer.jsx)
// ==========================================
function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Brand & Tagline */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-green-600 text-white flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-slate-900">
                Campus<span className="text-green-600">Collab</span>
              </span>
            </div>
            <p className="mt-1.5 text-xs text-slate-500">
              Find people. Build teams. Make something together.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link to="/" className="hover:text-green-600 transition">Home</Link>
            <Link to="/events" className="hover:text-green-600 transition">Events</Link>
            <Link to="/profile" className="hover:text-green-600 transition">Profile</Link>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <p>© {new Date().getFullYear()} CampusCollab. Built for college creators & competitors.</p>
          <p>Tailwind CSS + React.js + Supabase Ready</p>
        </div>
      </div>
    </footer>
  );
}

// ==========================================
// 10. MAIN HOME PAGE (Home.jsx)
// Assembles all modular components
// ==========================================
function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <HowItWorks />
        <UpcomingEvents />
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
