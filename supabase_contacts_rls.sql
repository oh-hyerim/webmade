-- Webmade contacts table RLS policies
-- Paste this into the Supabase SQL Editor after `supabase_project_requests.sql`,
-- or after creating the same `public.admin_users` table and `public.is_admin()` function.

alter table public.contacts enable row level security;

drop policy if exists "Anyone can submit contacts" on public.contacts;
drop policy if exists "Authenticated admins can read contacts" on public.contacts;
drop policy if exists "Authenticated admins can update contacts" on public.contacts;
drop policy if exists "Authenticated admins can delete contacts" on public.contacts;

create policy "Anyone can submit contacts"
on public.contacts
for insert
to anon, authenticated
with check (
  status = 'unread'
  and admin_memo is null
);

create policy "Authenticated admins can read contacts"
on public.contacts
for select
to authenticated
using (public.is_admin());

create policy "Authenticated admins can update contacts"
on public.contacts
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Authenticated admins can delete contacts"
on public.contacts
for delete
to authenticated
using (public.is_admin());

create index if not exists contacts_created_at_idx
on public.contacts (created_at desc);

create index if not exists contacts_status_idx
on public.contacts (status);
