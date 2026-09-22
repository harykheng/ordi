import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { SectionHead } from "./Section";
import { CONTOH_ORDER, rupiah } from "../../data/demoOrder";
import { WHEN } from "../../data/altContent";

const STATUS = ["Baru", "Diproses", "Selesai"];

// Satu visual: kartu order yang kamu terima. Statusnya jalan sekali waktu
// section ini masuk layar, biar kebaca sebagai order yang berjalan, bukan
// gambar mati. Angkanya contoh.
function KartuOrder({ status, reduce }) {
  return (
    <div className="surface rounded-2xl p-4">
      <div className="flex items-baseline justify-between gap-2">
        <span className="tnum text-[13px] font-bold text-coral-deep">
          {CONTOH_ORDER.id}
        </span>
        <span className="relative inline-flex">
          <motion.span
            key={status}
            initial={reduce ? false : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
              status === 2 ? "bg-mint text-mint-deep" : "bg-coral text-cream"
            }`}
          >
            {STATUS[status]}
          </motion.span>
        </span>
      </div>
      <p className="mt-2 text-[14px] font-semibold">{CONTOH_ORDER.ringkas}</p>
      <p className="mt-2 flex items-center gap-1.5 text-[13px] text-espresso/85">
        <svg
          viewBox="0 0 24 24"
          className="size-4 shrink-0"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
          <circle cx="12" cy="10" r="2.4" />
        </svg>
        {CONTOH_ORDER.zone.label}, {CONTOH_ORDER.zone.jarak}
      </p>
      <dl className="mt-3 border-t border-espresso/12 pt-3 text-[13px]">
        <div className="flex justify-between py-0.5">
          <dt className="text-espresso/80">Subtotal</dt>
          <dd className="tnum font-semibold">{rupiah(CONTOH_ORDER.subtotal)}</dd>
        </div>
        <div className="flex justify-between py-0.5">
          <dt className="text-espresso/80">Ongkir {CONTOH_ORDER.zone.jarak}</dt>
          <dd className="tnum font-semibold">{rupiah(CONTOH_ORDER.ongkir)}</dd>
        </div>
        <div className="mt-1.5 flex items-baseline justify-between border-t border-espresso/12 pt-2">
          <dt className="text-[13px] font-semibold">Total</dt>
          <dd className="display tnum text-[1.3rem] text-coral-deep">
            {rupiah(CONTOH_ORDER.total)}
          </dd>
        </div>
      </dl>
      <div className="relative mt-3 rounded-xl bg-mint px-3 py-2.5">
        <p className="text-[11px] font-bold text-mint-deep">
          Masuk ke sistemmu
        </p>
        <p className="mt-0.5 text-[11px] leading-snug">
          Notifikasinya nyampe ke WhatsApp kamu.
        </p>
        {!reduce && status === 0 && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-mint-deep"
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
        )}
      </div>
      <p className="mt-3 text-[11px] text-espresso/80">
        Contoh tampilan.
      </p>
    </div>
  );
}

export default function WhenOrder() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.35 });
  const [status, setStatus] = useState(0);

  useEffect(() => {
    if (!seen || reduce) return;
    const a = setTimeout(() => setStatus(1), 1400);
    const b = setTimeout(() => setStatus(2), 3000);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [seen, reduce]);

  return (
    <section
      id="saat"
      className="border-y border-espresso/12 bg-sand px-5 py-16 sm:py-20"
    >
      <div
        ref={ref}
        className="mx-auto max-w-5xl lg:grid lg:grid-cols-12 lg:items-start lg:gap-12"
      >
        <div className="lg:col-span-6">
          <SectionHead
            label={WHEN.title}
            title="Ordernya sampai dalam bentuk yang bisa langsung dikerjakan."
          />
          <dl className="mt-8">
            {WHEN.points.map((p) => (
              <div key={p.title} className="border-t border-espresso/12 py-4">
                <dt className="text-[16px] font-bold">{p.title}</dt>
                <dd className="mt-1 text-[15px] leading-relaxed text-espresso/85">
                  {p.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-8 lg:col-span-5 lg:col-start-8 lg:mt-0">
          <KartuOrder status={status} reduce={reduce} />
        </div>
      </div>
    </section>
  );
}
