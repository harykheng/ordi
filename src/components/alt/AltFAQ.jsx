import { SectionHead } from "./Section";
import { ALT_FAQ } from "../../data/altContent";

export default function AltFAQ() {
  return (
    <section id="faq" className="border-y border-espresso/12 bg-sand px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHead label="Pertanyaan" title="Yang biasanya ditanya duluan." />

        <div className="mt-9 max-w-3xl">
          {ALT_FAQ.map((item) => (
            <details key={item.q} className="group border-t border-espresso/12">
              <summary className="press flex cursor-pointer list-none items-center justify-between gap-4 py-4">
                <span className="text-[16px] font-semibold">{item.q}</span>
                <span
                  aria-hidden="true"
                  className="relative size-4 shrink-0 text-coral-deep"
                >
                  <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 rounded-full bg-current" />
                  <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 rotate-90 rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-open:rotate-0" />
                </span>
              </summary>
              <p className="-mt-1 max-w-2xl pb-5 text-[14px] leading-relaxed text-espresso/85">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
