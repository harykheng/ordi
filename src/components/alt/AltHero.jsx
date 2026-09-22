import OrderSim from "./OrderSim";
import { HERO } from "../../data/altContent";

export default function AltHero() {
  return (
    <section id="top" className="px-5 pb-16 pt-24 sm:pt-28">
      <div className="mx-auto max-w-5xl lg:grid lg:grid-cols-12 lg:items-start lg:gap-12">
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
          <OrderSim />
        </div>
      </div>
    </section>
  );
}
