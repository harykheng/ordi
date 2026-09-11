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
- `index.html` on `landing-alternatif` loads **only** Fraunces + Plus Jakarta
  Sans, the two families that branch renders. The `landing-second` components
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
mengandalkan chat sebagai kasir."** Product-led, not ownership-led: the page
has to answer *what is Ordi / what do I get / what does it cost* fast, then
carry the ownership argument as the differentiator rather than the opener.
Flow is MASALAH → SOLUSI → BUKTI VISUAL → HARGA → CTA.

### Design tokens (`@theme` in `src/index.css`)

Warm "espresso" palette, editorial, max two font families. All pairs below
were contrast-computed, not eyeballed:

- `--color-cream` `#fdf8f4` — page background
- `--color-sand` `#f3e7db` — alternating section band (the brief's "paper")
- `--color-card` `#ffffff` — card surfaces
- `--color-bean` `#2d1a0e` — hero + closing CTA card (cream on it = 15.7:1)
- `--color-espresso` `#553125` — body text (10.7:1 on cream)
- `--color-latte` `#c4956a` — warm accent, step numbers, chips
- `--color-coral` `#c0392b` — CTA fill only (cream on coral = 5.2:1)
- `--color-coral-deep` `#a32d1f` — the text variant; plain `coral` as text on
  `sand` is 4.47:1 and fails AA, `coral-deep` is 5.9:1
- `--color-mint` `#d9fdd3` / `--color-mint-deep` `#256d3f` — success/status only
- Text opacity floor is `/75` on light backgrounds (4.75:1 on sand). Don't go
  below it for real copy; `/85` is the default for secondary text.

Fonts: `Fraunces` for statements via `.font-statement` (has `SOFT`/`WONK`
variable-axis settings baked in), `Plus Jakarta Sans` for everything else via
the default `font-sans`. `.eyebrow` is the small uppercase label style.

Card pattern here is **hairline border + soft shadow**
(`border border-espresso/12` + `shadow-[0_Npx_Npx_-Npx_rgba(45,26,14,...)]`),
not the offset hard shadow of `landing-second`. No doodles on this branch.

### Section structure (`App.jsx`)

```
AltHeader          — sticky, transparan di atas hero gelap, cream setelah scroll
AltHero            — bean/dark, headline + CatalogScreen mockup + dua CTA
TrustStrip         — sand band, 3 poin, no fake logos
ProblemSection     — 3 kartu masalah
HowItWorks         — 4 langkah, tiap langkah punya mini-mockup
FeatureSection     — 5 fitur urut manfaat; QRIS & notif WA dapat visual
BeforeAfter        — dua kolom, panah di seam (desktop)
OwnershipSection   — diferensiasi + disclosure biaya hosting
AltPricing         — 3 tier, harga & retainer sama persis dengan landing-second
AltComparison      — tabel 4 kolom (md+), kartu per opsi (mobile)
AltFAQ             — 7 pertanyaan, native <details>
AltFinalCTA        — kartu bean + footer
StickyMobileCTA    — mobile only, muncul setelah hero, ngumpet di footer
AltConsentBanner   — GA4 Consent Mode v2
```

Hero DOM order is judul → mockup → CTA because mobile needs the product
visual between them; desktop re-groups the left column with
`display: contents` on the wrapper (`contents md:block`). Don't "simplify"
that to `row-span-2` — a spanning grid item distributes its height across
both rows and reopens a dead gap between subheadline and CTA.

### Mockups

`src/components/alt/ProductMockups.jsx` — all HTML/CSS, dummy data, no
screenshot assets exist in this repo (the brief listed `assets/catalog-full.png`
etc.; they were never added, so the fallback path is the real path). Illustrative
store is "Kopi Senja". If real screenshots ever land, they replace these
component-by-component, not the whole section.

### Honesty constraints that are load-bearing here

- QRIS: nominal auto, **verification stays manual** — said in the feature card,
  the mockup caption, the pricing feature list, and the FAQ. Don't soften it.
- Hosting/maintenance cost is disclosed as opsional but explicitly **not zero**
  (OwnershipSection's "Jujurnya" note + FAQ #3).
- Setup takes time, deliberately: Comparison "waktu mulai" + FAQ #5 both say
  Ordi is the wrong pick if you need something online today.
- The highlighted tier says **"Rekomendasi kami"**, not "paling banyak dipilih"
  — there's no client base yet to make a popularity claim provable.
- The competitor's monthly price is deliberately *not* quoted as a number on
  this branch (`landing-second` quotes Rp300rb/bulan); the comparison says
  recurring-vs-one-time without an unverifiable figure.

### Mobile rules verified at build time

Zero horizontal overflow at 320/375/390/768/1024/1920. Grid items that contain
mockups carry `min-w-0` — without it a `truncate` (white-space: nowrap) child
raises the item's min-content width and blows the single-column grid out at
320px. Tap targets are ≥44px except the header logo link (40px). Sticky CTA
waits for the cookie banner (`hidden={consentOpen}` from `App.jsx`) and hides
itself once `#kontak` is on screen.

### GA4 events

Same names as `landing-second` so the two versions stay comparable:
`klik_wa` (`lokasi`: header/hero/final-cta/sticky-mobile), `klik_demo`
(`lokasi`: hero/final-cta), `klik_tier` (`tier`), `consent_choice`.
Every WhatsApp CTA prefills a different message via `waLink()` in
`src/data/altContent.js`, so an incoming chat says which section it came from.
