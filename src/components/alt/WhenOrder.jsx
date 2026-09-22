import { SectionHead } from "./Section";
import { WHEN } from "../../data/altContent";

// Satu visual: kartu order yang kamu terima, lengkap sama status dan
// notifikasinya. Angkanya contoh.
function KartuOrder() {
  return (
    <div className="surface rounded-2xl p-4">
      <div className="flex items-baseline justify-between gap-2">
        <span className="tnum text-[13px] font-bold text-coral-deep">#0232</span>
        <span className="rounded-md bg-coral px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cream">
          baru
        </span>
      </div>
      <p className="mt-2 text-[14px] font-semibold">
        2x Kopi Susu Gula Aren, 1x Croissant Butter
      </p>
      <p className="mt-2 flex items-center gap-1.5 text-[13px] text-espresso/85">
        <svg viewBox="0 0 24 24" className="size-4 shrink-0" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
          <circle cx="12" cy="10" r="2.4" />
        </svg>
        Kemang Raya, 3,2 km
      </p>
      <dl className="mt-3 border-t border-espresso/12 pt-3 text-[13px]">
        <div className="flex justify-between py-0.5">
          <dt className="text-espresso/80">Subtotal</dt>
          <dd className="tnum font-semibold">Rp58.000</dd>
        </div>
        <div className="flex justify-between py-0.5">
          <dt className="text-espresso/80">Ongkir</dt>
          <dd className="tnum font-semibold">Rp9.000</dd>
        </div>
        <div className="mt-1.5 flex items-baseline justify-between border-t border-espresso/12 pt-2">
          <dt className="text-[13px] font-semibold">Total</dt>
          <dd className="display tnum text-[1.3rem] text-coral-deep">Rp67.000</dd>
        </div>
      </dl>
      <div className="mt-3 rounded-xl bg-mint px-3 py-2.5">
        <p className="text-[11px] font-bold text-mint-deep">Order baru masuk</p>
        <p className="mt-0.5 text-[11px] leading-snug">
          Notifikasinya nyampe ke WhatsApp kamu.
        </p>
      </div>
      <p className="mt-3 text-[11px] text-espresso/80">Contoh tampilan.</p>
    </div>
  );
}

export default function WhenOrder() {
  return (
    <section
      id="saat"
      className="border-y border-espresso/12 bg-sand px-5 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-5xl lg:grid lg:grid-cols-12 lg:items-start lg:gap-12">
        <div className="lg:col-span-6">
          <SectionHead label={WHEN.title} title="Ordernya sampai dalam bentuk yang bisa langsung dikerjakan." />
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
          <KartuOrder />
        </div>
      </div>
    </section>
  );
}
