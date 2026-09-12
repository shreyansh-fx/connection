# Handoff - Pull_n_byte

> Updated 2026-09-13T01:56:37+05:30 by jaiswalshreyansh368 (session 0913-0151, track 2)
> Read this first. The full log is cyhi-logs/session.md.

## Current state
Campus Collab event browsing, request creation, request viewing, and applications are implemented against the existing Supabase client and existing tables.

## Works
The production compilation completes. Events use `events.date`; requests and applications use the documented existing relationships.

## Broken
A live two-user Supabase test has not run here, so RLS policies still need validation in the deployed environment.

## Next 3 things
1. Test with two Google accounts against Supabase.
2. Confirm RLS allows public profile joins and authenticated inserts.
3. Add request-creator application review and acceptance in a later flow.

## Decisions (and why)
Kept the current Supabase AuthProvider and clients; no schema, credentials, or duplicate auth system was created. Private contact data is not queried or shown.

## Don't retry
Do not use the former `events.event_date` or `event_type` fields; the documented schema uses `events.date` and `category`.
