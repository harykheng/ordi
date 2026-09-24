import { useEffect, useState } from "react";

const KEY = "ordi-cookie-consent";

function readChoice() {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return "unavailable";
  }
}

function saveChoice(value) {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    /* storage blocked: the banner just closes for this visit */
  }
}

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!readChoice()) setVisible(true);
  }, []);

  const handleAccept = () => {
    saveChoice("granted");
    window.gtag?.("consent", "update", { analytics_storage: "granted" });
    window.gtag?.("event", "consent_choice", { choice: "granted" });
    setVisible(false);
  };

  const handleDecline = () => {
    saveChoice("denied");
    // storage stays denied, so Consent Mode drops this hit client-side —
    // decline count isn't observable in GA4, only accept volume is
    window.gtag?.("event", "consent_choice", { choice: "denied" });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Persetujuan cookie"
      className="card-ink fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-2xl flex-col items-center gap-3 p-4 sm:flex-row sm:justify-between"
    >
      <p className="text-xs text-ink-2 sm:text-sm">
        Situs ini pakai cookie analytics buat ngerti gimana pengunjung pakai halaman ini. Lanjut pakai = kamu setuju.
      </p>
      <div className="flex shrink-0 gap-2">
        <button type="button" onClick={handleDecline} className="btn btn-secondary btn-sm">
          Nolak
        </button>
        <button type="button" onClick={handleAccept} className="btn btn-sm bg-ink text-paper hover:bg-ink/85">
          Oke, Lanjut
        </button>
      </div>
    </div>
  );
}
