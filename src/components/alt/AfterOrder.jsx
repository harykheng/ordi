import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { SectionHead } from "./Section";
import { useCountUp } from "../../lib/useCountUp";
import { AFTER } from "../../data/altContent";

const RIWAYAT = [
  ["#0232", "Selesai", "Rp67.000"],
  ["#0231", "Selesai", "Rp45.000"],
  ["#0230", "Diproses", "Rp36.000"],
];

// Satu visual: rekap harian di dashboard. Dua angkanya naik dari nol sekali
// saja waktu masuk layar. Angkanya contoh.
function Rekap({ jalan, reduce }) {
  const order = useCountUp(12, jalan, reduce ? 0 : 800);
  const omzet = useCountUp(540000, jalan, reduce ? 0 : 1000);

  return (
    <div className="surface rounded-2xl p-4">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-[13px] font-bold">Rekap hari ini</p>
        <p className="text-[11px] text-espresso/80">Senin, 21:04</p>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-sand px-3 py-2.5">
          <p className="text-[11px] text-espresso/80">Order</p>
          <p className="display tnum text-[1.5rem] leading-tight">{order}</p>
        </div>
        <div className="rounded-xl bg-sand px-3 py-2.5">
          <p className="text-[11px] text-espresso/80">Masuk</p>
          <p className="display tnum text-[1.5rem] leading-tight text-coral-deep">
            Rp{omzet.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
      <ul className="mt-3">
        {RIWAYAT.map(([id, status, nominal]) => (
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
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section id="setelah" className="px-5 py-16 sm:py-20">
      <div
        ref={ref}
        className="mx-auto max-w-5xl lg:grid lg:grid-cols-12 lg:items-center lg:gap-12"
      >
        <div className="lg:col-span-6">
          <SectionHead label={AFTER.title} title={AFTER.body} />
        </div>
        <div className="mt-8 lg:col-span-5 lg:col-start-8 lg:mt-0">
          <Rekap jalan={seen || reduce} reduce={reduce} />
        </div>
      </div>
    </section>
  );
}
