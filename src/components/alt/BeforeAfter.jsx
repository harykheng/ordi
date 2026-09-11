import Reveal from "../Reveal";
import { IconX, IconCheck, IconArrowRight } from "./Icons";
import { BEFORE_AFTER } from "../../data/altContent";

export default function BeforeAfter() {
  return (
    <section className="border-y border-espresso/10 bg-sand px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="eyebrow text-coral-deep">Sebelum dan sesudah</p>
          <h2 className="font-statement mt-3 max-w-2xl text-[1.75rem] text-espresso sm:text-4xl">
            Bukan berarti kerjaanmu hilang. Tapi kerjaan yang berulang bisa
            dikurangi.
          </h2>
        </Reveal>

        <div className="relative mt-9 grid gap-4 md:grid-cols-2">
          {/* penanda arah di antara dua kolom, cuma di layar lebar */}
          <span className="absolute left-1/2 top-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-espresso/15 bg-cream text-espresso md:flex">
            <IconArrowRight className="h-4 w-4" />
          </span>
          <Reveal>
            <div className="h-full rounded-2xl border border-espresso/12 bg-cream p-5 sm:p-6">
              <p className="eyebrow text-espresso/75">Sebelum</p>
              <ul className="mt-4 space-y-3">
                {BEFORE_AFTER.before.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <IconX className="mt-0.5 h-4 w-4 shrink-0 text-coral-deep" />
                    <span className="text-[15px] leading-snug text-espresso/85">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="h-full rounded-2xl border border-espresso/20 bg-card p-5 shadow-[0_18px_36px_-24px_rgba(45,26,14,0.5)] sm:p-6">
              <p className="eyebrow text-mint-deep">Sesudah pakai Ordi</p>
              <ul className="mt-4 space-y-3">
                {BEFORE_AFTER.after.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-mint">
                      <IconCheck className="h-3 w-3 text-mint-deep" />
                    </span>
                    <span className="text-[15px] font-medium leading-snug text-espresso">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
