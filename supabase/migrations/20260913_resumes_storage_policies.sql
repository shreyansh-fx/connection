drop policy if exists "Users can upload their own resume"
on storage.objects;

drop policy if exists "Users can update their own resume"
on storage.objects;

drop policy if exists "Users can delete their own resume"
on storage.objects;

drop policy if exists "Users can read their own resume"
on storage.objects;

create policy "Users can upload their own resume"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'resume'
  and name like auth.uid()::text || '/%'
);

create policy "Users can read their own resume"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'resume'
  and name like auth.uid()::text || '/%'
);

create policy "Users can update their own resume"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'resume'
  and name like auth.uid()::text || '/%'
)
with check (
  bucket_id = 'resume'
  and name like auth.uid()::text || '/%'
);

create policy "Users can delete their own resume"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'resume'
  and name like auth.uid()::text || '/%'
);