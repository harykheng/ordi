import Reveal from "./Reveal";
import ChatTransformHero from "./ChatTransformHero";
import ShippingCalcMockup from "./mockups/ShippingCalcMockup";
import QRISMockup from "./mockups/QRISMockup";
import AdminDashboardMockup from "./mockups/AdminDashboardMockup";
import { Star, Sparkle, Spiral } from "./Doodles";

const MOCKUPS = {
  SS_SHIPPING_CALC: ShippingCalcMockup,
  SS_QRIS: QRISMockup,
  SS_ADMIN_DASHBOARD: AdminDashboardMockup,
};

const BADGE_COLORS = ["bg-yellow", "bg-teal/15", "bg-ember/20"];

// Hand-drawn accents scattered per item — Timeline had zero doodle texture
// before, which left it feeling flatter/more generic than the rest of the
// page next to competitor screenshots. Two per item, rotated by index.
const ACCENTS = [
  [
    { Icon: Star, color: "text-ember", pos: "top-6 right-[8%]" },
    { Icon: Sparkle, color: "text-teal", pos: "bottom-8 left-[6%]" },
  ],
  [
    { Icon: Spiral, color: "text-ink/40", pos: "top-4 left-[10%]" },
    { Icon: Star, color: "text-yellow", pos: "bottom-10 right-[8%]" },
  ],
  [
    { Icon: Sparkle, color: "text-ember", pos: "top-8 right-[10%]" },
    { Icon: Spiral, color: "text-teal", pos: "bottom-6 left-[8%]" },
  ],
  [
    { Icon: Star, color: "text-teal", pos: "top-6 left-[8%]" },
    { Icon: Sparkle, color: "text-yellow", pos: "bottom-8 right-[6%]" },
  ],
];

export default function TimeSection({ item, index, reverse }) {
  // 07:00 (first item) gets the chat-chaos illustration as a supporting
  // detail for that specific pain point, not the page's main visual.
  const Mockup = index === 0 ? ChatTransformHero : MOCKUPS[item.mockupSlot];
  const badgeColor = BADGE_COLORS[index % BADGE_COLORS.length];
  const accents = ACCENTS[index % ACCENTS.length];

  return (
    <section className="relative px-5 py-16 sm:py-24 border-t-2 border-ink/10 overflow-hidden">
      {accents.map(({ Icon, color, pos }, i) => (
        <Icon
          key={i}
          color={color}
          className={`absolute ${pos} hidden sm:block`}
        />
      ))}
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
              {item.time}, {item.label}
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
