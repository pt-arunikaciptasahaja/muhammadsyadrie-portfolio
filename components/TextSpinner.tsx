"use client";

import { motion } from "framer-motion";

const spinnerText = "UI/UX ✦ SYSTEMS ✦ ARCHITECTURE ✦ INTERFACES ✦ SCALE ✦ CLOUD ✦ AUTOMATION ✦ RELIABILITY ✦ GROWTH ✦ SEO ✦";

type TextSpinnerProps = {
  variant?: "edge" | "compact";
};

export function TextSpinner({ variant = "edge" }: TextSpinnerProps) {
  const isCompact = variant === "compact";

  return (
    <div className={isCompact ? "relative grid size-96 place-items-center" : "relative grid size-[34rem] place-items-center lg:size-[42rem] xl:size-[50rem]"}>
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
      >
        <svg className="size-full overflow-visible font-mono uppercase tracking-widest" viewBox="0 0 160 160" aria-hidden="true">
          <defs>
            <path id="text-spinner-circle" d="M 80,80 m -66,0 a 66,66 0 1,1 132,0 a 66,66 0 1,1 -132,0" />
          </defs>
          <text className={isCompact ? "fill-slate-300 text-[0.38rem]" : "fill-slate-300 text-[0.34rem]"} letterSpacing={isCompact ? "0.01em" : "0.02em"}>
            <textPath href="#text-spinner-circle" startOffset="0%" textLength="390" lengthAdjust="spacing">
              {spinnerText}
            </textPath>
          </text>
        </svg>
      </motion.div>

      <div
        className={
          isCompact
            ? "grid size-28 place-items-center rounded-full border border-white/15 bg-[#0b0f19]/80 text-platinum shadow-[0_0_80px_rgba(255,255,255,0.08)] backdrop-blur-sm"
            : "grid size-28 place-items-center rounded-full border border-white/15 bg-[#0b0f19]/80 text-platinum shadow-[0_0_100px_rgba(255,255,255,0.08)] backdrop-blur-sm lg:size-32 xl:size-36"
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
