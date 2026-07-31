-- Daily dead-link sweep. 17:00 UTC = 03:00 AEST, off-peak.
-- (Over summer, when Sydney shifts to AEDT, this lands at 04:00 local. Still
-- off-peak, so the schedule stays in UTC rather than chasing the offset.)
--
-- The whole active set is ~222 spots and a full pass measured 52s, comfortably
-- inside the function's own 110s self-imposed deadline, so one call covers it.
select cron.unschedule('daily-dead-link-check')
where exists (select 1 from cron.job where jobname = 'daily-dead-link-check');

select cron.schedule(
  'daily-dead-link-check',
  '0 17 * * *',
  $$
  select net.http_post(
    url := 'https://vxaotqpgbiqnhpsjcpxe.supabase.co/functions/v1/check-dead-links',
    body := jsonb_build_object('platform', 'all', 'trigger_source', 'pg_cron'),
    headers := jsonb_build_object(
      'content-type', 'application/json',
      'x-cron-secret', (select value from public.link_checker_config where key = 'cron_secret')),
    timeout_milliseconds := 180000
  );
  $$
);
