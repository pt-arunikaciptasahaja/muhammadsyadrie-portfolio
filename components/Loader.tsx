"use client";

import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";

export function Loader() {
  const { active, progress } = useProgress();
  const [isLoading, setIsLoading] = useState(true);
  const [displayProgress, setDisplayProgress] = useState(0);
  const roundedProgress = Math.round(displayProgress);

  useEffect(() => {
    const targetProgress = progress === 100 && active === false ? 100 : Math.min(progress, 92);
    const interval = window.setInterval(() => {
      setDisplayProgress((current) => {
        const distance = targetProgress - current;

        if (Math.abs(distance) < 0.4) {
          return targetProgress;
        }

        return current + Math.max(0.35, distance * 0.08);
      });
    }, 24);

    return () => window.clearInterval(interval);
  }, [active, progress]);

  useEffect(() => {
    if (displayProgress >= 99.8 && progress === 100 && active === false) {
      const timeout = window.setTimeout(() => {
        setIsLoading(false);
      }, 800);

      return () => window.clearTimeout(timeout);
    }

    return undefined;
  }, [active, displayProgress, progress]);

  return (
    <AnimatePresence>
      {isLoading ? (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0b0f19] px-5 py-6 sm:px-8 sm:py-8"
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">Initializing Environment</p>
            <p className="hidden font-mono text-xs uppercase tracking-[0.2em] text-slate-600 sm:block">MUHAMMAD SYADRIE / PORTFOLIO</p>
          </div>

          <div className="flex justify-end pb-8 text-right sm:pb-12">
            <div className="flex items-start text-slate-200">
              <motion.span
                className="text-7xl font-light leading-none tracking-tighter md:text-9xl"
                animate={{ opacity: [0.72, 1], y: [8, 0] }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                key={roundedProgress}
              >
                {roundedProgress}
              </motion.span>
              <span className="mt-3 font-mono text-xl font-light text-slate-500 md:mt-5 md:text-3xl">%</span>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/10">
            <motion.div
              className="h-full bg-slate-200"
              initial={{ width: "0%" }}
              animate={{ width: `${displayProgress}%` }}
              transition={{ duration: 0.18, ease: "linear" }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
