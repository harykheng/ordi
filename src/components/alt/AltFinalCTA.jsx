import Reveal from "../Reveal";
import { IconWhatsApp, IconArrowRight } from "./Icons";
import { DEMO_URL, waLink } from "../../data/altContent";
import ordiLogo from "../../assets/ordi-logo.png";

const WA_FINAL = waLink(
  "Halo Studio Harel, saya mau cerita cara kerja bisnis saya dan tanya soal Ordi."
);

export default function AltFinalCTA() {
  return (
    <footer id="kontak" className="px-5 pb-12 pt-16 sm:pt-20">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-bean px-6 py-12 text-center sm:px-10 sm:py-14">
            <div className="grain-dark absolute inset-0" aria-hidden="true" />
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-espresso/70 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative">
              <h2 className="font-statement text-[1.9rem] text-cream sm:text-4xl">
                Ceritakan dulu cara kerja bisnismu.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-cream/85">
                Kita bahas sistem yang paling masuk akal buat kebutuhanmu.
                Nggak harus langsung ambil paket lengkap.
              </p>

              <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
                <a
                  href={WA_FINAL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    window.gtag?.("event", "klik_wa", { lokasi: "final-cta" })
                  }
                  className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-coral px-7 py-3.5 text-base font-bold text-cream transition-colors hover:bg-coral-deep"
                >
                  <IconWhatsApp className="h-5 w-5" />
                  Chat di WhatsApp
                </a>
                <a
                  href={DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    window.gtag?.("event", "klik_demo", { lokasi: "final-cta" })
                  }
                  className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-cream/40 px-7 py-3.5 text-base font-semibold text-cream transition-colors hover:bg-cream hover:text-bean"
                >
                  Coba Demo Ordi
                  <IconArrowRight className="h-4 w-4" />
                </a>
              </div>

              <p className="mt-4 text-[13px] text-cream/85">
                ordistore.studioharel.id, demo interaktif dengan data contoh,
                bukan toko asli.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 flex flex-col items-center gap-2 border-t border-espresso/10 pt-8 text-center">
          <img src={ordiLogo} alt="Ordi" className="h-6 w-auto" />
          <p className="text-[13px] text-espresso/85">
            Order Disini, website pesan online dari Studio Harel.
          </p>
          <p className="mt-1 text-xs text-espresso/75">
            © {new Date().getFullYear()} Studio Harel. Dibangun untuk UMKM
            F&amp;B Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
}
