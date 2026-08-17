# Contact form database + alerts — setup guide

This wires the "Send Message" form on the Contact page to a real database
(Supabase/Postgres) and sends the team an instant alert on every new
submission. Everything below is on free tiers — no paid plan needed.

Why WhatsApp isn't in here: true WhatsApp Business API alerts are not free —
Meta and Twilio both charge per message for business-initiated alerts like
this (there's no free monthly allowance for that use case). Telegram's Bot
API is 100% free and just as instant, so it's used here instead. If you'd
rather pay for real WhatsApp alerts later, the Edge Function has a
commented-out spot ready for Twilio — ask and it can be added.

Total setup time: roughly 20–30 minutes, done once.

## 1. Create the database (Supabase)

1. Go to https://supabase.com and sign up (free — no credit card required).
2. Create a new project (pick any name, e.g. "ofr-telecom-website"). Save the
   database password it gives you somewhere safe.
3. Once the project is ready, go to the **SQL Editor** (left sidebar), paste
   in the entire contents of `supabase/schema.sql` from this project, and
   click **Run**. This creates the `contact_submissions` table and locks it
   down so the public website can only add rows, never read or change them.
4. Go to **Project Settings -> API**. Copy two values:
   - **Project URL** (looks like `https://xxxxxxxxxxxx.supabase.co`)
   - **anon public** key (a long string starting with `eyJ...`)
5. Open `src/components/Contact.tsx` in this project and paste those two
   values into `SUPABASE_URL` and `SUPABASE_ANON_KEY` near the top of the
   file. Rebuild/redeploy the site — the form now writes to your database.

You can view submitted leads anytime at Supabase -> **Table Editor** ->
`contact_submissions`, or export them as CSV from there.

Note: a free Supabase project pauses itself after 7 days with zero API
activity (it un-pauses automatically the next time the form is used, just
with a several-second delay on that first request). If enquiries are rare,
you can ignore this — worst case, the very first submission after a quiet
week is a bit slow, and the page still has the mailto: fallback if anything
ever fails.

## 2. Set up the instant alert (email + Telegram)

The alert logic lives in `supabase/functions/notify-on-submission/index.ts`.
It runs automatically in Supabase's cloud whenever a new row is inserted —
you don't host or run anything yourself.

### 2a. Email alerts (Resend, free — 3,000 emails/month)

1. Sign up at https://resend.com (free).
2. Verify a sending domain (Resend walks you through adding a couple of DNS
   records at your domain registrar) — or for a quick start, use the
   `onboarding@resend.dev` test sender Resend provides while you set the
   real domain up.
3. Create an API key in the Resend dashboard.

### 2b. Instant Telegram alert (free, unlimited)

1. In Telegram, message **@BotFather**, send `/newbot`, and follow the
   prompts to create a bot. It gives you a **bot token**.
2. Add that bot to whichever Telegram chat/group your sales team already
   uses (or a new one just for this).
3. Send any message in that chat, then visit
   `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates` in a browser to
   find the **chat_id** for that conversation.

### 2c. Deploy the Edge Function and connect the secrets

Requires the Supabase CLI (`npm install -g supabase`), or your developer can
run these from this project folder:

```
supabase login
supabase link --project-ref <your-project-ref>   # found in the Supabase URL
supabase functions deploy notify-on-submission

supabase secrets set RESEND_API_KEY=<your Resend API key>
supabase secrets set ALERT_EMAIL_TO=sales@ofrtelecom.com
supabase secrets set ALERT_EMAIL_FROM=<your verified Resend sender>
supabase secrets set TELEGRAM_BOT_TOKEN=<your bot token>
supabase secrets set TELEGRAM_CHAT_ID=<your chat id>
```

### 2d. Trigger the function on every new submission

In the Supabase dashboard: **Database -> Webhooks -> Create a new webhook**.
- Table: `contact_submissions`
- Events: `Insert`
- Type: `Supabase Edge Functions`
- Function: `notify-on-submission`

That's it — from now on, every "Send Message" submission is saved to the
database and the team gets an email + Telegram ping within seconds.

## Testing

Submit the contact form on the live site once everything above is done, then
check: the row appears in Supabase Table Editor, an email lands at
sales@ofrtelecom.com, and a Telegram message shows up in your chat.
