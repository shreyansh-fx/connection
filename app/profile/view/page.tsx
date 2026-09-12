"use client";

export default function ProfileView() {
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

            {/* Profile */}
            <div className="mx-auto max-w-4xl px-6 py-12">

                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

                    {/* Header */}
                    <div className="border-b border-slate-200 pb-6">
                        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
                            Student Profile
                        </p>

                        <h2 className="mt-2 text-4xl font-bold text-slate-900">
                            Shrika
                        </h2>

                        <p className="mt-2 text-slate-500">
                            CSE • 2nd Year
                        </p>
                    </div>

                    {/* Skills */}
                    <section className="mt-8">
                        <h3 className="text-lg font-semibold text-slate-900">
                            Skills
                        </h3>

                        <div className="mt-4 flex flex-wrap gap-2">
                            <span className="rounded-full bg-indigo-50 px-4 py-2 text-sm text-indigo-700">
                                C++
                            </span>

                            <span className="rounded-full bg-indigo-50 px-4 py-2 text-sm text-indigo-700">
                                Python
                            </span>

                            <span className="rounded-full bg-indigo-50 px-4 py-2 text-sm text-indigo-700">
                                React
                            </span>
                        </div>
                    </section>

                    {/* Interests */}
                    <section className="mt-8">
                        <h3 className="text-lg font-semibold text-slate-900">
                            Interests
                        </h3>

                        <p className="mt-2 text-slate-600">
                            Hackathons, AI/ML, Web Development
                        </p>
                    </section>

                    {/* Achievements */}
                    <section className="mt-8">
                        <h3 className="text-lg font-semibold text-slate-900">
                            Achievements
                        </h3>

                        <p className="mt-2 text-slate-600">
                            Hackathon finalist, ML project developer
                        </p>
                    </section>

                    {/* About */}
                    <section className="mt-8">
                        <h3 className="text-lg font-semibold text-slate-900">
                            About
                        </h3>

                        <p className="mt-2 leading-7 text-slate-600">
                            Interested in building technology projects and looking for
                            teammates with complementary skills for hackathons and
                            competitions.
                        </p>
                    </section>

                    {/* Edit */}
                    <div className="mt-10 border-t border-slate-200 pt-6">
                        <a
                            href="/profile"
                            className="inline-block rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
                        >
                            Edit Profile
                        </a>
                    </div>

                </div>
            </div>
        </main>
    );
}