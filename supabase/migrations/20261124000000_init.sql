-- Portfolio database: schema + Row Level Security.
-- Run it in Supabase → SQL Editor (the whole file at once).
-- Safe to run again: it only creates what is missing and recreates policies.

-- ─── Tables ──────────────────────────────────────────────────────────────

-- Contributors, referenced by project_contributors.
create table if not exists public.people (
  id    text primary key,                -- "ariel"
  name  text not null,
  url   text
);

-- Project sections on the home page (perso, tek3…).
create table if not exists public.project_groups (
  id        text primary key,            -- "tek3"
  label     text not null,               -- "~/projets/tek3 · 2026-2027"
  position  int  not null default 0
);

create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,      -- URL: /slug
  title       text not null,
  note        text,                      -- appended to the header title
  team        text,
  duration    text,
  stack       text[] not null default '{}',
  period      text,
  group_id    text references public.project_groups(id) on delete set null,
  position    int  not null default 0,   -- order inside the group
  cover_url   text,                      -- file name or full URL
  summary     text,
  features    text[] not null default '{}',
  skills      text[] not null default '{}',
  gallery     text[] not null default '{}',
  video_url   text,
  docs        jsonb,                     -- [{ title, items: [text] }] (Cuddle's API reference)
  links       jsonb not null default '[]',  -- [{ label, url, text }]
  href        text,                      -- custom card link (e.g. "#top"), no project page
  published   boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.project_contributors (
  project_id  uuid references public.projects(id) on delete cascade,
  person_id   text references public.people(id) on delete cascade,
  position    int not null default 0,
  primary key (project_id, person_id)
);

create table if not exists public.experiences (
  id        uuid primary key default gen_random_uuid(),
  period    text not null,               -- "fév. 2026 - mars 2027"
  title     text not null,               -- "Epitech - Assistant Pédagogique"
  bullets   text[] not null default '{}',
  position  int not null default 0
);

create table if not exists public.formations (
  id        uuid primary key default gen_random_uuid(),
  period    text not null,
  title     text not null,
  bullets   text[] not null default '{}',
  position  int not null default 0
);

-- Unique content, one JSON row per key: header, about, facts, skills, cv, contact.
create table if not exists public.settings (
  key    text primary key,
  value  jsonb not null
);

-- Admin list. Filled by hand in the SQL Editor (Phase 5), never from the site.
create table if not exists public.admins (
  user_id  uuid primary key references auth.users(id) on delete cascade
);

-- Keep projects.updated_at current.
create or replace function public.set_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists projects_updated_at on public.projects;
create trigger projects_updated_at before update on public.projects
  for each row execute function public.set_updated_at();

-- ─── Security (Row Level Security) ───────────────────────────────────────
-- The publishable key is public, so these rules are what protect the data:
-- everyone can read published content, only admins can write.

create or replace function public.is_admin() returns boolean
language sql security definer stable set search_path = '' as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

alter table public.people               enable row level security;
alter table public.project_groups       enable row level security;
alter table public.projects             enable row level security;
alter table public.project_contributors enable row level security;
alter table public.experiences          enable row level security;
alter table public.formations           enable row level security;
alter table public.settings             enable row level security;
-- RLS on and no policy at all: nobody can read or change it through the API.
alter table public.admins               enable row level security;

-- Projects: drafts are visible to admins only.
drop policy if exists "public read" on public.projects;
create policy "public read" on public.projects
  for select using (published or public.is_admin());

-- Contributors of a project follow the project's visibility.
drop policy if exists "public read" on public.project_contributors;
create policy "public read" on public.project_contributors
  for select using (exists (
    select 1 from public.projects p
    where p.id = project_id and (p.published or public.is_admin())
  ));

-- Everything else is public to read.
do $$
declare t text;
begin
  foreach t in array array['people', 'project_groups', 'experiences', 'formations', 'settings'] loop
    execute format('drop policy if exists "public read" on public.%I', t);
    execute format('create policy "public read" on public.%I for select using (true)', t);
  end loop;
end $$;

-- Admins can do everything on every content table.
do $$
declare t text;
begin
  foreach t in array array['people', 'project_groups', 'projects', 'project_contributors',
                           'experiences', 'formations', 'settings'] loop
    execute format('drop policy if exists "admin write" on public.%I', t);
    execute format(
      'create policy "admin write" on public.%I for all to authenticated
         using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

-- Table privileges for the API roles (RLS above still decides which rows).
-- Newer Supabase projects don't grant them automatically on new tables.
grant usage on schema public to anon, authenticated, service_role;
-- service_role = the secret key (seed script, server code). It bypasses RLS.
grant all on all tables in schema public to service_role;
grant select on public.people, public.project_groups, public.projects, public.project_contributors,
                public.experiences, public.formations, public.settings to anon, authenticated;
grant insert, update, delete on public.people, public.project_groups, public.projects,
                public.project_contributors, public.experiences, public.formations,
                public.settings to authenticated;
revoke all on public.admins from anon, authenticated;
