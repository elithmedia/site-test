create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  avatar_url text,
  instagram_url text,
  tiktok_url text,
  slug text unique not null,
  created_at timestamptz default now()
);

create index if not exists idx_clients_slug on clients(slug);
create index if not exists idx_clients_created on clients(created_at);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete cascade,
  title text not null,
  description text,
  tags text[] default '{}',
  created_at timestamptz default now()
);
create index if not exists idx_projects_created on projects(created_at);

create type media_type as enum ('image','video','embed');
create type media_platform as enum ('instagram','tiktok','other');

do $$ begin
  if not exists (select 1 from pg_type where typname = 'media_type') then
    create type media_type as enum ('image','video','embed');
  end if;
  if not exists (select 1 from pg_type where typname = 'media_platform') then
    create type media_platform as enum ('instagram','tiktok','other');
  end if;
end $$;

create table if not exists media_assets (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  type media_type not null,
  url text not null,
  platform media_platform default 'other',
  caption text,
  published_at timestamptz
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  company text,
  services_needed text[] not null,
  budget_range text,
  message text not null,
  consent_marketing boolean default false,
  source text,
  created_at timestamptz default now()
);
create index if not exists idx_leads_email on leads(email);
create index if not exists idx_leads_created on leads(created_at);

create table if not exists consents (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id) on delete set null,
  user_hash text,
  tcf_string text,
  ad_storage text,
  analytics_storage text,
  ad_user_data text,
  ad_personalization text,
  timestamp timestamptz default now()
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id text,
  action text,
  target_table text,
  target_id text,
  created_at timestamptz default now()
);

create table if not exists admins (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  role text default 'admin'
);
