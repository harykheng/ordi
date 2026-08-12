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
    pain: "Nulis ulang daftar menu & stok tiap pagi — di grup WA, di papan tulis, di draft caption IG. Kalau ada yang telat update, pelanggan chat nanya \"masih ada, kak?\" padahal udah habis dari kemarin.",
    solution: "Katalog produk hidup 24 jam. Update sekali dari dashboard, langsung tayang di semua tempat — pelanggan liat stok & harga real-time, kamu nggak perlu ketak-ketik ulang.",
    mockupSlot: "SS_CATALOG",
  },
  {
    time: "12:00",
    label: "Jam Rame",
    pain: "\"Ongkir ke Ciledug berapa kak?\" — kamu buka Gojek app, cek estimasi, ketik manual ke chat, sambil masih ngaduk kuah. 15-an chat kayak gini tiap jam makan siang.",
    solution: "Pelanggan input alamat sendiri, ongkir kekalkulasi otomatis pakai data alamat real Indonesia. Nggak nunggu kamu, nggak salah hitung.",
    mockupSlot: "SS_SHIPPING_CALC",
  },
  {
    time: "15:00",
    label: "Resi & Pembayaran",
    pain: "Nunggu bukti transfer masuk, cocokin nominal manual di rekening, kadang kelewat notif — pelanggan udah nanya \"kak, uangnya udah masuk belum?\" tiga kali.",
    solution: "QRIS ke-generate otomatis sesuai nominal pesanan — pelanggan scan, bayar, kamu tetap yang verifikasi manual di sisi admin. Bagian yang bisa dipercepat, dipercepat. Bagian yang butuh mata kamu, tetap di tangan kamu.",
    mockupSlot: "SS_QRIS",
  },
  {
    time: "21:00",
    label: "Tutup, Rekap",
    pain: "Rekap manual di buku catatan atau Excel yang kadang lupa di-update dari siang. Besok mau setor laporan, harus scroll chat WA satu-satu buat hitung ulang berapa pesanan masuk.",
    solution: "Semua pesanan tercatat otomatis di dashboard admin — produk, promo, pesanan, rekap harian dalam satu tempat. Tutup toko, tinggal buka dashboard, semua udah kelihatan.",
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
