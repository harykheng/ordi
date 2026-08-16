import Header from "./components/Header";
import Hero from "./components/Hero";
import TimelineIntro from "./components/TimelineIntro";
import TimeSection from "./components/TimeSection";
import Comparison from "./components/Comparison";
import PricingTiers from "./components/PricingTiers";
import FAQSection from "./components/FAQSection";
import FinalCTA from "./components/FinalCTA";
import { TIMELINE } from "./data/content";

export default function App() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <main>
        <Hero />
        <TimelineIntro />
        {TIMELINE.map((item, i) => (
          <TimeSection
            key={item.time}
            item={item}
            index={i}
            reverse={i % 2 === 1}
          />
        ))}
        <Comparison />
        <PricingTiers />
        <FAQSection />
      </main>
      <FinalCTA />
    </div>
  );
}
