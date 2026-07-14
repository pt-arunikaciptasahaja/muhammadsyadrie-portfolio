"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { useRef, useState } from "react";

const outroStates = [
  {
    label: "Muhammad Syadrie",
    eyebrow: "Full-stack software engineer"
  },
  {
    label: "Connect.",
    eyebrow: "Available for global roles"
  }
];

export function OutroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setActiveIndex(latest > 0.48 ? 1 : 0);
  });

  const active = outroStates[activeIndex];

  return (
    <>
      <section ref={sectionRef} className="relative h-[200vh] border-t border-line">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden px-4 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <AnimatePresence mode="wait">
                <motion.p
                  key={active.eyebrow}
                  className="font-mono text-xs uppercase tracking-[0.34em] text-muted"
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -16, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 220, damping: 24 }}
                >
                  {active.eyebrow}
                </motion.p>
              </AnimatePresence>
              <div className="hidden h-px flex-1 bg-line md:block" />
            </div>

            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={active.label}
                  className="break-words text-[clamp(4.5rem,15vw,13rem)] font-semibold uppercase leading-[0.82] tracking-normal text-platinum"
                  initial={{ y: 80, opacity: 0, filter: "blur(12px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -80, opacity: 0, filter: "blur(12px)" }}
                  transition={{ type: "spring", stiffness: 160, damping: 24 }}
                >
                  {active.label}
                </motion.h2>
              </AnimatePresence>

              <motion.div
                className="absolute inset-x-0 -bottom-8 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
                animate={{ opacity: activeIndex === 1 ? 0.85 : 0.35 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <AnimatePresence>
              {activeIndex === 1 ? (
                <motion.div
                  className="mt-14 flex flex-wrap gap-3"
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 180, damping: 22 }}
                >
                  <a href="mailto:muhammad.syadrie11@gmail.com" className="inline-flex items-center gap-2 rounded-[6px] border border-white/35 bg-white/10 px-4 py-3 text-sm font-medium text-platinum transition hover:border-white/70 hover:bg-white/15">
                    <Mail className="size-4" />
                    Email
                    <ArrowUpRight className="size-4" />
                  </a>
                  <a href="https://linkedin.com/in/mrizkysyadrie" className="inline-flex items-center gap-2 rounded-[6px] border border-line bg-white/[0.035] px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-white/40 hover:text-platinum">
                    <Linkedin className="size-4" />
                    LinkedIn
                  </a>
                  <a href="https://github.com/mrizkysyadrie" className="inline-flex items-center gap-2 rounded-[6px] border border-line bg-white/[0.035] px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-white/40 hover:text-platinum">
                    <Github className="size-4" />
                    GitHub
                  </a>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <footer className="border-t border-line px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-slate-500 md:flex-row md:items-center">
          <p>Jakarta, Indonesia / Open to relocation across Germany, EU, Canada, Australia, and UAE.</p>
          <p className="font-mono uppercase tracking-[0.18em]">mrizkysyadrie.dev</p>
        </div>
      </footer>
    </>
  );
}
