import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { TOKO_KAMU_VARIANTS } from "../data/content";

/**
 * The "Tanda Terima Kepemilikan" card — cycles through TOKO_KAMU_VARIANTS
 * to dramatize that Ordi is built to be 100% owned by one specific
 * business, not a template rented out to many. Used as the Hero visual;
 * not rendered as its own top-level section anymore (see App.jsx).
 *
 * Only the shop name swaps. The rest of the sentence stays put, so the
 * line does not blink every cycle, and an invisible spacer sized to the
 * longest name keeps "akan 100% memiliki sistem ini" from shifting.
 * prefers-reduced-motion stops the cycling entirely and shows one name.
 */
export default function OwnershipCertificate({ className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [idx, setIdx] = useState(0);

  // 2400ms kecepetan: transisi keluar-masuknya sendiri makan 700ms, jadi
  // namanya cuma diam 1,7 detik dan kebaca buru-buru. 3600ms bikin tiap
  // nama sempat dibaca dulu sebelum ganti.
  useEffect(() => {
    if (!isInView || reduce) return;
    const interval = setInterval(() => {
      setIdx((i) => (i + 1) % TOKO_KAMU_VARIANTS.length);
    }, 3600);
    return () => clearInterval(interval);
  }, [isInView, reduce]);

  return (
    <motion.div
      ref={ref}
      className={`mx-auto w-full max-w-sm ${className}`}
      initial={reduce ? false : { opacity: 0, scale: 0.85, rotateX: 12, y: 40 }}
      animate={isInView || reduce ? { opacity: 1, scale: 1, rotateX: 0, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
    >
      <div className="relative rounded-2xl bg-paper-2 text-ink p-8 shadow-[8px_8px_0_0_var(--color-ember)] border-2 border-ink">
        <p className="font-mono-label text-[11px] text-ember-deep uppercase tracking-wide mb-6">
          Tanda Terima Kepemilikan
        </p>
        <p className="text-sm text-ink/60 mb-1">Sistem pesan-antar</p>
        <div className="min-h-[4.5rem] relative mb-4">
          <p className="font-display font-extrabold text-xl sm:text-2xl leading-tight break-words">
            <span className="relative inline-flex align-bottom">
              {/* penjaga lebar: nama terpanjang, biar kalimatnya nggak
                  bergeser tiap kali namanya ganti */}
              <span aria-hidden="true" className="invisible whitespace-nowrap">
                {TOKO_KAMU_VARIANTS.reduce(
                  (a, b) => (b.length > a.length ? b : a),
                  ""
                )}
              </span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={idx}
                  initial={reduce ? false : { opacity: 0, y: 12, filter: "blur(3px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={reduce ? undefined : { opacity: 0, y: -10, filter: "blur(3px)" }}
                  transition={{
                    duration: reduce ? 0 : 0.42,
                    ease: [0.22, 1, 0.36, 1],
                    exit: { duration: reduce ? 0 : 0.28, ease: [0.4, 0, 1, 1] },
                  }}
                  className="absolute inset-0 whitespace-nowrap"
                >
                  {TOKO_KAMU_VARIANTS[idx]}
                </motion.span>
              </AnimatePresence>
            </span>{" "}
            akan <span className="text-ember-deep">100% memiliki</span> sistem
            ini.
          </p>
        </div>
        <p className="text-sm text-ink/70 leading-relaxed border-t-2 border-ink/10 pt-4">
          Semua bagian sistem ini, hosting, database, domain, atas
          nama bisnis kamu sendiri.
        </p>
      </div>
    </motion.div>
  );
}
