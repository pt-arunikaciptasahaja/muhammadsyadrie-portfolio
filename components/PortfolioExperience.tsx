"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Circle, DatabaseZap, Diamond, Hexagon, Octagon, Square, Triangle } from "lucide-react";
import { AboutRevealSection } from "@/components/AboutRevealSection";
import { ClientMarquee } from "@/components/ClientMarquee";
import { HeroCanvas } from "@/components/HeroCanvas";
import { MouseGlow } from "@/components/MouseGlow";
import { OutroSection } from "@/components/OutroSection";
import { ProjectModal } from "@/components/ProjectModal";
import { ProjectReel } from "@/components/ProjectReel";
import { StickyScrollSection } from "@/components/StickyScrollSection";
import { Project, projects } from "@/data/projects";

const badges = [
  { label: "Growth Infrastructure", Icon: Triangle },
  { label: "AI-Driven Workflows", Icon: Diamond },
  { label: "Performance Optimization", Icon: Circle },
  { label: "Conversion Engineering", Icon: Square },
  { label: "Scalable Operations", Icon: Hexagon },
  { label: "Digital Resilience", Icon: Octagon }
];
const impactStats = [
  { value: "-50%", label: "Infrastructure Overhead" },
  { value: "-40%", label: "User Friction & Bounce" },
  { value: "∞", label: "Scalability via AI & Automation" }
];

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
            <div className="flex items-center gap-x-2 text-sm text-slate-400">
              <DatabaseZap className="size-4" />
              Cloud-native ecosystems // Web3 interfaces
            </div>

            <h1 className="mt-7 max-w-5xl bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-5xl font-semibold tracking-tight text-transparent sm:text-6xl lg:text-7xl">
              Crafting fault-tolerant products and intelligent systems of scale.
            </h1>

            <p className="mt-6 max-w-3xl text-xl font-light leading-snug text-slate-300">
              Fewer bottlenecks. Infinite leverage.
              <br className="hidden sm:block" />
              I transform complex business logic into automated, high-performing platforms. By integrating applied AI and lean cloud architecture, I engineer systems that cut infrastructure overhead by 50%, reduce bounce rates by 40%, and turn manual processes into seamless digital experiences.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {badges.map(({ label, Icon }) => (
                <span
                  key={label}
                  className="group inline-flex items-center gap-2 rounded-[6px] border border-line bg-white/[0.035] px-3 py-2 text-sm text-slate-200 backdrop-blur transition-all duration-300 hover:border-slate-500"
                >
                  <Icon className="size-3 fill-platinum/20 text-platinum transition-all duration-300 group-hover:fill-platinum/60" strokeWidth={1} />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="hidden rounded-[8px] border border-line bg-panel/55 p-8 shadow-glow backdrop-blur-xl lg:block"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-8 text-sm uppercase tracking-widest text-slate-500">Driving scale through full-stack architecture & AI automation</p>

            <div className="grid grid-cols-1 gap-8 border-t border-slate-800/50 pt-8 sm:grid-cols-3">
              {impactStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="flex flex-col"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ delay: index * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="text-5xl font-light tracking-tighter text-platinum">{stat.value}</span>
                  <span className="mt-2 text-sm font-medium text-slate-400">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <ClientMarquee />

      <AboutRevealSection />

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
