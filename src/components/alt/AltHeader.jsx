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
  // Navbar mulai transparan di atas hero yang gelap, lalu berubah jadi
  // permukaan cream begitu user scroll. Satu state, nggak pakai observer.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-espresso/10 bg-cream/95 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-3">
        <a href="#top" className="-my-2 flex min-w-0 items-center gap-2.5 py-2">
          <img
            src={ordiLogo}
            alt="Ordi"
            className={`h-6 w-auto sm:h-7 ${scrolled ? "" : "logo-on-dark"}`}
          />
          <span
            className={`truncate text-[10px] sm:text-[11px] ${
              scrolled ? "text-espresso/75" : "text-cream/75"
            }`}
          >
            oleh Studio Harel
          </span>
        </a>

        <nav className="ml-auto hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                scrolled
                  ? "text-espresso/85 hover:text-espresso"
                  : "text-cream/85 hover:text-cream"
              }`}
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
          className="ml-auto flex min-h-11 shrink-0 items-center gap-1.5 rounded-full bg-coral px-3.5 py-2 text-[13px] font-semibold text-cream transition-colors hover:bg-coral-deep sm:px-4 md:ml-2"
        >
          <IconWhatsApp className="h-4 w-4" />
          <span className="hidden sm:inline">Konsultasi WhatsApp</span>
          <span className="sm:hidden">WhatsApp</span>
        </a>
      </div>
    </header>
  );
}
