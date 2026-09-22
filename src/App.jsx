import { useCallback, useState } from "react";
import AltHeader from "./components/alt/AltHeader";
import AltHero from "./components/alt/AltHero";
import BeforeOrder from "./components/alt/BeforeOrder";
import WhenOrder from "./components/alt/WhenOrder";
import AfterOrder from "./components/alt/AfterOrder";
import ThreeSteps from "./components/alt/ThreeSteps";
import PriceSheet from "./components/alt/PriceSheet";
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
      <AltHeader />
      <main>
        <AltHero />
        <BeforeOrder />
        <WhenOrder />
        <AfterOrder />
        <ThreeSteps />
        <PriceSheet />
        <AltFAQ />
      </main>
      <AltFinalCTA />
      {/* sticky CTA nunggu cookie notice kelar dulu, biar nggak numpuk */}
      <StickyMobileCTA hidden={consentOpen} />
      <AltConsentBanner onResolve={closeConsent} />
    </div>
  );
}
