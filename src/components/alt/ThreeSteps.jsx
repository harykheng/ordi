import { SectionHead } from "./Section";
import { IconWhatsApp } from "./Icons";
import { START_STEPS } from "../../data/altContent";
import { trackWa, waHref } from "../../lib/track";

export default function ThreeSteps() {
  return (
    <section
      id="mulai"
      className="border-y border-espresso/12 bg-sand px-5 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHead label="Cara mulai" title="Cuma tiga langkah untuk mulai." />

        <ol className="mt-9 grid gap-4 sm:grid-cols-3">
          {START_STEPS.map((s, i) => (
            <li key={s.title} className="surface rounded-2xl p-5">
              <span className="tnum flex size-8 items-center justify-center rounded-full bg-sand text-[14px] font-bold">
                {i + 1}
              </span>
              <h3 className="mt-4 text-[17px] font-bold">{s.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-espresso/85">
                {s.body}
              </p>
            </li>
          ))}
        </ol>

        <a
          href={waHref("demo")}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWa("demo")}
          className="press mt-8 inline-flex min-h-12 items-center gap-2 rounded-xl bg-coral pl-6 pr-5 text-[15px] font-bold text-cream hover:bg-coral-deep"
        >
          <IconWhatsApp className="h-[18px] w-[18px]" />
          Mulai dari langkah pertama
        </a>
      </div>
    </section>
  );
}
