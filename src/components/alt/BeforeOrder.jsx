import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { EASE_ENTER } from "../../lib/motion";
import { DASHBOARD_BASE, rupiah } from "../../data/demoOrder";
import { BEFORE } from "../../data/altContent";

// Potongan chat yang biasanya kamu terima sekarang, sejajar sama tiga order
// terakhir di dashboard. Isinya sama, bentuknya yang beda.
const CHAT = [
  "Mbak croissant masih ada?",
  "Totalnya berapa ya kak",
  "Alamat nanti saya share",
];

function ChatJadiOrder({ seen, reduce }) {
  const [jadi, setJadi] = useState(false);

  useEffect(() => {
    if (!seen) return;
    if (reduce) {
      setJadi(true);
      return;
    }
    const t = setTimeout(() => setJadi(true), 1100);
    return () => clearTimeout(t);
  }, [seen, reduce]);

  return (
    <div className="rounded-2xl bg-sand px-4 py-5 sm:px-6">
      <ul className="space-y-2">
        {DASHBOARD_BASE.rows.map((o, i) => (
          <li key={o.id} className="relative h-14">
            <AnimatePresence initial={false}>
              {jadi ? (
                <motion.div
                  key="order"
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE_ENTER, delay: i * 0.09 }}
                  className="surface absolute inset-0 flex items-center gap-3 rounded-xl px-3"
                >
                  <span className="tnum shrink-0 text-[12px] font-bold text-coral-deep">
                    {o.id}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[12px] font-semibold">
                    {o.ringkas}
                  </span>
                  <span className="tnum shrink-0 text-[12px] font-bold">
                    {rupiah(o.nominal)}
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={seen ? { opacity: 1, y: 0 } : undefined}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: EASE_ENTER, delay: i * 0.09 }}
                  className="absolute inset-y-0 left-0 flex items-center"
                >
                  <span className="rounded-xl rounded-bl-sm bg-card px-3 py-2 text-[12px] leading-snug text-espresso shadow-[var(--shadow-border)]">
                    {CHAT[i]}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[11px] text-espresso/80">Contoh tampilan.</p>
    </div>
  );
}

export default function BeforeOrder() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="alur-tokomu" className="px-5 py-16 sm:py-20">
      <div ref={ref} className="mx-auto max-w-5xl">
        <p className="label text-coral-deep">{BEFORE.title}</p>
        <ul className="mt-6 max-w-3xl">
          {BEFORE.items.map((q, i) => (
            <motion.li
              key={q}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={seen || reduce ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.45, ease: EASE_ENTER, delay: i * 0.08 }}
              className="display border-t border-espresso/12 py-5 text-[clamp(1.35rem,1.1rem+1.2vw,2rem)]"
            >
              {q}
            </motion.li>
          ))}
        </ul>

        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-12">
          <p className="text-[17px] font-bold lg:col-span-4">{BEFORE.payoff}</p>
          <div className="lg:col-span-8">
            <ChatJadiOrder seen={seen} reduce={reduce} />
          </div>
        </div>
      </div>
    </section>
  );
}
