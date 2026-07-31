-- pg_net lets Postgres call the edge function; pg_cron schedules the daily run.
create extension if not exists pg_net with schema extensions;
create extension if not exists pg_cron;
