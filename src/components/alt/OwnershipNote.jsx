import { OWNERSHIP } from "../../data/altContent";

export default function OwnershipNote() {
  return (
    <section id="kepemilikan" className="px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="on-ink rounded-3xl bg-bean px-6 py-10 text-cream sm:px-10 sm:py-12">
          <div className="lg:flex lg:items-start lg:gap-12">
            <div className="lg:max-w-md">
              <h2 className="display text-[clamp(1.6rem,1.2rem+1.6vw,2.3rem)] text-cream">
                {OWNERSHIP.title}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-cream/85">
                {OWNERSHIP.body}
              </p>
            </div>
            <ul className="mt-7 space-y-3 lg:mt-1 lg:flex-1">
              {OWNERSHIP.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[15px]">
                  <svg
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-latte"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 10.5 8 14.5 16 6" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
