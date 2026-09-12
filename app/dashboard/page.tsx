import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6 dark:bg-neutral-900 dark:text-white">
      <div className="w-full max-w-md space-y-4 rounded-xl bg-white p-8 shadow-lg dark:bg-neutral-800 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
          Dashboard
        </h1>
        <p className="text-sm text-gray-600 dark:text-neutral-300">
          Logged in as <span className="font-semibold text-gray-900 dark:text-white">{user.email}</span>
        </p>
        <div className="pt-4">
          <LogoutButton />
        </div>
      </div>
    </main>
  );
}
