import { motion } from "framer-motion";
import ChatTransformHero from "./ChatTransformHero";
import { Star, Sparkle, CircleUnderline, Spiral } from "./Doodles";
import { DEMO_URL, WHATSAPP_CTA_LINK } from "../data/content";

export default function Hero() {
  return (
    <section className="grain-bg relative pt-32 pb-20 px-5 overflow-hidden">
      <Star className="absolute top-24 right-[8%] text-teal" />
      <Sparkle className="absolute top-40 left-[6%] text-ember" />
      <Spiral className="absolute bottom-10 left-[4%] hidden sm:block" />

      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow border-2 border-ink px-3 py-1 mb-5 text-xs font-semibold font-mono-label text-ink">
            09:00 — notif WA udah menumpuk
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl leading-[1.05] text-ink mb-5">
            Chat WA bolak-balik itu,{" "}
            <span className="relative inline-block text-ember-deep">
              sekarang
              <CircleUnderline className="absolute left-0 -bottom-2 w-full" />
            </span>{" "}
            jadi satu sistem.
          </h1>
          <p className="text-ink/70 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
            Ordi ngambil alih hal-hal yang bikin kamu re-type manual tiap
            hari — katalog, ongkir, QRIS, rekap. Dibangun khusus buat
            bisnis kamu oleh Studio Harel, bukan disewakan dari template.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={WHATSAPP_CTA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-ink px-6 py-3.5 font-semibold text-paper hover:bg-ink/85 transition-colors"
            >
              Cerita Bisnis Kamu ke Saya
            </a>
            <div>
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-ink px-6 py-3.5 font-semibold text-ink hover:bg-ink hover:text-paper transition-colors inline-block"
              >
                Coba Ordi Langsung
              </a>
              <p className="font-mono-label text-[11px] text-ink/40 mt-2">
                Demo interaktif — data contoh, bukan toko asli
              </p>
            </div>
          </div>
        </motion.div>

        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-teal/10 rotate-2 hidden sm:block" />
          <ChatTransformHero />
        </div>
      </div>
    </section>
  );
}
