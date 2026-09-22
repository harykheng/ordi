import { motion, useReducedMotion } from "framer-motion";
import { IconWhatsApp } from "./Icons";
import { Sparkle } from "../Doodles";
import { HOW_STEPS } from "../../data/altContent";
import { trackWa, waHref } from "../../lib/track";

// Section "Cara kerja". Sengaja pakai sistem desain doodle Ordi: token
// paper/ink/ember, Bricolage + Public Sans + IBM Plex Mono, kartu
// `border-2 border-ink` plus offset shadow. Bentuknya tiga kartu sejajar di
// latar terang, bukan band gelap dengan baris bertumpuk.

// Kartu mendarat berurutan: 0.1s jeda awal, lalu tiap kartu selang 0.14s.
const LIST = {
  hidden: {},
  show: { transition: { delayChildren: 0.1, staggerChildren: 0.14 } },
};

// `type: "spring"` dengan `bounce: 0` itu pegas teredam penuh, bentuk
// kurvanya praktis sama dengan cubic-bezier(0.22, 1, 0.36, 1) yang diminta.
// Framer Motion ngabaikan `ease` kalau tipenya spring, jadi nggak dipasang.
const CARD = {
  hidden: { opacity: 0, y: 28, rotate: -1.2 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { type: "spring", bounce: 0, duration: 0.62 },
  },
};

// Nomornya nyusul kartunya 180ms, dan ini satu-satunya yang boleh memantul.
const BADGE = {
  hidden: { scale: 0.6, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", bounce: 0.35, duration: 0.5, delay: 0.18 },
  },
};

// Kartu berikutnya mulai 0.14s sesudah kartu ini dan jalan 0.62s, jadi
// garisnya baru ditarik di 0.76s, pas sesudah kartu itu mendarat.
const SWOOSH = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.76 },
      opacity: { duration: 0.01, delay: 0.76 },
    },
  },
};

// Goresan yang sama persis dengan `ArrowSwoosh` di Doodles.jsx, ditulis ulang
// pakai motion.path supaya bisa digambar lewat pathLength.
function Swoosh({ className = "" }) {
  return (
    <svg
      viewBox="0 0 60 40"
      className={`doodle h-6 w-8 text-ink/60 ${className}`}
      aria-hidden="true"
    >
      <motion.path d="M4 6 C 30 2, 52 10, 50 26" variants={SWOOSH} />
      <motion.path d="M42 20 L50 26 L44 33" variants={SWOOSH} />
    </svg>
  );
}

export default function ThreeSteps() {
  const reduce = useReducedMotion();

  return (
    <section
      id="cara-kerja"
      className="relative border-y border-espresso/12 bg-paper px-5 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <div className="relative max-w-2xl">
          <Sparkle
            className="absolute -left-6 -top-3 hidden sm:block"
            color="text-ember"
          />
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ember-deep">
            Cara kerja
          </p>
          <h2 className="font-display mt-2.5 text-[clamp(1.6rem,1.2rem+1.6vw,2.4rem)] font-extrabold leading-tight text-ink">
            Dari cerita kamu, jadi sistem kamu.
          </h2>
        </div>

        <motion.ol
          variants={reduce ? undefined : LIST}
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true, amount: 0.35 }}
          className="mt-10 grid gap-7 sm:grid-cols-3 sm:gap-10"
        >
          {HOW_STEPS.map((s, i) => (
            <motion.li
              key={s.n}
              variants={reduce ? undefined : CARD}
              className="relative rounded-2xl border-2 border-ink bg-paper-2 p-5 shadow-[6px_6px_0_0_var(--color-ink)]"
            >
              <motion.span
                variants={reduce ? undefined : BADGE}
                className="font-mono inline-flex items-center rounded-lg border-2 border-ink bg-ember px-2.5 py-1 text-[13px] font-semibold text-ink"
              >
                {s.n}
              </motion.span>
              <h3 className="font-display mt-4 text-[17px] font-extrabold leading-snug text-ink">
                {s.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/75">
                {s.body}
              </p>

              {/* garis penghubung, cuma di antara kartu */}
              {i < HOW_STEPS.length - 1 && (
                <Swoosh className="absolute -bottom-7 left-1/2 -translate-x-1/2 rotate-90 sm:-right-9 sm:bottom-auto sm:left-auto sm:top-1/2 sm:-translate-x-0 sm:-translate-y-1/2 sm:rotate-0" />
              )}
            </motion.li>
          ))}
        </motion.ol>

        <a
          href={waHref("demo")}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWa("demo")}
          className="press lift mt-10 inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-ink bg-ember px-6 text-[15px] font-bold text-ink shadow-[4px_4px_0_0_var(--color-ink)]"
        >
          <IconWhatsApp className="h-[18px] w-[18px]" />
          Mulai dari langkah pertama
        </a>
      </div>
    </section>
  );
}
