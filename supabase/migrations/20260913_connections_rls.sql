grant select on public.connections to authenticated;
grant insert on public.connections to authenticated;

alter table public.connections enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'connections'
      and cmd = 'SELECT'
      and qual is not null
      and qual::text like '%user1_id%'
      and qual::text like '%user2_id%'
      and qual::text like '%auth.uid()%'
  ) then
    create policy "Users can view their own connections"
      on public.connections
      for select
      to authenticated
      using (
        auth.uid() = user1_id
        or auth.uid() = user2_id
      );
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'connections'
      and cmd = 'INSERT'
      and policyname = 'Request creators can create connections'
  ) then
    create policy "Request creators can create connections"
      on public.connections
      for insert
      to authenticated
      with check (
        exists (
          select 1
          from public.requests r
          where r.id = request_id
            and r.creator_id = auth.uid()
            and (
              user1_id = r.creator_id
              or user2_id = r.creator_id
            )
        )
      );
  end if;
end
$$;
