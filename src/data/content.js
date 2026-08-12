export const DEMO_URL = "{{DEMO_URL}}";
export const WHATSAPP_CTA_LINK = "{{WHATSAPP_CTA_LINK}}";

export const CONTOH_TOKO = [
  "{{CONTOH_NAMA_TOKO_1}}",
  "{{CONTOH_NAMA_TOKO_2}}",
  "{{CONTOH_NAMA_TOKO_3}}",
  "{{CONTOH_NAMA_TOKO_4}}",
];

export const TIMELINE = [
  {
    time: "07:00",
    label: "Sebelum Buka",
    pain: "Nulis ulang stok tiap pagi. Tetap aja ada yang chat \"masih ada, kak?\"",
    solution: "Update di grup WA, papan tulis, draft caption — tiga tempat, tiga kali kerja. Ordi: update sekali dari dashboard, langsung tayang di mana aja. Pelanggan liat stok & harga real-time, kamu nggak perlu ketik ulang.",
    mockupSlot: "SS_CATALOG",
  },
  {
    time: "12:00",
    label: "Jam Rame",
    pain: "Itung ongkir sambil masak? Gampang salah.",
    solution: "Kira-kira jarak, kira-kira tarif — kadang kemurahan kamu rugi, kadang kemahalan pelanggan kabur. Ordi hitung otomatis dari alamat yang diketik pelanggan sendiri, langsung muncul sebelum checkout.",
    mockupSlot: "SS_SHIPPING_CALC",
  },
  {
    time: "15:00",
    label: "Resi & Pembayaran",
    pain: "Nunggu bukti transfer, sambil layanin chat lain.",
    solution: "QR pembayaran generate otomatis sesuai nominal pesanan — pelanggan tinggal scan. Verifikasi bukti transfer tetap manual by kamu (kami jujur soal ini), tapi nggak ada lagi bolak-balik nanya \"nominalnya berapa ya kak\".",
    mockupSlot: "SS_QRIS",
  },
  {
    time: "21:00",
    label: "Tutup, Rekap",
    pain: "Rekap manual di buku, atau mulai lupa dicatat.",
    solution: "Semua pesanan hari ini udah tercatat otomatis dari jam 07:00 tadi. Buka dashboard, langsung keliatan total penjualan, produk terlaris, dan pesanan yang masih pending — tanpa hitung ulang dari nota.",
    mockupSlot: "SS_ADMIN_DASHBOARD",
  },
];

export const COMPARISON = {
  headers: ["Cara Manual (WA)", "Sewa Platform", "Sistem Sendiri (Ordi)"],
  rows: [
    {
      label: "Biaya",
      manual: "Gratis di atas kertas — tapi mahal di waktu & salah hitung ongkir.",
      sewa: "Rp300rb/bulan, selamanya. Berhenti bayar, sistem hilang.",
      ordi: "Bayar sekali di awal. Setelah itu, milik kamu.",
    },
    {
      label: "Kepemilikan",
      manual: "Data pesanan tersebar di chat, nggak terstruktur.",
      sewa: "Data & sistem nempel di platform mereka, bukan kamu.",
      ordi: "Sistem & data ada di tangan kamu sendiri.",
    },
    {
      label: "Kustomisasi",
      manual: "Sebebas-bebasnya, tapi manual semua.",
      sewa: "Template generik, semua tenant tampilannya mirip.",
      ordi: "Dibangun ngikutin cara bisnis kamu jalan, bukan sebaliknya.",
    },
    {
      label: "Waktu mulai",
      manual: "Instan — karena memang belum ada sistem.",
      sewa: "Instan — daftar, bayar, langsung pakai template.",
      ordi: "Butuh waktu setup & diskusi di awal. Nggak instan — karena kita ngobrol dulu soal bisnis kamu sebelum bangun apa pun.",
    },
  ],
};
