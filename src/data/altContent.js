// Konten versi alternatif (branch landing-alternatif).
// Alur halaman: MASALAH → SOLUSI → BUKTI VISUAL → HARGA → CTA.
// Angka harga & link di sini identik dengan versi landing-second,
// yang berubah cuma urutan, framing, dan panjang copy.
import { DEMO_URL, WHATSAPP_CTA_LINK } from "./content";

export { DEMO_URL, WHATSAPP_CTA_LINK };

const WA_NUMBER = "6281292567788";

// Tiap CTA bawa konteks sendiri ke WhatsApp, jadi chat masuk udah
// ketahuan datang dari section mana tanpa perlu nanya ulang.
export function waLink(message) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const POSITIONING =
  "Website pesan online untuk UMKM F&B yang ingin berhenti mengandalkan chat sebagai kasir.";

export const TRUST_POINTS = [
  {
    title: "Sistem milik bisnismu",
    body: "Dibangun atas nama bisnis kamu, bukan disewa per bulan dari platform orang lain.",
  },
  {
    title: "Data dan alur pesanan lebih rapi",
    body: "Order, alamat, dan total pembayaran tercatat di satu tempat, bukan tersebar di chat.",
  },
  {
    title: "Bisa mulai dari yang paling dibutuhkan",
    body: "Nggak harus ambil paket lengkap di awal. Fitur bisa ditambah belakangan.",
  },
];

export const PROBLEMS = [
  {
    title: "Pesanan tenggelam",
    body: "Chat baru menutupi order lama. Yang belum diproses ketutup sendiri.",
  },
  {
    title: "Salah catat",
    body: "Harga, jumlah, alamat, atau ongkir gampang kelewat pas lagi rame.",
  },
  {
    title: "Pelanggan tanya terus",
    body: "Menu, stok, ongkir, total, dan status pesanan masih dijawab satu-satu.",
  },
];

export const STEPS = [
  {
    n: "01",
    title: "Pelanggan buka katalog",
    body: "Menu, harga, dan stok kelihatan sendiri tanpa kamu ketik ulang.",
    visual: "CATALOG",
  },
  {
    n: "02",
    title: "Pilih produk, isi alamat",
    body: "Pelanggan yang ngetik alamatnya sendiri, jadi nggak salah dengar.",
    visual: "ADDRESS",
  },
  {
    n: "03",
    title: "Total dan ongkir muncul",
    body: "Sistem yang hitung, sebelum checkout, bukan kamu sambil masak.",
    visual: "TOTAL",
  },
  {
    n: "04",
    title: "Pesanan masuk ke dashboard",
    body: "Order tercatat rapi dan notifikasinya nyampe ke WhatsApp kamu.",
    visual: "ORDER_IN",
  },
];

export const FEATURES = [
  {
    title: "Katalog online",
    body: "Harga dan stok bisa dilihat pelanggan tanpa kamu ketik berulang kali.",
    tag: "Katalog",
  },
  {
    title: "Pesanan lebih rapi",
    body: "Semua order tercatat dan bisa dipantau dari dashboard, lengkap sama statusnya.",
    tag: "Pesanan",
  },
  {
    title: "Ongkir otomatis",
    body: "Pelanggan mengisi alamat sendiri dan pilihan ongkir muncul sebelum checkout.",
    tag: "Pengiriman",
  },
  {
    title: "QRIS sesuai nominal",
    body: "Nominal QR dibuat mengikuti total pesanan. Verifikasi pembayaran tetap dilakukan manual oleh admin.",
    tag: "Pembayaran",
  },
  {
    title: "Notifikasi WhatsApp",
    body: "Pesanan baru lebih mudah diketahui tanpa menggali chat lama.",
    tag: "Notifikasi",
  },
];

export const BEFORE_AFTER = {
  before: [
    "Chat berantakan",
    "Jawab pertanyaan berulang",
    "Hitung ongkir manual",
    "Cari bukti transfer",
    "Rekap dari nota",
  ],
  after: [
    "Katalog bisa dilihat sendiri",
    "Order masuk terstruktur",
    "Ongkir muncul otomatis",
    "Nominal pembayaran jelas",
    "Rekap tersedia di dashboard",
  ],
};

export const OWNERSHIP_POINTS = [
  {
    title: "Atas nama bisnis kamu",
    body: "Sistem dan datanya berada di bawah bisnis kamu, bukan nempel di akun platform lain.",
  },
  {
    title: "Domain dan hosting sendiri",
    body: "Bisa pakai identitas bisnismu, bukan subdomain bawaan yang dipakai ribuan toko.",
  },
  {
    title: "Alur ngikutin cara kerjamu",
    body: "Dibangun dari cara bisnismu jalan sekarang, bukan dari template yang harus kamu ikuti.",
  },
  {
    title: "Bisa berkembang bertahap",
    body: "Mulai dari fitur yang paling kepake, tambah yang lain kalau memang sudah butuh.",
  },
];

export const ALT_PRICING_TIERS = [
  {
    name: "Ordi Dasar",
    tagline: "Buat mulai berhenti nyatet manual di WhatsApp.",
    price: "Rp2.500.000",
    priceNote: "sekali bayar",
    retainer: "Rp100.000/bulan opsional, hosting dan maintenance",
    featuresLabel: "Yang kamu dapat:",
    features: [
      "Katalog produk online",
      "Kelola pesanan",
      "Dashboard admin",
      "Rekap harian",
      "Notifikasi WhatsApp",
    ],
    cta: "Tanya Ordi Dasar",
    highlight: false,
  },
  {
    name: "Ordi + Antar",
    tagline: "Buat bisnis yang sudah melayani delivery.",
    price: "Rp4.000.000",
    priceNote: "sekali bayar",
    retainer: "Rp125.000/bulan opsional, hosting dan maintenance",
    featuresLabel: "Semua di Ordi Dasar, plus:",
    features: [
      "Alamat pelanggan diisi sendiri",
      "Perhitungan ongkir",
      "Pilihan layanan antar",
    ],
    cta: "Tanya Ordi + Antar",
    highlight: true,
  },
  {
    name: "Ordi + Bayar",
    tagline: "Buat volume pesanan yang sudah lebih tinggi.",
    price: "Rp5.000.000",
    priceNote: "sekali bayar",
    retainer: "Rp125.000/bulan opsional, hosting dan maintenance",
    featuresLabel: "Semua di Ordi + Antar, plus:",
    features: [
      "QR pembayaran custom nominal",
      "Nominal mengikuti total order",
      "Verifikasi pembayaran tetap manual",
    ],
    cta: "Tanya Ordi + Bayar",
    highlight: false,
  },
];

export const ALT_COMPARISON = {
  columns: [
    { key: "manual", label: "Manual via WhatsApp" },
    { key: "sewa", label: "Sewa platform" },
    { key: "ordi", label: "Sistem sendiri (Ordi)" },
  ],
  rows: [
    {
      label: "Biaya",
      manual: "Nggak ada biaya tool, tapi kepakai di waktu dan salah hitung.",
      sewa: "Biaya bulanan jalan terus selama sistem dipakai.",
      ordi: "Bayar sekali di awal. Hosting dan maintenance opsional.",
    },
    {
      label: "Kepemilikan",
      manual: "Data pesanan tersebar di chat dan nggak terstruktur.",
      sewa: "Sistem dan data nempel di platform penyedia.",
      ordi: "Sistem dan data ada di bawah bisnis kamu.",
    },
    {
      label: "Kustomisasi",
      manual: "Bebas, tapi semuanya dikerjakan manual.",
      sewa: "Ikut template dan fitur yang disediakan.",
      ordi: "Dibangun ngikutin alur bisnis kamu.",
    },
    {
      label: "Waktu mulai",
      manual: "Langsung, karena memang belum ada sistem.",
      sewa: "Cepat, tinggal daftar dan pakai template.",
      ordi: "Butuh waktu, karena kita ngobrol dulu sebelum bangun.",
    },
  ],
};

export const ALT_FAQ = [
  {
    q: "Apa bedanya Ordi dengan platform sewaan?",
    a: "Platform sewaan itu satu sistem yang dipakai bareng banyak toko, dan kamu bayar bulanan buat numpang di sana. Ordi dibangun khusus buat bisnis kamu, ngikutin alur yang kamu pakai sehari-hari, dan setelah lunas sistemnya jadi milik bisnismu. Konsekuensinya, Ordi nggak bisa langsung jadi dalam hitungan menit seperti daftar akun.",
  },
  {
    q: "Apakah sistem dan data benar-benar menjadi milik saya?",
    a: "Iya. Sistem dibangun atas nama bisnis kamu, dan domain, hosting, serta datanya bisa berada di akun kamu sendiri. Kalau suatu saat kamu mau pindah pengelola atau ngurus sendiri, sistemnya tetap jalan karena nggak nyantol ke langganan kami.",
  },
  {
    q: "Kenapa masih ada biaya bulanan?",
    a: "Biaya bulanan itu opsional dan bukan biaya sewa sistem. Itu buat hosting, domain, dan perawatan: server tetap jalan, ada yang benerin kalau ada error, dan ada yang ngingetin sebelum masa aktif domain habis. Kalau kamu mau urus sendiri, silakan, sistemnya tetap milik kamu. Yang jelas, biaya hosting dan domain memang nggak nol setelah pembelian, dan kami lebih baik bilang di depan.",
  },
  {
    q: "Apakah verifikasi QRIS otomatis?",
    a: "Nggak. Yang otomatis itu nominal QR-nya, jadi selalu pas sesuai total pesanan dan pelanggan nggak perlu nanya harus transfer berapa. Pengecekan bukti bayarnya masih dilakukan manual oleh admin, karena verifikasi otomatis butuh payment gateway berbayar yang bikin biaya naik cukup jauh.",
  },
  {
    q: "Berapa lama sampai sistem bisa digunakan?",
    a: "Nggak instan. Kita ngobrol dulu soal cara kerja bisnis kamu, baru sistemnya dibangun. Estimasi waktunya baru bisa dikasih setelah kebutuhanmu jelas, karena beda kebutuhan beda pengerjaan. Kalau kamu butuh yang bisa langsung online hari ini juga, jujur aja Ordi bukan pilihan yang tepat.",
  },
  {
    q: "Bisa upgrade paket nanti?",
    a: "Bisa. Dari Ordi Dasar ke + Antar atau + Bayar tinggal bayar selisihnya. Sistemnya memang dibangun supaya fitur bisa ditambah belakangan tanpa pindah platform atau bangun ulang dari nol.",
  },
  {
    q: "Apakah harus langsung membeli paket lengkap?",
    a: "Nggak harus. Banyak yang lebih masuk akal mulai dari yang paling bikin repot sekarang, misalnya katalog dan pencatatan pesanan dulu, baru nambah ongkir atau pembayaran kalau volume pesanannya sudah nambah.",
  },
];
