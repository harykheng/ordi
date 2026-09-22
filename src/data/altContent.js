// Konten versi alternatif (branch landing-alternatif).
// Halaman disusun ngikutin alur bisnis: sebelum order masuk, saat order
// masuk, setelah order selesai, lalu cara mulai dan harga.
import { DEMO_URL, WHATSAPP_CTA_LINK } from "./content";

export { DEMO_URL, WHATSAPP_CTA_LINK };

export const HERO = {
  eyebrow: "Sistem order untuk bisnis makanan",
  headline: "Semua pesanan tokomu, masuk rapi di satu tempat.",
  sub: "Pelanggan melihat katalog dan memesan sendiri. Kamu menerima order yang sudah jelas, tanpa mencari-cari lagi di chat.",
  primary: "Coba alurnya",
  secondary: "Lihat paket",
  micro: "Simulasi dengan data contoh.",
};

export const BEFORE = {
  title: "Sebelum order masuk",
  items: [
    "Order masuk dari tiga chat berbeda?",
    "Pelanggan masih tanya menu yang sama?",
    "Rekap malam masih dari screenshot dan nota?",
  ],
  payoff: "Masukkan sekali, dipakai terus.",
};

export const WHEN = {
  title: "Saat order masuk",
  points: [
    {
      title: "Ordernya sudah lengkap",
      body: "Produk, jumlah, alamat, dan total ikut semua.",
    },
    {
      title: "Ongkirnya sudah kehitung",
      body: "Dihitung dari alamat yang pelanggan isi sendiri.",
    },
    {
      title: "Nominal QR-nya sudah pas",
      body: "Ikut total order. Bukti bayarnya kamu yang cek.",
    },
  ],
};

export const AFTER = {
  title: "Setelah order selesai",
  body: "Semua order hari ini tercatat sendiri. Pas tutup, rekapnya tinggal dibuka.",
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
