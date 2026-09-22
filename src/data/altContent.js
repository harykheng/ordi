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
  "Katalog online buat kedai kopi, bakery, dan katering. Pelanggan pesan lewat web, ordernya masuk ke dashboard kamu.";

export const TRUST_POINTS = [
  {
    title: "Sistemnya punya kamu",
    body: "Dibangun atas nama bisnis kamu. Setelah lunas, nggak ada langganan yang bisa matiin.",
  },
  {
    title: "Semua order kecatat",
    body: "Order, alamat, sama totalnya ada di satu tempat yang gampang dibuka lagi besok.",
  },
  {
    title: "Mulainya bisa kecil",
    body: "Ambil yang paling bikin repot sekarang. Sisanya nyusul kalau memang perlu.",
  },
];

// Cara kerja dan fitur digabung: tiap langkah bawa manfaatnya sendiri,
// jadi nggak ada dua section yang ngomongin hal sama dua kali.
export const FLOW = [
  {
    n: "01",
    title: "Pelanggan buka katalog kamu",
    body: "Dia lihat menu, harga, sama stok yang kamu update tadi pagi.",
    fitur: "Katalog online",
  },
  {
    n: "02",
    title: "Dia isi alamatnya sendiri",
    body: "Ongkirnya kehitung dari alamat itu, muncul sebelum dia checkout.",
    fitur: "Ongkir otomatis",
  },
  {
    n: "03",
    title: "Bayar pakai QR",
    body: "Nominalnya udah pas sama total pesanan. Bukti bayarnya masih kamu yang cek satu-satu.",
    fitur: "QRIS sesuai nominal",
  },
  {
    n: "04",
    title: "Ordernya masuk ke kamu",
    body: "Nongol di dashboard, dan WhatsApp kamu bunyi.",
    fitur: "Dashboard dan notifikasi",
  },
];

export const BEFORE_AFTER = {
  before: [
    "Order ketimbun chat baru",
    "Ngetik ulang menu tiap ditanya",
    "Ngira-ngira ongkir sambil masak",
    "Nyari bukti transfer di scroll-an",
    "Rekap malam dari tumpukan nota",
  ],
  after: [
    "Order berderet rapi di dashboard",
    "Pelanggan baca sendiri di katalog",
    "Ongkir kehitung dari alamatnya",
    "Nominal QR-nya udah pas",
    "Rekapnya udah jadi pas tutup",
  ],
};

export const OWNERSHIP_POINTS = [
  {
    title: "Atas nama bisnis kamu",
    body: "Sistem sama datanya ada di akun kamu sendiri.",
  },
  {
    title: "Domain sendiri",
    body: "Bisa pakai nama tokomu, misalnya kopisenja.com.",
  },
  {
    title: "Alurnya ngikut kamu",
    body: "Kalau kamu cuma terima pesanan H-1, sistemnya dibikin begitu.",
  },
  {
    title: "Bisa nambah belakangan",
    body: "Fitur baru dipasang waktu kamu udah butuh, tanpa pindah sistem.",
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
      manual: "Nggak keluar biaya tool. Yang kebayar waktunya kamu.",
      sewa: "Biaya bulanan jalan terus selama sistem dipakai.",
      ordi: "Bayar sekali di awal. Hosting dan maintenance opsional.",
    },
    {
      label: "Kepemilikan",
      manual: "Data pesanan nyangkut di riwayat chat.",
      sewa: "Sistem dan data nempel di platform penyedia.",
      ordi: "Sistem dan data ada di bawah bisnis kamu.",
    },
    {
      label: "Kustomisasi",
      manual: "Bebas, tapi semuanya dikerjakan manual.",
      sewa: "Ikut template dan fitur yang sudah disediakan.",
      ordi: "Dibangun ngikutin alur kamu sekarang.",
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
