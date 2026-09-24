import { useEffect, useMemo, useState } from "react";
import { DEMO_URL, STORE_EXAMPLES, WHATSAPP_CTA_LINK } from "../data/content";
import { buildDays, heroDateWindow } from "../lib/dates";
import { rp } from "../lib/format";
import { useLiveMotion } from "../hooks/useLiveMotion";
import Shopfront from "./hero/Shopfront";
import Street from "./hero/Street";

function newCode(store) {
  return `${store.code}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

function KeyTag({ store }) {
  return (
    <div
      className="card-ink relative w-[214px] rounded-[14px] py-3 pr-3 pl-10 text-left"
      role="img"
      aria-label={`Contoh: hosting, database, dan domain atas nama ${store.name}, dibayar sekali.`}
    >
      <span className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 rounded-full border-[2.5px] border-ink bg-paper" aria-hidden="true" />
      <p className="font-mono-label text-[10.5px] uppercase text-ink-2" aria-hidden="true">
        Kuncinya atas nama
      </p>
      <p className="truncate font-headline text-base leading-tight" style={{ color: store.brand }} aria-hidden="true">
        {store.name}
      </p>
      <p className="mt-1 text-[11.5px] leading-snug text-ink-2" aria-hidden="true">
        Hosting, database, domain. Dibayar sekali.
      </p>
      <span className="absolute -top-2.5 right-3 rounded-md border-2 border-ink bg-highlight px-1.5 py-0.5 font-mono-label text-[9.5px] font-semibold uppercase" aria-hidden="true">
        contoh
      </span>
    </div>
  );
}

export default function Hero() {
  const { ref, active, reduce } = useLiveMotion(0.3);
  const days = useMemo(() => buildDays(9), []);
  const { chips, selectedKey, firstKey } = useMemo(() => heroDateWindow(days), [days]);

  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState(3);
  const [toast, setToast] = useState(true);
  const [flipKey, setFlipKey] = useState(0);
  const [code, setCode] = useState(`${STORE_EXAMPLES[0].code}-K3F9Q`);

  const store = STORE_EXAMPLES[idx];

  // One "day" per example store: the sign flips to the new name, a date is
  // picked, two items go in the basket, the new-order bell rings.
  useEffect(() => {
    if (!active) return;
    const s = STORE_EXAMPLES[idx];
    const timers = [
      setTimeout(() => {
        setPhase(0);
        setToast(false);
        setFlipKey((k) => k + 1);
      }, 0),
      setTimeout(() => setPhase(1), 1300),
      setTimeout(() => setPhase(2), 1900),
      setTimeout(() => setPhase(3), 2500),
      setTimeout(() => {
        setCode(newCode(s));
        setToast(true);
      }, 3200),
      setTimeout(() => setToast(false), 5800),
      setTimeout(() => setIdx((i) => (i + 1) % STORE_EXAMPLES.length), 6600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [active, idx]);

  const qty = Math.max(0, phase - 1);

  return (
    <section
      id="top"
      ref={ref}
      className="relative overflow-hidden pt-28 sm:pt-32"
      style={{ backgroundImage: "radial-gradient(760px 380px at 92% -8%, #FFDDB0 0%, rgb(255 221 176 / 0) 62%)" }}
    >
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-end gap-12 px-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <div className="lg:pb-16">
          <span className="chip">
            <span className="size-2 rounded-[3px] bg-pen" aria-hidden="true" />
            Kayak punya ruko sendiri, versi online
          </span>
          <h1 className="font-headline mt-5 mb-5 text-[clamp(2.3rem,5.4vw,4rem)] leading-[1.04] text-balance">
            Website pesanan toko kamu, <mark className={`mark-hl ${reduce ? "" : "swipe"}`}>lunas jadi milikmu.</mark>
          </h1>
          <p className="max-w-[46ch] text-[17px] leading-relaxed text-ink-2 sm:text-lg">
            Namanya kamu yang pasang, kuncinya kamu yang pegang. Pelanggan pilih tanggal, pesan, bayar QRIS, lalu
            lacak pesanannya sendiri.
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

        <div className="relative flex flex-col items-center pb-2 lg:items-end lg:pr-6">
          <div
            aria-hidden="true"
            className={`absolute left-1/2 top-0 z-40 flex -translate-x-1/2 items-center gap-2.5 rounded-2xl border-[2.5px] border-ink bg-card py-2 pl-2.5 pr-3.5 shadow-[0_4px_0_0_var(--color-ink)] transition-all duration-500 lg:left-0 lg:translate-x-0 ${
              toast ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
            }`}
          >
            <span className={`grid size-8 shrink-0 place-items-center rounded-full border-2 border-ink bg-highlight ${toast && !reduce ? "bell-ring" : ""}`}>
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
          <div className="mt-12">
            <Shopfront store={store} chips={chips} selectedKey={phase >= 1 ? selectedKey : firstKey} qty={qty} flipKey={flipKey} />
          </div>
          <div className="relative z-30 mt-4 self-start rotate-[-4deg] sm:self-center lg:absolute lg:bottom-10 lg:left-0 lg:mt-0 lg:-translate-x-6">
            <KeyTag store={store} />
          </div>
        </div>
      </div>

      <div className="relative mt-8" style={{ "--awn": store.brand }}>
        <Street storeName={store.name} active={active} />
        <p className="pointer-events-none absolute bottom-3 left-1/2 z-10 flex w-max max-w-[calc(100%-2rem)] -translate-x-1/2 items-center gap-2 rounded-full border-2 border-ink bg-card py-1.5 pl-2 pr-3 text-center font-mono-label text-[11px] sm:text-xs">
          <span className="size-4 shrink-0 rounded-full border-2 border-ink bg-highlight" aria-hidden="true" />
          <span className="sm:hidden">Geser jari di jalan, tokonya buka</span>
          <span className="hidden sm:inline">Gerakkan kursor di sepanjang jalan, tokonya buka</span>
        </p>
      </div>
    </section>
  );
}
