import OrderSim from "./OrderSim";
import { IconWhatsApp } from "./Icons";
import { DEMO_URL, HERO } from "../../data/altContent";
import { trackDemo, trackWa, waHref } from "../../lib/track";

export default function AltHero() {
  return (
    <section id="top" className="px-5 pb-14 pt-24 sm:pt-28">
      <div className="mx-auto max-w-5xl lg:grid lg:grid-cols-12 lg:items-start lg:gap-10">
        {/* Di mobile tombol sengaja naik ke atas mockup, supaya CTA utama
            tetap kelihatan di layar pertama. */}
        <div className="lg:col-span-5 lg:pt-6">
          <p className="rise rise-1 label text-coral-deep">{HERO.eyebrow}</p>
          <h1 className="rise rise-1 display mt-3 text-[clamp(2.1rem,1.4rem+3vw,3.1rem)]">
            {HERO.headline}
          </h1>
          <p className="rise rise-2 mt-4 max-w-md text-[16px] leading-relaxed text-espresso/85">
            {HERO.sub}
          </p>

          <div className="rise rise-3 mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackDemo("hero")}
              className="press inline-flex min-h-12 items-center gap-2 rounded-xl bg-coral pl-6 pr-5 text-[15px] font-bold text-cream hover:bg-coral-deep"
            >
              {HERO.primary}
              <span aria-hidden="true">&rarr;</span>
            </a>
            <a
              href={waHref("hero")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWa("hero")}
              className="press inline-flex min-h-12 items-center gap-2 text-[15px] font-semibold underline decoration-espresso/25 underline-offset-[6px] hover:decoration-coral"
            >
              <IconWhatsApp className="h-[18px] w-[18px]" />
              {HERO.secondary}
            </a>
          </div>
          <p className="rise rise-3 mt-3 text-[13px] text-espresso/80">
            {HERO.micro}
          </p>
        </div>

        <div className="rise rise-3 mt-10 lg:col-span-7 lg:mt-0">
          <OrderSim />
        </div>
      </div>
    </section>
  );
}
