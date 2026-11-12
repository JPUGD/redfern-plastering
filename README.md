# Redfern Plastering Solutions

Website for **Redfern Plastering Solutions** — Brisbane-based plastering business specialising in residential and commercial renovations and repairs. All aspects of plastering.

- **Phone:** 0425 743 992
- **ABN:** 61 947 738 353

## Stack

- Next.js (App Router, TypeScript, Turbopack)
- Tailwind CSS v4
- Framer Motion — 21st.dev-style animated components (border-beam buttons, marquees, spotlight bento cards, scroll-linked text, magnetic CTAs)
- Signature interaction: a "skim" wipe on the hero (rough render smoothed to a clean finish as the trowel passes) and a scroll-driven rough→smooth wall in "The finish" section — motion language built around plastering itself.

## Develop

```bash
npm install
npm run dev
```

## Quote form

The `#contact` section posts to `POST /api/quote`, which emails the enquiry through the Mailgun Messages API. Copy these into `.env.local` (gitignored). Do not commit the values.

| Variable | Purpose |
| --- | --- |
| `MAILGUN_API_KEY` | Mailgun private API key. Sent only as HTTP Basic auth (`api:<key>`) from the server. |
| `MAILGUN_DOMAIN` | Sending domain, for example `mg.example.com`. |
| `MAILGUN_FROM` | From address on that domain. `Redfern Plastering <quotes@mg.example.com>` is fine. |
| `QUOTE_TO_EMAIL` | Where the enquiry is delivered. One address, or up to five separated by commas. |

Optional: `MAILGUN_API_BASE`. Defaults to `https://api.mailgun.net`. If the domain is in Mailgun’s EU region, set `https://api.eu.mailgun.net`.

If any of the four required variables is missing, the route returns **503** and a generic message. It does not tell the visitor which setting failed.

Spam protection is a hidden honeypot field and a short in-memory limit of 5 submissions per IP every 10 minutes. That limit resets when the server process restarts, which is enough to slow down a simple script without another service. Photos are optional, one file, JPG / PNG / WEBP / HEIC, and rejected above 4 MB.

### Test locally

Unit tests mock Mailgun, including a successful send with Reply-To and a photo attached:

```bash
npm test
```

To exercise the page, start the dev server with dummy values (this will not deliver a real email; Mailgun rejects the key and the form shows an error while keeping what was typed):

```bash
MAILGUN_API_KEY=key-test \
MAILGUN_DOMAIN=mg.example.com \
MAILGUN_FROM="Redfern Plastering <quotes@mg.example.com>" \
QUOTE_TO_EMAIL=tim@example.com \
npm run dev
```

Then open `http://localhost:3000/#contact`.

Leave the variables unset and the same form returns 503:

```bash
curl -sS -D - -o /tmp/quote-body.json \
  -H "Origin: http://localhost:3000" \
  -H "Accept: application/json" \
  -F "name=Alex Nguyen" \
  -F "phone=0425 743 992" \
  -F "email=alex@example.com" \
  -F "suburb=West End" \
  -F "message=Crack above the hallway door, about a metre long." \
  http://localhost:3000/api/quote
```

With the dummy variables set, that curl returns **502** after Mailgun refuses the key. A real key on a verified domain returns **200**, and the page replaces the form with “Enquiry sent”.

## Build

```bash
npm run build
```

## Deploy

Auto-deploys to Vercel on push to `main` (or deploy directly with `vercel --prod`).

## Design system

Strictly monochrome, taken from the logo: ink `#0b0b0c` and plaster `#f6f5f1`. Bold wide-tracked uppercase display type (Archivo), flanking-rule section labels, gable + trowel mark.