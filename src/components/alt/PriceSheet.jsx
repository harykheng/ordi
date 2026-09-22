import { SectionHead } from "./Section";
import { IconWhatsApp } from "./Icons";
import { ALT_PRICING_TIERS, waLink } from "../../data/altContent";

export default function PriceSheet() {
  return (
    <section id="paket" className="px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHead
          label="Harga"
          title="Bayar sekali buat pembangunan sistemnya."
          lead="Hosting sama maintenance bulanannya opsional, cuma kalau kamu mau kami yang urus server sama domainnya."
        />

        <div className="mt-9">
          {ALT_PRICING_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`grid gap-x-8 gap-y-4 border-t border-espresso/12 py-7 md:grid-cols-12 ${
                tier.highlight ? "md:items-start" : ""
              }`}
            >
              <div className="md:col-span-4">
                {tier.highlight && (
                  <p className="label mb-1.5 text-coral-deep">Rekomendasi kami</p>
                )}
                <h3 className="display text-[1.45rem]">{tier.name}</h3>
                <p className="mt-1.5 max-w-[30ch] text-[14px] leading-relaxed text-espresso/85">
                  {tier.tagline}
                </p>
              </div>

              <div className="md:col-span-3">
                <p className="display tnum text-[clamp(1.7rem,1.4rem+1vw,2.2rem)] leading-none">
                  {tier.price}
                </p>
                <p className="mt-1.5 text-[13px] text-espresso/80">
                  sekali bayar
                </p>
                <p className="mt-2.5 max-w-[26ch] text-[12px] leading-snug text-espresso/80">
                  {tier.retainer}
                </p>
              </div>

              <div className="md:col-span-5">
                <p className="text-[13px] font-bold">{tier.featuresLabel}</p>
                <ul className="mt-1.5 text-[14px] leading-relaxed text-espresso/85">
                  {tier.features.map((f, i) => (
                    <li key={f} className="inline">
                      {i > 0 && (
                        <span aria-hidden="true" className="text-espresso/80">
                          {" · "}
                        </span>
                      )}
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={waLink(
                    `Halo Studio Harel, saya mau tanya soal paket ${tier.name} buat bisnis saya.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => window.gtag?.("event", "klik_tier", { tier: tier.name })}
                  className={`press mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl pl-4 pr-3.5 text-[14px] font-bold ${
                    tier.highlight
                      ? "bg-coral text-cream hover:bg-coral-deep"
                      : "surface surface-hover text-espresso"
                  }`}
                >
                  <IconWhatsApp className="h-4 w-4" />
                  {tier.cta}
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-xl text-[14px] leading-relaxed text-espresso/85">
          Belum yakin paket mana yang pas? Cerita dulu aja soal cara kerja
          bisnismu, nanti kita cari yang paling masuk akal buat sekarang.
        </p>
      </div>
    </section>
  );
}
