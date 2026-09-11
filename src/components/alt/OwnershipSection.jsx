import Reveal from "../Reveal";
import { IconCheck } from "./Icons";
import { OWNERSHIP_POINTS } from "../../data/altContent";

export default function OwnershipSection() {
  return (
    <section id="kepemilikan" className="px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <Reveal>
            <p className="eyebrow text-coral-deep">Kepemilikan</p>
            <h2 className="font-statement mt-3 text-[1.75rem] text-espresso sm:text-4xl">
              Sistemnya dibuat untuk bisnismu. Bukan dipinjam dari platform
              orang lain.
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-espresso/85">
              Ini bagian yang paling beda dari sewa platform: yang kamu bayar
              itu pembangunan sistemnya, bukan hak pakai bulanan.
            </p>
          </Reveal>

          <div className="grid gap-3">
            {OWNERSHIP_POINTS.map((point, i) => (
              <Reveal key={point.title} delay={i * 0.06} className="min-w-0">
                <div className="flex gap-3 rounded-2xl border border-espresso/12 bg-card p-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mint">
                    <IconCheck className="h-3.5 w-3.5 text-mint-deep" />
                  </span>
                  <div>
                    <p className="font-bold text-espresso">{point.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-espresso/85">
                      {point.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.3}>
              <p className="rounded-2xl bg-sand px-4 py-3.5 text-sm leading-relaxed text-espresso/85">
                <strong className="font-bold text-espresso">
                  Jujurnya:
                </strong>{" "}
                biaya setelah pembelian nggak otomatis nol. Domain dan hosting
                tetap ada biayanya, entah kamu urus sendiri atau kami yang
                bantu jagain lewat paket bulanan opsional.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
