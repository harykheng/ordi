import OrderSim from "./OrderSim";
import { Rule, InkStroke } from "./Paper";
import { IconWhatsApp } from "./Icons";
import { DEMO_URL, waLink } from "../../data/altContent";

const WA_HERO = waLink(
  "Halo Studio Harel, saya mau cerita soal bisnis saya dan lihat apakah Ordi cocok."
);

export default function AltHero() {
  return (
    <section id="top" className="px-5 pb-16 pt-24 sm:pt-28">
      <div className="mx-auto max-w-6xl">
        <Rule n="01" label="Website pesan online buat UMKM F&amp;B" className="mb-7" />

        {/* Judul besar di kiri, penjelasan turun dan geser ke kanan.
            Diagonal itu yang bikin pembukaannya terasa halaman cetak,
            bukan hero SaaS kiri-kanan. */}
        <h1 className="display max-w-[15ch] text-[clamp(2.5rem,1.1rem+5.6vw,5.2rem)]">
          Bikin pelanggan{" "}
          <span className="misprint relative inline-block">
            pesan sendiri
            <InkStroke className="-bottom-1 h-3" />
          </span>
          .
        </h1>

        <div className="mt-9 grid gap-8 md:grid-cols-12 md:gap-6">
          <p className="order-2 border-l border-espresso/25 pl-4 text-[13px] italic leading-relaxed text-espresso/85 md:order-1 md:col-span-4 md:max-w-[24ch] md:self-start">
            Sistem dibuat mengikuti cara kerja bisnismu, bukan template generik
            yang dipakai ribuan toko lain.
          </p>

          <div className="order-1 md:order-2 md:col-span-7 md:col-start-6">
            <p className="standfirst dropcap max-w-xl">
              Ordi nampung katalog, pesanan, hitungan ongkir, dan catatan
              pembayaran dalam satu sistem pesan online. Pelanggan pesan
              sendiri, kamu nggak perlu jadi kasir di kolom chat.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={WA_HERO}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  window.gtag?.("event", "klik_wa", { lokasi: "hero" })
                }
                className="press inline-flex min-h-12 items-center gap-2 rounded-[3px] bg-coral px-6 text-[15px] font-bold text-cream hover:bg-coral-deep"
              >
                <IconWhatsApp className="h-[18px] w-[18px]" />
                Ceritakan Bisnismu
              </a>
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  window.gtag?.("event", "klik_demo", { lokasi: "hero" })
                }
                className="inline-flex min-h-12 items-center gap-1.5 text-[15px] font-semibold underline decoration-espresso/30 underline-offset-[6px] hover:decoration-coral"
              >
                Lihat demo Ordi
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
            <p className="mt-3 text-[13px] text-espresso/80">
              Konsultasi awal lewat WhatsApp. Tidak langsung dipaksa membeli.
            </p>
          </div>
        </div>

        <div className="mt-14 sm:mt-16">
          <Rule n="02" label="Coba sendiri alurnya" className="mb-6" />
          <OrderSim />
        </div>
      </div>
    </section>
  );
}
