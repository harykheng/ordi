import Reveal from "./Reveal";
import { Sparkle } from "./Doodles";

const FAQ_ITEMS = [
  {
    q: "Kok masih ada biaya bulanan, padahal katanya beli putus?",
    a: "Sistemnya 100% milik kamu setelah bayar, bukan sewa. Biaya bulanan itu opsional, buat yang mau saya bantu jagain: pastikan server jalan, ada yang benerin kalau ada bug, dan reminder sebelum domain/hosting habis masa aktif. Mirip beli motor, motornya punya kamu, servis rutin itu pilihan terpisah, bukan cicilan.",
  },
  {
    q: "QRIS-nya beneran otomatis kecatat lunas?",
    a: "Nominal QR-nya otomatis sesuai total pesanan, jadi pelanggan tinggal scan tanpa nanya-nanya nominal. Tapi verifikasi bukti transfernya tetap manual by kamu, kami jujur soal ini, karena verifikasi otomatis penuh butuh payment gateway berbayar yang bikin harga naik jauh lebih mahal.",
  },
  {
    q: "Kalau bisnis saya berkembang, bisa upgrade paket?",
    a: "Bisa. Upgrade dari Ordi Dasar ke +Antar atau +Bayar itu bayar selisihnya aja, bukan beli ulang dari nol. Sistemnya dibangun supaya bisa nambah fitur belakangan tanpa ganti platform.",
  },
  {
    q: "Kenapa nggak pakai platform yang udah ada aja, kan lebih murah per bulan?",
    a: "Platform sewaan itu murah di depan, tapi kalau berhenti bayar, sistem & data kamu ilang, dan tampilannya generik, mirip semua toko lain yang pakai platform sama. Ordi dibangun ngikutin cara bisnis kamu jalan, dan begitu lunas, itu aset kamu selamanya, bukan langganan yang bisa diputus sepihak.",
  },
  {
    q: "Prosesnya berapa lama sampai bisa dipakai?",
    a: "Nggak instan, karena saya perlu ngobrol dulu soal bisnis kamu sebelum mulai bangun, bukan asal pasang template. Chat dulu di WhatsApp buat cerita kebutuhan kamu, dari situ saya kasih estimasi waktu yang realistis.",
  },
];

export default function FAQSection() {
  return (
    <section className="relative px-5 py-16 sm:py-24 border-t-2 border-ink/10">
      <Sparkle className="absolute top-10 right-[6%] hidden sm:block" />
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2 className="font-display font-bold text-3xl text-ink mb-3">
            Pertanyaan yang biasanya muncul
          </h2>
          <p className="text-ink/60 mb-10">
            Kalau masih ada yang mengganjal di luar ini, langsung aja
            tanya di WhatsApp.
          </p>
        </Reveal>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.05}>
              <details className="group rounded-2xl border-2 border-ink bg-paper-2 px-5 py-4">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-display font-semibold text-ink">
                  {item.q}
                  <span className="shrink-0 text-ember-deep transition-transform group-open:rotate-45 text-xl leading-none">
                    +
                  </span>
                </summary>
                <p className="text-ink/70 text-sm leading-relaxed mt-3">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
