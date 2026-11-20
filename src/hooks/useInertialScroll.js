import { useEffect } from "react";

// Scroll that starts at normal speed and speeds up the longer the wheel keeps going.
export default function useInertialScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lastWheelAt = 0;
    let lastScrollAt = 0;
    let lastY = window.scrollY;
    let streak = 0;
    let boostPending = false;

    const onWheel = () => {
      lastWheelAt = performance.now();
    };

    const onScroll = () => {
      const now = performance.now();
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;

      // this event came from our own boost, ignore it
      if (boostPending) {
        boostPending = false;
        return;
      }

      // not driven by the wheel, or nothing moved: back to normal
      if (dy === 0 || now - lastWheelAt > 220) {
        streak = 0;
        lastScrollAt = now;
        return;
      }

      streak = now - lastScrollAt < 140 ? Math.min(streak + 1, 9) : 1;
      lastScrollAt = now;
      if (streak < 2) return;

      boostPending = true;
      window.scrollBy({ top: dy * streak * 0.35, left: 0, behavior: "instant" });
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}