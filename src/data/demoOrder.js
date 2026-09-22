// Satu sumber angka buat seluruh demo. Hero, section masalah, kartu order,
// dan rekap harian semuanya baca dari sini, jadi angkanya nggak bisa lagi
// bentrok gara-gara ada yang ditulis harfiah di komponen.
//
// Semua ini data contoh, bukan toko asli.

export const MENU = [
  { id: "kopi", name: "Kopi Susu Gula Aren", price: 24000 },
  { id: "roti", name: "Croissant Butter", price: 19000 },
  { id: "matcha", name: "Matcha Latte", price: 25000 },
];

export const ZONES = [
  { id: "kemang", label: "Kemang Raya", jarak: "3,2 km", ongkir: 18000 },
  { id: "cipete", label: "Cipete Raya", jarak: "5,8 km", ongkir: 23000 },
];

// Keadaan dashboard sebelum order baru masuk. Jangan pernah render nol di
// sini; panel yang isinya "0 order, Rp0" kebaca sebagai aplikasi rusak.
export const DASHBOARD_BASE = {
  orders: 12,
  omzet: 540000,
  // Tiga dari dua belas order hari itu. Nominalnya beneran keluar dari harga
  // menu plus ongkir Kemang Rp18.000, jadi nggak ada angka yang ngarang.
  rows: [
    { id: "#0231", status: "Selesai", nominal: 37000, ringkas: "1x Croissant Butter" },
    { id: "#0230", status: "Selesai", nominal: 66000, ringkas: "2x Kopi Susu Gula Aren" },
    { id: "#0229", status: "Diproses", nominal: 43000, ringkas: "1x Matcha Latte" },
  ],
};

export const ORDER_BARU = "#0232";

// Order contoh yang dipakai di luar simulasi: 1x Kopi Susu Gula Aren +
// 1x Matcha Latte = Rp49.000, antar ke Kemang Raya Rp18.000, total Rp67.000.
// Rekap sesudahnya jadi 13 order dan Rp607.000.
const ISI = [
  { id: "kopi", qty: 1 },
  { id: "matcha", qty: 1 },
];

const items = ISI.map((i) => ({ ...MENU.find((m) => m.id === i.id), qty: i.qty }));
const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);
const zone = ZONES[0];

export const CONTOH_ORDER = {
  id: ORDER_BARU,
  items,
  ringkas: items.map((i) => `${i.qty}x ${i.name}`).join(", "),
  zone,
  subtotal,
  ongkir: zone.ongkir,
  total: subtotal + zone.ongkir,
};

export const rupiah = (n) => `Rp${n.toLocaleString("id-ID")}`;
