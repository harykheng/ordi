import { useRef } from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";
import Reveal from "./Reveal";
import { OWNER_DAY, OWNER_EXTRAS } from "../data/content";
import { rp } from "../lib/format";

/** Clip-reveals its child like paper coming out of a printer, once in view. */
function PrintIn({ children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  // The observer sits on a wrapper: Chrome treats an element whose own
  // clip-path hides it as never intersecting.
  return (
    <div ref={ref}>
      <div className={`${className} ${inView ? "receipt-print" : "[clip-path:inset(0_-14px_100%_-14px)]"}`}>{children}</div>
    </div>
  );
}

function Prep() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="grid grid-cols-2 gap-2.5">
        {[
          ["Harus siap hari ini", "18"],
          ["Harus siap besok", "7"],
        ].map(([label, n]) => (
          <div key={label} className="card-ink rounded-xl p-3">
            <p className="text-[11.5px] font-semibold text-ink-2">{label}</p>
            <p className="font-headline text-3xl leading-none">
              {n} <span className="font-body text-xs font-semibold text-ink-2">pesanan</span>
            </p>
          </div>
        ))}
      </div>
      <PrintIn className="ticket-wrap w-[250px] max-w-full rotate-1">
        <div className="ticket px-5 py-3.5 font-mono-label text-[11.5px] leading-relaxed">
          <p className="mb-1.5 border-b border-dashed border-line pb-1.5 font-headline text-base">Rekap produksi hari ini</p>
          <p className="flex justify-between font-semibold">
            <span>Roti Sobek Pandan</span>
            <b>24</b>
          </p>
          <p className="flex justify-between pl-3 text-ink-2">
            <span>Original</span>
            <span>14</span>
          </p>
          <p className="flex justify-between pl-3 text-ink-2">
            <span>Keju</span>
            <span>10</span>
          </p>
          <p className="flex justify-between font-semibold">
            <span>Bolu Gulung Keju</span>
            <b>9</b>
          </p>
          <p className="flex justify-between font-semibold">
            <span>Kue Nastar Toples</span>
            <b>6</b>
          </p>
        </div>
      </PrintIn>
    </div>
  );
}

function Notif() {
  return (
    <div className="card-ink flex w-[270px] max-w-full items-center gap-3 rounded-2xl p-3">
      <span className="relative grid grid-cols-1 size-10 shrink-0 place-items-center rounded-full border border-line bg-highlight">
        <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-ink stroke-2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15z" />
          <path d="M10 20a2 2 0 0 0 4 0" />
        </svg>
        <span className="absolute -right-1.5 -top-1.5 grid grid-cols-1 size-5 place-items-center rounded-full border border-line bg-ember font-mono-label text-[10px] font-bold">3</span>
      </span>
      <span>
        <b className="block text-sm">3 pesanan baru</b>
        <span className="font-mono-label text-[11px] text-ink-2">YB-K3F9Q · YB-K3FA1 · YB-K3FB7</span>
      </span>
    </div>
  );
}

const LABELS = [
  ["YB-K3F9Q", "Rani S."],
  ["YB-K3FA1", "Dimas P."],
  ["YB-K3FB7", "Fitri A."],
];

function Labels() {
  return (
    <div className="relative h-[124px] w-[260px] max-w-full" aria-hidden="true">
      {LABELS.map(([code, name], i) => (
        <motion.div
          key={code}
          initial={{ opacity: 0, y: -18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: i * 0.18, type: "spring", stiffness: 260, damping: 18 }}
          className="absolute inset-x-0 flex justify-between rounded-[10px] border border-line bg-card px-3 py-2 font-mono-label text-xs font-semibold shadow-[var(--shadow-soft)]"
          style={{ top: i * 40, rotate: [-2, 1.5, -1][i] }}
        >
          <span>{code}</span>
          <span className="text-ink-2">{name}</span>
        </motion.div>
      ))}
    </div>
  );
}

function Confirm() {
  return (
    <div className="card-ink w-[280px] max-w-full p-3.5">
      <p className="flex justify-between font-mono-label text-xs font-semibold">
        <span>YB-K3F9Q · Rani S.</span>
        <span>{rp(73000)}</span>
      </p>
      <p className="mt-1 text-xs text-ink-2">Menunggu konfirmasi · bukti transfer masuk di WhatsApp</p>
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm font-bold">
        <span className="rounded-full border border-line bg-ink py-2 text-center text-paper">Konfirmasi</span>
        <span className="rounded-full border border-line py-2 text-center">Batalkan</span>
      </div>
      <p className="pen mt-2 text-[15px] leading-tight">batal = stok balik sendiri</p>
    </div>
  );
}

const BARS = [38, 52, 44, 70, 58, 82, 100];

function Recap() {
  return (
    <PrintIn className="receipt w-[270px] max-w-full -rotate-1 px-4 pt-4 pb-3 text-[11.5px] leading-relaxed">
      <p className="text-xs font-semibold uppercase tracking-[0.08em]">Rekap hari ini</p>
      <div className="receipt-rule my-2" />
      {[
        ["Pendapatan terkonfirmasi", rp(1845000)],
        ["Pesanan", "24"],
        ["Pengunjung", "186"],
        ["Terlaris", "Roti Sobek"],
      ].map(([k, v]) => (
        <div key={k} className="flex items-baseline gap-1.5">
          <span>{k}</span>
          <i className="leader" />
          <b className="font-semibold">{v}</b>
        </div>
      ))}
      <div className="mt-3 flex h-10 items-end gap-1" aria-hidden="true">
        {BARS.map((h, i) => (
          <span key={i} className={`flex-1 rounded-t-sm ${i === BARS.length - 1 ? "bg-ember" : "bg-ink/15"}`} style={{ height: `${h}%` }} />
        ))}
      </div>
      <p className="mt-3 rounded-full border border-line py-1.5 text-center font-semibold">Export CSV</p>
    </PrintIn>
  );
}

const VISUALS = { prep: Prep, notif: Notif, labels: Labels, confirm: Confirm, recap: Recap };
// Camemo-style pastel tiles behind each moment of the day.
const PASTELS = ["bg-highlight", "bg-mint", "bg-butter", "bg-lilac", "bg-highlight"];

export default function OwnerDay() {
  const railRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: railRef, offset: ["start 70%", "end 70%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  return (
    <section id="dashboard" className="tear-top scroll-mt-20 bg-meja px-5 pt-24 pb-20 sm:pb-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono-label text-xs uppercase tracking-[0.08em] text-ink-2">Yang kamu pegang</p>
          <h2 className="font-headline mt-3 max-w-[18ch] text-[clamp(2.1rem,4.4vw,3.2rem)] leading-[1.05] text-balance">
            Sehari di balik layar, <mark className="mark-hl">semua kecatat.</mark>
          </h2>
          <p className="mt-4 max-w-[56ch] text-ink-2 sm:text-lg">
            Dashboard-nya dirancang buat dibuka dari HP, di sela-sela layanin pembeli.
          </p>
        </Reveal>

        <div ref={railRef} className="relative mt-14 grid grid-cols-1 gap-14 pl-9 sm:pl-12">
          <div className="absolute bottom-2 left-[9px] top-2 w-[3px] overflow-hidden rounded bg-line sm:left-[13px]" aria-hidden="true">
            <motion.div className="h-full w-full origin-top rounded bg-ember" style={{ scaleY: fill }} />
          </div>
          {OWNER_DAY.map((item, i) => {
            const Visual = VISUALS[item.visual];
            return (
              <Reveal key={item.time}>
                <div className="relative grid grid-cols-1 gap-5 md:grid-cols-[88px_minmax(0,1fr)_minmax(0,300px)] md:gap-8">
                  <span
                    className="absolute -left-[33px] top-1.5 size-[15px] rounded-full border border-line bg-ember sm:-left-[41px]"
                    aria-hidden="true"
                  />
                  <p className="font-mono-label text-2xl font-bold leading-none">{item.time}</p>
                  <div>
                    <h3 className="font-headline text-[clamp(1.35rem,2.4vw,1.8rem)] leading-tight">{item.title}</h3>
                    <p className="mt-2.5 max-w-[48ch] leading-relaxed text-ink-2">{item.body}</p>
                    {item.before && (
                      <p className="pen mt-3 max-w-[40ch] text-[17px] leading-snug">{item.before}</p>
                    )}
                  </div>
                  <div className={`rounded-3xl p-4 sm:p-5 md:justify-self-end ${PASTELS[i % PASTELS.length]}`}>
                    <Visual />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-16 flex flex-wrap items-center gap-2.5">
            <p className="mr-1 text-sm font-bold">Diatur sendiri dari HP:</p>
            {OWNER_EXTRAS.map((x) => (
              <span key={x} className="rounded-full border border-line bg-card px-3 py-1.5 text-[13px] font-semibold">
                {x}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
