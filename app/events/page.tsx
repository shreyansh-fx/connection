"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import { createClient } from "@/lib/supabase/client";

type CampusEvent = {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  date: string;
  location: string | null;
  image_url: string | null;
  event_type: string | null;
};

const categories = [
  "All",
  "Cultural",
  "Technology",
  "Sports",
  "Academic",
  "Music",
  "Other",
];

const PERSONAL_EVENT_ID =
  "fba6a17b-d749-4fad-8ec3-35a1003aafb8";

const formatDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function EventsPage() {
  const supabase = useMemo(() => createClient(), []);

  const [events, setEvents] = useState<CampusEvent[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (error) {
        setError("Could not load events. Please try again.");
      } else {
        setEvents((data ?? []) as CampusEvent[]);
      }

      setLoading(false);
    }

    loadEvents();
  }, [supabase]);

  const filteredEvents = events.filter((event) => {
    const text = [
      event.name,
      event.category,
      event.location,
      event.description,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesCategory =
      category === "All" ||
      event.category?.toLowerCase() === category.toLowerCase();

    const matchesSearch = text.includes(query.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // All events except Personal Requests are Major Events.
  const majorEvents = filteredEvents.filter(
    (event) => event.id !== PERSONAL_EVENT_ID
  );

  // Only the hardcoded Personal Requests event appears here.
  const personalEvents = filteredEvents.filter(
    (event) => event.id === PERSONAL_EVENT_ID
  );

  const renderEventCard = (event: CampusEvent) => (
    <a
      href={`/events/${event.id}`}
      key={event.id}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      {event.image_url ? (
        <img
          src={event.image_url}
          alt=""
          className="h-40 w-full object-cover"
        />
      ) : (
        <div className="h-3 bg-indigo-600" />
      )}

      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            {event.category || "Other"}
          </span>

          {event.id !== PERSONAL_EVENT_ID && (
            <span className="text-xs font-medium text-slate-500">
              {formatDate(event.date)}
            </span>
          )}
        </div>

        <h3 className="mt-4 text-xl font-bold text-slate-900">
          {event.name}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
          {event.description ||
            "Find collaborators for this campus event."}
        </p>

        <p className="mt-4 text-sm font-medium text-slate-700">
          {event.location || "Location to be announced"}

          <span className="float-right text-indigo-600">
            Explore →
          </span>
        </p>
      </div>
    </a>
  );

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <p className="text-sm font-semibold text-indigo-600">
            CAMPUS COLLAB
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
            Find Your Event
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Discover college events and find people to collaborate with.
          </p>

          {/* Search */}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events, categories, or locations"
            className="mt-7 w-full max-w-xl rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

          {/* Categories */}
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full px-4 py-2 text-sm font-medium ${category === item
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-indigo-50"
                  }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        {loading ? (
          <p className="py-16 text-center text-slate-500">
            Loading events…
          </p>
        ) : error ? (
          <p className="py-16 text-center text-red-600">
            {error}
          </p>
        ) : (
          <div className="space-y-16">

            {/* ================================= */}
            {/* MAJOR EVENTS */}
            {/* ================================= */}

            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  Major Events
                </h2>

                <p className="mt-1 text-sm text-slate-600">
                  Official campus events and major competitions.
                </p>
              </div>

              {majorEvents.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-12 text-center">
                  <p className="text-slate-500">
                    No major events match your search.
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {majorEvents.map(renderEventCard)}
                </div>
              )}
            </section>

            {/* ================================= */}
            {/* PERSONAL EVENTS */}
            {/* ================================= */}

            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  Misellaneous
                </h2>

                <p className="mt-1 text-sm text-slate-600">
                  Create or join teams for your own activities.
                </p>
              </div>

              {personalEvents.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-12 text-center">
                  <p className="text-slate-500">
                    Personal Requests is currently unavailable.
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {personalEvents.map(renderEventCard)}
                </div>
              )}
            </section>

          </div>
        )}
      </section>
    </main>
  );
}