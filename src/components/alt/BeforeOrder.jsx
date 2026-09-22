import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { DUR, EASE_ENTER, EASE_MOVE } from "../../lib/motion";
import { BEFORE } from "../../data/altContent";

// Potongan chat yang biasanya kamu terima sekarang.
const CHAT = [
  { t: "Mbak croissant masih ada?", r: -2.2 },
  { t: "Totalnya berapa ya kak", r: 1.8 },
  { t: "Alamat nanti saya share", r: -1.4 },
];

// Satu visual buat section ini: tiga chat yang berserakan merapat jadi satu
// kartu order. Order yang sama (#0232) dipakai terus sampai section rekap.
function ChatJadiOrder({ seen, reduce }) {
  const jadi = seen || reduce;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-sand px-4 py-5 sm:px-6">
      <div className="grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <ul className="space-y-1.5">
          {CHAT.map((c, i) => (
            <motion.li
              key={c.t}
              initial={reduce ? false : { rotate: c.r, x: -6, opacity: 1 }}
              animate={
                jadi
                  ? { rotate: 0, x: 0, opacity: 0.72, scale: 0.97 }
                  : undefined
              }
              transition={{
                duration: DUR.settle,
                ease: EASE_MOVE,
                delay: i * 0.07,
              }}
              className="w-fit max-w-full rounded-xl rounded-bl-sm bg-card px-3 py-1.5 text-[12px] leading-snug text-espresso shadow-[var(--shadow-border)]"
            >
              {c.t}
            </motion.li>
          ))}
        </ul>

        <motion.span
          aria-hidden="true"
          initial={reduce ? false : { opacity: 0 }}
          animate={jadi ? { opacity: 1 } : undefined}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mx-auto block text-espresso/45"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-5 rotate-90 sm:rotate-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 12h15M13 6l6 6-6 6" />
          </svg>
        </motion.span>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10, scale: 0.97 }}
          animate={jadi ? { opacity: 1, y: 0, scale: 1 } : undefined}
          transition={{ duration: DUR.settle, ease: EASE_ENTER, delay: 0.34 }}
          className="surface rounded-xl p-3"
        >
          <div className="flex items-baseline justify-between gap-2">
            <span className="tnum text-[12px] font-bold text-coral-deep">
              #0232
            </span>
            <span className="rounded-md bg-sand px-1.5 py-0.5 text-[10px] font-semibold">
              Baru
            </span>
          </div>
          <p className="mt-1.5 text-[12px] font-semibold leading-snug">
            2x Kopi Susu Gula Aren, 1x Croissant Butter
          </p>
          <p className="mt-1 text-[12px] text-espresso/80">Kemang Raya</p>
          <p className="display tnum mt-2 text-[1.15rem]">Rp67.000</p>
        </motion.div>
      </div>
      <p className="mt-4 text-[11px] text-espresso/80">Contoh tampilan.</p>
    </div>
  );
}

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
              animate={
                seen || reduce
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : undefined
              }
              transition={{
                type: "spring",
                duration: 0.5,
                bounce: 0,
                delay: i * 0.08,
              }}
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
