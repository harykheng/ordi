import { DEMO_URL } from "../data/content";

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-char/60 bg-ink/85 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-5 py-3 flex items-center justify-between">
        <div className="leading-tight">
          <span className="font-display font-black text-2xl tracking-tight text-paper">
            Ordi
          </span>
          <p className="hidden sm:block text-[11px] font-mono-label text-paper/50 mt-0.5">
            Order Disini — sistem pesan-antar dari Studio Harel
          </p>
        </div>
        <a
          href={DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full border border-ember/50 px-4 py-2 text-sm font-semibold text-ember hover:bg-ember hover:text-ink transition-colors"
        >
          Coba Ordi Langsung
        </a>
      </div>
    </header>
  );
}
