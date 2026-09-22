import { useEffect, useRef, useState } from "react";

const easeOut = (p) => 1 - Math.pow(1 - p, 3);

function animateTo(from, to, ms, onFrame, onDone) {
  const t0 = performance.now();
  let raf;
  const tick = (t) => {
    const p = Math.min(1, (t - t0) / ms);
    onFrame(Math.round(from + (to - from) * easeOut(p)));
    if (p < 1) raf = requestAnimationFrame(tick);
    else onDone?.();
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}

// Angka yang ngejar nilai barunya tiap kali target berubah. Dipakai buat
// total keranjang dan nominal QR di simulasi.
export function useRollingNumber(target, animate = true, ms = 420) {
  const [shown, setShown] = useState(target);
  const from = useRef(target);

  useEffect(() => {
    if (!animate) {
      from.current = target;
      setShown(target);
      return;
    }
    if (target === from.current) return;
    return animateTo(from.current, target, ms, setShown, () => {
      from.current = target;
    });
  }, [target, animate, ms]);

  return shown;
}

// Naik dari nol ke target, sekali saja, waktu masuk viewport. Dipakai buat
// rekap harian.
export function useCountUp(target, run, ms = 900) {
  const [shown, setShown] = useState(ms > 0 ? 0 : target);
  const done = useRef(false);

  useEffect(() => {
    if (!run || done.current) return;
    done.current = true;
    if (ms <= 0) {
      setShown(target);
      return;
    }
    return animateTo(0, target, ms, setShown, () => setShown(target));
  }, [run, target, ms]);

  return shown;
}
