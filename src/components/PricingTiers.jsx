import Reveal from "./Reveal";
import { Sparkle } from "./Doodles";
import { PRICING_TIERS, WHATSAPP_CTA_LINK } from "../data/content";

export default function PricingTiers() {
  return (
    <section className="relative px-5 py-16 sm:py-24 border-t-2 border-ink/10">
      <Sparkle className="absolute top-10 left-[8%] hidden sm:block" />
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="inline-block rounded-full bg-yellow border-2 border-ink px-3 py-1 mb-4 font-mono-label text-xs text-ink">
            Mulai dari mana aja
          </span>
          <h2 className="font-display font-bold text-3xl text-ink mb-3">
            Nggak harus beli lengkap dari awal
          </h2>
          <p className="text-ink/60 max-w-xl mb-10">
            Pilih yang paling kepake sekarang. Upgrade belakangan kalau
            emang butuh — bayar selisihnya aja, bukan beli ulang dari nol.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          {PRICING_TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08} className="min-w-0">
              <div
                className={`relative h-full rounded-2xl border-2 border-ink p-6 flex flex-col ${
                  tier.highlight
                    ? "bg-ember/[0.08] shadow-[4px_4px_0_0_var(--color-ink)]"
                    : "bg-paper-2"
                }`}
              >
                {tier.highlight && (
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-ember border-2 border-ink px-4 py-1.5 font-mono-label text-[11px] text-ink">
                    Paling banyak dipilih
                  </span>
                )}
                <h3 className="font-display font-extrabold text-xl text-ink mb-1">
                  {tier.name}
                </h3>
                <p className="text-ink/50 text-sm mb-5">{tier.tagline}</p>

                <div className="mb-6">
                  <span className="font-display font-extrabold text-3xl text-ember-deep break-words">
                    {tier.price}
                  </span>
                  <span className="text-ink/40 text-sm ml-1">
                    {tier.priceNote}
                  </span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="text-sm text-ink/75 leading-relaxed flex gap-2"
                    >
                      <span className="text-ember-deep mt-0.5">＋</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <p className="font-mono-label text-[11px] text-ink/40 mb-5">
                  {tier.retainer}
                </p>

                <a
                  href={WHATSAPP_CTA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    window.gtag?.("event", "klik_tier", { tier: tier.name })
                  }
                  className={`text-center rounded-full px-5 py-3 font-semibold text-sm transition-colors ${
                    tier.highlight
                      ? "bg-ink text-paper hover:bg-ink/85"
                      : "border-2 border-ink text-ink hover:bg-ink hover:text-paper"
                  }`}
                >
                  Tanya soal {tier.name}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-10 rounded-2xl border-2 border-ink bg-yellow/15 px-6 py-5 max-w-2xl mx-auto text-center">
            <p className="font-mono-label text-[11px] text-ink/50 mb-2">
              Bandingin sama sewa platform
            </p>
            <p className="text-ink/80 text-sm leading-relaxed">
              Sewa platform lain: <strong>Rp300.000/bulan</strong> —{" "}
              <strong>Rp3.600.000/tahun</strong>, terus-menerus, nggak pernah
              berhenti selama masih pakai.
              <br />
              Ordi: sekali bayar, <strong>permanen</strong>. Tier Dasar balik
              modal dibanding sewa cuma dalam ±8 bulan — setelah itu, sewa
              terus jalan sementara Ordi udah lunas dari awal.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="text-center text-ink/40 text-xs mt-8 max-w-lg mx-auto">
            Ngobrol dulu di WhatsApp buat tau paket mana yang paling cocok
            sama bisnis kamu.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
