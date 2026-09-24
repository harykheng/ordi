const ROWS = [
  ["Website pesanan", "1 toko"],
  ["Hosting", "atas nama toko"],
  ["Database", "atas nama toko"],
];

/**
 * "Tanda terima kepemilikan" printed out of a little receipt printer, then
 * stamped LUNAS. Always labelled "contoh" so the example store names read as
 * a scenario, never as a client testimonial. `printKey` restarts the print.
 */
export default function OwnershipReceipt({ store, printKey, animate }) {
  return (
    <div role="img" aria-label={`Contoh tanda terima kepemilikan: website pesanan, hosting, database, dan domain atas nama ${store.name}, dibayar sekali, lunas.`}>
      <div className="relative z-10 -mx-3 h-[18px] rounded-t-[10px] rounded-b-[5px] bg-ink shadow-[0_3px_0_rgba(0,0,0,0.18)]">
        <span className="absolute right-3.5 top-1.5 size-1.5 rounded-full bg-[#7BE495]" />
      </div>
      <div
        key={printKey}
        aria-hidden="true"
        className={`receipt -mt-1 px-4 pt-5 pb-3.5 text-[11.5px] leading-[1.55] ${animate ? "receipt-print" : ""}`}
      >
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] leading-snug">
            Tanda terima
            <br />
            kepemilikan
          </p>
          <span className="rounded-[5px] border-[1.5px] border-ink/30 px-1.5 py-0.5 text-[10px] text-ink-2">contoh</span>
        </div>
        <p className="mt-0.5 text-[11px] text-ink-2">Ordi · Studio Harel</p>
        <div className="receipt-rule my-2.5" />
        <p>Atas nama</p>
        <p
          className={`pen mb-2 -rotate-2 origin-left whitespace-nowrap text-[22px] font-bold leading-tight ${animate ? "pen-write" : ""}`}
        >
          {store.name}
        </p>
        {ROWS.map(([k, v]) => (
          <div key={k} className="flex items-baseline gap-1.5">
            <span>{k}</span>
            <i className="leader" />
            <b className="font-semibold">{v}</b>
          </div>
        ))}
        <div className="flex items-baseline gap-1.5">
          <span>Domain</span>
          <i className="leader" />
          <b className="font-semibold">{store.domain}</b>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span>Komisi/pesanan</span>
          <i className="leader" />
          <b className="font-semibold">Rp0</b>
        </div>
        <div className="receipt-rule my-2.5" />
        <div className="flex items-baseline gap-1.5">
          <span>Dibayar</span>
          <i className="leader" />
          <b className="font-semibold">sekali</b>
        </div>
        <div className="h-[52px]" />
        <span
          className={`stamp absolute right-2.5 bottom-3 text-[22px] ${animate ? "stamp-thump" : ""}`}
          style={animate ? { animationDelay: "1.35s" } : undefined}
        >
          LUNAS
        </span>
      </div>
    </div>
  );
}
