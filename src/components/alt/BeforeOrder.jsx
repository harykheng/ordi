import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { BEFORE } from "../../data/altContent";

export default function BeforeOrder() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="sebelum" className="px-5 py-16 sm:py-20">
      <div ref={ref} className="mx-auto max-w-5xl">
        <p className="label text-coral-deep">{BEFORE.title}</p>
        <ul className="mt-6 max-w-3xl">
          {BEFORE.items.map((q, i) => (
            <motion.li
              key={q}
              initial={reduce ? false : { opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={seen || reduce ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
              transition={{ type: "spring", duration: 0.5, bounce: 0, delay: i * 0.08 }}
              className="display border-t border-espresso/12 py-5 text-[clamp(1.35rem,1.1rem+1.2vw,2rem)]"
            >
              {q}
            </motion.li>
          ))}
        </ul>
        <p className="mt-8 text-[17px] font-bold">{BEFORE.payoff}</p>
      </div>
    </section>
  );
}
