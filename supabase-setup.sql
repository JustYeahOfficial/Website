-- Run this once in Supabase Dashboard → SQL Editor.
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text not null default '',
  description text,
  status text not null default 'idea' check (status in ('idea','building','testing','shipped')),
  progress integer not null default 0 check (progress between 0 and 100),
  demo_url text,
  repo_url text,
  image_url text,
  tags text[] not null default '{}',
  position integer not null default 0,
  created_at timestamptz not null default now()
);
create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade,
  project_slug text not null,
  name text not null default 'Anonymous',
  message text not null check (char_length(message) <= 1200),
  created_at timestamptz not null default now()
);
create table if not exists public.join_requests (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade,
  project_title text not null,
  name text not null,
  contact text not null,
  message text not null default '',
  created_at timestamptz not null default now()
);
alter table public.projects enable row level security;
alter table public.feedback enable row level security;
alter table public.join_requests enable row level security;
drop policy if exists "Projects are publicly readable" on public.projects;
create policy "Projects are publicly readable" on public.projects for select to anon, authenticated using (true);
drop policy if exists "Feedback is publicly readable" on public.feedback;
create policy "Feedback is publicly readable" on public.feedback for select to anon, authenticated using (true);
drop policy if exists "Visitors can submit feedback" on public.feedback;
create policy "Visitors can submit feedback" on public.feedback for insert to anon, authenticated with check (char_length(message) between 1 and 1200);
drop policy if exists "Visitors can submit join requests" on public.join_requests;
create policy "Visitors can submit join requests" on public.join_requests for insert to anon, authenticated with check (char_length(name) between 1 and 60 and char_length(contact) between 1 and 120);
