import Reveal from "../Reveal";
import { PROBLEMS } from "../../data/altContent";

export default function ProblemSection() {
  return (
    <section id="masalah" className="px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow text-coral-deep">Masalahnya</p>
          <h2 className="font-statement mt-3 max-w-3xl text-[1.75rem] text-espresso sm:text-4xl">
            Kalau semua pesanan masuk lewat chat, masalahnya bukan cuma chat
            yang ramai.
          </h2>
        </Reveal>

        <div className="mt-9 grid gap-4 sm:grid-cols-3">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06} className="min-w-0">
              <div className="h-full rounded-2xl border border-espresso/12 bg-card p-5">
                <span className="font-statement text-2xl text-latte">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 font-bold text-espresso">{p.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-espresso/85">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
