import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { SectionHead } from "./Section";
import { BEFORE_AFTER } from "../../data/altContent";

// Dulunya ini dua section (daftar masalah, lalu sebelum/sesudah) yang
// ngomongin hal sama. Sekarang satu baris per kerjaan: kiri yang sekarang,
// kanan yang berubah.
function Row({ before, after, i, reduce }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.6 });
  return (
    <motion.li
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 12, filter: "blur(4px)" }}
      animate={
        seen || reduce
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : undefined
      }
      transition={{ type: "spring", duration: 0.5, bounce: 0, delay: i * 0.06 }}
      className="grid gap-x-5 gap-y-1.5 border-t border-espresso/12 py-4 sm:grid-cols-2 sm:items-baseline"
    >
      <span className="text-[15px] text-espresso/80 line-through decoration-coral/50 decoration-2">
        {before}
      </span>
      <span className="flex items-baseline gap-2 text-[15px] font-semibold">
        <span aria-hidden="true" className="text-coral-deep sm:hidden">
          &rarr;
        </span>
        {after}
      </span>
    </motion.li>
  );
}

export default function BeforeAfter() {
  const reduce = useReducedMotion();
  return (
    <section id="perubahan" className="px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHead
          label="Yang berubah"
          title="Kerjaan yang tiap hari kamu ulang"
          lead="Kerjaannya nggak hilang. Yang diulang-ulang tiap ada pesanan masuk, itu yang dipangkas."
        />

        <ul className="mt-9">
          {BEFORE_AFTER.before.map((b, i) => (
            <Row
              key={b}
              before={b}
              after={BEFORE_AFTER.after[i]}
              i={i}
              reduce={reduce}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
