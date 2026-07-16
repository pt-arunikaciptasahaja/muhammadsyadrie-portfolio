"use client";

import { MotionValue, motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const aboutLines = [
  "Engineering platforms that demand absolute trust.",
  "Leveraging a 15-year foundation across strict banking operations and modern software architecture, I build resilient, data-driven systems. I design digital experiences where deep analytical logic meets seamless user execution."
];

const accentWords = new Set(["15-year", "resilient", "digital", "experiences", "execution"]);

const aboutWords = aboutLines.flatMap((line, lineIndex) =>
  line.split(" ").map((word) => ({
    lineIndex,
    word,
    isAccent: accentWords.has(word.toLowerCase().replace(/[.,]/g, ""))
  }))
);

function RevealWord({
  children,
  index,
  total,
  progress,
  isAccent = false
}: {
  children: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  isAccent?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const segment = 1 / total;
  const start = index * segment;
  const end = Math.min(1, (index + 0.92) * segment);
  const fill = useTransform(progress, [start, end], ["0%", "105%"]);
  const opacity = useTransform(progress, [start, end], [0.34, 1]);

  return (
    <span className="relative mr-[0.24em] inline-block text-slate-800/80">
      <motion.span className="inline-block" style={{ opacity: shouldReduceMotion ? 1 : opacity }}>
        {children}
      </motion.span>
      <motion.span
        aria-hidden="true"
        className={`absolute inset-y-0 left-0 overflow-hidden whitespace-nowrap ${isAccent ? "text-cyan" : "text-platinum"}`}
        style={{ width: shouldReduceMotion ? "105%" : fill }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function MobileRevealText({ progress }: { progress: MotionValue<number> }) {
  return (
    <p className="max-w-5xl text-pretty text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl md:hidden">
      {aboutWords.map(({ word, isAccent }, index) => (
        <RevealWord key={`${word}-${index}`} index={index} total={aboutWords.length} progress={progress} isAccent={isAccent}>
          {word}
        </RevealWord>
      ))}
    </p>
  );
}

export function AboutRevealSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.7
  });
  const progressScale = useTransform(smoothProgress, [0, 1], [0.04, 1]);

  return (
    <section ref={sectionRef} className="relative min-h-[170svh] border-y border-line md:min-h-[280vh]">
      <div className="sticky top-0 flex h-[82svh] items-center overflow-hidden px-4 py-4 sm:px-6 md:min-h-screen md:py-24 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(36,75,169,0.34),transparent_30rem)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.32fr_1fr] lg:items-start">
          <div className="flex items-center gap-4 lg:sticky lg:top-32">
            <div className="h-px w-10 bg-white/30" />
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-slate-500">About</p>
          </div>

          <div>
            <div className="relative mb-7">
              <motion.div className="h-px origin-left bg-platinum/70" style={{ scaleX: progressScale }} />
            </div>
            <MobileRevealText progress={smoothProgress} />
            <p className="hidden max-w-5xl text-pretty font-semibold leading-[1.12] tracking-tight md:block md:text-5xl lg:text-6xl">
              {aboutWords.map(({ lineIndex, word, isAccent }, index) => (
                <span key={`${word}-${index}`}>
                  {index > 0 && lineIndex > aboutWords[index - 1].lineIndex ? <br className="hidden sm:block" /> : null}
                  <RevealWord index={index} total={aboutWords.length} progress={smoothProgress} isAccent={isAccent}>
                    {word}
                  </RevealWord>
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
