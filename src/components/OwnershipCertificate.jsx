import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { TOKO_KAMU_VARIANTS } from "../data/content";

/**
 * The "Tanda Terima Kepemilikan" card — cycles through TOKO_KAMU_VARIANTS
 * to dramatize that Ordi is built to be 100% owned by one specific
 * business, not a template rented out to many. Used as the Hero visual;
 * not rendered as its own top-level section anymore (see App.jsx).
 */
export default function OwnershipCertificate({ className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setIdx((i) => (i + 1) % TOKO_KAMU_VARIANTS.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      className={`mx-auto w-full max-w-sm ${className}`}
      initial={{ opacity: 0, scale: 0.85, rotateX: 12, y: 40 }}
      animate={isInView ? { opacity: 1, scale: 1, rotateX: 0, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
    >
      <div className="relative rounded-2xl bg-paper-2 text-ink p-8 shadow-[8px_8px_0_0_var(--color-ember)] border-2 border-ink">
        <p className="font-mono-label text-[11px] text-ember-deep uppercase tracking-wide mb-6">
          Tanda Terima Kepemilikan
        </p>
        <p className="text-sm text-ink/60 mb-1">Sistem pesan-antar</p>
        <div className="min-h-[4.5rem] relative mb-4">
          <motion.p
            key={idx}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="font-display font-extrabold text-xl sm:text-2xl leading-tight break-words"
          >
            {TOKO_KAMU_VARIANTS[idx]}{" "}
            akan <span className="text-ember-deep">100% memiliki</span> sistem
            ini.
          </motion.p>
        </div>
        <p className="text-sm text-ink/70 leading-relaxed border-t-2 border-ink/10 pt-4">
          Semua bagian sistem ini, hosting, database, domain, atas
          nama bisnis kamu sendiri.
        </p>
      </div>
    </motion.div>
  );
}
