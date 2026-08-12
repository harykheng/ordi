import Header from "./components/Header";
import Hero from "./components/Hero";
import TimeSection from "./components/TimeSection";
import Comparison from "./components/Comparison";
import OwnershipCertificate from "./components/OwnershipCertificate";
import FinalCTA from "./components/FinalCTA";
import { TIMELINE } from "./data/content";

export default function App() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <main>
        <Hero />
        {TIMELINE.map((item, i) => (
          <TimeSection
            key={item.time}
            item={item}
            index={i}
            reverse={i % 2 === 1}
          />
        ))}
        <Comparison />
        <OwnershipCertificate />
      </main>
      <FinalCTA />
    </div>
  );
}
