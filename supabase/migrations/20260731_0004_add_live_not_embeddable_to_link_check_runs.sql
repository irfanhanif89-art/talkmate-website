-- Posts that are still public but whose embed no longer renders. Not dead, but
-- the card will not play inline, so the owner should see the count drift.
alter table public.link_check_runs
  add column if not exists live_not_embeddable int not null default 0;
