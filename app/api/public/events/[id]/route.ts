import { NextResponse } from "next/server";
import { createPublicClient } from "@/lib/supabase/public";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = createPublicClient();

  const [eventResult, requestsResult] = await Promise.all([
    supabase.from("events").select("*").eq("id", id).single(),
    supabase
      .from("requests")
      .select(
        `*,
        profile:creator_id (
          id,
          full_name,
          email,
          gender,
          branch,
          year,
          bio,
          skills,
          interests,
          experience,
          achievements,
          github,
          linkedin,
          avatar_url
        )`,
      )
      .eq("event_id", id)
      .order("created_at", { ascending: false }),
  ]);

  if (eventResult.error) {
    console.error(
      "[API /public/events/[id]] Event fetch error:",
      eventResult.error,
    );
    const status = eventResult.error.code === "PGRST116" ? 404 : 500;
    return NextResponse.json(
      { error: eventResult.error.message ?? "Event not found" },
      { status },
    );
  }

  if (requestsResult.error) {
    console.error(
      "[API /public/events/[id]] Requests fetch error:",
      requestsResult.error,
    );
    // Return the event even if requests fail — don't block the whole page
    return NextResponse.json({
      event: eventResult.data,
      requests: [],
      requestsError: requestsResult.error.message,
    });
  }

  return NextResponse.json({
    event: eventResult.data,
    requests: requestsResult.data ?? [],
  });
}
