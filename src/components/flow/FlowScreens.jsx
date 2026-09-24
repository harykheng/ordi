import { useMemo } from "react";
import { STORE_EXAMPLES } from "../../data/content";
import { buildDays, heroDateWindow } from "../../lib/dates";
import { rp } from "../../lib/format";

const STORE = STORE_EXAMPLES[0];

/** Decorative QR-looking grid, deterministic so it never flickers. */
export function FakeQR({ className = "" }) {
  const cells = useMemo(() => {
    let seed = 7;
    const rnd = () => ((seed = (seed * 9301 + 49297) % 233280), seed / 233280);
    const out = [];
    for (let y = 0; y < 21; y++)
      for (let x = 0; x < 21; x++) {
        const finder = (x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12);
        if (!finder && rnd() < 0.47) out.push([x, y]);
      }
    return out;
  }, []);
  return (
    <svg viewBox="0 0 21 21" className={className} shapeRendering="crispEdges" aria-hidden="true">
      <rect width="21" height="21" fill="#fff" />
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#1b1a17" />
      ))}
      {[
        [0, 0],
        [14, 0],
        [0, 14],
      ].map(([x, y]) => (
        <g key={`f${x}${y}`}>
          <rect x={x} y={y} width="7" height="7" fill="#1b1a17" />
          <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
          <rect x={x + 2} y={y + 2} width="3" height="3" fill="#1b1a17" />
        </g>
      ))}
    </svg>
  );
}

function useDemoDate() {
  return useMemo(() => {
    const days = buildDays(9);
    const { selectedKey } = heroDateWindow(days);
    return { days, picked: days.find((d) => d.key === selectedKey) || days[2] };
  }, []);
}

function Shell({ title, sub, children }) {
  return (
    <div className="card-ink overflow-hidden text-left" aria-hidden="true">
      <div className="flex items-center gap-2.5 border-b border-line bg-paper px-4 py-3">
        <span
          className="grid grid-cols-1 size-8 shrink-0 place-items-center rounded-full border border-line font-headline text-white"
          style={{ background: STORE.brand }}
        >
          {STORE.initial}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold leading-tight">{title}</p>
          <p className="truncate font-mono-label text-[11px] text-ink-2">{sub}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 p-4">{children}</div>
    </div>
  );
}

function DateScreen() {
  const { days, picked } = useDemoDate();
  return (
    <Shell title={STORE.name} sub={STORE.domain}>
      <p className="text-sm font-bold">Mau diambil atau diantar?</p>
      <div className="grid grid-cols-2 gap-2">
        <span className="rounded-xl border border-line bg-ink px-3 py-3 text-center text-sm font-bold text-white">Ambil sendiri</span>
        <span className="rounded-xl border border-line px-3 py-3 text-center text-sm font-bold">Diantar</span>
      </div>
      <p className="mt-1 text-sm font-bold">Pilih tanggal</p>
      <div className="grid grid-cols-4 gap-1.5">
        {days.slice(0, 8).map((d) => {
          const sel = d.key === picked.key;
          return (
            <span
              key={d.key}
              className={`rounded-[10px] border px-0.5 pt-1.5 pb-1 text-center text-[11px] leading-tight ${
                d.closed
                  ? "striped-closed border-line text-ink-2"
                  : sel
                    ? "border-transparent bg-highlight"
                    : "border-line bg-card text-ink-2"
              }`}
            >
              {d.day}
              <b className={`block font-headline text-base text-ink ${d.closed ? "line-through decoration-2 text-ink-2" : ""}`}>{d.date}</b>
              <span className={`block min-h-[13px] font-mono-label text-[9.5px] font-semibold uppercase ${d.full ? "text-ember-deep" : ""}`}>
                {d.closed ? "Libur" : d.full ? "Penuh" : d.label || " "}
              </span>
            </span>
          );
        })}
      </div>
      <span className="mt-1 rounded-full border border-line bg-ink py-3 text-center text-sm font-bold text-white">Lihat Menu →</span>
    </Shell>
  );
}

const MENU = [
  { name: "Roti Sobek Pandan", price: 28000, meta: "Sisa 3 slot", tone: "slot", qty: 2 },
  { name: "Bolu Gulung Keju", price: 45000, meta: "Habis", tone: "out" },
  { name: "Kue Nastar Toples", price: 65000, meta: "Varian: Original, Keju", tone: "var" },
  { name: "Brownies Panggang", price: 55000, meta: "Sisa 5 slot", tone: "slot" },
];

function MenuScreen() {
  const { picked } = useDemoDate();
  return (
    <Shell title="Menu" sub={`Ambil sendiri · ${picked.day}, ${picked.date} ${picked.month}`}>
      <div className="grid grid-cols-2 gap-2.5">
        {MENU.map((m) => (
          <div key={m.name} className={`rounded-xl border border-line p-2.5 ${m.tone === "out" ? "text-ink-2" : ""}`}>
            <span
              className="grid grid-cols-1 aspect-[4/3] place-items-center rounded-lg font-headline text-2xl"
              style={{ background: "color-mix(in srgb, #B83560 12%, white)", color: STORE.brand }}
            >
              {m.name.charAt(0)}
            </span>
            <p className="mt-2 text-[12.5px] font-bold leading-tight">{m.name}</p>
            <p className="font-mono-label text-[11.5px] font-semibold">{rp(m.price)}</p>
            <p
              className={`mt-1 font-mono-label text-[10.5px] font-semibold ${
                m.tone === "slot" ? "text-ember-deep" : "text-ink-2"
              }`}
            >
              {m.meta}
            </p>
            {m.qty ? (
              <p className="mt-1.5 flex items-center justify-between rounded-full border border-line px-2 py-0.5 font-mono-label text-xs font-bold">
                <span>−</span>
                {m.qty}
                <span>+</span>
              </p>
            ) : null}
          </div>
        ))}
      </div>
      <span className="flex justify-between rounded-xl border border-line bg-ink px-4 py-3 text-sm font-bold text-white">
        <span>2 item · {rp(56000)}</span>
        <span>Lanjut →</span>
      </span>
    </Shell>
  );
}

const PLACES = [
  { name: "Mal Taman Anggrek, Grogol", km: "2,4 km dari toko", sel: true },
  { name: "Taman Anggrek Residences", km: "2,6 km dari toko" },
  { name: "Jl. Taman Anggrek, Bandung", km: "120 km dari toko", far: true },
];

function AddressScreen() {
  return (
    <Shell title="Alamat pengantaran" sub="Hasil diurutkan dari yang paling dekat toko">
      <p className="rounded-xl border border-line px-3 py-2.5 text-sm">
        taman anggrek<span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 bg-ink" />
      </p>
      <ul className="grid grid-cols-1 gap-1.5">
        {PLACES.map((p) => (
          <li
            key={p.name}
            className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-[12.5px] ${
              p.sel ? "border border-line bg-highlight/60 font-semibold" : p.far ? "text-ink-2" : ""
            }`}
          >
            <span className="truncate">{p.name}</span>
            <span className="shrink-0 font-mono-label text-[11px]">{p.km}</span>
          </li>
        ))}
      </ul>
      <div className="relative h-24 overflow-hidden rounded-xl border border-line bg-[#EEF1E6]">
        <svg viewBox="0 0 300 96" className="absolute inset-0 size-full" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 60 C 80 40, 140 90, 300 50" stroke="#fff" strokeWidth="9" fill="none" />
          <path d="M120 0 L 150 96" stroke="#fff" strokeWidth="7" />
          <path d="M0 20 L 300 30" stroke="#fff" strokeWidth="5" />
          <rect x="190" y="58" width="60" height="30" fill="#DDE6CF" />
        </svg>
        <span className="absolute left-1/2 top-[34%] -translate-x-1/2 -translate-y-full">
          <svg width="22" height="30" viewBox="0 0 22 30" aria-hidden="true">
            <path d="M11 29 C 11 29, 1 17, 1 11 A 10 10 0 1 1 21 11 C 21 17, 11 29, 11 29 Z" fill="#B8541A" stroke="#1b1a17" strokeWidth="2" />
            <circle cx="11" cy="11" r="3.5" fill="#fff" />
          </svg>
        </span>
      </div>
      <div className="grid grid-cols-1 gap-1.5">
        <p className="flex items-center justify-between rounded-lg border border-line bg-card px-3 py-2 text-[12.5px] font-semibold">
          <span>● GrabExpress Instant</span>
          <span className="font-mono-label">{rp(17000)}</span>
        </p>
        <p className="flex items-center justify-between rounded-lg border border-line px-3 py-2 text-[12.5px] text-ink-2">
          <span>○ GoSend Instant</span>
          <span className="font-mono-label">{rp(18000)}</span>
        </p>
      </div>
    </Shell>
  );
}

function PayScreen() {
  return (
    <Shell title="Bayar QRIS" sub="Scan dari bank atau e-wallet apa aja">
      <div className="mx-auto w-40 rounded-xl border border-line bg-card p-2.5">
        <FakeQR className="block w-full" />
      </div>
      <div className="text-center">
        <p className="text-xs text-ink-2">Total pembayaran</p>
        <p className="font-mono-label text-2xl font-bold">{rp(73000)}</p>
        <p className="mt-1 font-mono-label text-[11px] text-ink-2">Nominal udah terisi. QR bisa dibuka lagi kapan aja.</p>
      </div>
      <span className="rounded-full border border-line bg-ember py-3 text-center text-sm font-bold">Kirim bukti transfer via WhatsApp</span>
    </Shell>
  );
}

const STATUS = [
  { label: "Menunggu Konfirmasi", note: "09.12", state: "done" },
  { label: "Diproses", note: "lagi dibikin", state: "now" },
  { label: "Selesai", note: "", state: "todo" },
];

function TrackScreen() {
  const { picked } = useDemoDate();
  return (
    <Shell title="Lacak pesanan" sub={`${STORE.domain}/tracking`}>
      <div className="grid grid-cols-2 gap-2 text-[12px]">
        <p className="rounded-lg border border-line px-2.5 py-2">
          <span className="block text-[10.5px] text-ink-2">Kode pesanan</span>
          <b className="font-mono-label">YB-K3F9Q</b>
        </p>
        <p className="rounded-lg border border-line px-2.5 py-2">
          <span className="block text-[10.5px] text-ink-2">Nomor WhatsApp</span>
          <b className="font-mono-label">08xx xxxx xxxx</b>
        </p>
      </div>
      <div className="rounded-xl border border-line p-3.5">
        <p className="flex justify-between font-mono-label text-xs font-semibold">
          <span>YB-K3F9Q</span>
          <span>
            {picked.day}, {picked.date} {picked.month}
          </span>
        </p>
        <ol className="mt-3 grid grid-cols-1 gap-3">
          {STATUS.map((s) => (
            <li key={s.label} className="flex items-center gap-3">
              <span
                className={`size-3.5 shrink-0 rounded-full border border-line ${
                  s.state === "done" ? "bg-ink" : s.state === "now" ? "bg-ember" : "bg-card"
                }`}
              />
              <span className={`text-sm font-semibold ${s.state === "todo" ? "text-ink-2" : ""}`}>{s.label}</span>
              {s.note && <span className="ml-auto font-mono-label text-[11px] text-ink-2">{s.note}</span>}
            </li>
          ))}
        </ol>
      </div>
      <p className="font-mono-label text-[11px] text-ink-2">Status yang sama persis dengan yang kamu lihat di dashboard.</p>
    </Shell>
  );
}

const SCREENS = {
  tanggal: DateScreen,
  menu: MenuScreen,
  alamat: AddressScreen,
  bayar: PayScreen,
  lacak: TrackScreen,
};

export default function FlowScreen({ id }) {
  const Screen = SCREENS[id];
  return Screen ? <Screen /> : null;
}
