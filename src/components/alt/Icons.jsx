// Ikon garis tipis, satu gaya (stroke 1.6, rounded), biar nggak terasa
// kayak tempelan icon pack. Ukuran diatur lewat className dari pemanggil.
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function Svg({ children, className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      {children}
    </svg>
  );
}

export const IconStore = (p) => (
  <Svg {...p}>
    <path d="M3.5 9.5 5 4.5h14l1.5 5" />
    <path d="M4.5 9.5v9a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-9" />
    <path d="M3.5 9.5a2.5 2.5 0 0 0 4.25 1.8A2.5 2.5 0 0 0 12 11.3a2.5 2.5 0 0 0 4.25 0A2.5 2.5 0 0 0 20.5 9.5" />
  </Svg>
);

export const IconList = (p) => (
  <Svg {...p}>
    <path d="M8 7h12M8 12h12M8 17h8" />
    <path d="M4 7h.01M4 12h.01M4 17h.01" />
  </Svg>
);

export const IconTruck = (p) => (
  <Svg {...p}>
    <path d="M2.5 16V6.5h11V16" />
    <path d="M13.5 9.5h4l3 3.5V16h-7" />
    <circle cx="7" cy="17" r="1.8" />
    <circle cx="17" cy="17" r="1.8" />
  </Svg>
);

export const IconQr = (p) => (
  <Svg {...p}>
    <rect x="3.5" y="3.5" width="6" height="6" rx="1" />
    <rect x="14.5" y="3.5" width="6" height="6" rx="1" />
    <rect x="3.5" y="14.5" width="6" height="6" rx="1" />
    <path d="M14.5 14.5h2.5v2.5M20.5 20.5h-2.5V18M20.5 14.5h.01M14.5 20.5h.01" />
  </Svg>
);

export const IconBell = (p) => (
  <Svg {...p}>
    <path d="M6.5 9.5a5.5 5.5 0 0 1 11 0c0 4 1.5 5.5 1.5 5.5H5s1.5-1.5 1.5-5.5Z" />
    <path d="M10 18.5a2.2 2.2 0 0 0 4 0" />
  </Svg>
);

export const IconCheck = (p) => (
  <Svg {...p}>
    <path d="M4.5 12.5 9.5 17.5 19.5 6.5" />
  </Svg>
);

export const IconX = (p) => (
  <Svg {...p}>
    <path d="M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5" />
  </Svg>
);

export const IconArrowRight = (p) => (
  <Svg {...p}>
    <path d="M4.5 12h14" />
    <path d="M13.5 6.5 19 12l-5.5 5.5" />
  </Svg>
);

export const IconShield = (p) => (
  <Svg {...p}>
    <path d="M12 3.5 19 6v6c0 4-3 6.8-7 8.5-4-1.7-7-4.5-7-8.5V6l7-2.5Z" />
    <path d="M9.2 12.2 11.2 14.2 15 10.4" />
  </Svg>
);

export const IconChart = (p) => (
  <Svg {...p}>
    <path d="M4 19.5V4.5" />
    <path d="M4 19.5h16" />
    <path d="M8 16V11M12.5 16V7.5M17 16v-3.5" />
  </Svg>
);

export const IconCup = (p) => (
  <Svg {...p}>
    <path d="M5.5 8h11l-.9 9.2a2 2 0 0 1-2 1.8H8.4a2 2 0 0 1-2-1.8L5.5 8Z" />
    <path d="M16.3 10.5h1.7a2 2 0 0 1 0 4h-1.4" />
    <path d="M9 5c0-.8.8-1 .8-2M12.5 5c0-.8.8-1 .8-2" />
  </Svg>
);

export const IconBread = (p) => (
  <Svg {...p}>
    <path d="M4 12.5c0-3.3 3.6-5.5 8-5.5s8 2.2 8 5.5v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3Z" />
    <path d="M9 9.5c.8 1.5.8 3 0 4.5M14.5 9.5c.8 1.5.8 3 0 4.5" />
  </Svg>
);

export const IconBowl = (p) => (
  <Svg {...p}>
    <path d="M3.5 11h17a8.5 8.5 0 0 1-8.5 8 8.5 8.5 0 0 1-8.5-8Z" />
    <path d="M8 8c0-1.3 1-1.6 1-3M12 7.5c0-1.3 1-1.6 1-3M16 8c0-1.3 1-1.6 1-3" />
  </Svg>
);

export const IconBox = (p) => (
  <Svg {...p}>
    <path d="M12 3.5 20 7.5v9L12 20.5 4 16.5v-9L12 3.5Z" />
    <path d="M4 7.5 12 11.5l8-4M12 11.5v9" />
  </Svg>
);

export const IconWhatsApp = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
    <path d="M12.04 2.5c-5.25 0-9.5 4.25-9.5 9.5 0 1.67.44 3.3 1.27 4.74L2.5 21.5l4.9-1.28a9.46 9.46 0 0 0 4.64 1.2h.01c5.24 0 9.5-4.26 9.5-9.5s-4.26-9.42-9.51-9.42Zm0 17.08h-.01a7.9 7.9 0 0 1-4.02-1.1l-.29-.17-2.91.76.78-2.84-.19-.29a7.87 7.87 0 0 1-1.21-4.19c0-4.36 3.55-7.9 7.91-7.9a7.86 7.86 0 0 1 7.9 7.91c0 4.36-3.55 7.82-7.96 7.82Zm4.34-5.86c-.24-.12-1.41-.7-1.63-.78-.22-.08-.38-.12-.54.12s-.62.78-.76.94c-.14.16-.28.18-.52.06a6.47 6.47 0 0 1-1.91-1.18 7.2 7.2 0 0 1-1.33-1.65c-.14-.24-.01-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.46-.39-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.39 1.37.5.57.19 1.1.16 1.51.1.46-.07 1.41-.58 1.61-1.13.2-.55.2-1.03.14-1.13-.06-.1-.22-.16-.46-.28Z" />
  </svg>
);
