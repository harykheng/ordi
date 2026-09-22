import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { SectionHead } from "./Section";
import { PROBLEMS } from "../../data/altContent";

// Gambar kecil per kartu, digambar langsung biar ringan dan nggak perlu aset.
function Art({ kind }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  if (kind === "chat") {
    return (
      <svg viewBox="0 0 64 44" aria-hidden="true" className="h-11 w-16 text-espresso/45" {...common}>
        <rect x="1" y="1" width="40" height="20" rx="6" />
        <rect x="14" y="13" width="40" height="20" rx="6" fill="var(--color-card)" />
        <rect x="22" y="22" width="40" height="20" rx="6" fill="var(--color-sand)" />
        <path d="M30 32h22M30 37h14" className="text-espresso/40" />
      </svg>
    );
  }
  if (kind === "tanya") {
    return (
      <svg viewBox="0 0 64 44" aria-hidden="true" className="h-11 w-16 text-espresso/45" {...common}>
        <rect x="1" y="6" width="34" height="22" rx="6" />
        <path d="M13 32v6l7-6" />
        <path d="M13 14c0-3 2.4-4.5 5-4.5S23 11 23 13.5c0 3-4 3-4 6" className="text-coral" />
        <circle cx="19" cy="23.5" r="0.9" fill="currentColor" className="text-coral" />
        <rect x="41" y="16" width="22" height="16" rx="5" className="text-espresso/25" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 44" aria-hidden="true" className="h-11 w-16 text-espresso/45" {...common}>
      <path d="M12 3h26l8 8v30H12z" fill="var(--color-card)" />
      <path d="M38 3v8h8" />
      <path d="M19 19h20M19 26h20M19 33h12" />
      <circle cx="50" cy="33" r="9" fill="var(--color-sand)" />
      <path d="M50 28v5l3 2" className="text-coral" />
    </svg>
  );
}

function Card({ item, i, reduce }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.4 });
  return (
    <motion.li
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 12, filter: "blur(4px)" }}
      animate={seen || reduce ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      transition={{ type: "spring", duration: 0.5, bounce: 0, delay: i * 0.08 }}
      className="surface surface-hover rounded-2xl p-5"
    >
      <Art kind={item.art} />
      <h3 className="mt-4 text-[17px] font-bold">{item.title}</h3>
      <p className="mt-1.5 text-[15px] leading-relaxed text-espresso/85">
        {item.body}
      </p>
    </motion.li>
  );
}

export default function Problems() {
  const reduce = useReducedMotion();
  return (
    <section id="masalah" className="px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHead
          label="Masalahnya"
          title="Yang bikin capek itu ngulang hal yang sama tiap hari."
        />
        <ul className="mt-9 grid gap-4 sm:grid-cols-3">
          {PROBLEMS.map((item, i) => (
            <Card key={item.title} item={item} i={i} reduce={reduce} />
          ))}
        </ul>
      </div>
    </section>
  );
}
