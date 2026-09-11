import { useCallback, useState } from "react";
import AltHeader from "./components/alt/AltHeader";
import AltHero from "./components/alt/AltHero";
import TrustStrip from "./components/alt/TrustStrip";
import ProblemSection from "./components/alt/ProblemSection";
import HowItWorks from "./components/alt/HowItWorks";
import FeatureSection from "./components/alt/FeatureSection";
import BeforeAfter from "./components/alt/BeforeAfter";
import OwnershipSection from "./components/alt/OwnershipSection";
import AltPricing from "./components/alt/AltPricing";
import AltComparison from "./components/alt/AltComparison";
import AltFAQ from "./components/alt/AltFAQ";
import AltFinalCTA from "./components/alt/AltFinalCTA";
import StickyMobileCTA from "./components/alt/StickyMobileCTA";
import AltConsentBanner from "./components/alt/AltConsentBanner";

// Versi alternatif landing page Ordi (branch landing-alternatif).
// Alur: MASALAH → SOLUSI → BUKTI VISUAL → HARGA → CTA.
// Komponen versi landing-second masih ada di src/components/*.jsx dan
// sengaja nggak dihapus supaya dua pendekatan bisa dibandingin.
export default function App() {
  const [consentOpen, setConsentOpen] = useState(true);
  const closeConsent = useCallback(() => setConsentOpen(false), []);

  return (
    <div className="min-h-screen bg-cream text-espresso">
      <AltHeader />
      <main>
        <AltHero />
        <TrustStrip />
        <ProblemSection />
        <HowItWorks />
        <FeatureSection />
        <BeforeAfter />
        <OwnershipSection />
        <AltPricing />
        <AltComparison />
        <AltFAQ />
      </main>
      <AltFinalCTA />
      {/* sticky CTA nunggu cookie notice kelar dulu, biar nggak numpuk */}
      <StickyMobileCTA hidden={consentOpen} />
      <AltConsentBanner onResolve={closeConsent} />
    </div>
  );
}
