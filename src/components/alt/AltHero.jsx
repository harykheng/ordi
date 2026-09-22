import { useState } from "react";
import OrderSim from "./OrderSim";
import OrderStorm from "./OrderStorm";
import { HERO } from "../../data/altContent";

export default function AltHero() {
  // Naik tiap kali pengunjung nambah produk di simulasi. Latar hero ikut
  // bereaksi, jadi badainya bukan cuma hiasan.
  const [pulse, setPulse] = useState(0);

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden px-5 pb-20 pt-24 sm:pb-24 sm:pt-28"
    >
      <OrderStorm pulse={pulse} />

      {/* Area tenang di belakang copy. Latar boleh ramai, judul nggak boleh
          ikut ramai. Dua versi: melebar dari kiri di layar lebar, dari atas
          di layar kecil. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] hidden sm:block"
        style={{
          background:
            "radial-gradient(54% 80% at 20% 46%, var(--color-cream) 44%, color-mix(in srgb, var(--color-cream) 74%, transparent) 72%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] sm:hidden"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-cream) 0%, var(--color-cream) 26%, color-mix(in srgb, var(--color-cream) 72%, transparent) 46%, transparent 62%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl lg:grid lg:grid-cols-12 lg:items-start lg:gap-12">
        <div className="lg:col-span-6 lg:pt-6">
          <p className="rise rise-1 label text-coral-deep">{HERO.eyebrow}</p>
          <h1 className="rise rise-1 display mt-3 text-[clamp(2.1rem,1.4rem+2.8vw,3rem)]">
            {HERO.headline}
          </h1>
          <p className="rise rise-2 mt-5 max-w-md text-[16px] leading-relaxed text-espresso/85">
            {HERO.sub}
          </p>

          <div className="rise rise-3 mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#alur"
              className="press lift cta inline-flex min-h-12 items-center gap-2 rounded-xl bg-coral pl-6 pr-5 text-[15px] font-bold text-cream hover:bg-coral-deep"
            >
              {HERO.primary}
              <span aria-hidden="true">&darr;</span>
            </a>
            <a
              href="#paket"
              className="surface surface-hover press lift inline-flex min-h-12 items-center rounded-xl px-5 text-[15px] font-semibold"
            >
              {HERO.secondary}
            </a>
          </div>
          <p className="rise rise-3 mt-3 text-[13px] text-espresso/80">
            {HERO.micro}
          </p>
        </div>

        <div id="alur" className="rise rise-3 mt-10 lg:col-span-6 lg:mt-0">
          <OrderSim onAdd={() => setPulse((p) => p + 1)} />
        </div>
      </div>
    </section>
  );
}
