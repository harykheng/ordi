import { Rule } from "./Paper";
import { ALT_FAQ } from "../../data/altContent";

// Tanya jawab bergaris rambut, tanpa kotak. Pakai <details> asli supaya
// tetap kebuka di keyboard dan tanpa state JS.
export default function AltFAQ() {
  return (
    <section
      id="faq"
      className="border-t border-espresso/15 bg-sand px-5 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <Rule n="10" label="Yang biasanya ditanya" className="mb-8" />

        <div className="md:grid md:grid-cols-12 md:gap-8">
          <h2 className="display text-[clamp(1.75rem,1.2rem+2vw,2.9rem)] md:col-span-4">
            Pertanyaan yang biasanya nahan orang buat mulai.
          </h2>

          <div className="mt-8 border-t border-espresso/25 md:col-span-7 md:col-start-6 md:mt-0">
            {ALT_FAQ.map((item, i) => (
              <details
                key={item.q}
                className="group border-b border-espresso/20"
              >
                <summary className="flex cursor-pointer list-none items-baseline gap-4 py-4">
                  <span className="kicker shrink-0 text-espresso/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-[16px] font-semibold">
                    {item.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-xl leading-none text-coral-deep transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-5 pl-10 text-[14px] leading-relaxed text-espresso/85">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
