import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ArtKopi, ArtCroissant, ArtGeprek } from "./FoodArt";
import { DEMO_URL } from "../../data/altContent";

// Demonstrasi produk yang bisa diklik: pilih produk, keranjang nambah,
// alamat dipilih, ongkir kehitung, total gerak, pesanan terbang ke
// dashboard, notifikasi WhatsApp bunyi. Data contoh, bukan toko asli.
const MENU = [
  { id: "kopi", name: "Kopi Susu Gula Aren", note: "Es / panas", price: 18000, Art: ArtKopi },
  { id: "roti", name: "Croissant Butter", note: "Baru keluar oven", price: 22000, Art: ArtCroissant },
  { id: "geprek", name: "Nasi Ayam Geprek", note: "Level 1 sampai 5", price: 28000, Art: ArtGeprek },
];

const TUJUAN = [
  { id: "kemang", label: "Kemang Raya", jarak: "3,2 km", ongkir: 9000 },
  { id: "cipete", label: "Cipete Raya", jarak: "5,8 km", ongkir: 14000 },
];

const RIWAYAT = [
  { id: "#0230", name: "Croissant Butter", total: 36000 },
  { id: "#0229", name: "Kopi Susu Gula Aren", total: 27000 },
];

const rupiah = (n) => `Rp${n.toLocaleString("id-ID")}`;

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
      const p = Math.min(1, (t - t0) / 480);
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

function CartGlyph({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none"
      stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5h2.2l2 10.5h10l2-7.5H7.2" />
      <circle cx="9.5" cy="19" r="1.4" />
      <circle cx="17" cy="19" r="1.4" />
    </svg>
  );
}

function InkArrow({ drawn, vertical = false, className = "" }) {
  const reduce = useReducedMotion();
  const anim = {
    initial: { pathLength: reduce ? 1 : 0 },
    animate: { pathLength: drawn ? 1 : 0 },
    transition: { duration: reduce ? 0 : 0.5, ease: "easeInOut" },
  };
  return (
    <svg
      viewBox={vertical ? "0 0 40 64" : "0 0 116 34"}
      aria-hidden="true"
      className={`text-coral ${className}`}
      fill="none" stroke="currentColor" strokeWidth="2.4"
      strokeLinecap="round" strokeLinejoin="round"
    >
      <motion.path d={vertical ? "M20 3C27 17 13 28 20 52" : "M3 12C32 2 68 26 106 14"} {...anim} opacity="0.85" />
      <motion.path
        d={vertical ? "M13 44L20 56L27 45" : "M96 5L108 14L96 24"}
        {...anim}
        transition={{ ...anim.transition, delay: reduce ? 0 : 0.28 }}
        opacity="0.85"
      />
    </svg>
  );
}

function StatusChip({ status, reduce }) {
  const done = status === "Diproses";
  return (
    <motion.span
      key={status}
      initial={reduce ? false : { scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 460, damping: 18 }}
      className={`shrink-0 rounded-[2px] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] ${
        done ? "bg-mint text-mint-deep" : "bg-coral text-cream"
      }`}
    >
      {status}
    </motion.span>
  );
}

export default function OrderSim() {
  const reduce = useReducedMotion();
  const wrapRef = useRef(null);
  const originRef = useRef(null);
  const targetRef = useRef(null);
  const inView = useInView(wrapRef, { amount: 0.25 });

  const [item, setItem] = useState(null);
  const [qty, setQty] = useState(0);
  const [addr, setAddr] = useState(null);
  const [phase, setPhase] = useState("pick"); // pick > address > calc > confirm > flying > done
  const [auto, setAuto] = useState(true);
  const [orders, setOrders] = useState([]);
  const [bump, setBump] = useState(0);
  const [flight, setFlight] = useState(null);
  const counter = useRef(231);

  const ongkirTampil = addr && (phase === "confirm" || phase === "flying" || phase === "done");
  const subtotal = item ? item.price * qty : 0;
  const total = subtotal + (ongkirTampil ? addr.ongkir : 0);
  const totalRolling = useRollingNumber(total, !reduce);
  const siap = Boolean(item && addr) && phase !== "calc";

  const commit = useCallback(() => {
    const id = `#0${counter.current++}`;
    setOrders((prev) =>
      [{ id, name: item?.name ?? "", total, status: "Baru" }, ...prev].slice(0, 3)
    );
    setFlight(null);
    setPhase("done");
  }, [item, total]);

  // Reduced motion: langsung di keadaan akhir, tanpa apa pun yang gerak.
  useEffect(() => {
    if (!reduce) return;
    setAuto(false);
    setItem(MENU[0]);
    setQty(1);
    setAddr(TUJUAN[0]);
    setPhase("done");
    setOrders([
      { id: "#0231", name: MENU[0].name, total: MENU[0].price + TUJUAN[0].ongkir, status: "Diproses" },
    ]);
  }, [reduce]);

  const add = useCallback(
    (p, fromAuto = false) => {
      if (!fromAuto) setAuto(false);
      setBump((b) => b + 1);
      setItem((prev) => {
        const sama = prev?.id === p.id;
        setQty((q) => (sama ? Math.min(q + 1, 3) : 1));
        return p;
      });
      setPhase((prev) => (prev === "done" || prev === "flying" ? "confirm" : addr ? "confirm" : "address"));
    },
    [addr]
  );

  const pilihAlamat = useCallback((a, fromAuto = false) => {
    if (!fromAuto) setAuto(false);
    setAddr(a);
    setPhase("calc");
  }, []);

  // Struk beneran terbang dari katalog ke buku dashboard, bukan cuma muncul.
  const kirim = useCallback(
    (fromAuto = false) => {
      if (!fromAuto) setAuto(false);
      if (!item || !addr) return;
      if (reduce || !wrapRef.current || !originRef.current || !targetRef.current) {
        commit();
        return;
      }
      const c = wrapRef.current.getBoundingClientRect();
      const o = originRef.current.getBoundingClientRect();
      const t = targetRef.current.getBoundingClientRect();
      setFlight({
        w: Math.min(o.width, 260),
        from: { x: o.left - c.left, y: o.top - c.top },
        to: { x: t.left - c.left + 6, y: t.top - c.top },
      });
      setPhase("flying");
    },
    [item, addr, reduce, commit]
  );

  const restart = useCallback(() => {
    setAuto(false);
    setItem(null);
    setQty(0);
    setAddr(null);
    setFlight(null);
    setPhase("pick");
  }, []);

  // Jalan sendiri sekali kalau kelihatan di layar, berhenti begitu diklik.
  useEffect(() => {
    if (!auto || !inView || reduce) return;
    let t;
    if (phase === "pick") t = setTimeout(() => add(MENU[0], true), 1700);
    else if (phase === "address") t = setTimeout(() => pilihAlamat(TUJUAN[0], true), 1400);
    else if (phase === "confirm") t = setTimeout(() => kirim(true), 1500);
    return () => clearTimeout(t);
  }, [auto, inView, reduce, phase, add, pilihAlamat, kirim]);

  useEffect(() => {
    if (phase !== "calc") return;
    const t = setTimeout(() => setPhase("confirm"), reduce ? 0 : 750);
    return () => clearTimeout(t);
  }, [phase, reduce]);

  // Status pesanan jalan sendiri di dashboard: baru, lalu diproses.
  useEffect(() => {
    if (phase !== "done" || reduce || !orders.length) return;
    const t = setTimeout(() => {
      setOrders((prev) =>
        prev.map((o, i) => (i === 0 ? { ...o, status: "Diproses" } : o))
      );
    }, 1700);
    return () => clearTimeout(t);
  }, [phase, reduce, orders.length]);

  const narasi = {
    pick: "Klik satu produk, keranjangnya ngisi sendiri.",
    address: "Pelanggan yang isi alamatnya, bukan kamu yang nanya.",
    calc: "Ongkir lagi dihitung dari alamat itu.",
    confirm: addr ? `Ongkir ${rupiah(addr.ongkir)} masuk, total ikut gerak.` : "Pilih produknya dulu.",
    flying: "Pesanan lagi nyebrang ke dashboard.",
    done: "Begitulah pelangganmu bisa pesan sendiri.",
  }[phase];

  return (
    <div ref={wrapRef} className="relative">
      <div className="md:grid md:grid-cols-12 md:items-start md:gap-6">
        {/* ── KATALOG: layar yang dilihat pelanggan ─────────────── */}
        <div className="relative z-10 md:col-span-7 md:-rotate-[0.4deg]">
          <div className="ink-shadow overflow-hidden rounded-[3px] border border-espresso/20 bg-card">
            <div className="flex items-center gap-2 border-b border-espresso/15 bg-sand/70 px-3 py-2">
              <span className="flex gap-1" aria-hidden="true">
                <span className="h-1.5 w-1.5 rounded-full bg-espresso/25" />
                <span className="h-1.5 w-1.5 rounded-full bg-espresso/25" />
                <span className="h-1.5 w-1.5 rounded-full bg-espresso/25" />
              </span>
              <span className="mx-auto truncate rounded-full bg-card px-3 py-0.5 text-[10px] text-espresso/80">
                ordistore.studioharel.id
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 px-4 pb-2 pt-3">
              <div className="min-w-0">
                <p className="display text-[1.1rem] leading-tight">Kopi Senja</p>
                <p className="text-[11px] text-espresso/80">Buka sampai 21:00</p>
              </div>
              <span className="relative flex shrink-0 items-center gap-1.5 rounded-[3px] border border-espresso/25 px-2.5 py-1.5">
                <CartGlyph />
                <motion.span
                  key={`c${bump}`}
                  initial={reduce || bump === 0 ? false : { scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 520, damping: 13 }}
                  className="tnum text-[12px] font-bold"
                >
                  {qty}
                </motion.span>
                {bump > 0 && !reduce && (
                  <motion.span
                    key={`p${bump}`}
                    initial={{ opacity: 1, y: 2 }}
                    animate={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.75, ease: "easeOut" }}
                    className="pointer-events-none absolute -top-2 right-2 text-[12px] font-extrabold text-coral"
                  >
                    +1
                  </motion.span>
                )}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 px-3 pb-3 sm:grid-cols-3">
              {MENU.map((p) => {
                const aktif = item?.id === p.id;
                const Art = p.Art;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => add(p)}
                    aria-pressed={aktif}
                    className={`press relative overflow-hidden rounded-[3px] border text-left ${
                      aktif ? "border-coral bg-sand" : "border-espresso/15 hover:bg-sand/60"
                    }`}
                  >
                    <span className="block aspect-square">
                      <Art />
                    </span>
                    <span className="block px-2 py-1.5">
                      <span className="block min-h-8 text-[11px] font-semibold leading-tight">
                        {p.name}
                      </span>
                      <span className="mt-1 flex items-center justify-between gap-1">
                        <span className="tnum text-[11px] font-bold">
                          {rupiah(p.price)}
                        </span>
                        {aktif && (
                          <motion.span
                            key={`q${qty}`}
                            initial={reduce ? false : { scale: 0.6 }}
                            animate={{ scale: 1 }}
                            className="tnum rounded-[2px] bg-coral px-1.5 text-[10px] font-bold text-cream"
                          >
                            {qty}x
                          </motion.span>
                        )}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ── struk: titik berangkatnya pesanan ─────────────── */}
            <div
              ref={originRef}
              className="border-t border-dashed border-espresso/30 bg-cream/70 px-4 py-4"
            >
              <div className="flex items-baseline justify-between gap-3 text-[13px]">
                <span className="min-w-0 truncate">
                  {item ? (
                    <>
                      <span className="font-bold">{qty}x</span> {item.name}
                    </>
                  ) : (
                    <span className="italic text-espresso/80">
                      Keranjang masih kosong
                    </span>
                  )}
                </span>
                <span className="tnum shrink-0 font-semibold">
                  {item ? rupiah(subtotal) : "-"}
                </span>
              </div>

              <p className="kicker mb-2 mt-4 text-espresso/80">Antar ke</p>
              <div className="min-h-11">
                {addr ? (
                  <button
                    type="button"
                    onClick={() => {
                      setAuto(false);
                      setAddr(null);
                      setPhase("address");
                    }}
                    className="press flex min-h-11 w-full items-center justify-between gap-2 rounded-[3px] border border-espresso/20 bg-card px-3 text-left"
                  >
                    <span className="text-[13px] font-semibold">
                      {addr.label}
                      <span className="ml-2 font-normal text-espresso/80">
                        {addr.jarak}
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
                        onClick={() => pilihAlamat(a)}
                        className="press inline-flex min-h-11 items-center rounded-[3px] border border-espresso/25 bg-card px-3 text-[12px] hover:bg-sand"
                      >
                        {a.label} <span className="ml-1.5 text-espresso/80">{a.jarak}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-3 flex items-baseline justify-between gap-3 text-[13px]">
                <span className="text-espresso/80">Ongkir</span>
                <span className="tnum font-semibold">
                  {phase === "calc" ? (
                    <motion.span
                      animate={reduce ? undefined : { opacity: [1, 0.35, 1] }}
                      transition={{ duration: 0.7, repeat: Infinity }}
                      className="text-espresso/80"
                    >
                      menghitung
                    </motion.span>
                  ) : ongkirTampil ? (
                    rupiah(addr.ongkir)
                  ) : (
                    "-"
                  )}
                </span>
              </div>

              <div className="mt-3 flex items-baseline justify-between gap-3 border-t border-espresso/25 pt-3">
                <span className="kicker">Total bayar</span>
                <motion.span
                  key={total}
                  initial={reduce ? false : { backgroundColor: "rgba(196,149,106,0.5)" }}
                  animate={{ backgroundColor: "rgba(196,149,106,0)" }}
                  transition={{ duration: 0.8 }}
                  className="display tnum rounded-[2px] px-1 text-[1.7rem] text-coral-deep"
                >
                  {rupiah(totalRolling)}
                </motion.span>
              </div>

              <button
                type="button"
                onClick={() => (phase === "done" ? restart() : kirim())}
                disabled={phase !== "done" && !siap}
                className={`press mt-4 flex min-h-12 w-full items-center justify-center rounded-[3px] px-4 text-[15px] font-bold ${
                  phase === "done"
                    ? "border border-espresso/30 bg-card hover:bg-sand"
                    : siap
                      ? "bg-coral text-cream hover:bg-coral-deep"
                      : "cursor-not-allowed bg-espresso/12 text-espresso/80"
                }`}
              >
                {phase === "done" ? "Pesan lagi" : "Kirim pesanan"}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center py-2 md:hidden">
          <InkArrow drawn={phase === "done"} vertical className="h-16 w-12" />
        </div>

        {/* ── DASHBOARD: layar yang kamu lihat ──────────────────── */}
        <div className="relative md:col-span-5 md:mt-14 md:rotate-[0.6deg]">
          <InkArrow
            drawn={phase === "done"}
            className="absolute -left-14 top-[76px] z-20 hidden h-7 w-16 md:block"
          />
          <div className="ink-shadow overflow-hidden rounded-[3px] border border-espresso/20 bg-card">
            <div className="flex items-baseline justify-between gap-2 border-b border-espresso/15 px-4 py-3">
              <p className="display text-[1.05rem]">Pesanan masuk</p>
              <p className="kicker text-espresso/80">hari ini</p>
            </div>

            <div className="ruled relative min-h-[170px] px-4 py-1">
              <span aria-hidden="true" className="absolute inset-y-0 left-[46px] w-px bg-coral/25 sm:left-[52px]" />
              <div ref={targetRef}>
                <AnimatePresence initial={false}>
                  {orders.map((o, i) => (
                    <motion.div
                      key={o.id}
                      layout={!reduce}
                      initial={reduce ? false : { opacity: 0, y: -12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="flex h-[34px] items-center gap-2 pl-[54px] pr-1 sm:pl-16"
                    >
                      <span className="kicker tnum absolute left-3 text-coral sm:left-4">
                        {o.id}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[12px]">{o.name}</span>
                      <span className="tnum shrink-0 text-[12px] font-bold">
                        {rupiah(o.total)}
                      </span>
                      {i === 0 && <StatusChip status={o.status} reduce={reduce} />}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {RIWAYAT.map((o) => (
                <div key={o.id} className="flex h-[34px] items-center gap-2 pl-[54px] pr-1 opacity-55 sm:pl-16">
                  <span className="kicker tnum absolute left-3 text-espresso/80 sm:left-4">
                    {o.id}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[12px]">{o.name}</span>
                  <span className="tnum shrink-0 text-[12px]">{rupiah(o.total)}</span>
                </div>
              ))}
            </div>

            <AnimatePresence>
              {phase === "done" && (
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: reduce ? 1 : [0.97, 1.03, 1] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: reduce ? 0 : 0.2 }}
                  className="m-3 rounded-[3px] bg-mint px-3 py-2.5"
                >
                  <p className="text-[11px] font-bold text-mint-deep">
                    WhatsApp kamu bunyi
                  </p>
                  <p className="mt-0.5 text-[11px] leading-snug">
                    {orders[0]?.id} {item?.name}, antar ke {addr?.label}. Total{" "}
                    {rupiah(orders[0]?.total ?? total)}.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* struk yang beneran pindah dari katalog ke dashboard */}
      <AnimatePresence>
        {flight && (
          <motion.div
            initial={{ x: flight.from.x, y: flight.from.y, opacity: 1, rotate: -1.5, scale: 1 }}
            animate={{ x: flight.to.x, y: flight.to.y, opacity: 0.2, rotate: 8, scale: 0.6 }}
            transition={{ duration: 0.8, ease: [0.5, 0, 0.2, 1] }}
            onAnimationComplete={commit}
            style={{ width: flight.w }}
            aria-hidden="true"
            className="ink-shadow pointer-events-none absolute left-0 top-0 z-40 rounded-[3px] border border-espresso/25 bg-card px-3 py-2"
          >
            <p className="text-[11px] font-bold">
              {qty}x {item?.name}
            </p>
            <p className="tnum text-[11px]">{rupiah(total)}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── narator, kontrol, dan ajakan nyoba demo asli ───────── */}
      <div className="mt-7 border-t border-espresso/15 pt-5 md:flex md:items-center md:justify-between md:gap-8">
        <p
          aria-live="polite"
          className={
            phase === "done"
              ? "display max-w-md text-[clamp(1.3rem,1.1rem+0.8vw,1.8rem)]"
              : "standfirst max-w-md italic text-espresso/90"
          }
        >
          {narasi}
        </p>

        <div className="mt-5 shrink-0 md:mt-0 md:text-right">
          {phase === "done" ? (
            <>
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.gtag?.("event", "klik_demo", { lokasi: "hero-sim" })}
                className="press inline-flex min-h-12 items-center gap-2 rounded-[3px] bg-coral px-6 text-[15px] font-bold text-cream hover:bg-coral-deep"
              >
                Coba demo Ordi yang sebenarnya
                <span aria-hidden="true">&rarr;</span>
              </a>
              <button
                type="button"
                onClick={restart}
                className="press ml-0 mt-3 block min-h-11 text-[13px] font-semibold underline decoration-espresso/30 underline-offset-4 hover:decoration-coral md:ml-auto"
              >
                Ulangi simulasinya
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setAuto((a) => !a)}
              className="press inline-flex min-h-11 items-center rounded-[3px] border border-espresso/30 px-4 text-[13px] font-semibold hover:bg-sand"
            >
              {auto ? "Jeda, saya klik sendiri" : "Jalanin otomatis"}
            </button>
          )}
          <p className="mt-2 text-[11px] text-espresso/80 md:max-w-[16rem]">
            Simulasi dengan data contoh.
          </p>
        </div>
      </div>
    </div>
  );
}
