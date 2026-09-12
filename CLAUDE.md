# Ordi landing page — context for working in this repo

Landing page for **Ordi** ("Order Disini"), a custom-built ordering system
Studio Harel builds per-client for Indonesian F&B UMKM (kafe/resto). This
repo is the *marketing landing page only* — static React/Vite site, no
backend, no Supabase, no real checkout. Every "dashboard", "QRIS", or
"katalog" screen you see in the code is a **stylized illustrative mockup**
with hardcoded dummy data, not the real Ordi product.

Positioning: Ordi's edge is **full ownership + per-business custom build**,
not speed or price. There's a real competitor, **Tokokit** — self-serve SaaS,
multi-tenant, free subdomain, cheap monthly rent. Ordi cannot and should not
try to win on "instant" or "cheap" — that's Tokokit's ground. Every
copy/design decision on this page should widen the distance from that
framing, not narrow it.

## Branches

- `main` — the original ("chat chaos") version, still what's live at
  `ordi.studioharel.id` as of this writing.
- `landing-first` — frozen snapshot of `main` right before the rebuild.
  **Don't touch this branch.** It exists purely so the two positioning
  approaches can be compared side by side.
- `landing-second` — the ownership/custom-build rebuild. Doodle/cream
  design system. Not merged to `main`.
- `landing-alternatif` — **this branch.** A third, product-led version
  branched off `landing-second`, built to be A/B compared against it: same
  business facts and prices, different positioning, structure, palette, and
  type. Work on this branch stays on this branch; never merge to `main` or
  touch `landing-first`/`landing-second` unless explicitly asked.

### Which design system applies where

Everything under "Design system" and "Section structure" below describes
**`landing-second`**. On `landing-alternatif` the rendered page is the
`src/components/alt/*` tree (see "Versi alternatif" below), and the
`landing-second` components in `src/components/*.jsx` are still on disk but
unrendered, kept deliberately so the two versions can be diffed. Their
design tokens are also still in `src/index.css`, marked legacy.

The *strategic* rules in "Hard rules" still bind both versions (no "X chat"
figures above the fold, no before/after WhatsApp chat panels as the hero
visual, no "instant"/"gratis" claims, comparison stays a table, no fake
popularity/testimonial claims). The *stylistic* ones (doodles, offset-shadow
cards, no solid-color bands) describe `landing-second` only — the alternative
version was explicitly commissioned with a dark espresso hero and a different
card style.

## Hard rules (learned from real collisions with Tokokit's page, don't reintroduce these)

- **No specific "X chat" figures** in headline/badge/hero copy (e.g. "8 chat
  → 1 sistem"). That's Tokokit's exact headline pattern. A chat-count detail
  is fine buried in the Timeline's 07:00 pain point, never above the fold.
- **No side-by-side before/after WhatsApp chat panels** as the hero visual.
- **No full-bleed solid-color (`bg-ink` or otherwise) bands** as section
  backgrounds — Tokokit uses two black full-width bands for pain-point
  statement + closing CTA. If a section needs strong visual weight, use the
  card pattern (`border-2 border-ink` + offset `shadow-[Npx_Npx_0_0_var(--color-ink)]`),
  not a solid block.
- **No standalone giant CTA button floating alone mid-page.** CTAs live in
  Header, Hero, and FinalCTA only, plus small per-card buttons inside
  PricingTiers (those are contextual, not standalone).
- **Comparison stays a 3-column table** (`Comparison.jsx`), never a
  numbered-step/arrow format — that's specifically what makes it read
  differently from Tokokit's own comparison section despite the same
  underlying idea (old way vs new way).
- **Mockups stay stylized doodle-cards** (`border-2 border-ink` + offset
  shadow, hand-drawn `Doodles.jsx` accents), never realistic app screenshots
  with a phone frame. That contrast is one of the page's few hard visual
  differentiators from Tokokit's real-screenshot approach.
- **No "instant" or "gratis coba" claims anywhere.** Ordi is explicitly
  positioned as *not* competing there. The Comparison table's "waktu mulai"
  row and the FAQ's "prosesnya berapa lama" answer both say setup takes time
  because there's a real conversation first — that's deliberate honesty, not
  a gap to smooth over.
- Don't fill `PRICE_TIER_*` / `RETAINER_TIER_*` placeholders yourself if
  they ever reappear — those are business decisions that come from Hary.
  (They're currently filled with real numbers in `content.js`.)

## Design system (`src/index.css`, `Doodles.jsx`, `Reveal.jsx`)

Light/cream theme, hand-drawn doodle accents, card = border + offset shadow.
**Design tokens are locked** — don't add new colors/fonts without being
explicitly asked; this repo's tasks have consistently been "restructure
copy/sections", not "redesign visuals."

Color tokens (`@theme` in `index.css`):
- `--color-paper` `#fff9f2` — page background
- `--color-paper-2` `#ffffff` — card surfaces
- `--color-ink` `#1a1a1a` — text, borders, dark fills
- `--color-ember` `#ff8a3d` — primary accent (CTA fills, borders, price)
- `--color-ember-deep` `#b8541a` — use this instead of `ember` for **text**
  on light backgrounds — plain `ember` text-on-`paper` fails contrast
  (~2.2:1), `ember-deep` passes (~4.9:1). `ember` itself is fine as a fill
  with `ink` or `paper` text on top.
- `--color-teal` `#0f4c4c` — secondary accent (live/status/badges)
- `--color-yellow` `#ffd23f` — highlight (promo badges, eyebrow chips)

Fonts: `Bricolage Grotesque` (display/headings, via `.font-display`),
`Public Sans` (body), `IBM Plex Mono` (data/timestamps/prices, via
`.font-mono-label`).

Card pattern used everywhere: `rounded-2xl border-2 border-ink` +
`shadow-[Npx_Npx_0_0_var(--color-ink)]` for emphasis (offset shadow, no
blur). Highlighted/featured cards additionally get `bg-ember/[0.08]`.

`Doodles.jsx` exports `Star`, `Sparkle`, `Spiral`, `CircleUnderline`,
`ArrowSwoosh`, `Squiggle` — small hand-drawn SVG accents, scattered as
`absolute`-positioned decoration (usually `hidden sm:block` to avoid mobile
clutter). Every section should have at least one; it's part of what reads
as "hand-drawn" rather than generic-SaaS next to Tokokit's flat screenshots.

`Reveal.jsx` — the standard scroll-in wrapper (`opacity`+`y` on
`whileInView`, `once: true`). Wrap new section content in it; stagger
siblings with `delay={i * 0.05-0.08}`.

Emphasis convention in headlines/copy: color+underline (`text-ember-deep`
+ `CircleUnderline`) on a **short phrase** (2-4 words), never a whole
sentence — a full-sentence emphasis reads as unintentional/diluted (this
was an actual bug, see Hero.jsx history).

## Section structure (`App.jsx`)

```
Header
Hero              — ownership pitch + OwnershipCertificate card, no chat imagery
TimelineIntro     — one-line bridge from Hero's ownership framing to daily pain points
TimeSection × 4   — 07:00/12:00/15:00/21:00, from TIMELINE in content.js.
                    07:00 item renders ChatTransformHero instead of its
                    mockupSlot — that's where the "messy WA chat" visual
                    lives now (moved out of Hero).
Comparison        — 3-col table (md+), stacked cards (mobile) — see note below
PricingTiers      — 3 tiers, ribbon badge on highlighted tier
FAQSection        — accordion, native <details>/<summary>, no JS state
FinalCTA          — footer + closing CTA
```

`OwnershipCertificate.jsx` is **not** a standalone section anymore — it's a
card component embedded in `Hero.jsx`'s right column. Cycles through
`TOKO_KAMU_VARIANTS` (concrete illustrative names, e.g. "Yuni Bakery") with
forward-looking copy ("X akan 100% memiliki sistem ini") — deliberately not
past-tense, so it doesn't read as a fabricated testimonial from a client
that doesn't exist yet.

`Comparison.jsx` renders **two different layouts** conditionally by
breakpoint, not one responsive table: `md:hidden` stacked cards (one per
option, all 4 rows inside each) and `hidden md:block` for the original
4-column table. The table format breaks on narrow viewports (forced
horizontal scroll, floating unstyled row labels) — don't try to make one
markup structure serve both, the mobile card layout is intentionally
separate JSX.

## Content data (`src/data/content.js`)

`DEMO_URL`, `WHATSAPP_CTA_LINK` — real values, already filled in. Don't
reset to placeholders.

`TOKO_KAMU_VARIANTS`, `TIMELINE`, `PRICING_TIERS`, `COMPARISON` — all
content-final. `PRICING_TIERS[].price`/`.retainer` are real numbers.

Copy convention: no em dashes anywhere in rendered strings — replaced
throughout with commas (see git history). Code comments still use them,
that's fine, they're not rendered.

## Known loose ends

- `src/components/mockups/CatalogMockup.jsx` exists but is **unused** —
  `TimeSection.jsx` now renders `ChatTransformHero` for the 07:00 slot
  instead. Left in place rather than deleted; harmless dead file.
- `wrangler.jsonc` at repo root is required for Cloudflare Pages to deploy
  this project (unified Workers & Pages build needs `assets.directory`
  pointing at `./dist`) — don't remove it, the build fails without it.
- `.node-version` pins the Node version for Cloudflare's build image (Vite 8
  requires `^20.19.0 || >=22.12.0`, which isn't guaranteed by Cloudflare's
  default). Cloudflare Pages ignores `package.json` `engines` for this —
  only `.nvmrc`/`.node-version` actually works.
- `index.html` on `landing-alternatif` loads **only** Fraunces (incl. italic) +
  Plus Jakarta Sans, the two families that branch renders. The `landing-second` components
  still sitting in `src/components/*.jsx` reference Bricolage Grotesque /
  Public Sans / IBM Plex Mono, so if `App.jsx` is ever swapped back on this
  branch, restore that font link too (or just compare against the
  `landing-second` branch itself, which is the intended way).
- Google Analytics (gtag.js, not Umami — Umami was tried and rolled back)
  is wired in `index.html` plus `onClick` handlers using
  `window.gtag?.("event", ...)` on WA/demo/per-tier CTA clicks. `Header.jsx`
  intentionally has no WA-click tracking — it only has a demo button, no
  WhatsApp link exists there.
- This sandbox's network policy blocks most external domains (Google/AWS/
  Biteship/Cloudflare docs, analytics endpoints, etc.) — when verifying
  scripts that load from a CDN, expect the load itself to fail here even
  when the code is correct; check for zero *page errors* on click instead
  of trying to observe the actual network request completing.

## Working conventions for this repo

- Always verify visually before calling something done: build, run a local
  dev/preview server, screenshot at both ~375px and a wide desktop width,
  check for horizontal overflow (`scrollWidth - clientWidth`) and console
  errors. This has caught real bugs (CSS Grid blowout from unbreakable
  placeholder text, a stray string `style` prop that crashed the whole page
  in production, an em-dash-driven line-wrap issue).
- Work happens on whichever version branch the task names (currently
  `landing-alternatif`); never merge to `main` or touch `landing-first` /
  `landing-second` unless explicitly asked.
- `playwright` gets installed/uninstalled per-session for verification
  screenshots — it's not a real dependency of this project, don't leave it
  in `package.json`.

## Versi alternatif (`landing-alternatif`, this branch)

Brief in one line: **"Website pesan online untuk UMKM F&B yang ingin berhenti
mengandalkan chat sebagai kasir."** Product-led, and since the second pass it
is also deliberately **editorial/print**, not SaaS: the page should read like
something a studio set in type and printed, with one playable order simulation
carrying the product story. Flow is MASALAH → SOLUSI → BUKTI VISUAL → HARGA →
CTA, but the proof arrives first, inside the hero.

### Direction (locked by the client brief, don't drift back)

Do: editorial layout that feels hand-set, asymmetric composition, tactile
paper, microinteractions that follow the *real* order flow, a demo you can
actually play, scroll-triggered storytelling, strong typography, and as few
repeated card grids as possible.

Don't: glassmorphism, generic bento grids, gradient mesh, uniform dashboard
cards, floating pills everywhere, plain fade-in reveals, the standard
text-left/screenshot-right SaaS hero, or a page littered with badges.

Two structural rules that came with it: **at most one main visual per
section**, and **not every section may be a card**. Most sections here are
type + hairlines only.

### Design tokens (`@theme` in `src/index.css`)

Palette is unchanged from the first alternative pass, all pairs
contrast-computed:

- `--color-cream` `#fdf8f4` page, `--color-sand` `#f3e7db` band,
  `--color-card` `#ffffff` sheet
- `--color-bean` `#2d1a0e` ink block, `--color-espresso` `#553125` body text
- `--color-latte` `#c4956a` warm accent (decorative only, 2.2:1 on sand, never
  put real copy in it), `--color-coral` `#c0392b` CTA fill,
  `--color-coral-deep` `#a32d1f` red text on light
- `--color-mint` / `--color-mint-deep` success only

**Contrast floor on light backgrounds is `text-espresso/80`** (5.5:1 on sand,
6.6:1 on cream). Anything lower failed the audit and was swept up; don't
reintroduce `/50`–`/75` for real copy. Page-wide audit currently reports zero
AA failures, measured by painting computed colors on a canvas (Tailwind v4
compiles opacity modifiers to `color-mix()`, so naive `rgba()` parsing of
`getComputedStyle().color` gives nonsense — don't "verify" contrast that way).

### Print utilities (`src/index.css`)

`.display` (Fraunces statement type, SOFT/WONK axes), `.standfirst` (serif
deck, italic in places), `.kicker` (small caps label), `.dropcap`,
`.misprint` (a 1.5px coral offset on one phrase, deliberate ink
misregistration), `.tnum`, `.paper-fiber` (one fixed SVG-turbulence overlay in
`App.jsx`, multiply blend), `.ruled` (ledger lines at 34px to match row
height), `.stamp` (bordered label with a turbulence mask so the ink looks
broken), `.press` (2px depress on `:active`), `.sheet-lift`, `.ink-shadow`.
`:focus-visible` is coral everywhere, latte inside `.on-ink` blocks.
`Paper.jsx` holds `TornEdge` (deckled edge from a seeded PRNG, so it is
irregular but stable across renders), `Rule`, `Stamp`, `Kicker`, `InkStroke`.

### `OrderSim.jsx` — the hero simulation

A playable order: pick produk → alamat → ongkir dihitung → total bergulir →
pesanan masuk ke buku dashboard, with an ink arrow drawn between the two
sheets and a WhatsApp notification slip. Rules it must keep:

- **Playable first.** Every step is a real `<button>`; clicking a different
  product or address recalculates instead of locking the flow. Orders
  accumulate in the ledger (`#0231`, `#0232`, ...) so replaying is rewarding.
- **Autoplay runs once, only while in view** (`useInView`), and stops the
  moment anyone clicks. Visible control toggles Jeda / Jalanin otomatis, and
  becomes Ulangi at the end. This is the interactive-demo contract from the
  design audit: visible controls, pause offscreen, final state kept as static
  content.
- **`prefers-reduced-motion` renders the final state immediately** and never
  autoplays; everything stays clickable.
- One `aria-live="polite"` narrator line doubles as the visible caption.
- Data is dummy and says so under the sim, next to the demo link.
- The ink arrow is anchored to the ledger (`absolute -left-14`), not to a
  percentage of the container, so it stays put when the left sheet grows.

### Section structure (`App.jsx`)

```
AltHeader       — tipis, garis bawah baru muncul setelah scroll
AltHero         — masthead editorial + OrderSim (satu-satunya visual besar)
ProblemSpike    — tiga sobekan nota numpuk, mekar ngikutin scroll
FlowStrip       — 4 langkah di satu garis tinta yang kegambar ngikutin scroll
FeatureLedger   — daftar spesifikasi bergaris rambut, satu struk QRIS
LedgerSwap      — satu halaman buku, baris lama dicoret sambil scroll
OwnershipNote   — blok tinta bertepi sobek (bukan pita full-bleed)
PriceSheet      — daftar harga cetak, tiga baris, bukan tiga kartu
AltComparison   — tabel 3 kolom (tetap tabel), cuma garis rambut
AltFAQ          — tanya jawab bergaris, <details> asli
AltFinalCTA     — kolofon 3 bagian + blok tinta penutup + footer
```

Scroll work follows the audit's rules: scrub-driven (never a plain fade-in),
nothing is pinned, body copy is never parallaxed, and every scrubbed value has
a `reduce` branch that renders the end state.

### Hooks gotcha

`useTransform` cannot be called inside `.map()` — `ProblemSpike` and
`LedgerSwap` each push their per-row transforms into a child component
(`Slip`, `SwapRow`). This was an actual bug caught before first build; don't
inline them back.

### Honesty constraints that are load-bearing here

- QRIS: nominal auto, **verification stays manual** — stated in the feature
  row, on the QRIS slip's stamp, in the pricing features, and in the FAQ.
- Hosting/maintenance is opsional but explicitly **not zero** (the "Jujurnya"
  note in `OwnershipNote` + FAQ #3).
- Setup takes time on purpose: Comparison "waktu mulai" and FAQ #5 both say
  Ordi is the wrong pick if you need something online today.
- Highlighted tier says **"Rekomendasi kami"**, never a popularity claim.
- The competitor's monthly price is deliberately not quoted as a number.

### Verified at build time

Zero horizontal overflow and zero page errors at 320/375/390/414/768/1024/
1280/1920. Zero WCAG AA text failures. Every tap target ≥44px except one
inline link inside a sentence (exempt). Keyboard order matches visual order
and reaches every simulation control. Reduced motion lands on the final state
with no autoplay.

### GA4 events

Unchanged so the versions stay comparable: `klik_wa` (`lokasi`:
header/hero/final-cta/sticky-mobile), `klik_demo` (`lokasi`:
hero/hero-sim/final-cta), `klik_tier` (`tier`), `consent_choice`. Every
WhatsApp CTA prefills a different message via `waLink()` in
`src/data/altContent.js`.
