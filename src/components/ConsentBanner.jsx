import { useEffect, useState } from "react";

// index.html reads the same key to set gtag's consent default before the
// first hit. Opt-out model (Hary's call): analytics is on unless the visitor
// clicked "Nolak" before, so the very first page_view is always counted.
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
    /* storage blocked: the notice just closes for this visit */
  }
}

/** Drop GA's cookies after an opt-out; they sit on the host or a parent domain. */
function clearGaCookies() {
  const names = document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((n) => n === "_ga" || n.startsWith("_ga_"));
  const parts = location.hostname.split(".");
  for (const name of names) {
    document.cookie = `${name}=; Max-Age=0; path=/`;
    for (let i = 0; i < parts.length - 1; i++) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${parts.slice(i).join(".")}`;
    }
  }
}

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!readChoice()) setVisible(true);
  }, []);

  const handleOk = () => {
    saveChoice("granted");
    window.gtag?.("event", "consent_choice", { choice: "granted" });
    setVisible(false);
  };

  const handleDecline = () => {
    saveChoice("denied");
    window.gtag?.("consent", "update", { analytics_storage: "denied" });
    // storage is denied from here on, so Consent Mode sends this one without
    // cookies; decline volume isn't visible in GA4 reports, only "Oke" is
    window.gtag?.("event", "consent_choice", { choice: "denied" });
    clearGaCookies();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Pemberitahuan cookie"
      className="card-ink fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-2xl flex-col items-center gap-3 p-4 sm:flex-row sm:justify-between"
    >
      <p className="text-xs text-ink-2 sm:text-sm">
        Situs ini pakai Google Analytics buat ngerti gimana halaman ini dipakai. Nggak mau dicatat? Klik Nolak.
      </p>
      <div className="flex shrink-0 gap-2">
        <button type="button" onClick={handleDecline} className="btn btn-secondary btn-sm">
          Nolak
        </button>
        <button type="button" onClick={handleOk} className="btn btn-sm bg-ink text-paper hover:bg-ink/85">
          Oke
        </button>
      </div>
    </div>
  );
}
