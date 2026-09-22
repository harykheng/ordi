// Satu pintu buat CTA WhatsApp dan tracking-nya, supaya nomor dan pesan
// nggak kesebar di banyak komponen.
const WA_NUMBER = "6281292567788";

const WA_MESSAGES = {
  header: "Halo, saya mau tanya soal Ordi buat bisnis saya.",
  hero: "Halo, saya mau coba demo Ordi dan ingin tahu apakah cocok untuk bisnis saya.",
  demo: "Halo, saya habis lihat alur Ordi. Bisnis saya ...",
  dasar: "Halo, saya tertarik dengan paket Ordi Dasar. Bisnis saya adalah ...",
  antar: "Halo, saya tertarik dengan Ordi + Antar. Bisnis saya adalah ...",
  bayar: "Halo, saya tertarik dengan Ordi + Bayar. Bisnis saya adalah ...",
  final: "Halo, saya mau cerita tentang bisnis saya dan kebutuhan sistem ordernya.",
  sticky: "Halo, saya mau cerita tentang bisnis saya dan kebutuhan sistem ordernya.",
};

export function waHref(context = "final") {
  const message = WA_MESSAGES[context] ?? WA_MESSAGES.final;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Aman kalau gtag belum load atau kena ad-blocker.
function send(name, params) {
  window.gtag?.("event", name, params);
}

// Dua nama event dikirim berbarengan: nama lama biar angkanya masih bisa
// dibandingin sama landing-second, nama baru buat baca funnel per posisi.
const WA_EVENT = {
  hero: "hero_whatsapp_click",
  final: "final_whatsapp_click",
  demo: "demo_whatsapp_click",
  header: "header_whatsapp_click",
  sticky: "sticky_whatsapp_click",
};

export function trackWa(context) {
  send("klik_wa", { lokasi: context });
  send(WA_EVENT[context] ?? "whatsapp_click", { lokasi: context });
}

export function trackDemo(context) {
  send("klik_demo", { lokasi: context });
  send(context === "hero" ? "hero_demo_click" : "demo_click", { lokasi: context });
}

export function trackPricing(tier, context) {
  send("klik_tier", { tier });
  send("pricing_cta_click", { tier, lokasi: context });
}

export function trackStep(step) {
  send("demo_step_click", { step });
}
