import OrderSim from "./OrderSim";
import { IconWhatsApp } from "./Icons";
import { DEMO_URL, waLink } from "../../data/altContent";

const WA_HERO = waLink(
  "Halo Studio Harel, saya mau cerita soal bisnis saya dan lihat apakah Ordi cocok."
);

export default function AltHero() {
  return (
    <section id="top" className="px-5 pb-14 pt-24 sm:pt-28">
      <div className="mx-auto max-w-5xl">
        {/* Masuknya dipecah per bagian dan digeser sedikit, biar kebaca
            berurutan: judul dulu, penjelasan, baru tombol. */}
        <div className="md:grid md:grid-cols-12 md:items-end md:gap-10">
          <h1 className="rise rise-1 display text-[clamp(2.3rem,1.3rem+4.2vw,3.9rem)] md:col-span-7">
            Bikin pelanggan pesan sendiri.
          </h1>
          <p className="rise rise-2 mt-6 text-[16px] leading-relaxed text-espresso/85 md:col-span-5 md:mt-0">
            Katalog online buat kedai kopi, bakery, dan katering. Pelanggan
            pesan lewat web, ordernya masuk ke dashboard kamu.
          </p>
        </div>

        <div className="rise rise-3 mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => window.gtag?.("event", "klik_demo", { lokasi: "hero" })}
            className="press inline-flex min-h-12 items-center gap-2 rounded-xl bg-coral pl-6 pr-5 text-[15px] font-bold text-cream hover:bg-coral-deep"
          >
            Coba demo Ordi
            <span aria-hidden="true">&rarr;</span>
          </a>
          <a
            href={WA_HERO}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => window.gtag?.("event", "klik_wa", { lokasi: "hero" })}
            className="press inline-flex min-h-12 items-center gap-2 text-[15px] font-semibold underline decoration-espresso/25 underline-offset-[6px] hover:decoration-coral"
          >
            <IconWhatsApp className="h-[18px] w-[18px]" />
            Tanya dulu di WhatsApp
          </a>
        </div>

        <div className="mt-12">
          <p className="label mb-4 text-espresso/80">
            Coba klik sendiri
          </p>
          <OrderSim />
        </div>
      </div>
    </section>
  );
}
