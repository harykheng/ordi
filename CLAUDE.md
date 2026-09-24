# Ordi landing page — context for working in this repo

Landing page for **Ordi** ("Order Disini"), a custom-built ordering system
Studio Harel builds per-client for Indonesian F&B UMKM (kafe, resto, bakery,
toko PO). This repo is the *marketing landing page only* — static React/Vite
site, no backend, no Supabase, no real checkout. Every catalog, dashboard,
QRIS, or label you see in the code is a **stylized illustrative mockup** with
hardcoded dummy data, not the real Ordi product.

The real product lives in `harykheng/ordi-master` (its `CLAUDE.md` and
`PROMO.md` are the source of truth for what Ordi actually does). When a
feature there changes, the copy in `src/data/content.js` has to follow.

Positioning: Ordi's edge is **full ownership + per-business custom build**,
not speed or price. There's a real competitor, **Tokokit** — self-serve SaaS,
multi-tenant, free subdomain, cheap monthly rent. Ordi cannot and should not
try to win on "instant" or "cheap" — that's Tokokit's ground. Every
copy/design decision on this page should widen the distance from that
framing, not narrow it.

## Branches

- `main` — the original ("chat chaos") version.
- `landing-first` — frozen snapshot of `main` before the first rebuild.
  **Don't touch.**
- `landing-second` — the ownership/custom-build rebuild that was live at
  `ordi.studioharel.id`.
- `landing-alternatif-2` — direction A, "Nota & Stempel" (receipts, rubber
  stamps, order labels, handwritten pen notes).
- `landing-alternatif-3` — direction B, "Deretan Ruko" (awnings, shop signs,
  an interactive street).
- `landing-alternatif-4` — **this branch. Direction C, "Dapur Terang"**:
  clean and bright — soft floating cards that tilt with the cursor, drifting
  glows, pastel tiles. Closest to Camemo's feel, still without phone frames.

The three alternatif branches share one base commit (content + helpers) and
differ only in the visual layer. They are kept side by side so Hary can pick
one; merging any of them to `main` is a separate decision, never part of a
task unless explicitly asked.

## Hard rules (learned from real collisions with Tokokit's page, don't reintroduce these)

- **No specific "X chat" figures** in headline/badge/hero copy (e.g. "8 chat
  → 1 sistem"). That's Tokokit's exact headline pattern. The chat pain point
  is allowed only as the small "Dulu: ..." note at 07:00 in `OwnerDay`.
- **No side-by-side before/after WhatsApp chat panels** anywhere near the hero.
- **No full-bleed solid-color bands** (`bg-ink` or any strong color) as
  section backgrounds — Tokokit uses two black full-width bands (and Camemo
  a dark CTA card). The soft washes (`bg-paper` / `bg-meja`) are fine; weight
  goes into cards and pastel tiles, never a dark band or dark closing card.
- **No standalone giant CTA button floating alone mid-page.** CTAs live in
  Header, Hero, and FinalCTA only, plus the small per-card buttons inside
  PricingTiers.
- **Comparison stays a table** (`Comparison.jsx`): 4-column grid on md+,
  stacked cards on mobile. Never a numbered-step/arrow format.
- **Mockups are stylized soft cards**, never realistic app screenshots in a
  phone frame. This direction trades the ink outlines of A/B for hairline
  borders and soft shadows, but the no-phone-frame rule is what keeps it
  visually apart from Tokokit's and Camemo's real screenshots.
- **No "instant" or "gratis coba" claims anywhere.** The Comparison "waktu
  mulai" row, the FAQ, and `HowToStart` all say setup takes a real
  conversation first — deliberate honesty, not a gap to smooth over.
- **Honesty list stays.** `HONEST_NOTES` (manual payment verification,
  in-tab notifications only, no DP, instant couriers only, one quota number
  per product) mirrors the "jangan dijanjikan" list in ordi-master's
  `PROMO.md`. Don't write copy that contradicts it (e.g. "otomatis lunas").
- **No fabricated social proof.** No client counts, testimonials, or "paling
  banyak dipilih" ribbons without data (the Antar ribbon says "Pas buat yang
  udah antar" on purpose). Example stores (`STORE_EXAMPLES`) are always
  labelled "contoh".
- Prices, retainer, the Rp300.000/bulan rent figure and the "±8 bulan balik
  modal" line are Hary's numbers — don't change them.

## Design system — direction C (`src/index.css`)

A bright, clean kitchen: white cards floating on warm white. Token names are
shared with the other directions so the section components stay the same;
values and component classes differ. `@theme`:

- `--color-paper` `#fffbf6` page; `--color-meja` `#fff4ea` soft peach wash
  for alternate sections (no torn/scalloped edges here, `.tear-top` is a
  no-op)
- `--color-card` `#fff`, `--color-line` `#ece2d4` hairlines and card borders
- `--color-ink` `#1c1917` text and the dark primary button
- `--color-ink-2` `#57534e` secondary text (≥6.2:1 on every surface here,
  pastel tiles included)
- `--color-ember` `#ff7a2f` fills: dots, active bars, ring on the Antar tier
- `--color-ember-deep` `#b34d12` orange text/emphasis (≥4.6:1 on paper,
  meja, white; **fails small text on lilac/peach**, keep it off pastels)
- `--color-pen` `#1f7a57` mint-green text: step checks, "Buka", LUNAS pill
- `--color-highlight` `#ffe3d0` peach (selected chips, emphasis band),
  `--color-mint` `#ddf3e9`, `--color-butter` `#fff1bf`, `--color-lilac`
  `#ece5ff` pastel tiles
- `--shadow-soft`, `--shadow-lift` the only shadows (no hard offsets)

Fonts (`index.html`): **Parkinsans** 800 (`.font-headline`, tight tracking)
for headlines — Bricolage Grotesque was dropped because it reads as
AI-template; **Plus Jakarta Sans** body (same face as the Ordi catalog);
**IBM Plex Mono** for prices, codes, times.

Component classes: `.card-ink` (soft card), `.btn` (pill; `.btn-primary` is
ink with an ember dot), `.chip`, `.mark-hl` (orange + peach band, short
phrases only), `.receipt` (soft card; `.receipt-print` = soft rise),
`.stamp` (mint LUNAS pill), `.ticket`, `.float-bob`, `.drift`, `.ping`,
`.grow-bar`, `.striped-closed`.

## Section structure (`App.jsx`)

```
Header        logo, anchors Fitur/Harga/Tanya, demo button
Hero          ownership headline; a cluster of soft cards — ShopCard
              (re-brands per STORE_EXAMPLES and plays date/slot/cart), new-order
              toast, QRIS, "harus siap hari ini" count-up with growing bars,
              tracking status — floating at different depths and tilting with
              the cursor, plus a cursor-following glow (the Camemo equivalent)
CustomerFlow  5 steps (#pelanggan). lg: sticky screen swaps per step via
              IntersectionObserver; mobile: screen inline under each step
ModeSection   interactive harian vs PO calendar + daily quota stepper
OwnerDay      07:00-21:00 owner timeline (#dashboard), each moment on a
              pastel tile, ember scroll-filled rail
Comparison    table (md+) / stacked cards (mobile)
PricingTiers  3 tiers (ember ring on Antar), "Semua paket sudah termasuk"
              on a mint tile, sewa vs Ordi soft cards with a LUNAS pill
HowToStart    3 process cards + "Biar nggak salah harap" on a lilac tile
FAQSection    native <details>, no JS state (#tanya)
FinalCTA      optional lead form → live WhatsApp message + tier hint, footer
```

Animation rules: looping showcase animations go through `useLiveMotion`
(runs only while on screen, tab visible, and no reduced-motion preference).
Everything must read correctly with animations off. CSS keyframes restart by
changing a React `key`. Scroll-reveals use `Reveal.jsx` or framer
`useInView`; **never put the in-view observer on an element whose own
`clip-path` hides it** — Chrome reports it as never intersecting (see
`PrintIn` in `OwnerDay.jsx`). The hero tilt writes `--tx/--ty/--mx/--my`
straight onto elements (no React re-render per mouse move) and is skipped
with reduced motion.

Layout gotcha: any `grid` without an explicit base `grid-cols-*` gets
`grid-cols-1` (`minmax(0,1fr)`). An implicit `auto` track grows to the
max-content of nested `1fr` grids (the date chips) and caused a 29px
horizontal overflow on 375px screens.

Highlight gotcha: an inline box's background covers the font's full
ascent + descent (~1.4em for Parkinsans), not the line-height. That's why
`.mark-hl`'s peach band is positioned from the top (`0 0.93em`, straddling
the baseline). A percentage/bottom position hangs low and touches the next
line when an emphasised phrase wraps. Check wrapped phrases at 375px.

## Content data (`src/data/content.js`)

`DEMO_URL`, `WHATSAPP_NUMBER`, `WHATSAPP_CTA_LINK` — real values, don't reset.
`STORE_EXAMPLES`, `CUSTOMER_FLOW`, `OWNER_DAY`, `OWNER_EXTRAS`, `COMPARISON`,
`PRICING_TIERS`, `INCLUDED_IN_ALL` (Ordi Dasar included, confirmed by Hary),
`RENT_COMPARISON`, `PROCESS_STEPS`, `HONEST_NOTES`, `FAQ_ITEMS`,
`LEAD_OPTIONS`.

Helpers: `lib/dates.js` builds relative demo dates (today, tomorrow, a Libur
and a Penuh day always inside day 2-6) so the page never shows stale dates;
`lib/whatsapp.js` builds the lead message and tier hint; `lib/format.js`
`rp()`.

Copy convention: no em dashes in rendered strings (code comments are fine).
"kamu", casual, specific.

## Analytics

GA4 (`gtag.js`, `G-GSPM07JL7N`) in `index.html` with Consent Mode default
denied; `ConsentBanner.jsx` stores the choice in `localStorage`. Events:
`klik_wa` (`lokasi`: hero / final-cta, plus the lead form's jualan/mode/
antar/qris answers — **never the store name**), `klik_demo` (`lokasi`:
header / hero / final-cta), `klik_tier` (`tier`), `consent_choice`.

## Known loose ends

- `wrangler.jsonc` is required for Cloudflare's Workers & Pages build
  (`assets.directory: ./dist`) — don't remove it.
- `.node-version` pins Node for Cloudflare (Vite 8 needs `^20.19.0 ||
  >=22.12.0`); Cloudflare ignores `package.json` `engines`.
- `public/_redirects` holds the /wa, /threads, /instagram UTM short links.
- `public/og-image.png` is rendered from an HTML mock of this direction's
  hero (floating cards; 1200×630); regenerate it when the headline changes.
- This sandbox's network policy blocks most external domains, and Chromium
  here doesn't trust the proxy CA, so Google Fonts don't load in local
  screenshots. For verification, download the font CSS/woff2 with `curl`
  (which trusts the proxy) into `dist/` and point the built `index.html` at
  it; never disable TLS checks.

## Working conventions for this repo

- Always verify visually before calling something done: build, run a local
  preview, screenshot at ~375px and a wide desktop width, check horizontal
  overflow (`scrollWidth - clientWidth`) and console errors.
- `playwright` is used from the global install for screenshots — it's not a
  dependency of this project, don't add it to `package.json`.
