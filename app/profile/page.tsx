"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Profile() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    branch: "",
    year: "",
    skills: "",
    interests: "",
    achievements: "",
    about: "",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setSaved(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Profile saved:", formData);

    router.push("/profile/view");
  };

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Navbar */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <h1 className="text-2xl font-bold text-indigo-600">
            CampusCollabi
          </h1>

          <nav className="flex gap-8 text-sm font-medium">
            <a href="/" className="text-slate-600 hover:text-indigo-600">
              Home
            </a>

            <a href="/events" className="text-slate-600 hover:text-indigo-600">
              Events
            </a>

            <a href="/teams" className="text-slate-600 hover:text-indigo-600">
              My Teams
            </a>

            <a
              href="/profile"
              className="font-semibold text-indigo-600"
            >
              Profile
            </a>
          </nav>

        </div>
      </header>


      {/* Page */}
      <div className="mx-auto max-w-4xl px-6 py-12">

        {/* Heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-indigo-600">
            Your Profile
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-slate-900">
            Tell us about yourself
          </h2>

          <p className="mt-3 text-slate-500">
            Your profile helps CampusCollabi find teammates whose skills
            complement yours.
          </p>
        </div>


        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
        >

          {/* Personal Information */}
          <section>
            <h3 className="text-xl font-semibold text-slate-900">
              Personal Information
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Basic information about you.
            </p>


            <div className="mt-6 grid gap-6 md:grid-cols-2">

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>


              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@iiitdmj.ac.in"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>


              {/* Branch */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Branch
                </label>

                <input
                  type="text"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  placeholder="e.g. CSE"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>


              {/* Year */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Year
                </label>

                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="">Select year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>

            </div>
          </section>


          {/* Divider */}
          <div className="my-10 border-t border-slate-200" />


          {/* Skills */}
          <section>

            <h3 className="text-xl font-semibold text-slate-900">
              Skills
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              What can you contribute to a team?
            </p>

            <div className="mt-5">
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g. Python, React, UI/UX, C++, Public Speaking"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

              <p className="mt-2 text-xs text-slate-400">
                Separate multiple skills with commas.
              </p>
            </div>

          </section>


          {/* Interests */}
          <section className="mt-10">

            <h3 className="text-xl font-semibold text-slate-900">
              Interests
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              What activities or areas are you interested in?
            </p>

            <div className="mt-5">

              <input
                type="text"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                placeholder="e.g. Hackathons, AI/ML, Cultural Events, Sports"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

            </div>

          </section>


          {/* Achievements */}
          <section className="mt-10">

            <h3 className="text-xl font-semibold text-slate-900">
              Achievements
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Tell us about competitions, projects, certifications, etc.
            </p>

            <textarea
              name="achievements"
              value={formData.achievements}
              onChange={handleChange}
              rows={4}
              placeholder="e.g. Hackathon finalist, built an ML project, won a coding competition..."
              className="mt-5 w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

          </section>


          {/* About */}
          <section className="mt-10">

            <h3 className="text-xl font-semibold text-slate-900">
              About You
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              What kind of teammates or opportunities are you looking for?
            </p>

            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us what you enjoy working on and what you're looking for in a team..."
              className="mt-5 w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

          </section>


          {/* Save */}
          <div className="mt-10 flex items-center justify-between border-t border-slate-200 pt-6">

            {saved && (
              <p className="text-sm font-medium text-green-600">
                ✓ Profile saved successfully!
              </p>
            )}

            {!saved && <div />}

            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              Save Profile
            </button>

          </div>

        </form>

      </div>

    </main>
  );
}