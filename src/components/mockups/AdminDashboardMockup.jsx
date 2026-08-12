const ORDERS = [
  { id: "#0231", name: "Rani S.", total: 73000, status: "Diproses" },
  { id: "#0230", name: "Dimas P.", total: 46000, status: "Selesai" },
  { id: "#0229", name: "Fitri A.", total: 28000, status: "Selesai" },
];

export default function AdminDashboardMockup() {
  return (
    <div className="rounded-2xl bg-paper-2 border-2 border-ink p-4 shadow-[6px_6px_0_0_var(--color-ink)] max-w-sm w-full">
      <div className="flex items-center justify-between mb-3">
        <span className="font-display font-bold text-ink text-sm">
          Dashboard · Hari Ini
        </span>
        <span className="font-mono-label text-[10px] text-ink/40">
          21:00
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="rounded-lg bg-lilac/40 border border-ink/10 px-3 py-2">
          <p className="text-[11px] text-ink/50">Pesanan</p>
          <p className="font-mono-label text-lg text-ink">24</p>
        </div>
        <div className="rounded-lg bg-yellow/50 border border-ink/10 px-3 py-2">
          <p className="text-[11px] text-ink/50">Omzet</p>
          <p className="font-mono-label text-lg text-rust">Rp1.8jt</p>
        </div>
      </div>

      <div className="space-y-1.5">
        {ORDERS.map((o) => (
          <div
            key={o.id}
            className="flex items-center justify-between rounded-lg bg-paper border border-ink/10 px-3 py-2"
          >
            <div>
              <p className="text-xs text-ink/80">
                {o.id} · {o.name}
              </p>
              <p className="font-mono-label text-[10px] text-ink/40">
                Rp{o.total.toLocaleString("id-ID")}
              </p>
            </div>
            <span
              className={`font-mono-label text-[10px] rounded-full px-2 py-0.5 border ${
                o.status === "Selesai"
                  ? "text-mint-ok border-mint-ok/40"
                  : "text-ember border-ember/40"
              }`}
            >
              {o.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
