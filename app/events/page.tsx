"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import { createClient } from "@/lib/supabase/client";

type CampusEvent = { id: string; name: string; description: string | null; category: string | null; date: string; location: string | null; image_url: string | null };
const categories = ["All", "Cultural", "Technology", "Sports", "Academic", "Music", "Other"];
const formatDate = (date: string) => new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function EventsPage() {
  const supabase = useMemo(() => createClient(), []);
  const [events, setEvents] = useState<CampusEvent[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEvents() {
      const { data, error } = await supabase.from("events").select("*").order("date", { ascending: true });
      if (error) setError("Could not load events. Please try again.");
      else setEvents((data ?? []) as CampusEvent[]);
      setLoading(false);
    }
    loadEvents();
  }, [supabase]);

  const visibleEvents = events.filter((event) => {
    const text = [event.name, event.category, event.location, event.description].filter(Boolean).join(" ").toLowerCase();
    return (category === "All" || event.category?.toLowerCase() === category.toLowerCase()) && text.includes(query.toLowerCase());
  });

  return <main className="min-h-screen bg-slate-50"><Navbar />
    <section className="border-b border-slate-200 bg-white"><div className="mx-auto max-w-7xl px-6 py-12">
      <p className="text-sm font-semibold text-indigo-600">CAMPUS COLLAB</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">Find Your Event</h1>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-4"><p className="max-w-2xl text-slate-600">Discover college events and find people to collaborate with.</p><a href="/create" className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700">+ Create Event</a></div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search events, categories, or locations" className="mt-7 w-full max-w-xl rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
      <div className="mt-4 flex flex-wrap gap-2">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`rounded-full px-4 py-2 text-sm font-medium ${category === item ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-indigo-50"}`}>{item}</button>)}</div>
    </div></section>
    <section className="mx-auto max-w-7xl px-6 py-10">
      {loading ? <p className="py-16 text-center text-slate-500">Loading events…</p> : error ? <p className="py-16 text-center text-red-600">{error}</p> : visibleEvents.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center text-slate-500"><p>No events match your search yet.</p><a href="/create" className="mt-4 inline-block rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700">Create the first event</a></div> : <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{visibleEvents.map((event) => <a href={`/events/${event.id}`} key={event.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        {event.image_url ? <img src={event.image_url} alt="" className="h-40 w-full object-cover" /> : <div className="h-3 bg-indigo-600" />}
        <div className="p-5"><div className="flex items-center justify-between gap-3"><span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">{event.category || "Other"}</span><span className="text-xs font-medium text-slate-500">{formatDate(event.date)}</span></div>
          <h2 className="mt-4 text-xl font-bold text-slate-900">{event.name}</h2><p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{event.description || "Find collaborators for this campus event."}</p>
          <p className="mt-4 text-sm font-medium text-slate-700">{event.location || "Location to be announced"} <span className="float-right text-indigo-600">Explore →</span></p></div>
      </a>)}</div>}
    </section>
  </main>;
}
