import { Fragment } from "react";
import Reveal from "./Reveal";
import { COMPARISON } from "../data/content";

export default function Comparison() {
  return (
    <section className="px-5 py-16 sm:py-24 border-t border-char/60 bg-char/20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono-label text-xs text-ember mb-3">
            Sebelum kamu putusin
          </p>
          <h2 className="font-display font-bold text-3xl text-paper mb-3">
            Tiga cara, tiga trade-off yang jujur
          </h2>
          <p className="text-paper/60 max-w-xl mb-10">
            Nggak ada yang sempurna. Ini biar kamu tahu apa yang kamu tukar
            di masing-masing pilihan — termasuk punya kita.
          </p>
        </Reveal>

        <div className="overflow-x-auto scrollbar-none -mx-5 px-5">
          <div className="min-w-[720px] grid grid-cols-4 gap-3">
            <div />
            {COMPARISON.headers.map((h, i) => (
              <Reveal key={h} delay={i * 0.08}>
                <div
                  className={`rounded-t-xl px-4 py-3 font-display font-semibold text-sm ${
                    i === 2
                      ? "bg-ember text-ink"
                      : "bg-char text-paper/80 border border-paper/10"
                  }`}
                >
                  {h}
                </div>
              </Reveal>
            ))}

            {COMPARISON.rows.map((row, rIdx) => (
              <Fragment key={row.label}>
                <div className="flex items-center px-2 text-xs font-mono-label text-paper/40">
                  {row.label}
                </div>
                {[row.manual, row.sewa, row.ordi].map((val, cIdx) => (
                  <Reveal key={`${row.label}-${cIdx}`} delay={rIdx * 0.05}>
                    <div
                      className={`px-4 py-3 text-sm leading-relaxed border-x border-b border-paper/10 ${
                        cIdx === 2
                          ? "bg-ember/[0.06] text-paper/90"
                          : "text-paper/60"
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
