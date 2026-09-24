/**
 * Stylized phone around the customer-flow screens, so visitors picture the
 * order page on their own phone. Drawn in the page's ink style (flat outline,
 * hard offset shadow, sketched notch and status bar), never a realistic
 * device render or a real screenshot: that look is Tokokit's (CLAUDE.md).
 * `url` fills the browser bar; `screenClassName` sizes the screen area.
 */
export default function PhoneFrame({ url, children, className = "", screenClassName = "" }) {
  return (
    <div className={`relative mx-auto w-full max-w-[330px] ${className}`} aria-hidden="true">
      <span className="absolute -left-[5px] top-[104px] h-9 w-[5px] rounded-l-[3px] border-2 border-r-0 border-ink bg-card" />
      <span className="absolute -left-[5px] top-[150px] h-14 w-[5px] rounded-l-[3px] border-2 border-r-0 border-ink bg-card" />
      <span className="absolute -right-[5px] top-[128px] h-20 w-[5px] rounded-r-[3px] border-2 border-l-0 border-ink bg-card" />

      <div className="rounded-[2.75rem] border-[2.5px] border-ink bg-card p-[9px] shadow-[6px_6px_0_0_var(--color-ink)]">
        <div className={`relative flex flex-col overflow-hidden rounded-[2.15rem] border-2 border-ink bg-card ${screenClassName}`}>
          <div className="shrink-0 bg-paper">
            <div className="relative flex h-10 items-center justify-between px-6 pt-1 font-mono-label text-[11.5px] font-semibold">
              <span>09.41</span>
              <span className="absolute left-1/2 top-2.5 h-[22px] w-[82px] -translate-x-1/2 rounded-full bg-ink" />
              <span className="flex items-center gap-1.5">
                <svg viewBox="0 0 17 11" className="h-[9px] w-auto fill-current">
                  <rect x="0" y="7" width="3" height="4" rx="0.8" />
                  <rect x="4.5" y="5" width="3" height="6" rx="0.8" />
                  <rect x="9" y="2.5" width="3" height="8.5" rx="0.8" />
                  <rect x="13.5" y="0" width="3" height="11" rx="0.8" />
                </svg>
                <svg viewBox="0 0 26 12" className="h-[11px] w-auto">
                  <rect x="0.75" y="0.75" width="21.5" height="10.5" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="2.75" y="2.75" width="14" height="6.5" rx="1.5" fill="currentColor" />
                  <path d="M24.5 4.2v3.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </div>
            <div className="border-b-2 border-ink px-3 pb-2.5 pt-1">
              <p className="flex items-center justify-center gap-1.5 truncate rounded-full border-[1.5px] border-ink/25 bg-card py-1.5 font-mono-label text-[11px]">
                <svg viewBox="0 0 10 12" className="h-[10px] w-auto shrink-0">
                  <rect x="0.75" y="5" width="8.5" height="6.25" rx="1.5" fill="currentColor" />
                  <path d="M2.5 5V3.5a2.5 2.5 0 0 1 5 0V5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                {url}
              </p>
            </div>
          </div>

          <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>

          <div className="flex shrink-0 justify-center bg-card pb-2 pt-3">
            <span className="h-[5px] w-28 rounded-full bg-ink" />
          </div>
        </div>
      </div>
    </div>
  );
}
