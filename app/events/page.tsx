"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

/*
  CampusCollab Events Page
  React + Tailwind CSS only.
  No router or icon library required.
*/

const Link = ({ to, children, className = "", ...props }) => (
  <a href={to} className={className} {...props}>
    {children}
  </a>
);

// ======================================================
// NAVBAR
// Same style as the CampusCollab home page
// ======================================================
function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-green-600 text-white flex items-center justify-center shadow-sm">
                <svg
                  className="w-5 h-5"
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

              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Campus<span className="text-green-600">Collab</span>
              </span>
            </Link>

            <nav className="hidden sm:flex items-center">
              <Link
                to="/"
                className="text-sm font-semibold text-slate-700 hover:text-green-600 px-3.5 py-1.5 rounded-lg transition-colors"
              >
                Home
              </Link>

              <Link
                to="/events"
                className="text-sm font-semibold text-green-700 bg-green-50 px-3.5 py-1.5 rounded-lg"
              >
                Events
              </Link>
            </nav>
          </div>

          <Link
            to="/profile"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-green-600 px-3.5 py-2 rounded-lg border border-slate-200 hover:border-green-300 hover:bg-green-50/50 transition"
          >
            <svg
              className="w-4 h-4 text-slate-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Profile
          </Link>
        </div>
      </div>
    </header>
  );
}

// ======================================================
// DATABASE EVENT HELPERS
// ======================================================

function formatEventDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatEventTime(date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function getCategoryClass(category = "") {
  switch (category.toLowerCase()) {
    case "hackathon":
    case "technology":
      return "bg-purple-100 text-purple-700";
    case "cultural":
      return "bg-red-100 text-red-700";
    case "academic":
      return "bg-cyan-100 text-cyan-800";
    case "gaming":
      return "bg-blue-100 text-blue-700";
    case "sports":
      return "bg-emerald-100 text-emerald-800";
    default:
      return "bg-green-100 text-green-700";
  }
}

function mapEvent(event) {
  return {
    ...event,
    categoryClass: getCategoryClass(event.category),
    formattedDate: formatEventDate(event.event_date),
    formattedTime: formatEventTime(event.event_date),
  };
}

// ======================================================
// SMALL ICONS
// ======================================================
function CalendarIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 3v3m8-3v3M4 9h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M12 7v5l3 2" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s7-6.1 7-12a7 7 0 10-14 0c0 5.9 7 12 7 12z"
      />
      <circle cx="12" cy="9" r="2.2" />
    </svg>
  );
}

// ======================================================
// OFFICIAL EVENT CARD
// ======================================================
function OfficialEventCard({ event }) {
  return (
    <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
      <div className="p-5">
        <div className="flex items-center justify-between gap-3 mb-5">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${event.categoryClass}`}
          >
            {event.category}
          </span>

          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
            {event.badge || "Campus Event"}
          </span>
        </div>

        <p className="text-[11px] tracking-wide font-bold text-slate-500 mb-2">
          {event.organization || "CAMPUS EVENT"}
        </p>

        <h3 className="text-lg font-semibold text-slate-900 leading-snug min-h-[56px]">
          {event.name}
        </h3>

        <div className="mt-5 space-y-2.5 text-sm text-slate-600">
          <div className="flex items-center gap-2.5">
            <span className="text-green-700">
              <CalendarIcon />
            </span>
            <span>{event.formattedDate}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-green-700">
              <ClockIcon />
            </span>
            <span>{event.formattedTime}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-green-700">
              <LocationIcon />
            </span>
            <span>{event.location}</span>
          </div>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-slate-600">
          {event.description || "Join fellow students and take part in this campus event."}
        </p>
      </div>

      <div className="border-t border-slate-100 px-5 py-3.5 flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full bg-slate-50 text-slate-700 text-[11px] font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          to={`/events/${event.id}`}
          className="ml-3 shrink-0 text-sm font-semibold text-green-700 hover:text-green-900"
        >
          Details →
        </Link>
      </div>
    </article>
  );
}

// ======================================================
// PERSONAL EVENT CARD
// ======================================================
function PersonalEventCard({ event }) {
  return (
    <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
      <div className="p-5">
        <div className="flex items-center justify-between gap-4 mb-5">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${event.categoryClass}`}
          >
            {event.category}
          </span>

          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
            ♙ {event.host}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-slate-900 leading-snug">
          {event.title}
        </h3>

        <div className="mt-4 space-y-2.5 text-sm text-slate-600">
          <div className="flex items-center gap-2.5">
            <span className="text-green-700">
              <CalendarIcon />
            </span>
            {event.date}
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-green-700">
              <ClockIcon />
            </span>
            {event.time}
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-green-700">
              <LocationIcon />
            </span>
            {event.location}
          </div>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-slate-600">
          {event.description || "Join fellow students and take part in this campus event."}
        </p>
      </div>

      <div className="border-t border-slate-100 px-5 py-3.5 flex items-center justify-between">
        <div className="flex -space-x-2">
          {event.initials.map((initial, index) => (
            <div
              key={`${initial}-${index}`}
              className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold ${
                index === 0
                  ? "bg-green-100 text-green-700"
                  : index === 1
                  ? "bg-cyan-100 text-cyan-700"
                  : index === 2
                  ? "bg-pink-100 text-pink-700"
                  : "bg-slate-200 text-slate-600"
              }`}
            >
              {initial}
            </div>
          ))}
        </div>

        <Link
          to={`/events/${event.id}`}
          className="text-sm font-semibold text-green-700 hover:text-green-900"
        >
          Manage & Details →
        </Link>
      </div>
    </article>
  );
}

// ======================================================
// EVENTS PAGE
// ======================================================
function EventsPage() {
  const [officialEvents, setOfficialEvents] = useState([]);
  const [personalEvents, setPersonalEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true });

      if (error) {
        console.error("Error loading events:", error);
        setError("Could not load events. Please try again.");
        setLoading(false);
        return;
      }

      const events = (data || []).map(mapEvent);

      // For now, events are separated using the category/type field.
      // If you want official + personal events stored differently,
      // we can add an event_type column in Supabase.
      const official = events.filter(
        (event) => event.event_type !== "personal"
      );
      const personal = events.filter(
        (event) => event.event_type === "personal"
      );

      setOfficialEvents(official);
      setPersonalEvents(personal);
      setLoading(false);
    }

    loadEvents();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main>
        {/* Page Header */}
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-9">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-bold uppercase tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-green-600" />
                  Upcoming Events
                </span>

                <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                  Campus &amp; Personal Events
                </h1>

                <p className="mt-2 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600">
                  Discover official campus happenings and organize collaborative
                  meetups, study sessions, and club activities.
                </p>
              </div>

              <Link
                to="/events"
                className="shrink-0 inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-700 hover:border-green-300 hover:text-green-700 transition"
              >
                Browse all events →
              </Link>
            </div>
          </div>
        </section>

        {/* Official College Events */}
        <section className="py-10 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    Official College Events
                  </h2>

                  <span className="px-2.5 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-semibold">
                    ✓ Verified Campus
                  </span>
                </div>

                <p className="mt-1 text-sm sm:text-base text-slate-600">
                  Curated and hosted by university faculties, student unions,
                  and campus partners.
                </p>
              </div>
            </div>

            {loading ? (
              <div className="py-16 text-center text-slate-500">
                Loading events...
              </div>
            ) : error ? (
              <div className="py-16 text-center text-red-600">
                {error}
              </div>
            ) : officialEvents.length === 0 ? (
              <div className="py-16 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
                No official events available yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {officialEvents.map((event) => (
                  <OfficialEventCard
                    key={event.id}
                    event={event}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Personal Events */}
        <section className="pb-16 sm:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    Personal Events
                  </h2>

                  <span className="px-2.5 py-1 rounded-full bg-cyan-100 text-cyan-700 text-xs font-bold">
                    {personalEvents.length} Active
                  </span>
                </div>

                <p className="mt-1 text-sm sm:text-base text-slate-600">
                  Events, study jams, and hangouts created by students.
                </p>
              </div>

              <Link
                to="/events/create"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 shadow-sm transition"
              >
                <span className="mr-2 text-lg leading-none">+</span>
                Create Personal Event
              </Link>
            </div>

            {loading ? null : personalEvents.length === 0 ? (
              <div className="py-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
                No personal events yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {personalEvents.map((event) => (
                  <PersonalEventCard
                    key={event.id}
                    event={{
                      ...event,
                      date: event.formattedDate,
                      time: event.formattedTime,
                      title: event.name,
                      host: event.host || "Student Event",
                      initials: event.initials || ["CC"],
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-600">
              © 2026 CampusCollab. Built for college creators &amp; competitors.
            </p>

            <nav className="flex items-center gap-5 text-sm text-slate-600">
              <Link to="/" className="hover:text-green-600">
                Home
              </Link>
              <Link to="/events" className="hover:text-green-600">
                Events
              </Link>
              <Link to="/profile" className="hover:text-green-600">
                Profile
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default EventsPage;