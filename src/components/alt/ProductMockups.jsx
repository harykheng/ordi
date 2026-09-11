import {
  IconStore,
  IconCup,
  IconBread,
  IconBowl,
  IconBox,
  IconTruck,
  IconBell,
  IconCheck,
} from "./Icons";

// Semua yang ada di file ini adalah mockup ilustratif dengan data contoh,
// dibangun pakai HTML/CSS (nggak ada aset screenshot di repo ini).
// Tujuannya nunjukin produknya bekerja, bukan jadi dekorasi.

const THUMB_STYLES = [
  "from-latte/45 to-latte/15",
  "from-espresso/20 to-latte/10",
  "from-coral/15 to-latte/20",
  "from-mint/70 to-latte/15",
];

const GLYPHS = [IconCup, IconBread, IconBowl, IconBox];

const PRODUCTS = [
  { name: "Kopi Susu Gula Aren", price: "18.000", note: "Es / Panas" },
  { name: "Croissant Butter", price: "22.000", note: "Fresh tiap pagi" },
  { name: "Nasi Ayam Geprek", price: "28.000", note: "Level 1 sampai 5" },
  { name: "Es Teh Melati", price: "10.000", note: "Stok 12" },
];

export function BrowserFrame({ children, className = "" }) {
  return (
    <div
      className={`overflow-hidden rounded-[20px] border border-espresso/15 bg-card shadow-[0_24px_50px_-24px_rgba(45,26,14,0.45)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-espresso/10 bg-sand/70 px-3 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-espresso/20" />
          <span className="h-2 w-2 rounded-full bg-espresso/20" />
          <span className="h-2 w-2 rounded-full bg-espresso/20" />
        </span>
        <span className="mx-auto truncate rounded-full bg-card px-3 py-1 text-[10px] text-espresso/75">
          ordistore.studioharel.id
        </span>
      </div>
      {children}
    </div>
  );
}

export function CatalogScreen() {
  return (
    <BrowserFrame>
      <div className="bg-cream p-3 sm:p-4">
        {/* header toko */}
        <div className="mb-3 flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-espresso text-cream">
            <IconStore className="h-4.5 w-4.5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-espresso">
              Kopi Senja
            </p>
            <p className="text-[11px] text-espresso/75">
              Katalog online, buka sampai 21:00
            </p>
          </div>
          <span className="ml-auto shrink-0 rounded-full bg-mint px-2 py-0.5 text-[10px] font-semibold text-mint-deep">
            Buka
          </span>
        </div>

        {/* kategori */}
        <div className="mb-3 flex gap-1.5 overflow-hidden">
          {["Semua", "Kopi", "Makanan", "Snack"].map((c, i) => (
            <span
              key={c}
              className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] ${
                i === 0
                  ? "bg-espresso text-cream"
                  : "border border-espresso/15 text-espresso/75"
              }`}
            >
              {c}
            </span>
          ))}
        </div>

        {/* grid produk */}
        <div className="grid grid-cols-2 gap-2">
          {PRODUCTS.map((p, i) => {
            const Glyph = GLYPHS[i];
            return (
              <div
                key={p.name}
                className="overflow-hidden rounded-xl border border-espresso/10 bg-card"
              >
                <div
                  className={`flex aspect-[5/3] items-center justify-center bg-gradient-to-br ${THUMB_STYLES[i]}`}
                >
                  <Glyph className="h-7 w-7 text-espresso/45" />
                </div>
                <div className="p-2">
                  <p className="truncate text-[11px] font-semibold leading-tight text-espresso">
                    {p.name}
                  </p>
                  <p className="truncate text-[10px] text-espresso/75">
                    {p.note}
                  </p>
                  <div className="mt-1.5 flex items-center justify-between gap-1">
                    <span className="text-[11px] font-bold text-espresso">
                      Rp{p.price}
                    </span>
                    <span className="rounded-full bg-coral px-2 py-0.5 text-[10px] font-semibold text-cream">
                      Pesan
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* bar keranjang */}
        <div className="mt-3 flex items-center justify-between gap-2 rounded-xl bg-espresso px-3 py-2.5">
          <span className="text-[11px] text-cream/85">2 item di keranjang</span>
          <span className="flex items-center gap-2">
            <span className="text-xs font-bold text-cream">Rp46.000</span>
            <span className="rounded-full bg-cream px-2.5 py-1 text-[10px] font-bold text-espresso">
              Checkout
            </span>
          </span>
        </div>
      </div>
    </BrowserFrame>
  );
}

export function OrderSummaryCard({ className = "" }) {
  const rows = [
    ["Subtotal 2 item", "Rp46.000"],
    ["Ongkir, 3.2 km", "Rp9.000"],
  ];
  return (
    <div
      className={`rounded-2xl border border-espresso/15 bg-card p-4 shadow-[0_18px_36px_-20px_rgba(45,26,14,0.5)] ${className}`}
    >
      <p className="eyebrow mb-2.5 text-espresso/75">Ringkasan pesanan</p>
      {rows.map(([label, value]) => (
        <div
          key={label}
          className="flex items-center justify-between gap-3 py-1 text-xs text-espresso/85"
        >
          <span>{label}</span>
          <span className="font-semibold tabular-nums">{value}</span>
        </div>
      ))}
      <div className="mt-2 flex items-center justify-between gap-3 border-t border-espresso/10 pt-2.5">
        <span className="text-xs font-semibold text-espresso">
          Total bayar
        </span>
        <span className="text-base font-extrabold tabular-nums text-coral-deep">
          Rp55.000
        </span>
      </div>
      <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-mint px-2.5 py-1.5">
        <IconCheck className="h-3.5 w-3.5 shrink-0 text-mint-deep" />
        <span className="text-[11px] font-semibold text-mint-deep">
          Pesanan masuk ke dashboard
        </span>
      </div>
    </div>
  );
}

/* ── visual kecil per langkah di section "Cara kerja" ───────────── */

export function MiniCatalog() {
  return (
    <div className="rounded-xl border border-espresso/10 bg-cream p-3">
      {PRODUCTS.slice(0, 3).map((p, i) => {
        const Glyph = GLYPHS[i];
        return (
          <div
            key={p.name}
            className={`flex items-center gap-2.5 py-2 ${
              i > 0 ? "border-t border-espresso/10" : ""
            }`}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-latte/25">
              <Glyph className="h-4 w-4 text-espresso/60" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-semibold text-espresso">
                {p.name}
              </span>
              <span className="block text-[10px] text-espresso/75">
                {p.note}
              </span>
            </span>
            <span className="shrink-0 text-xs font-bold text-espresso">
              Rp{p.price}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function MiniAddress() {
  return (
    <div className="rounded-xl border border-espresso/10 bg-cream p-3">
      <p className="eyebrow mb-2 text-espresso/75">Alamat pengiriman</p>
      <div className="rounded-lg border border-espresso/15 bg-card px-2.5 py-2 text-[11px] text-espresso">
        Jl. Kemang Raya No. 12
        <span className="ml-0.5 inline-block h-3 w-px translate-y-0.5 bg-espresso/60" />
      </div>
      <div className="mt-1.5 space-y-1">
        <p className="rounded-md bg-latte/20 px-2.5 py-1.5 text-[10px] text-espresso">
          Jl. Kemang Raya No. 12, Jakarta Selatan
        </p>
        <p className="px-2.5 text-[10px] text-espresso/75">
          Jl. Kemang Timur No. 8, Jakarta Selatan
        </p>
      </div>
    </div>
  );
}

export function MiniTotal() {
  return (
    <div className="rounded-xl border border-espresso/10 bg-cream p-3">
      <div className="flex items-center justify-between py-1 text-[11px] text-espresso/85">
        <span>Subtotal</span>
        <span className="font-semibold tabular-nums">Rp46.000</span>
      </div>
      <div className="flex items-center justify-between gap-2 py-1 text-[11px] text-espresso/85">
        <span className="flex items-center gap-1.5">
          <IconTruck className="h-3.5 w-3.5 text-espresso/60" />
          Ongkir, 3.2 km
        </span>
        <span className="font-semibold tabular-nums">Rp9.000</span>
      </div>
      <div className="mt-1.5 flex items-center justify-between border-t border-espresso/10 pt-2 text-xs">
        <span className="font-semibold text-espresso">Total</span>
        <span className="font-extrabold tabular-nums text-coral-deep">
          Rp55.000
        </span>
      </div>
      <p className="mt-2 text-[10px] text-espresso/75">
        Dihitung sebelum pelanggan checkout.
      </p>
    </div>
  );
}

export function MiniOrderIn() {
  return (
    <div className="rounded-xl border border-espresso/10 bg-cream p-3">
      <div className="mb-2 flex items-center justify-between">
        <p className="eyebrow text-espresso/75">Pesanan masuk</p>
        <span className="rounded-full bg-mint px-2 py-0.5 text-[10px] font-semibold text-mint-deep">
          Baru
        </span>
      </div>
      {[
        ["#0231", "Rani S.", "Rp55.000", "Baru"],
        ["#0230", "Dimas P.", "Rp46.000", "Diproses"],
      ].map(([id, name, total, status], i) => (
        <div
          key={id}
          className={`flex items-center justify-between gap-2 py-1.5 ${
            i > 0 ? "border-t border-espresso/10" : ""
          }`}
        >
          <span className="min-w-0">
            <span className="block truncate text-[11px] font-semibold text-espresso">
              {id} · {name}
            </span>
            <span className="block text-[10px] tabular-nums text-espresso/75">
              {total}
            </span>
          </span>
          <span className="shrink-0 rounded-full border border-espresso/20 px-2 py-0.5 text-[10px] text-espresso/85">
            {status}
          </span>
        </div>
      ))}
      <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-espresso px-2.5 py-1.5">
        <IconBell className="h-3.5 w-3.5 shrink-0 text-cream" />
        <span className="text-[10px] text-cream/90">
          Notifikasi WhatsApp terkirim ke kamu
        </span>
      </div>
    </div>
  );
}

/* ── visual pendukung di section fitur ──────────────────────────── */

export function QrisCard() {
  return (
    <div className="rounded-2xl border border-espresso/12 bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-bold text-espresso">Bayar pesanan #0231</p>
        <span className="text-[10px] text-espresso/75">QRIS</span>
      </div>
      <div className="flex items-center gap-4">
        <svg
          viewBox="0 0 100 100"
          className="h-24 w-24 shrink-0 rounded-lg border border-espresso/10"
          aria-hidden="true"
        >
          <rect width="100" height="100" fill="#fdf8f4" />
          {Array.from({ length: 10 }).map((_, row) =>
            Array.from({ length: 10 }).map((_, col) => {
              if ((row * 7 + col * 13) % 5 === 0) return null;
              return (
                <rect
                  key={`${row}-${col}`}
                  x={col * 10}
                  y={row * 10}
                  width="9"
                  height="9"
                  fill="#2d1a0e"
                />
              );
            })
          )}
          {[
            [0, 0],
            [78, 0],
            [0, 78],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <rect x={x} y={y} width="22" height="22" fill="#2d1a0e" />
              <rect x={x + 4} y={y + 4} width="14" height="14" fill="#fdf8f4" />
              <rect x={x + 8} y={y + 8} width="6" height="6" fill="#2d1a0e" />
            </g>
          ))}
        </svg>
        <div className="min-w-0">
          <p className="text-[11px] text-espresso/75">Nominal QR</p>
          <p className="text-xl font-extrabold tabular-nums text-coral-deep">
            Rp55.000
          </p>
          <p className="mt-1 text-[11px] leading-snug text-espresso/85">
            Sama persis dengan total pesanan, jadi pelanggan nggak perlu
            nanya nominalnya.
          </p>
        </div>
      </div>
      <p className="mt-3 rounded-lg bg-sand px-2.5 py-2 text-[11px] leading-snug text-espresso/85">
        Bukti bayarnya tetap kamu cek manual dari dashboard. Verifikasi
        otomatis butuh payment gateway berbayar.
      </p>
    </div>
  );
}

export function WaNotifCard() {
  return (
    <div className="rounded-2xl border border-espresso/12 bg-card p-4">
      <p className="eyebrow mb-3 text-espresso/75">Notifikasi WhatsApp</p>
      <div className="rounded-xl bg-mint px-3 py-2.5">
        <p className="text-[11px] font-bold text-mint-deep">
          Pesanan baru #0231
        </p>
        <p className="mt-0.5 text-[11px] leading-snug text-espresso">
          Rani S. · 2 item · Rp55.000
          <br />
          Antar ke Jl. Kemang Raya No. 12
        </p>
        <p className="mt-1 text-right text-[9px] text-espresso/75">12:04</p>
      </div>
      <p className="mt-3 text-[11px] leading-snug text-espresso/85">
        Isinya sudah lengkap dari awal, jadi kamu nggak perlu scroll chat
        lama buat nyari detail pesanannya.
      </p>
    </div>
  );
}
