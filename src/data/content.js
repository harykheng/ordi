export const DEMO_URL = "https://ordistore.studioharel.id/";
export const WHATSAPP_NUMBER = "6281292567788";
export const WHATSAPP_DEFAULT_TEXT =
  "Halo Studio Harel, saya mau tanya soal Ordi buat bisnis saya";
export const WHATSAPP_CTA_LINK = "https://wa.me/6281292567788?text=Halo%20Studio%20Harel%2C%20saya%20mau%20tanya%20soal%20Ordi%20buat%20bisnis%20saya";

// Contoh toko ilustratif, bukan klien asli. Dipakai mockup katalog di hero
// yang ganti merek tiap beberapa detik, buat nunjukin tiap toko dapat nama,
// warna, dan domainnya sendiri. Selalu tampil dengan label "contoh" di UI.
export const STORE_EXAMPLES = [
  {
    name: "Yuni Bakery",
    initial: "Y",
    domain: "yunibakery.id",
    tag: "Roti & kue rumahan",
    brand: "#B83560",
    code: "YB",
    items: [
      { name: "Roti Sobek Pandan", price: 28000 },
      { name: "Bolu Gulung Keju", price: 45000 },
    ],
  },
  {
    name: "Kedai Kopi Senja",
    initial: "K",
    domain: "kopisenja.id",
    tag: "Kopi & roti bakar",
    brand: "#5B3A29",
    code: "KS",
    items: [
      { name: "Kopi Susu Gula Aren", price: 18000 },
      { name: "Roti Bakar Cokelat", price: 22000 },
    ],
  },
  {
    name: "Warung Bu Tuti",
    initial: "W",
    domain: "warungbututi.id",
    tag: "Masakan rumahan",
    brand: "#1F6F46",
    code: "WT",
    items: [
      { name: "Nasi Ayam Geprek", price: 28000 },
      { name: "Sayur Asem", price: 12000 },
    ],
  },
];

// Alur pelanggan, urutannya sama persis dengan layar di katalog Ordi.
// `tier` diisi kalau langkah itu cuma ada di paket tertentu.
export const CUSTOMER_FLOW = [
  {
    id: "tanggal",
    title: "Pilih cara ambil dan tanggal",
    body: "Ambil sendiri atau diantar, lalu pilih tanggal. Tanggal libur dan tanggal yang kuotanya udah habis ketandai dari awal, jadi pelanggan nggak kecewa di tengah jalan.",
  },
  {
    id: "menu",
    title: "Pilih menu",
    body: "Foto, harga, dan varian. Produk yang habis ketandai Habis, produk berkuota nunjukin sisa slot yang turun sendiri waktu keranjang diisi.",
  },
  {
    id: "alamat",
    title: "Alamat dan ongkir",
    body: "Cari alamat, pastikan di peta, hasilnya urut dari yang paling dekat toko. Ongkir kurir instan muncul otomatis, dan alamat di luar jangkauan ketahuan sebelum bayar.",
    tier: "Paket Antar dan Bayar",
  },
  {
    id: "bayar",
    title: "Bayar QRIS",
    body: "Nominal di QR udah pas sesuai total, pelanggan tinggal scan dari bank atau e-wallet apa aja. Bukti transfer dikirim lewat WhatsApp dengan pesan yang udah tersusun.",
    tier: "Paket Bayar",
  },
  {
    id: "lacak",
    title: "Lacak pesanan",
    body: "Pakai kode pesanan dan nomor WhatsApp, pelanggan cek statusnya sendiri: Menunggu Konfirmasi, Diproses, Selesai. Pertanyaan \"pesanan saya gimana kak\" berkurang.",
  },
];

// Sisi pemilik toko, sehari dari buka sampai tutup.
export const OWNER_DAY = [
  {
    time: "07:00",
    title: "Cek yang harus siap hari ini",
    body: "Dashboard langsung nunjukin berapa pesanan yang harus siap hari ini dan besok. Rekap produksinya sekalian: bikin apa, berapa, dipecah per varian.",
    before: "Dulu: scroll chat semalam cuma buat ngitung mau bikin apa.",
    visual: "prep",
  },
  {
    time: "10:12",
    title: "Pesanan masuk, dashboard bunyi",
    body: "Selama dashboard dibuka, ada bunyi, pop-up, dan badge angka. Stok berkurang sendiri, kuota tanggal itu ikut kepakai.",
    visual: "notif",
  },
  {
    time: "14:00",
    title: "Print label sekaligus",
    body: "Satu tombol buat semua pesanan di tanggal yang dipilih. Isinya lengkap: kode pesanan, penerima, alamat, item, total.",
    visual: "labels",
  },
  {
    time: "16:30",
    title: "Cek bukti transfer, tekan Konfirmasi",
    body: "Verifikasi tetap di tangan kamu. Kalau pesanan dibatalkan, stoknya balik sendiri tanpa perlu diubah manual.",
    visual: "confirm",
  },
  {
    time: "21:00",
    title: "Tutup, rekap hari ini",
    body: "Pendapatan yang udah terkonfirmasi, jumlah pengunjung, produk terlaris, dan grafik 7 hari. Butuh buat pembukuan? Export CSV.",
    visual: "recap",
  },
];

export const OWNER_EXTRAS = [
  "Produk, foto, varian",
  "Stok dan kuota harian",
  "Import produk dari CSV",
  "Kode promo",
  "Tanggal libur",
  "Logo, banner, jam buka",
];

export const COMPARISON = {
  headers: ["Cara Manual (WA)", "Sewa Platform", "Sistem Sendiri (Ordi)"],
  rows: [
    {
      label: "Biaya",
      manual: "Gratis di atas kertas, tapi mahal di waktu & salah hitung ongkir.",
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
      ordi: "Dibangun ngikutin cara bisnis kamu jalan.",
    },
    {
      label: "Waktu mulai",
      manual: "Instan, karena memang belum ada sistem.",
      sewa: "Instan, daftar, bayar, langsung pakai template.",
      ordi: "Butuh waktu setup & diskusi di awal. Nggak instan, karena kita ngobrol dulu soal bisnis kamu sebelum bangun apa pun.",
    },
  ],
};

export const PRICING_TIERS = [
  {
    name: "Ordi Dasar",
    tagline: "Buat toko yang pelanggannya ambil sendiri",
    price: "Rp2.500.000",
    priceNote: "sekali bayar",
    features: [
      "Semua fitur di daftar \"sudah termasuk\"",
      "Pesanan lanjut ke WhatsApp kamu, formatnya udah rapi",
      "Pengiriman tetap bisa, alamat diketik pelanggan",
    ],
    retainer: "Rp100.000/bulan, opsional, hosting & maintenance",
    highlight: false,
  },
  {
    name: "Ordi + Antar",
    tagline: "Buat yang udah jalanin delivery",
    ribbon: "Pas buat yang udah antar",
    price: "Rp4.000.000",
    priceNote: "sekali bayar",
    features: [
      "Semua di Ordi Dasar",
      "Alamat dipilih lewat peta, urut dari yang terdekat",
      "Ongkir kurir instan dihitung otomatis",
      "Alamat di luar jangkauan ketahuan sebelum bayar",
    ],
    retainer: "Rp125.000/bulan, opsional, hosting & maintenance",
    highlight: true,
  },
  {
    name: "Ordi + Bayar",
    tagline: "Buat yang mau pelanggan bayar duluan",
    price: "Rp5.000.000",
    priceNote: "sekali bayar",
    features: [
      "Semua di Ordi + Antar",
      "QRIS dengan nominal pas, dibuat otomatis per pesanan",
      "Tanpa payment gateway, Ordi nggak ambil potongan per transaksi",
      "Verifikasi bukti transfer tetap manual oleh kamu",
    ],
    retainer: "Rp125.000/bulan, opsional, hosting & maintenance",
    highlight: false,
  },
];

// Termasuk di semua paket, Ordi Dasar juga (dikonfirmasi Hary).
export const INCLUDED_IN_ALL = [
  "Katalog produk, foto, dan varian",
  "Pilih tanggal, buat toko harian atau PO",
  "Stok dan kuota harian per produk",
  "Tanggal libur",
  "Kode promo",
  "Lacak pesanan tanpa akun",
  "Dashboard pendapatan, pengunjung, terlaris",
  "Rekap produksi per tanggal",
  "Print label sekaligus",
  "Export dan import CSV",
  "Notifikasi pesanan masuk di dashboard",
  "Nama, logo, warna, dan domain toko kamu",
];

// Angka pembanding sewa platform, dipakai struk/grafik biaya di bagian harga.
export const RENT_COMPARISON = {
  rentPerMonth: 300000,
  ordiBase: 2500000,
  breakEvenNote:
    "Tier Dasar balik modal dibanding sewa cuma dalam ±8 bulan, setelah itu, sewa terus jalan sementara Ordi udah lunas dari awal.",
};

export const PROCESS_STEPS = [
  {
    title: "Ngobrol di WhatsApp",
    body: "Ceritain toko kamu: menu, harian atau PO, antar atau ambil sendiri. Dari situ saya kasih estimasi waktu yang realistis.",
  },
  {
    title: "Dibangun sesuai toko kamu",
    body: "Nama, logo, warna, menu, dan alur pesanan diatur ngikutin cara toko kamu jalan, bukan dipaksa masuk template.",
  },
  {
    title: "Serah terima atas nama kamu",
    body: "Hosting, database, dan domain atas nama bisnis kamu. Ada video panduan cara pakai dashboard.",
  },
];

export const HONEST_NOTES = [
  "Pembayaran nggak terverifikasi otomatis. Kamu cek bukti transfer di WhatsApp, lalu tekan Konfirmasi.",
  "Notifikasi pesanan masuk muncul selama dashboard dibuka, belum berupa push notification ke HP.",
  "Belum ada uang muka (DP). Pelanggan bayar penuh di depan.",
  "Ongkir pakai kurir instan dalam kota, bukan pengiriman antarkota.",
  "Kuota harian satu angka per produk, belum bisa beda-beda per tanggal.",
];

export const FAQ_ITEMS = [
  {
    q: "Kok masih ada biaya bulanan, padahal katanya beli putus?",
    a: "Setelah bayar, sistemnya 100% jadi milik kamu selamanya. Biaya bulanan itu opsional, buat yang mau saya bantu jagain: pastikan server jalan, ada yang benerin kalau ada bug, dan reminder sebelum domain/hosting habis masa aktif. Mirip beli motor, motornya punya kamu, servis rutin itu pilihan terpisah.",
  },
  {
    q: "Bisa buat toko yang jualannya sistem PO?",
    a: "Bisa. Mode PO bikin tanggal paling cepat mundur sesuai tenggang yang kamu atur (misalnya H-2), dan kuota harian per produk jaga supaya kamu nggak kebanjiran pesanan di satu tanggal. Menu, keranjang, dan checkout-nya tetap sama.",
  },
  {
    q: "QRIS-nya beneran otomatis kecatat lunas?",
    a: "Nominal QR-nya otomatis sesuai total pesanan, jadi pelanggan tinggal scan tanpa nanya-nanya nominal. Tapi verifikasi bukti transfernya tetap manual by kamu, karena verifikasi otomatis penuh butuh payment gateway berbayar yang bikin harga naik jauh lebih mahal.",
  },
  {
    q: "Ada potongan per transaksi?",
    a: "Dari Ordi nggak ada. QR pembayaran dibuat langsung dari QRIS toko kamu sendiri, tanpa payment gateway. Kalau bank atau penyedia QRIS kamu punya ketentuan biaya sendiri, itu tetap berlaku seperti biasa.",
  },
  {
    q: "Pelanggan harus bikin akun dulu?",
    a: "Nggak. Pelanggan cukup isi nama, nomor WhatsApp, dan alamat sekali. Datanya diingat di HP mereka, jadi pesanan berikutnya tinggal pilih menu dan bayar.",
  },
  {
    q: "Data pelanggan dan pesanan punya siapa?",
    a: "Punya kamu. Database-nya atas nama bisnis kamu, dan pesanan bisa di-export ke CSV kapan aja buat pembukuan.",
  },
  {
    q: "Kalau bisnis saya berkembang, bisa upgrade paket?",
    a: "Bisa. Upgrade dari Ordi Dasar ke +Antar atau +Bayar itu tinggal bayar selisihnya aja. Sistemnya dibangun supaya bisa nambah fitur belakangan tanpa ganti platform.",
  },
  {
    q: "Kenapa nggak pakai platform yang udah ada aja, kan lebih murah per bulan?",
    a: "Platform sewaan itu murah di depan, tapi kalau berhenti bayar, sistem & data kamu ilang, dan tampilannya generik, mirip semua toko lain yang pakai platform sama. Ordi dibangun ngikutin cara bisnis kamu jalan, dan begitu lunas, itu aset kamu selamanya.",
  },
  {
    q: "Prosesnya berapa lama sampai bisa dipakai?",
    a: "Nggak instan, karena saya perlu ngobrol dulu soal bisnis kamu sebelum mulai bangun, bukan asal pasang template. Chat dulu di WhatsApp buat cerita kebutuhan kamu, dari situ saya kasih estimasi waktu yang realistis.",
  },
];

// Pilihan di isian penutup. Semua opsional; jawabannya cuma dipakai buat
// nyusun pesan WhatsApp, nggak disimpan dan nggak dikirim ke analytics.
export const LEAD_OPTIONS = {
  jualan: ["Kopi & minuman", "Roti & kue", "Makanan berat", "Katering", "Frozen food", "Lainnya"],
  mode: [
    { value: "Harian", label: "Harian" },
    { value: "PO", label: "PO" },
    { value: "Harian dan PO", label: "Dua-duanya" },
  ],
  antar: [
    { value: "Ambil sendiri", label: "Ambil sendiri" },
    { value: "Diantar", label: "Diantar" },
    { value: "Ambil sendiri dan diantar", label: "Dua-duanya" },
  ],
  qris: [
    { value: "Mau", label: "Mau" },
    { value: "Nanti aja", label: "Nanti aja" },
  ],
};

// ---- Dipakai versi lama (landing-second). Dihapus begitu section baru
// menggantikan komponen yang masih mengimpornya.
export const TOKO_KAMU_VARIANTS = STORE_EXAMPLES.map((s) => s.name);

export const TIMELINE = [
  {
    time: "07:00",
    label: "Sebelum Buka",
    pain: "Nulis ulang stok tiap pagi. Tetap aja ada yang chat \"masih ada, kak?\"",
    solution: "Update di grup WA, papan tulis, draft caption, tiga tempat, tiga kali kerja. Ordi: update sekali dari dashboard, langsung tayang di mana aja. Pelanggan liat stok & harga real-time, kamu nggak perlu ketik ulang.",
    mockupSlot: "SS_CATALOG",
  },
  {
    time: "12:00",
    label: "Jam Rame",
    pain: "Itung ongkir sambil masak? Gampang salah.",
    solution: "Kira-kira jarak, kira-kira tarif, kadang kemurahan kamu rugi, kadang kemahalan pelanggan kabur. Ordi hitung otomatis dari alamat yang diketik pelanggan sendiri, langsung muncul sebelum checkout.",
    mockupSlot: "SS_SHIPPING_CALC",
  },
  {
    time: "15:00",
    label: "Resi & Pembayaran",
    pain: "Nunggu bukti transfer, sambil layanin chat lain.",
    solution: "QR pembayaran generate otomatis sesuai nominal pesanan, pelanggan tinggal scan. Verifikasi bukti transfer tetap manual by kamu, tapi nggak ada lagi bolak-balik nanya \"nominalnya berapa ya kak\".",
    mockupSlot: "SS_QRIS",
  },
  {
    time: "21:00",
    label: "Tutup, Rekap",
    pain: "Rekap manual di buku, atau mulai lupa dicatat.",
    solution: "Semua pesanan hari ini udah tercatat otomatis dari jam 07:00 tadi. Buka dashboard, langsung keliatan total penjualan, produk terlaris, dan pesanan yang masih pending, tanpa hitung ulang dari nota.",
    mockupSlot: "SS_ADMIN_DASHBOARD",
  },
];
