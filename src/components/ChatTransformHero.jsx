import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const MESSY_BUBBLES = [
  { text: "Kak masih ada Kopi Susu Gula Aren?", rot: -6, x: -55, y: -100 },
  { text: "Ongkir ke Bintaro berapa ya kak?", rot: 4, x: 60, y: -62 },
  { text: "Ini transferannya kak 🙏", rot: -3, x: -68, y: -6 },
  { text: "Kak jadi total brp semua?", rot: 5, x: 32, y: 20 },
  { text: "Uangnya udah masuk blm kak?", rot: -5, x: -26, y: 64 },
  { text: "Mau pesan 2 Nasi Ayam Geprek", rot: 3, x: 68, y: 82 },
  { text: "Alamatnya Jl. Kemang Raya no 12", rot: -4, x: -52, y: 120 },
  { text: "Kak resi nya kirim dong", rot: 6, x: 45, y: -124 },
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
      className="relative h-[380px] sm:h-[420px] w-full max-w-md mx-auto select-none overflow-hidden"
    >
      <AnimatePresence>
        {!resolved && (
          <motion.div
            className="absolute inset-0"
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
          >
            {MESSY_BUBBLES.map((b, i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <motion.div
                  className="max-w-[140px] sm:max-w-[190px] rounded-2xl rounded-bl-sm bg-paper-2 px-3 py-2 text-[13px] text-ink/90 shadow-lg border-2 border-ink"
                  initial={{ opacity: 0, scale: 0.6, x: b.x, y: b.y, rotate: 0 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1, x: b.x, y: b.y, rotate: b.rot }
                      : {}
                  }
                  transition={{ duration: 0.32, delay: i * 0.08 }}
                >
                  {b.text}
                </motion.div>
              </div>
            ))}
            <motion.div
              className="absolute left-1/2 bottom-2 -translate-x-1/2 rounded-full bg-paper-2 border-2 border-ink px-3 py-1 font-mono-label text-[11px] text-ink whitespace-nowrap shadow-[3px_3px_0_0_var(--color-ink)]"
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.0, duration: 0.3 }}
            >
              Chat WA pagi ini masih numpuk
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
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-full max-w-[300px] rounded-2xl bg-paper-2 border-2 border-ink shadow-[6px_6px_0_0_var(--color-ink)] p-4">
              <div className="flex items-center justify-between border-b-2 border-ink/10 pb-2 mb-3">
                <span className="font-display font-bold text-ink text-sm">
                  Pesanan Masuk
                </span>
                <span className="font-mono-label text-[10px] text-teal">
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
                  <span className="font-mono-label text-ember-deep">Rp73.000</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
