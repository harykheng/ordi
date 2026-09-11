import { Fragment } from "react";
import Reveal from "../Reveal";
import { ALT_COMPARISON } from "../../data/altContent";

export default function AltComparison() {
  const { columns, rows } = ALT_COMPARISON;

  return (
    <section className="px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow text-coral-deep">Perbandingan</p>
          <h2 className="font-statement mt-3 max-w-2xl text-[1.75rem] text-espresso sm:text-4xl">
            Tiga cara ngatur pesanan, tiga konsekuensi yang beda.
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-espresso/85">
            Nggak ada yang paling benar buat semua orang. Ini biar kelihatan
            apa yang kamu tukar di tiap pilihan, termasuk kalau milih Ordi.
          </p>
        </Reveal>

        {/* Mobile: satu kartu per pilihan, semua aspek di dalamnya.
            Tabel 4 kolom selalu kesempitan di layar kecil. */}
        <div className="mt-8 space-y-4 md:hidden">
          {columns.map((col, i) => {
            const isOrdi = col.key === "ordi";
            return (
              <Reveal key={col.key} delay={i * 0.06} className="min-w-0">
                <div
                  className={`rounded-2xl border p-5 ${
                    isOrdi
                      ? "border-espresso/25 bg-card shadow-[0_18px_36px_-24px_rgba(45,26,14,0.5)]"
                      : "border-espresso/12 bg-sand"
                  }`}
                >
                  <h3 className="font-statement text-lg text-espresso">
                    {col.label}
                  </h3>
                  <dl className="mt-3.5 space-y-3">
                    {rows.map((row, rIdx) => (
                      <div
                        key={row.label}
                        className={rIdx > 0 ? "border-t border-espresso/10 pt-3" : ""}
                      >
                        <dt className="eyebrow text-espresso/75">
                          {row.label}
                        </dt>
                        <dd className="mt-1 text-sm leading-relaxed text-espresso/85">
                          {row[col.key]}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Desktop: tabel 4 kolom */}
        <div className="mt-8 hidden md:block">
          <div className="grid grid-cols-[136px_repeat(3,1fr)] gap-px overflow-hidden rounded-2xl border border-espresso/15 bg-espresso/15">
            <div className="bg-sand" />
            {columns.map((col) => (
              <div
                key={col.key}
                className={`px-4 py-3.5 text-sm font-bold ${
                  col.key === "ordi"
                    ? "bg-espresso text-cream"
                    : "bg-sand text-espresso/85"
                }`}
              >
                {col.label}
              </div>
            ))}

            {rows.map((row) => (
              <Fragment key={row.label}>
                <div className="flex items-center bg-sand px-4 py-3.5">
                  <span className="eyebrow leading-snug text-espresso/75">{row.label}</span>
                </div>
                {columns.map((col) => (
                  <div
                    key={col.key}
                    className={`px-4 py-3.5 text-sm leading-relaxed ${
                      col.key === "ordi"
                        ? "bg-card font-medium text-espresso"
                        : "bg-cream text-espresso/85"
                    }`}
                  >
                    {row[col.key]}
                  </div>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
