import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import FlowScreen from "./flow/FlowScreens";
import { flowUrl } from "./flow/flowUrl";
import PhoneFrame from "./flow/PhoneFrame";
import { CUSTOMER_FLOW } from "../data/content";

function TierTag({ children }) {
  return (
    <span className="mt-3 inline-flex items-center gap-1.5 rounded-md border-[1.5px] border-ink bg-card px-2 py-1 font-mono-label text-[11px] font-semibold">
      <span className="size-1.5 rounded-full bg-ember" aria-hidden="true" />
      {children}
    </span>
  );
}

/**
 * Five customer steps. Desktop: the steps scroll on the left while one
 * sticky phone on the right swaps its page to the active step. Mobile: every
 * step carries its own phone inline, no sticky trickery.
 */
export default function CustomerFlow() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(Number(en.target.dataset.step));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="pelanggan" className="tear-top scroll-mt-20 bg-meja px-5 pt-24 pb-20 sm:pb-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono-label text-xs uppercase tracking-[0.08em] text-ink-2">Yang dilihat pelanggan kamu</p>
          <h2 className="font-headline mt-3 max-w-[18ch] text-[clamp(2.1rem,4.4vw,3.2rem)] leading-[1.05] text-balance">
            Dari buka link sampai <mark className="mark-hl">lacak pesanan.</mark>
          </h2>
          <p className="mt-4 max-w-[58ch] text-ink-2 sm:text-lg">
            Satu link yang kamu bagikan di bio Instagram atau status WhatsApp. Pelanggan nggak perlu bikin
            akun, datanya diingat buat pesanan berikutnya.
          </p>
        </Reveal>

        <div className="mt-12 lg:mt-4 lg:grid lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16">
          <ol className="grid grid-cols-1 gap-14 lg:gap-0">
            {CUSTOMER_FLOW.map((step, i) => (
              <li
                key={step.id}
                ref={(el) => (stepRefs.current[i] = el)}
                data-step={i}
                className="lg:flex lg:min-h-[72vh] lg:items-center"
              >
                <div className={`transition-opacity duration-500 ${i === active ? "lg:opacity-100" : "lg:opacity-35"}`}>
                  <p className="pen text-3xl font-bold leading-none">{i + 1}.</p>
                  <h3 className="font-headline mt-2 text-[clamp(1.5rem,2.8vw,2.1rem)] leading-tight">{step.title}</h3>
                  <p className="mt-3 max-w-[48ch] leading-relaxed text-ink-2 sm:text-[17px]">{step.body}</p>
                  {step.tier && <TierTag>{step.tier}</TierTag>}
                  <div className="mt-7 max-w-[400px] lg:hidden">
                    <PhoneFrame url={flowUrl(step.id)}>
                      <FlowScreen id={step.id} />
                    </PhoneFrame>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="hidden lg:block">
            <div className="sticky top-28 py-10">
              <PhoneFrame url={flowUrl(CUSTOMER_FLOW[active].id)} screenClassName="h-[620px] [@media(max-height:820px)]:h-[540px]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={CUSTOMER_FLOW[active].id}
                    className="h-full"
                    initial={{ opacity: 0, x: 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -28 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <FlowScreen id={CUSTOMER_FLOW[active].id} />
                  </motion.div>
                </AnimatePresence>
              </PhoneFrame>
              <div className="mt-6 flex items-center justify-center gap-2" aria-hidden="true">
                {CUSTOMER_FLOW.map((s, i) => (
                  <span
                    key={s.id}
                    className={`h-2 rounded-full border-[1.5px] border-ink transition-all duration-300 ${
                      i === active ? "w-7 bg-ink" : "w-2 bg-card"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
