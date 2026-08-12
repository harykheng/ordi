const ORDERS = [
  { id: "#0231", name: "Rani S.", total: 73000, status: "Diproses" },
  { id: "#0230", name: "Dimas P.", total: 46000, status: "Selesai" },
  { id: "#0229", name: "Fitri A.", total: 28000, status: "Selesai" },
];

export default function AdminDashboardMockup() {
  return (
    <div className="rounded-2xl bg-char border border-paper/10 p-4 shadow-xl max-w-sm w-full">
      <div className="flex items-center justify-between mb-3">
        <span className="font-display font-bold text-paper text-sm">
          Dashboard · Hari Ini
        </span>
        <span className="font-mono-label text-[10px] text-paper/40">
          21:00
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="rounded-lg bg-ink/40 px-3 py-2">
          <p className="text-[11px] text-paper/40">Pesanan</p>
          <p className="font-mono-label text-lg text-paper">24</p>
        </div>
        <div className="rounded-lg bg-ink/40 px-3 py-2">
          <p className="text-[11px] text-paper/40">Omzet</p>
          <p className="font-mono-label text-lg text-ember">Rp1.8jt</p>
        </div>
      </div>

      <div className="space-y-1.5">
        {ORDERS.map((o) => (
          <div
            key={o.id}
            className="flex items-center justify-between rounded-lg bg-ink/30 px-3 py-2"
          >
            <div>
              <p className="text-xs text-paper/80">
                {o.id} · {o.name}
              </p>
              <p className="font-mono-label text-[10px] text-paper/40">
                Rp{o.total.toLocaleString("id-ID")}
              </p>
            </div>
            <span
              className={`font-mono-label text-[10px] rounded-full px-2 py-0.5 ${
                o.status === "Selesai"
                  ? "text-mint-ok border border-mint-ok/30"
                  : "text-ember border border-ember/30"
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
