-- Webmade project request form table
-- Paste this into the Supabase SQL Editor before using /project-request.

create table if not exists public.project_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz,
  status text not null default '대기' check (status in ('대기', '검토중', '진행중', '완료', '보류')),
  client_name text not null,
  phone text not null,
  email text,
  kakao_id text,
  company_name text not null,
  business_type text not null,
  business_region text,
  business_period text,
  target_customers text,
  competitor_links text,
  main_purpose text[] not null default '{}',
  primary_cta text[] not null default '{}',
  required_pages text[] not null default '{}',
  required_features text[] not null default '{}',
  design_mood text[] not null default '{}',
  preferred_colors text,
  disliked_colors text,
  reference_sites text,
  disliked_sites text,
  provided_materials text[] not null default '{}',
  has_logo text,
  has_domain text,
  existing_website text,
  desired_launch_date text,
  urgency text,
  must_include_content text,
  frequently_asked_questions text,
  additional_requests text,
  admin_memo text
);

create or replace function public.set_project_requests_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists project_requests_set_updated_at on public.project_requests;

create trigger project_requests_set_updated_at
before update on public.project_requests
for each row
execute function public.set_project_requests_updated_at();

alter table public.project_requests enable row level security;

create table if not exists public.admin_users (
  email text primary key,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

-- Add your admin email before using the admin pages.
-- insert into public.admin_users (email) values ('admin@example.com')
-- on conflict (email) do nothing;

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
    where lower(email) = lower(auth.jwt() ->> 'email')
  );
$$;

drop policy if exists "Anyone can submit project requests" on public.project_requests;
drop policy if exists "Authenticated admins can read project requests" on public.project_requests;
drop policy if exists "Authenticated admins can update project requests" on public.project_requests;
drop policy if exists "Authenticated admins can delete project requests" on public.project_requests;
drop policy if exists "Admins can read admin users" on public.admin_users;

create policy "Anyone can submit project requests"
on public.project_requests
for insert
to anon, authenticated
with check (
  status = '대기'
  and admin_memo is null
);

create policy "Authenticated admins can read project requests"
on public.project_requests
for select
to authenticated
using (public.is_admin());

create policy "Authenticated admins can update project requests"
on public.project_requests
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Authenticated admins can delete project requests"
on public.project_requests
for delete
to authenticated
using (public.is_admin());

create policy "Admins can read admin users"
on public.admin_users
for select
to authenticated
using (public.is_admin());

create index if not exists project_requests_created_at_idx
on public.project_requests (created_at desc);

create index if not exists project_requests_status_idx
on public.project_requests (status);
