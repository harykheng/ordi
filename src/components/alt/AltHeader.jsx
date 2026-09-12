import { useEffect, useState } from "react";
import { IconWhatsApp } from "./Icons";
import { waLink } from "../../data/altContent";
import ordiLogo from "../../assets/ordi-logo.png";

const NAV = [
  { label: "Cara kerja", href: "#cara-kerja" },
  { label: "Paket", href: "#paket" },
];

const WA_HEADER = waLink(
  "Halo Studio Harel, saya mau tanya soal Ordi buat bisnis saya."
);

export default function AltHeader() {
  // Garis bawahnya baru ditarik setelah halaman digulung, jadi kepala
  // halaman terasa nempel di kertas, bukan bar melayang.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-cream/95 backdrop-blur-[2px] transition-colors ${
        scrolled ? "border-b border-espresso/20" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-2.5">
        <a href="#top" className="-my-2.5 flex min-w-0 items-baseline gap-2.5 py-2.5">
          <img src={ordiLogo} alt="Ordi" className="h-5 w-auto sm:h-[22px]" />
          <span className="truncate text-[11px] italic text-espresso/80">
            oleh Studio Harel
          </span>
        </a>

        <nav className="ml-auto hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="py-1.5 text-[14px] font-medium underline decoration-transparent underline-offset-[6px] transition hover:decoration-coral"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={WA_HEADER}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => window.gtag?.("event", "klik_wa", { lokasi: "header" })}
          className="press ml-auto inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-[3px] bg-coral px-3.5 text-[13px] font-bold text-cream hover:bg-coral-deep md:ml-3"
        >
          <IconWhatsApp className="h-4 w-4" />
          <span className="hidden sm:inline">Konsultasi WhatsApp</span>
          <span className="sm:hidden">WhatsApp</span>
        </a>
      </div>
    </header>
  );
}
