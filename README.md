# Ordi

Landing page portofolio Studio Harel untuk **Ordi** ("Order Disini") — sistem
pesan-antar custom yang dibangun ulang per klien untuk kafe & resto UMKM F&B
Indonesia.

Ini bukan produk self-serve/SaaS. Positioning-nya "kepemilikan & custom-build",
bukan "chat chaos ke satu sistem" — sengaja dijaga jarak dari kompetitor
sejenis yang jualan platform sewa serba-instan (lihat `CLAUDE.md` untuk daftar
aturan anti-kemiripannya). Tujuan halaman ini nunjukin kapabilitas Studio
Harel ke calon klien F&B, dengan CTA akhir ke WhatsApp buat diskusi custom
project.

## Stack

- React 19 + Vite 8
- Tailwind CSS v4 (`@theme` token di `src/index.css`)
- Framer Motion

## Branch

- `main` — production, live di Cloudflare Pages. Jangan disentuh langsung
  tanpa instruksi eksplisit.
- `landing-first` — snapshot beku versi lama (framing "chat chaos"). Jangan
  diubah lagi, cuma buat pembanding.
- `landing-second` — rebuild dengan framing kepemilikan, design system
  doodle/cream. Belum di-merge ke `main`.
- `landing-alternatif` — versi alternatif yang product-led, dicabang dari
  `landing-second` buat dibandingin head-to-head. Harga, link, dan semua fakta
  bisnisnya sama; yang beda struktur, urutan, copy, palet (espresso/cream/
  coral), dan tipografi (Fraunces + Plus Jakarta Sans).

### Versi alternatif

Halaman yang dirender di branch ini ada di `src/components/alt/*`, datanya di
`src/data/altContent.js`. Komponen `landing-second` sengaja **nggak dihapus**
(masih di `src/components/*.jsx`, nggak dirender) supaya dua pendekatan gampang
dibandingin. Alur halamannya: masalah → solusi → bukti visual → harga → CTA,
dengan CTA WhatsApp di header, hero, tiap kartu paket, CTA penutup, plus sticky
button khusus mobile.

Detail konvensi desain, struktur section, dan aturan positioning ada di
`CLAUDE.md`.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy (Cloudflare Pages)

Repo ini pakai produk "Workers & Pages" Cloudflare yang butuh dua file di
root:

- `wrangler.jsonc` — `assets.directory` nunjuk ke `./dist`, tanpa ini build
  gagal dengan error "Missing entry-point to Worker script or to assets
  directory".
- `.node-version` — pin versi Node buat build image Cloudflare. Vite 8 butuh
  `^20.19.0 || >=22.12.0`, dan Cloudflare Pages **tidak** baca `engines` di
  `package.json`, cuma `.nvmrc`/`.node-version`.

## Analytics

Google Analytics (GA4) via `gtag.js`, measurement ID `G-GSPM07JL7N`, snippet
ada di `index.html`. Event custom (`klik_wa`, `klik_demo`, dst) di-track pakai
`window.gtag?.(...)` di tombol-tombol CTA supaya tetap aman kalau script GA
belum load atau kena ad-blocker.
