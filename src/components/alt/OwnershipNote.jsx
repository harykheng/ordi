import { Rule, Stamp, TornEdge } from "./Paper";
import { OWNERSHIP_POINTS } from "../../data/altContent";

// Satu blok tinta pekat, tepinya sobek, bukan pita full-bleed rapi.
// Isinya pernyataan, bukan empat kartu.
export default function OwnershipNote() {
  return (
    <section id="kepemilikan" className="px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="on-ink relative overflow-hidden bg-bean px-6 py-14 text-cream sm:px-10 sm:py-16">
          <TornEdge side="top" />
          <TornEdge side="bottom" />

          <div className="relative">
            <Rule n="07" label="Kepemilikan" tone="cream" className="mb-8" />

            <div className="md:grid md:grid-cols-12 md:gap-10">
              <div className="md:col-span-7">
                <h2 className="display text-[clamp(1.75rem,1.2rem+2vw,3rem)] text-cream">
                  Sistemnya dibuat untuk bisnismu. Bukan dipinjam dari platform
                  orang lain.
                </h2>
                <p className="standfirst mt-6 max-w-lg text-cream/85">
                  Yang kamu bayar itu pembangunan sistemnya, bukan hak pakai
                  bulanan. Setelah lunas, dia nggak berhenti jalan cuma karena
                  kamu berhenti langganan.
                </p>

                <Stamp className="mt-8 text-latte" rotate={-6}>
                  atas nama bisnismu
                </Stamp>
              </div>

              <dl className="mt-10 md:col-span-5 md:mt-0">
                {OWNERSHIP_POINTS.map((p) => (
                  <div
                    key={p.title}
                    className="border-t border-cream/20 py-4 last:pb-0"
                  >
                    <dt className="text-[15px] font-bold text-cream">
                      {p.title}
                    </dt>
                    <dd className="mt-1 text-[14px] leading-relaxed text-cream/85">
                      {p.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <p className="mt-10 max-w-2xl border-l-2 border-latte pl-4 text-[14px] italic leading-relaxed text-cream/85">
              Jujurnya: biaya setelah pembelian nggak otomatis nol. Domain dan
              hosting tetap ada biayanya, entah kamu urus sendiri atau kami yang
              bantu jagain lewat paket bulanan opsional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
