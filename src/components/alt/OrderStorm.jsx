import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Latar hero: "order chaos, lalu Ordi merapikan". Tiap potongan berangkat
// dari luar dan bergerak ke satu titik kumpul di belakang mockup, melambat,
// mengecil, lalu terserap. Nggak ada satu pun elemen yang gerakannya acak
// tanpa arti; semuanya potongan order, chat, bayar, alamat, atau dashboard.
//
// Dikerjain pakai CSS keyframes, bukan canvas atau library animasi. Lihat
// blok "Order Storm" di index.css.

// Mockup Ordi kira-kira nempatin x 47-90%, y 16-88% dari kotak hero. Titik
// kumpulnya ditaruh di pinggiran mockup itu, bukan di tengahnya, supaya
// perjalanannya kelihatan dulu di ruang kosong lalu baru terserap. Datangnya
// dari atas, kanan, dan bawah; kolom kiri sengaja dibiarin tenang buat copy.
//
// x,y  titik kumpul, persen kotak hero
// dx,dy  dari mana dia berangkat, piksel
// sx,sy  tempat dia diam kalau pengunjung minta gerak seperlunya. Ini
//        ditentuin satu-satu, bukan diambil dari tengah jalur, karena tengah
//        jalur kebanyakan jatuh di belakang mockup dan hasilnya kosong.
// op  opacity puncak, d  durasi detik, t  jeda mulai, f  lapis jauh
const DESKTOP = [
  { k: "chat", s: "Mbak croissant masih ada?", x: 57, y: 17, dx: -100, dy: -330, sx: -141, sy: -101, op: 0.32, d: 13, t: 0, f: false },
  { k: "chat", s: "Totalnya berapa ya kak?", x: 76, y: 15, dx: 90, dy: -360, sx: -51, sy: -91, op: 0.3, d: 15, t: 2.4, f: false },
  { k: "chat", s: "Alamat nanti saya share", x: 58, y: 86, dx: -160, dy: 300, sx: -102, sy: 81, op: 0.26, d: 14, t: 5.1, f: true },
  { k: "card", s: "Masuk ke sistemmu", x: 84, y: 23, dx: 300, dy: -210, sx: -20, sy: -131, op: 0.35, d: 11, t: 1.2, f: false },
  { k: "harga", s: "Rp67.000", x: 86, y: 44, dx: 330, dy: -40, sx: -40, sy: -40, op: 0.34, d: 12, t: 3.6, f: false },
  { k: "pin", s: "Kemang Raya \u00b7 3,2 km", x: 53, y: 58, dx: -300, dy: 250, sx: -294, sy: 283, op: 0.28, d: 16, t: 6.8, f: true },
  { k: "label", s: "Bukti transfer", x: 83, y: 80, dx: 280, dy: 230, sx: -10, sy: 81, op: 0.26, d: 14, t: 8.2, f: true },
  { k: "notif", s: "+1 pesanan", x: 68, y: 14, dx: 10, dy: -330, sx: -77, sy: -91, op: 0.32, d: 10, t: 4.4, f: false },
  { k: "status", s: "Diproses", x: 51, y: 40, dx: -280, dy: -170, sx: -64, sy: -303, op: 0.28, d: 13, t: 7.5, f: false },
  { k: "label", s: "Kopi Susu", x: 78, y: 87, dx: 150, dy: 290, sx: -26, sy: 81, op: 0.24, d: 15, t: 9.6, f: true },
  { k: "num", s: "#0231", x: 50, y: 66, dx: -290, dy: 230, sx: -333, sy: 263, op: 0.3, d: 12, t: 2.9, f: false },
  { k: "num", s: "#0230", x: 87, y: 30, dx: 320, dy: -150, sx: -60, sy: -81, op: 0.22, d: 16, t: 11.1, f: true },
  { k: "label", s: "Matcha Latte", x: 64, y: 89, dx: -60, dy: 310, sx: 0, sy: 71, op: 0.24, d: 14, t: 6.1, f: true },
  { k: "status", s: "Selesai", x: 85, y: 60, dx: 320, dy: 120, sx: -30, sy: 40, op: 0.26, d: 11, t: 10.3, f: false },
];

// Di layar kecil cuma enam, semuanya naik dari bawah ke arah simulasi. Nggak
// ada yang lewat area judul, dan nggak ada yang ngikut kursor.
const MOBILE = [
  { k: "chat", s: "Mbak croissant masih ada?", x: 32, y: 54, dx: -150, dy: 120, sx: -70, sy: -69, op: 0.28, d: 14, t: 0, f: false },
  { k: "card", s: "Masuk ke sistemmu", x: 72, y: 52, dx: 160, dy: 130, sx: -8, sy: -92, op: 0.3, d: 12, t: 2.6, f: false },
  { k: "harga", s: "Rp67.000", x: 20, y: 72, dx: -150, dy: 140, sx: -31, sy: 69, op: 0.32, d: 13, t: 5.4, f: false },
  { k: "pin", s: "Kemang Raya \u00b7 3,2 km", x: 72, y: 68, dx: 160, dy: 110, sx: -90, sy: -69, op: 0.26, d: 15, t: 7.9, f: true },
  { k: "notif", s: "+1 pesanan", x: 50, y: 58, dx: -40, dy: 190, sx: -39, sy: 92, op: 0.26, d: 11, t: 4.1, f: false },
  { k: "num", s: "#0231", x: 82, y: 84, dx: 150, dy: 120, sx: -20, sy: 92, op: 0.24, d: 16, t: 9.2, f: true },
];

const CHIP = {
  chat: "rounded-xl rounded-bl-sm bg-card px-2.5 py-1.5 text-[11px] text-espresso shadow-[var(--shadow-border)]",
  card: "rounded-lg bg-card px-2.5 py-1.5 text-[11px] font-bold text-espresso shadow-[var(--shadow-border)]",
  harga: "tnum rounded-lg bg-card px-2.5 py-1.5 text-[13px] font-bold text-coral-deep shadow-[var(--shadow-border)]",
  pin: "rounded-lg bg-card px-2.5 py-1.5 text-[11px] text-espresso shadow-[var(--shadow-border)]",
  label: "rounded-md bg-sand px-2 py-1 text-[11px] font-medium text-espresso",
  notif: "rounded-md bg-coral px-2 py-1 text-[11px] font-bold text-cream",
  status: "rounded-md bg-mint px-2 py-1 text-[11px] font-semibold text-mint-deep",
  num: "tnum rounded-md bg-sand px-2 py-1 text-[11px] font-bold text-coral-deep",
};

function Chip({ item }) {
  if (item.k === "pin") {
    return (
      <span className={`inline-flex items-center gap-1 ${CHIP.pin}`}>
        <svg viewBox="0 0 24 24" className="size-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
          <circle cx="12" cy="10" r="2.4" />
        </svg>
        {item.s}
      </span>
    );
  }
  if (item.k === "card") {
    return (
      <span className={`inline-flex items-center gap-1.5 ${CHIP.card}`}>
        <span className="size-1.5 shrink-0 rounded-full bg-coral" />
        {item.s}
      </span>
    );
  }
  return <span className={CHIP[item.k]}>{item.s}</span>;
}

function Item({ item }) {
  return (
    <div
      className="storm-item"
      style={{
        left: `${item.x}%`,
        top: `${item.y}%`,
        "--dx": `${item.dx}px`,
        "--dy": `${item.dy}px`,
        "--sx": `${item.sx}px`,
        "--sy": `${item.sy}px`,
        "--op": item.op,
        animationDuration: `${item.d}s`,
        animationDelay: `-${item.t}s`,
      }}
    >
      <div className="storm-wobble" style={{ animationDelay: `-${item.t / 2}s` }}>
        <Chip item={item} />
      </div>
    </div>
  );
}

// Satu atau dua potongan yang ketarik masuk waktu pengunjung nambah produk.
const PULL = [
  { k: "card", s: "Masuk ke sistemmu", x: 54, y: 34, dx: -170, dy: -110 },
  { k: "harga", s: "Rp67.000", x: 88, y: 52, dx: 190, dy: 90 },
];

export default function OrderStorm({ pulse = 0 }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [calm, setCalm] = useState(false);
  const [siap, setSiap] = useState(false);

  // Parallax cuma buat yang punya kursor sungguhan. Di layar sentuh elemennya
  // jalan sendiri tanpa ngikut apa pun.
  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        if (!r.height) return;
        const px = ((e.clientX - r.left) / r.width - 0.5) * 2;
        const py = ((e.clientY - r.top) / r.height - 0.5) * 2;
        el.style.setProperty("--px", (px * 16).toFixed(2));
        el.style.setProperty("--py", (py * 11).toFixed(2));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  // Badainya reda 620ms, lalu label rapinya muncul sebentar.
  useEffect(() => {
    if (!pulse) return;
    const timers = [];
    if (!reduce) {
      setCalm(true);
      timers.push(setTimeout(() => setCalm(false), 620));
    }
    // kartu produknya mendarat di 560ms, jadi labelnya nunggu sampai badge
    // dan totalnya sudah berubah duluan
    timers.push(setTimeout(() => setSiap(true), reduce ? 120 : 760));
    timers.push(setTimeout(() => setSiap(false), reduce ? 1800 : 2500));
    return () => timers.forEach(clearTimeout);
  }, [pulse, reduce]);

  const lapis = (arr, jauh) => arr.filter((i) => i.f === jauh).map((i) => <Item key={i.s + i.x} item={i} />);

  return (
    <div ref={ref} className="storm" data-calm={calm} aria-hidden="true">
      {/* layar lebar */}
      <div className="hidden sm:block">
        <div className="storm-depth storm-far">{lapis(DESKTOP, true)}</div>
        <div className="storm-depth storm-near">{lapis(DESKTOP, false)}</div>
      </div>
      {/* layar kecil */}
      <div className="sm:hidden">
        <div className="storm-depth storm-far">{lapis(MOBILE, true)}</div>
        <div className="storm-depth storm-near">{lapis(MOBILE, false)}</div>
      </div>

      {/* tarikan pendek waktu produk ditambahkan */}
      {pulse > 0 && !reduce && (
        <div key={pulse} className="hidden sm:block">
          {PULL.map((i) => (
            <div
              key={i.s}
              className="storm-pull"
              style={{ left: `${i.x}%`, top: `${i.y}%`, "--dx": `${i.dx}px`, "--dy": `${i.dy}px` }}
            >
              <Chip item={i} />
            </div>
          ))}
        </div>
      )}

      {/* label rapi di titik kumpul */}
      <div
        className="absolute left-1/2 top-[14%] -translate-x-1/2 sm:left-[72%] sm:top-[8%]"
        style={{
          opacity: siap ? 1 : 0,
          transform: `translate(-50%, ${siap ? "0px" : "6px"})`,
          transition: "opacity 260ms ease-out, transform 260ms cubic-bezier(0.2,0,0,1)",
        }}
      >
        <span className="inline-flex items-center gap-1.5 rounded-full bg-espresso px-3 py-1.5 text-[11px] font-bold text-cream">
          <svg viewBox="0 0 20 20" className="size-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 10.5 8 14.5 16 6" />
          </svg>
          Order siap diproses
        </span>
      </div>
    </div>
  );
}
