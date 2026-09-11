import Reveal from "../Reveal";
import { QrisCard, WaNotifCard } from "./ProductMockups";
import { IconList, IconStore, IconTruck, IconQr, IconBell } from "./Icons";
import { FEATURES } from "../../data/altContent";

const ICONS = [IconStore, IconList, IconTruck, IconQr, IconBell];

export default function FeatureSection() {
  const [katalog, pesanan, ongkir, qris, notif] = FEATURES;
  const simple = [katalog, pesanan, ongkir];

  return (
    <section id="fitur" className="px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow text-coral-deep">Yang kamu dapat</p>
          <h2 className="font-statement mt-3 max-w-2xl text-[1.75rem] text-espresso sm:text-4xl">
            Fitur yang kepake tiap hari, bukan daftar panjang yang cuma bagus
            di brosur.
          </h2>
        </Reveal>

        <div className="mt-9 grid gap-4 sm:grid-cols-3">
          {simple.map((f, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={f.title} delay={i * 0.06} className="min-w-0">
                <div className="h-full rounded-2xl border border-espresso/12 bg-card p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sand text-espresso">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-3.5 font-bold text-espresso">{f.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-espresso/85">
                    {f.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* dua fitur yang paling sering ditanya dikasih bukti visualnya */}
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {[
            { f: qris, Icon: ICONS[3], Visual: QrisCard },
            { f: notif, Icon: ICONS[4], Visual: WaNotifCard },
          ].map(({ f, Icon, Visual }, i) => (
            <Reveal key={f.title} delay={i * 0.06} className="min-w-0">
              <div className="h-full rounded-2xl border border-espresso/12 bg-sand p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream text-espresso">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-3.5 font-bold text-espresso">{f.title}</p>
                <p className="mt-1.5 mb-4 text-sm leading-relaxed text-espresso/85">
                  {f.body}
                </p>
                <Visual />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
