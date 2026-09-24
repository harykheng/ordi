import Reveal from "./Reveal";
import { HONEST_NOTES, PROCESS_STEPS } from "../data/content";

export default function HowToStart() {
  return (
    <section className="tear-top px-5 pt-24 pb-20 sm:pb-28" style={{ "--tear-from": "var(--color-meja)" }}>
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono-label text-xs uppercase tracking-[0.08em] text-ink-2">Cara mulai</p>
          <h2 className="font-headline mt-3 text-[clamp(2.4rem,5vw,3.6rem)] leading-[0.98] text-balance">
            Ngobrol dulu, <mark className="mark-hl">baru dibangun.</mark>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-14">
          <ol className="grid grid-cols-1 gap-5">
            {PROCESS_STEPS.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 0.08} className="ticket-wrap">
                  <div className="ticket grid grid-cols-[48px_minmax(0,1fr)] gap-4 px-7 py-5">
                    <span className="pen text-4xl font-bold leading-none">{i + 1}</span>
                    <div>
                      <h3 className="font-headline text-2xl leading-none">{step.title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{step.body}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal delay={0.1}>
            <div
              className="relative rounded-2xl border-2 border-ink bg-card px-6 pt-6 pb-7 shadow-[5px_5px_0_0_var(--color-ink)]"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, transparent 38px, rgb(184 84 26 / 0.55) 38px 40px, transparent 40px), repeating-linear-gradient(transparent 0 31px, rgb(42 70 200 / 0.14) 31px 32px)",
                backgroundPosition: "0 0, 0 18px",
              }}
            >
              <h3 className="pl-8 font-headline text-2xl leading-none">Biar nggak salah harap</h3>
              <p className="mt-1.5 pl-8 text-sm text-ink-2">Yang memang belum ada di Ordi, ditulis dari awal.</p>
              <ul className="mt-5 grid grid-cols-1 gap-3.5 pl-8">
                {HONEST_NOTES.map((n) => (
                  <li key={n} className="relative text-[15px] leading-relaxed">
                    <span className="pen absolute -left-7 top-0 text-lg font-bold leading-none" aria-hidden="true">
                      ✗
                    </span>
                    {n}
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
