import { IconWhatsApp } from "./Icons";
import { DEMO_URL, TRUST_POINTS, waLink } from "../../data/altContent";
import ordiLogo from "../../assets/ordi-logo.png";

const WA_FINAL = waLink(
  "Halo Studio Harel, saya mau cerita cara kerja bisnis saya dan tanya soal Ordi."
);

export default function AltFinalCTA() {
  return (
    <footer id="kontak" className="px-5 pb-10 pt-16 sm:pt-20">
      <div className="mx-auto max-w-5xl">
        <dl className="grid gap-6 border-y border-espresso/12 py-7 sm:grid-cols-3 sm:gap-8">
          {TRUST_POINTS.map((p) => (
            <div key={p.title}>
              <dt className="text-[15px] font-bold">{p.title}</dt>
              <dd className="mt-1 max-w-[32ch] text-[14px] leading-relaxed text-espresso/85">
                {p.body}
              </dd>
            </div>
          ))}
        </dl>

        <div
          className="on-ink mt-12 rounded-3xl bg-bean px-6 py-12 text-cream sm:px-10 sm:py-14"
          style={{ boxShadow: "var(--shadow-lift)" }}
        >
          <div className="md:flex md:items-end md:justify-between md:gap-10">
            <div className="md:max-w-md">
              <h2 className="display text-[clamp(1.8rem,1.3rem+2vw,2.8rem)] text-cream">
                Cerita dulu soal bisnismu.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-cream/85">
                Kita bahas sistem yang paling masuk akal buat kebutuhanmu.
                Nggak harus langsung ambil paket lengkap.
              </p>
            </div>

            <div className="mt-8 shrink-0 md:mt-0">
              <a
                href={WA_FINAL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.gtag?.("event", "klik_wa", { lokasi: "final-cta" })}
                className="press inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-coral pl-6 pr-5 text-[15px] font-bold text-cream hover:bg-coral-deep"
              >
                <IconWhatsApp className="h-[18px] w-[18px]" />
                Chat di WhatsApp
              </a>
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.gtag?.("event", "klik_demo", { lokasi: "final-cta" })}
                className="press mt-4 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-cream underline decoration-cream/35 underline-offset-[6px] hover:decoration-latte"
              >
                Coba demo Ordi
                <span aria-hidden="true">&rarr;</span>
              </a>
              <p className="mt-3 max-w-[22rem] text-[12px] leading-snug text-cream/75">
                ordistore.studioharel.id, demo interaktif dengan data contoh,
                bukan toko asli.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-espresso/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <img src={ordiLogo} alt="Ordi" className="h-5 w-auto" />
            <p className="text-[13px] text-espresso/80">
              Order Disini, dikerjakan Studio Harel.
            </p>
          </div>
          <p className="text-[12px] text-espresso/80">
            &copy; {new Date().getFullYear()} Studio Harel. Dibangun untuk UMKM
            F&amp;B Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
}
