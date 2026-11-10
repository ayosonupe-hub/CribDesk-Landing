# CribDesk waitlist landing page

Responsive Next.js App Router landing page based on the six CribDesk Claude design artboards. It includes the landing page, email signup, referral links, place-in-line page, FAQ, and Vercel-ready API routes.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. In development, signups persist in `.data/waitlist.json` so the entire flow can be tested without a cloud account. This file is gitignored.

## Deploy to Vercel

1. Import this repository as a Next.js project.
2. Add an Upstash Redis database from Vercel Marketplace and connect it to the project.
3. Confirm that `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are present in the Vercel project environment.
4. Deploy. The production signup API returns a `503` until storage is configured; it never pretends to save a signup.
5. Connect the intended custom domain. The share page builds referral links from the active site origin.

Set `NEXT_PUBLIC_SITE_URL` to the final public domain before launching. It is used for canonical and sitemap URLs; the default is `https://cribdesk.ai` from the reference design. Referral and confirmation URLs are marked `noindex`.

The base waitlist count shown in the reference design is 1,300. New signups are numbered from 1,301. Each valid new referral moves both the inviter and the joining agent's displayed positions up by 1,000, with a floor of 1. Repeat email submissions return the same invite code and do not increment counts.

## Checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Before public launch

- Review the privacy notice, waitlist terms, incentive copy, support email, and pricing promise with the business owner.
- Connect an email provider and launch workflow before sending access invitations. The site currently stores signups but does not send email.
- Configure production Redis and test signup, duplicate signup, referral credit, and share links on the deployed preview.
