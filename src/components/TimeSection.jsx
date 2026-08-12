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

const BADGE_COLORS = ["bg-yellow", "bg-teal/15", "bg-ember/20"];

export default function TimeSection({ item, index, reverse }) {
  const Mockup = MOCKUPS[item.mockupSlot];
  const badgeColor = BADGE_COLORS[index % BADGE_COLORS.length];

  return (
    <section className="px-5 py-16 sm:py-24 border-t-2 border-ink/10">
      <div className="mx-auto max-w-6xl">
        <div
          className={`grid md:grid-cols-2 gap-10 items-center ${
            reverse ? "md:[direction:rtl]" : ""
          }`}
        >
          <Reveal className={reverse ? "md:[direction:ltr]" : ""}>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full ${badgeColor} border-2 border-ink px-3 py-1 mb-4 text-xs font-semibold font-mono-label text-ink`}
            >
              {item.time} — {item.label}
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink mb-4 leading-snug">
              {item.pain}
            </h2>
            <p className="text-ink/70 leading-relaxed">{item.solution}</p>
          </Reveal>
          <Reveal
            delay={0.15}
            className={`flex justify-center ${reverse ? "md:[direction:ltr]" : ""}`}
          >
            {Mockup && <Mockup />}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
