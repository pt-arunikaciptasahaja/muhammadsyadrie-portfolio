"use client";

import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  onSelect: (project: Project) => void;
};

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [7, -7]), { stiffness: 280, damping: 28 });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-8, 8]), { stiffness: 280, damping: 28 });
  const glareX = useTransform(pointerX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(pointerY, [-0.5, 0.5], ["0%", "100%"]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255, 89, 74, 0.18), transparent 34%)`;

  return (
    <motion.button
      type="button"
      layoutId={`project-${project.id}`}
      className={`group relative min-h-[17rem] overflow-hidden rounded-[8px] border border-line bg-panel p-0 text-left shadow-[0_1px_0_rgba(252,255,218,0.08)_inset] outline-none transition-colors hover:border-cyan ${project.className}`}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
        pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
      onClick={() => onSelect(project)}
    >
      <Image
        src="/example.png"
        alt=""
        fill
        sizes="(min-width: 768px) 33vw, 100vw"
        className="absolute inset-0 object-cover opacity-[0.28] transition duration-500 group-hover:scale-105 group-hover:opacity-40"
      />
      <motion.div aria-hidden="true" className="absolute inset-0" style={{ background: glare }} />
      <div className="absolute inset-0 bg-gradient-to-b from-abyss/12 via-abyss/55 to-abyss/95" />

      <div className="relative flex h-full min-h-[17rem] flex-col justify-between p-5 md:p-6" style={{ transform: "translateZ(34px)" }}>
        <div className="flex items-start justify-between gap-4">
          <span className="rounded-[6px] border border-line bg-abyss/55 px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-platinum backdrop-blur">
            {project.group}
          </span>
          <span className="grid size-9 place-items-center rounded-[6px] border border-line bg-white/[0.035] text-muted transition group-hover:border-white/40 group-hover:text-platinum">
            <ArrowUpRight className="size-4" />
          </span>
        </div>

        <div>
          <h3 className="max-w-xl text-2xl font-semibold tracking-tight text-platinum md:text-3xl">{project.title}</h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">{project.summary}</p>
        </div>
      </div>
    </motion.button>
  );
}
