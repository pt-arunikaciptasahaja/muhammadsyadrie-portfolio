"use client";

import { MotionValue, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { ComponentType, PointerEvent, useRef } from "react";
import { TextSpinner } from "@/components/TextSpinner";

type MagneticButtonProps = {
  href: string;
  label: string;
  Icon: ComponentType<{ className?: string }>;
  showArrow?: boolean;
  primary?: boolean;
};

type RotatingOutroObjectProps = {
  rotate: MotionValue<string>;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
};

function MagneticButton({ href, label, Icon, showArrow = false, primary = false }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.45 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.45 });

  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    const bounds = buttonRef.current?.getBoundingClientRect();

    if (!bounds) {
      return;
    }

    const distanceX = event.clientX - (bounds.left + bounds.width / 2);
    const distanceY = event.clientY - (bounds.top + bounds.height / 2);

    x.set(distanceX * 0.22);
    y.set(distanceY * 0.32);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      className={
        primary
          ? "inline-flex items-center gap-2 rounded-[6px] border border-cyan bg-cyan px-4 py-3 text-sm font-semibold text-abyss transition hover:bg-cyan-soft"
          : "inline-flex items-center gap-2 rounded-[6px] border border-line bg-white/[0.035] px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-white/40 hover:text-platinum"
      }
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x: springX, y: springY }}
      transition={{ type: "spring", stiffness: 320, damping: 18 }}
    >
      <Icon className="size-4" />
      {label}
      {showArrow ? <ArrowUpRight className="size-4" /> : null}
    </motion.a>
  );
}

function RotatingOutroObject({ rotate, opacity, y }: RotatingOutroObjectProps) {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute right-[-15rem] top-[36%] hidden -translate-y-1/2 md:block lg:right-[-18rem] xl:right-[-22rem]"
      style={{ rotate, opacity, y }}
    >
      <TextSpinner />
    </motion.div>
  );
}

export function OutroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const nameYRaw = useTransform(scrollYProgress, [0, 0.45], [0, -100]);
  const nameOpacityRaw = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const connectYRaw = useTransform(scrollYProgress, [0.45, 0.6], [100, 0]);
  const connectOpacityRaw = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);
  const lineScaleRaw = useTransform(scrollYProgress, [0.42, 0.6], [0, 1]);

  const springConfig = { stiffness: 120, damping: 24, mass: 0.65 };
  const nameY = useSpring(nameYRaw, springConfig);
  const nameOpacity = useSpring(nameOpacityRaw, springConfig);
  const connectY = useSpring(connectYRaw, springConfig);
  const connectOpacity = useSpring(connectOpacityRaw, springConfig);
  const lineScaleX = useSpring(lineScaleRaw, springConfig);
  const connectMaskY = useTransform(connectOpacity, [0, 1], ["100%", "0%"]);
  const objectRotateRaw = useTransform(scrollYProgress, [0, 1], ["-8deg", "28deg"]);
  const objectYRaw = useTransform(scrollYProgress, [0.35, 0.62], [80, 0]);
  const objectOpacityRaw = useTransform(scrollYProgress, [0.34, 0.54, 0.92], [0, 0.9, 0.58]);
  const objectRotate = useSpring(objectRotateRaw, { stiffness: 90, damping: 22, mass: 0.8 });
  const objectY = useSpring(objectYRaw, springConfig);
  const objectOpacity = useSpring(objectOpacityRaw, springConfig);

  return (
    <>
      <section ref={sectionRef} className="relative h-[200vh] border-t border-line">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden px-4 sm:px-6 lg:px-8">
          <RotatingOutroObject rotate={objectRotate} opacity={objectOpacity} y={objectY} />
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div className="relative min-h-4 overflow-hidden">
                <motion.p className="font-mono text-xs uppercase tracking-[0.34em] text-muted" style={{ y: nameY, opacity: nameOpacity }}>
                  Full-stack software engineer
                </motion.p>
                <motion.p
                  className="absolute inset-0 font-mono text-xs uppercase tracking-[0.34em] text-muted"
                  style={{ y: connectY, opacity: connectOpacity }}
                >
                  Available for global roles
                </motion.p>
              </div>
              <div className="hidden h-px flex-1 bg-line md:block" />
            </div>

            <div className="relative">
              <motion.h2
                className="whitespace-nowrap text-[clamp(3rem,15vw,4rem)] font-semibold uppercase leading-[0.82] tracking-normal text-platinum md:whitespace-normal md:break-words md:text-[clamp(4.5rem,15vw,13rem)]"
                style={{ y: nameY, opacity: nameOpacity }}
              >
                <span className="block md:inline">Muhammad</span>
                <br className="md:hidden" />
                <span className="block md:inline md:ml-[0.18em]">Syadrie</span>
              </motion.h2>

              <motion.h2
                className="absolute inset-x-0 top-0 whitespace-nowrap text-[clamp(3rem,15vw,4rem)] font-semibold uppercase leading-[0.82] tracking-normal text-platinum md:whitespace-normal md:break-words md:text-[clamp(4.5rem,15vw,13rem)]"
                style={{ y: connectY, opacity: connectOpacity }}
              >
                <span className="block overflow-hidden">
                  <motion.span className="block" style={{ y: connectMaskY }}>
                    Connect.
                  </motion.span>
                </span>
              </motion.h2>

              <motion.div
                className="absolute inset-x-0 -bottom-8 h-px origin-center bg-gradient-to-r from-transparent via-white/50 to-transparent"
                style={{ scaleX: lineScaleX, opacity: connectOpacity }}
              />
            </div>

            <motion.div className="mt-14 flex flex-wrap gap-3" style={{ y: connectY, opacity: connectOpacity }}>
              <MagneticButton href="mailto:muhammad.syadrie11@gmail.com" label="Email" Icon={Mail} showArrow primary />
              <MagneticButton href="https://linkedin.com/in/mrizkysyadrie" label="LinkedIn" Icon={Linkedin} />
              <MagneticButton href="https://github.com/mrizkysyadrie" label="GitHub" Icon={Github} />
            </motion.div>

            <motion.div className="mt-12 flex w-full justify-center md:hidden" style={{ y: connectY, opacity: connectOpacity }}>
              <TextSpinner variant="compact" />
            </motion.div>
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
