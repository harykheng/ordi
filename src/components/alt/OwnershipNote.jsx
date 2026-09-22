import { SectionHead } from "./Section";
import { OWNERSHIP_POINTS } from "../../data/altContent";

export default function OwnershipNote() {
  return (
    <section id="kepemilikan" className="px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHead
          label="Kepemilikan"
          title="Sistemnya punya bisnis kamu."
          lead="Yang kamu bayar itu pembangunan sistemnya. Begitu lunas, dia tetap jalan walau kamu berhenti langganan apa pun."
        />

        <dl className="mt-9 grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {OWNERSHIP_POINTS.map((p) => (
            <div key={p.title}>
              <dt className="text-[16px] font-bold">{p.title}</dt>
              <dd className="mt-1 text-[15px] leading-relaxed text-espresso/85">
                {p.body}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-9 max-w-2xl rounded-2xl bg-sand px-5 py-4 text-[14px] leading-relaxed text-espresso/85">
          Satu hal yang perlu kamu tahu di depan: biaya setelah pembelian nggak
          otomatis nol. Domain sama hosting tetap ada biayanya, mau kamu urus
          sendiri atau kami yang jagain lewat paket bulanan.
        </p>
      </div>
    </section>
  );
}
