import { useEffect, useState } from "react";
import { IconWhatsApp } from "./Icons";
import { trackWa, waHref } from "../../lib/track";

const WA_STICKY = waHref("sticky");

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
    // Jangan nutupin CTA penutup, dan jangan nutupin simulasi yang lagi
    // dimainkan di hero.
    const targets = ["kontak", "top"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!targets.length) return;
    const visible = new Set();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) =>
          e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)
        );
        setAtFooter(visible.size > 0);
      },
      { rootMargin: "-20% 0px 0px 0px" }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  const show = pastHero && !atFooter && !hidden;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-espresso/12 bg-cream/97 px-4 pt-3 backdrop-blur-[2px] transition-transform duration-300 md:hidden ${
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
        onClick={() => trackWa("sticky")}
        className="press flex min-h-12 items-center justify-center gap-2 rounded-xl bg-coral px-4 py-3 text-sm font-bold text-cream min-[380px]:text-[15px]"
      >
        <IconWhatsApp className="h-5 w-5" />
        Tanya Ordi di WhatsApp
      </a>
    </div>
  );
}
