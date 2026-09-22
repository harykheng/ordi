import { SectionHead } from "./Section";
import { IconWhatsApp } from "./Icons";
import { ALT_PRICING_TIERS, PRICING_NOTE } from "../../data/altContent";
import { trackPricing, waHref } from "../../lib/track";

export default function PriceSheet() {
  return (
    <section
      id="paket"
      className="border-y border-espresso/12 bg-sand px-5 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHead
          label="Harga"
          title="Mulai dari yang paling bikin repot sekarang."
          lead="Bayar pembangunan sistem sekali. Tambah fitur waktu bisnis kamu sudah membutuhkannya."
        />

        <ul className="mt-9 grid items-start gap-4 md:grid-cols-3">
          {ALT_PRICING_TIERS.map((tier) => (
            <li
              key={tier.id}
              className={`surface flex h-full flex-col rounded-2xl p-5 ${
                tier.highlight ? "md:-mt-3 md:pb-7 md:pt-7" : ""
              }`}
              style={tier.highlight ? { boxShadow: "var(--shadow-lift)" } : undefined}
            >
              {tier.highlight && (
                <p className="label mb-2 text-coral-deep">Rekomendasi kami</p>
              )}
              <h3 className="display text-[1.35rem]">{tier.name}</h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-espresso/85">
                {tier.tagline}
              </p>

              <p className="display tnum mt-5 text-[1.9rem] leading-none">
                {tier.price}
              </p>
              <p className="mt-1.5 text-[13px] text-espresso/80">sekali bayar</p>

              <p className="mt-5 text-[13px] font-bold">{tier.featuresLabel}</p>
              <ul className="mt-2 flex-1 space-y-1.5">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-[14px] leading-snug text-espresso/85"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      className="mt-1 size-3.5 shrink-0 text-mint-deep"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 10.5 8 14.5 16 6" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={waHref(tier.id)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackPricing(tier.name, tier.id)}
                className={`press mt-6 flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 text-[14px] font-bold ${
                  tier.highlight
                    ? "bg-coral text-cream hover:bg-coral-deep"
                    : "bg-espresso text-cream hover:bg-bean"
                }`}
              >
                <IconWhatsApp className="h-4 w-4" />
                {tier.cta}
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-7 max-w-2xl text-[14px] leading-relaxed text-espresso/85">
          {PRICING_NOTE}
        </p>
      </div>
    </section>
  );
}
