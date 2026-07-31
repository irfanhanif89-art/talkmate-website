-- Shared secret pg_cron presents to the check-dead-links edge function.
-- RLS on with no policies: only the service role (which bypasses RLS) can read it.
create table if not exists public.link_checker_config (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

alter table public.link_checker_config enable row level security;

insert into public.link_checker_config (key, value)
values ('cron_secret', encode(extensions.gen_random_bytes(32), 'hex'))
on conflict (key) do nothing;
