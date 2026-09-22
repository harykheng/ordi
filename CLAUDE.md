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

Halaman ini mini product demo, bukan artikel. Susunannya ngikutin alur bisnis
pemilik toko, dan simulasi di hero yang bawa argumennya.

### Struktur (`App.jsx`)

```
AltHeader    — sticky, blur tipis setelah scroll; nav: Cara kerja (#saat),
               Harga (#paket), CTA "Coba demonya"
AltHero      — judul hasil + OrderSim; CTA "Coba alurnya" (#alur) dan
               "Lihat paket" (#paket)
BeforeOrder  — "Sebelum order masuk": tiga pertanyaan pemilik toko, tipografis
WhenOrder    — "Saat order masuk": tiga poin + satu kartu order
AfterOrder   — "Setelah order selesai": satu panel rekap harian
ThreeSteps   — "Cuma tiga langkah untuk mulai" + CTA WhatsApp
PriceSheet   — 3 pricing card, yang tengah elevated
AltFAQ       — 4 pertanyaan, semua tertutup saat load
AltFinalCTA  — CTA besar ke WhatsApp + footer
```

Section yang **dihapus** karena cuma mengulang: `TrustChips`, `OwnershipNote`,
`AltComparison`, `FlowTabs`, `Problems`, `BeforeAfter`, `LedgerSwap`,
`ProblemSpike`, `Paper`. Jangan dihidupkan lagi. Fakta kepemilikan yang masih
perlu ada sekarang tinggal di FAQ nomor dua, biaya hosting di catatan harga
dan FAQ nomor tiga.

Anchor nav `#cara-kerja` sudah nggak ada. Kalau menambah section, cek lagi
anchor di `AltHeader.jsx`; ini pernah putus sekali waktu `FlowTabs` dihapus.

### Gerak: "satu order berjalan sampai selesai"

Bahasa geraknya satu: **benda ringan yang dipindahkan di atas meja kerja.**
Berangkat cepat, mendarat pelan, nggak ada yang memantul. Tokennya di
`src/lib/motion.js` (`EASE_MOVE`, `EASE_ENTER`, `DUR`). Pakai token itu,
jangan nulis durasi dan easing baru di komponen.

#### `src/data/demoOrder.js` adalah satu-satunya sumber angka

Menu, zona antar, keadaan dashboard, dan order contoh semuanya di situ.
`OrderSim`, `BeforeOrder`, `WhenOrder`, dan `AfterOrder` baca dari sana.
**Jangan nulis angka rupiah harfiah di komponen.** Sebelum ini Rp67.000
ditulis di tiga tempat dan sekali ganti harga bikin ketiganya salah.

Angkanya saling ngunci, dan ini rantainya:

```
Kopi Susu Gula Aren 24.000 + Matcha Latte 25.000 = subtotal 49.000
+ ongkir Kemang Raya 18.000                      = total   67.000
dashboard 12 order / 540.000  ->  13 order / 607.000
```

Harga menu dari klien: 24.000 / 19.000 / 25.000. Total order contoh dan
kenaikan omzet dua-duanya harus 67.000. Dengan harga itu **nggak ada**
kombinasi yang bisa ninggalin ongkir Rp9.000 yang lama, jadi ongkir Kemang
dinaikin ke Rp18.000 dan isi ordernya jadi satu kopi plus satu matcha. Kalau
harga menu diubah lagi, cek ulang bahwa `CONTOH_ORDER.total` masih bulat dan
masih cocok sama cerita di halaman.

Tiga order lama di `DASHBOARD_BASE.rows` juga beneran keluar dari harga menu
plus ongkir Kemang, bukan angka karangan.

#### `OrderSim.jsx` — empat tahap

Katalog, Ringkasan, Bayar, Dashboard. Penunjuk tahap di atas **cuma penunjuk,
bukan tombol**; yang majuin alur itu satu tombol di bar bawah.

**Nggak ada autoplay.** Yang bikin kartunya kebaca bisa diketuk itu bentuknya:
tiap kartu produk punya tombol `+ Tambah` yang kelihatan, `cursor: pointer`,
badge jumlah di pojok gambar, dan bayangan yang naik selama jari nempel.
Jangan balik ke cara lama yang cuma ngandelin kalimat "ketuk produknya".

Urutan kejadiannya, dan tiap langkah sengaja nunggu langkah sebelumnya:

1. Ketuk produk, kartunya terbang ke ikon keranjang.
2. **Keranjangnya baru nambah waktu kartunya mendarat**, bukan waktu diketuk.
   Yang mindahin itu `flight.commit`, dipanggil di `onAnimationComplete`.
   Jadi badge, jumlah item, dan totalnya berubah di ujung gerak.
3. Muncul umpan balik kecil "<produk> ditambahkan", hilang sendiri 1,4 detik.
4. Tombol `Lanjutkan order` muncul dengan fade plus geser pendek. Sebelum ada
   isi, tempatnya diisi kalimat petunjuk, bukan tombol mati.
5. Ringkasan: item, pin alamat, subtotal, ongkir. Ganti alamat, totalnya ikut.
6. Bayar: label "Nominal pembayaran", nominal ikut total, plus catatan jujur
   bahwa verifikasi bukti pembayaran tetap manual.
7. `Kirim pesanan` mindahin kartu order **84px ke bawah**, ke arah panel
   dashboard. Sengaja pendek; terbang jauh melintasi kotak kebaca murahan.
8. Dashboard: badge "Order baru masuk" berdenyut sekali, order barunya masuk
   di paling atas dengan status Baru, angkanya naik 12 ke 13 dan 540.000 ke
   607.000, lalu statusnya jalan sendiri Baru, Diproses, Selesai.
9. Tombol terakhir `Ulangi simulasi` balikin semuanya ke keadaan awal.

**Panel dashboard nggak boleh pernah nampilin 0 order atau Rp0.** Dia selalu
mulai dari `DASHBOARD_BASE`; order baru cuma nambah di atas daftar. Bar bawah
boleh Rp0, itu keranjang yang memang masih kosong.

Cuma boleh ada satu benda terbang dalam satu waktu. `add()` dan `kirim()`
dua-duanya mulai dengan `if (flight) return;`. Tanpa itu dua ketukan cepat
bisa menghapus satu `commit`.

Jarak terbang kartu produk diukur dari `getBoundingClientRect()` asli, jadi
tetap benar di lebar layar apa pun.

#### Angka bergulir

`useRollingNumber` dan `useCountUp` di `src/lib/useCountUp.js` punya parameter
`step`. **Angka rupiah selalu pakai step 500 atau 1000.** Tanpa itu nominalnya
sempat lewat angka seperti Rp606.020, dan angka uang yang begitu kebaca
ngawur walaupun hasil akhirnya benar.

#### Gerak waktu discroll

Cuma tiga, dan masing-masing sekali jalan (`useInView` dengan `once: true`):

- `BeforeOrder`: tiga chat bubble masuk dengan jeda 90ms, berhenti sebentar,
  lalu tiap barisnya crossfade jadi tiga kartu order rapi. Barisnya
  tinggi tetap, jadi pergantiannya nggak nggeser layout.
- `WhenOrder`: status kartu ordernya jalan sekali Baru, Diproses, Selesai.
- `AfterOrder`: angka 12 dan Rp540.000 naik dari nol sekali.

Jangan bikin tiap heading, kartu, dan bullet terbang dari arah beda-beda.

#### Microinteraction

Ada di `index.css`, bukan ditulis ulang per komponen:

- `.press` tekan jadi `scale(0.96)`.
- `.lift` naik 2px waktu ditunjuk kursor, `.lift-card` naik 4px.
- `.cta` bayangannya menghangat waktu ditunjuk kursor.
- `.tapcard` bayangannya naik selama jari masih nempel, plus
  `[data-on="true"]` buat cincin koral waktu produknya kepilih.

**Semua hover dikurung `@media (hover: hover)`.** Di layar sentuh hover bisa
nyangkut sampai ketukan berikutnya, dan itu kebaca sebagai bug.

`.lift` sengaja pakai properti `translate`, bukan `transform`, supaya nggak
tabrakan sama `scale` punya `.press` di elemen yang sama.

Tailwind v4 **nggak lagi** maksa `cursor: pointer` di tombol, jadi ada aturan
sendiri di `index.css` buat `button:not(:disabled)` dan `summary`. Jangan
dihapus; tanpa itu kartu produk nggak kebaca bisa diklik di desktop.

#### `prefers-reduced-motion`

Dihormati lewat `useReducedMotion()` di komponen dan satu blok di
`index.css`. Keadaannya **langsung diganti**, nggak ada animasi panjang:

- Ketuk produk langsung nambah keranjang, tanpa kartu terbang.
- `Kirim pesanan` langsung mendarat di dashboard dengan angka akhirnya.
- Angka rekap langsung di nilainya (`useCountUp` dengan `ms = 0` mulai dari
  target, jadi nggak ada kedip nol).
- Chat di `BeforeOrder` langsung berbentuk kartu order.
- Status kartu di `WhenOrder` diam di "Baru".
- Hover cuma ganti warna dan bayangan, nggak naik.

### Visual

Off-white `cream`, band `sand`, satu aksen kuat `coral` khusus CTA, garis tipis
`border-espresso/12` buat pemisah, bayangan lembut lewat `.surface`, radius
konsentris, tipografi besar. Panduannya dari
`github.com/WatermelonCorp/watermelon-platform`
(`skills/make-interfaces-feel-better`).

Gambar harus menjelaskan produk: kartu order, katalog, status order, struk,
pin alamat, notifikasi order baru, dashboard. Nggak ada dekorasi generik.

**Lantai kontras teks di latar terang: `text-espresso/80`.** Ukur kontras
dengan melukis warna computed di canvas; Tailwind v4 mengompilasi opacity ke
`color-mix()`, jadi mem-parse `getComputedStyle().color` sebagai `rgba()`
menghasilkan angka ngawur.

### CTA dan tracking (`src/lib/track.js`)

Satu pintu buat nomor WA (`6281292567788`), pesan prefilled, dan event.
Tiap handler ngirim dua nama event sekaligus: nama lama (`klik_wa`,
`klik_demo`, `klik_tier`) supaya masih bisa dibandingin sama `landing-second`,
dan nama baru sesuai brief (`hero_demo_click`, `demo_step_click`,
`pricing_cta_click`, `final_whatsapp_click`). Jangan hapus salah satunya.

CTA hero sekarang dua-duanya anchor internal, jadi **jalur WhatsApp di desktop
cuma ada di ThreeSteps, pricing, dan CTA penutup**. Di mobile masih ada sticky
bar. Ini konsekuensi dari brief, layak diawasi kalau klik WA turun.

Catatan verifikasi: `index.html` mendefinisikan `window.gtag` inline, jadi
menimpa spy `gtag` lewat `addInitScript` Playwright nggak akan kebaca. Periksa
`window.dataLayer`.

### Aturan copy

Jangan pakai konstruksi "X, bukan Y" berulang. Pola itu pernah dipakai 14 kali
dan itu yang bikin halaman kebaca sebagai tulisan mesin. Pakai bahasa pemilik
toko: "Order masuk dari tiga chat berbeda?", "Masukkan sekali, dipakai terus."
Nggak ada em dash di string yang dirender.

### Batas jujur yang wajib dipertahankan

- QRIS: nominal otomatis, **verifikasi tetap manual**. Disebut di layar Bayar
  pada simulasi, di poin ketiga `WhenOrder`, dan di fitur paket Ordi + Bayar.
- Hosting/maintenance opsional tapi **bukan nol**: catatan harga dan FAQ #3.
- Ordi nggak instan: FAQ #1.
- Tier tengah pakai **"Rekomendasi kami"**, bukan klaim popularitas.
- Angka di mockup (12 order, Rp540.000, dst) dilabeli "Contoh tampilan".
- Nggak ada testimoni, logo klien, jumlah pengguna, atau angka hasil.

### Terverifikasi

66 pemeriksaan browser lolos semua. `npm run lint` dan `npm run build` bersih.

- Keadaan awal: 0 item, Rp0, hint "Ketuk produknya dulu", panel dashboard
  belum dirender. Harga ketiga produk benar, tiap kartu punya label "Tambah",
  `cursor: pointer` kebaca.
- Alur kanonik: ketuk Kopi dan Matcha, subtotal Rp49.000, ongkir Rp18.000,
  total Rp67.000, nominal pembayaran Rp67.000, kirim, order `#0232` masuk
  dengan status Baru, angka 12 ke 13 dan Rp540.000 ke Rp607.000, status jalan
  sampai Selesai, `Ulangi simulasi` balik ke keadaan awal. Nggak pernah ada
  Rp0 di panel dashboard.
- Ketiga produk diketuk satu-satu, keranjang naik 1, 2, 3 dan totalnya
  Rp86.000.
- Reduced motion: semuanya langsung, dashboard langsung di 13 / Rp607.000.
- Keyboard: kartu produk jalan lewat Enter, cincin fokus kelihatan.
- Scroll: chat bubble masuk duluan lalu jadi tiga kartu order; status kartu
  jalan Baru ke Selesai; rekap berhenti di 12 / Rp540.000.
- 320/360/375/390/414/768/1024/1280/1920: nol horizontal overflow. CLS 0,0000
  di 375px. Semua tombol dan tautan lewat 44px. Di 390px seluruh alur jalan
  lewat tap, dan kartu simulasinya nggak keluar layar.
- Nol kegagalan kontras WCAG AA di dua belas keadaan (tiap tahap simulasi,
  tiap section, FAQ terbuka). Ukur pas animasinya sudah diam; elemen yang
  masih di tengah transisi ngasih rasio palsu.
- 6 tautan WhatsApp, nomor sama semua, nol tautan mati, harga utuh, FAQ
  tertutup saat load, anchor `#paket` dan `#saat` mendarat di 80px.
- Nol galat halaman asli. Yang muncul di sandbox cuma kegagalan jaringan buat
  font dan analytics, dan itu diblokir policy.

**Project ini nggak punya script `typecheck` maupun `test`** (`package.json`
cuma punya dev, build, lint, preview; nggak ada TypeScript). Lint plus build
yang jadi gerbangnya, sisanya pengujian browser sekali jalan. `playwright`
dipasang dan dicopot per sesi pakai `--no-save`, jangan ditinggal di
`package.json`.
