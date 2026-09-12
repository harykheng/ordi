import { Rule, Stamp } from "./Paper";
import { FEATURES } from "../../data/altContent";

// Daftar spesifikasi ala halaman katalog cetak: garis rambut, nomor
// gantung, nggak ada kotak kartu. Satu-satunya visual di section ini
// adalah struk QRIS yang nempel di baris klaimnya sendiri.
function QrisSlip() {
  return (
    <div className="ink-shadow relative mt-4 max-w-xs rotate-[-0.8deg] border border-espresso/20 bg-card p-4">
      <div className="flex items-start gap-3">
        <svg viewBox="0 0 100 100" className="h-16 w-16 shrink-0" aria-hidden="true">
          <rect width="100" height="100" fill="#fdf8f4" />
          {Array.from({ length: 10 }).map((_, row) =>
            Array.from({ length: 10 }).map((_, col) =>
              (row * 7 + col * 13) % 5 === 0 ? null : (
                <rect
                  key={`${row}-${col}`}
                  x={col * 10}
                  y={row * 10}
                  width="9"
                  height="9"
                  fill="#2d1a0e"
                />
              )
            )
          )}
          {[
            [0, 0],
            [78, 0],
            [0, 78],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <rect x={x} y={y} width="22" height="22" fill="#2d1a0e" />
              <rect x={x + 4} y={y + 4} width="14" height="14" fill="#fdf8f4" />
              <rect x={x + 8} y={y + 8} width="6" height="6" fill="#2d1a0e" />
            </g>
          ))}
        </svg>
        <div className="min-w-0">
          <p className="kicker text-espresso/80">Nominal QR</p>
          <p className="display tnum text-[1.5rem] text-coral-deep">Rp27.000</p>
          <p className="mt-1 text-[11px] leading-snug text-espresso/80">
            Persis total pesanan, pelanggan nggak nanya nominal lagi.
          </p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 border-t border-dashed border-espresso/25 pt-3">
        <Stamp className="text-espresso/80" rotate={-4}>
          cek manual
        </Stamp>
        <p className="text-[11px] leading-snug text-espresso/80">
          Bukti bayarnya tetap kamu yang verifikasi.
        </p>
      </div>
    </div>
  );
}

export default function FeatureLedger() {
  return (
    <section id="fitur" className="px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Rule n="05" label="Isinya" className="mb-8" />

        <h2 className="display max-w-[18ch] text-[clamp(1.75rem,1.2rem+2vw,2.9rem)]">
          Lima hal yang kepake tiap hari.
        </h2>

        <ol className="mt-10 border-t border-espresso/20">
          {FEATURES.map((f, i) => (
            <li
              key={f.title}
              className="grid gap-x-6 gap-y-2 border-b border-espresso/15 py-7 md:grid-cols-12"
            >
              <p className="kicker text-espresso/80 md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="display text-[1.35rem] md:col-span-4">{f.title}</h3>
              <div className="md:col-span-6 md:col-start-7">
                <p className="max-w-xl text-[15px] leading-relaxed text-espresso/85">
                  {f.body}
                </p>
                {f.title.startsWith("QRIS") && <QrisSlip />}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
