# Premium Shop Demo Clothes

Shop-owner demo website for **The Gentleman Store** — premium menswear marketing site with filters, pagination, WhatsApp leads, and Cloudflare Workers deployment.

| | |
|---|---|
| **Local folder** | `premium-growth-website-for-marketing` |
| **Cloudflare Worker / repo name** | `premium-shop-demo-clothes` |
| **Stack** | Next.js 16 · React 19 · Tailwind 4 · OpenNext Cloudflare · Wrangler |

---

## What’s included

- Interactive hero, light/dark theme, premium typography
- Catalog of **1000+ demo products** (client-side expand) with filters + pagination
- Product gallery with **color-linked images** and marketplace-style details
- WhatsApp enquiry / appointment leads + demo dashboard (`localStorage`)
- Store location: **Katra Mohalla, Hanuman Bazariya, Bhind, Madhya Pradesh**
- Deploy target: **Cloudflare Workers** via `@opennextjs/cloudflare`

---

## Prerequisites

- Node.js **20+** (recommended)
- npm (comes with Node)
- A [Cloudflare](https://dash.cloudflare.com/) account (free plan works)
- Git (optional, for GitHub → Cloudflare auto-deploy)

---

## 1. Install dependencies

```bash
cd premium-growth-website-for-marketing
npm install
```

Optional — regenerate demo images (needs Sharp + Cursor asset sources):

```bash
npm run images:prepare
```

---

## 2. Local development (Next.js)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

`next.config.ts` calls `initOpenNextCloudflareForDev()` so local Next can talk to Cloudflare bindings when you add them later.

---

## 3. Cloudflare files in this project

| File | Purpose |
|------|---------|
| `wrangler.jsonc` | Worker name `premium-shop-demo-clothes`, assets, Node compat, Images binding |
| `open-next.config.ts` | OpenNext adapter config for Cloudflare |
| `.dev.vars` | Local `NEXTJS_ENV=development` for Workers preview |
| `public/_headers` | Long-cache headers for `/_next/static/*` |
| `next.config.ts` | OpenNext Cloudflare local-dev hook |
| `package.json` scripts | `preview`, `deploy`, `upload`, `cf-typegen` |

Worker name (must match repo / dashboard):

```jsonc
"name": "premium-shop-demo-clothes"
```

---

## 4. Login to Cloudflare (one time)

```bash
npx wrangler login
```

Check account:

```bash
npx wrangler whoami
```

---

## 5. Preview on Workers runtime (local)

Builds with OpenNext, then runs in the **same runtime as production**:

```bash
npm run preview
```

---

## 6. Deploy to Cloudflare Workers

```bash
npm run deploy
```

This runs:

1. `opennextjs-cloudflare build` (Next build + Workers adapter)
2. `opennextjs-cloudflare deploy` (upload Worker + assets)

After deploy, Wrangler prints a URL like:

```text
https://premium-shop-demo-clothes.<your-subdomain>.workers.dev
```

### Useful commands

| Command | What it does |
|---------|----------------|
| `npm run deploy` | Build + deploy live Worker |
| `npm run upload` | Build + upload a new version (no instant traffic cutover) |
| `npm run cf-typegen` | Generate `cloudflare-env.d.ts` binding types |
| `npx wrangler tail` | Live logs from the Worker |

---

## 7. Connect GitHub (recommended for continuous deploy)

1. Create a GitHub repo named **`premium-shop-demo-clothes`**.
2. Push this folder:

```bash
git remote add origin https://github.com/<your-username>/premium-shop-demo-clothes.git
git branch -M main
git push -u origin main
```

3. In [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → connect the GitHub repo `premium-shop-demo-clothes`.
4. Build settings (Workers + OpenNext):

| Setting | Value |
|---------|--------|
| Build command | `npx opennextjs-cloudflare build` |
| Deploy command | `npx opennextjs-cloudflare deploy` |
| Root directory | `/` (this project root) |

Or keep deploying from your machine with `npm run deploy` after each push.

---

## 8. Custom domain (optional)

1. Cloudflare Dashboard → your Worker **`premium-shop-demo-clothes`**
2. **Settings → Domains & Routes → Add**
3. Attach a domain you manage in Cloudflare DNS

---

## 9. Optional: R2 incremental cache

For Next.js ISR / cache on Cloudflare:

```bash
npx wrangler r2 bucket create premium-shop-demo-clothes-cache
```

Then add to `wrangler.jsonc`:

```jsonc
"r2_buckets": [
  {
    "binding": "NEXT_INC_CACHE_R2_BUCKET",
    "bucket_name": "premium-shop-demo-clothes-cache"
  }
]
```

And update `open-next.config.ts`:

```ts
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
});
```

Redeploy with `npm run deploy`.

---

## 10. Project scripts (summary)

```bash
npm run dev              # Next.js local UI development
npm run build            # Next.js production build only
npm run preview          # OpenNext build + local Workers preview
npm run deploy           # OpenNext build + deploy to Cloudflare
npm run upload           # OpenNext build + upload Worker version
npm run cf-typegen       # Generate CloudflareEnv types
npm run images:prepare   # Rebuild demo product images
npm run lint             # ESLint
```

---

## 11. App features (demo)

- **Shop** `/shop` — 1000+ products, filters, sort, pagination (no backend)
- **Collections / Wedding / New Arrivals** — same catalog UX
- **Product pages** — gallery, color → images, specs / care / fit panels
- **Contact / About** — map + WhatsApp + phone
- **Enquiry / Book appointment** — WhatsApp handoff (leads dashboard archived for future backend use)
- **Search** — Cmd/Ctrl+K across catalog

Store contact (demo):

- Phone / WhatsApp: **+91 93997 39395**
- Address: **Katra Mohalla, Hanuman Bazariya, Bhind, Madhya Pradesh**

---

## 12. Troubleshooting

| Issue | Fix |
|-------|-----|
| `wrangler login` fails | Use a browser session; or set `CLOUDFLARE_API_TOKEN` for CI |
| Deploy fails on Node APIs | Keep `nodejs_compat` in `wrangler.jsonc` (already set) |
| Images broken after deploy | Ensure `public/images` is committed; Images binding is in `wrangler.jsonc` |
| Build OOM locally | Close other apps; Node 20+; retry `npm run deploy` |
| Wrong Worker name | Must be `premium-shop-demo-clothes` in `wrangler.jsonc` and `services[].service` |
| Stale `.open-next` | Delete `.open-next` and `.next`, then `npm run deploy` again |
| OpenNext Windows warnings | Prefer **WSL** for `npm run deploy` if Windows builds act flaky |

---

## 13. Important notes

- Do **not** use `export const runtime = "edge"` — not supported by OpenNext Cloudflare.
- Prefer `opennextjs-cloudflare` scripts over raw `wrangler deploy` for this Next app.
- Leads are stored in the browser (`localStorage`) for demo — no database required.
- This is a **shop-owner demo**, not a live cart / payment system.

---

## Docs

- [OpenNext Cloudflare – Get Started](https://opennext.js.org/cloudflare/get-started)
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/)
- [Next.js](https://nextjs.org/docs)

---

## License

Private demo project for The Gentleman Store marketing / shop-owner presentation.
