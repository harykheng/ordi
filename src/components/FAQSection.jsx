import Reveal from "./Reveal";
import { FAQ_ITEMS } from "../data/content";

export default function FAQSection() {
  return (
    <section id="tanya" className="tear-top scroll-mt-20 bg-meja px-5 pt-24 pb-20 sm:pb-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="font-mono-label text-xs uppercase tracking-[0.08em] text-ink-2">Tanya jawab</p>
          <h2 className="font-headline mt-3 text-[clamp(2.1rem,4.4vw,3.2rem)] leading-[1.05] text-balance">
            Pertanyaan yang biasanya muncul
          </h2>
          <p className="mt-4 mb-10 text-ink-2">Kalau masih ada yang mengganjal di luar ini, langsung aja tanya di WhatsApp.</p>
        </Reveal>

        <div className="grid grid-cols-1 gap-3">
          {FAQ_ITEMS.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.04}>
              <details className="group rounded-2xl border-2 border-ink bg-card open:shadow-[4px_4px_0_0_var(--color-ink)]">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    className="grid grid-cols-1 size-8 shrink-0 place-items-center rounded-full border-2 border-ink bg-highlight text-lg leading-none transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 text-[15px] leading-relaxed text-ink-2">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
