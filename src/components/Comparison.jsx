import { Fragment } from "react";
import Reveal from "./Reveal";
import { COMPARISON } from "../data/content";
import { Sparkle } from "./Doodles";

const COLUMN_KEYS = ["manual", "sewa", "ordi"];

export default function Comparison() {
  return (
    <section className="relative px-5 py-16 sm:py-24 border-t-2 border-ink/10 bg-teal/8">
      <Sparkle className="absolute top-10 right-[10%] hidden sm:block" />
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="inline-block rounded-full bg-yellow border-2 border-ink px-3 py-1 mb-4 font-mono-label text-xs text-ink">
            Sebelum kamu putusin
          </span>
          <h2 className="font-display font-bold text-3xl text-ink mb-3">
            Tiga cara, tiga trade-off yang jujur
          </h2>
          <p className="text-ink/60 max-w-xl mb-10">
            Nggak ada yang sempurna. Ini biar kamu tahu apa yang kamu tukar
            di masing-masing pilihan, termasuk punya kita.
          </p>
        </Reveal>

        {/* Mobile: stacked cards, one per option — a 4-col table just gets
            crammed & requires horizontal scroll on narrow screens. */}
        <div className="md:hidden space-y-4">
          {COLUMN_KEYS.map((key, i) => {
            const highlight = key === "ordi";
            return (
              <Reveal key={key} delay={i * 0.08}>
                <div
                  className={`rounded-2xl border-2 border-ink p-5 ${
                    highlight
                      ? "bg-ember/[0.08] shadow-[4px_4px_0_0_var(--color-ink)]"
                      : "bg-paper-2"
                  }`}
                >
                  <h3
                    className={`font-display font-bold text-lg mb-4 ${
                      highlight ? "text-ember-deep" : "text-ink"
                    }`}
                  >
                    {COMPARISON.headers[i]}
                  </h3>
                  <dl className="space-y-3">
                    {COMPARISON.rows.map((row, rIdx) => (
                      <div
                        key={row.label}
                        className={
                          rIdx > 0 ? "border-t border-ink/10 pt-3" : ""
                        }
                      >
                        <dt className="font-mono-label text-[11px] text-ink/40 mb-1">
                          {row.label}
                        </dt>
                        <dd className="text-sm text-ink/80 leading-relaxed">
                          {row[key]}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Desktop/tablet: full 4-column table */}
        <div className="hidden md:block overflow-x-auto scrollbar-none">
          <div className="min-w-[720px] grid grid-cols-4 gap-3">
            <div />
            {COMPARISON.headers.map((h, i) => (
              <Reveal key={h} delay={i * 0.08}>
                <div
                  className={`rounded-t-xl px-4 py-3 font-display font-semibold text-sm border-2 border-ink ${
                    i === 2 ? "bg-ember text-ink" : "bg-paper-2 text-ink/80"
                  }`}
                >
                  {h}
                </div>
              </Reveal>
            ))}

            {COMPARISON.rows.map((row, rIdx) => (
              <Fragment key={row.label}>
                <div className="flex items-center px-2 text-xs font-mono-label text-ink/40">
                  {row.label}
                </div>
                {[row.manual, row.sewa, row.ordi].map((val, cIdx) => (
                  <Reveal key={`${row.label}-${cIdx}`} delay={rIdx * 0.05}>
                    <div
                      className={`px-4 py-3 text-sm leading-relaxed border-x-2 border-b-2 border-ink ${
                        cIdx === 2
                          ? "bg-ember/[0.08] text-ink/90"
                          : "bg-paper-2 text-ink/60"
                      } ${
                        rIdx === COMPARISON.rows.length - 1 ? "rounded-b-xl" : ""
                      }`}
                    >
                      {val}
                    </div>
                  </Reveal>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
