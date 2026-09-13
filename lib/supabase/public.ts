import { createServerClient } from "@supabase/ssr";

/**
 * A Supabase client that makes requests as the anon role only — no auth
 * cookies are read or written. Use this exclusively for public data in
 * Next.js Route Handlers (API routes) where the data must be accessible
 * regardless of whether the visitor is logged in.
 */
export function createPublicClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        // Intentionally provide no-op cookie handlers so this client never
        // attaches any session token to requests. The anon key alone is used.
        getAll: () => [],
        setAll: () => {},
      },
    }
  );
}
