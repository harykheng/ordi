import { IconWhatsApp } from "./Icons";
import { DEMO_URL, FINAL } from "../../data/altContent";
import { trackDemo, trackWa, waHref } from "../../lib/track";

export default function AltFinalCTA() {
  return (
    <footer id="kontak" className="px-5 pb-10 pt-16 sm:pt-20">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="display mx-auto max-w-2xl text-[clamp(1.8rem,1.3rem+2vw,2.7rem)]">
            {FINAL.title}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[16px] leading-relaxed text-espresso/85">
            {FINAL.body}
          </p>

          <a
            href={waHref("final")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWa("final")}
            className="press mt-8 inline-flex min-h-14 items-center gap-2.5 rounded-xl bg-coral pl-7 pr-6 text-[16px] font-bold text-cream hover:bg-coral-deep"
          >
            <IconWhatsApp className="h-5 w-5" />
            {FINAL.cta}
            <span aria-hidden="true">&rarr;</span>
          </a>
          <p className="mx-auto mt-3.5 max-w-sm text-[13px] leading-relaxed text-espresso/80">
            {FINAL.micro}
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-espresso/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-espresso/80">
            <span className="display text-[1.05rem]">Ordi</span>, Order Disini,
            dikerjakan Studio Harel.
          </p>
          <div className="flex items-center gap-5">
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackDemo("footer")}
              className="press inline-flex min-h-11 items-center text-[13px] font-semibold underline decoration-espresso/25 underline-offset-4 hover:decoration-coral"
            >
              Coba demo
            </a>
            <p className="text-[12px] text-espresso/80">
              &copy; {new Date().getFullYear()} Studio Harel
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
