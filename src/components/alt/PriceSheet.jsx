import { Rule } from "./Paper";
import { IconWhatsApp } from "./Icons";
import { ALT_PRICING_TIERS, waLink } from "../../data/altContent";

// Daftar harga ala lembar cetak: baris bergaris rambut, angka besar
// menggantung di kolomnya sendiri. Bukan tiga kartu seragam.
export default function PriceSheet() {
  return (
    <section
      id="paket"
      className="border-y border-espresso/15 bg-sand px-5 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <Rule n="08" label="Harga" className="mb-8" />

        <div className="md:grid md:grid-cols-12 md:gap-8">
          <h2 className="display text-[clamp(1.75rem,1.2rem+2vw,2.9rem)] md:col-span-7">
            Biaya pembangunan dibayar sekali. Hosting dan maintenance opsional.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-espresso/85 md:col-span-4 md:col-start-9 md:mt-2 md:self-end">
            Sistem tetap jadi milik bisnis kamu. Biaya bulanan cuma berlaku
            kalau kamu mau kami yang bantu jagain server, domain, dan
            perawatannya.
          </p>
        </div>

        <ol className="mt-12 border-t border-espresso/25">
          {ALT_PRICING_TIERS.map((tier) => (
            <li
              key={tier.name}
              className={`grid gap-x-8 gap-y-5 border-b border-espresso/20 py-8 md:grid-cols-12 ${
                tier.highlight ? "border-l-2 border-l-coral pl-4 md:pl-5" : ""
              }`}
            >
              <div className="md:col-span-4">
                {tier.highlight && (
                  <p className="kicker mb-1.5 text-coral-deep">
                    Rekomendasi kami
                  </p>
                )}
                <h3 className="display text-[1.6rem]">{tier.name}</h3>
                <p className="mt-1.5 max-w-[28ch] text-[14px] leading-relaxed text-espresso/85">
                  {tier.tagline}
                </p>
              </div>

              <div className="md:col-span-3">
                <p className="display tnum text-[clamp(1.8rem,1.4rem+1.2vw,2.4rem)] leading-none">
                  {tier.price}
                </p>
                <p className="kicker mt-2 text-espresso/80">
                  {tier.priceNote}
                </p>
                <p className="mt-3 max-w-[24ch] text-[12px] leading-snug text-espresso/80">
                  {tier.retainer}
                </p>
              </div>

              <div className="md:col-span-5">
                <p className="text-[13px] font-bold">{tier.featuresLabel}</p>
                <ul className="mt-1.5 text-[14px] leading-relaxed text-espresso/85">
                  {tier.features.map((f, i) => (
                    <li key={f} className="inline">
                      {i > 0 && (
                        <span aria-hidden="true" className="text-espresso/40">
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
                  onClick={() =>
                    window.gtag?.("event", "klik_tier", { tier: tier.name })
                  }
                  className={`press mt-5 inline-flex min-h-11 items-center gap-2 rounded-[3px] px-4 text-[14px] font-bold ${
                    tier.highlight
                      ? "bg-coral text-cream hover:bg-coral-deep"
                      : "border border-espresso/30 hover:bg-cream"
                  }`}
                >
                  <IconWhatsApp className="h-4 w-4" />
                  {tier.cta}
                </a>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-7 max-w-xl text-[14px] italic leading-relaxed text-espresso/85">
          Belum yakin paket mana yang pas? Cerita dulu aja soal cara kerja
          bisnismu, nanti kita cari yang paling masuk akal buat kebutuhanmu
          sekarang.
        </p>
      </div>
    </section>
  );
}
