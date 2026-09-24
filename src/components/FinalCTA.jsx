import { useState } from "react";
import Reveal from "./Reveal";
import { DEMO_URL, LEAD_OPTIONS } from "../data/content";
import { composeLeadMessage, suggestTier, waLink } from "../lib/whatsapp";
import ordiLogo from "../assets/ordi-logo.png";

function ChipGroup({ legend, name, options, value, onChange }) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-2.5 text-sm font-bold">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const v = typeof opt === "string" ? opt : opt.value;
          const label = typeof opt === "string" ? opt : opt.label;
          return (
            <label key={v} className="relative">
              <input
                type="radio"
                name={name}
                value={v}
                checked={value === v}
                onChange={() => onChange(v)}
                className="peer sr-only"
              />
              <span className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-line bg-card px-4 text-sm font-semibold transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-pen">
                {label}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function FinalCTA() {
  const [lead, setLead] = useState({ nama: "", jualan: "", mode: "", antar: "", qris: "" });
  const set = (key) => (value) => setLead((l) => ({ ...l, [key]: value }));

  const message = composeLeadMessage(lead);
  const tier = suggestTier(lead);

  return (
    <footer id="mulai" className="tear-top px-5 pt-24 pb-10" style={{ "--tear-from": "var(--color-meja)" }}>
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-headline text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.03] text-balance">
            Bisnis kamu, <mark className="mark-hl">sistem kamu.</mark>
          </h2>
          <p className="mt-4 max-w-[58ch] text-ink-2 sm:text-lg">
            Mulai dari chat WhatsApp: ceritain gimana bisnismu jalan sehari-hari, kita bahas sistem yang pas
            buat kamu secara spesifik. Isi seperlunya di bawah, semuanya opsional.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <Reveal>
            <form className="card-ink grid grid-cols-1 gap-6 p-5 sm:p-7" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="lead-nama" className="mb-2.5 block text-sm font-bold">
                  Nama toko
                </label>
                <input
                  id="lead-nama"
                  type="text"
                  value={lead.nama}
                  maxLength={60}
                  autoComplete="organization"
                  placeholder="Contoh: Dapur Bu Rina"
                  onChange={(e) => set("nama")(e.target.value)}
                  className="min-h-12 w-full rounded-xl border border-line bg-card px-4 text-base placeholder:text-ink-2/80"
                />
              </div>
              <ChipGroup legend="Jualan apa?" name="jualan" options={LEAD_OPTIONS.jualan} value={lead.jualan} onChange={set("jualan")} />
              <ChipGroup legend="Cara jualan" name="mode" options={LEAD_OPTIONS.mode} value={lead.mode} onChange={set("mode")} />
              <ChipGroup legend="Pesanan pelanggan" name="antar" options={LEAD_OPTIONS.antar} value={lead.antar} onChange={set("antar")} />
              <ChipGroup
                legend="Pelanggan bayar QRIS langsung di halaman?"
                name="qris"
                options={LEAD_OPTIONS.qris}
                value={lead.qris}
                onChange={set("qris")}
              />
            </form>
          </Reveal>

          <Reveal delay={0.1} className="lg:sticky lg:top-28">
            <div className="receipt px-5 pt-5 pb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.08em]">Pesan yang kebawa ke WhatsApp</p>
              <div className="receipt-rule my-3" />
              <p className="whitespace-pre-wrap break-words text-[13px] leading-relaxed" aria-live="polite">
                {message}
              </p>
              <p className="mt-4 min-h-6 font-body text-sm text-ink-2">
                {tier && (
                  <>
                    <span className="pen text-base">kayaknya paling pas: </span>
                    <b className="text-ink">{tier.name}</b>
                    {tier.note ? `. ${tier.note}` : ""}
                  </>
                )}
              </p>
              <a
                href={waLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  window.gtag?.("event", "klik_wa", {
                    lokasi: "final-cta",
                    jualan: lead.jualan || "-",
                    mode: lead.mode || "-",
                    antar: lead.antar || "-",
                    qris: lead.qris || "-",
                  })
                }
                className="btn btn-primary mt-4 w-full font-body"
              >
                Kirim lewat WhatsApp
              </a>
            </div>
            <div className="mt-9 text-center">
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.gtag?.("event", "klik_demo", { lokasi: "final-cta" })}
                className="text-sm font-semibold underline underline-offset-4 hover:text-ember-deep"
              >
                atau coba Ordi langsung dulu
              </a>
              <p className="mt-1 font-mono-label text-[11px] text-ink-2">Demo interaktif, data contoh, bukan toko asli</p>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 border-t border-dashed border-line pt-8 text-center">
          <img src={ordiLogo} alt="Ordi" className="mx-auto h-7 w-auto" />
          <p className="mt-1.5 font-mono-label text-[11px] text-ink-2">Order Disini, sistem pesan-antar dari Studio Harel</p>
          <p className="mt-4 text-xs text-ink-2">© {new Date().getFullYear()} Studio Harel. Dibangun untuk UMKM F&amp;B Indonesia.</p>
        </div>
      </div>
    </footer>
  );
}
