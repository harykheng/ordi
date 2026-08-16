import Reveal from "./Reveal";

export default function TimelineIntro() {
  return (
    <section className="px-5 pt-16 sm:pt-20 pb-4">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <span className="inline-block rounded-full bg-teal/15 border-2 border-ink px-3 py-1 mb-4 font-mono-label text-xs text-ink">
            Dari buka sampai tutup
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink mb-3">
            Ini yang berubah kalau bisnis kamu pakai sistem sendiri.
          </h2>
          <p className="text-ink/60 max-w-xl mx-auto">
            Bukan cuma soal siapa yang punya — ini yang kerasa beda dari
            jam buka sampai tutup toko.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
