# Elith Media — Next.js 14 + Supabase + Consent Mode v2

Production-ready landing page and admin skeleton for Elith Media.

## Quick start

```bash
pnpm i   # or npm install / yarn
cp .env.example .env.local
pnpm dev
```

Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` and email provider keys.

### Deploy on Vercel
- Push to GitHub, then import the repo in Vercel.
- Set env vars in Vercel Project Settings.
- Optionally add a custom domain elithmedia.com.

### Supabase
Run SQL in `supabase/SCHEMA.sql` and `supabase/SEEDS.sql` in the Supabase SQL editor.
Or run `pnpm seed` after setting the service role key. The script uses a helper RPC (`pg_execute`) you can create:
```sql
create or replace function pg_execute(sql text) returns void language plpgsql as $$ begin execute sql; end $$;
```

## Email providers

Works with Resend, SendGrid or SMTP. Add one of:
- `RESEND_API_KEY`
- `SENDGRID_API_KEY`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`

Sender: `EMAIL_FROM` (defaults to "Elith Media <contact@elithmedia.com>").

### SPF, DKIM, DMARC (for elithmedia.com)
Add DNS TXT records at your DNS host. Examples:

**SPF**
```
elithmedia.com.  TXT  "v=spf1 include:_spf.google.com include:sendgrid.net include:amazonses.com ~all"
```

**DKIM**
- For SendGrid: add CNAMEs as shown in SendGrid settings (e.g. `s1._domainkey` and `s2._domainkey`).
- For Resend: add CNAME `domk` values provided in dashboard.
- For your mailbox provider (e.g. Google Workspace), enable DKIM in Admin console.

**DMARC**
```
_dmarc.elithmedia.com. TXT "v=DMARC1; p=quarantine; rua=mailto:postmaster@elithmedia.com; fo=1"
```

> After DNS propagates, send a test. Gmail will accept only if SPF or DKIM passes and DMARC policy is sane.

## Consent & tracking

- Default signals denied until user chooses.
- `CookieBanner` provides granular toggles.
- `window.__cmp` and `window.__tcfapi` shims expose basic APIs. For certified TCF v2.2, integrate a CMP like OneTrust/Didomi and replace the shim.
- GA4, Meta, TikTok, Google Ads tags should be added via GTM or direct scripts, gated by consent. GA4 bootstrap included.

## Admin

- `/admin` shows a skeleton UI. Replace with Supabase Auth magic link flow and CRUD using server actions.
- Leads stored in `leads` with rate limiting per 10 minutes.
- CSV export can be added via a server route that selects from `leads` and returns `text/csv`.

## Accessibility & SEO

- Proper landmarks and skip link.
- `sitemap.xml` and `robots.txt` dynamic routes.
- JSON-LD component available; add Organization and Services blocks in `app/layout.tsx` or homepage.

## Testing & CI
- `vitest` tests for validators.
- Add Lighthouse CI on your Vercel preview URLs for budgets: Performance ≥ 95, SEO ≥ 95, A11y ≥ 95.

## i18n
- Simple dictionary in `lib/i18n.ts` with RO default and EN scaffold.

## Notes
- This starter gives you production-grade structure. For a full TCF-certified CMP and advanced admin, extend accordingly.
