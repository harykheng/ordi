import { motion } from "framer-motion";
import { CatalogScreen, OrderSummaryCard } from "./ProductMockups";
import { IconWhatsApp, IconArrowRight } from "./Icons";
import { DEMO_URL, waLink } from "../../data/altContent";

const WA_HERO = waLink(
  "Halo Studio Harel, saya mau cerita soal bisnis saya dan lihat apakah Ordi cocok."
);

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function AltHero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-bean px-5 pb-16 pt-20 sm:pt-28 md:pb-28"
    >
      <div className="grain-dark absolute inset-0" aria-hidden="true" />
      {/* cahaya hangat, halus, bukan gradient neon */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-espresso/70 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-[-10%] h-80 w-80 rounded-full bg-latte/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2 md:gap-12">
        {/* Di mobile urutannya judul → mockup → CTA. Wrapper kolom kiri
            pakai display:contents supaya ketiga blok jadi item grid
            sendiri dan bisa di-order; di md+ wrapper balik jadi satu
            kolom utuh dan mockup duduk di kolom kanan. */}
        <div className="contents md:block">
          <motion.div {...fade()} className="order-1">
            <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-cream/25 px-3 py-1.5 text-[10px] tracking-[0.1em] text-cream/85 sm:text-[11px] sm:tracking-[0.14em]">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-latte" />
              Website pesan online, UMKM F&amp;B
            </span>
            <h1 className="font-statement mt-5 text-[2.2rem] text-cream min-[400px]:text-[2.45rem] sm:text-5xl lg:text-[3.4rem]">
              Bikin pelanggan
              <br />
              pesan sendiri.
            </h1>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-cream/85 sm:text-base">
              Ordi nampung katalog, pesanan, hitungan ongkir, dan catatan
              pembayaran dalam satu sistem pesan online. Pelanggan pesan
              sendiri, kamu nggak perlu jadi kasir di chat.
            </p>
          </motion.div>

          <motion.div {...fade(0.2)} className="order-3 md:mt-9">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={WA_HERO}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  window.gtag?.("event", "klik_wa", { lokasi: "hero" })
                }
                className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-coral px-6 py-3.5 text-base font-bold text-cream transition-colors hover:bg-coral-deep"
              >
                <IconWhatsApp className="h-5 w-5" />
                Ceritakan Bisnismu
              </a>
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  window.gtag?.("event", "klik_demo", { lokasi: "hero" })
                }
                className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-cream/40 px-6 py-3.5 text-base font-semibold text-cream transition-colors hover:bg-cream hover:text-bean"
              >
                Lihat Demo Ordi
                <IconArrowRight className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-3.5 text-[13px] text-cream/85">
              Konsultasi awal lewat WhatsApp. Tidak langsung dipaksa membeli.
            </p>
            <p className="mt-4 flex items-start gap-2 border-t border-cream/15 pt-4 text-[13px] leading-relaxed text-cream/85">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-latte" />
              Sistem dibuat mengikuti cara kerja bisnismu, bukan template
              generik.
            </p>
          </motion.div>
        </div>

        {/* mockup produk: di mobile nyempil di antara judul dan CTA */}
        <motion.div {...fade(0.12)} className="relative order-2">
          <span className="absolute -top-3 right-3 z-10 hidden rounded-full bg-cream px-3 py-1 text-[11px] font-semibold text-espresso shadow-lg md:block">
            Katalog rapi
          </span>
          <div className="md:ml-auto md:max-w-[400px] lg:max-w-[440px]">
            <CatalogScreen />
          </div>
          <OrderSummaryCard className="mt-4 md:absolute md:-bottom-8 md:left-0 md:mt-0 md:w-52 md:shadow-[0_22px_44px_-18px_rgba(20,10,4,0.8)] lg:w-56" />
        </motion.div>
      </div>
    </section>
  );
}
