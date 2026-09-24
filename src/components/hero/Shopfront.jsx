import { rp } from "../../lib/format";

const CAPACITY = 4;

function DateChip({ day, selected }) {
  const tag = day.closed ? "Libur" : day.full ? "Penuh" : day.label;
  return (
    <span
      className={`rounded-[10px] border-2 px-0.5 pt-1.5 pb-1 text-center text-[11px] leading-tight transition-colors duration-300 ${
        day.closed
          ? "striped-closed border-ink/25 text-ink-2"
          : selected
            ? "border-ink bg-highlight text-ink"
            : "border-ink/25 bg-card text-ink-2"
      }`}
    >
      {day.day}
      <b className={`block font-headline text-[15px] leading-snug text-ink ${day.closed ? "line-through text-ink-2" : ""}`}>{day.date}</b>
      <span className={`block min-h-[13px] font-mono-label text-[10px] font-semibold uppercase ${day.full ? "text-ember-deep" : ""}`}>
        {tag || " "}
      </span>
    </span>
  );
}

/**
 * The store's own shopfront: hanging name sign, striped awning in the brand
 * colour, and the (stylized) Ordi catalog behind the window. `flipKey`
 * restarts the sign flip and awning flutter when the example store changes.
 */
export default function Shopfront({ store, chips, selectedKey, qty, flipKey }) {
  const [main, soldOut] = store.items;
  const left = CAPACITY - qty;
  return (
    <div className="relative w-full max-w-[320px] pt-[84px]" aria-hidden="true">
      <div className="absolute left-1/2 top-[26px] z-30 w-[236px] -translate-x-1/2">
        <div className="sign-swing hang">
          <div key={flipKey} className="sign-flip card-ink px-3 pt-2.5 pb-2 text-center">
            <p className="truncate font-headline text-xl leading-tight" style={{ color: store.brand }}>
              {store.name}
            </p>
            <p className="font-mono-label text-[10.5px] text-ink-2">{store.domain}</p>
          </div>
        </div>
      </div>
      <div className="awning-wrap relative z-20 -mx-3.5">
        <div key={flipKey} className="awning awning-flutter" style={{ "--awn": store.brand }} />
      </div>
      <div className="relative -mt-2 grid grid-cols-1 gap-2.5 rounded-b-2xl border-[2.5px] border-t-0 border-ink bg-card px-3 pt-5 pb-3 shadow-[0_5px_0_0_var(--color-ink)]">
        <div className="grid grid-cols-4 gap-1.5">
          {chips.map((d) => (
            <DateChip key={d.key} day={d} selected={d.key === selectedKey} />
          ))}
        </div>
        <div className="grid grid-cols-[40px_1fr_auto] items-center gap-2.5 rounded-xl border-2 border-ink/20 p-2">
          <span
            className="grid size-10 place-items-center rounded-[10px] font-headline text-base transition-colors duration-500"
            style={{ background: `color-mix(in srgb, ${store.brand} 14%, white)`, color: store.brand }}
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
            <p className="mt-1 flex items-center justify-end gap-1.5 font-mono-label text-xs font-bold">
              <span className="grid size-[22px] place-items-center rounded-full border-2 border-ink">−</span>
              {qty}
              <span key={`p${qty}`} className={`grid size-[22px] place-items-center rounded-full border-2 border-ink ${qty > 0 ? "bump bg-highlight" : ""}`}>
                +
              </span>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-[40px_1fr_auto] items-center gap-2.5 rounded-xl border-2 border-ink/20 p-2 text-ink-2">
          <span
            className="grid size-10 place-items-center rounded-[10px] font-headline text-base"
            style={{ background: `color-mix(in srgb, ${store.brand} 14%, white)`, color: store.brand }}
          >
            {soldOut.name.charAt(0)}
          </span>
          <div className="min-w-0">
            <p className="text-[12.5px] font-bold leading-tight">{soldOut.name}</p>
            <p className="mt-0.5 font-mono-label text-[11px] font-semibold">Habis</p>
          </div>
          <p className="font-mono-label text-[11.5px] font-semibold">{rp(soldOut.price)}</p>
        </div>
        <div
          className={`flex items-center justify-between rounded-xl border-2 px-3.5 py-2 text-[12.5px] font-bold transition-colors duration-500 ${
            qty === 0 ? "border-dashed border-ink/40 bg-card text-ink-2" : "border-ink bg-ink text-white"
          }`}
        >
          <span>{qty === 0 ? "Keranjang masih kosong" : `${qty} item · ${rp(main.price * qty)}`}</span>
          <span>Lanjut →</span>
        </div>
      </div>
    </div>
  );
}
