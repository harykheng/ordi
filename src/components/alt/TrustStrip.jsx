import Reveal from "../Reveal";
import { IconShield, IconList, IconChart } from "./Icons";
import { TRUST_POINTS } from "../../data/altContent";

const ICONS = [IconShield, IconList, IconChart];

export default function TrustStrip() {
  return (
    <section className="border-b border-espresso/10 bg-sand px-5 py-10 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-7 text-center font-statement text-xl text-espresso sm:text-2xl">
            Dibuat untuk cara kerja bisnis kamu.
          </p>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-3 sm:gap-6">
          {TRUST_POINTS.map((point, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={point.title} delay={i * 0.06} className="min-w-0">
                <div className="flex gap-3 sm:flex-col sm:gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream text-espresso">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="font-bold text-espresso">{point.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-espresso/85">
                      {point.body}
                    </p>
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
