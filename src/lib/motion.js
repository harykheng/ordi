// Satu bahasa gerak buat seluruh halaman: benda ringan yang dipindahkan di
// atas meja. Berangkatnya cepat, mendaratnya pelan, nggak ada yang memantul.
export const EASE_MOVE = [0.32, 0, 0.16, 1]; // benda dipindah dari A ke B
export const EASE_ENTER = [0.22, 1, 0.36, 1]; // sesuatu muncul di tempatnya

export const DUR = {
  tap: 0.18, // umpan balik sentuhan
  swap: 0.26, // ganti panel
  move: 0.56, // kartu terbang
  settle: 0.7, // barang berserakan jadi rapi
  count: 0.9, // angka naik
};
