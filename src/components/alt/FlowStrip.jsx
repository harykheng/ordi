import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Rule, Stamp } from "./Paper";
import { FLOW } from "../../data/altContent";

// Satu-satunya visual section ini: struk QRIS, ditempel di langkah yang
// memang ngomongin pembayaran, supaya catatan verifikasi manualnya
// kebaca bareng klaimnya.
function QrisSlip() {
  return (
    <div className="ink-shadow mt-4 max-w-xs rotate-[-0.8deg] border border-espresso/20 bg-card p-4">
      <div className="flex items-start gap-3">
        <svg viewBox="0 0 100 100" className="h-14 w-14 shrink-0" aria-hidden="true">
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
          <p className="kicker text-espresso/80">Nominal QR</p>
          <p className="display tnum text-[1.4rem] text-coral-deep">Rp45.000</p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 border-t border-dashed border-espresso/25 pt-3">
        <Stamp className="shrink-0 text-espresso/80" rotate={-4}>
          cek manual
        </Stamp>
        <p className="text-[11px] leading-snug text-espresso/80">
          Bukti bayarnya tetap kamu yang cek.
        </p>
      </div>
    </div>
  );
}

export default function FlowStrip() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 72%"],
  });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="cara-kerja"
      className="border-y border-espresso/15 bg-sand px-5 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <Rule n="04" label="Cara kerjanya" className="mb-8" />

        <h2 className="display max-w-[20ch] text-[clamp(1.75rem,1.2rem+2vw,2.9rem)]">
          Satu alur buat pelanggan. Satu dashboard buat kamu.
        </h2>

        {/* Garis tinta yang kegambar ngikutin scroll: satu pesanan jalan
            dari katalog sampai masuk buku, bukan empat animasi terpisah. */}
        <ol ref={ref} className="relative mt-11">
          <span aria-hidden="true" className="absolute bottom-3 left-[15px] top-3 w-px bg-espresso/20" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: reduce ? 1 : draw }}
            className="absolute bottom-3 left-[15px] top-3 w-px origin-top bg-coral"
          />

          {FLOW.map((step, i) => (
            <li key={step.n} className="relative pb-9 pl-12 last:pb-0 sm:pl-16">
              <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center bg-sand">
                <span className="display text-[1.35rem] leading-none text-coral-deep">
                  {step.n}
                </span>
              </span>
              <div className="md:grid md:grid-cols-12 md:gap-6">
                <div className="md:col-span-7">
                  <h3 className="display text-[1.3rem] sm:text-[1.5rem]">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 max-w-lg text-[15px] leading-relaxed text-espresso/85">
                    {step.body}
                  </p>
                  {i === 2 && <QrisSlip />}
                </div>
                <p className="kicker mt-2 text-espresso/80 md:col-span-4 md:col-start-9 md:mt-2 md:text-right">
                  {step.fitur}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
