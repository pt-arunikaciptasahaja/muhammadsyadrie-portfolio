"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, ShieldCheck, X } from "lucide-react";
import type { Project } from "@/data/projects";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, project]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-abyss/70 p-3 backdrop-blur-xl md:items-center md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.article
            layoutId={`project-${project.id}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`project-title-${project.id}`}
            className="max-h-[88vh] w-full max-w-4xl overflow-hidden rounded-[8px] border border-line bg-panel shadow-violet-glow"
            initial={{ y: 36, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 24, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="grid max-h-[88vh] overflow-y-auto md:grid-cols-[0.92fr_1.08fr]">
              <div className="relative min-h-64 overflow-hidden border-b border-line bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_18rem),linear-gradient(135deg,rgba(15,23,42,0.2),rgba(11,15,25,0.92))] md:border-b-0 md:border-r">
                <Image src="/example.png" alt="" fill sizes="(min-width: 768px) 42vw, 100vw" className="object-cover opacity-70 mix-blend-screen" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-slate-400/20" />
                <div className="absolute bottom-4 left-4 rounded-[6px] border border-line bg-abyss/72 px-3 py-2 text-xs font-medium uppercase tracking-[0.24em] text-platinum">
                  {project.group}
                </div>
              </div>

              <div className="space-y-7 p-6 md:p-8">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Case Study</p>
                    <h2 id={`project-title-${project.id}`} className="mt-3 text-3xl font-semibold tracking-tight text-platinum md:text-4xl">
                      {project.title}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close project modal"
                    className="grid size-10 shrink-0 place-items-center rounded-[6px] border border-line bg-white/[0.03] text-muted transition hover:border-white/50 hover:text-platinum"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                <p className="text-base leading-7 text-slate-300">{project.details}</p>

                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.24em] text-platinum">Tech Stack</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span key={item} className="rounded-[6px] border border-line bg-white/[0.035] px-3 py-1.5 text-sm text-slate-200">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.24em] text-slate-300">SEO / Analytics Architecture</h3>
                  <div className="mt-3 grid gap-3">
                    {project.architecture.map((item) => (
                      <div key={item} className="flex gap-3 rounded-[8px] border border-line bg-white/[0.025] p-3 text-sm text-slate-300">
                        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-platinum" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-line pt-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
                  <span>{project.impact}</span>
                  <span className="inline-flex items-center gap-2 font-mono text-platinum">
                    SPA modal detail layer
                    <ExternalLink className="size-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
