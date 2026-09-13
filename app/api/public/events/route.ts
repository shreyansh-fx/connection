import { NextResponse } from "next/server";
import { createPublicClient } from "@/lib/supabase/public";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = createPublicClient();

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true });

  if (error) {
    console.error("[API /public/events] Supabase error:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    return NextResponse.json(
      { error: error.message ?? "Failed to fetch events" },
      { status: 500 }
    );
  }

  return NextResponse.json(data ?? []);
}
