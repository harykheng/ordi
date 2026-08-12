const ITEMS = [
  { name: "Kopi Susu Gula Aren", variant: "Reg · Es", price: 18000, stock: true },
  { name: "Americano", variant: "Large · Es", price: 20000, stock: true },
  { name: "Nasi Ayam Geprek", variant: "Level 2", price: 28000, stock: true },
  { name: "Mie Goreng Spesial", variant: "Pedas", price: 25000, stock: false },
];

export default function CatalogMockup() {
  return (
    <div className="rounded-2xl bg-char border border-paper/10 p-4 shadow-xl max-w-sm w-full">
      <div className="flex items-center justify-between mb-3">
        <span className="font-display font-bold text-paper text-sm">
          Katalog · Kopi Senja
        </span>
        <span className="font-mono-label text-[10px] text-mint-ok">
          ● live 24 jam
        </span>
      </div>
      <div className="space-y-2">
        {ITEMS.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-lg bg-ink/40 px-3 py-2"
          >
            <div>
              <p className="text-sm text-paper/90 leading-tight">{item.name}</p>
              <p className="text-[11px] text-paper/40">{item.variant}</p>
            </div>
            <div className="text-right">
              <p className="font-mono-label text-xs text-paper/80">
                Rp{item.price.toLocaleString("id-ID")}
              </p>
              <p
                className={`font-mono-label text-[10px] ${
                  item.stock ? "text-mint-ok" : "text-rust"
                }`}
              >
                {item.stock ? "tersedia" : "habis"}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-3 w-full rounded-full bg-ember/90 text-ink text-sm font-semibold py-2">
        Lihat Keranjang (2)
      </button>
    </div>
  );
}
