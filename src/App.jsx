import { useCallback, useState } from "react";
import AltHeader from "./components/alt/AltHeader";
import AltHero from "./components/alt/AltHero";
import ProblemSpike from "./components/alt/ProblemSpike";
import FlowStrip from "./components/alt/FlowStrip";
import FeatureLedger from "./components/alt/FeatureLedger";
import LedgerSwap from "./components/alt/LedgerSwap";
import OwnershipNote from "./components/alt/OwnershipNote";
import PriceSheet from "./components/alt/PriceSheet";
import AltComparison from "./components/alt/AltComparison";
import AltFAQ from "./components/alt/AltFAQ";
import AltFinalCTA from "./components/alt/AltFinalCTA";
import StickyMobileCTA from "./components/alt/StickyMobileCTA";
import AltConsentBanner from "./components/alt/AltConsentBanner";

// Versi alternatif Ordi (branch landing-alternatif): halaman cetak editorial
// dengan satu simulasi pesan yang bisa dimainkan di pembukaan.
// Komponen versi landing-second masih ada di src/components/*.jsx, sengaja
// nggak dirender, biar dua pendekatan bisa dibandingin.
export default function App() {
  const [consentOpen, setConsentOpen] = useState(true);
  const closeConsent = useCallback(() => setConsentOpen(false), []);

  return (
    <div className="min-h-screen bg-cream text-espresso">
      {/* serat kertas, satu lapis di atas semuanya, nggak bisa diklik */}
      <div className="paper-fiber" aria-hidden="true" />

      <AltHeader />
      <main>
        <AltHero />
        <ProblemSpike />
        <FlowStrip />
        <FeatureLedger />
        <LedgerSwap />
        <OwnershipNote />
        <PriceSheet />
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
