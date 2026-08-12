import { motion } from "framer-motion";
import ChatTransformHero from "./ChatTransformHero";
import { DEMO_URL, WHATSAPP_CTA_LINK } from "../data/content";

export default function Hero() {
  return (
    <section className="grain-bg relative pt-32 pb-20 px-5 overflow-hidden">
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono-label text-xs text-ember mb-4">
            09:00 — notif WA udah menumpuk
          </p>
          <h1 className="font-display font-black text-4xl sm:text-5xl leading-[1.05] text-paper mb-5">
            Chat WA bolak-balik itu, sekarang jadi satu sistem.
          </h1>
          <p className="text-paper/70 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
            Ordi ngambil alih hal-hal yang bikin kamu re-type manual tiap
            hari — katalog, ongkir, QRIS, rekap. Dibangun khusus buat
            bisnis kamu oleh Studio Harel, bukan disewakan dari template.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={WHATSAPP_CTA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-ember px-6 py-3.5 font-semibold text-ink hover:bg-ember/90 transition-colors"
            >
              Cerita Bisnis Kamu ke Saya
            </a>
            <div>
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-paper/20 px-6 py-3.5 font-semibold text-paper hover:border-paper/50 transition-colors inline-block"
              >
                Coba Ordi Langsung
              </a>
              <p className="font-mono-label text-[11px] text-paper/40 mt-2">
                Demo interaktif — data contoh, bukan toko asli
              </p>
            </div>
          </div>
        </motion.div>

        <ChatTransformHero />
      </div>
    </section>
  );
}
