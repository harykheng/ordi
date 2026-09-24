import { Fragment } from "react";
import Reveal from "./Reveal";
import { COMPARISON } from "../data/content";

const COLUMN_KEYS = ["manual", "sewa", "ordi"];

export default function Comparison() {
  return (
    <section className="tear-top px-5 pt-24 pb-20 sm:pb-28" style={{ "--tear-from": "var(--color-meja)" }}>
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono-label text-xs uppercase tracking-[0.08em] text-ink-2">Sebelum kamu putusin</p>
          <h2 className="font-headline mt-3 text-[clamp(1.9rem,3.8vw,2.8rem)] leading-[1.08] text-balance">
            Tiga cara, <mark className="mark-hl">tiga trade-off</mark> yang jujur
          </h2>
          <p className="mt-4 mb-10 max-w-xl text-ink-2 sm:text-lg">
            Nggak ada yang sempurna. Ini biar kamu tahu apa yang kamu tukar di masing-masing pilihan,
            termasuk punya kita.
          </p>
        </Reveal>

        {/* Mobile: one card per option. A 4-column table only fits from md up. */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {COLUMN_KEYS.map((key, i) => {
            const ordi = key === "ordi";
            return (
              <Reveal key={key} delay={i * 0.08}>
                <div className={`rounded-2xl border-2 border-ink p-5 ${ordi ? "bg-card shadow-[0_5px_0_0_var(--color-ink)]" : "bg-card/60"}`}>
                  <h3 className="font-headline text-xl leading-tight">
                    {ordi ? <mark className="mark-hl">{COMPARISON.headers[i]}</mark> : COMPARISON.headers[i]}
                  </h3>
                  <dl className="mt-4 grid grid-cols-1 gap-3">
                    {COMPARISON.rows.map((row, r) => (
                      <div key={row.label} className={r > 0 ? "border-t-[1.5px] border-dashed border-ink/25 pt-3" : ""}>
                        <dt className="font-mono-label text-[11px] uppercase text-ink-2">{row.label}</dt>
                        <dd className={`mt-1 text-sm leading-relaxed ${ordi ? "text-ink" : "text-ink-2"}`}>{row[key]}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* md+: the 3-option table, ruled like a nota, Ordi column highlighted */}
        <Reveal className="hidden md:block">
          <div className="card-ink overflow-hidden">
            <div className="grid grid-cols-[140px_repeat(3,minmax(0,1fr))]">
              <div className="border-b-2 border-ink" />
              {COMPARISON.headers.map((h, i) => (
                <div
                  key={h}
                  className={`border-b-2 border-l-2 border-ink px-5 py-4 font-headline text-[15px] leading-tight ${i === 2 ? "bg-highlight" : ""}`}
                >
                  {h}
                </div>
              ))}
              {COMPARISON.rows.map((row, r) => (
                <Fragment key={row.label}>
                  <div
                    className={`px-5 py-4 font-mono-label text-xs uppercase text-ink-2 ${r < COMPARISON.rows.length - 1 ? "border-b-[1.5px] border-dashed border-ink/25" : ""}`}
                  >
                    {row.label}
                  </div>
                  {COLUMN_KEYS.map((key) => (
                    <div
                      key={key}
                      className={`border-l-2 border-ink px-5 py-4 text-[15px] leading-relaxed ${
                        key === "ordi" ? "bg-highlight/35 text-ink" : "text-ink-2"
                      } ${r < COMPARISON.rows.length - 1 ? "border-b-[1.5px] border-b-ink/25 [border-bottom-style:dashed]" : ""}`}
                    >
                      {row[key]}
                    </div>
                  ))}
                </Fragment>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
