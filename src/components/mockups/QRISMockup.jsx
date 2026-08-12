export default function QRISMockup() {
  return (
    <div className="rounded-2xl bg-paper-2 border-2 border-ink p-4 shadow-[6px_6px_0_0_var(--color-ink)] max-w-sm w-full">
      <div className="flex items-center justify-between mb-3">
        <span className="font-display font-bold text-ink text-sm">
          Bayar QRIS
        </span>
        <span className="font-mono-label text-[10px] text-ink/40">
          exp 09:58
        </span>
      </div>

      <div className="rounded-xl bg-paper border-2 border-ink/10 p-4 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-36 h-36" aria-hidden="true">
          <rect width="100" height="100" fill="#F7F2EA" />
          {Array.from({ length: 10 }).map((_, row) =>
            Array.from({ length: 10 }).map((_, col) => {
              const seed = (row * 7 + col * 13) % 5;
              if (seed === 0) return null;
              return (
                <rect
                  key={`${row}-${col}`}
                  x={col * 10}
                  y={row * 10}
                  width="9"
                  height="9"
                  fill="#141110"
                />
              );
            })
          )}
          <rect x="0" y="0" width="22" height="22" fill="#141110" />
          <rect x="4" y="4" width="14" height="14" fill="#F7F2EA" />
          <rect x="8" y="8" width="6" height="6" fill="#141110" />
          <rect x="78" y="0" width="22" height="22" fill="#141110" />
          <rect x="82" y="4" width="14" height="14" fill="#F7F2EA" />
          <rect x="86" y="8" width="6" height="6" fill="#141110" />
          <rect x="0" y="78" width="22" height="22" fill="#141110" />
          <rect x="4" y="82" width="14" height="14" fill="#F7F2EA" />
          <rect x="8" y="86" width="6" height="6" fill="#141110" />
        </svg>
      </div>

      <div className="mt-3 text-center">
        <p className="text-xs text-ink/50">Total Pembayaran</p>
        <p className="font-mono-label text-xl text-ember-deep font-semibold">
          Rp73.000
        </p>
      </div>
      <p className="font-mono-label text-[10px] text-ink/40 mt-3 text-center leading-relaxed">
        Nominal ke-generate otomatis sesuai pesanan.
        <br />
        Verifikasi pembayaran tetap manual by admin.
      </p>
    </div>
  );
}
