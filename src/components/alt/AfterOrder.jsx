import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { SectionHead } from "./Section";
import { useCountUp } from "../../lib/useCountUp";
import { DASHBOARD_BASE, rupiah } from "../../data/demoOrder";
import { AFTER } from "../../data/altContent";

// Satu visual: rekap harian di dashboard, keadaan sebelum order barunya masuk.
// Dua angkanya naik dari nol sekali saja waktu masuk layar. Angkanya contoh.
// Hitungannya mulai dari sore hari, bukan dari nol, jadi panelnya nggak
// pernah kebaca kosong walaupun ketahan sebentar sebelum masuk viewport.
const AWAL_ORDER = 9;
const AWAL_OMZET = 408000;

function Rekap({ jalan, reduce, innerRef }) {
  const order = useCountUp(DASHBOARD_BASE.orders, jalan, reduce ? 0 : 800, 1, AWAL_ORDER);
  const omzet = useCountUp(DASHBOARD_BASE.omzet, jalan, reduce ? 0 : 1000, 1000, AWAL_OMZET);

  return (
    <div ref={innerRef} className="surface rounded-2xl p-4">
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
            {rupiah(omzet)}
          </p>
        </div>
      </div>
      <ul className="mt-3">
        {DASHBOARD_BASE.rows.map((o) => (
          <li
            key={o.id}
            className="flex items-center gap-2 border-t border-espresso/12 py-2 text-[12px]"
          >
            <span className="tnum font-bold text-espresso/80">{o.id}</span>
            <span
              className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${
                o.status === "Selesai"
                  ? "bg-mint text-mint-deep"
                  : "bg-sand text-espresso/85"
              }`}
            >
              {o.status}
            </span>
            <span className="tnum ml-auto font-bold">{rupiah(o.nominal)}</span>
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
  const seen = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section id="akun-tokomu" className="px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl lg:grid lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-6">
          <SectionHead label={AFTER.title} title={AFTER.body} lead={AFTER.lead} />
        </div>
        <div className="mt-8 lg:col-span-5 lg:col-start-8 lg:mt-0">
          <Rekap innerRef={ref} jalan={seen || reduce} reduce={reduce} />
        </div>
      </div>
    </section>
  );
}
