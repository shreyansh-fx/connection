import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ success: true });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  console.log("[AUTH] Server-side signOut executing...");
  await supabase.auth.signOut();
  console.log("[AUTH] Server-side signOut completed.");

  // Force expire all Supabase sb- cookies
  request.cookies.getAll().forEach((c) => {
    if (c.name.startsWith("sb-")) {
      response.cookies.set(c.name, "", { maxAge: 0, path: "/" });
    }
  });

  return response;
}
