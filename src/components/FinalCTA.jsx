import Reveal from "./Reveal";
import { DEMO_URL, WHATSAPP_CTA_LINK } from "../data/content";

export default function FinalCTA() {
  return (
    <footer className="px-5 py-20 sm:py-28 border-t border-char/60 text-center">
      <div className="mx-auto max-w-xl">
        <Reveal>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-paper mb-4">
            Bisnis kamu, sistem kamu.
          </h2>
          <p className="text-paper/60 mb-9 leading-relaxed">
            Nggak ada form pendaftaran di sini. Ceritain dulu gimana
            bisnismu jalan sehari-hari — kita bahas sistem yang cocok,
            bukan yang generik.
          </p>
          <a
            href={WHATSAPP_CTA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-ember px-8 py-4 font-semibold text-ink hover:bg-ember/90 transition-colors"
          >
            Chat, Kita Bahas Sistem Kamu
          </a>
          <div className="mt-6">
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-paper/50 underline underline-offset-4 hover:text-paper/80"
            >
              atau coba Ordi langsung dulu
            </a>
            <p className="font-mono-label text-[11px] text-paper/30 mt-1">
              Demo interaktif — data contoh, bukan toko asli
            </p>
          </div>
        </Reveal>

        <div className="mt-20 pt-8 border-t border-char/60">
          <p className="font-display font-bold text-lg text-paper">Ordi</p>
          <p className="font-mono-label text-[11px] text-paper/40 mt-1">
            Order Disini — sistem pesan-antar dari Studio Harel
          </p>
          <p className="text-xs text-paper/30 mt-4">
            © {new Date().getFullYear()} Studio Harel. Dibangun untuk UMKM
            F&B Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
}
