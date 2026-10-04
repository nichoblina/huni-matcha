# Huni Matcha

Cebu matcha and hojicha stall site. Static HTML — no build, no npm. **Nicholai Oblina** is building it. The live editorial page is `melange.html`; GitHub Pages serves `index.html` (keep those two in sync: `cp melange.html index.html` before you publish).

Preview: https://nichoblina.github.io/huni-matcha/  
Repo: https://github.com/nichoblina/huni-matcha (`main`, Pages from repo root)

This file is the current-state map for Claude CLI. Content field lists live in `docs/content.md`. Studio hosting and image rules live in `../small-business-templates/` (see below). Do not invent a new stack.

## Hosting status

Client Cloudflare Pages is **live** at `https://huni-matcha.hunimatcha.workers.dev`. Domain `hunimatcha.com` is on Cloudflare nameservers (`huxley` / `nia`) but not yet attached to the Pages project — no A/CNAME yet. GitHub Pages is the older preview.

**Attach the domain:** Cloudflare dashboard (client account) → **Workers & Pages** → **huni-matcha** → **Custom domains** → add `hunimatcha.com` and `www.hunimatcha.com`. Because the zone is already on Cloudflare, Pages writes the DNS records. Prefer apex as primary and redirect `www` → apex. Canonical / OG already use `https://hunimatcha.com/`.

**R2:** public dev URL is `https://pub-93a605c79ac04785bf8fdddc3df010a8.r2.dev`. Set `HUNI_MEDIA` in `scripts/media.js` to `…/huni-matcha/`. Upload objects under prefix `huni-matcha/` with the same filenames as `images/`. Do not push that switch until the files 200. Then delete heavy local photos; keep favicon + logos + `brand.png`.

Studio stays on **Path B**: we push `main`, Pages auto-deploys; they own the Cloudflare account.

## Images — studio rule (small-business-templates)

Source of truth: `../small-business-templates/DEPLOYMENT.md` → **Images**, also summarized in that repo’s `CLAUDE.md`.

- **A few photos** may sit in `<client>/images/` next to the HTML. Compress under **300 KB** ([squoosh.app](https://squoosh.app)). WebP preferred when uploading to R2; JPEG is fine for the current Pages preview.
- **A menu of drinks, a gallery, or several clients’ photos** belong on **Cloudflare R2**. Upload under a client prefix (`huni-matcha/hero.webp`, …). Point `<img src>` (and `HUNI_DRINKS[].src`) at the **public R2 URL**. Delete the local copy after the upload succeeds so the laptop and git stay small.
- **Leave on disk:** favicon (`images/favicon.png`, `apple-touch-icon.png`), and tiny brand marks (`logo.png`, `logo-hero.png`, `brand.png`) unless you have a reason to move them.
- Facebook and Google Drive links are for **collecting** files. Never use them as live `src`.
- Do not AI-generate brand art unless the user asks. Existing drink stills on the menu were generated from the client’s poster; swapping in real product photos is preferred when they send them.

Huni photos currently live in `images/`. After `HUNI_MEDIA` is set, drink/media/crew/hero files move to R2; brand marks stay in the repo.

## What the site is

Editorial cream/beige page, forest green, baby pink.

| Token | Value |
|---|---|
| Page / cream | `--white: #f7f6f2`, `--beige: #ebe6dc` |
| Green | `--green: #1f3d24`, `--green-mute: #4a6352`, `--matcha: #3d6b42` |
| Pink | `--blush: #e8c4c8`, `--blush-deep: #d9a8ae` |
| Type | Libre Bodoni `--serif`, Syne `--display`, Outfit `--sans` |

Tagline: **Your Daily Matcha Fix**. Hours are the **order window**, not a walk-in café. Kitchen: Nichols Heights, Guadalupe, Cebu. PHP menu.

Sections: hero → everyday ritual (carousel) → menu → aftersips → media → crew → catch us → footer.

## Where data lives

Do not hard-code a new drink or pop-up in the HTML. Edit the JS list, refresh.

| Data | File |
|---|---|
| Menu, prices, drink photos, ritual carousel, hero drink count | `scripts/drinks.js` (`HUNI_DRINKS`) |
| Next stall / Coming soon | `scripts/popups.js` (`HUNI_POPUPS`, `HUNI_COMING_SOON`) |
| Aftersips quotes | `scripts/testimonials.js` (`HUNI_TESTIMONIALS`) |
| Hours, address, map, contacts | `melange.html` / `index.html` (`#find-us`) |
| Field notes | `docs/content.md` |

**Pop-ups:** add stalls to `HUNI_POPUPS` (soonest first, optional `until`). Catch us is a **manual pager** (no autoplay); the hero rotates. Omit `ctaHref` for no social button; `ctaNetwork: "facebook"` for FB.

**Best-seller pills:** data is marked on Cookie Butter, Cereal Milk, Seasalt Matcha. `HUNI_SHOW_BEST_SELLERS` is **`false`** until the client wants them visible.

**Prices** (from the client poster): Coconut Cloud ₱289, Cereal Milk ₱260, Seasalt Matcha ₱261. Other drinks unchanged from the last `HUNI_DRINKS` list.

## Brand / logo

- `images/logo.png` — dark mark, **pink whisk tips**. Nav, footer on cream.
- `images/logo-hero.png` — white letters, **pink whisk tips kept**. Hero only.
- **Never** `filter: brightness(0) invert(1)` on the hero logo; that wipes the pink tips. Client called this out.
- Section dividers: whisk in `images/brand.png` on a forest-green circle (`mix-blend-mode: screen`). Manual crop: `transform: translate(-50.4%, -49%); width: 134%`. Do not put a whisk divider in the footer.
- Footer: hairline on desktop; frosted green band on mobile (`rgba(31, 61, 36, 0.72)` like the pop-up card). Credit: Nicholai Oblina → https://nichoblina.github.io

## Nav / layout (do not regress)

- Desktop: `#side-rail` after the hero unless the right gutter is under ~220px, then `#float-nav`.
- Mobile `<861px`: float nav after hero. Hamburger on hero only.
- **Do not** `overflow-x: clip` on `main` / `.sheet`. Combined with `.reveal { opacity: 0 }` it whites out the page.
- Do not clip overflow on `.sheet` to “fix” the rail.
- Active rail: larger Syne forest green. Inactive: muted blush.

## Known gotchas (already bitten)

1. Missing `<main class="sheet">` after inserting the rail drops section padding.
2. Duplicate `}, { threshold: 0.28 });` kills inline JS.
3. Unclosed `}` on `.drawer a.is-here::after` eats CSS.
4. `.ritual > div > p` overrides kicker color — use `p:not(.kicker)`.
5. Brand-rule lines need `flex: 1` inside a **centered** `clamp(12.5rem, 54vw, 36rem)` bar or they sit off-center.
6. `.stats span { display: block }` must not wrap `#drink-count`. Subtitles use `.stat-sub`.

## Extra work / money

Huni is an x-deal (referrals). Extra rounds are billed per `../small-business-templates/PRICING.md` (about ₱1,000–₱1,500/round; care plan ₱1,000–₱2,500/mo). Do not treat large new features as included unless Nicholai says so.

## Git

- Commit and push **only when asked**.
- Never commit `CLIENT INTAKE.xlsx` (gitignored).
- No `--force` to main, no hook skips, unless explicitly requested.

## Commands

```bash
cp melange.html index.html
python3 -m http.server 8876
```

GitHub Pages: push `main` until Cloudflare Pages is connected; after that, the same push deploys the live site. R2 steps: `../small-business-templates/DEPLOYMENT.md` → Images.
