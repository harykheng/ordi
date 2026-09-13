// Ilustrasi produk bergaya cetak: duotone espresso/latte plus raster
// halftone, seperti gambar di menu cetakan. Ini pengganti foto, karena repo
// belum punya aset foto produk dan domain demo diblokir dari lingkungan
// build. Kalau nanti foto asli ada, tukar isi file ini saja, pemanggilnya
// (OrderSim) nggak perlu diubah.

function Halftone({ id, size = 5, r = 1.05 }) {
  return (
    <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
      <circle cx={r + 0.5} cy={r + 0.5} r={r} fill="var(--color-espresso)" opacity="0.45" />
    </pattern>
  );
}

const box = "h-full w-full";
const ink = "var(--color-espresso)";
const latte = "var(--color-latte)";
const cream = "var(--color-cream)";
const card = "var(--color-card)";

export function ArtKopi({ className = "" }) {
  return (
    <svg viewBox="0 0 120 120" className={`${box} ${className}`} aria-hidden="true">
      <defs>
        <Halftone id="ht-kopi" />
      </defs>
      <rect width="120" height="120" fill={latte} opacity="0.2" />
      <ellipse cx="63" cy="66" rx="45" ry="44" fill="url(#ht-kopi)" opacity="0.45" />
      {/* lepek */}
      <circle cx="58" cy="60" r="45" fill={cream} stroke={ink} strokeWidth="2.2" />
      <circle cx="58" cy="60" r="38" fill="none" stroke={ink} strokeWidth="1" opacity="0.3" />
      {/* telinga cangkir */}
      <path d="M92 50c11-2 16 5 16 11s-5 13-16 11" fill={card} stroke={ink} strokeWidth="2.2" />
      <path d="M94 57c5-1 8 2 8 5s-3 6-8 5" fill="none" stroke={ink} strokeWidth="1.2" opacity="0.45" />
      {/* cangkir */}
      <circle cx="58" cy="60" r="32" fill={card} stroke={ink} strokeWidth="2.2" />
      {/* kopi */}
      <circle cx="58" cy="60" r="26" fill={ink} />
      <circle cx="58" cy="60" r="26" fill={latte} opacity="0.42" />
      {/* rosetta latte art */}
      <path d="M58 37c6 6 8 13 7 19-1 7-4 12-7 19-3-7-6-12-7-19-1-6 1-13 7-19Z" fill={cream} opacity="0.94" />
      <path d="M58 41v33" stroke={latte} strokeWidth="1.3" opacity="0.85" />
      <path
        d="M49 50c5 3 13 3 18 0M47 58c6 3 16 3 22 0M49 66c5 2 13 2 18 0M52 72c3 1 9 1 12 0"
        stroke={latte}
        strokeWidth="1.2"
        fill="none"
        opacity="0.8"
      />
      {/* uap tipis */}
      <path d="M44 22c3 4 0 7 2 11M58 18c3 4 0 7 2 11M72 22c3 4 0 7 2 11" stroke={ink} strokeWidth="1.6" fill="none" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

export function ArtCroissant({ className = "" }) {
  // Bentuk sabit gemuk di tengah dengan ujung meruncing dan lipatan
  // diagonal. Lipatannya yang bikin kebaca croissant, bukan cuma gundukan.
  const body =
    "M14 78c-4-17 8-34 27-38 7-2 13-2 19 0 6-2 12-2 19 0 19 4 31 21 27 38-2 8-9 11-15 8-4-2-5-6-4-10-5 3-11 3-16 0-2 5-7 8-13 8-5 0-9-3-11-8-5 3-11 3-16 0 1 4 0 8-4 10-6 3-13 0-15-8Z";
  return (
    <svg viewBox="0 0 120 120" className={`${box} ${className}`} aria-hidden="true">
      <defs>
        <Halftone id="ht-roti" size={4.6} r={0.95} />
      </defs>
      <rect width="120" height="120" fill={latte} opacity="0.16" />
      <g transform="translate(0,6)">
        <path d={body} fill="url(#ht-roti)" opacity="0.55" />
        <path d={body} fill={latte} fillOpacity="0.62" stroke={ink} strokeWidth="2.2" strokeLinejoin="round" />
        {/* lipatan */}
        <path
          d="M35 47c-2 9-2 19 1 27M49 41c-1 11-1 22 1 31M71 41c1 11 1 22-1 31M85 47c2 9 2 19-1 27"
          stroke={ink}
          strokeWidth="1.7"
          fill="none"
          opacity="0.6"
          strokeLinecap="round"
        />
        <path d="M60 39v34" stroke={ink} strokeWidth="1.9" fill="none" opacity="0.5" strokeLinecap="round" />
        {/* kilap kerak */}
        <path d="M46 46c8-4 20-4 28 0" stroke={cream} strokeWidth="2.4" fill="none" opacity="0.55" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function ArtGeprek({ className = "" }) {
  return (
    <svg viewBox="0 0 120 120" className={`${box} ${className}`} aria-hidden="true">
      <defs>
        <Halftone id="ht-geprek" size={4.6} r={0.95} />
      </defs>
      <rect width="120" height="120" fill={latte} opacity="0.18" />
      <circle cx="62" cy="63" r="45" fill="url(#ht-geprek)" opacity="0.4" />
      {/* piring */}
      <circle cx="60" cy="60" r="45" fill={card} stroke={ink} strokeWidth="2.2" />
      <circle cx="60" cy="60" r="37" fill="none" stroke={ink} strokeWidth="1" opacity="0.3" />
      {/* nasi */}
      <path
        d="M26 62c-1-12 9-21 21-20 9 1 15 7 15 16 0 8-6 14-16 15-11 1-19-3-20-11Z"
        fill={cream}
        stroke={ink}
        strokeWidth="1.8"
      />
      <path d="M36 52c3-2 6-3 9-2M33 62c4-1 8 0 11 2M45 68c3-1 7-1 10 1" stroke={ink} strokeWidth="1.1" fill="none" opacity="0.4" strokeLinecap="round" />
      {/* ayam goreng, tepinya sengaja bergerigi biar kebaca kriuk */}
      <path
        d="M60 76c-3-9 3-17 11-20 5-2 8 1 11-1 4-3 9-1 11 3 2 4 6 4 7 9 1 6-3 9-7 11-3 2-3 6-7 7-5 2-9-1-13-1-5 0-11-2-13-8Z"
        fill={latte}
        stroke={ink}
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path d="M70 70c2 2 5 2 8 1M68 80c4 1 9 2 13 1M80 62c2 3 2 6 1 9" stroke={ink} strokeWidth="1.1" fill="none" opacity="0.45" strokeLinecap="round" />
      {/* sambal dan cabai */}
      <path d="M30 84c5-5 13-5 17-1 3 4 1 9-5 10-7 1-15-4-12-9Z" fill="var(--color-coral)" opacity="0.9" />
      <path d="M25 76c5 1 9 3 12 6" stroke="var(--color-coral)" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <circle cx="38" cy="88" r="1.2" fill={ink} opacity="0.55" />
      <circle cx="43" cy="85" r="1.2" fill={ink} opacity="0.55" />
    </svg>
  );
}
