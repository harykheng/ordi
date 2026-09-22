import { Fragment } from "react";
import { SectionHead } from "./Section";
import { ALT_COMPARISON } from "../../data/altContent";

export default function AltComparison() {
  const { columns, rows } = ALT_COMPARISON;

  return (
    <section className="border-y border-espresso/12 bg-sand px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHead
          label="Bandingin"
          title="Tiga cara ngatur pesanan."
          lead="Masing-masing ada enaknya dan ada tukarannya, termasuk Ordi."
        />

        {/* Mobile: satu blok per pilihan. Tabel empat kolom selalu
            kesempitan di layar kecil. */}
        <div className="mt-9 md:hidden">
          {columns.map((col) => (
            <div key={col.key} className="border-t border-espresso/15 py-5">
              <h3 className="text-[16px] font-bold">
                {col.label}
                {col.key === "ordi" && (
                  <span className="ml-2 rounded-md bg-coral px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cream">
                    ini
                  </span>
                )}
              </h3>
              <dl className="mt-2.5">
                {rows.map((row) => (
                  <div key={row.label} className="py-1.5">
                    <dt className="label text-espresso/80">{row.label}</dt>
                    <dd className="mt-0.5 text-[14px] leading-relaxed text-espresso/85">
                      {row[col.key]}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        <div className="mt-9 hidden md:block">
          <div className="grid grid-cols-[120px_repeat(3,1fr)]">
            <div className="border-b border-espresso/20" />
            {columns.map((col) => (
              <div
                key={col.key}
                className={`border-b-2 px-4 pb-3 ${
                  col.key === "ordi" ? "border-coral" : "border-espresso/20"
                }`}
              >
                <p
                  className={`text-[16px] font-bold ${
                    col.key === "ordi" ? "text-coral-deep" : ""
                  }`}
                >
                  {col.label}
                </p>
              </div>
            ))}

            {rows.map((row) => (
              <Fragment key={row.label}>
                <div className="border-b border-espresso/12 py-4 pr-2">
                  <span className="label text-espresso/80">{row.label}</span>
                </div>
                {columns.map((col) => (
                  <div
                    key={col.key}
                    className={`border-b border-espresso/12 px-4 py-4 text-[14px] leading-relaxed ${
                      col.key === "ordi"
                        ? "bg-cream/70 font-medium"
                        : "text-espresso/85"
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
