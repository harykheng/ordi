import { useEffect, useMemo, useRef, useState } from "react";
import { DEMO_URL, STORE_EXAMPLES, WHATSAPP_CTA_LINK } from "../data/content";
import { buildDays, heroDateWindow } from "../lib/dates";
import { rp } from "../lib/format";
import { useLiveMotion } from "../hooks/useLiveMotion";
import ShopCard from "./hero/ShopCard";
import { FakeQR } from "./flow/FlowScreens";

const BARS = [38, 52, 44, 70, 58, 82, 100];
const COUNTS = [18, 11, 23];

function newCode(store) {
  return `${store.code}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

function CountUp({ to, run }) {
  const [n, setN] = useState(to);
  useEffect(() => {
    if (!run) return;
    let raf;
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / 1100);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, run]);
  return <>{n}</>;
}

/** Satellites drift with the cursor at different depths (--d). */
const float = (d) => ({
  "--d": d,
  transform: "translate3d(calc(var(--tx, 0) * var(--d) * 14px), calc(var(--ty, 0) * var(--d) * 12px), 0)",
});

export default function Hero() {
  const { ref, active, reduce } = useLiveMotion(0.3);
  const days = useMemo(() => buildDays(9), []);
  const { chips, selectedKey, firstKey } = useMemo(() => heroDateWindow(days), [days]);
  const clusterRef = useRef(null);
  const raf = useRef(0);

  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState(3);
  const [toast, setToast] = useState(true);
  const [pulse, setPulse] = useState(0);
  const [code, setCode] = useState(`${STORE_EXAMPLES[0].code}-K3F9Q`);

  const store = STORE_EXAMPLES[idx];

  useEffect(() => {
    if (!active) return;
    const s = STORE_EXAMPLES[idx];
    const timers = [
      setTimeout(() => {
        setPhase(0);
        setToast(false);
      }, 0),
      setTimeout(() => setPhase(1), 1200),
      setTimeout(() => setPhase(2), 1800),
      setTimeout(() => setPhase(3), 2400),
      setTimeout(() => {
        setCode(newCode(s));
        setToast(true);
        setPulse((p) => p + 1);
      }, 3000),
      setTimeout(() => setToast(false), 5800),
      setTimeout(() => setIdx((i) => (i + 1) % STORE_EXAMPLES.length), 7000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [active, idx]);

  // Cursor tilt + glow, written straight to CSS custom properties (no re-render).
  const onMove = (e) => {
    if (reduce) return;
    const box = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - box.left) / box.width - 0.5;
    const y = (e.clientY - box.top) / box.height - 0.5;
    e.currentTarget.style.setProperty("--mx", `${e.clientX - box.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - box.top}px`);
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      clusterRef.current?.style.setProperty("--tx", (x * 2).toFixed(3));
      clusterRef.current?.style.setProperty("--ty", (y * 2).toFixed(3));
    });
  };
  const onLeave = () => {
    clusterRef.current?.style.setProperty("--tx", "0");
    clusterRef.current?.style.setProperty("--ty", "0");
  };

  const qty = Math.max(0, phase - 1);

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="group relative overflow-hidden px-5 pt-28 pb-20 sm:pt-32 sm:pb-24"
    >
      <div className="drift pointer-events-none absolute -right-32 -top-44 size-[540px] rounded-full bg-[radial-gradient(circle,#FFD3B4_0%,rgb(255_211_180/0)_68%)]" aria-hidden="true" />
      <div
        className="drift pointer-events-none absolute -bottom-56 -left-40 size-[480px] rounded-full bg-[radial-gradient(circle,#CFEFE1_0%,rgb(207_239_225/0)_68%)] [animation-direction:alternate-reverse]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(280px 280px at var(--mx, 70%) var(--my, 40%), rgb(255 160 100 / 0.2), rgb(255 160 100 / 0) 70%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-8">
        <div>
          <span className="chip">
            <span className="relative size-2 rounded-full bg-pen ping" aria-hidden="true" />
            Untuk kafe, resto, bakery, dan toko PO
          </span>
          <h1 className="font-headline mt-5 mb-5 text-[clamp(2.6rem,6vw,4.4rem)] leading-[1.02] text-balance">
            Website pesanan toko kamu, <mark className={`mark-hl ${reduce ? "" : "swipe"}`}>lunas jadi milikmu.</mark>
          </h1>
          <p className="max-w-[46ch] text-[17px] leading-relaxed text-ink-2 sm:text-lg">
            Pelanggan pilih tanggal, pesan, bayar QRIS, lalu lacak pesanannya sendiri. Kamu pegang satu dashboard.
            Hosting, database, dan domain atas nama bisnis kamu.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start">
            <a
              href={WHATSAPP_CTA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => window.gtag?.("event", "klik_wa", { lokasi: "hero" })}
              className="btn btn-primary"
            >
              Ceritain Toko Kamu di WhatsApp
            </a>
            <div className="flex flex-col gap-2">
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.gtag?.("event", "klik_demo", { lokasi: "hero" })}
                className="btn btn-secondary"
              >
                Coba Demo Ordi
              </a>
              <p className="pl-1 font-mono-label text-[11px] text-ink-2">Demo interaktif, data contoh, bukan toko asli</p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto h-[610px] w-full max-w-[520px] [perspective:1100px] sm:h-[540px]">
          <div
            ref={clusterRef}
            className="absolute inset-0 transition-transform duration-300 ease-out [transform-style:preserve-3d] [transform:rotateX(calc(var(--ty,0)*-5deg))_rotateY(calc(var(--tx,0)*6deg))]"
          >
            <div className="absolute left-1/2 top-[64px] w-[276px] -translate-x-1/2 transition-transform duration-300 ease-out sm:top-[46px]" style={float(0.6)}>
              <div key={idx} className="receipt-print">
                <ShopCard store={store} chips={chips} selectedKey={phase >= 1 ? selectedKey : firstKey} qty={qty} />
              </div>
              {/* example stores are never presented as real clients */}
              <span className="absolute -top-2.5 right-5 z-10 rounded-full border border-line bg-card px-2 py-0.5 font-mono-label text-[10px] text-ink-2 shadow-[var(--shadow-soft)]">
                contoh
              </span>
            </div>

            <div
              aria-hidden="true"
              className={`absolute left-0 top-0 z-30 flex items-center gap-2.5 rounded-2xl border border-line bg-card py-2.5 pl-2.5 pr-3.5 shadow-[var(--shadow-lift)] transition-[opacity,translate] duration-500 ${
                toast ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
              }`}
              style={float(2.2)}
            >
              <span className="grid size-8 place-items-center rounded-xl bg-mint">
                <span className="ping relative size-2.5 rounded-full bg-pen" />
              </span>
              <span className="whitespace-nowrap">
                <b className="block text-[13px] leading-tight">Pesanan baru masuk</b>
                <span className="font-mono-label text-[11.5px] text-ink-2">
                  {code} · {rp(store.items[0].price * 2)}
                </span>
              </span>
            </div>

            <div className="float-bob absolute bottom-0 right-0 z-20 w-[136px] sm:bottom-auto sm:right-[-6px] sm:top-[150px] sm:w-[150px] [animation-delay:-1.2s]" style={float(1.7)} aria-hidden="true">
              <div className="card-ink p-3 text-center">
                <p className="font-mono-label text-[11px] font-semibold text-ink-2">Bayar QRIS</p>
                <div className="relative mx-auto my-2 w-[84px] rounded-lg bg-white">
                  <FakeQR className="block w-full" />
                </div>
                <b className="font-mono-label text-[15px]">{rp(store.items[0].price * 2)}</b>
              </div>
            </div>

            <div className="float-bob absolute bottom-0 left-0 z-20 w-[186px] sm:bottom-10 sm:w-[214px] [animation-delay:-2.6s]" style={float(1.4)} aria-hidden="true">
              <div className="card-ink p-3.5">
                <p className="text-xs font-semibold text-ink-2">Harus siap hari ini</p>
                <p className="font-headline text-[34px] leading-tight">
                  <CountUp to={COUNTS[idx]} run={pulse} />
                  <small className="ml-1 font-body text-xs font-semibold tracking-normal text-ink-2">pesanan</small>
                </p>
                <div key={pulse} className="mt-2 flex h-11 items-end gap-1.5">
                  {BARS.map((h, i) => (
                    <i
                      key={i}
                      className={`grow-bar flex-1 rounded-t-[5px] rounded-b-[2px] ${i === BARS.length - 1 ? "bg-ember" : "bg-[#f2e7d8]"}`}
                      style={{ height: `${h}%`, animationDelay: `${i * 0.05}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="float-bob absolute bottom-0 right-2 z-20 hidden w-[206px] sm:block [animation-delay:-0.4s]" style={float(1.9)} aria-hidden="true">
              <div className="card-ink px-3.5 py-3">
                <p className="font-mono-label text-[13px] font-bold">{code}</p>
                <div className="mt-2.5 flex items-center gap-1.5">
                  <i className="size-2.5 rounded-full bg-ink" />
                  <s className="h-0.5 flex-1 bg-line" />
                  <i className="ping relative size-2.5 rounded-full bg-ember" />
                  <s className="h-0.5 flex-1 bg-line" />
                  <i className="size-2.5 rounded-full bg-line" />
                </div>
                <p className="mt-2 text-[12.5px] font-bold">
                  Status: <span className="text-ember-deep">Diproses</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
