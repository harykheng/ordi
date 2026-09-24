import { useEffect, useMemo, useState } from "react";
import { DEMO_URL, STORE_EXAMPLES, WHATSAPP_CTA_LINK } from "../data/content";
import { buildDays, heroDateWindow } from "../lib/dates";
import { rp } from "../lib/format";
import { useLiveMotion } from "../hooks/useLiveMotion";
import LiveStorefront from "./hero/LiveStorefront";
import OwnershipReceipt from "./hero/OwnershipReceipt";

const STAMP_WORDS = ["LUNAS", "MILIKMU", "SIAP DIAMBIL", "PESANAN MASUK", "DIANTAR"];
const MAX_STAMPS = 8;

function newCode(store) {
  return `${store.code}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

export default function Hero() {
  const { ref, active, reduce } = useLiveMotion(0.3);
  const days = useMemo(() => buildDays(9), []);
  const { chips, selectedKey, firstKey } = useMemo(() => heroDateWindow(days), [days]);

  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState(3); // 0 start, 1 date picked, 2-3 items added
  const [toast, setToast] = useState(true);
  const [printKey, setPrintKey] = useState(0);
  const [code, setCode] = useState(`${STORE_EXAMPLES[0].code}-K3F9Q`);
  const [stamps, setStamps] = useState([]);

  const store = STORE_EXAMPLES[idx];

  // One "shift" per example store: print the receipt, pick a date, add two
  // items, ring the new-order toast, then hand over to the next store.
  useEffect(() => {
    if (!active) return;
    const s = STORE_EXAMPLES[idx];
    const timers = [
      setTimeout(() => {
        setPhase(0);
        setToast(false);
        setPrintKey((k) => k + 1);
      }, 0),
      setTimeout(() => setPhase(1), 1900),
      setTimeout(() => setPhase(2), 2600),
      setTimeout(() => setPhase(3), 3200),
      setTimeout(() => {
        setCode(newCode(s));
        setToast(true);
      }, 3900),
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
      <div className="relative z-10 mx-auto grid grid-cols-1 max-w-6xl items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
        <div>
          <span className="chip">
            <span className="size-2 rounded-full bg-ember" aria-hidden="true" />
            Untuk kafe, resto, bakery, dan toko PO
          </span>
          <h1 className="font-headline mt-5 mb-5 text-[clamp(3rem,7.2vw,5.4rem)] leading-[0.94] text-balance">
            Website pesanan toko kamu,{" "}
            <mark className={`mark-hl ${reduce ? "" : "swipe"}`}>lunas jadi milikmu.</mark>
          </h1>
          <p className="max-w-[44ch] text-[17px] leading-relaxed text-ink-2 sm:text-lg">
            Pelanggan pilih tanggal, pesan, bayar QRIS, lalu lacak pesanannya sendiri. Kamu pegang
            satu dashboard. Semuanya dibangun ngikutin cara toko kamu jalan.
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

        <div className="relative flex flex-col items-center pt-16 sm:flex-row sm:items-end sm:justify-center sm:gap-5 lg:block lg:h-[560px] lg:pt-0">
          <div
            aria-hidden="true"
            className={`absolute left-1/2 top-0 z-30 flex -translate-x-1/2 items-center gap-2.5 rounded-2xl border-2 border-ink bg-card py-2 pl-2.5 pr-3.5 shadow-[4px_4px_0_0_var(--color-ink)] transition-all duration-500 lg:left-2 lg:translate-x-0 ${toast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}`}
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
                {code} · {rp(store.items[0].price * 2)}
              </span>
            </span>
          </div>

          <p aria-hidden="true" className="pen absolute left-0 top-[118px] z-30 hidden items-end gap-0.5 text-lg leading-tight lg:flex">
            <span className="-rotate-[4deg]">
              nama, logo &amp; warna
              <br />
              toko kamu sendiri
            </span>
            <svg width="56" height="40" viewBox="0 0 56 40" className="fill-none stroke-current" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 34 C 20 38, 36 30, 50 12" />
              <path d="M39 11 L51 10 L48 22" />
            </svg>
          </p>

          <LiveStorefront
            store={store}
            chips={chips}
            selectedKey={picked}
            qty={qty}
            className="relative z-10 w-full max-w-[330px] sm:w-[292px] lg:absolute lg:right-0 lg:top-[42px] lg:-rotate-[1.5deg]"
          />

          <div className="relative z-20 -mt-3 w-[min(236px,80%)] self-end rotate-[2.5deg] sm:mt-0 sm:w-[232px] sm:self-auto lg:absolute lg:bottom-1 lg:left-0">
            <OwnershipReceipt store={store} printKey={printKey} animate={!reduce && printKey > 0} />
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
