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
- `landing-alternatif-2` — **this branch. Direction A, "Nota & Stempel"**:
  receipts, rubber stamps, order labels, handwritten pen notes.
- `landing-alternatif-3` — direction B, "Deretan Ruko" (awnings, shop signs,
  an interactive street).
- `landing-alternatif-4` — direction C, "Dapur Terang" (soft floating
  cards, glows, cursor tilt).

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
  section backgrounds — Tokokit uses two black full-width bands. The subtle
  paper tones (`bg-paper` / `bg-meja`) alternating with torn edges are fine;
  strong weight goes into cards, not bands.
- **No standalone giant CTA button floating alone mid-page.** CTAs live in
  Header, Hero, and FinalCTA only, plus the small per-card buttons inside
  PricingTiers.
- **Comparison stays a table** (`Comparison.jsx`): 4-column grid on md+,
  stacked cards on mobile. Never a numbered-step/arrow format.
- **Mockups are stylized cards and paper objects**, never realistic app
  screenshots or realistic device renders. Screens (catalog, QRIS, tracking)
  are ink cards; things that are paper in real life (receipts, labels, the
  production recap) are drawn as paper. The one phone on the page is the
  customer-flow `PhoneFrame` (Hary's call, so visitors picture the order
  page on their own phone). It is drawn in the same ink style: flat outline,
  hard offset shadow, sketched notch and status bar, stylized UI inside.
  Never swap it for a realistic iPhone mockup or a real screenshot, which is
  Tokokit's look.
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

## Design system — direction A (`src/index.css`)

Paper objects on a paper page. Tokens in `@theme`:

- `--color-paper` `#faf6ee` page, with an SVG grain on `body`
- `--color-meja` `#f1e9d8` alternate sections (every meja section has a
  torn top edge via `.tear-top`; the next paper section sets
  `--tear-from: var(--color-meja)`)
- `--color-card` `#fff` receipts, cards, labels
- `--color-ink` `#1b1a17` text, borders, hard offset shadows
- `--color-ink-2` `#5a554c` secondary text (≥6:1 on paper and meja)
- `--color-ember` `#ff8a3d` fills only (primary CTA, ribbon, price tags)
- `--color-ember-deep` `#b8541a` orange **text** and the LUNAS stamp
  (4.5:1 on paper, 4.9:1 on white — **fails on meja**, keep it on white cards
  there)
- `--color-pen` `#2a46c8` ballpoint blue: handwritten notes, step numbers
- `--color-highlight` `#ffe14a` stabilo behind 2-4 words

Fonts (`index.html`): **Parkinsans** (`.font-headline`, weight 800,
`letter-spacing: -0.035em`) for headlines and big numbers, the same display
face as direction C. Hary picked it over the original Archivo condensed
because it reads friendlier. It's much wider than a condensed face, so
headline sizes follow direction C's scale (h2 `clamp(2.1rem,4.4vw,3.2rem)`;
the hero h1 is sized to its column, see below), and `.mark-hl` is positioned for its
metrics. Bricolage Grotesque was dropped earlier because it reads as
AI-template. **Plus Jakarta Sans** body (same face as the Ordi catalog);
**IBM Plex Mono** (`.font-mono-label`, receipts, prices, times); **Kalam**
(`.pen`) for pen notes, max ~2 per section.

Component classes: `.card-ink`, `.btn` / `.btn-primary` / `.btn-secondary` /
`.btn-sm`, `.chip`, `.mark-hl` (+ `.swipe`), `.receipt` (zigzag edge,
outlined with stacked drop-shadows) + `.receipt-print`, `.leader`,
`.receipt-rule`, `.stamp` (+ `.stamp-thump`, `.stamp-blue`; needs the
`#grunge` SVG filter from `GrungeFilter.jsx`), `.ticket-wrap` + `.ticket`,
`.tear-top`, `.striped-closed` (Libur days).

Emphasis convention: `.mark-hl` on a **short phrase** (2-4 words), never a
whole sentence.

## Section structure (`App.jsx`)

```
Header        logo, anchors Fitur/Harga/Tanya, demo button
Hero          ownership headline + a cluster of ink cards: LiveStorefront
              (re-brands per STORE_EXAMPLES, "contoh" chip in its domain bar),
              "Pesanan baru masuk" toast, Bayar QRIS, "Harus siap hari ini"
              count + bars, and an order-status card. Click/tap anywhere in
              the hero drops a stamp (the Camemo-garden equivalent)
CustomerFlow  5 steps (#pelanggan). lg: one sticky PhoneFrame whose page
              slides to the active step (IntersectionObserver); mobile: a
              phone inline under each step. Screens live in
              flow/FlowScreens.jsx: `Shell` pins the main action (`cta`) in a
              bottom bar like a real phone; in the fixed-height desktop phone
              (620px, 540px on screens under 820px tall) a long page such as
              the menu clips under that bar, which reads as scrollable
ModeSection   interactive harian vs PO calendar + daily quota stepper
OwnerDay      07:00-21:00 owner timeline (#dashboard), scroll-filled rail
Comparison    table (md+) / stacked cards (mobile)
PricingTiers  3 tiers, "Semua paket sudah termasuk", sewa vs LUNAS receipts
HowToStart    3 process tickets + "Biar nggak salah harap" notebook
FAQSection    native <details>, no JS state (#tanya)
FinalCTA      optional lead form → live WhatsApp message + tier hint, footer
```

Animation rules: looping showcase animations go through `useLiveMotion`
(runs only while on screen, tab visible, and no reduced-motion preference).
Everything must read correctly with animations off. CSS keyframes restart by
changing a React `key`. Scroll-reveals use `Reveal.jsx` or framer
`useInView`; **never put the in-view observer on an element whose own
`clip-path` hides it** — Chrome reports it as never intersecting (see
`PrintIn` in `OwnerDay.jsx`).

Hero headline: "Punya toko, / punya sistem / pesanan sendiri." in three
fixed lines (`<br>`), stabilo on "sistem pesanan sendiri.". Its font-size
tracks the text column so the longest line (~8.1em) always fits:
`(100vw - 40px) / 8.4` below lg, `(100vw - 612px) / 8.4` on lg (the column
left of the 540px cluster), capped at 4.4rem. With a plain vw size it broke
into five one-word lines at 320px and 1024px. If the copy changes, re-measure
the longest line and adjust the divisor.

Hero cluster: one loop per example store (dashboard count-up, date picked,
two items added, QR scan, toast, status "Menunggu Konfirmasi" then
"Diproses"). The status card waits for confirmation first because payment is
checked by hand (`HONEST_NOTES`), so never make it jump straight to done. The
card positions are tuned so no card covers catalog content (cart, prices) at
any width: on sm+ the catalog sits at `left-[104px]` in a fixed 540px box
(the hero grid's right column is `540px` on lg); below sm the cards stack
under the catalog. Re-check overlaps at 320/375/1024/1440 after touching it.

Layout gotcha: any `grid` without an explicit base `grid-cols-*` gets
`grid-cols-1` (`minmax(0,1fr)`). An implicit `auto` track grows to the
max-content of nested `1fr` grids (the date chips) and caused a 29px
horizontal overflow on 375px screens. Same family: the tier price in
`PricingTiers` is an unbreakable string, so its size is clamped
(`clamp(1.8rem,3.6vw,2.3rem)`) and "sekali bayar" wraps under it as a unit;
at a fixed size it overflowed the three md columns by 22px at 768px. And
the header logo link is `min-w-0` (not `shrink-0`) so its tagline can wrap
on 320-374px phones instead of pushing "Coba Demo" off-screen.

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

GA4 (`gtag.js`, `G-GSPM07JL7N`) in `index.html` with Consent Mode, **opt-out
model** (Hary's call, Sept 2026). Analytics is `granted` from the first
page_view unless the visitor clicked "Nolak" before. The inline script in
`index.html` reads `localStorage` `ordi-cookie-consent` before
`gtag('config')`, and `ConsentBanner.jsx` writes it. The banner is a
non-blocking notice ("Nggak mau dicatat? Klik Nolak.") shown until the
visitor picks "Oke" or "Nolak". "Nolak" updates consent to denied and deletes
the `_ga` cookies. This replaced an opt-in banner that kept every visitor who
ignored it out of GA4 reports, and it relies on a notice plus easy opt-out,
not explicit consent. Don't remove the notice. If it ever goes back to
opt-in, expect tracked visits to drop and annotate the date in GA4. Brave
and ad blockers block GA entirely, so test in Chrome or Safari. Standard
reports lag 24-48h, so use Realtime or DebugView for checks. Events:
`klik_wa` (`lokasi`: hero / final-cta, plus the lead form's jualan/mode/
antar/qris answers — **never the store name**), `klik_demo` (`lokasi`:
header / hero / final-cta), `klik_tier` (`tier`), `consent_choice`.

## Known loose ends

- `wrangler.jsonc` is required for Cloudflare's Workers & Pages build
  (`assets.directory: ./dist`) — don't remove it.
- `.node-version` pins Node for Cloudflare (Vite 8 needs `^20.19.0 ||
  >=22.12.0`); Cloudflare ignores `package.json` `engines`.
- `public/_redirects` holds the /wa, /threads, /instagram UTM short links
  for blasts (`utm_campaign=blast-october` now; rename per campaign).
- `public/og-image.png` (1200×630, ~85 KB) is the link preview for WhatsApp
  and Threads blasts (`/wa`, `/threads` short links in `_redirects`). It's
  **center-safe**: logo, audience chip and the headline sit in the middle
  630×630, because WhatsApp crops a center square for small thumbnails (the
  compose box, WhatsApp Web). The four hero dashboard cards (captured from
  the real hero, codes swapped to `TK-`) sit in the side strips only, for
  the wide preview. Keep it under ~300 KB. When it changes, bump the `?v=`
  on `og:image`/`twitter:image` in `index.html`, since WhatsApp and Threads
  cache by URL. `og:image` is absolute to ordi.studioharel.id, so a branch
  preview link shows whatever image production serves until this version
  is live.
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
