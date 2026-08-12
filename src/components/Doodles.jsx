export function Star({ className = "", color = "text-ember" }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={`doodle w-6 h-6 ${color} ${className}`}
      aria-hidden="true"
    >
      <path d="M20 3 L23 17 L37 20 L23 23 L20 37 L17 23 L3 20 L17 17 Z" />
    </svg>
  );
}

export function Sparkle({ className = "", color = "text-blue" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`doodle w-4 h-4 ${color} ${className}`}
      aria-hidden="true"
    >
      <path d="M12 2v20M2 12h20" />
    </svg>
  );
}

export function Squiggle({ className = "", color = "text-ink/40" }) {
  return (
    <svg
      viewBox="0 0 80 20"
      className={`doodle w-16 h-4 ${color} ${className}`}
      aria-hidden="true"
    >
      <path d="M2 15 Q 12 3, 22 15 T 42 15 T 62 15 T 78 8" />
    </svg>
  );
}

export function ArrowSwoosh({ className = "", color = "text-ink" }) {
  return (
    <svg
      viewBox="0 0 60 40"
      className={`doodle w-12 h-8 ${color} ${className}`}
      aria-hidden="true"
    >
      <path d="M4 6 C 30 2, 52 10, 50 26" />
      <path d="M42 20 L50 26 L44 33" />
    </svg>
  );
}

export function Spiral({ className = "", color = "text-ink/50" }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={`doodle w-7 h-7 ${color} ${className}`}
      aria-hidden="true"
    >
      <path d="M20 26c-6 0-9-4-9-8s3-9 9-9 11 5 11 12-6 14-15 14-17-7-17-16" />
    </svg>
  );
}

export function CircleUnderline({ className = "", color = "text-coral" }) {
  return (
    <svg
      viewBox="0 0 120 20"
      className={`doodle w-full h-3 ${color} ${className}`}
      aria-hidden="true"
    >
      <path d="M2 12 Q 30 2, 60 10 T 118 8" />
    </svg>
  );
}
