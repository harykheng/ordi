// Konten versi alternatif (branch landing-alternatif).
// Halaman disusun ngikutin alur bisnis: sebelum order masuk, saat order
// masuk, setelah order selesai, lalu cara mulai dan harga.
import { DEMO_URL, WHATSAPP_CTA_LINK } from "./content";

export { DEMO_URL, WHATSAPP_CTA_LINK };

export const HERO = {
  eyebrow: "Sistem order untuk bisnis makanan",
  headline: "Udah punya bisnis sendiri. Harusnya punya sistem sendiri juga.",
  sub: "Dibangun ngikutin cara tokomu kerja, lalu jadi milik tokomu sepenuhnya. Sistem, domain, dan datanya atas nama kamu sendiri.",
  primary: "Coba alurnya",
  secondary: "Lihat paket",
  micro: "Simulasi dengan data contoh.",
};

export const BEFORE = {
  title: "Alur tokomu",
  items: [
    "Order masuk dari tiga chat berbeda?",
    "Pelanggan masih tanya menu yang sama?",
    "Rekap malam masih dari screenshot dan nota?",
  ],
  payoff: "Yang kamu ceritain itu yang dibangun, khusus buat tokomu.",
};

export const WHEN = {
  title: "Nama tokomu",
  heading: "Order masuk ke alamat tokomu sendiri, sudah lengkap.",
  points: [
    {
      title: "Alamatnya atas nama tokomu",
      body: "Domain dan hostingnya bisa ada di akun tokomu sendiri.",
    },
    {
      title: "Ordernya sampai utuh",
      body: "Produk, jumlah, alamat, dan ongkirnya ikut semua.",
    },
    {
      // Batas jujur QRIS. Nominalnya otomatis, verifikasinya nggak.
      // Kalimat kedua wajib ada di sini, jangan dipindah atau dihapus.
      title: "Nominal QR-nya ikut total order",
      body: "Nominalnya otomatis sesuai total. Verifikasi bukti transfernya tetap manual, kamu sendiri yang cek.",
    },
  ],
};

export const AFTER = {
  title: "Akun tokomu",
  body: "Order, pelanggan, dan rekapnya ada di akunmu.",
  lead: "Tercatat sendiri tiap hari. Pas tutup, rekapnya tinggal dibuka.",
};

export const START_STEPS = [
  {
    title: "Cerita alur tokomu",
    body: "Lewat WhatsApp. Ceritain gimana tokomu terima pesanan sekarang.",
  },
  {
    title: "Kami bangun sistemnya",
    body: "Ngikutin alur yang tadi kamu ceritain.",
  },
  {
    title: "Toko onlinemu jalan",
    body: "Link-nya kamu sebar, order mulai masuk.",
  },
];

export const ALT_PRICING_TIERS = [
  {
    id: "dasar",
    name: "Ordi Dasar",
    tagline: "Buat mulai berhenti nyatet manual.",
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
    tagline: "Buat toko yang sudah melayani delivery.",
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
    tagline: "Buat volume order yang lebih tinggi.",
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

export const ALT_FAQ = [
  {
    q: "Apa bedanya dengan platform sewaan?",
    a: "Platform sewaan dipakai bareng banyak toko dan kamu bayar bulanan buat numpang. Ordi dibangun ngikutin alur tokomu, jadi nggak bisa jadi dalam hitungan menit.",
  },
  {
    q: "Sistem dan datanya milik saya?",
    a: "Iya. Sistem, domain, hosting, dan datanya bisa ada di akun kamu sendiri.",
  },
  {
    q: "Kenapa masih ada biaya bulanan?",
    a: "Opsional, buat hosting, domain, dan perawatan server. Kamu boleh urus sendiri. Yang pasti, biaya hosting dan domain memang nggak nol setelah pembelian.",
  },
  {
    q: "Bisa mulai kecil lalu upgrade?",
    a: "Bisa. Tinggal bayar selisihnya, tanpa bangun ulang dari nol.",
  },
];

export const FINAL = {
  title: "Cerita dulu soal tokomu.",
  body: "Kita mulai dari bagian yang paling bikin repot sekarang.",
  cta: "Ceritakan toko saya",
  micro: "Tidak perlu langsung membeli.",
};
