-- RLS policies for the existing public.requests table.
-- Paste this into the Supabase SQL Editor if your production table is named `requests`.
-- The frontend reads this table by default through VITE_PROJECT_REQUESTS_TABLE=requests.

create table if not exists public.admin_users (
  email text primary key,
  created_at timestamptz default now()
);

insert into public.admin_users (email)
values ('minette1576@naver.com')
on conflict (email) do nothing;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

alter table public.requests enable row level security;

drop policy if exists "Anyone can submit requests" on public.requests;
drop policy if exists "Authenticated admins can read requests" on public.requests;
drop policy if exists "Authenticated admins can update requests" on public.requests;
drop policy if exists "Authenticated admins can delete requests" on public.requests;

create policy "Anyone can submit requests"
on public.requests
for insert
to anon, authenticated
with check (
  coalesce(status, '대기') = '대기'
  and admin_memo is null
);

create policy "Authenticated admins can read requests"
on public.requests
for select
to authenticated
using (public.is_admin());

create policy "Authenticated admins can update requests"
on public.requests
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Authenticated admins can delete requests"
on public.requests
for delete
to authenticated
using (public.is_admin());

create index if not exists requests_created_at_idx
on public.requests (created_at desc);

create index if not exists requests_status_idx
on public.requests (status);
