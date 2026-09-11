import Reveal from "../Reveal";
import { ALT_FAQ } from "../../data/altContent";

export default function AltFAQ() {
  return (
    <section
      id="faq"
      className="border-t border-espresso/10 bg-sand px-5 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="eyebrow text-coral-deep">FAQ</p>
          <h2 className="font-statement mt-3 text-[1.75rem] text-espresso sm:text-4xl">
            Pertanyaan yang biasanya nahan orang buat mulai.
          </h2>
        </Reveal>

        <div className="mt-8 space-y-2.5">
          {ALT_FAQ.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.04}>
              <details className="group rounded-2xl border border-espresso/12 bg-card px-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-espresso">
                  {item.q}
                  <span className="shrink-0 text-xl leading-none text-coral-deep transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="-mt-1 pb-4 text-sm leading-relaxed text-espresso/85">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
