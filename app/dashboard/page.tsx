import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-indigo-600">
            Welcome to Campus Collab
          </h1>
          <p className="text-slate-600">
            Logged in as <span className="font-semibold text-slate-900">{user.email}</span>
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <a
              href="/profile"
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition"
            >
              View Profile
            </a>
            <a
              href="/profile/view"
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Edit Profile
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
