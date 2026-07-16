"use client";

import { motion } from "framer-motion";
import { useId } from "react";

const spinnerText = "UI/UX ✦ SYSTEMS ✦ ARCHITECTURE ✦ INTERFACES ✦ SCALE ✦ CLOUD ✦ AUTOMATION ✦ RELIABILITY ✦ GROWTH ✦ SEO ✦";

type TextSpinnerProps = {
  variant?: "edge" | "compact";
};

export function TextSpinner({ variant = "edge" }: TextSpinnerProps) {
  const isCompact = variant === "compact";
  const pathId = useId();

  return (
    <div
      className={
        isCompact
          ? "relative mx-auto grid aspect-square w-[min(24rem,calc(100vw-2rem))] place-items-center"
          : "relative grid size-[34rem] place-items-center lg:size-[42rem] xl:size-[50rem]"
      }
    >
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
      >
        <svg className="size-full overflow-visible font-mono uppercase tracking-widest" viewBox="0 0 160 160" aria-hidden="true">
          <defs>
            <path id={pathId} d="M 80,80 m -66,0 a 66,66 0 1,1 132,0 a 66,66 0 1,1 -132,0" />
          </defs>
          <text className={isCompact ? "fill-slate-300 text-[0.38rem]" : "fill-slate-300 text-[0.34rem]"} letterSpacing={isCompact ? "0.01em" : "0.02em"}>
            <textPath href={`#${pathId}`} startOffset="0%" textLength="390" lengthAdjust="spacing">
              {spinnerText}
            </textPath>
          </text>
        </svg>
      </motion.div>

      <div
        className={
          isCompact
            ? "absolute left-1/2 top-1/2 z-10 grid size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-line bg-[#1a1f47]/80 text-platinum shadow-[0_0_80px_rgba(255,89,74,0.14)] backdrop-blur-sm"
            : "absolute left-1/2 top-1/2 z-10 grid size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-line bg-[#1a1f47]/80 text-platinum shadow-[0_0_100px_rgba(97,112,187,0.22)] backdrop-blur-sm lg:size-32 xl:size-36"
        }
      >
        <motion.span
          className={isCompact ? "text-5xl font-light leading-none text-white" : "text-5xl font-light leading-none text-white lg:text-6xl"}
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
        >
          ✦
        </motion.span>
      </div>
    </div>
  );
}
