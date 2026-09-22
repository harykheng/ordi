import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ArtKopi, ArtCroissant, ArtGeprek } from "./FoodArt";
import { useRollingNumber } from "../../lib/useCountUp";
import { DUR, EASE_ENTER, EASE_MOVE } from "../../lib/motion";
import { trackStep } from "../../lib/track";

// Satu order dijalankan sampai selesai: katalog, keranjang, bayar, dashboard.
// Data contoh, bukan toko asli. Ditulis sekali di sini.
const MENU = [
  { id: "kopi", name: "Kopi Susu Gula Aren", price: 18000, Art: ArtKopi },
  { id: "roti", name: "Croissant Butter", price: 22000, Art: ArtCroissant },
  { id: "geprek", name: "Nasi Ayam Geprek", price: 28000, Art: ArtGeprek },
];

const TUJUAN = [
  { id: "kemang", label: "Kemang Raya", jarak: "3,2 km", ongkir: 9000 },
  { id: "cipete", label: "Cipete Raya", jarak: "5,8 km", ongkir: 14000 },
];

const STAGES = [
  { id: "katalog", label: "Katalog" },
  { id: "keranjang", label: "Keranjang" },
  { id: "bayar", label: "Bayar" },
  { id: "dashboard", label: "Dashboard" },
];

const STATUS = ["Baru", "Diproses", "Selesai"];

// Order yang dijalanin sendiri waktu simulasinya masuk layar:
// 2x Kopi Susu Gula Aren + 1x Croissant Butter, antar ke Kemang Raya.
// 36.000 + 22.000 + 9.000 ongkir = 67.000.
const DEMO = { kopi: 2, roti: 1 };

const rupiah = (n) => `Rp${n.toLocaleString("id-ID")}`;

function IconKeranjang({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 5h2.2l1.9 10.2a1.8 1.8 0 0 0 1.8 1.5h7.6a1.8 1.8 0 0 0 1.8-1.4L20 8H6.2" />
      <circle cx="9.5" cy="20" r="1.2" />
      <circle cx="17" cy="20" r="1.2" />
    </svg>
  );
}

function IconPin({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}

function Qr({ className = "" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={{ outline: "1px solid rgba(0,0,0,0.1)", outlineOffset: "-1px" }}
      aria-hidden="true"
    >
      <rect width="100" height="100" fill="#fdf8f4" />
      {Array.from({ length: 10 }).map((_, row) =>
        Array.from({ length: 10 }).map((_, col) =>
          (row * 7 + col * 13) % 5 === 0 ? null : (
            <rect
              key={`${row}-${col}`}
              x={col * 10}
              y={row * 10}
              width="9"
              height="9"
              fill="#2d1a0e"
            />
          )
        )
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
  );
}

// Pin alamat dipakai di keranjang dan di layar bayar, supaya ganti alamat
// langsung kelihatan efeknya ke nominal QR.
function PinAlamat({ addr, onPick }) {
  return (
    <div>
      <p className="label mb-2 text-espresso/80">Antar ke</p>
      <div className="flex flex-wrap gap-2">
        {TUJUAN.map((a) => {
          const on = addr?.id === a.id;
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => onPick(a)}
              aria-pressed={on}
              className={`press lift inline-flex min-h-11 items-center gap-2 rounded-xl px-3.5 text-[13px] font-medium ${
                on ? "bg-espresso text-cream" : "surface"
              }`}
            >
              <IconPin className="size-4 shrink-0" />
              {a.label}
              <span className={on ? "text-cream/70" : "text-espresso/70"}>
                {a.jarak}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function OrderSim() {
  const reduce = useReducedMotion();
  const frameRef = useRef(null);
  const cartRef = useRef(null);
  const bayarRef = useRef(null);
  const tileRefs = useRef({});
  const inView = useInView(frameRef, { amount: 0.25 });

  const [cart, setCart] = useState({});
  const [addr, setAddr] = useState(null);
  const [stage, setStage] = useState(0);
  const [status, setStatus] = useState(0);
  const [auto, setAuto] = useState(true);
  const [flight, setFlight] = useState(null);

  const items = useMemo(
    () => MENU.filter((p) => cart[p.id]).map((p) => ({ ...p, qty: cart[p.id] })),
    [cart]
  );
  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);
  const total = subtotal + (addr ? addr.ongkir : 0);
  const totalRolling = useRollingNumber(total, !reduce);
  const id = STAGES[stage].id;

  const goto = useCallback((i, fromAuto = false) => {
    if (!fromAuto) setAuto(false);
    setStage(i);
    trackStep(STAGES[i].id);
  }, []);

  // Gerak satu: kartu produk pindah ke keranjang. Keranjangnya baru nambah
  // begitu kartunya mendarat, jadi badge dan totalnya berubah di ujung gerak.
  const add = useCallback(
    (p, el, fromAuto = false) => {
      if (!fromAuto) setAuto(false);
      if (flight) return;
      const frame = frameRef.current;
      const keranjang = cartRef.current;
      const commit = () =>
        setCart((c) => ({ ...c, [p.id]: Math.min((c[p.id] ?? 0) + 1, 3) }));

      if (reduce || !frame || !keranjang || !el) {
        commit();
        return;
      }
      const f = frame.getBoundingClientRect();
      const s = el.getBoundingClientRect();
      const k = keranjang.getBoundingClientRect();
      setFlight({
        kind: "produk",
        produk: p,
        w: s.width,
        h: s.height,
        from: { x: s.left - f.left, y: s.top - f.top },
        to: {
          x: k.left - f.left + k.width / 2 - s.width / 2,
          y: k.top - f.top + k.height / 2 - s.height / 2,
        },
        commit,
      });
    },
    [flight, reduce]
  );

  const pickAddr = useCallback((a, fromAuto = false) => {
    if (!fromAuto) setAuto(false);
    setAddr(a);
  }, []);

  // Gerak dua: kartu order pindah ke dashboard.
  const kirim = useCallback(
    (fromAuto = false) => {
      if (!fromAuto) setAuto(false);
      if (flight) return;
      const frame = frameRef.current;
      const asal = bayarRef.current;
      if (reduce || !frame || !asal) {
        goto(3, fromAuto);
        return;
      }
      const f = frame.getBoundingClientRect();
      const o = asal.getBoundingClientRect();
      setFlight({
        kind: "order",
        w: Math.min(o.width, 260),
        from: { x: o.left - f.left, y: o.top - f.top },
        to: { x: o.left - f.left, y: 64 },
        commit: () => {
          setStage(3);
          trackStep("dashboard");
        },
      });
    },
    [flight, reduce, goto]
  );

  const reset = useCallback(() => {
    setAuto(false);
    setCart({});
    setAddr(null);
    setFlight(null);
    setStatus(0);
    setStage(0);
  }, []);

  // Order yang sudah masuk jalan sendiri: Baru, Diproses, Selesai. Yang minta
  // gerak seperlunya langsung lihat ketiganya tanpa nunggu.
  useEffect(() => {
    if (id !== "dashboard") {
      setStatus(0);
      return;
    }
    if (reduce) {
      setStatus(2);
      return;
    }
    const a = setTimeout(() => setStatus(1), 1300);
    const b = setTimeout(() => setStatus(2), 2900);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [id, reduce]);

  // Jalan sendiri sekali kalau kelihatan di layar, berhenti pada sentuhan
  // pertama. Reduced motion nggak ikut jalan sama sekali.
  useEffect(() => {
    if (!auto || !inView || reduce || flight) return;
    let t;
    if (id === "katalog") {
      const kurang = MENU.find((p) => (cart[p.id] ?? 0) < (DEMO[p.id] ?? 0));
      t = setTimeout(
        () =>
          kurang ? add(kurang, tileRefs.current[kurang.id], true) : goto(1, true),
        kurang ? (count ? 700 : 1400) : 900
      );
    } else if (id === "keranjang") {
      t = setTimeout(
        () => (addr ? goto(2, true) : pickAddr(TUJUAN[0], true)),
        addr ? 900 : 1100
      );
    } else if (id === "bayar") {
      t = setTimeout(() => kirim(true), 1700);
    }
    return () => clearTimeout(t);
  }, [
    auto,
    inView,
    reduce,
    flight,
    id,
    cart,
    count,
    addr,
    add,
    pickAddr,
    goto,
    kirim,
  ]);

  const siap =
    (id === "katalog" && count > 0) ||
    (id === "keranjang" && Boolean(addr)) ||
    id === "bayar" ||
    id === "dashboard";

  const aksi = {
    katalog: "Lanjutkan",
    keranjang: "Bayar",
    bayar: "Kirim order",
    dashboard: "Coba sendiri dari awal",
  }[id];

  const petunjuk = {
    katalog: "Ketuk produknya dulu",
    keranjang: "Pilih alamat antarnya dulu",
  }[id];

  const onAksi = () => {
    if (id === "bayar") kirim();
    else if (id === "dashboard") reset();
    else goto(stage + 1);
  };

  return (
    <div>
      <div
        ref={frameRef}
        className="surface relative overflow-hidden rounded-[20px]"
      >
        {/* kepala jendela, plus keranjang yang dituju kartu produk */}
        <div className="flex items-center gap-2 border-b border-espresso/12 bg-sand/60 px-3 py-2">
          <span className="flex gap-1" aria-hidden="true">
            <span className="size-1.5 rounded-full bg-espresso/25" />
            <span className="size-1.5 rounded-full bg-espresso/25" />
            <span className="size-1.5 rounded-full bg-espresso/25" />
          </span>
          <span className="mx-auto truncate rounded-full bg-card px-3 py-0.5 text-[10px] text-espresso/80">
            ordistore.studioharel.id
          </span>
          <span
            ref={cartRef}
            className="relative flex size-7 shrink-0 items-center justify-center rounded-lg bg-card"
          >
            <IconKeranjang className="size-4 text-espresso/80" />
            <motion.span
              key={count}
              initial={reduce ? false : { scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 0.42, bounce: 0.35 }}
              aria-hidden="true"
              className={`tnum absolute -right-1.5 -top-1.5 flex min-w-[17px] justify-center rounded-full px-1 text-[10px] font-bold leading-[17px] ${
                count ? "bg-coral text-cream" : "bg-espresso/15 text-espresso/80"
              }`}
            >
              {count}
            </motion.span>
            <span className="sr-only" aria-live="polite">
              {count} produk di keranjang
            </span>
          </span>
        </div>

        {/* tahap */}
        <ol className="flex items-center gap-1 border-b border-espresso/12 px-3 py-2.5">
          {STAGES.map((s, i) => {
            const on = i === stage;
            const lewat = i < stage;
            return (
              <li key={s.id} className="flex flex-1 items-center gap-1.5">
                <span
                  className={`tnum flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-colors duration-200 ${
                    on
                      ? "bg-coral text-cream"
                      : lewat
                        ? "bg-espresso text-cream"
                        : "bg-sand text-espresso/80"
                  }`}
                >
                  {i + 1}
                </span>
                <span
                  className={`truncate text-[11px] ${
                    on ? "font-bold text-espresso" : "text-espresso/80"
                  }`}
                >
                  {s.label}
                </span>
              </li>
            );
          })}
        </ol>

        {/* panel per tahap */}
        <div className="min-h-[268px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={id}
              initial={reduce ? false : { opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: -10 }}
              transition={{ duration: DUR.swap, ease: EASE_MOVE }}
              className="p-4"
            >
              {id === "katalog" && (
                <div>
                  <p className="text-[13px] font-bold">Kopi Senja</p>
                  <p className="text-[11px] text-espresso/80">
                    Ketuk produknya buat masuk keranjang
                  </p>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {MENU.map((p) => {
                      const qty = cart[p.id] ?? 0;
                      const Art = p.Art;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          ref={(el) => {
                            tileRefs.current[p.id] = el;
                          }}
                          onClick={(e) => add(p, e.currentTarget)}
                          data-on={qty > 0}
                          className="tapcard lift relative overflow-hidden rounded-lg bg-card text-left"
                        >
                          <span className="block aspect-[4/3]">
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
                              {qty > 0 && (
                                <motion.span
                                  key={qty}
                                  initial={
                                    reduce ? false : { scale: 0.5, opacity: 0 }
                                  }
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{
                                    type: "spring",
                                    duration: 0.4,
                                    bounce: 0.35,
                                  }}
                                  className="tnum rounded-md bg-coral px-1.5 text-[10px] font-bold text-cream"
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
                </div>
              )}

              {id === "keranjang" && (
                <div>
                  <p className="label text-espresso/80">Keranjang</p>
                  <ul className="mt-2">
                    {items.length === 0 && (
                      <li className="py-2 text-[13px] text-espresso/80">
                        Belum ada produk.
                      </li>
                    )}
                    {items.map((i) => (
                      <li
                        key={i.id}
                        className="flex items-baseline justify-between gap-3 border-b border-espresso/12 py-2 text-[13px] last:border-0"
                      >
                        <span className="min-w-0 truncate">
                          <span className="font-bold">{i.qty}x</span> {i.name}
                        </span>
                        <span className="tnum shrink-0 font-semibold">
                          {rupiah(i.price * i.qty)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    <PinAlamat addr={addr} onPick={pickAddr} />
                  </div>
                  {addr && (
                    <p className="mt-3 flex items-baseline justify-between text-[13px]">
                      <span className="text-espresso/80">Ongkir</span>
                      <span className="tnum font-semibold">
                        {rupiah(addr.ongkir)}
                      </span>
                    </p>
                  )}
                </div>
              )}

              {id === "bayar" && (
                <div ref={bayarRef}>
                  <div className="flex items-center gap-4">
                    <Qr className="size-24 shrink-0 rounded-lg" />
                    <div className="min-w-0">
                      <p className="text-[12px] text-espresso/80">Nominal QR</p>
                      <p className="display tnum text-[1.7rem] text-coral-deep">
                        {rupiah(totalRolling)}
                      </p>
                      <p className="mt-1 text-[12px] leading-snug text-espresso/80">
                        Ikut total order.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <PinAlamat addr={addr} onPick={pickAddr} />
                  </div>
                  <p className="mt-3 text-[12px] leading-snug text-espresso/80">
                    Ganti alamat, nominal QR-nya ikut berubah. Bukti bayarnya
                    tetap dicek manual sama admin.
                  </p>
                </div>
              )}

              {id === "dashboard" && (
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-[13px] font-bold">Dashboard kamu</p>
                    <span className="relative inline-flex">
                      <span className="rounded-md bg-coral px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cream">
                        order baru masuk
                      </span>
                      {!reduce && (
                        <motion.span
                          aria-hidden="true"
                          className="pointer-events-none absolute -inset-px rounded-md ring-2 ring-coral"
                          initial={{ opacity: 0.65, scale: 1 }}
                          animate={{ opacity: 0, scale: 1.45 }}
                          transition={{ duration: 0.9, ease: "easeOut" }}
                        />
                      )}
                    </span>
                  </div>

                  <div className="surface mt-2.5 rounded-xl p-3">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="tnum text-[12px] font-bold text-coral-deep">
                        #0232
                      </span>
                      <span className="tnum text-[13px] font-bold">
                        {rupiah(total)}
                      </span>
                    </div>
                    <p className="mt-1 text-[12px] leading-snug text-espresso/85">
                      {items.map((i) => `${i.qty}x ${i.name}`).join(", ")}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-[12px] text-espresso/80">
                      <IconPin className="size-3.5 shrink-0" />
                      {addr?.label}, {addr?.jarak}
                    </p>

                    {/* status jalan sendiri sampai selesai */}
                    <ol className="mt-3 flex items-center gap-1.5 border-t border-espresso/12 pt-3">
                      {STATUS.map((s, i) => {
                        const kini = i === status;
                        const lewat = i < status;
                        return (
                          <li key={s} className="flex items-center gap-1.5">
                            {i > 0 && (
                              <span
                                aria-hidden="true"
                                className={`h-px w-3 ${
                                  i <= status ? "bg-espresso/45" : "bg-espresso/15"
                                }`}
                              />
                            )}
                            <span
                              aria-current={kini ? "step" : undefined}
                              className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold transition-colors duration-300 ${
                                kini && i === 2
                                  ? "bg-mint text-mint-deep"
                                  : kini
                                    ? "bg-coral text-cream"
                                    : lewat
                                      ? "bg-sand text-espresso/80"
                                      : "text-espresso/80"
                              }`}
                            >
                              {s}
                            </span>
                          </li>
                        );
                      })}
                    </ol>
                  </div>

                  <div className="mt-2.5 rounded-xl bg-mint px-3 py-2.5">
                    <p className="text-[11px] font-bold text-mint-deep">
                      WhatsApp kamu bunyi
                    </p>
                    <p className="mt-0.5 text-[11px] leading-snug">
                      Order #0232 masuk. Datanya sudah lengkap.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ringkasan yang selalu kelihatan */}
        <div className="flex items-center gap-3 border-t border-espresso/12 bg-sand/50 px-4 py-3">
          <div className="min-w-0">
            <p className="text-[11px] text-espresso/80">
              {count} item{addr ? ` · ${addr.label}` : ""}
            </p>
            <p className="display tnum text-[1.25rem] leading-tight">
              {rupiah(totalRolling)}
            </p>
          </div>
          <div className="ml-auto flex min-h-11 shrink-0 items-center">
            <AnimatePresence mode="wait" initial={false}>
              {siap ? (
                <motion.button
                  key="aksi"
                  type="button"
                  onClick={onAksi}
                  initial={reduce ? false : { opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
                  transition={{ duration: DUR.tap, ease: EASE_ENTER }}
                  className="press lift cta inline-flex min-h-11 items-center rounded-xl bg-coral px-4 text-[14px] font-bold text-cream hover:bg-coral-deep"
                >
                  {aksi}
                </motion.button>
              ) : (
                <motion.p
                  key="petunjuk"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: DUR.tap }}
                  className="text-right text-[12px] leading-snug text-espresso/80"
                >
                  {petunjuk}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* barang yang lagi dipindahkan */}
        <AnimatePresence>
          {flight && (
            <motion.div
              key={flight.kind}
              initial={{
                x: flight.from.x,
                y: flight.from.y,
                opacity: 1,
                scale: 1,
              }}
              animate={{
                x: flight.to.x,
                y: flight.to.y,
                opacity: flight.kind === "produk" ? 0.25 : 0.15,
                scale: flight.kind === "produk" ? 0.3 : 0.72,
              }}
              transition={{ duration: DUR.move, ease: EASE_MOVE }}
              onAnimationComplete={() => {
                flight.commit();
                setFlight(null);
              }}
              style={{
                width: flight.w,
                height: flight.kind === "produk" ? flight.h : undefined,
              }}
              aria-hidden="true"
              className={`surface pointer-events-none absolute left-0 top-0 z-30 overflow-hidden ${
                flight.kind === "produk" ? "rounded-lg" : "rounded-xl px-3 py-2"
              }`}
            >
              {flight.kind === "produk" ? (
                <span className="block aspect-[4/3]">
                  <flight.produk.Art />
                </span>
              ) : (
                <>
                  <p className="text-[11px] font-bold">Order #0232</p>
                  <p className="tnum text-[11px]">{rupiah(total)}</p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="mt-3 text-[12px] text-espresso/80">
        Simulasi dengan data contoh, bukan toko asli.
      </p>
    </div>
  );
}
