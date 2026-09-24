import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_TEXT } from "../data/content";

export const waLink = (text = WHATSAPP_DEFAULT_TEXT) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

/** Builds the WhatsApp message from the (all optional) closing-form answers. */
export function composeLeadMessage({ nama = "", jualan = "", mode = "", antar = "", qris = "" }) {
  const lines = [];
  const store = nama.trim();
  if (store) lines.push(`Nama toko: ${store}`);
  if (jualan) lines.push(`Jualan: ${jualan}`);
  if (mode) lines.push(`Cara jualan: ${mode}`);
  if (antar) lines.push(`Pesanan: ${antar}`);
  if (qris) lines.push(`Bayar QRIS di halaman: ${qris}`);
  if (!lines.length) return WHATSAPP_DEFAULT_TEXT;
  return `${WHATSAPP_DEFAULT_TEXT}.\n\n${lines.join("\n")}`;
}

/** Rough package hint from the answers; null when nothing is filled in. */
export function suggestTier({ jualan = "", mode = "", antar = "", qris = "" }) {
  const delivers = antar === "Diantar" || antar === "Ambil sendiri dan diantar";
  if (qris === "Mau") {
    return { name: "Ordi + Bayar", note: delivers ? "" : "Fitur Antar ikut di dalamnya." };
  }
  if (delivers) return { name: "Ordi + Antar", note: "" };
  if (jualan || mode || antar || qris) return { name: "Ordi Dasar", note: "" };
  return null;
}
