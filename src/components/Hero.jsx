import { motion } from "framer-motion";
import OwnershipCertificate from "./OwnershipCertificate";
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
            Bukan disewain ke ribuan toko
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl leading-[1.05] text-ink mb-5">
            Bukan toko yang disewain ke ribuan orang.{" "}
            <span className="relative inline-block text-ember-deep">
              Ini punya kamu sendiri.
              <CircleUnderline className="absolute left-0 -bottom-2 w-full" />
            </span>
          </h1>
          <p className="text-ink/70 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
            Ordi dibangun ngikutin cara bisnis kamu jalan — bukan template
            siap-pakai yang tampilannya mirip semua toko lain. Sekali
            bayar, langsung jadi milik kamu selamanya, bukan numpang di
            subdomain siapa pun.
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
          <OwnershipCertificate />
        </div>
      </div>
    </section>
  );
}
