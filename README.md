# FairChild Salespage

Next.js sales page for FairChild Institute programmes, courses, Interview Prep, and Fellowship — with Stripe Checkout on each product detail page.

## Getting started

```bash
npm install
cp .env.example .env.local
# add STRIPE_SECRET_KEY and NEXT_PUBLIC_APP_URL
npm run dev
```

## Stripe

1. Create a [Stripe](https://dashboard.stripe.com/) account (test mode is fine).
2. Set `STRIPE_SECRET_KEY` in `.env.local` (and `.dev.vars` for Cloudflare preview).
3. Set `NEXT_PUBLIC_APP_URL` to your public origin (e.g. `http://localhost:3000`).
4. Open any `/products/[slug]` page, choose a payment option, and complete Checkout.

Amounts are created dynamically via Checkout `price_data` (no pre-created Stripe Price IDs required).

## Routes

| Path | Purpose |
|------|---------|
| `/` | Converting sales page |
| `/products/[slug]` | Product detail + Stripe pay |
| `/checkout/success` | Post-payment confirmation |
| `/api/checkout` | Creates Stripe Checkout Session |

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
```
