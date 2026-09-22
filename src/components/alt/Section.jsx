// Kepala section: label kecil lalu judul. Sengaja cuma dua baris, supaya
// tiap bagian halaman kebaca sebagai satu hal, bukan bab bernomor.
export function SectionHead({ label, title, lead, className = "" }) {
  return (
    <div className={`max-w-2xl ${className}`}>
      {label && <p className="label text-coral-deep">{label}</p>}
      <h2 className="display mt-2.5 text-[clamp(1.6rem,1.2rem+1.6vw,2.4rem)]">
        {title}
      </h2>
      {lead && (
        <p className="mt-3 text-[15px] leading-relaxed text-espresso/80">
          {lead}
        </p>
      )}
    </div>
  );
}
