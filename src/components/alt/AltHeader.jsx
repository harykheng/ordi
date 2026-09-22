import { useEffect, useState } from "react";
import { DEMO_URL } from "../../data/altContent";
import { trackDemo } from "../../lib/track";

const NAV = [
  { label: "Cara kerja", href: "#saat" },
  { label: "Harga", href: "#paket" },
];

export default function AltHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 ${
        scrolled ? "bg-cream/80 backdrop-blur-md" : "bg-cream"
      }`}
      style={{
        boxShadow: scrolled ? "0 1px 0 0 rgba(0,0,0,0.07)" : "none",
        transitionProperty: "box-shadow, background-color",
        transitionDuration: "200ms",
      }}
    >
      <div className="mx-auto flex max-w-5xl items-center gap-4 px-5 py-2.5">
        <a
          href="#top"
          className="-my-3 flex min-h-11 min-w-0 items-center gap-2.5 py-3"
        >
          <span className="display text-[1.25rem] leading-none tracking-tight">
            Ordi
          </span>
          <span className="truncate text-[11px] text-espresso/80">
            oleh Studio Harel
          </span>
        </a>

        <nav className="ml-auto hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="press inline-flex min-h-11 items-center text-[14px] font-medium text-espresso/85 hover:text-espresso"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackDemo("header")}
          className="press ml-auto inline-flex min-h-11 shrink-0 items-center rounded-lg bg-coral px-4 text-[13px] font-bold text-cream hover:bg-coral-deep md:ml-3"
        >
          <span className="hidden sm:inline">Coba demonya</span>
          <span className="sm:hidden">Coba demo</span>
        </a>
      </div>
    </header>
  );
}
