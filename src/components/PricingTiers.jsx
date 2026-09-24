import Reveal from "./Reveal";
import { INCLUDED_IN_ALL, PRICING_TIERS, RENT_COMPARISON, WHATSAPP_CTA_LINK } from "../data/content";
import { rp } from "../lib/format";

const RENT_MONTHS = 9;

function CostReceipts() {
  const { rentPerMonth, ordiBase } = RENT_COMPARISON;
  return (
    <div className="flex flex-wrap items-start justify-center gap-7 sm:gap-10">
      <div className="receipt w-[250px] max-w-full -rotate-1 overflow-hidden px-4 pt-4 text-[11.5px] leading-relaxed after:hidden">
        <p className="text-xs font-semibold uppercase tracking-[0.08em]">Sewa platform</p>
        <p className="text-[11px] text-ink-2">kayak sewa lapak, bayar tiap bulan</p>
        <div className="receipt-rule my-2" />
        {Array.from({ length: RENT_MONTHS }, (_, i) => (
          <div key={i} className="flex items-baseline gap-1.5">
            <span>Bulan {i + 1}</span>
            <i className="leader" />
            <b className="font-semibold">{rp(rentPerMonth)}</b>
          </div>
        ))}
        <div className="relative -mt-12 h-16 bg-linear-to-b from-transparent to-card to-70%" />
        <p className="pen relative -mt-5 pb-4 text-center text-base leading-tight">terus jalan selama masih dipakai</p>
      </div>
      <div className="receipt w-[250px] max-w-full rotate-[1.5deg] px-4 pt-4 pb-3 text-[11.5px] leading-relaxed">
        <p className="text-xs font-semibold uppercase tracking-[0.08em]">Ordi Dasar</p>
        <p className="text-[11px] text-ink-2">kayak punya ruko, sekali bayar</p>
        <div className="receipt-rule my-2" />
        <div className="flex items-baseline gap-1.5">
          <span>Bangun sistem</span>
          <i className="leader" />
          <b className="font-semibold">{rp(ordiBase)}</b>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span>Perawatan</span>
          <i className="leader" />
          <b className="font-semibold">opsional</b>
        </div>
        <div className="receipt-rule my-2" />
        <div className="flex items-baseline gap-1.5">
          <span>Sisa tagihan</span>
          <i className="leader" />
          <b className="font-semibold">Rp0</b>
        </div>
        <div className="h-16" />
        <span className="stamp absolute bottom-4 right-4 text-lg">LUNAS</span>
      </div>
    </div>
  );
}

export default function PricingTiers() {
  return (
    <section id="harga" className="tear-top scroll-mt-20 bg-meja px-5 pt-24 pb-20 sm:pb-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono-label text-xs uppercase tracking-[0.08em] text-ink-2">Harga</p>
          <h2 className="font-headline mt-3 text-[clamp(1.9rem,3.8vw,2.8rem)] leading-[1.08] text-balance">
            Nggak harus beli <mark className="mark-hl">lengkap dari awal</mark>
          </h2>
          <p className="mt-4 max-w-xl text-ink-2 sm:text-lg">
            Pilih yang paling kepake sekarang. Upgrade belakangan kalau emang butuh, tinggal bayar selisih
            harganya.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-3 md:gap-5">
          {PRICING_TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08} className="flex min-w-0 flex-col">
              {tier.highlight && (
                <div className="awning-wrap relative z-10 -mx-1.5 -mb-3" aria-hidden="true">
                  <div className="awning h-10" />
                </div>
              )}
              <div
                className={`card-ink relative flex flex-1 flex-col p-6 ${tier.highlight ? "pt-8" : ""}`}
              >
                {tier.ribbon && (
                  <span className="mb-3 self-start rounded-lg border-2 border-ink bg-highlight px-2.5 py-1 font-mono-label text-[11px] font-semibold">
                    {tier.ribbon}
                  </span>
                )}
                <h3 className="font-headline text-2xl leading-tight">{tier.name}</h3>
                <p className="mt-1.5 text-sm text-ink-2">{tier.tagline}</p>
                <p className="mt-5">
                  <span className="font-headline text-[1.9rem] leading-none text-ember-deep">{tier.price}</span>
                  <span className="ml-1.5 text-sm text-ink-2">{tier.priceNote}</span>
                </p>
                <ul className="mt-6 mb-8 grid grid-cols-1 flex-1 content-start gap-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm leading-relaxed">
                      <span className="pen font-bold" aria-hidden="true">
                        +
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <p className="mb-5 font-mono-label text-[11px] text-ink-2">{tier.retainer}</p>
                <a
                  href={WHATSAPP_CTA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => window.gtag?.("event", "klik_tier", { tier: tier.name })}
                  className={`btn text-sm ${tier.highlight ? "btn-primary" : "btn-secondary"}`}
                >
                  Tanya soal {tier.name}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 rounded-2xl border-2 border-dashed border-ink bg-card p-6 sm:p-8">
            <h3 className="font-headline text-2xl leading-tight">Semua paket sudah termasuk</h3>
            <p className="mt-2 text-sm text-ink-2">Ordi Dasar juga. Bedanya cuma di cara antar dan cara bayar.</p>
            <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {INCLUDED_IN_ALL.map((f) => (
                <li key={f} className="flex gap-2.5 text-[15px] leading-snug">
                  <span className="pen text-lg font-bold leading-none" aria-hidden="true">
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <Reveal>
            <h3 className="font-headline text-[clamp(1.6rem,3vw,2.1rem)] leading-tight">Sewa lapak atau punya ruko sendiri?</h3>
            <p className="mt-4 max-w-[48ch] leading-relaxed text-ink-2">
              Sewa platform lain: <strong className="text-ink">Rp300.000/bulan</strong>,{" "}
              <strong className="text-ink">Rp3.600.000/tahun</strong>, terus-menerus, nggak pernah berhenti selama
              masih pakai. Ordi: sekali bayar, <strong className="text-ink">permanen</strong>. {RENT_COMPARISON.breakEvenNote}
            </p>
            <p className="mt-4 text-sm text-ink-2">Ngobrol dulu di WhatsApp buat tau paket mana yang paling cocok sama bisnis kamu.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <CostReceipts />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
