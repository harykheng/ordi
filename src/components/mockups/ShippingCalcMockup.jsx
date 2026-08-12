import { useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

const SUGGESTIONS = [
  "Jl. Kemang Raya No. 12, Kemang, Jakarta Selatan",
  "Jl. Kemang Timur No. 8, Kemang, Jakarta Selatan",
  "Jl. Kemang Utara IX, Bangka, Jakarta Selatan",
];

export default function ShippingCalcMockup() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timers = [
      setTimeout(() => setStep(1), 500),
      setTimeout(() => setStep(2), 1600),
      setTimeout(() => setStep(3), 2400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <div
      ref={ref}
      className="rounded-2xl bg-paper-2 border-2 border-ink p-4 shadow-[6px_6px_0_0_var(--color-ink)] max-w-sm w-full"
    >
      <p className="font-display font-bold text-ink text-sm mb-3">
        Alamat Pengiriman
      </p>
      <div className="relative">
        <div className="rounded-lg bg-paper border border-ink/15 px-3 py-2 text-sm text-ink/80 min-h-[38px]">
          {step >= 1 ? "Jl. Kemang Ra" : ""}
          {step >= 1 && step < 2 && (
            <span className="inline-block w-[1px] h-3.5 bg-ink/60 ml-0.5 animate-pulse" />
          )}
          {step >= 2 && "ya No. 12, Kemang, Jakarta Selatan"}
        </div>
        {step === 1 && (
          <div className="absolute left-0 right-0 mt-1 rounded-lg bg-paper-2 border-2 border-ink shadow-lg overflow-hidden z-10">
            {SUGGESTIONS.map((s, i) => (
              <div
                key={s}
                className={`px-3 py-2 text-xs text-ink/70 ${
                  i === 0 ? "bg-blue/10 text-ink font-medium" : ""
                }`}
              >
                {s}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between rounded-lg bg-mint/40 border border-ink/10 px-3 py-2.5">
        <span className="text-sm text-ink/70">Ongkir ke lokasi kamu</span>
        {step >= 3 ? (
          <span className="font-mono-label text-sm text-rust font-semibold">
            Rp9.000
          </span>
        ) : (
          <span className="font-mono-label text-xs text-ink/30">
            menghitung…
          </span>
        )}
      </div>
      <p className="font-mono-label text-[10px] text-ink/40 mt-2">
        3.2 km dari Kopi Senja · estimasi 18 menit
      </p>
    </div>
  );
}
