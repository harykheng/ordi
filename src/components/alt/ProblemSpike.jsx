import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Rule } from "./Paper";
import { PROBLEMS } from "../../data/altContent";

// Tiga sobekan nota yang numpuk di satu tusukan, bukan tiga kartu sejajar.
// Tumpukannya mekar pelan mengikuti posisi scroll.
const SLIPS = [
  { rot: -3.2, x: 0 },
  { rot: 2.1, x: 20 },
  { rot: -1.2, x: 7 },
];

function Slip({ progress, rot, x, title, body, reduce }) {
  const rotate = useTransform(progress, [0, 1], [0, rot]);
  const shift = useTransform(progress, [0, 1], [0, x]);
  return (
    <motion.div
      style={reduce ? undefined : { rotate, x: shift }}
      className="sheet-lift ink-shadow relative mb-3 border border-espresso/20 bg-card px-5 py-4 last:mb-0"
    >
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-espresso/30 md:left-[58%]"
      />
      <p className="display text-[1.15rem]">{title}</p>
      <p className="mt-1 text-[14px] leading-relaxed text-espresso/85">{body}</p>
    </motion.div>
  );
}

export default function ProblemSpike() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 60%"],
  });

  return (
    <section id="masalah" className="border-t border-espresso/15 px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Rule n="03" label="Masalahnya" className="mb-8" />

        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <h2 className="display text-[clamp(1.75rem,1.2rem+2vw,2.9rem)]">
              Kalau semua pesanan masuk lewat chat, yang berantakan bukan cuma
              chatnya.
            </h2>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-espresso/85">
              Yang kepotong itu waktu kamu: ngetik ulang menu, ngitung ongkir
              sambil masak, nyari bukti transfer yang ketutup chat baru.
            </p>
          </div>

          <div ref={ref} className="relative pr-7 md:col-span-6 md:col-start-7">
            {PROBLEMS.map((p, i) => (
              <Slip
                key={p.title}
                progress={scrollYProgress}
                rot={SLIPS[i].rot}
                x={SLIPS[i].x}
                title={p.title}
                body={p.body}
                reduce={reduce}
              />
            ))}
            <p className="mt-4 text-right text-[12px] italic text-espresso/80">
              Nota numpuk, tapi nggak ada yang kecatat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
