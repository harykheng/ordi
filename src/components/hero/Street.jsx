import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// A row of small shops. The one marked `you` carries the current example
// store's name and awning colour (via the --awn custom property).
const SHOPS = [
  { n: "Kopi", w: 112, h: 120, c: "#2E7D5B", wall: "#F3E1C8" },
  { n: "Roti", w: 128, h: 140, c: "#FF7A2F", wall: "#F7E9D6" },
  { n: "Mie", w: 104, h: 116, c: "#B83560", wall: "#EFDCC4" },
  { n: "Kue", w: 124, h: 134, c: "#E0A21B", wall: "#F5E4CF" },
  { n: "Sate", w: 108, h: 122, c: "#5B3A29", wall: "#F2DEC6" },
  { n: "Bakso", w: 112, h: 124, c: "#B04A12", wall: "#F1DDC5" },
  { n: "", w: 170, h: 160, you: true, wall: "#FFF8EE" },
  { n: "Katering", w: 132, h: 138, c: "#2A6FB0", wall: "#F6E6D2" },
  { n: "Es Teh", w: 106, h: 118, c: "#2E7D5B", wall: "#F6E7D4" },
  { n: "Frozen", w: 122, h: 132, c: "#7A4FB3", wall: "#F2E0CA" },
  { n: "Warung", w: 118, h: 128, c: "#FF7A2F", wall: "#F5E3CC" },
  { n: "Kue PO", w: 120, h: 130, c: "#B83560", wall: "#F0DCC3" },
];
const GROUND = 172;
const HEIGHT = 214;
const GAP = 8;
const MARGIN = 20;
const YOU = SHOPS.findIndex((s) => s.you);

function scallop(x, y, w, h, n) {
  const s = w / n;
  let d = `M${x},${y} L${x + w},${y} L${x + w},${y + h}`;
  for (let i = n - 1; i >= 0; i--) d += ` A${(s / 2).toFixed(2)},${(s * 0.4).toFixed(2)} 0 0 1 ${(x + i * s).toFixed(2)},${y + h}`;
  return `${d} Z`;
}

/**
 * The hero's playground (Ordi's take on Camemo's flower garden): moving a
 * cursor or finger along the street switches shop lights on, flaps the
 * awnings and flips TUTUP to BUKA. Lights go off again after a moment,
 * except for "your" shop.
 */
export default function Street({ storeName, active }) {
  const layout = useMemo(() => {
    let x = MARGIN;
    return SHOPS.map((s) => {
      const placed = { ...s, x };
      x += s.w + GAP;
      return placed;
    });
  }, []);
  const total = MARGIN * 2 + SHOPS.reduce((a, s) => a + s.w, 0) + GAP * (SHOPS.length - 1);

  const [lit, setLit] = useState(() => new Set([YOU]));
  const offTimers = useRef({});
  const morning = useRef([]);
  const opened = useRef(false);
  const last = useRef(-1);
  const svgRef = useRef(null);

  const light = useCallback((i) => {
    setLit((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));
    clearTimeout(offTimers.current[i]);
    if (i !== YOU) {
      offTimers.current[i] = setTimeout(() => {
        setLit((prev) => {
          const next = new Set(prev);
          next.delete(i);
          return next;
        });
      }, 2800);
    }
  }, []);

  // First time the street is on screen: shops open one by one, left to right.
  useEffect(() => {
    if (!active || opened.current) return;
    opened.current = true;
    morning.current = layout.map((_, i) => setTimeout(() => light(i), 300 + i * 120));
  }, [active, layout, light]);

  useEffect(
    () => () => {
      morning.current.forEach(clearTimeout);
      Object.values(offTimers.current).forEach(clearTimeout);
    },
    [],
  );

  const onPointer = (e) => {
    const svg = svgRef.current;
    const m = svg?.getScreenCTM();
    if (!m) return;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const p = pt.matrixTransform(m.inverse());
    const i = layout.findIndex((s) => p.x >= s.x - 4 && p.x <= s.x + s.w + 4);
    if (i >= 0 && i !== last.current) {
      last.current = i;
      light(i);
    }
  };

  return (
    <svg
      ref={svgRef}
      className="street block h-[170px] w-full touch-pan-y sm:h-[210px]"
      viewBox={`0 0 ${total} ${HEIGHT}`}
      preserveAspectRatio="xMidYMax slice"
      onPointerMove={onPointer}
      onPointerDown={onPointer}
      role="img"
      aria-label="Deretan ruko. Toko yang dilewati kursor atau jari menyalakan lampunya."
    >
      <defs>
        {layout.map((s, i) => (
          <pattern key={i} id={`awn-${i}`} width="14" height="10" patternUnits="userSpaceOnUse">
            <rect width="7" height="10" style={{ fill: s.you ? "var(--awn)" : s.c }} />
            <rect x="7" width="7" height="10" fill="#FFF8EE" />
          </pattern>
        ))}
      </defs>
      <rect x="0" y={GROUND} width={total} height="20" fill="#EED8BC" stroke="#241A10" strokeWidth="2" />
      <rect x="0" y={GROUND + 20} width={total} height={HEIGHT - GROUND - 20} fill="#E3CBAA" />
      {Array.from({ length: Math.ceil(total / 46) }, (_, k) => (
        <rect key={k} x={k * 46 + 10} y={GROUND + 31} width="24" height="3" rx="1.5" fill="#fff" opacity="0.7" />
      ))}
      {layout.map((s, i) => {
        const dx = Math.round(s.w * 0.63);
        const dw = Math.round(s.w * 0.27);
        return (
          <g
            key={i}
            transform={`translate(${s.x},${GROUND - s.h})`}
            className={`shop${s.you ? " you" : ""}${lit.has(i) ? " on" : ""}`}
          >
            <ellipse className="glow" cx={s.w * 0.32} cy={s.h + 10} rx={s.w * 0.42} ry="9" />
            <rect x="-3" y="-5" width={s.w + 6} height="8" rx="2" fill="#E6CDAB" stroke="#241A10" strokeWidth="2" />
            <rect className="wall" x="0" y="0" width={s.w} height={s.h} rx="2" fill={s.wall} />
            <rect className="brd" x="8" y="9" width={s.w - 16} height="22" rx="5" />
            <text className="brd-t" x={s.w / 2} y="24.5" textAnchor="middle" style={s.you ? { fontSize: 12 } : undefined}>
              {s.you ? storeName : s.n}
            </text>
            <g className="awn">
              <path d={scallop(-4, 37, s.w + 8, 13, Math.max(5, Math.round((s.w + 8) / 16)))} fill={`url(#awn-${i})`} />
            </g>
            <rect className="win" x="10" y="62" width={Math.round(s.w * 0.5)} height={s.h - 78} rx="3" />
            <rect className="door" x={dx} y="60" width={dw} height={s.h - 60} rx="2" />
            <rect className="tag" x={dx + 3} y="70" width={dw - 6} height="12" rx="2" />
            <text className="tag-t t" x={dx + dw / 2} y="79" textAnchor="middle">
              TUTUP
            </text>
            <text className="tag-t b" x={dx + dw / 2} y="79" textAnchor="middle">
              BUKA
            </text>
          </g>
        );
      })}
    </svg>
  );
}
