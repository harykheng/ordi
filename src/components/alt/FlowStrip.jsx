import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Rule } from "./Paper";
import { STEPS } from "../../data/altContent";

// Catatan pinggir, cuma di dua langkah, biar kolomnya nggak rata kayak tabel.
const MARGINALIA = {
  1: "Alamat diketik pelanggan, jadi nggak ada salah dengar.",
  3: "Notifikasinya sampai ke WhatsApp kamu, isinya udah lengkap.",
};

export default function FlowStrip() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 70%"],
  });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="cara-kerja"
      className="border-y border-espresso/15 bg-sand px-5 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <Rule n="04" label="Cara kerjanya" className="mb-8" />

        <div className="md:grid md:grid-cols-12 md:gap-8">
          <h2 className="display text-[clamp(1.75rem,1.2rem+2vw,2.9rem)] md:col-span-7">
            Satu alur buat pelanggan. Satu buku catatan buat kamu.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-espresso/85 md:col-span-4 md:col-start-9 md:mt-2 md:self-end">
            Yang barusan kamu mainin di atas, ini urutannya.
          </p>
        </div>

        {/* Satu garis tinta yang kegambar ngikutin scroll. Itu visual
            tunggal section ini, nggak ada kartu sama sekali. */}
        <ol ref={ref} className="relative mt-12 sm:mt-14">
          <span
            aria-hidden="true"
            className="absolute bottom-3 left-[15px] top-3 w-px bg-espresso/20"
          />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: reduce ? 1 : draw }}
            className="absolute bottom-3 left-[15px] top-3 w-px origin-top bg-coral"
          />

          {STEPS.map((step, i) => (
            <li key={step.n} className="relative pb-9 pl-12 last:pb-0 sm:pl-16">
              <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center bg-sand">
                <span className="display text-[1.35rem] leading-none text-coral-deep">
                  {step.n}
                </span>
              </span>
              <div className="md:grid md:grid-cols-12 md:gap-6">
                <div className="md:col-span-7">
                  <h3 className="display text-[1.3rem] sm:text-[1.5rem]">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 max-w-lg text-[15px] leading-relaxed text-espresso/85">
                    {step.body}
                  </p>
                </div>
                {MARGINALIA[i] && (
                  <p className="mt-2 border-l border-espresso/25 pl-3 text-[12px] italic leading-snug text-espresso/80 md:col-span-4 md:col-start-9 md:mt-1">
                    {MARGINALIA[i]}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
