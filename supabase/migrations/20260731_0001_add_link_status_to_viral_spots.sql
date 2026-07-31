-- Dead-link checker: flag (never delete) spots whose source video has gone.
alter table public.viral_spots
  add column if not exists link_status text not null default 'unchecked',
  add column if not exists link_checked_at timestamptz,
  add column if not exists link_fail_count int not null default 0,
  add column if not exists link_last_reason text;

alter table public.viral_spots
  drop constraint if exists viral_spots_link_status_check;
alter table public.viral_spots
  add constraint viral_spots_link_status_check
  check (link_status in ('live', 'dead', 'unchecked'));

-- The daily run pulls active spots oldest-checked-first.
create index if not exists viral_spots_link_check_queue_idx
  on public.viral_spots (link_checked_at nulls first)
  where is_active;

create index if not exists viral_spots_link_status_idx
  on public.viral_spots (link_status);

-- Per-run audit trail so drift is visible.
create table if not exists public.link_check_runs (
  id uuid primary key default gen_random_uuid(),
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  trigger_source text not null default 'manual',
  platform_filter text,
  checked int not null default 0,
  live int not null default 0,
  failed int not null default 0,
  newly_dead int not null default 0,
  unchecked int not null default 0,
  errors jsonb not null default '[]'::jsonb
);

alter table public.link_check_runs enable row level security;
-- No policies: readable/writable only by the service role (which bypasses RLS).

comment on column public.viral_spots.link_status is
  'live | dead | unchecked. Set by the check-dead-links edge function. dead only after two consecutive confident failures.';
comment on column public.viral_spots.link_fail_count is
  'Consecutive confident-failure count. Reset to 0 on any successful check.';
comment on column public.viral_spots.link_last_reason is
  'Machine-readable reason from the last check, for owner review.';
