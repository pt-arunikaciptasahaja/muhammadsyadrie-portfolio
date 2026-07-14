"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, DatabaseZap, ServerCog } from "lucide-react";
import { ClientMarquee } from "@/components/ClientMarquee";
import { HeroCanvas } from "@/components/HeroCanvas";
import { MouseGlow } from "@/components/MouseGlow";
import { OutroSection } from "@/components/OutroSection";
import { ProjectModal } from "@/components/ProjectModal";
import { ProjectReel } from "@/components/ProjectReel";
import { StickyScrollSection } from "@/components/StickyScrollSection";
import { Project, projects } from "@/data/projects";

const badges = ["Go", "Rust", "Web3 / Solana", "Google Associate Cloud Engineer"];

export function PortfolioExperience() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <main className="relative isolate min-h-screen overflow-x-clip">
      <MouseGlow />

      <section className="relative flex min-h-screen items-center px-4 py-24 sm:px-6 lg:px-8">
        <HeroCanvas />
        <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 rounded-[6px] border border-white/25 bg-white/10 px-3 py-2 font-mono text-xs uppercase tracking-[0.24em] text-platinum">
              <DatabaseZap className="size-4" />
              Cloud-native systems + Web3 interfaces
            </div>

            <h1 className="mt-7 max-w-5xl text-5xl font-semibold tracking-tight text-platinum sm:text-6xl lg:text-7xl">
              Full-Stack & Cloud Engineer for acquisition platforms, analytics, and high-trust product systems.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              I bring 6+ years of software engineering and 9 years of banking operations experience into products where performance, search, analytics, reliability, and business outcomes all have to line up.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {badges.map((badge) => (
                <span key={badge} className="inline-flex items-center gap-2 rounded-[6px] border border-line bg-white/[0.035] px-3 py-2 text-sm text-slate-200 backdrop-blur">
                  <BadgeCheck className="size-4 text-platinum" />
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="hidden rounded-[8px] border border-line bg-panel/55 p-5 shadow-glow backdrop-blur-xl lg:block"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div className="flex items-center gap-2 font-mono text-sm text-platinum">
                <ServerCog className="size-4" />
                infrastructure.map
              </div>
              <div className="flex gap-1.5">
                <span className="size-2 rounded-full bg-white" />
                <span className="size-2 rounded-full bg-white" />
                <span className="size-2 rounded-full bg-slate-400" />
              </div>
            </div>
            <div className="grid gap-3 py-5 font-mono text-sm text-slate-300">
              {["edge -> app router -> api gateway", "events -> analytics lake -> dashboards", "solana streams -> signal engine -> terminal"].map((line) => (
                <div key={line} className="rounded-[6px] border border-line bg-abyss/60 px-3 py-3">
                  {line}
                </div>
              ))}
            </div>
            <div className="rounded-[6px] border border-white/20 bg-white/10 p-3 text-sm leading-6 text-slate-300">
              50% lower media infrastructure cost, 40% lower bounce rate, and roughly 70% qualified lead matching through better platform, UX, SEO, and analytics architecture.
            </div>
          </motion.div>
        </div>
      </section>

      <ClientMarquee />

      <section className="relative px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-sm uppercase tracking-[0.28em] text-platinum">Selected Work</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-platinum md:text-5xl">Project gallery</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-400 md:text-right">
              Enterprise apps, Web3 data systems, and full-stack commerce work grouped by product context, architecture, and business outcome.
            </p>
          </div>

          <ProjectReel projects={projects} onSelect={setSelectedProject} />
        </div>
      </section>

      <StickyScrollSection />

      <OutroSection />

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </main>
  );
}
