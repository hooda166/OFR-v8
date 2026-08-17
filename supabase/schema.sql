-- OFR Telecom website — contact form storage
-- Run this once in Supabase: Dashboard -> SQL Editor -> New query -> paste -> Run

create extension if not exists "pgcrypto";

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  company text,
  message text not null,
  source text not null default 'website-contact-form'
);

-- Row Level Security: the website talks to Supabase directly using the public
-- "anon" key, which is visible in the site's JS bundle. RLS is what keeps this
-- safe — it must ONLY allow inserts, never reads/updates/deletes, from that key.
alter table public.contact_submissions enable row level security;

drop policy if exists "Public can insert contact submissions" on public.contact_submissions;
create policy "Public can insert contact submissions"
  on public.contact_submissions
  for insert
  to anon
  with check (true);

-- No select/update/delete policy is created for the anon role, so visitors
-- cannot read, edit, or erase submissions — including their own or anyone
-- else's. To view leads, use the Supabase Table Editor (Dashboard -> Table
-- Editor -> contact_submissions) while logged in as the project owner, or
-- query it from the SQL Editor.

-- Optional: trigger a Database Webhook (Dashboard -> Database -> Webhooks)
-- on INSERT into this table, pointed at the notify-on-submission Edge
-- Function, to fire the email/Telegram alert automatically.
