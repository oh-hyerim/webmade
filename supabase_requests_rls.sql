-- Production schema and RLS for the public.requests table used by /project-request.
-- Paste this into the Supabase SQL Editor.
-- Frontend table name: VITE_PROJECT_REQUESTS_TABLE=requests

create table if not exists public.requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now()
);

alter table public.requests
  add column if not exists updated_at timestamptz,
  add column if not exists status text not null default '대기',
  add column if not exists client_name text,
  add column if not exists phone text,
  add column if not exists email text,
  add column if not exists kakao_id text,
  add column if not exists company_name text,
  add column if not exists business_type text,
  add column if not exists business_region text,
  add column if not exists business_period text,
  add column if not exists target_customers text,
  add column if not exists competitor_links text,
  add column if not exists main_purpose text[] not null default '{}',
  add column if not exists primary_cta text[] not null default '{}',
  add column if not exists required_pages text[] not null default '{}',
  add column if not exists required_features text[] not null default '{}',
  add column if not exists design_mood text[] not null default '{}',
  add column if not exists preferred_colors text,
  add column if not exists disliked_colors text,
  add column if not exists reference_sites text,
  add column if not exists disliked_sites text,
  add column if not exists provided_materials text[] not null default '{}',
  add column if not exists has_logo text,
  add column if not exists has_domain text,
  add column if not exists existing_website text,
  add column if not exists desired_launch_date text,
  add column if not exists urgency text,
  add column if not exists must_include_content text,
  add column if not exists frequently_asked_questions text,
  add column if not exists additional_requests text,
  add column if not exists admin_memo text;

alter table public.requests
  alter column status set default '대기';

update public.requests
set status = '대기'
where status is null
   or status not in ('대기', '검토중', '진행중', '완료', '보류');

alter table public.requests
  alter column status set not null;

alter table public.requests
  drop constraint if exists requests_status_check;

alter table public.requests
  add constraint requests_status_check
  check (status in ('대기', '검토중', '진행중', '완료', '보류'));

create or replace function public.set_requests_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists requests_set_updated_at on public.requests;

create trigger requests_set_updated_at
before update on public.requests
for each row
execute function public.set_requests_updated_at();

create table if not exists public.admin_users (
  email text primary key,
  created_at timestamptz not null default now()
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
  status = '대기'
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

create index if not exists requests_company_name_idx
on public.requests (company_name);
