import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const MESSY_BUBBLES = [
  { text: "Kak masih ada Kopi Susu Gula Aren?", rot: -6, x: -60, y: -110 },
  { text: "Ongkir ke Bintaro berapa ya kak?", rot: 4, x: 70, y: -70 },
  { text: "Ini transferannya kak 🙏", rot: -3, x: -90, y: -10 },
  { text: "Kak jadi total brp semua?", rot: 5, x: 40, y: 20 },
  { text: "Uangnya udah masuk blm kak?", rot: -5, x: -30, y: 70 },
  { text: "Mau pesan 2 Nasi Ayam Geprek", rot: 3, x: 90, y: 90 },
  { text: "Alamatnya Jl. Kemang Raya no 12", rot: -4, x: -70, y: 130 },
  { text: "Kak resi nya kirim dong", rot: 6, x: 55, y: -140 },
];

export default function ChatTransformHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    if (isInView) {
      const t = setTimeout(() => setResolved(true), 2200);
      return () => clearTimeout(t);
    }
  }, [isInView]);

  return (
    <div
      ref={ref}
      className="relative h-[380px] sm:h-[420px] w-full max-w-md mx-auto select-none"
    >
      <AnimatePresence>
        {!resolved && (
          <motion.div
            className="absolute inset-0"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            {MESSY_BUBBLES.map((b, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2 max-w-[190px] rounded-2xl rounded-bl-sm bg-paper-2 px-3 py-2 text-[13px] text-ink/90 shadow-lg border-2 border-ink"
                initial={{ opacity: 0, scale: 0.6, x: b.x, y: b.y, rotate: 0 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1, x: b.x, y: b.y, rotate: b.rot }
                    : {}
                }
                transition={{ duration: 0.45, delay: i * 0.14 }}
              >
                {b.text}
              </motion.div>
            ))}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono-label text-[11px] text-ink/40"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.6, duration: 0.4 }}
            >
              09:00 — 8 chat, masih belum ke-follow up
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {resolved && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-full max-w-[300px] rounded-2xl bg-paper-2 border-2 border-ink shadow-[6px_6px_0_0_var(--color-ink)] p-4">
              <div className="flex items-center justify-between border-b-2 border-ink/10 pb-2 mb-3">
                <span className="font-display font-bold text-ink text-sm">
                  Pesanan Masuk
                </span>
                <span className="font-mono-label text-[10px] text-mint-ok">
                  ● live
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-ink/80">
                  <span>Kopi Susu Gula Aren x2</span>
                  <span className="font-mono-label">Rp36.000</span>
                </div>
                <div className="flex justify-between text-ink/80">
                  <span>Nasi Ayam Geprek x1</span>
                  <span className="font-mono-label">Rp28.000</span>
                </div>
                <div className="flex justify-between text-ink/50 text-xs">
                  <span>Ongkir · Kemang Raya</span>
                  <span className="font-mono-label">Rp9.000</span>
                </div>
                <div className="border-t-2 border-ink/10 pt-2 flex justify-between font-semibold text-ink">
                  <span>Total</span>
                  <span className="font-mono-label text-ember">Rp73.000</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
