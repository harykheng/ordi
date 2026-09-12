import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Rule } from "./Paper";
import { BEFORE_AFTER } from "../../data/altContent";

// Satu halaman buku, bukan dua kartu berdampingan. Baris "sebelum" dicoret
// beneran sambil di-scroll, baris "sesudah" baru muncul setelah coretannya
// jadi, jadi perubahannya kebaca sebagai satu kejadian.
function SwapRow({ progress, index, before, after, reduce }) {
  const start = 0.04 + index * 0.135;
  const end = start + 0.26;
  const strike = useTransform(progress, [start, end], [0, 1]);
  const appear = useTransform(progress, [start + 0.07, end], [0, 1]);
  const slide = useTransform(progress, [start + 0.07, end], [-10, 0]);
  const fade = useTransform(progress, [start, end], [1, 0.5]);

  return (
    <li className="grid items-baseline gap-x-4 gap-y-1 py-2.5 md:grid-cols-12 md:py-0">
      <motion.span
        style={{ opacity: reduce ? 0.5 : fade }}
        className="text-[15px] leading-[34px] md:col-span-5"
      >
        <span className="relative inline-block">
        {before}
        <svg
          viewBox="0 0 200 8"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-1/2 h-2 w-full -translate-y-1/2 text-coral"
        >
          <motion.path
            d="M2 5.4C40 2.8 78 6 116 3.4c28-1.9 55 2.2 82 .4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity="0.75"
            style={{ pathLength: reduce ? 1 : strike }}
          />
        </svg>
        </span>
      </motion.span>

      <span
        aria-hidden="true"
        className="hidden text-espresso/40 md:col-span-1 md:block md:leading-[34px]"
      >
        &rarr;
      </span>

      <motion.span
        style={{ opacity: reduce ? 1 : appear, x: reduce ? 0 : slide }}
        className="text-[15px] font-semibold leading-[34px] md:col-span-6"
      >
        <span aria-hidden="true" className="mr-2 text-mint-deep md:hidden">
          &darr;
        </span>
        {after}
      </motion.span>
    </li>
  );
}

export default function LedgerSwap() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 65%"],
  });

  return (
    <section className="px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <Rule n="06" label="Sebelum dan sesudah" className="mb-8" />

        <h2 className="display max-w-[22ch] text-[clamp(1.75rem,1.2rem+2vw,2.9rem)]">
          Kerjaanmu nggak hilang. Yang berulang-ulang aja yang dikurangi.
        </h2>

        <div
          ref={ref}
          className="ruled ink-shadow relative mt-10 border border-espresso/20 bg-card px-5 py-3 sm:px-8"
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-2 w-px bg-coral/20 sm:left-4"
          />
          <ul>
            {BEFORE_AFTER.before.map((b, i) => (
              <SwapRow
                key={b}
                progress={scrollYProgress}
                index={i}
                before={b}
                after={BEFORE_AFTER.after[i]}
                reduce={reduce}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
