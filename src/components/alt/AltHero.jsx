import OrderSim from "./OrderSim";
import { Rule, InkStroke } from "./Paper";
import { IconWhatsApp } from "./Icons";
import { DEMO_URL, waLink } from "../../data/altContent";

const WA_HERO = waLink(
  "Halo Studio Harel, saya mau cerita soal bisnis saya dan lihat apakah Ordi cocok."
);

export default function AltHero() {
  return (
    <section id="top" className="px-5 pb-14 pt-24 sm:pt-28">
      <div className="mx-auto max-w-6xl">
        <Rule n="01" label="Website pesan online buat UMKM F&amp;B" className="mb-7" />

        {/* Judul pendek, satu kalimat penjelas, dua tombol. Sisanya biar
            mockup produknya yang ngomong. */}
        <div className="md:grid md:grid-cols-12 md:items-end md:gap-8">
          <h1 className="display text-[clamp(2.4rem,1.1rem+5.2vw,4.8rem)] md:col-span-7">
            Bikin pelanggan{" "}
            <span className="misprint relative inline-block">
              pesan sendiri
              <InkStroke className="-bottom-1 h-3" />
            </span>
            .
          </h1>

          <div className="mt-7 md:col-span-5 md:mt-0">
            <p className="standfirst max-w-sm">
              Order masuk rapi ke dashboard. Kamu berhenti jadi kasir di kolom
              chat.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  window.gtag?.("event", "klik_demo", { lokasi: "hero" })
                }
                className="press inline-flex min-h-12 items-center gap-2 rounded-[3px] bg-coral px-6 text-[15px] font-bold text-cream hover:bg-coral-deep"
              >
                Coba demo Ordi yang sebenarnya
                <span aria-hidden="true">&rarr;</span>
              </a>
              <a
                href={WA_HERO}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  window.gtag?.("event", "klik_wa", { lokasi: "hero" })
                }
                className="inline-flex min-h-12 items-center gap-2 text-[15px] font-semibold underline decoration-espresso/30 underline-offset-[6px] hover:decoration-coral"
              >
                <IconWhatsApp className="h-[18px] w-[18px]" />
                Ceritakan bisnismu
              </a>
            </div>
          </div>
        </div>

        <div className="mt-11">
          <Rule n="02" label="Klik sendiri" className="mb-5" />
          <OrderSim />
        </div>
      </div>
    </section>
  );
}
