import Reveal from "./Reveal";
import { DEMO_URL, WHATSAPP_CTA_LINK } from "../data/content";
import { Star } from "./Doodles";
import ordiLogo from "../assets/ordi-logo.png";

export default function FinalCTA() {
  return (
    <footer className="relative px-5 py-20 sm:py-28 border-t-2 border-ink/10 text-center overflow-hidden">
      <Star className="absolute top-10 left-[8%] hidden sm:block text-teal" />
      <div className="mx-auto max-w-xl">
        <Reveal>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink mb-4">
            Bisnis kamu, sistem kamu.
          </h2>
          <p className="text-ink/60 mb-9 leading-relaxed">
            Nggak ada form pendaftaran di sini. Ceritain dulu gimana
            bisnismu jalan sehari-hari — kita bahas sistem yang cocok,
            bukan yang generik.
          </p>
          <a
            href={WHATSAPP_CTA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => window.umami?.track("klik-wa", { lokasi: "final-cta" })}
            className="inline-block rounded-full bg-ember px-8 py-4 font-semibold text-ink border-2 border-ink shadow-[4px_4px_0_0_var(--color-ink)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            Chat, Kita Bahas Sistem Kamu
          </a>
          <div className="mt-6">
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => window.umami?.track("klik-demo", { lokasi: "final-cta" })}
              className="text-sm text-ink/50 underline underline-offset-4 hover:text-ink/80"
            >
              atau coba Ordi langsung dulu
            </a>
            <p className="font-mono-label text-[11px] text-ink/35 mt-1">
              Demo interaktif — data contoh, bukan toko asli
            </p>
          </div>
        </Reveal>

        <div className="mt-20 pt-8 border-t-2 border-ink/10">
          <img src={ordiLogo} alt="Ordi" className="h-7 w-auto mx-auto" />
          <p className="font-mono-label text-[11px] text-ink/40 mt-1">
            Order Disini — sistem pesan-antar dari Studio Harel
          </p>
          <p className="text-xs text-ink/30 mt-4">
            © {new Date().getFullYear()} Studio Harel. Dibangun untuk UMKM
            F&B Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
}
