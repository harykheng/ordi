import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { Stamp } from "./Paper";
import { DEMO_URL } from "../../data/altContent";

// Simulasi alur pesan Ordi yang bisa dimainkan pengunjung.
// Data di bawah ini contoh ilustratif, bukan toko asli, dan itu ditulis
// terang-terangan di bawah simulasinya.
const MENU = [
  { id: "kopi", name: "Kopi Susu Gula Aren", note: "Es atau panas", price: 18000 },
  { id: "roti", name: "Croissant Butter", note: "Baru keluar oven", price: 22000 },
  { id: "geprek", name: "Nasi Ayam Geprek", note: "Level 1 sampai 5", price: 28000 },
];

const TUJUAN = [
  { id: "kemang", label: "Jl. Kemang Raya No. 12", jarak: "3,2 km", ongkir: 9000 },
  { id: "cipete", label: "Jl. Cipete Raya No. 40", jarak: "5,8 km", ongkir: 14000 },
];

// dua baris lama, biar dashboard nggak kelihatan kosong melompong
const RIWAYAT = [
  { id: "#0230", name: "Croissant Butter", total: 36000 },
  { id: "#0229", name: "Kopi Susu Gula Aren", total: 27000 },
];

const rupiah = (n) => `Rp${n.toLocaleString("id-ID")}`;

// Angka total digulung pelan waktu berubah, karena itu momen yang mau
// ditunjukin: pelanggan nambah alamat, totalnya ikut gerak.
function useRollingNumber(target, animate) {
  const [shown, setShown] = useState(target);
  const from = useRef(target);

  useEffect(() => {
    if (!animate) {
      from.current = target;
      setShown(target);
      return;
    }
    const start = from.current;
    const delta = target - start;
    if (delta === 0) return;
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / 520);
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(Math.round(start + delta * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else from.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, animate]);

  return shown;
}

function InkArrow({ drawn, vertical = false, className = "" }) {
  const reduce = useReducedMotion();
  const box = vertical ? "0 0 40 64" : "0 0 116 34";
  const stroke = vertical
    ? "M20 3C27 17 13 28 20 52"
    : "M3 12C32 2 68 26 106 14";
  const head = vertical ? "M13 44L20 56L27 45" : "M96 5L108 14L96 24";
  const anim = {
    initial: { pathLength: reduce ? 1 : 0 },
    animate: { pathLength: drawn ? 1 : 0 },
    transition: { duration: reduce ? 0 : 0.55, ease: "easeInOut" },
  };
  return (
    <svg
      viewBox={box}
      aria-hidden="true"
      className={`text-coral ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path d={stroke} {...anim} opacity="0.85" />
      <motion.path
        d={head}
        {...anim}
        transition={{ ...anim.transition, delay: reduce ? 0 : 0.3 }}
        opacity="0.85"
      />
    </svg>
  );
}

export default function OrderSim() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });

  const [item, setItem] = useState(null);
  const [addr, setAddr] = useState(null);
  const [phase, setPhase] = useState("pick"); // pick > address > calc > confirm > done
  const [auto, setAuto] = useState(true);
  const [orders, setOrders] = useState([]);
  const counter = useRef(231);

  // Reduced motion: nggak ada yang jalan sendiri, keadaan akhir langsung
  // dirender, tapi tetap bisa dimainkan manual.
  useEffect(() => {
    if (!reduce) return;
    setAuto(false);
    setItem(MENU[0]);
    setAddr(TUJUAN[0]);
    setPhase("done");
    setOrders([
      { id: "#0231", name: MENU[0].name, total: MENU[0].price + TUJUAN[0].ongkir },
    ]);
  }, [reduce]);

  const pick = useCallback(
    (p, fromAuto = false) => {
      if (!fromAuto) setAuto(false);
      setItem(p);
      setPhase((prev) => (prev === "done" ? "confirm" : addr ? "confirm" : "address"));
    },
    [addr]
  );

  const chooseAddr = useCallback((a, fromAuto = false) => {
    if (!fromAuto) setAuto(false);
    setAddr(a);
    setPhase("calc");
  }, []);

  const send = useCallback(
    (fromAuto = false) => {
      if (!fromAuto) setAuto(false);
      if (!item || !addr) return;
      const id = `#0${counter.current++}`;
      setOrders((prev) =>
        [{ id, name: item.name, total: item.price + addr.ongkir }, ...prev].slice(0, 3)
      );
      setPhase("done");
    },
    [item, addr]
  );

  const restart = useCallback(() => {
    setAuto(false);
    setItem(null);
    setAddr(null);
    setPhase("pick");
  }, []);

  // Jalan sendiri sekali supaya pengunjung pasif tetap kebagian ceritanya,
  // dan langsung berhenti begitu ada yang diklik manual.
  useEffect(() => {
    if (!auto || !inView || reduce) return;
    let t;
    if (phase === "pick") t = setTimeout(() => pick(MENU[0], true), 1900);
    else if (phase === "address") t = setTimeout(() => chooseAddr(TUJUAN[0], true), 1500);
    else if (phase === "confirm") t = setTimeout(() => send(true), 1600);
    return () => clearTimeout(t);
  }, [auto, inView, reduce, phase, pick, chooseAddr, send]);

  // Jeda "lagi ngitung ongkir", bagian dari alurnya, bukan animasi hiasan.
  useEffect(() => {
    if (phase !== "calc") return;
    const t = setTimeout(() => setPhase("confirm"), reduce ? 0 : 800);
    return () => clearTimeout(t);
  }, [phase, reduce]);

  const ongkirTampil = addr && (phase === "confirm" || phase === "done");
  const total = (item?.price ?? 0) + (ongkirTampil ? addr.ongkir : 0);
  const totalRolling = useRollingNumber(total, !reduce);
  const siap = Boolean(item && addr) && phase !== "calc";

  const narasi = {
    pick: "Pelanggan buka katalog. Pilih satu produk buat mulai.",
    address: `${item?.name ?? "Produk"} masuk keranjang. Sekarang pelanggan isi alamatnya sendiri.`,
    calc: "Sistem lagi ngitung ongkir dari alamat itu.",
    confirm: addr
      ? `Ongkir ${rupiah(addr.ongkir)} muncul sebelum checkout, total jadi ${rupiah(total)}.`
      : "Pilih produknya dulu, baru totalnya kehitung.",
    done: `Pesanan masuk ke dashboard kamu, lengkap sama alamat dan totalnya.`,
  }[phase];

  return (
    <div ref={ref}>
      <div className="relative md:grid md:grid-cols-12 md:items-start md:gap-6">
        {/* ── LEMBAR KATALOG: sisi pelanggan ───────────────────── */}
        <div className="relative z-10 md:col-span-7 md:-rotate-[0.5deg]">
          <div className="ink-shadow overflow-hidden rounded-[3px] border border-espresso/20 bg-card">
            <div className="flex items-center justify-between gap-3 border-b border-espresso/15 px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <p className="display text-[1.15rem] leading-tight">Kopi Senja</p>
                <p className="truncate text-[11px] text-espresso/80">
                  ordistore.studioharel.id
                </p>
              </div>
              <Stamp className="shrink-0 text-mint-deep" rotate={-5}>
                buka
              </Stamp>
            </div>

            <ol>
              {MENU.map((p, i) => {
                const active = item?.id === p.id;
                return (
                  <li key={p.id} className="border-b border-espresso/10">
                    <button
                      type="button"
                      onClick={() => pick(p)}
                      aria-pressed={active}
                      className={`press flex w-full items-center gap-3 px-4 py-3 text-left sm:px-5 ${
                        active ? "bg-sand" : "hover:bg-sand/50"
                      }`}
                    >
                      <span
                        className={`kicker w-6 shrink-0 ${
                          active ? "text-coral-deep" : "text-espresso/80"
                        }`}
                      >
                        {active ? "1x" : String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14px] font-semibold">
                          {p.name}
                        </span>
                        <span className="block truncate text-[11px] text-espresso/80">
                          {p.note}
                        </span>
                      </span>
                      <span className="tnum shrink-0 text-[14px] font-bold">
                        {rupiah(p.price)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* ── bagian struk, masih di lembar yang sama ───────── */}
            <div className="border-t border-dashed border-espresso/30 bg-cream/60 px-4 py-4 sm:px-5">
              <p className="kicker mb-2 text-espresso/80">Antar ke</p>
              <div className="min-h-11">
                {addr ? (
                  <button
                    type="button"
                    onClick={() => {
                      setAuto(false);
                      setAddr(null);
                      setPhase("address");
                    }}
                    className="press flex min-h-11 w-full items-center gap-2 rounded-[3px] border border-espresso/20 bg-card px-3 py-2 text-left"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-semibold">
                        {addr.label}
                      </span>
                      <span className="block text-[11px] text-espresso/80">
                        {addr.jarak} dari toko
                      </span>
                    </span>
                    <span className="kicker shrink-0 text-coral-deep">ganti</span>
                  </button>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {TUJUAN.map((a) => (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => chooseAddr(a)}
                        className="press inline-flex min-h-11 items-center rounded-[3px] border border-espresso/25 bg-card px-3 text-[12px] hover:bg-sand"
                      >
                        {a.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <dl className="mt-4 space-y-1.5 text-[13px]">
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-espresso/80">Subtotal</dt>
                  <dd className="tnum font-semibold">
                    {item ? rupiah(item.price) : "belum ada"}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-espresso/80">
                    Ongkir{addr ? `, ${addr.jarak}` : ""}
                  </dt>
                  <dd className="tnum font-semibold">
                    {phase === "calc" ? (
                      <span className="text-espresso/80">menghitung...</span>
                    ) : ongkirTampil ? (
                      rupiah(addr.ongkir)
                    ) : (
                      "belum ada"
                    )}
                  </dd>
                </div>
              </dl>

              <div className="mt-3 flex items-baseline justify-between gap-3 border-t border-espresso/25 pt-3">
                <span className="kicker">Total bayar</span>
                <span className="display tnum text-[1.7rem] text-coral-deep">
                  {rupiah(totalRolling)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => (phase === "done" ? restart() : send())}
                disabled={phase !== "done" && !siap}
                aria-describedby="sim-hint"
                className={`press mt-4 flex min-h-11 w-full items-center justify-center rounded-[3px] px-4 py-2.5 text-[15px] font-bold ${
                  phase === "done"
                    ? "border border-espresso/30 bg-card hover:bg-sand"
                    : siap
                      ? "bg-coral text-cream hover:bg-coral-deep"
                      : "cursor-not-allowed bg-espresso/12 text-espresso/80"
                }`}
              >
                {phase === "done" ? "Pesan lagi" : "Kirim pesanan"}
              </button>
              <p id="sim-hint" className="mt-2 text-[11px] text-espresso/80">
                {phase === "done"
                  ? "Pesanannya udah nyebrang ke dashboard di sebelah."
                  : siap
                    ? "Pelanggan yang pencet ini, bukan kamu."
                    : "Pilih produk dan alamat dulu buat ngaktifin tombolnya."}
              </p>
            </div>
          </div>
        </div>

        {/* panah tinta versi mobile, nyambungin dua lembar yang ketumpuk */}
        <div className="flex justify-center py-2 md:hidden">
          <InkArrow drawn={phase === "done"} vertical className="h-16 w-12" />
        </div>

        {/* ── BUKU DASHBOARD: sisi kamu ────────────────────────── */}
        <div className="relative md:col-span-5 md:mt-16 md:rotate-[0.7deg]">
          {/* panah ditempel ke buku dashboard, bukan ke persentase container,
              biar posisinya nggak geser waktu tinggi lembar kiri berubah */}
          <InkArrow
            drawn={phase === "done"}
            className="absolute -left-14 top-[86px] z-20 hidden h-7 w-16 md:block"
          />
          <div className="ink-shadow overflow-hidden rounded-[3px] border border-espresso/20 bg-card">
            <div className="flex items-baseline justify-between gap-2 border-b border-espresso/15 px-4 py-3">
              <p className="display text-[1.05rem]">Pesanan masuk</p>
              <p className="kicker text-espresso/80">hari ini</p>
            </div>

            <div className="ruled relative min-h-[204px] px-4 py-1">
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-[46px] w-px bg-coral/25 sm:left-[52px]"
              />
              <AnimatePresence initial={false}>
                {orders.map((o, i) => (
                  <motion.div
                    key={o.id}
                    layout={!reduce}
                    initial={reduce ? false : { opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="flex h-[34px] items-center gap-2 pl-[54px] pr-1 sm:pl-16"
                  >
                    <span className="kicker tnum absolute left-3 text-coral sm:left-4">
                      {o.id}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[12px]">
                      {o.name}
                    </span>
                    <span className="tnum shrink-0 text-[12px] font-bold">
                      {rupiah(o.total)}
                    </span>
                    {i === 0 && (
                      <Stamp className="shrink-0 text-coral" rotate={-8}>
                        baru
                      </Stamp>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {RIWAYAT.map((o) => (
                <div
                  key={o.id}
                  className="flex h-[34px] items-center gap-2 pl-[54px] pr-1 opacity-55 sm:pl-16"
                >
                  <span className="kicker tnum absolute left-3 text-espresso/80 sm:left-4">
                    {o.id}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[12px]">
                    {o.name}
                  </span>
                  <span className="tnum shrink-0 text-[12px]">
                    {rupiah(o.total)}
                  </span>
                </div>
              ))}

              {orders.length === 0 && (
                <p className="flex h-[34px] items-center pl-[54px] text-[12px] italic text-espresso/80 sm:pl-16">
                  Nunggu pesanan berikutnya.
                </p>
              )}
            </div>

            <AnimatePresence>
              {phase === "done" && (
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 8, rotate: -2.5 }}
                  animate={{ opacity: 1, y: 0, rotate: -1.2 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: reduce ? 0 : 0.25 }}
                  className="m-3 rounded-[3px] bg-mint px-3 py-2.5"
                >
                  <p className="text-[11px] font-bold text-mint-deep">
                    WhatsApp kamu bunyi
                  </p>
                  <p className="mt-0.5 text-[11px] leading-snug">
                    Pesanan {orders[0]?.id} {item?.name}, antar ke {addr?.label}.
                    Total {rupiah(orders[0]?.total ?? total)}.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── narator + kontrol ──────────────────────────────────── */}
      <div className="mt-7 flex flex-col gap-4 border-t border-espresso/15 pt-4 sm:flex-row sm:items-start sm:justify-between">
        <p
          aria-live="polite"
          className="standfirst max-w-md italic text-espresso/90"
        >
          {narasi}
        </p>
        <div className="shrink-0">
          <button
            type="button"
            onClick={() => (phase === "done" ? restart() : setAuto((a) => !a))}
            className="press inline-flex min-h-11 items-center gap-2 rounded-[3px] border border-espresso/30 px-4 py-2 text-[13px] font-semibold hover:bg-sand"
          >
            {phase === "done"
              ? "Ulangi simulasinya"
              : auto
                ? "Jeda, saya mau klik sendiri"
                : "Jalanin otomatis"}
          </button>
          <p className="mt-2 max-w-[15rem] text-[11px] leading-snug text-espresso/80">
            Simulasi dengan data contoh. Versi yang beneran jalan ada di{" "}
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                window.gtag?.("event", "klik_demo", { lokasi: "hero-sim" })
              }
              className="underline underline-offset-2 hover:text-coral-deep"
            >
              demo Ordi
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
