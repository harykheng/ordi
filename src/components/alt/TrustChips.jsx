import { TRUST_CHIPS } from "../../data/altContent";

export default function TrustChips() {
  return (
    <section className="px-5 pb-4">
      <ul className="mx-auto flex max-w-5xl flex-wrap gap-2.5">
        {TRUST_CHIPS.map((chip) => (
          <li
            key={chip}
            className="surface inline-flex items-center gap-2 rounded-full py-2 pl-3 pr-4 text-[13px] font-medium"
          >
            <svg
              viewBox="0 0 20 20"
              aria-hidden="true"
              className="size-4 shrink-0 text-mint-deep"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 10.5 8 14.5 16 6" />
            </svg>
            {chip}
          </li>
        ))}
      </ul>
    </section>
  );
}
