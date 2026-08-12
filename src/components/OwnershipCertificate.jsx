import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { TOKO_KAMU_VARIANTS } from "../data/content";
import { Star, Sparkle } from "./Doodles";

export default function OwnershipCertificate() {
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
    <section
      ref={ref}
      className="relative px-5 py-24 sm:py-32 border-t-2 border-ink bg-ink overflow-hidden"
    >
      <Star className="absolute top-16 left-[10%] text-ember" />
      <Sparkle className="absolute bottom-16 right-[12%] text-yellow" />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="font-mono-label text-xs text-ember mb-4">
          Bukan sewa. Bukan pinjam.
        </p>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-paper mb-14">
          Ini punya kamu.
        </h2>

        <motion.div
          className="mx-auto max-w-sm"
          initial={{ opacity: 0, scale: 0.85, rotateX: 12, y: 40 }}
          animate={
            isInView
              ? { opacity: 1, scale: 1, rotateX: 0, y: 0 }
              : {}
          }
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ perspective: 1000 }}
        >
          <div className="relative rounded-2xl bg-paper-2 text-ink p-8 shadow-[8px_8px_0_0_var(--color-ember)] border-2 border-ink">
            <div className="absolute top-4 right-4 font-mono-label text-[10px] text-ember-deep/70">
              No. 001 / MILIK-SENDIRI
            </div>
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
                Ordi ini akan{" "}
                <span className="text-ember-deep">100% jadi milik</span>{" "}
                {TOKO_KAMU_VARIANTS[idx]}
              </motion.p>
            </div>
            <p className="text-sm text-ink/70 leading-relaxed border-t-2 border-ink/10 pt-4">
              Bukan disewain, bukan numpang platform orang lain — begitu
              lanjut, semua akun (hosting, database, domain) atas nama
              bisnis kamu sendiri.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
