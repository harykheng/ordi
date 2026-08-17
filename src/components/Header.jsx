import { DEMO_URL } from "../data/content";
import ordiLogo from "../assets/ordi-logo.png";

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b-2 border-ink bg-paper/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-5 py-3 flex items-center justify-between">
        <div className="leading-tight">
          <img
            src={ordiLogo}
            alt="Ordi"
            className="h-8 w-auto"
            style={{ marginBottom: "7px" }}
          />
          <p className="text-[9px] sm:text-[11px] font-mono-label text-ink/45 mt-0.5">
            Order Disini, dari Studio Harel
          </p>
        </div>
        <a
          href={DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="animated-border-btn shrink-0 rounded-full border-2 border-ink px-4 py-2 text-sm font-semibold text-ink hover:bg-ink hover:text-paper transition-colors"
        >
          Coba Ordi Langsung
        </a>
      </div>
    </header>
  );
}
