"use client";

import { motion } from "framer-motion";
import { useId } from "react";

const spinnerText = "UI/UX ✦ SYSTEMS ✦ ARCHITECTURE ✦ INTERFACES ✦ SCALE ✦ CLOUD ✦ AUTOMATION ✦ RELIABILITY ✦ GROWTH ✦ SEO ✦";
const innerSpinnerText = "FULL-STACK DEVELOPER ✦ FULL-STACK DEVELOPER ✦ FULL-STACK DEVELOPER ✦";
const coreSpinnerText = "CONNECT ✦ CONNECT ✦ CONNECT ✦ CONNECT ✦";

type TextSpinnerProps = {
  variant?: "edge" | "compact";
};

export function TextSpinner({ variant = "edge" }: TextSpinnerProps) {
  const isCompact = variant === "compact";
  const pathId = useId();
  const innerPathId = useId();
  const corePathId = useId();

  return (
    <div
      className={
        isCompact
          ? "relative mx-auto grid aspect-square w-[min(24rem,calc(100vw-2rem))] place-items-center"
          : "relative grid size-[34rem] place-items-center lg:size-[42rem] xl:size-[50rem]"
      }
    >
      <motion.div
        className="absolute inset-0 transform-gpu will-change-transform"
        style={{ transformOrigin: "50% 50%" }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
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

      <motion.div
        className="absolute inset-[18%] transform-gpu will-change-transform"
        style={{ transformOrigin: "50% 50%" }}
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 42, ease: "linear" }}
      >
        <svg className="size-full overflow-visible font-mono uppercase tracking-widest" viewBox="0 0 160 160" aria-hidden="true">
          <defs>
            <path id={innerPathId} d="M 80,80 m -58,0 a 58,58 0 1,1 116,0 a 58,58 0 1,1 -116,0" />
          </defs>
          <text className={isCompact ? "fill-slate-400 text-[0.56rem]" : "fill-slate-400 text-[0.5rem]"} letterSpacing="0.04em">
            <textPath href={`#${innerPathId}`} startOffset="0%" textLength="320" lengthAdjust="spacing">
              {innerSpinnerText}
            </textPath>
          </text>
        </svg>
      </motion.div>

      <motion.div
        className="absolute inset-[32%] transform-gpu will-change-transform"
        style={{ transformOrigin: "50% 50%" }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 58, ease: "linear" }}
      >
        <svg className="size-full overflow-visible font-mono uppercase tracking-widest" viewBox="0 0 160 160" aria-hidden="true">
          <defs>
            <path id={corePathId} d="M 80,80 m -54,0 a 54,54 0 1,1 108,0 a 54,54 0 1,1 -108,0" />
          </defs>
          <text className={isCompact ? "fill-platinum text-[0.82rem]" : "fill-platinum text-[0.72rem]"} letterSpacing="0.08em">
            <textPath href={`#${corePathId}`} startOffset="0%" textLength="260" lengthAdjust="spacing">
              {coreSpinnerText}
            </textPath>
          </text>
        </svg>
      </motion.div>
    </div>
  );
}
