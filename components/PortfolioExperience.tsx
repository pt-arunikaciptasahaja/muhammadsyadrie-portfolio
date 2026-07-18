"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
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
  { label: "Growth Infrastructure", mobileLabel: "Growth Infra", Icon: Triangle },
  { label: "AI-Driven Workflows", mobileLabel: "AI Workflows", Icon: Diamond },
  { label: "Performance Optimization", mobileLabel: "Performance", Icon: Circle },
  { label: "Conversion Engineering", mobileLabel: "Conversion", Icon: Square },
  { label: "Scalable Operations", mobileLabel: "Scale Ops", Icon: Hexagon },
  { label: "Digital Resilience", mobileLabel: "Resilience", Icon: Octagon }
];
const impactStats = [
  { value: "-50%", label: "Infrastructure Overhead" },
  { value: "-40%", label: "User Friction & Bounce" },
  { value: "∞", label: "Scalability via AI & Automation" }
];
const heroCopy =
  "Fewer bottlenecks. Infinite leverage. I transform complex business logic into automated, high-performing platforms. By integrating applied AI and lean cloud architecture, I engineer systems that cut infrastructure overhead by 50%, reduce bounce rates by 40%, and turn manual processes into seamless digital experiences.";
const scrambleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/";
const glassCards = [
  { metric: "01", label: "Cloud Logic", detail: "Lean operating layers" },
  { metric: "02", label: "AI Flows", detail: "Automated decisions" },
  { metric: "03", label: "Data Signals", detail: "Measured performance" },
  { metric: "04", label: "Resilience", detail: "Fault-tolerant paths" },
  { metric: "05", label: "Growth Loops", detail: "Compounding systems" }
];
type GlassStackStyle = CSSProperties & {
  "--index": number;
};
type GlassStackContainerStyle = CSSProperties & {
  "--progress": number;
};

function createScrambleText(copy: string) {
  return copy
    .split("")
    .map((character) => (character === " " ? " " : scrambleCharacters[Math.floor(Math.random() * scrambleCharacters.length)]))
    .join("");
}

function HeroScrambleText() {
  const [displayText, setDisplayText] = useState("");
  const stableFallback = useMemo(() => heroCopy.replace(/\S/g, "0"), []);

  useEffect(() => {
    let frameId = 0;
    let timeoutId = 0;

    timeoutId = window.setTimeout(() => {
      const start = performance.now();
      const duration = 1000;

      const animate = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const resolvedCount = Math.floor(progress * heroCopy.length);

        setDisplayText(
          heroCopy
            .split("")
            .map((character, index) => {
              if (index < resolvedCount) {
                return character;
              }

              return character === " " ? " " : scrambleCharacters[Math.floor(Math.random() * scrambleCharacters.length)];
            })
            .join("")
        );

        if (progress < 1) {
          frameId = window.requestAnimationFrame(animate);
        } else {
          setDisplayText(heroCopy);
        }
      };

      setDisplayText(createScrambleText(heroCopy));
      frameId = window.requestAnimationFrame(animate);
    }, 1000);

    return () => {
      window.clearTimeout(timeoutId);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <motion.p
      className="mt-5 min-h-[14rem] max-w-3xl rounded-[6px] border border-platinum/25 bg-platinum/[0.055] p-4 font-mono text-sm leading-7 text-slate-300 sm:mt-6 sm:min-h-[11rem] sm:p-5 sm:text-base"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.18 }}
    >
      {displayText || stableFallback}
    </motion.p>
  );
}

function HeroGlassStack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const targetProgressRef = useRef(0);
  const displayProgressRef = useRef(0);

  useEffect(() => {
    let isMounted = true;

    const measureProgress = () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const stage = section.querySelector<HTMLElement>(".hero-glass-stage");
      const stageTop = stage?.getBoundingClientRect().top ?? section.getBoundingClientRect().top;
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const travelDistance = window.innerHeight * (isMobile ? 0.9 : 0.72);

      targetProgressRef.current = Math.min(Math.max((window.innerHeight - stageTop) / travelDistance, 0), 1);
    };

    const animateProgress = () => {
      const current = displayProgressRef.current;
      const target = targetProgressRef.current;
      const nextProgress = current + (target - current) * 0.085;
      const settledProgress = Math.abs(target - nextProgress) < 0.0005 ? target : nextProgress;

      displayProgressRef.current = settledProgress;
      sectionRef.current?.style.setProperty("--progress", settledProgress.toString());

      if (isMounted) {
        frameRef.current = window.requestAnimationFrame(animateProgress);
      }
    };

    const requestUpdate = () => {
      measureProgress();
    };

    requestUpdate();
    frameRef.current = window.requestAnimationFrame(animateProgress);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      isMounted = false;
      window.cancelAnimationFrame(frameRef.current);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div ref={sectionRef} className="hero-data-stream lg:col-span-2" style={{ "--progress": 0 } as GlassStackContainerStyle}>
      <div className="hero-glass-sticky">
        <div className="hero-glass-stage">
          {glassCards.map((card, index) => (
            <article key={card.label} className="glass-card" style={{ "--index": index } as GlassStackStyle}>
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-slate-400">{card.metric}</span>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight text-platinum">{card.label}</h3>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-slate-400">{card.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PortfolioExperience() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <main className="relative isolate min-h-screen overflow-x-clip">
      <MouseGlow />

      <section className="relative flex min-h-[96svh] items-end bg-abyss px-4 pb-10 pt-[38svh] sm:min-h-[138svh] sm:px-6 sm:pb-24 sm:pt-[76svh] lg:min-h-[132vh] lg:px-8 lg:pb-24 lg:pt-[74vh]">
        <HeroCanvas />
        <div className="hero-blueprint-grid pointer-events-none absolute inset-0 z-[1]" />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-8 rounded-[8px] border border-white/10 bg-[#143F99]/80 p-5 shadow-glow backdrop-blur-xl sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-x-12 lg:gap-y-8 lg:p-10">
          <div>
            <motion.div
              className="flex items-center gap-x-2 text-sm text-slate-400"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <DatabaseZap className="size-4" />
              Full-stack engineer for reliable product platforms
            </motion.div>

            <motion.h1
              className="mt-7 max-w-5xl text-4xl font-semibold tracking-tight text-platinum sm:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              Crafting fault-tolerant products and intelligent systems of scale.
            </motion.h1>

            <HeroScrambleText />

            <motion.a
              href="#selected-work"
              className="mt-6 inline-flex min-h-12 items-center rounded-[6px] border border-cyan bg-cyan px-5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-abyss transition hover:bg-cyan-soft"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              Start transmission
            </motion.a>

            <div className="mt-7 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3 md:mt-8">
              {badges.map(({ label, mobileLabel, Icon }) => (
                <span
                  key={label}
                  className="group inline-flex min-w-0 items-center gap-2 rounded-[6px] border border-line bg-white/[0.035] px-2.5 py-2 text-xs text-slate-200 backdrop-blur transition-all duration-300 hover:border-slate-500 sm:px-3 sm:text-sm"
                >
                  <Icon className="size-3 shrink-0 fill-platinum/20 text-platinum transition-all duration-300 group-hover:fill-platinum/60" strokeWidth={1} />
                  <span className="truncate sm:hidden">{mobileLabel}</span>
                  <span className="hidden sm:inline">{label}</span>
                </span>
              ))}
            </div>

          </div>

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

          <HeroGlassStack />
        </div>
      </section>

      <ClientMarquee />

      <AboutRevealSection />

      <section id="selected-work" className="relative px-4 py-24 sm:px-6 lg:px-8">
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
