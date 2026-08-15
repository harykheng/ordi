import { DEMO_URL } from "../data/content";

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b-2 border-ink bg-paper/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-5 py-3 flex items-center justify-between">
        <div className="leading-tight">
          <div className="flex items-start gap-1.5">
            <span className="font-display font-extrabold text-2xl tracking-tight text-ink">
              Ordi
            </span>
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-ember" />
          </div>
          <p className="text-[9px] sm:text-[11px] font-mono-label text-ink/45 mt-0.5">
            Order Disini — dari Studio Harel
          </p>
        </div>
        <a
          href={DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full border-2 border-ink px-4 py-2 text-sm font-semibold text-ink hover:bg-ink hover:text-paper transition-colors"
        >
          Coba Ordi Langsung
        </a>
      </div>
    </header>
  );
}
