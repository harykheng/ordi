import { useEffect, useState } from "react";
import { IconWhatsApp } from "./Icons";
import { waLink } from "../../data/altContent";

const WA_STICKY = waLink(
  "Halo Studio Harel, saya mau cerita soal bisnis saya buat Ordi."
);

// Mobile-only. Muncul setelah user lewat hero, dan otomatis ngumpet lagi
// pas footer CTA keliatan (biar nggak numpuk dua tombol yang sama) atau
// pas cookie notice masih kebuka (biar nggak nutupin).
export default function StickyMobileCTA({ hidden = false }) {
  const [pastHero, setPastHero] = useState(false);
  const [atFooter, setAtFooter] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const footer = document.getElementById("kontak");
    if (!footer) return;
    const io = new IntersectionObserver(
      ([entry]) => setAtFooter(entry.isIntersecting),
      { rootMargin: "-20% 0px 0px 0px" }
    );
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  const show = pastHero && !atFooter && !hidden;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-espresso/10 bg-cream/95 px-4 pt-3 backdrop-blur-md transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      aria-hidden={!show}
    >
      <a
        href={WA_STICKY}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={show ? 0 : -1}
        onClick={() =>
          window.gtag?.("event", "klik_wa", { lokasi: "sticky-mobile" })
        }
        className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-coral px-4 py-3 text-sm font-bold text-cream min-[380px]:text-[15px]"
      >
        <IconWhatsApp className="h-5 w-5" />
        Ceritakan Bisnismu di WhatsApp
      </a>
    </div>
  );
}
