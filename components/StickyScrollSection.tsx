"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, CloudCog, Code2, Cpu, DatabaseZap, Hexagon, Layers3, LineChart, ServerCog } from "lucide-react";
import { RefObject, useEffect, useRef, useState } from "react";

type CapabilitySection = {
  title: string;
  eyebrow: string;
  body: string;
  proof: string;
  tags: string[];
  gradient: string;
};

const sections: CapabilitySection[] = [
  {
    title: "Deploy Any Product Surface",
    eyebrow: "Full-stack acquisition platforms",
    body: "Build enterprise web platforms, CMS systems, lead-generation journeys, and marketplace interfaces that convert complex business problems into maintainable digital systems.",
    proof: "Translate client acquisition, operational, and content-management needs into fast product surfaces with a reliable Next.js and API foundation.",
    tags: ["Next.js", "React", "TypeScript", "GraphQL"],
    gradient: "from-white/20 via-transparent to-slate-500/12"
  },
  {
    title: "Manage Growth Systems",
    eyebrow: "SEO and analytics architecture",
    body: "Connect product UX to measurable business outcomes through structured data, crawler accessibility, journey tracking, and behavioral analytics.",
    proof: "Helped improve campaign targeting to roughly 70% qualified lead matching and reduce bounce-rate friction by about 40%.",
    tags: ["JSON-LD", "GA4", "Clarity", "Web Vitals"],
    gradient: "from-slate-300/24 via-transparent to-white/14"
  },
  {
    title: "Scale Reliability",
    eyebrow: "Cloud, DevOps, and quality",
    body: "Keep production systems observable, secure, release-ready, and cost-aware across cloud infrastructure, CI/CD, monitoring, and quality gates.",
    proof: "Reduced media infrastructure cost by 50% through archival workflows, delivery optimization, and lifecycle improvements.",
    tags: ["GCP", "Docker", "Jenkins", "Kibana"],
    gradient: "from-slate-200/22 via-transparent to-white/16"
  },
  {
    title: "Orchestrate Data Products",
    eyebrow: "Web3 and dense technical UI",
    body: "Design data-heavy interfaces and backend patterns for realtime dashboards, market intelligence, token research, and systems-minded product delivery.",
    proof: "Built Alpha Stream, a crypto market-intelligence terminal for Pump.fun ecosystem exploration and dense market-data workflows.",
    tags: ["Solana", "Go", "Rust", "Realtime UI"],
    gradient: "from-white/18 via-transparent to-slate-500/12"
  }
];

function useBlockActiveIndex(itemRefs: RefObject<Array<HTMLElement | null>>) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateActiveBlock = () => {
      const viewportCenter = window.innerHeight / 2;
      const closest = itemRefs.current.reduce(
        (best, node, index) => {
          if (!node) {
            return best;
          }

          const rect = node.getBoundingClientRect();
          const blockCenter = rect.top + rect.height / 2;
          const distance = Math.abs(blockCenter - viewportCenter);

          return distance < best.distance ? { index, distance } : best;
        },
        { index: 0, distance: Number.POSITIVE_INFINITY }
      );

      setActiveIndex((current) => (current === closest.index ? current : closest.index));
    };

    const requestUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateActiveBlock();
      });
    };

    updateActiveBlock();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [itemRefs]);

  return activeIndex;
}

function DeployVisual() {
  return (
    <div className="overflow-hidden rounded-[8px] border border-white/10 bg-[#0a0d12]/92 shadow-2xl">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.035] px-4 py-3">
        <span className="size-3 rounded-full bg-white/70" />
        <span className="size-3 rounded-full bg-white/35" />
        <span className="size-3 rounded-full bg-white/20" />
        <span className="ml-3 font-mono text-xs text-slate-500">deploy-client-platform.ts</span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-6 text-slate-300 md:p-5 md:text-sm md:leading-7">
        <code>
          <span className="text-slate-300">const</span> <span className="text-platinum">platform</span> = <span className="text-platinum">await</span>{" "}
          <span className="text-platinum">deploy</span>({"\n"}
          {"  "}
          <span className="text-slate-500">surface</span>: <span className="text-slate-300">&quot;client growth platform&quot;</span>,{"\n"}
          {"  "}
          <span className="text-slate-500">runtime</span>: <span className="text-slate-300">&quot;Next.js + GraphQL&quot;</span>,{"\n"}
          {"  "}
          <span className="text-slate-500">telemetry</span>: [<span className="text-slate-300">&quot;GA4&quot;</span>, <span className="text-slate-300">&quot;Clarity&quot;</span>],{"\n"}
          {"  "}
          <span className="text-slate-500">outcome</span>: <span className="text-slate-300">&quot;lower-friction acquisition&quot;</span>{"\n"}
          {"});"}
        </code>
      </pre>
    </div>
  );
}

function GrowthVisual() {
  return (
    <div className="grid gap-4">
      <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3 text-platinum">
            <LineChart className="size-5" />
            <span className="font-mono text-xs uppercase tracking-[0.22em]">journey analytics</span>
          </div>
          <span className="rounded-[6px] bg-white/15 px-2 py-1 font-mono text-xs text-platinum">+70% match</span>
        </div>
        <div className="space-y-3">
          {["Organic search", "Campaign lead", "Article conversion", "Finance application"].map((label, index) => (
            <div key={label} className="grid gap-2 text-sm text-slate-300 sm:grid-cols-[9rem_1fr] sm:items-center sm:gap-3">
              <span>{label}</span>
              <div className="h-2 rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-white to-slate-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${58 + index * 11}%` }}
                  transition={{ duration: 0.8, delay: index * 0.08 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {["JSON-LD", "Sitemap", "Crawler access"].map((item) => (
          <div key={item} className="rounded-[8px] border border-white/10 bg-white/[0.035] p-4 text-sm text-slate-300">
            <CheckCircle2 className="mb-3 size-5 text-platinum" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function ReliabilityVisual() {
  return (
    <div className="grid gap-4">
      <div className="rounded-[8px] border border-white/10 bg-[#0a0d0f]/85 p-5">
        <div className="flex items-center gap-3 text-platinum">
          <CloudCog className="size-5" />
          <span className="font-mono text-xs uppercase tracking-[0.22em]">release pipeline</span>
        </div>
        <div className="mt-6 grid gap-3">
          {["Docker build", "Jenkins deploy", "Snyk scan", "Kibana observe"].map((step) => (
            <div key={step} className="flex items-center justify-between rounded-[8px] border border-white/10 bg-white/[0.035] px-4 py-3">
              <span className="text-sm text-slate-200">{step}</span>
              <span className="font-mono text-xs text-platinum">passed</span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[8px] border border-white/20 bg-white/10 p-5">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-platinum">cost optimization</p>
        <p className="mt-3 text-4xl font-semibold tracking-tight text-platinum">50% lower</p>
        <p className="mt-2 text-sm leading-6 text-slate-300">Media infrastructure cost through archival, delivery optimization, and lifecycle work.</p>
      </div>
    </div>
  );
}

function DataVisual() {
  return (
    <div className="relative overflow-hidden rounded-[8px] border border-white/10 bg-[#080d12]/90 p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),transparent_16rem)]" />
      <div className="relative z-10">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3 text-platinum">
            <DatabaseZap className="size-5" />
            <span className="font-mono text-xs uppercase tracking-[0.22em]">alpha stream terminal</span>
          </div>
          <span className="rounded-[6px] border border-white/25 bg-white/10 px-2 py-1 font-mono text-xs text-platinum">live</span>
        </div>
        <div className="grid gap-3">
          {[
            ["SOL/USDC", "+12.4%", "token signal"],
            ["Pump.fun", "829 tx", "stream volume"],
            ["Wallet graph", "44 nodes", "research view"],
            ["Latency", "88 ms", "event update"]
          ].map(([name, value, label]) => (
            <div key={name} className="grid grid-cols-[1fr_auto] gap-3 rounded-[8px] border border-white/10 bg-white/[0.035] p-4">
              <div>
                <p className="text-sm font-medium text-platinum">{name}</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-slate-500">{label}</p>
              </div>
              <p className="font-mono text-sm text-platinum">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ActiveVisual({ activeIndex }: { activeIndex: number }) {
  const visual = [
    <DeployVisual key="deploy" />,
    <GrowthVisual key="growth" />,
    <ReliabilityVisual key="reliability" />,
    <DataVisual key="data" />
  ][activeIndex];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeIndex}
        initial={{ y: 20, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -20, opacity: 0, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {visual}
      </motion.div>
    </AnimatePresence>
  );
}

function MobileVisualBox({ activeIndex }: { activeIndex: number }) {
  return (
    <motion.div
      className="relative mt-8 overflow-hidden rounded-[8px] border border-white/10 bg-black/40 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.36)] backdrop-blur-md md:hidden"
      initial={{ opacity: 0, y: 18, scale: 0.965, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ type: "spring", stiffness: 180, damping: 24 }}
    >
      <motion.div
        className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-transparent via-white/70 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
        initial={{ x: "-20%" }}
        whileInView={{ x: "320%" }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
      />

      <div className="relative z-10 mb-4 flex items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid size-9 place-items-center rounded-[8px] border border-white/10 bg-white/[0.035] text-platinum">
            <Code2 className="size-4" />
          </div>
          <div className="min-w-0">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-slate-500">System View</p>
            <h4 className="truncate text-sm font-semibold tracking-tight text-platinum">{sections[activeIndex].title}</h4>
          </div>
        </div>
        <div className="flex shrink-0 gap-1.5">
          <span className="size-2 rounded-full bg-white" />
          <span className="size-2 rounded-full bg-white/60" />
          <span className="size-2 rounded-full bg-slate-500" />
        </div>
      </div>

      <div className="relative z-10 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <ActiveVisual activeIndex={activeIndex} />
      </div>
    </motion.div>
  );
}

export function StickyScrollSection() {
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const activeIndex = useBlockActiveIndex(itemRefs);
  const progressHeight = `${((activeIndex + 1) / sections.length) * 100}%`;

  return (
    <section className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-[6px] border border-line bg-white/[0.035] px-3 py-2 font-mono text-xs uppercase tracking-[0.24em] text-platinum">
            <Hexagon className="size-4" />
            Technical Capabilities
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-platinum md:text-6xl">Scale product engineering, without losing business context.</h2>
          <p className="mt-5 text-base leading-7 text-slate-400 md:text-lg">
            A scroll-driven view of end-to-end digitalization. Navigating how full-spectrum engineering—from resilient cloud architecture to frictionless user interfaces—transforms complex operations into scalable, high-growth ecosystems.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-stretch lg:gap-16">
          <div className="relative">
            <div className="absolute left-0 top-0 hidden h-full w-px bg-white/10 md:block">
              <motion.div
                className="w-px bg-gradient-to-b from-white via-slate-400 to-slate-200"
                initial={false}
                animate={{ height: progressHeight }}
                transition={{ type: "spring", stiffness: 180, damping: 24 }}
              />
            </div>

            <div className="space-y-10 md:pl-8">
              {sections.map((section, index) => {
                const isActive = activeIndex === index;
                const Icon = [Layers3, LineChart, ServerCog, Cpu][index];

                return (
                  <motion.article
                    key={section.title}
                    ref={(node) => {
                      itemRefs.current[index] = node;
                    }}
                    data-index={index}
                    className="flex min-h-[50vh] flex-col justify-center border-b border-line py-12 last:border-b-0"
                    animate={{ opacity: isActive ? 1 : 0.4 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="mb-5 flex items-center gap-3">
                      <div className={`grid size-11 place-items-center rounded-[8px] border border-line bg-white/[0.035] ${isActive ? "text-platinum" : "text-muted"}`}>
                        <Icon className="size-5" />
                      </div>
                      <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">{section.eyebrow}</p>
                    </div>
                    <h3 className="text-3xl font-semibold tracking-tight text-platinum md:text-5xl">{section.title}</h3>
                    <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">{section.body}</p>
                    <p className="mt-5 max-w-xl border-l border-white/35 pl-4 text-sm leading-6 text-slate-400">{section.proof}</p>
                    <div className="mt-6 flex flex-wrap gap-2 md:hidden">
                      {section.tags.map((tag) => (
                        <span key={tag} className="rounded-[6px] border border-line bg-white/[0.035] px-3 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-slate-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <MobileVisualBox activeIndex={index} />
                  </motion.article>
                );
              })}
            </div>
          </div>

          <div className="relative hidden h-full min-h-full md:block">
            <div className="sticky top-24 h-[60vh] min-h-[30rem]">
              <motion.div
                className={`absolute -inset-16 rounded-full bg-gradient-to-br blur-3xl ${sections[activeIndex].gradient}`}
                animate={{ opacity: [0.42, 0.64, 0.42] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative h-full rounded-[8px] border border-white/10 bg-black/40 p-5 shadow-[0_24px_100px_rgba(0,0,0,0.42)] backdrop-blur-md">
                <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-[8px] border border-white/10 bg-white/[0.035] text-platinum">
                      <Code2 className="size-5" />
                    </div>
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.22em] text-slate-500">Active System</p>
                      <h4 className="text-lg font-semibold tracking-tight text-platinum">{sections[activeIndex].title}</h4>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="size-2 rounded-full bg-white" />
                    <span className="size-2 rounded-full bg-white" />
                    <span className="size-2 rounded-full bg-slate-400" />
                  </div>
                </div>

                <ActiveVisual activeIndex={activeIndex} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
