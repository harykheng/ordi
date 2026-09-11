import Reveal from "../Reveal";
import {
  MiniCatalog,
  MiniAddress,
  MiniTotal,
  MiniOrderIn,
} from "./ProductMockups";
import { STEPS } from "../../data/altContent";

const VISUALS = {
  CATALOG: MiniCatalog,
  ADDRESS: MiniAddress,
  TOTAL: MiniTotal,
  ORDER_IN: MiniOrderIn,
};

export default function HowItWorks() {
  return (
    <section
      id="cara-kerja"
      className="border-y border-espresso/10 bg-sand px-5 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow text-coral-deep">Cara kerjanya</p>
          <h2 className="font-statement mt-3 max-w-2xl text-[1.75rem] text-espresso sm:text-4xl">
            Satu alur untuk pelanggan. Satu dashboard untuk kamu.
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-espresso/85">
            Dari pelanggan buka katalog sampai pesanan nyampe ke kamu,
            semuanya jalan di satu tempat.
          </p>
        </Reveal>

        <div className="mt-9 grid gap-4 md:grid-cols-2">
          {STEPS.map((step, i) => {
            const Visual = VISUALS[step.visual];
            return (
              <Reveal key={step.n} delay={i * 0.06} className="min-w-0">
                <div className="flex h-full flex-col rounded-2xl border border-espresso/12 bg-card p-5">
                  <div className="mb-4 flex items-baseline gap-3">
                    <span className="font-statement text-3xl leading-none text-latte">
                      {step.n}
                    </span>
                    <div>
                      <p className="font-bold text-espresso">{step.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-espresso/85">
                        {step.body}
                      </p>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <Visual />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
