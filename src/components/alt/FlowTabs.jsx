import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SectionHead } from "./Section";
import { ArtKopi, ArtCroissant, ArtGeprek } from "./FoodArt";
import { IconWhatsApp } from "./Icons";
import { FLOW } from "../../data/altContent";
import { trackStep, trackWa, waHref } from "../../lib/track";

const rupiah = (n) => `Rp${n.toLocaleString("id-ID")}`;

function Panel({ id }) {
  if (id === "katalog") {
    return (
      <div className="p-4">
        <p className="text-[13px] font-bold">Kopi Senja</p>
        <p className="text-[11px] text-espresso/80">Buka sampai 21:00</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            { Art: ArtKopi, name: "Kopi Susu Gula Aren", price: 18000 },
            { Art: ArtCroissant, name: "Croissant Butter", price: 22000 },
            { Art: ArtGeprek, name: "Nasi Ayam Geprek", price: 28000 },
          ].map(({ Art, name, price }) => (
            <div key={name} className="overflow-hidden rounded-lg bg-sand/50">
              <span className="block aspect-square">
                <Art />
              </span>
              <span className="block px-2 py-1.5">
                <span className="block text-[10px] font-semibold leading-tight">
                  {name}
                </span>
                <span className="tnum mt-0.5 block text-[10px] font-bold">
                  {rupiah(price)}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (id === "alamat") {
    return (
      <div className="p-4">
        <p className="label text-espresso/80">Alamat antar</p>
        <div className="mt-2 rounded-lg bg-sand/50 px-3 py-2.5 text-[13px]">
          Jl. Kemang Raya No. 12
        </div>
        <dl className="mt-3 space-y-1.5 text-[13px]">
          <div className="flex justify-between">
            <dt className="text-espresso/80">Jarak</dt>
            <dd className="tnum font-semibold">3,2 km</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-espresso/80">Ongkir</dt>
            <dd className="tnum font-semibold">{rupiah(9000)}</dd>
          </div>
        </dl>
        <div className="mt-3 flex items-baseline justify-between border-t border-espresso/12 pt-3">
          <span className="text-[13px] font-semibold">Total</span>
          <span className="display tnum text-[1.4rem] text-coral-deep">
            {rupiah(45000)}
          </span>
        </div>
      </div>
    );
  }

  if (id === "bayar") {
    return (
      <div className="flex items-center gap-4 p-4">
        <svg
          viewBox="0 0 100 100"
          className="size-24 shrink-0 rounded-lg"
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
        <div className="min-w-0">
          <p className="text-[12px] text-espresso/80">Nominal QR</p>
          <p className="display tnum text-[1.6rem] text-coral-deep">
            {rupiah(45000)}
          </p>
          <p className="mt-1 text-[12px] leading-snug text-espresso/80">
            Sama persis dengan total order.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <p className="label text-espresso/80">Pesanan masuk</p>
      <div className="mt-2">
        {[
          ["#0231", "Kopi Susu Gula Aren", 45000, true],
          ["#0230", "Croissant Butter", 36000, false],
        ].map(([id2, name, total, baru]) => (
          <div
            key={id2}
            className="flex items-center gap-2 border-b border-espresso/12 py-2 last:border-0"
          >
            <span className="tnum text-[12px] font-bold text-coral-deep">
              {id2}
            </span>
            <span className="min-w-0 flex-1 truncate text-[12px]">{name}</span>
            <span className="tnum text-[12px] font-bold">{rupiah(total)}</span>
            {baru && (
              <span className="rounded-md bg-coral px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-cream">
                baru
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl bg-mint px-3 py-2.5">
        <p className="text-[11px] font-bold text-mint-deep">
          WhatsApp kamu bunyi
        </p>
        <p className="mt-0.5 text-[11px] leading-snug">
          Pesanan #0231, antar ke Jl. Kemang Raya No. 12. Total {rupiah(45000)}.
        </p>
      </div>
    </div>
  );
}

export default function FlowTabs() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const tabsRef = useRef([]);
  const step = FLOW[active];

  const go = (i) => {
    setActive(i);
    trackStep(FLOW[i].id);
  };

  // Panah kiri/kanan buat pindah tab, seperti tablist pada umumnya.
  const onKeyDown = (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next =
      e.key === "ArrowRight"
        ? (active + 1) % FLOW.length
        : (active - 1 + FLOW.length) % FLOW.length;
    go(next);
    tabsRef.current[next]?.focus();
  };

  return (
    <section
      id="cara-kerja"
      className="border-y border-espresso/12 bg-sand px-5 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHead
          label="Lihat alurnya"
          title="Pelanggan memilih sendiri. Sistem merapikan sisanya."
        />

        <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div
              role="tablist"
              aria-label="Langkah alur order"
              onKeyDown={onKeyDown}
              className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
            >
              {FLOW.map((s, i) => {
                const on = i === active;
                return (
                  <button
                    key={s.id}
                    ref={(el) => (tabsRef.current[i] = el)}
                    role="tab"
                    id={`tab-${s.id}`}
                    aria-selected={on}
                    aria-controls="flow-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => go(i)}
                    className={`press flex min-h-11 shrink-0 items-center gap-2.5 rounded-xl px-3.5 text-left text-[14px] font-semibold lg:w-full ${
                      on ? "bg-espresso text-cream" : "surface surface-hover"
                    }`}
                  >
                    <span
                      className={`tnum flex size-6 shrink-0 items-center justify-center rounded-full text-[12px] ${
                        on ? "bg-cream/20 text-cream" : "bg-sand text-espresso"
                      }`}
                    >
                      {i + 1}
                    </span>
                    {s.tab}
                  </button>
                );
              })}
            </div>

            <div className="mt-5">
              <h3 className="text-[17px] font-bold">{step.title}</h3>
              <p className="mt-1.5 max-w-sm text-[15px] leading-relaxed text-espresso/85">
                {step.body}
              </p>
              {step.note && (
                <p className="mt-3 max-w-sm rounded-xl bg-cream px-3.5 py-3 text-[13px] leading-relaxed text-espresso/85">
                  {step.note}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 lg:col-span-7 lg:mt-0">
            <div
              id="flow-panel"
              role="tabpanel"
              aria-labelledby={`tab-${step.id}`}
              className="surface overflow-hidden rounded-2xl"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step.id}
                  initial={reduce ? false : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? undefined : { opacity: 0, x: -8 }}
                  transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
                >
                  <Panel id={step.id} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <a
          href={waHref("demo")}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWa("demo")}
          className="press mt-8 inline-flex min-h-12 items-center gap-2 text-[15px] font-semibold underline decoration-espresso/25 underline-offset-[6px] hover:decoration-coral"
        >
          <IconWhatsApp className="h-[18px] w-[18px]" />
          Saya mau lihat apakah ini cocok untuk bisnis saya
          <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </section>
  );
}
