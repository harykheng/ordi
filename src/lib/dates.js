const DAY_NAMES = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

const keyOf = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

// Deterministic "sisa slot" per day so the demo reads the same on every visit.
const SLOTS = [3, 5, 4, 6, 8, 12, 10, 7, 9];

/**
 * Relative calendar for the mockups/demos, so the page never shows stale
 * dates. Day 0 is today. The first Sunday in day 2..6 is "Libur" (store
 * closed) and its neighbour is "Penuh" (quota used up) — mirrors the Libur vs
 * Penuh distinction in the real Ordi calendar.
 */
export function buildDays(count = 9, from = new Date()) {
  const base = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const days = Array.from({ length: count }, (_, i) => {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    return {
      key: keyOf(d),
      index: i,
      day: DAY_NAMES[d.getDay()],
      date: d.getDate(),
      label: i === 0 ? "Hari ini" : i === 1 ? "Besok" : "",
      slots: SLOTS[i % SLOTS.length],
      closed: false,
      full: false,
    };
  });
  // Keep both special days inside day 2..6 so the "harian" window (0..6) and
  // the PO window (2..8) always show them, whatever weekday today is.
  let closedIdx = days.findIndex((d, i) => i >= 2 && i <= 6 && d.day === "Min");
  if (closedIdx === -1) closedIdx = 4;
  const fullIdx = closedIdx + 1 <= 6 ? closedIdx + 1 : closedIdx - 1;
  days[closedIdx].closed = true;
  days[fullIdx].full = true;
  return days;
}

/** Four consecutive chips that always include the Libur and Penuh days. */
export function heroDateWindow(days) {
  const specials = days.filter((d) => d.closed || d.full).map((d) => d.index);
  const start = Math.max(1, Math.min(Math.max(...specials) - 3, days.length - 4));
  const win = days.slice(start, start + 4);
  const selected = win.find((d) => !d.closed && !d.full && d.index >= 2) || win.find((d) => !d.closed && !d.full);
  return { chips: win, selectedKey: selected ? selected.key : null, firstKey: win[0].key };
}
