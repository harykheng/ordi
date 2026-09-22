// Konten versi alternatif (branch landing-alternatif).
// Konsepnya: dari chat yang berantakan jadi order yang masuk sendiri.
// Harga dan link diambil dari content.js biar satu sumber.
import { DEMO_URL, WHATSAPP_CTA_LINK } from "./content";

export { DEMO_URL, WHATSAPP_CTA_LINK };

export const HERO = {
  eyebrow: "Sistem order untuk bisnis makanan",
  headline: "Biar pelanggan pesan sendiri. Kamu fokus bikin produknya.",
  sub: "Katalog, pesanan, ongkir, dan rekap dalam satu sistem yang dibangun mengikuti cara kerja bisnis kamu.",
  primary: "Coba demo interaktif",
  secondary: "Tanya paket yang cocok",
  micro: "Data contoh, bukan toko asli. Tidak perlu daftar.",
};

export const TRUST_CHIPS = [
  "Dibangun sesuai alur bisnis kamu",
  "Sistem dan data bisa di akun kamu",
  "Mulai dari kebutuhan yang paling penting",
];

export const PROBLEMS = [
  {
    title: "Chat menumpuk",
    body: "Pesanan gampang tenggelam di antara chat lain.",
    art: "chat",
  },
  {
    title: "Pertanyaan berulang",
    body: "Menu, harga, stok, dan alamat ditanya lagi dan lagi.",
    art: "tanya",
  },
  {
    title: "Rekap malam",
    body: "Total order masih dihitung dari nota dan riwayat chat.",
    art: "rekap",
  },
];

export const FLOW = [
  {
    id: "katalog",
    tab: "Buka katalog",
    title: "Pelanggan buka katalog",
    body: "Menu, harga, dan stok kelihatan tanpa kamu ketik ulang.",
  },
  {
    id: "alamat",
    tab: "Isi alamat",
    title: "Pelanggan isi alamat sendiri",
    body: "Ongkirnya kehitung dari alamat itu, muncul sebelum dia checkout.",
  },
  {
    id: "bayar",
    tab: "Bayar QR",
    title: "Bayar dengan QR sesuai nominal",
    body: "Nominal QR ngikutin total order.",
    note: "Nominal QR otomatis. Verifikasi bukti pembayaran tetap manual oleh admin.",
  },
  {
    id: "masuk",
    tab: "Order masuk",
    title: "Order masuk ke dashboard",
    body: "Tercatat rapi, dan WhatsApp kamu bunyi.",
  },
];

export const OWNERSHIP = {
  title: "Bukan numpang di platform orang lain.",
  body: "Ordi dibangun untuk bisnis kamu. Sistem, data, dan domain bisa berada di akunmu sendiri.",
  points: [
    "Alur mengikuti bisnis kamu",
    "Bisa mulai kecil dan upgrade belakangan",
    "Tetap jalan kalau berhenti pakai jasa kami",
  ],
};

export const ALT_PRICING_TIERS = [
  {
    id: "dasar",
    name: "Ordi Dasar",
    tagline: "Untuk mulai berhenti mencatat manual di WhatsApp.",
    price: "Rp2.500.000",
    featuresLabel: "Yang kamu dapat:",
    features: [
      "Katalog produk online",
      "Kelola pesanan",
      "Dashboard admin",
      "Rekap harian",
      "Notifikasi WhatsApp",
    ],
    cta: "Mulai dari Dasar",
    highlight: false,
  },
  {
    id: "antar",
    name: "Ordi + Antar",
    tagline: "Untuk bisnis yang sudah melayani delivery.",
    price: "Rp4.000.000",
    featuresLabel: "Semua di Ordi Dasar, plus:",
    features: [
      "Alamat pelanggan diisi sendiri",
      "Perhitungan ongkir",
      "Pilihan layanan antar",
    ],
    cta: "Pilih + Antar",
    highlight: true,
  },
  {
    id: "bayar",
    name: "Ordi + Bayar",
    tagline: "Untuk bisnis dengan volume order lebih tinggi.",
    price: "Rp5.000.000",
    featuresLabel: "Semua di Ordi + Antar, plus:",
    features: [
      "QR pembayaran sesuai nominal",
      "Nominal mengikuti total order",
      "Verifikasi pembayaran tetap manual",
    ],
    cta: "Pilih + Bayar",
    highlight: false,
  },
];

export const PRICING_NOTE =
  "Hosting, domain, dan maintenance opsional mulai Rp100.000/bulan. Ini biaya pengelolaan, bukan sewa sistem.";

export const ALT_COMPARISON = {
  columns: [
    { key: "manual", label: "Manual via WhatsApp" },
    { key: "sewa", label: "Platform sewaan" },
    { key: "ordi", label: "Sistem sendiri dengan Ordi" },
  ],
  rows: [
    {
      label: "Biaya",
      manual: "Nggak ada biaya tool. Yang kebayar waktunya.",
      sewa: "Bulanan, jalan terus selama dipakai.",
      ordi: "Sekali di awal. Pengelolaan opsional.",
    },
    {
      label: "Kepemilikan",
      manual: "Nyangkut di riwayat chat.",
      sewa: "Nempel di platform penyedia.",
      ordi: "Bisa di akun bisnis kamu.",
    },
    {
      label: "Kustomisasi",
      manual: "Bebas, tapi manual semua.",
      sewa: "Ikut template yang disediakan.",
      ordi: "Ngikutin alur kamu sekarang.",
    },
    {
      label: "Waktu mulai",
      manual: "Langsung, memang belum ada sistem.",
      sewa: "Cepat, tinggal daftar.",
      ordi: "Butuh waktu, kita ngobrol dulu.",
    },
  ],
};

export const ALT_FAQ = [
  {
    q: "Apa bedanya Ordi dengan platform sewaan?",
    a: "Platform sewaan dipakai bareng banyak toko dan kamu bayar bulanan buat numpang. Ordi dibangun khusus mengikuti alur bisnis kamu, jadi nggak bisa langsung jadi dalam hitungan menit.",
  },
  {
    q: "Apakah sistem dan data benar-benar menjadi milik saya?",
    a: "Iya. Sistem, domain, hosting, dan datanya bisa berada di akun kamu sendiri. Kalau nanti pindah pengelola, sistemnya tetap jalan.",
  },
  {
    q: "Kenapa masih ada biaya bulanan?",
    a: "Itu opsional, buat hosting, domain, dan perawatan server. Kamu boleh urus sendiri. Yang pasti, biaya hosting dan domain memang nggak nol setelah pembelian.",
  },
  {
    q: "Bisa mulai dari paket kecil lalu upgrade?",
    a: "Bisa. Dari Ordi Dasar ke + Antar atau + Bayar tinggal bayar selisihnya, tanpa bangun ulang dari nol.",
  },
];

export const FINAL = {
  title: "Berhenti jadi admin order sepanjang hari.",
  body: "Ceritakan cara kerja bisnismu. Kita mulai dari bagian yang paling bikin repot sekarang.",
  cta: "Ceritakan bisnis saya",
  micro: "Tidak perlu langsung membeli. Kita cari tahu dulu apakah Ordi memang cocok.",
};
