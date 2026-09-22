import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ArtKopi, ArtCroissant, ArtGeprek } from "./FoodArt";
import { trackStep } from "../../lib/track";

// Satu simulasi, empat tahap: katalog, keranjang, bayar, masuk.
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
  { id: "masuk", label: "Masuk" },
];

const rupiah = (n) => `Rp${n.toLocaleString("id-ID")}`;

// Satu-satunya animasi angka di halaman ini.
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
      const p = Math.min(1, (t - t0) / 420);
      setShown(Math.round(start + delta * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else from.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, animate]);
  return shown;
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
              className={`press inline-flex min-h-11 items-center gap-2 rounded-xl px-3.5 text-[13px] font-medium ${
                on ? "bg-espresso text-cream" : "surface"
              }`}
            >
              <svg viewBox="0 0 24 24" className="size-4 shrink-0" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
                <circle cx="12" cy="10" r="2.4" />
              </svg>
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
  const originRef = useRef(null);
  const inView = useInView(frameRef, { amount: 0.25 });

  const [cart, setCart] = useState({});
  const [addr, setAddr] = useState(null);
  const [stage, setStage] = useState(0);
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

  const add = useCallback((p, fromAuto = false) => {
    if (!fromAuto) setAuto(false);
    setCart((c) => ({ ...c, [p.id]: Math.min((c[p.id] ?? 0) + 1, 3) }));
  }, []);

  const pickAddr = useCallback((a, fromAuto = false) => {
    if (!fromAuto) setAuto(false);
    setAddr(a);
  }, []);

  const goto = useCallback(
    (i, fromAuto = false) => {
      if (!fromAuto) setAuto(false);
      setStage(i);
      trackStep(STAGES[i].id);
    },
    []
  );

  // Satu gerakan tanda tangan: kartu order pindah ke dashboard.
  const kirim = useCallback(
    (fromAuto = false) => {
      if (!fromAuto) setAuto(false);
      if (reduce || !frameRef.current || !originRef.current) {
        goto(3, fromAuto);
        return;
      }
      const f = frameRef.current.getBoundingClientRect();
      const o = originRef.current.getBoundingClientRect();
      setFlight({
        w: Math.min(o.width, 260),
        from: { x: o.left - f.left, y: o.top - f.top },
        to: { x: o.left - f.left, y: 64 },
      });
    },
    [reduce, goto]
  );

  const reset = useCallback(() => {
    setAuto(false);
    setCart({});
    setAddr(null);
    setFlight(null);
    setStage(0);
  }, []);

  // Jalan sendiri sekali kalau kelihatan di layar, berhenti pada sentuhan
  // pertama. Reduced motion nggak ikut jalan sama sekali.
  useEffect(() => {
    if (!auto || !inView || reduce || flight) return;
    let t;
    if (id === "katalog")
      t = setTimeout(
        () => (count ? goto(1, true) : add(MENU[0], true)),
        count ? 1000 : 1500
      );
    else if (id === "keranjang")
      t = setTimeout(
        () => (addr ? goto(2, true) : pickAddr(TUJUAN[0], true)),
        addr ? 1000 : 1200
      );
    else if (id === "bayar") t = setTimeout(() => kirim(true), 1700);
    return () => clearTimeout(t);
  }, [auto, inView, reduce, flight, id, count, addr, add, pickAddr, goto, kirim]);

  const siap =
    (id === "katalog" && count > 0) ||
    (id === "keranjang" && Boolean(addr)) ||
    id === "bayar" ||
    id === "masuk";

  const aksi = {
    katalog: count ? "Lanjut ke keranjang" : "Pilih produk dulu",
    keranjang: addr ? "Bayar" : "Pilih alamat dulu",
    bayar: "Kirim pesanan",
    masuk: "Coba lagi dari awal",
  }[id];

  const onAksi = () => {
    if (id === "bayar") kirim();
    else if (id === "masuk") reset();
    else goto(stage + 1);
  };

  return (
    <div>
      <div
        ref={frameRef}
        className="surface relative overflow-hidden rounded-[20px]"
      >
        {/* kepala jendela */}
        <div className="flex items-center gap-2 border-b border-espresso/12 bg-sand/60 px-3 py-2">
          <span className="flex gap-1" aria-hidden="true">
            <span className="size-1.5 rounded-full bg-espresso/25" />
            <span className="size-1.5 rounded-full bg-espresso/25" />
            <span className="size-1.5 rounded-full bg-espresso/25" />
          </span>
          <span className="mx-auto truncate rounded-full bg-card px-3 py-0.5 text-[10px] text-espresso/80">
            ordistore.studioharel.id
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
                  className={`tnum flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
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
              transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
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
                          onClick={() => add(p)}
                          className="press relative overflow-hidden rounded-lg text-left"
                          style={{
                            boxShadow: qty
                              ? "0 0 0 2px var(--color-coral)"
                              : "var(--shadow-border)",
                          }}
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
                                <span className="tnum rounded-md bg-coral px-1.5 text-[10px] font-bold text-cream">
                                  {qty}x
                                </span>
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
                <div ref={originRef}>
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

              {id === "masuk" && (
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-[13px] font-bold">Pesanan masuk</p>
                    <span className="rounded-md bg-coral px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cream">
                      order baru
                    </span>
                  </div>
                  <div className="mt-2.5 surface rounded-xl p-3">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="tnum text-[12px] font-bold text-coral-deep">
                        #0231
                      </span>
                      <span className="tnum text-[13px] font-bold">
                        {rupiah(total)}
                      </span>
                    </div>
                    <p className="mt-1 text-[12px] leading-snug text-espresso/85">
                      {items.map((i) => `${i.qty}x ${i.name}`).join(", ")}
                    </p>
                    <p className="mt-1 text-[12px] text-espresso/80">
                      Antar ke {addr?.label}, {addr?.jarak}
                    </p>
                  </div>
                  <div className="mt-2.5 rounded-xl bg-mint px-3 py-2.5">
                    <p className="text-[11px] font-bold text-mint-deep">
                      WhatsApp kamu bunyi
                    </p>
                    <p className="mt-0.5 text-[11px] leading-snug">
                      Order #0231 masuk. Datanya sudah lengkap.
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
          <button
            type="button"
            onClick={onAksi}
            disabled={!siap}
            className={`press ml-auto inline-flex min-h-11 shrink-0 items-center rounded-xl px-4 text-[14px] font-bold ${
              siap
                ? "bg-coral text-cream hover:bg-coral-deep"
                : "cursor-not-allowed bg-espresso/10 text-espresso/80"
            }`}
          >
            {aksi}
          </button>
        </div>

        {/* kartu order yang pindah ke dashboard */}
        <AnimatePresence>
          {flight && (
            <motion.div
              initial={{ x: flight.from.x, y: flight.from.y, opacity: 1, scale: 1 }}
              animate={{ x: flight.to.x, y: flight.to.y, opacity: 0.15, scale: 0.72 }}
              transition={{ duration: 0.55, ease: [0.5, 0, 0.2, 1] }}
              onAnimationComplete={() => {
                setFlight(null);
                setStage(3);
                trackStep("masuk");
              }}
              style={{ width: flight.w }}
              aria-hidden="true"
              className="surface pointer-events-none absolute left-0 top-0 z-30 rounded-xl px-3 py-2"
            >
              <p className="text-[11px] font-bold">Order #0231</p>
              <p className="tnum text-[11px]">{rupiah(total)}</p>
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
