import Reveal from "../Reveal";
import { IconCheck, IconWhatsApp } from "./Icons";
import { ALT_PRICING_TIERS, waLink } from "../../data/altContent";

export default function AltPricing() {
  return (
    <section
      id="paket"
      className="border-y border-espresso/10 bg-sand px-5 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow text-coral-deep">Harga</p>
          <h2 className="font-statement mt-3 max-w-2xl text-[1.75rem] text-espresso sm:text-4xl">
            Biaya pembangunan dibayar sekali. Hosting dan maintenance bersifat
            opsional.
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-espresso/85">
            Sistem tetap menjadi milik bisnis kamu. Biaya bulanan hanya
            berlaku kalau kamu ingin kami bantu mengelola server, domain, dan
            perawatannya.
          </p>
        </Reveal>

        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {ALT_PRICING_TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.07} className="min-w-0">
              <div
                className={`flex h-full flex-col rounded-2xl border p-5 sm:p-6 ${
                  tier.highlight
                    ? "border-espresso/25 bg-card shadow-[0_22px_44px_-26px_rgba(45,26,14,0.6)]"
                    : "border-espresso/12 bg-card/70"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-statement text-xl text-espresso">
                    {tier.name}
                  </h3>
                  {tier.highlight && (
                    <span className="shrink-0 rounded-full bg-latte/35 px-2.5 py-1 text-[10px] font-bold text-espresso">
                      Rekomendasi kami
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-espresso/85 md:min-h-11">
                  {tier.tagline}
                </p>

                <div className="mt-5">
                  <p className="text-3xl font-extrabold tracking-tight text-espresso">
                    {tier.price}
                  </p>
                  <p className="mt-0.5 text-[13px] text-espresso/75">
                    {tier.priceNote}
                  </p>
                  <p className="mt-2.5 rounded-lg bg-sand px-3 py-2 text-[12px] leading-snug text-espresso/85">
                    {tier.retainer}
                  </p>
                </div>

                <p className="mt-5 text-[13px] font-semibold text-espresso">
                  {tier.featuresLabel}
                </p>
                <ul className="mt-2.5 mb-6 flex-1 space-y-2">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-mint-deep" />
                      <span className="text-sm leading-snug text-espresso/85">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={waLink(
                    `Halo Studio Harel, saya mau tanya soal paket ${tier.name} buat bisnis saya.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    window.gtag?.("event", "klik_tier", { tier: tier.name })
                  }
                  className={`flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-[15px] font-bold transition-colors ${
                    tier.highlight
                      ? "bg-coral text-cream hover:bg-coral-deep"
                      : "border border-espresso/25 text-espresso hover:bg-espresso hover:text-cream"
                  }`}
                >
                  <IconWhatsApp className="h-4 w-4" />
                  {tier.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-7 max-w-2xl text-center text-[13px] leading-relaxed text-espresso/85">
            Belum yakin paket mana yang pas? Cerita dulu aja soal cara kerja
            bisnismu di WhatsApp, nanti kita cari yang paling masuk akal buat
            kebutuhanmu sekarang.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
