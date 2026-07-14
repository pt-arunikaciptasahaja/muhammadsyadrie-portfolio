"use client";

import { useEffect } from "react";

export function MouseGlow() {
  useEffect(() => {
    const root = document.documentElement;
    let rafId = 0;

    const onPointerMove = (event: PointerEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        root.style.setProperty("--cursor-x", `${event.clientX}px`);
        root.style.setProperty("--cursor-y", `${event.clientY}px`);
      });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-[var(--cursor-x)] top-[var(--cursor-y)] z-50 hidden h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50 bg-white/10 shadow-glow backdrop-blur-sm md:block"
    />
  );
}
