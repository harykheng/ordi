import { Fragment } from "react";
import { Rule } from "./Paper";
import { ALT_COMPARISON } from "../../data/altContent";

// Tetap tabel tiga kolom, tapi tanpa kotak kartu: cuma garis rambut dan
// satu kolom yang ditandai tinta merah.
export default function AltComparison() {
  const { columns, rows } = ALT_COMPARISON;

  return (
    <section className="px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Rule n="09" label="Perbandingan" className="mb-8" />

        <div className="md:grid md:grid-cols-12 md:gap-8">
          <h2 className="display text-[clamp(1.75rem,1.2rem+2vw,2.9rem)] md:col-span-6">
            Tiga cara ngatur pesanan, tiga konsekuensi yang beda.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-espresso/85 md:col-span-5 md:col-start-8 md:mt-2 md:self-end">
            Nggak ada yang paling benar buat semua orang. Ini biar kelihatan apa
            yang kamu tukar di tiap pilihan, termasuk kalau milih Ordi.
          </p>
        </div>

        {/* Mobile: satu blok per pilihan. Tabel empat kolom selalu kesempitan
            di layar kecil, jadi markup-nya sengaja dipisah. */}
        <div className="mt-10 md:hidden">
          {columns.map((col) => (
            <div
              key={col.key}
              className={`border-t border-espresso/20 py-6 ${
                col.key === "ordi" ? "border-l-2 border-l-coral pl-4" : ""
              }`}
            >
              <h3 className="display text-[1.3rem]">{col.label}</h3>
              <dl className="mt-3">
                {rows.map((row) => (
                  <div key={row.label} className="py-2">
                    <dt className="kicker text-espresso/80">{row.label}</dt>
                    <dd className="mt-0.5 text-[14px] leading-relaxed text-espresso/85">
                      {row[col.key]}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        <div className="mt-10 hidden md:block">
          <div className="grid grid-cols-[132px_repeat(3,1fr)] border-t border-espresso/25">
            <div />
            {columns.map((col) => (
              <div
                key={col.key}
                className={`px-4 py-4 ${
                  col.key === "ordi" ? "bg-espresso/[0.06]" : ""
                }`}
              >
                <p
                  className={`display text-[1.1rem] ${
                    col.key === "ordi" ? "text-coral-deep" : ""
                  }`}
                >
                  {col.label}
                </p>
              </div>
            ))}

            {rows.map((row) => (
              <Fragment key={row.label}>
                <div className="border-t border-espresso/15 px-1 py-4">
                  <span className="kicker text-espresso/80">{row.label}</span>
                </div>
                {columns.map((col) => (
                  <div
                    key={col.key}
                    className={`border-t border-espresso/15 px-4 py-4 text-[14px] leading-relaxed ${
                      col.key === "ordi"
                        ? "bg-espresso/[0.06] font-medium"
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
