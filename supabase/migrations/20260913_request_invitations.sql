create unique index if not exists notifications_request_invite_recipient_idx
on public.notifications (user_id, request_id)
where type = 'request_invite' and request_id is not null;

create or replace function public.send_request_invitations(
  p_request_id uuid,
  p_recipient_ids uuid[]
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  request_creator uuid;
  request_title text;
  creator_name text;
begin
  if auth.uid() is null then
    raise exception 'Authentication is required';
  end if;

  select r.creator_id, r.title, coalesce(p.full_name, 'A Campus Collab member')
    into request_creator, request_title, creator_name
  from public.requests r
  left join public.profiles p on p.id = r.creator_id
  where r.id = p_request_id;

  if request_creator is null then
    raise exception 'Request not found';
  end if;

  if request_creator <> auth.uid() then
    raise exception 'Only the request creator can send invitations';
  end if;

  if p_recipient_ids is null or cardinality(p_recipient_ids) = 0 then
    raise exception 'Select at least one profile';
  end if;

  if exists (select 1 from unnest(p_recipient_ids) recipient_id where recipient_id = auth.uid()) then
    raise exception 'You cannot invite yourself';
  end if;

  if exists (
    select 1
    from (select distinct unnest(p_recipient_ids) as id) recipients
    left join public.profiles p on p.id = recipients.id
    where p.id is null
  ) then
    raise exception 'One or more recipient profiles are invalid';
  end if;

  insert into public.notifications (
    user_id, type, title, message, related_id, request_id, is_read
  )
  select
    recipients.id,
    'request_invite',
    'Team Invitation',
    creator_name || ' invited you to view "' || request_title || '".',
    null,
    p_request_id,
    false
  from (select distinct unnest(p_recipient_ids) as id) recipients
  on conflict (user_id, request_id) where type = 'request_invite' and request_id is not null
  do nothing;
end;
$$;

revoke all on function public.send_request_invitations(uuid, uuid[]) from public;
grant execute on function public.send_request_invitations(uuid, uuid[]) to authenticated;