import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * For looping showcase animations: `active` is true only while the element
 * is on screen, the tab is visible, and the visitor hasn't asked for reduced
 * motion. Loops should pause when it flips to false.
 */
export function useLiveMotion(amount = 0.25) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount });
  const reduce = !!useReducedMotion();
  const [pageVisible, setPageVisible] = useState(
    () => typeof document === "undefined" || !document.hidden,
  );

  useEffect(() => {
    const onChange = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

  return { ref, inView, reduce, active: inView && pageVisible && !reduce };
}
