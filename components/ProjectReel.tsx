"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Project } from "@/data/projects";

const SLIDE_DURATION_MS = 5000;

type ProjectReelProps = {
  projects: Project[];
  onSelect: (project: Project) => void;
};

export function ProjectReel({ projects, onSelect }: ProjectReelProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeProject = projects[activeIndex];
  const nextProject = projects[(activeIndex + 1) % projects.length];

  useEffect(() => {
    if (isPaused || projects.length < 2) {
      return;
    }

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % projects.length);
    }, SLIDE_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [activeIndex, isPaused, projects.length]);

  const groupedMeta = useMemo(() => {
    return projects.reduce<Record<string, number>>((acc, project) => {
      acc[project.group] = (acc[project.group] ?? 0) + 1;
      return acc;
    }, {});
  }, [projects]);

  return (
    <div className="rounded-[8px] border border-line bg-panel/70 p-4 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl md:p-6">
      <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex flex-wrap gap-2">
          {Object.entries(groupedMeta).map(([group, count]) => (
            <span key={group} className="rounded-[6px] border border-line bg-white/[0.035] px-3 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-slate-400">
              {group} / {count}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsPaused((current) => !current)}
          className="inline-flex items-center gap-2 rounded-[6px] border border-line bg-white/[0.035] px-3 py-2 text-sm text-slate-300 transition hover:border-white/40 hover:text-platinum"
        >
          {isPaused ? <Play className="size-4" /> : <Pause className="size-4" />}
          {isPaused ? "Resume reel" : "Pause reel"}
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.74fr_1.26fr] lg:items-stretch">
        <div className="flex min-h-[25rem] flex-col justify-between rounded-[8px] border border-line bg-abyss/70 p-5">
          <div>
            <div className="relative inline-flex max-w-full overflow-hidden rounded-[8px] border border-white/25 bg-white/10 px-4 py-3">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={activeProject.id}
                  className="relative z-10 text-2xl font-semibold tracking-tight text-platinum md:text-3xl"
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -18, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 220, damping: 24 }}
                >
                  {activeProject.title}
                </motion.h3>
              </AnimatePresence>
              <motion.span
                key={`${activeProject.id}-${isPaused ? "paused" : "running"}`}
                className="absolute inset-x-0 bottom-0 h-1 origin-left bg-gradient-to-r from-white via-slate-400 to-slate-200"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isPaused ? 0 : 1 }}
                transition={{ duration: SLIDE_DURATION_MS / 1000, ease: "linear" }}
              />
              <span className="pointer-events-none absolute inset-0 rounded-[8px] ring-1 ring-inset ring-white/25" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeProject.id}-copy`}
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -18, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 24 }}
              >
                <p className="mt-6 font-mono text-xs uppercase tracking-[0.24em] text-platinum">{activeProject.group}</p>
                <p className="mt-3 text-base leading-7 text-slate-300">{activeProject.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {activeProject.stack.slice(0, 5).map((item) => (
                    <span key={item} className="rounded-[6px] border border-line bg-white/[0.035] px-3 py-1.5 text-sm text-slate-300">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-5">
            <button
              type="button"
              onClick={() => onSelect(activeProject)}
              className="inline-flex items-center gap-2 rounded-[6px] border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-medium text-platinum transition hover:border-white/60 hover:bg-white/15"
            >
              Open case study
              <ArrowUpRight className="size-4" />
            </button>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
              Next / {nextProject.title}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSelect(activeProject)}
          className="group relative min-h-[25rem] overflow-hidden rounded-[8px] border border-line bg-abyss text-left outline-none"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              className="absolute inset-0"
              initial={{ x: 80, opacity: 0, scale: 1.03 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: -80, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 170, damping: 24 }}
            >
              <Image src="/example.png" alt="" fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover opacity-70 mix-blend-screen transition duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-abyss/35 to-slate-400/25" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-abyss via-abyss/70 to-transparent p-5 md:p-7">
                <p className="max-w-2xl text-lg font-medium leading-7 text-platinum">{activeProject.impact}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
