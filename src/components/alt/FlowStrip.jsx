import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { SectionHead } from "./Section";
import { FLOW } from "../../data/altContent";

// Satu-satunya gambar di section ini: struk QRIS, nempel di langkah yang
// ngomongin pembayaran, biar catatan cek manualnya kebaca bareng klaimnya.
function QrisSlip() {
  return (
    <div className="surface mt-4 max-w-sm rounded-2xl p-4">
      <div className="flex items-center gap-4">
        <svg
          viewBox="0 0 100 100"
          className="h-14 w-14 shrink-0 rounded-lg"
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
          <p className="display tnum text-[1.5rem] text-coral-deep">Rp45.000</p>
          <p className="mt-0.5 text-[12px] leading-snug text-espresso/80">
            Bukti bayarnya masih kamu yang cek.
          </p>
        </div>
      </div>
    </div>
  );
}

function Step({ step, i, reduce, showSlip }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.5 });
  return (
    <motion.li
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 12, filter: "blur(4px)" }}
      animate={seen || reduce ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      transition={{ type: "spring", duration: 0.5, bounce: 0, delay: i * 0.05 }}
      className="flex gap-4 border-t border-espresso/12 py-6 sm:gap-5"
    >
      <span className="surface tnum mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full text-[14px] font-bold text-espresso">
        {i + 1}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-[17px] font-bold">{step.title}</h3>
          <span className="label text-espresso/80">{step.fitur}</span>
        </div>
        <p className="mt-1.5 max-w-xl text-[15px] leading-relaxed text-espresso/85">
          {step.body}
        </p>
        {showSlip && <QrisSlip />}
      </div>
    </motion.li>
  );
}

export default function FlowStrip() {
  const reduce = useReducedMotion();
  return (
    <section
      id="cara-kerja"
      className="border-y border-espresso/12 bg-sand px-5 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHead
          label="Cara kerja"
          title="Empat langkah, dari pelanggan buka katalog sampai ordernya sampai ke kamu."
        />
        <ol className="mt-9">
          {FLOW.map((step, i) => (
            <Step key={step.n} step={step} i={i} reduce={reduce} showSlip={i === 2} />
          ))}
        </ol>
      </div>
    </section>
  );
}
