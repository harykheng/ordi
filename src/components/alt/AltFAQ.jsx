import { SectionHead } from "./Section";
import { ALT_FAQ } from "../../data/altContent";

export default function AltFAQ() {
  return (
    <section id="faq" className="px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHead label="Pertanyaan" title="Empat hal yang biasanya ditanya duluan." />

        <div className="mt-9 max-w-3xl">
          {ALT_FAQ.map((item) => (
            <details key={item.q} className="group border-t border-espresso/12">
              <summary className="press flex cursor-pointer list-none items-center justify-between gap-4 py-4">
                <span className="text-[16px] font-semibold">{item.q}</span>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-xl leading-none text-coral-deep transition-transform duration-200 group-open:rotate-45"
                >
                  +
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
