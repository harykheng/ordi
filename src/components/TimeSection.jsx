import Reveal from "./Reveal";
import CatalogMockup from "./mockups/CatalogMockup";
import ShippingCalcMockup from "./mockups/ShippingCalcMockup";
import QRISMockup from "./mockups/QRISMockup";
import AdminDashboardMockup from "./mockups/AdminDashboardMockup";

const MOCKUPS = {
  SS_CATALOG: CatalogMockup,
  SS_SHIPPING_CALC: ShippingCalcMockup,
  SS_QRIS: QRISMockup,
  SS_ADMIN_DASHBOARD: AdminDashboardMockup,
};

export default function TimeSection({ item, reverse }) {
  const Mockup = MOCKUPS[item.mockupSlot];

  return (
    <section className="px-5 py-16 sm:py-24 border-t border-char/60">
      <div className="mx-auto max-w-6xl">
        <div
          className={`grid md:grid-cols-2 gap-10 items-center ${
            reverse ? "md:[direction:rtl]" : ""
          }`}
        >
          <Reveal className={reverse ? "md:[direction:ltr]" : ""}>
            <p className="font-mono-label text-xs text-ember mb-3">
              {item.time} — {item.label}
            </p>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-paper mb-4 leading-snug">
              {item.pain}
            </h2>
            <p className="text-paper/70 leading-relaxed">{item.solution}</p>
          </Reveal>
          <Reveal delay={0.15} className={`flex justify-center ${reverse ? "md:[direction:ltr]" : ""}`}>
            {Mockup && <Mockup />}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
