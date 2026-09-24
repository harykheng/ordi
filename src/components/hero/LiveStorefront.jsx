import { rp } from "../../lib/format";

const CAPACITY = 4;

function DateChip({ day, selected }) {
  const base =
    "rounded-[10px] border-[1.5px] px-0.5 pt-1.5 pb-1 text-center text-[11px] leading-tight transition-colors duration-300";
  const state = day.closed
    ? "striped-closed border-ink/30 text-ink-2"
    : selected
      ? "border-[var(--brand)] bg-[color-mix(in_srgb,var(--brand)_9%,white)] shadow-[inset_0_0_0_1.5px_var(--brand)] text-ink-2"
      : "border-ink/30 bg-card text-ink-2";
  const tag = day.closed ? "Libur" : day.full ? "Penuh" : day.label;
  return (
    <span className={`${base} ${state}`}>
      {day.day}
      <b className={`block font-headline text-base leading-tight text-ink ${day.closed ? "line-through decoration-2 text-ink-2" : ""}`}>
        {day.date}
      </b>
      <span
        className={`block min-h-[13px] font-mono-label text-[10px] font-semibold uppercase ${day.full ? "text-ember-deep" : ""}`}
      >
        {tag || " "}
      </span>
    </span>
  );
}

/**
 * Stylized Ordi catalog (not a screenshot) that re-brands per example store.
 * `qty` drives the slot counter and the cart, so the hero can "play" it.
 */
export default function LiveStorefront({ store, chips, selectedKey, qty, className = "" }) {
  const [main, soldOut] = store.items;
  const left = CAPACITY - qty;
  return (
    <div className={`card-ink overflow-hidden ${className}`} style={{ "--brand": store.brand }} aria-hidden="true">
      <div className="flex items-center gap-2 px-3 py-2 border-b-2 border-ink bg-paper font-mono-label text-xs">
        <span className="size-2.5 rounded-full transition-colors duration-500" style={{ background: store.brand }} />
        {store.domain}
      </div>
      <div
        className="flex items-center gap-2.5 px-3.5 py-3 text-white transition-colors duration-500"
        style={{ background: store.brand }}
      >
        <span
          className="grid grid-cols-1 place-items-center size-10 shrink-0 rounded-full bg-white border-2 border-ink font-headline text-lg"
          style={{ color: store.brand }}
        >
          {store.initial}
        </span>
        <div>
          <p className="font-headline text-lg leading-tight">{store.name}</p>
          <p className="text-xs">{store.tag}</p>
        </div>
      </div>
      <div className="p-3.5 grid grid-cols-1 gap-3">
        <div className="grid grid-cols-2 border-2 border-ink rounded-xl overflow-hidden text-[12.5px] font-bold">
          <span className="py-2 text-center bg-ink text-white">Ambil sendiri</span>
          <span className="py-2 text-center">Diantar</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {chips.map((d) => (
            <DateChip key={d.key} day={d} selected={d.key === selectedKey} />
          ))}
        </div>
        <div className="grid grid-cols-[40px_1fr_auto] items-center gap-2.5 rounded-xl border-[1.5px] border-ink/30 p-2">
          <span
            className="grid grid-cols-1 place-items-center size-10 rounded-[10px] font-headline text-lg"
            style={{ background: `color-mix(in srgb, ${store.brand} 13%, white)`, color: store.brand }}
          >
            {main.name.charAt(0)}
          </span>
          <div className="min-w-0">
            <p className="text-[12.5px] font-bold leading-tight">{main.name}</p>
            <p key={qty} className="bump mt-0.5 font-mono-label text-[11px] font-semibold text-ember-deep">
              {left > 0 ? `Sisa ${left} slot` : "Penuh"}
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono-label text-[11.5px] font-semibold">{rp(main.price)}</p>
            <div className="mt-1 flex items-center justify-end gap-1.5 font-mono-label text-xs font-bold">
              <span className="grid grid-cols-1 place-items-center size-[22px] rounded-full border-[1.5px] border-ink">−</span>
              <b className="min-w-2.5 text-center">{qty}</b>
              <span
                key={`p${qty}`}
                className={`grid place-items-center size-[22px] rounded-full border-[1.5px] border-ink ${qty > 0 ? "bump bg-highlight" : ""}`}
              >
                +
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[40px_1fr_auto] items-center gap-2.5 rounded-xl border-[1.5px] border-ink/30 p-2">
          <span
            className="grid grid-cols-1 place-items-center size-10 rounded-[10px] font-headline text-lg"
            style={{ background: `color-mix(in srgb, ${store.brand} 13%, white)`, color: store.brand }}
          >
            {soldOut.name.charAt(0)}
          </span>
          <div className="min-w-0">
            <p className="text-[12.5px] font-bold leading-tight text-ink-2">{soldOut.name}</p>
            <p className="mt-0.5 font-mono-label text-[11px] font-semibold text-ink-2">Habis</p>
          </div>
          <p className="font-mono-label text-[11.5px] font-semibold text-ink-2">{rp(soldOut.price)}</p>
        </div>
        <div
          className={`flex items-center justify-between rounded-xl border-2 border-ink px-3.5 py-2.5 text-[12.5px] font-bold text-white transition-[opacity,background-color] duration-500 ${qty === 0 ? "opacity-45" : ""}`}
          style={{ background: store.brand }}
        >
          <span>{qty === 0 ? "Keranjang masih kosong" : `${qty} item · ${rp(main.price * qty)}`}</span>
          <span>Lanjut →</span>
        </div>
      </div>
    </div>
  );
}
