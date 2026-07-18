"use client";

import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity, wrap } from "framer-motion";
import { Circle, Diamond, Hexagon, Square, Triangle } from "lucide-react";

type CodeMark = {
  name: string;
  glyph: string;
};

const codeMarks: CodeMark[] = [
  { name: "Resilient Architecture", glyph: "01" },
  { name: "Asynchronous Logic", glyph: "02" },
  { name: "Frictionless UX", glyph: "03" },
  { name: "Algorithmic Scale", glyph: "04" },
  { name: "Digital Topography", glyph: "05" }
];

const separatorIcons = [Triangle, Diamond, Circle, Square, Hexagon];

function MarqueeRow() {
  const baseX = useMotionValue(0);
  const directionFactor = useRef(1);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 60,
    stiffness: 220,
    mass: 0.8
  });
  const velocityFactor = useTransform(smoothVelocity, [-2400, 0, 2400], [-0.18, 0, 0.18], {
    clamp: true
  });
  const skewX = useTransform(smoothVelocity, [-2600, 0, 2600], [-1.25, 0, 1.25], {
    clamp: true
  });
  const x = useTransform(baseX, (value) => `${wrap(-33.333, 0, value)}%`);
  const repeated = [...codeMarks, ...codeMarks, ...codeMarks, ...codeMarks];

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * 0.0016 * delta;
    const velocity = velocityFactor.get();

    if (velocity < 0) {
      directionFactor.current = -1;
    } else if (velocity > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * Math.abs(moveBy) * Math.abs(velocity);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="marquee-mask overflow-hidden border-y border-white/10 bg-white/[0.025]">
      <motion.div className="flex w-max will-change-transform" style={{ x, skewX }}>
        {repeated.map((mark, index) => {
          const SeparatorIcon = separatorIcons[index % separatorIcons.length];

          return (
            <div
              key={`${mark.name}-${index}`}
              className="group flex h-24 shrink-0 items-center border-r border-white/10 bg-white/[0.065] px-5 font-mono uppercase tracking-[0.2em] transition-[background-color,padding] duration-500 ease-out hover:bg-white/[0.085] md:h-28 md:px-8"
            >
              <span className="grid h-full w-24 place-items-center border-r border-white/10 text-5xl font-semibold tracking-tight text-platinum [-webkit-text-stroke:1px_rgba(252,255,218,0)] transition-all duration-300 md:w-28">
                {mark.glyph}
              </span>
              <span className="max-w-[14rem] px-5 text-xs font-semibold leading-5 text-platinum transition-colors duration-300 md:max-w-none md:px-8 md:text-sm">
                {mark.name}
              </span>
              <span className="mr-5 grid size-8 rotate-90 place-items-center rounded-[6px] border border-cyan bg-white/[0.025] text-cyan drop-shadow-[0_0_10px_rgba(255,89,74,0.42)] transition-all duration-300 group-hover:rotate-180 md:mr-8">
                <SeparatorIcon className="size-4 fill-platinum/15" strokeWidth={1} />
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

export function ClientMarquee() {
  return (
    <section className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl border-y border-line py-12">
        <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Technical Stack</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-platinum md:text-3xl">Architectural principles for resilient digital systems.</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-400 md:text-right">
            A kinetic system map of the operating principles behind the portfolio work.
          </p>
        </div>
        <MarqueeRow />
      </div>
    </section>
  );
}
