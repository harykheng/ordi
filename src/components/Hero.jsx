import { Fragment, useEffect, useMemo, useState } from "react";
import { DEMO_URL, STORE_EXAMPLES, WHATSAPP_CTA_LINK } from "../data/content";
import { buildDays, heroDateWindow } from "../lib/dates";
import { rp } from "../lib/format";
import { useLiveMotion } from "../hooks/useLiveMotion";
import LiveStorefront from "./hero/LiveStorefront";
import { FakeQR } from "./flow/FlowScreens";

const STAMP_WORDS = ["LUNAS", "MILIKMU", "SIAP DIAMBIL", "PESANAN MASUK", "DIANTAR"];
const MAX_STAMPS = 8;

// Illustrative dashboard figures, one per STORE_EXAMPLES entry.
const READY_TODAY = [18, 11, 23];
const WEEK_BARS = [38, 52, 44, 70, 58, 82, 100];
const STATUS_STEPS = ["Menunggu Konfirmasi", "Diproses", "Selesai"];

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

export default function Hero() {
  const { ref, active, reduce } = useLiveMotion(0.3);
  const days = useMemo(() => buildDays(9), []);
  const { chips, selectedKey, firstKey } = useMemo(() => heroDateWindow(days), [days]);

  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState(3); // 0 start, 1 date picked, 2-3 items added
  const [toast, setToast] = useState(true);
  const [cycle, setCycle] = useState(0); // restarts the count-up and bars per store
  const [scan, setScan] = useState(0); // restarts the QR scan line
  const [code, setCode] = useState(`${STORE_EXAMPLES[0].code}-K3F9Q`);
  const [track, setTrack] = useState({ code, step: 1 }); // order shown on the status card
  const [stamps, setStamps] = useState([]);

  const store = STORE_EXAMPLES[idx];
  const total = rp(store.items[0].price * 2);

  // One "shift" per example store: the dashboard loads, a customer picks a
  // date, adds two items and scans the QRIS, the order lands with a bell, then
  // gets confirmed (payment is checked by hand, so it waits first).
  useEffect(() => {
    if (!active) return;
    const s = STORE_EXAMPLES[idx];
    const timers = [
      setTimeout(() => {
        setPhase(0);
        setToast(false);
        setCycle((c) => c + 1);
        // keep the status card on an order from the store now on screen
        setTrack((t) => (t.code.startsWith(`${s.code}-`) ? t : { code: newCode(s), step: 1 }));
      }, 0),
      setTimeout(() => setPhase(1), 1300),
      setTimeout(() => setPhase(2), 1900),
      setTimeout(() => setPhase(3), 2500),
      setTimeout(() => setScan((n) => n + 1), 3000),
      setTimeout(() => {
        const c = newCode(s);
        setCode(c);
        setTrack({ code: c, step: 0 });
        setToast(true);
      }, 3900),
      setTimeout(() => setTrack((t) => ({ ...t, step: 1 })), 5400),
      setTimeout(() => setToast(false), 6700),
      setTimeout(() => setIdx((i) => (i + 1) % STORE_EXAMPLES.length), 7500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [active, idx]);

  const qty = Math.max(0, phase - 1);
  const picked = phase >= 1 ? selectedKey : firstKey;

  const onStamp = (e) => {
    if (e.target.closest("a, button")) return;
    const box = e.currentTarget.getBoundingClientRect();
    setStamps((list) => {
      const n = (list.length ? list[list.length - 1].n : -1) + 1;
      const next = {
        n,
        x: e.clientX - box.left,
        y: e.clientY - box.top,
        r: (Math.random() * 24 - 12).toFixed(1),
        word: STAMP_WORDS[n % STAMP_WORDS.length],
        blue: n % 3 === 2,
      };
      return [...list, next].slice(-MAX_STAMPS);
    });
  };

  return (
    <section
      id="top"
      ref={ref}
      onClick={onStamp}
      className="cursor-stamp relative overflow-hidden px-5 pt-28 pb-24 sm:pt-32 sm:pb-28"
    >
      <div className="relative z-10 mx-auto grid grid-cols-1 max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_540px] lg:gap-8">
        <div>
          <span className="chip">
            <span className="size-2 rounded-full bg-ember" aria-hidden="true" />
            Untuk kafe, resto, bakery, dan toko PO
          </span>
          {/* Three fixed lines; the size tracks the text column so the longest
              one ("pesanan sendiri.", ~8.1em) always fits: full width minus
              the page gutter below lg, the column left of the 540px cluster
              on lg. */}
          <h1 className="font-headline mt-5 mb-5 text-[length:clamp(2rem,calc((100vw_-_40px)/8.4),4.4rem)] leading-[1.02] lg:text-[length:clamp(2.6rem,calc((100vw_-_612px)/8.4),4.4rem)]">
            Punya toko,
            <br />
            punya{" "}
            <mark className={`mark-hl ${reduce ? "" : "swipe"}`}>
              sistem
              <br />
              pesanan sendiri.
            </mark>
          </h1>
          <p className="max-w-[46ch] text-[17px] leading-relaxed text-ink-2 sm:text-lg">
            Pelanggan pilih tanggal, pesan, bayar QRIS, lalu lacak pesanannya sendiri. Kamu pegang
            satu dashboard. Hosting, database, dan domain atas nama bisnis kamu.
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

        <div
          role="img"
          aria-label="Contoh tampilan Ordi: katalog toko dengan pilihan tanggal, pembayaran QRIS, notifikasi pesanan baru, jumlah pesanan yang harus siap hari ini, dan status pesanan."
          className="relative mx-auto h-[736px] w-full max-w-[540px] sm:h-[600px]"
        >
          <div
            className={`absolute left-0 top-0 z-30 flex -rotate-1 items-center gap-2.5 rounded-2xl border-2 border-ink bg-card py-2 pl-2.5 pr-3.5 shadow-[4px_4px_0_0_var(--color-ink)] transition-all duration-500 ${toast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}`}
          >
            <span className={`grid place-items-center size-8 shrink-0 rounded-full border-2 border-ink bg-highlight ${toast && !reduce ? "bell-ring" : ""}`}>
              <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-ink stroke-2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15z" />
                <path d="M10 20a2 2 0 0 0 4 0" />
              </svg>
            </span>
            <span className="whitespace-nowrap">
              <b className="block text-[13px] leading-tight">Pesanan baru masuk</b>
              <span className="font-mono-label text-[11.5px] text-ink-2">
                {code} · {total}
              </span>
            </span>
          </div>

          <p className="pen absolute left-0 top-[118px] z-30 hidden text-[17px] leading-[1.15] sm:block">
            <svg width="54" height="34" viewBox="0 0 54 34" className="mb-1 ml-8 fill-none stroke-current" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 31 C 14 14, 30 6, 50 7" />
              <path d="M41 1 L51 7 L42 14" />
            </svg>
            <span className="block -rotate-[4deg]">
              nama, logo
              <br />
              &amp; warna toko
              <br />
              kamu sendiri
            </span>
          </p>

          <LiveStorefront
            store={store}
            chips={chips}
            selectedKey={picked}
            qty={qty}
            className="absolute left-1/2 top-[60px] z-10 w-[272px] -translate-x-1/2 sm:left-[104px] sm:top-[56px] sm:w-[292px] sm:translate-x-0 sm:-rotate-1"
          />

          <div
            className="card-drop absolute right-0 top-[452px] z-20 w-[124px] rotate-[3deg] sm:top-[150px] sm:w-[156px]"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="card-ink p-3 text-center shadow-[4px_4px_0_0_var(--color-ink)]">
              <p className="font-mono-label text-[11px] font-semibold uppercase tracking-[0.08em]">Bayar QRIS</p>
              <div className="relative mx-auto my-2 w-[84px] overflow-hidden rounded-md border-[1.5px] border-ink bg-white p-1">
                <FakeQR className="block w-full" />
                {scan > 0 && <span key={scan} className="qr-scan" />}
              </div>
              <b className="font-mono-label text-[15px]">{total}</b>
            </div>
          </div>

          <div
            className="card-drop absolute left-0 top-[444px] z-20 w-[168px] -rotate-2 sm:top-[440px] sm:w-[212px]"
            style={{ animationDelay: "0.45s" }}
          >
            <div className="card-ink p-3.5 shadow-[4px_4px_0_0_var(--color-ink)]">
              <p className="text-xs font-bold text-ink-2">Harus siap hari ini</p>
              <p className="mt-1 font-headline text-[34px] leading-none">
                <CountUp to={READY_TODAY[idx]} run={cycle} />
                <small className="ml-1.5 font-body text-xs font-semibold tracking-normal text-ink-2">pesanan</small>
              </p>
              <div key={cycle} className="mt-3 flex h-10 items-end gap-1.5">
                {WEEK_BARS.map((h, i) => (
                  <i
                    key={i}
                    className={`grow-bar flex-1 rounded-t-[4px] border-[1.5px] border-ink ${i === WEEK_BARS.length - 1 ? "bg-ember" : "bg-meja"}`}
                    style={{ height: `${h}%`, animationDelay: `${i * 0.05}s` }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            className="card-drop absolute left-1/2 top-[632px] z-20 w-[226px] -translate-x-1/2 rotate-[1.5deg] sm:left-auto sm:right-1.5 sm:top-auto sm:bottom-0 sm:translate-x-0"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="card-ink px-3.5 py-3 shadow-[4px_4px_0_0_var(--color-ink)]">
              <div className="flex items-center justify-between gap-2">
                <p className="font-mono-label text-[13px] font-bold">{track.code}</p>
                <span className="font-mono-label text-[10px] uppercase tracking-[0.08em] text-ink-2">lacak</span>
              </div>
              <div className="mt-2.5 flex items-center gap-1.5">
                {STATUS_STEPS.map((label, i) => (
                  <Fragment key={label}>
                    {i > 0 && <s className={`h-0.5 flex-1 transition-colors duration-300 ${i <= track.step ? "bg-ink" : "bg-ink/20"}`} />}
                    <i
                      className={`size-3 shrink-0 rounded-full border-[1.5px] border-ink transition-colors duration-300 ${
                        i < track.step ? "bg-ink" : i === track.step ? `bg-ember ${active ? "dot-ping" : ""}` : "bg-card"
                      }`}
                    />
                  </Fragment>
                ))}
              </div>
              <p className="mt-2 whitespace-nowrap text-[12.5px] font-bold">
                Status: <span className="text-ember-deep">{STATUS_STEPS[track.step]}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden="true">
        {stamps.map((s) => (
          <span
            key={s.n}
            className={`stamp stamp-thump absolute text-xl ${s.blue ? "stamp-blue" : ""}`}
            style={{ left: s.x, top: s.y, translate: "-50% -50%", "--r": `${s.r}deg` }}
          >
            {s.word}
          </span>
        ))}
      </div>

      <p className="pointer-events-none absolute bottom-6 left-1/2 z-30 flex w-max max-w-[calc(100%-2rem)] -translate-x-1/2 items-center gap-2 rounded-full border-[1.5px] border-ink bg-card py-1.5 pl-2 pr-3 text-center font-mono-label text-[11px] sm:text-xs">
        <span className="size-4 shrink-0 rounded-full border-[1.5px] border-ink bg-ember" aria-hidden="true" />
        <span className="sm:hidden">Ketuk di mana aja, capnya nempel</span>
        <span className="hidden sm:inline">Klik atau ketuk di mana aja, capnya nempel</span>
      </p>
    </section>
  );
}
