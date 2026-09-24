import { rp } from "../../lib/format";

const CAPACITY = 4;

/** Clean catalog card for the example store; `qty` drives slots + cart. */
export default function ShopCard({ store, chips, selectedKey, qty }) {
  const [main, soldOut] = store.items;
  const left = CAPACITY - qty;
  return (
    <div className="card-ink overflow-hidden" aria-hidden="true">
      <div className="flex items-center gap-2.5 px-3.5 pt-3.5 pb-3">
        <span
          className="grid size-10 shrink-0 place-items-center rounded-xl font-headline text-lg text-white transition-colors duration-500"
          style={{ background: store.brand }}
        >
          {store.initial}
        </span>
        <div className="min-w-0">
          <p className="truncate font-headline text-base leading-tight">{store.name}</p>
          <p className="truncate font-mono-label text-[11px] text-ink-2">{store.domain}</p>
        </div>
        <span className="ml-auto rounded-full bg-mint px-2 py-1 font-mono-label text-[10.5px] font-semibold text-pen">Buka</span>
      </div>
      <div className="grid grid-cols-1 gap-2.5 px-3.5 pb-3.5">
        <div className="grid grid-cols-4 gap-1.5">
          {chips.map((d) => {
            const selected = d.key === selectedKey;
            const tag = d.closed ? "Libur" : d.full ? "Penuh" : d.label;
            return (
              <span
                key={d.key}
                className={`rounded-xl px-0.5 pt-1.5 pb-1 text-center text-[11px] leading-tight transition-colors duration-300 ${
                  selected ? "bg-ink text-white" : d.closed ? "striped-closed text-ink-2" : "bg-[#f7f1e8] text-ink-2"
                }`}
              >
                {d.day}
                <b className={`block font-headline text-[15px] leading-snug ${selected ? "text-white" : "text-ink"} ${d.closed ? "line-through text-ink-2" : ""}`}>
                  {d.date}
                </b>
                <span className={`block min-h-[12px] font-mono-label text-[9.5px] font-semibold uppercase ${d.full ? "text-ember-deep" : ""}`}>
                  {tag || " "}
                </span>
              </span>
            );
          })}
        </div>
        <div className="grid grid-cols-[40px_1fr_auto] items-center gap-2.5 rounded-2xl bg-[#fbf7f1] p-2">
          <span
            className="grid size-10 place-items-center rounded-xl font-headline text-base transition-colors duration-500"
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
              <span className="grid size-[22px] place-items-center rounded-full bg-white shadow-sm">−</span>
              {qty}
              <span key={`p${qty}`} className={`grid size-[22px] place-items-center rounded-full text-white ${qty > 0 ? "bump" : ""}`} style={{ background: store.brand }}>
                +
              </span>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-[40px_1fr_auto] items-center gap-2.5 rounded-2xl bg-[#fbf7f1] p-2 text-ink-2">
          <span
            className="grid size-10 place-items-center rounded-xl font-headline text-base"
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
          className={`flex items-center justify-between rounded-2xl px-3.5 py-3 text-[12.5px] font-bold transition-colors duration-500 ${
            qty === 0 ? "bg-[#f7f1e8] text-ink-2" : "text-white"
          }`}
          style={qty === 0 ? undefined : { background: store.brand }}
        >
          <span>{qty === 0 ? "Keranjang masih kosong" : `${qty} item · ${rp(main.price * qty)}`}</span>
          <span>Lanjut →</span>
        </div>
      </div>
    </div>
  );
}
