import Header from "./components/Header";
import Hero from "./components/Hero";
import CustomerFlow from "./components/CustomerFlow";
import ModeSection from "./components/ModeSection";
import OwnerDay from "./components/OwnerDay";
import Comparison from "./components/Comparison";
import PricingTiers from "./components/PricingTiers";
import HowToStart from "./components/HowToStart";
import FAQSection from "./components/FAQSection";
import FinalCTA from "./components/FinalCTA";
import ConsentBanner from "./components/ConsentBanner";

export default function App() {
  return (
    <div className="min-h-screen text-ink">
      <Header />
      <main>
        <Hero />
        <CustomerFlow />
        <ModeSection />
        <OwnerDay />
        <Comparison />
        <PricingTiers />
        <HowToStart />
        <FAQSection />
      </main>
      <FinalCTA />
      <ConsentBanner />
    </div>
  );
}
