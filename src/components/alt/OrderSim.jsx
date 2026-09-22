import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ArtKopi, ArtCroissant, ArtMatcha } from "./FoodArt";
import { useRollingNumber } from "../../lib/useCountUp";
import { DUR, EASE_ENTER, EASE_MOVE } from "../../lib/motion";
import {
  DASHBOARD_BASE,
  MENU,
  ORDER_BARU,
  ZONES,
  rupiah,
} from "../../data/demoOrder";
import { trackStep } from "../../lib/track";

const ART = { kopi: ArtKopi, roti: ArtCroissant, matcha: ArtMatcha };

const STAGES = [
  { id: "katalog", label: "Katalog" },
  { id: "ringkasan", label: "Ringkasan" },
  { id: "bayar", label: "Bayar" },
  { id: "dashboard", label: "Dashboard" },
];

const STATUS = ["Baru", "Diproses", "Selesai"];

function IconKeranjang({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 5h2.2l1.9 10.2a1.8 1.8 0 0 0 1.8 1.5h7.6a1.8 1.8 0 0 0 1.8-1.4L20 8H6.2" />
      <circle cx="9.5" cy="20" r="1.2" />
      <circle cx="17" cy="20" r="1.2" />
    </svg>
  );
}

function IconPin({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}

function Qr({ className = "" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={{ outline: "1px solid rgba(0,0,0,0.1)", outlineOffset: "-1px" }} aria-hidden="true">
      <rect width="100" height="100" fill="#fdf8f4" />
      {Array.from({ length: 10 }).map((_, row) =>
        Array.from({ length: 10 }).map((_, col) =>
          (row * 7 + col * 13) % 5 === 0 ? null : (
            <rect key={`${row}-${col}`} x={col * 10} y={row * 10} width="9" height="9" fill="#2d1a0e" />
          )
        )
      )}
      {[[0, 0], [78, 0], [0, 78]].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width="22" height="22" fill="#2d1a0e" />
          <rect x={x + 4} y={y + 4} width="14" height="14" fill="#fdf8f4" />
          <rect x={x + 8} y={y + 8} width="6" height="6" fill="#2d1a0e" />
        </g>
      ))}
    </svg>
  );
}

// Pin alamat dipakai di ringkasan dan di layar bayar, supaya ganti alamat
// langsung kelihatan efeknya ke nominal yang dibayar.
function PinAlamat({ zone, onPick }) {
  return (
    <div>
      <p className="label mb-2 text-espresso/80">Antar ke</p>
      <div className="flex flex-wrap gap-2">
        {ZONES.map((z) => {
          const on = zone.id === z.id;
          return (
            <button
              key={z.id}
              type="button"
              onClick={() => onPick(z)}
              aria-pressed={on}
              className={`press lift inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl px-3.5 text-[13px] font-medium ${
                on ? "bg-espresso text-cream" : "surface"
              }`}
            >
              <IconPin className="size-4 shrink-0" />
              {z.label}
              <span className={on ? "text-cream/70" : "text-espresso/70"}>
                {z.jarak}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Satu baris order di daftar dashboard.
function BarisOrder({ id, status, nominal, baru, reduce }) {
  return (
    <motion.li
      initial={baru && !reduce ? { opacity: 0, y: -8, scale: 0.98 } : false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.32, ease: EASE_ENTER }}
      className={`flex items-center gap-2 border-t border-espresso/12 py-2 text-[12px] ${
        baru ? "bg-coral/5" : ""
      }`}
    >
      <span className="tnum font-bold text-espresso/80">{id}</span>
      <span
        className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${
          status === "Selesai"
            ? "bg-mint text-mint-deep"
            : status === "Baru"
              ? "bg-coral text-cream"
              : "bg-sand text-espresso/85"
        }`}
      >
        {status}
      </span>
      <span className="tnum ml-auto font-bold">{rupiah(nominal)}</span>
    </motion.li>
  );
}

export default function OrderSim({ onAdd }) {
  const reduce = useReducedMotion();
  const frameRef = useRef(null);
  const cartRef = useRef(null);
  const tileRefs = useRef({});

  const [cart, setCart] = useState({});
  const [zone, setZone] = useState(ZONES[0]);
  const [stage, setStage] = useState(0);
  const [status, setStatus] = useState(0);
  const [sent, setSent] = useState(false);
  const [flight, setFlight] = useState(null);
  const [toast, setToast] = useState(null);

  const nudgeRef = useRef(null);
  const lihat = useInView(nudgeRef, { once: true, amount: 0.6 });

  const items = useMemo(
    () => MENU.filter((p) => cart[p.id]).map((p) => ({ ...p, qty: cart[p.id] })),
    [cart]
  );
  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);
  const total = subtotal + (count ? zone.ongkir : 0);
  const totalRolling = useRollingNumber(total, !reduce, 420, 500);

  // Dashboard selalu punya isi. Order barunya cuma nambah di atas daftar.
  const orders = DASHBOARD_BASE.orders + (sent ? 1 : 0);
  const omzet = DASHBOARD_BASE.omzet + (sent ? total : 0);
  const ordersRolling = useRollingNumber(orders, !reduce, 600);
  const omzetRolling = useRollingNumber(omzet, !reduce, 700, 1000);

  const id = STAGES[stage].id;

  const goto = useCallback((i) => {
    setStage(i);
    trackStep(STAGES[i].id);
  }, []);

  // Gerak satu: kartu produk pindah ke keranjang. Keranjangnya baru nambah
  // begitu kartunya mendarat, jadi badge dan totalnya berubah di ujung gerak.
  const add = useCallback(
    (p, el) => {
      if (flight) return;
      onAdd?.(); // latar hero reda duluan, sebelum kartunya jalan
      const commit = () => {
        setCart((c) => ({ ...c, [p.id]: Math.min((c[p.id] ?? 0) + 1, 5) }));
        setToast(`${p.name} ditambahkan`);
      };
      const frame = frameRef.current;
      const keranjang = cartRef.current;
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
    [flight, reduce, onAdd]
  );

  // Gerak dua: kartu order pindah sedikit ke bawah, ke arah panel dashboard.
  // Sengaja pendek, bukan terbang jauh melintasi kotak.
  const kirim = useCallback(() => {
    if (flight) return;
    const commit = () => {
      setSent(true);
      setStatus(0);
      setStage(3);
      trackStep("dashboard");
    };
    if (reduce) {
      commit();
      return;
    }
    setFlight({ kind: "order", commit });
  }, [flight, reduce]);

  const reset = useCallback(() => {
    setCart({});
    setZone(ZONES[0]);
    setFlight(null);
    setToast(null);
    setSent(false);
    setStatus(0);
    setStage(0);
  }, []);

  // Order yang sudah masuk jalan sendiri: Baru, Diproses, Selesai.
  useEffect(() => {
    if (id !== "dashboard" || !sent || reduce) return;
    const a = setTimeout(() => setStatus(1), 1800);
    const b = setTimeout(() => setStatus(2), 3600);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [id, sent, reduce]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1400);
    return () => clearTimeout(t);
  }, [toast]);

  const siap = (id === "katalog" && count > 0) || id !== "katalog";
  const aksi = {
    katalog: "Lanjutkan order",
    ringkasan: "Lanjut ke pembayaran",
    bayar: "Kirim pesanan",
    dashboard: "Ulangi simulasi",
  }[id];

  const onAksi = () => {
    if (id === "bayar") kirim();
    else if (id === "dashboard") reset();
    else goto(stage + 1);
  };

  const daftar = sent
    ? [{ id: ORDER_BARU, status: STATUS[status], nominal: total, baru: true }, ...DASHBOARD_BASE.rows]
    : DASHBOARD_BASE.rows;

  return (
    <div>
      <div ref={frameRef} className="surface relative overflow-hidden rounded-[20px]">
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
          <span ref={cartRef} className="relative flex size-7 shrink-0 items-center justify-center rounded-lg bg-card">
            <IconKeranjang className="size-4 text-espresso/80" />
            <motion.span
              key={count}
              initial={reduce ? false : { scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 0.45, bounce: 0.45 }}
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

        {/* tahap, penunjuk saja, bukan tombol */}
        <ol className="flex items-center gap-1 border-b border-espresso/12 px-3 py-2.5">
          {STAGES.map((s, i) => {
            const on = i === stage;
            const lewat = i < stage;
            return (
              <li key={s.id} className="flex flex-1 items-center gap-1.5">
                <span
                  className={`tnum flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-colors duration-200 ${
                    on ? "bg-coral text-cream" : lewat ? "bg-espresso text-cream" : "bg-sand text-espresso/80"
                  }`}
                >
                  {i + 1}
                </span>
                <span className={`truncate text-[11px] ${on ? "font-bold text-espresso" : "text-espresso/80"}`}>
                  {s.label}
                </span>
              </li>
            );
          })}
        </ol>

        {/* panel per tahap */}
        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={id}
              initial={reduce ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: -14 }}
              transition={{ duration: 0.3, ease: EASE_MOVE }}
              className="p-4"
            >
              {id === "katalog" && (
                <div>
                  <p className="text-[13px] font-bold">Kopi Senja</p>
                  <p className="text-[11px] text-espresso/80">
                    Ini yang dilihat pelangganmu
                  </p>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {MENU.map((p, i) => {
                      const qty = cart[p.id] ?? 0;
                      const Art = ART[p.id];
                      return (
                        <button
                          key={p.id}
                          type="button"
                          ref={(el) => {
                            tileRefs.current[p.id] = el;
                            if (i === 0) nudgeRef.current = el;
                          }}
                          onClick={(e) => add(p, e.currentTarget)}
                          data-on={qty > 0}
                          aria-label={`Tambah ${p.name}, ${rupiah(p.price)}`}
                          className="tapcard lift relative flex cursor-pointer flex-col overflow-hidden rounded-lg bg-card text-left"
                        >
                          <span className="relative block aspect-[4/3]">
                            <Art />
                            <AnimatePresence>
                              {qty > 0 && (
                                <motion.span
                                  key={qty}
                                  initial={reduce ? false : { scale: 0.3, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ type: "spring", duration: 0.45, bounce: 0.45 }}
                                  className="tnum absolute right-1 top-1 flex min-w-5 justify-center rounded-full bg-coral px-1 text-[10px] font-bold leading-5 text-cream"
                                >
                                  {qty}
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </span>
                          <span className="flex flex-1 flex-col px-1.5 pb-1.5 pt-1">
                            <span className="block min-h-8 text-[11px] font-semibold leading-tight">
                              {p.name}
                            </span>
                            <span className="tnum mt-0.5 block text-[11px] font-bold">
                              {rupiah(p.price)}
                            </span>
                            <motion.span
                              animate={
                                lihat && !reduce && count === 0 && i === 0
                                  ? { y: [0, -3, 0] }
                                  : { y: 0 }
                              }
                              transition={{ duration: 0.5, ease: EASE_ENTER, delay: 0.5 }}
                              className={`mt-1.5 flex items-center justify-center gap-0.5 rounded-md py-1 text-[10px] font-bold ${
                                qty > 0 ? "bg-espresso text-cream" : "bg-coral text-cream"
                              }`}
                            >
                              <span aria-hidden="true" className="text-[12px] leading-none">
                                +
                              </span>
                              Tambah
                            </motion.span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {id === "ringkasan" && (
                <div>
                  <p className="label text-espresso/80">Ringkasan order</p>
                  <ul className="mt-2">
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
                    <PinAlamat zone={zone} onPick={setZone} />
                  </div>
                  <dl className="mt-4 border-t border-espresso/12 pt-3 text-[13px]">
                    <div className="flex justify-between py-0.5">
                      <dt className="text-espresso/80">Subtotal</dt>
                      <dd className="tnum font-semibold">{rupiah(subtotal)}</dd>
                    </div>
                    <div className="flex justify-between py-0.5">
                      <dt className="text-espresso/80">Ongkir {zone.jarak}</dt>
                      <dd className="tnum font-semibold">{rupiah(zone.ongkir)}</dd>
                    </div>
                  </dl>
                </div>
              )}

              {id === "bayar" && (
                <div>
                  <div className="flex items-center gap-4">
                    <Qr className="size-24 shrink-0 rounded-lg" />
                    <div className="min-w-0">
                      <p className="text-[12px] text-espresso/80">Nominal pembayaran</p>
                      <p className="display tnum text-[1.7rem] text-coral-deep">
                        {rupiah(totalRolling)}
                      </p>
                      <p className="mt-1 text-[12px] leading-snug text-espresso/80">
                        Ikut total order, termasuk ongkir.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <PinAlamat zone={zone} onPick={setZone} />
                  </div>
                  <p className="mt-3 text-[12px] leading-snug text-espresso/80">
                    Ganti alamat, nominalnya ikut berubah. Verifikasi bukti
                    pembayaran tetap manual.
                  </p>
                </div>
              )}

              {id === "dashboard" && (
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-[13px] font-bold">Dashboard kamu</p>
                    <AnimatePresence>
                      {sent && (
                        <span className="relative inline-flex">
                          <motion.span
                            initial={reduce ? false : { scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3, ease: EASE_ENTER }}
                            className="rounded-md bg-coral px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cream"
                          >
                            order baru masuk
                          </motion.span>
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
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="rounded-xl bg-sand px-3 py-2.5">
                      <p className="text-[11px] text-espresso/80">Order hari ini</p>
                      <p className="display tnum text-[1.5rem] leading-tight">
                        {ordersRolling}
                      </p>
                    </div>
                    <div className="rounded-xl bg-sand px-3 py-2.5">
                      <p className="text-[11px] text-espresso/80">Masuk</p>
                      <p className="display tnum text-[1.5rem] leading-tight text-coral-deep">
                        {rupiah(omzetRolling)}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-3">
                    {daftar.map((o) => (
                      <BarisOrder key={o.id} {...o} reduce={reduce} />
                    ))}
                  </ul>

                  {sent && (
                    <div className="mt-3 rounded-xl bg-mint px-3 py-2.5">
                      <p className="text-[11px] font-bold text-mint-deep">
                        WhatsApp kamu bunyi
                      </p>
                      <p className="mt-0.5 text-[11px] leading-snug">
                        Order {ORDER_BARU} masuk, {zone.label}. Datanya sudah
                        lengkap.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* kartu order pindah sedikit ke bawah, ke arah daftar dashboard */}
          <AnimatePresence>
            {flight?.kind === "order" && (
              <motion.div
                initial={{ opacity: 1, y: 0, scale: 1 }}
                animate={{ opacity: 0, y: 84, scale: 0.94 }}
                transition={{ duration: 0.42, ease: EASE_MOVE }}
                onAnimationComplete={() => {
                  flight.commit();
                  setFlight(null);
                }}
                aria-hidden="true"
                className="surface pointer-events-none absolute inset-x-4 top-4 z-30 rounded-xl px-3 py-2"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-[11px] font-bold">Order {ORDER_BARU}</p>
                  <p className="tnum text-[11px] font-bold">{rupiah(total)}</p>
                </div>
                <p className="mt-0.5 truncate text-[11px] text-espresso/80">
                  {items.map((i) => `${i.qty}x ${i.name}`).join(", ")}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ringkasan yang selalu kelihatan */}
        <div className="relative flex items-center gap-3 border-t border-espresso/12 bg-sand/50 px-4 py-3">
          <div className="min-w-0">
            <p className="text-[11px] text-espresso/80">
              {count} item{count ? ` · ${zone.label}` : ""}
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
                  initial={reduce ? false : { opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.28, ease: EASE_ENTER }}
                  className="press lift cta inline-flex min-h-11 cursor-pointer items-center rounded-xl bg-coral px-4 text-[14px] font-bold text-cream hover:bg-coral-deep"
                >
                  {aksi}
                </motion.button>
              ) : (
                <motion.p
                  key="petunjuk"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-right text-[12px] leading-snug text-espresso/80"
                >
                  Ketuk produknya dulu
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* umpan balik kecil, hilang sendiri */}
          <AnimatePresence>
            {toast && (
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: EASE_ENTER }}
                className="pointer-events-none absolute -top-2 left-4 z-20 -translate-y-full rounded-lg bg-espresso px-2.5 py-1.5 text-[11px] font-semibold text-cream"
              >
                {toast}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* kartu produk yang lagi dipindahkan ke keranjang */}
        <AnimatePresence>
          {flight?.kind === "produk" && (
            <motion.div
              initial={{ x: flight.from.x, y: flight.from.y, opacity: 1, scale: 1 }}
              animate={{ x: flight.to.x, y: flight.to.y, opacity: 0.25, scale: 0.3 }}
              transition={{ duration: DUR.move, ease: EASE_MOVE }}
              onAnimationComplete={() => {
                flight.commit();
                setFlight(null);
              }}
              style={{ width: flight.w, height: flight.h }}
              aria-hidden="true"
              className="surface pointer-events-none absolute left-0 top-0 z-30 overflow-hidden rounded-lg"
            >
              <span className="block aspect-[4/3]">
                {(() => {
                  const A = ART[flight.produk.id];
                  return <A />;
                })()}
              </span>
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
