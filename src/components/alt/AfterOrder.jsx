import { SectionHead } from "./Section";
import { AFTER } from "../../data/altContent";

// Satu visual: rekap harian di dashboard. Angkanya contoh.
function Rekap() {
  return (
    <div className="surface rounded-2xl p-4">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-[13px] font-bold">Rekap hari ini</p>
        <p className="text-[11px] text-espresso/80">Senin, 21:04</p>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-sand px-3 py-2.5">
          <p className="text-[11px] text-espresso/80">Order</p>
          <p className="display tnum text-[1.5rem] leading-tight">12</p>
        </div>
        <div className="rounded-xl bg-sand px-3 py-2.5">
          <p className="text-[11px] text-espresso/80">Masuk</p>
          <p className="display tnum text-[1.5rem] leading-tight text-coral-deep">
            Rp540.000
          </p>
        </div>
      </div>
      <ul className="mt-3">
        {[
          ["#0232", "Selesai", "Rp67.000"],
          ["#0231", "Selesai", "Rp45.000"],
          ["#0230", "Diproses", "Rp36.000"],
        ].map(([id, status, nominal]) => (
          <li
            key={id}
            className="flex items-center gap-2 border-t border-espresso/12 py-2 text-[12px]"
          >
            <span className="tnum font-bold text-espresso/80">{id}</span>
            <span
              className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${
                status === "Selesai"
                  ? "bg-mint text-mint-deep"
                  : "bg-sand text-espresso/85"
              }`}
            >
              {status}
            </span>
            <span className="tnum ml-auto font-bold">{nominal}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11px] text-espresso/80">Contoh tampilan.</p>
    </div>
  );
}

export default function AfterOrder() {
  return (
    <section id="setelah" className="px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl lg:grid lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-6">
          <SectionHead label={AFTER.title} title={AFTER.body} />
        </div>
        <div className="mt-8 lg:col-span-5 lg:col-start-8 lg:mt-0">
          <Rekap />
        </div>
      </div>
    </section>
  );
}
