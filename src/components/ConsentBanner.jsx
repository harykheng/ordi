import { useState, useEffect } from "react";

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const choice = localStorage.getItem("ordi-cookie-consent");
    if (!choice) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("ordi-cookie-consent", "granted");
    window.gtag?.("consent", "update", { analytics_storage: "granted" });
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("ordi-cookie-consent", "denied");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-ink bg-paper px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p className="text-ink/70 text-xs sm:text-sm max-w-lg">
        Situs ini pakai cookie analytics buat ngerti gimana pengunjung
        pakai halaman ini. Lanjut pakai = kamu setuju.
      </p>
      <div className="flex gap-2 shrink-0">
        <button
          onClick={handleDecline}
          className="rounded-full border-2 border-ink px-4 py-2 text-xs sm:text-sm font-semibold text-ink hover:bg-ink hover:text-paper transition-colors"
        >
          Nolak
        </button>
        <button
          onClick={handleAccept}
          className="rounded-full bg-ink px-4 py-2 text-xs sm:text-sm font-semibold text-paper hover:bg-ink/85 transition-colors"
        >
          Oke, Lanjut
        </button>
      </div>
    </div>
  );
}
