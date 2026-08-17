// Supabase Edge Function: notify-on-submission
//
// Fires whenever a new row is inserted into public.contact_submissions.
// Sends an email via Resend (free tier) and, if configured, an instant
// Telegram alert (100% free, unlimited) — a WhatsApp-style ping without the
// per-message fees Meta/Twilio charge for business-initiated WhatsApp alerts.
//
// Wire-up: Dashboard -> Database -> Webhooks -> Create a new webhook on
// table "contact_submissions", event "Insert", type "Supabase Edge
// Functions", target this function.
//
// Required secrets (set once via: supabase secrets set KEY=value):
//   RESEND_API_KEY        - from resend.com (free tier: 3,000 emails/month)
//   ALERT_EMAIL_TO         - e.g. sales@ofrtelecom.com
//   ALERT_EMAIL_FROM       - a Resend-verified sender, e.g. alerts@ofrtelecom.com
// Optional (for the free Telegram alert):
//   TELEGRAM_BOT_TOKEN     - from @BotFather on Telegram
//   TELEGRAM_CHAT_ID       - the chat/group the bot should post to

import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';

interface ContactRow {
  name: string;
  email: string;
  company?: string | null;
  message: string;
  created_at?: string;
}

serve(async (req: Request) => {
  try {
    const payload = await req.json();
    // Supabase Database Webhooks send { type, table, record, old_record }
    const row: ContactRow = payload.record ?? payload.new ?? payload;
    const { name, email, company, message, created_at } = row;

    const results: Record<string, string> = {};

    // --- Email via Resend ---
    const resendKey = Deno.env.get('RESEND_API_KEY');
    const emailTo = Deno.env.get('ALERT_EMAIL_TO');
    const emailFrom = Deno.env.get('ALERT_EMAIL_FROM');
    if (resendKey && emailTo && emailFrom) {
      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: emailFrom,
          to: emailTo,
          subject: `New website enquiry from ${name}`,
          text:
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Company: ${company || '-'}\n` +
            `Submitted: ${created_at || new Date().toISOString()}\n\n` +
            `${message}`
        })
      });
      results.email = emailRes.ok ? 'sent' : `failed: ${await emailRes.text()}`;
    } else {
      results.email = 'skipped (secrets not set)';
    }

    // --- Instant free alert via Telegram (WhatsApp-style ping, no per-message fee) ---
    const tgToken = Deno.env.get('TELEGRAM_BOT_TOKEN');
    const tgChatId = Deno.env.get('TELEGRAM_CHAT_ID');
    if (tgToken && tgChatId) {
      const text =
        `New OFR Telecom website enquiry\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Company: ${company || '-'}\n\n` +
        `${message}`;
      const tgRes = await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: tgChatId, text })
      });
      results.telegram = tgRes.ok ? 'sent' : `failed: ${await tgRes.text()}`;
    } else {
      results.telegram = 'skipped (secrets not set)';
    }

    return new Response(JSON.stringify({ ok: true, results }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});
