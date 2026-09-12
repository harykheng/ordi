// Primitif "cetakan": tepi kertas sobek, stempel tinta, garis, dan coretan
// tangan. Semuanya SVG inline, nggak ada aset eksternal.

// Tepi sobek dibangkitkan sekali dengan PRNG ber-seed, jadi bentuknya tetap
// sama tiap render tapi tetap nggak beraturan seperti kertas asli.
function deckle(seed, width = 1200, amp = 9) {
  let s = seed;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  let x = 0;
  let d = `M0,26 L0,${(11 + rnd() * amp).toFixed(1)}`;
  while (x < width) {
    const step = 16 + rnd() * 30;
    const prev = x;
    x = Math.min(width, x + step);
    const y = 4 + rnd() * amp * 1.7;
    const cy = y + (rnd() * 8 - 4);
    d += ` Q${((prev + x) / 2).toFixed(1)},${cy.toFixed(1)} ${x.toFixed(1)},${y.toFixed(1)}`;
  }
  return `${d} L${width},26 Z`;
}

const EDGE_TOP = deckle(13);
const EDGE_BOTTOM = deckle(91);

export function TornEdge({ side = "top", fill = "var(--color-cream)", className = "" }) {
  const bottom = side === "bottom";
  return (
    <svg
      viewBox="0 0 1200 26"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 h-[18px] w-full ${
        bottom ? "bottom-0 rotate-180" : "top-0"
      } ${className}`}
    >
      <path d={bottom ? EDGE_BOTTOM : EDGE_TOP} fill={fill} />
    </svg>
  );
}

export function Kicker({ children, className = "" }) {
  return <p className={`kicker ${className}`}>{children}</p>;
}

// Garis rambut editorial, opsional dengan angka bagian di ujung kiri.
export function Rule({ n, label, className = "", tone = "espresso" }) {
  const line = tone === "cream" ? "bg-cream/25" : "bg-espresso/20";
  const text = tone === "cream" ? "text-cream/70" : "text-espresso/80";
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {n && <span className={`kicker shrink-0 ${text}`}>{n}</span>}
      {label && <span className={`kicker min-w-0 ${text}`}>{label}</span>}
      <span className={`h-px min-w-8 flex-1 ${line}`} />
    </div>
  );
}

export function Stamp({ children, className = "", rotate = -7 }) {
  return (
    <span
      className={`stamp ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
}

// Coretan garis bawah, digambar tangan, bukan border rapi.
export function InkStroke({ className = "", color = "text-coral" }) {
  return (
    <svg
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`absolute left-0 w-full ${color} ${className}`}
    >
      <path
        d="M3 8.5C32 4.2 61 9.6 92 6.4c26-2.7 52 3.1 78 .6"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M10 11c34-2.6 63 1.8 96-.7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
}

// Tanda coret buat baris "sebelum" di ledger.
export function StrikeThrough({ className = "" }) {
  return (
    <svg
      viewBox="0 0 200 8"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 top-1/2 w-full -translate-y-1/2 text-coral ${className}`}
    >
      <path
        d="M2 5.4C40 2.8 78 6 116 3.4c28-1.9 55 2.2 82 .4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}
