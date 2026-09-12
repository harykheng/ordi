import { Rule, TornEdge } from "./Paper";
import { IconWhatsApp } from "./Icons";
import { DEMO_URL, TRUST_POINTS, waLink } from "../../data/altContent";
import ordiLogo from "../../assets/ordi-logo.png";

const WA_FINAL = waLink(
  "Halo Studio Harel, saya mau cerita cara kerja bisnis saya dan tanya soal Ordi."
);

export default function AltFinalCTA() {
  return (
    <footer id="kontak" className="px-5 pb-10 pt-16 sm:pt-24">
      <div className="mx-auto max-w-6xl">
        {/* kolofon tiga bagian, dipisah garis, bukan tiga kartu */}
        <div className="grid gap-6 border-y border-espresso/20 py-7 md:grid-cols-3 md:gap-0">
          {TRUST_POINTS.map((p, i) => (
            <div
              key={p.title}
              className={
                i > 0 ? "md:border-l md:border-espresso/20 md:pl-7" : "md:pr-7"
              }
            >
              <p className="kicker text-coral-deep">{p.title}</p>
              <p className="mt-1.5 max-w-[30ch] text-[14px] leading-relaxed text-espresso/85">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        <div className="on-ink relative mt-12 overflow-hidden bg-bean px-6 py-14 text-cream sm:px-10 sm:py-16">
          <TornEdge side="top" />
          <TornEdge side="bottom" />

          <div className="relative md:grid md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <Rule n="11" label="Mulai dari sini" tone="cream" className="mb-7" />
              <h2 className="display text-[clamp(1.9rem,1.3rem+2.2vw,3.2rem)] text-cream">
                Ceritakan dulu cara kerja bisnismu.
              </h2>
              <p className="standfirst mt-5 max-w-md text-cream/85">
                Kita bahas sistem yang paling masuk akal buat kebutuhanmu.
                Nggak harus langsung ambil paket lengkap.
              </p>
            </div>

            <div className="mt-9 md:col-span-4 md:col-start-9 md:mt-0 md:self-end">
              <a
                href={WA_FINAL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  window.gtag?.("event", "klik_wa", { lokasi: "final-cta" })
                }
                className="press inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[3px] bg-coral px-6 text-[15px] font-bold text-cream hover:bg-coral-deep"
              >
                <IconWhatsApp className="h-[18px] w-[18px]" />
                Chat di WhatsApp
              </a>
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  window.gtag?.("event", "klik_demo", { lokasi: "final-cta" })
                }
                className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-cream underline decoration-cream/40 underline-offset-[6px] hover:decoration-latte"
              >
                Coba demo Ordi
                <span aria-hidden="true">&rarr;</span>
              </a>
              <p className="mt-3 text-[12px] leading-snug text-cream/75">
                ordistore.studioharel.id, demo interaktif dengan data contoh,
                bukan toko asli.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-espresso/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
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
