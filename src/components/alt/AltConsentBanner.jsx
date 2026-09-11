import { useState, useEffect } from "react";

export default function AltConsentBanner({ onResolve }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const choice = localStorage.getItem("ordi-cookie-consent");
    if (choice) onResolve?.();
    else setVisible(true);
  }, [onResolve]);

  const resolve = (choice) => {
    localStorage.setItem("ordi-cookie-consent", choice);
    if (choice === "granted") {
      window.gtag?.("consent", "update", { analytics_storage: "granted" });
    }
    // storage tetap denied kalau nolak, jadi hit-nya di-drop client-side —
    // cuma jumlah "granted" yang keliatan di GA4
    window.gtag?.("event", "consent_choice", { choice });
    setVisible(false);
    onResolve?.();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-espresso/15 bg-cream px-5 py-4">
      <div
        className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-3 sm:flex-row"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <p className="max-w-lg text-[13px] leading-relaxed text-espresso/85">
          Halaman ini pakai cookie analytics buat ngerti gimana pengunjung
          makai halamannya. Lanjut pakai berarti kamu setuju.
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => resolve("denied")}
            className="rounded-full border border-espresso/25 px-4 py-2 text-[13px] font-semibold text-espresso transition-colors hover:bg-espresso hover:text-cream"
          >
            Nolak
          </button>
          <button
            onClick={() => resolve("granted")}
            className="rounded-full bg-espresso px-4 py-2 text-[13px] font-semibold text-cream transition-colors hover:bg-bean"
          >
            Oke, Lanjut
          </button>
        </div>
      </div>
    </div>
  );
}
