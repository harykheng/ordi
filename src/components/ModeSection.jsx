import { useMemo, useState } from "react";
import Reveal from "./Reveal";
import { buildDays } from "../lib/dates";

const HINTS = {
  harian: "Toko harian: hari ini dan besok bisa dipesan. Tanggal libur dicoret, tanggal yang kuotanya habis ditandai Penuh.",
  po: "Toko PO dengan tenggang H-2: hari ini dan besok nggak ditawarkan sama sekali. Menu, keranjang, dan checkout tetap sama persis.",
};

const NOTES = [
  "Tenggang PO kamu yang atur, misalnya paling cepat H-2.",
  "Kuota harian per produk, penuh lagi di tanggal berikutnya.",
  "Tanggal libur ditutup dari dashboard, langsung mati di kalender pelanggan.",
  "Kuota dicek ulang sebelum pelanggan bayar, jadi nggak ada yang udah transfer tapi slotnya keburu habis.",
];

const windowFor = (days, mode) => (mode === "po" ? days.slice(2, 9) : days.slice(0, 7));
const firstOpen = (list) => list.find((d) => !d.closed && !d.full);

export default function ModeSection() {
  const days = useMemo(() => buildDays(9), []);
  const [mode, setMode] = useState("harian");
  const [sel, setSel] = useState(() => firstOpen(windowFor(days, "harian")).key);
  const [qty, setQty] = useState(0);

  const visible = windowFor(days, mode);
  const day = days.find((d) => d.key === sel);
  const left = day ? day.slots - qty : 0;

  const switchMode = (m) => {
    setMode(m);
    setSel(firstOpen(windowFor(days, m)).key);
    setQty(0);
  };

  return (
    <section className="tear-top px-5 pt-24 pb-20 sm:pb-28" style={{ "--tear-from": "var(--color-meja)" }}>
      <div className="mx-auto grid grid-cols-1 max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <Reveal>
          <p className="font-mono-label text-xs uppercase tracking-[0.08em] text-ink-2">Toko harian atau toko PO</p>
          <h2 className="font-headline mt-3 text-[clamp(1.9rem,3.8vw,2.8rem)] leading-[1.14] text-balance">
            Mesinnya sama, yang berubah <mark className="mark-hl">cuma kalendernya.</mark>
          </h2>
          <p className="mt-4 max-w-[50ch] text-ink-2 sm:text-lg">
            Buat kafe yang buka tiap hari maupun toko kue yang jualan PO per minggu. Coba ganti modenya,
            pilih tanggal, lalu tekan + sampai slotnya penuh.
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-2.5">
            {NOTES.map((n) => (
              <li key={n} className="flex gap-3 text-[15px] leading-relaxed text-ink-2">
                <span className="pen mt-0.5 shrink-0 text-lg font-bold leading-none" aria-hidden="true">
                  ✓
                </span>
                {n}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card-ink p-4 sm:p-6">
            <div role="group" aria-label="Mode toko" className="grid grid-cols-2 overflow-hidden rounded-full border-2 border-ink">
              {[
                ["harian", "Toko harian"],
                ["po", "Toko PO"],
              ].map(([m, label]) => (
                <button
                  key={m}
                  type="button"
                  aria-pressed={mode === m}
                  onClick={() => switchMode(m)}
                  className={`min-h-11 text-sm font-bold transition-colors ${mode === m ? "bg-ink text-paper" : "hover:bg-highlight/50"}`}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="mt-3 min-h-[4.5em] text-[13.5px] leading-relaxed text-ink-2" aria-live="polite">
              {HINTS[mode]}
            </p>

            <p className="mt-2 text-sm font-bold">Mau diambil kapan?</p>
            <div className="mt-2 grid grid-cols-4 gap-1.5 sm:grid-cols-7">
              {visible.map((d) => {
                const off = d.closed || d.full;
                const selected = d.key === sel;
                const tag = d.closed ? "Libur" : d.full ? "Penuh" : d.label;
                return (
                  <button
                    key={d.key}
                    type="button"
                    disabled={off}
                    aria-pressed={selected}
                    aria-label={`${d.day} ${d.date} ${d.month}${tag ? `, ${tag}` : ""}`}
                    onClick={() => {
                      setSel(d.key);
                      setQty(0);
                    }}
                    className={`min-h-[62px] rounded-[10px] border-[1.5px] px-0.5 pt-1.5 pb-1 text-center text-[11px] leading-tight transition-colors ${
                      d.closed
                        ? "striped-closed cursor-not-allowed border-ink/30 text-ink-2"
                        : d.full
                          ? "cursor-not-allowed border-ink/30 bg-card text-ink-2"
                          : selected
                            ? "border-ink bg-highlight shadow-[inset_0_0_0_1.5px_var(--color-ink)]"
                            : "border-ink/30 bg-card text-ink-2 hover:border-ink"
                    }`}
                  >
                    {d.day}
                    <b className={`block font-headline text-base text-ink ${d.closed ? "line-through decoration-2 text-ink-2" : ""}`}>
                      {d.date}
                    </b>
                    <span className={`block min-h-[12px] whitespace-nowrap font-mono-label text-[9px] font-semibold uppercase ${d.full ? "text-ember-deep" : ""}`}>
                      {tag || " "}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 grid grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border-[1.5px] border-ink/30 p-2.5">
              <span className="grid grid-cols-1 size-11 place-items-center rounded-[10px] bg-ember/20 font-headline text-xl text-ember-deep">R</span>
              <div className="min-w-0">
                <p className="text-sm font-bold leading-tight">Roti Sobek Pandan</p>
                <p className={`mt-1 font-mono-label text-xs font-semibold ${left > 0 ? "text-ember-deep" : "text-ink"}`} aria-live="polite">
                  {left > 0 ? `Sisa ${left} slot` : "Penuh buat tanggal ini"}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Kurangi"
                  disabled={qty === 0}
                  onClick={() => setQty((q) => Math.max(0, q - 1))}
                  className="grid grid-cols-1 size-11 place-items-center rounded-full border-2 border-ink bg-card font-mono-label text-lg font-bold disabled:opacity-35"
                >
                  −
                </button>
                <output className="min-w-5 text-center font-mono-label font-bold" aria-label="Jumlah di keranjang">
                  {qty}
                </output>
                <button
                  type="button"
                  aria-label="Tambah"
                  disabled={left <= 0}
                  onClick={() => setQty((q) => q + 1)}
                  className="grid grid-cols-1 size-11 place-items-center rounded-full border-2 border-ink bg-highlight font-mono-label text-lg font-bold disabled:opacity-35"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
