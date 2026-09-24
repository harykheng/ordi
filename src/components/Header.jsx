import { DEMO_URL } from "../data/content";
import ordiLogo from "../assets/ordi-logo.png";

const NAV = [
  ["Fitur", "#pelanggan"],
  ["Harga", "#harga"],
  ["Tanya", "#tanya"],
];

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b-2 border-ink bg-paper/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-5 py-3 flex items-center justify-between gap-4">
        <a href="#top" className="min-w-0 leading-tight" aria-label="Ordi, kembali ke atas">
          <img src={ordiLogo} alt="Ordi" className="h-7 sm:h-8 w-auto" />
          <span className="block text-[10px] sm:text-[11px] font-mono-label text-ink-2 mt-1.5">
            Order Disini, dari Studio Harel
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold" aria-label="Navigasi halaman">
          {NAV.map(([label, href]) => (
            <a key={href} href={href} className="py-2 hover:text-ember-deep transition-colors">
              {label}
            </a>
          ))}
        </nav>
        <a
          href={DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => window.gtag?.("event", "klik_demo", { lokasi: "header" })}
          className="animated-border-btn btn btn-secondary btn-sm shrink-0"
        >
          Coba Demo
        </a>
      </div>
    </header>
  );
}
