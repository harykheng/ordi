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

Konsep: **"Dari chat yang berantakan menjadi order yang masuk sendiri."**
Halaman ini mini product demo, bukan artikel. Pengunjung lihat sistemnya jalan
sebelum baca banyak teks.

### Struktur (`App.jsx`)

```
AltHeader    — sticky, blur tipis setelah scroll; nav: Cara kerja, Harga,
               CTA "Coba demonya" (demo, bukan WA)
AltHero      — eyebrow, judul, satu kalimat, CTA demo + CTA WA, microcopy,
               lalu OrderSim di kolom kanan (lg+) / bawah CTA (mobile)
TrustChips   — 3 chip fakta produk, tanpa testimoni
Problems     — 3 kartu pendek, masing-masing punya gambar kecil
FlowTabs     — demo bertab 4 langkah, panel mockup ganti dengan fade+slide
OwnershipNote— satu blok tinta, 3 poin
PriceSheet   — 3 pricing card, yang tengah elevated
AltComparison— tabel 3 kolom 4 baris (tetap tabel), kartu di mobile
AltFAQ       — 4 pertanyaan, semua tertutup saat load
AltFinalCTA  — CTA besar ke WA + footer
```

Mobile menaruh CTA utama **di atas** mockup, bukan di bawah judul seperti
bunyi brief, supaya CTA tetap masuk viewport pertama (aturan CRO menang atas
urutan visual). Terukur: tombol ada di y=358 pada layar 375x812.

### CTA dan tracking (`src/lib/track.js`)

Satu pintu buat nomor WA, pesan prefilled, dan event. Nomor
`6281292567788` cuma ada di file ini. `waHref(context)` untuk href,
`trackWa` / `trackDemo` / `trackPricing` / `trackStep` untuk event.

Tiap handler mengirim **dua nama event sekaligus**: nama lama (`klik_wa`,
`klik_demo`, `klik_tier`) supaya angkanya masih bisa dibandingkan dengan
`landing-second`, dan nama baru sesuai brief (`hero_demo_click`,
`hero_whatsapp_click`, `demo_step_click`, `pricing_cta_click`,
`final_whatsapp_click`). Jangan hapus salah satunya.

Catatan waktu verifikasi: `index.html` mendefinisikan `window.gtag` inline,
jadi menimpa spy `gtag` lewat `addInitScript` Playwright tidak akan terbaca.
Periksa `window.dataLayer` saja.

### Design system (`src/index.css`)

Dari skill `github.com/WatermelonCorp/watermelon-platform`
(`skills/make-interfaces-feel-better`):

- Kedalaman dari bayangan berlapis (`--shadow-border`, `--shadow-border-hover`,
  `--shadow-lift`, kelas `.surface` / `.surface-hover`). Garis 1px tetap benar
  untuk pemisah baris.
- Radius konsentris. `outerRadius = innerRadius + padding`.
- `.press` memberi `scale(0.96)` dan menyebut properti transisinya. Tidak ada
  `transition: all` di mana pun.
- Animasi masuk dipecah bertahap (`.rise` + `.rise-1/2/3`), pegas framer-motion
  selalu `bounce: 0`, transisi tab 220ms fade + slide.
- `text-wrap: balance` di h1-h3, `pretty` di p/li/dd, `tabular-nums` di angka
  yang berubah, outline hitam murni 10% di gambar dan QR.
- Semua elemen interaktif lewat 44px.

**Lantai kontras teks di latar terang: `text-espresso/80`.** Ukur kontras
dengan melukis warna computed di canvas; Tailwind v4 mengompilasi opacity ke
`color-mix()`, jadi mem-parse `getComputedStyle().color` sebagai `rgba()`
menghasilkan angka ngawur.

### Aturan copy

Jangan pakai konstruksi "X, bukan Y" berulang. Pola itu pernah dipakai 14 kali
dan itulah yang bikin halaman terbaca sebagai tulisan mesin. Sekarang tiap
baris menyebut apa yang terjadi. Kontras hanya dipakai satu kali, di judul
section kepemilikan ("Bukan numpang di platform orang lain"), tempat kontras
itu memang argumennya.

Tidak ada em dash di string yang dirender.

### `OrderSim.jsx`

Klik produk (badge keranjang naik, `+1` melayang) sampai order masuk dashboard,
status Baru lalu Diproses, notifikasi WhatsApp, badge "+1 order baru" di kepala
dashboard. Panelnya ditumpuk vertikal supaya muat di kolom kanan hero.

- Struk terbang diukur dari `getBoundingClientRect()` asli dan meng-commit
  order di `onAnimationComplete`. Jangan ganti dengan timeout.
- Autoplay jalan sekali, hanya saat terlihat, berhenti pada klik pertama.
- `prefers-reduced-motion` langsung ke keadaan akhir.

### Aset produk

`FoodArt.jsx` berisi gambar katalog sebagai SVG duotone. **Belum ada foto
produk atau screenshot aplikasi asli di repo ini**, dan
`ordistore.studioharel.id` diblokir policy jaringan lingkungan build (403 di
CONNECT). Kalau foto asli tersedia, tukar isi `FoodArt.jsx`.

### Batas jujur yang wajib dipertahankan

- QRIS: nominal otomatis, **verifikasi tetap manual**. Disebut di langkah
  "Bayar QR" pada FlowTabs dan di fitur paket Ordi + Bayar.
- Hosting/maintenance opsional tapi **bukan nol**, disebut di catatan harga dan
  FAQ #3.
- Ordi tidak instan; disebut di FAQ #1 dan baris "Waktu mulai" pada tabel.
- Tier tengah memakai **"Rekomendasi kami"**. Brief sempat menyebut "Paling
  sering masuk akal" dan versi sebelumnya sempat memakai "Paling sering
  dipakai"; keduanya terbaca sebagai klaim popularitas dan belum ada basis
  kliennya.
- Tidak ada testimoni, logo klien, jumlah pengguna, atau angka hasil.

### Terverifikasi

Build dan lint bersih. Nol horizontal overflow dan nol page error di
320/375/390/414/768/1024/1280/1920. Nol kegagalan kontras WCAG AA. Semua
elemen interaktif lewat 44px. 10 CTA hidup, nol link mati, tiap CTA WA membawa
pesan prefilled sesuai konteks. Tab demo bisa dipakai mouse dan panah
kiri/kanan. FAQ tertutup semua saat load. Anchor `#paket` mendarat di 80px
(tidak ketutup nav). Reduced motion mendarat di keadaan akhir. Simulasi diuji
manual: geprek Rp28.000 plus ongkir Cipete Rp14.000 jadi Rp42.000.

Copy turun dari 779 ke 574 kata (**26%**), di bawah target brief 35-45%. Sisa
copy-nya harga, angka, dan empat pengungkapan jujur di atas; memangkas lagi
berarti membuang isi yang diminta brief itu sendiri.

### Catatan buat pass berikutnya

Tiga hipotesis A/B yang paling layak diuji ada di ringkasan commit
`Rebuild landing page for conversion`.
