"use client";

type CodeMark = {
  name: string;
  glyph: string;
  snippet: string;
};

const codeMarks: CodeMark[] = [
  { name: "HTML", glyph: "</>", snippet: "<main data-cloud>" },
  { name: "Front-End", glyph: "FE", snippet: "interface -> intent" },
  { name: "Web Design", glyph: "UI", snippet: "layout.grid(refined)" },
  { name: "JavaScript", glyph: "JS", snippet: "stream.map(signal)" },
  { name: "TypeScript", glyph: "TS", snippet: "type Lead = Journey" },
  { name: "Go", glyph: "GO", snippet: "func deploy(ctx)" },
  { name: "Rust", glyph: "RS", snippet: "match event.result" },
  { name: "Next.js", glyph: "NX", snippet: "app/(routes)/page" },
  { name: "React", glyph: "RX", snippet: "useTransition()" },
  { name: "GraphQL", glyph: "GQL", snippet: "query ProductFlow" },
  { name: "Node.js", glyph: "ND", snippet: "await service.run()" },
  { name: "SQL", glyph: "SQL", snippet: "select intent from leads" },
  { name: "Docker", glyph: "DK", snippet: "docker compose up" },
  { name: "Web3", glyph: "W3", snippet: "wallet -> stream" }
];

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const repeated = [...codeMarks, ...codeMarks];

  return (
    <div className="marquee-mask overflow-hidden py-1 [perspective:1200px]">
      <div className={`flex w-max gap-4 py-3 ${reverse ? "marquee-right" : "marquee-left"}`}>
        {repeated.map((mark, index) => (
          <div
            key={`${mark.name}-${index}`}
            className="group relative h-28 w-64 shrink-0 overflow-hidden rounded-[8px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.11),rgba(255,255,255,0.025)_42%,rgba(255,255,255,0.06))] p-4 font-mono shadow-[0_20px_60px_rgba(0,0,0,0.36),0_1px_0_rgba(255,255,255,0.08)_inset] backdrop-blur transition duration-500 [transform:rotateX(10deg)_rotateY(-14deg)_translateZ(0)] hover:border-white/30 hover:bg-white/[0.075] hover:[transform:rotateX(0deg)_rotateY(0deg)_translateZ(24px)]"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <div className="absolute -right-8 -top-10 size-28 rounded-full bg-white/10 blur-2xl transition group-hover:bg-white/16" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-start justify-between gap-4">
                <span className="text-[0.62rem] uppercase tracking-[0.24em] text-slate-500">discipline</span>
                <span className="rounded-[6px] border border-white/10 bg-black/30 px-2 py-1 text-[0.62rem] text-slate-400">code</span>
              </div>
              <div>
                <div className="flex items-end justify-between gap-5">
                  <span className="text-4xl font-semibold tracking-tight text-platinum">{mark.glyph}</span>
                  <span className="text-right text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">{mark.name}</span>
                </div>
                <div className="mt-3 truncate border-t border-white/10 pt-3 text-xs text-slate-500">{mark.snippet}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ClientMarquee() {
  return (
    <section className="relative px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl border-y border-line py-10">
        <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Technical Stack</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-platinum md:text-3xl">Code-first systems across product, cloud, and data surfaces.</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-400 md:text-right">
            Languages, runtimes, and platform patterns used across acquisition products, cloud workflows, commerce systems, and Web3 data interfaces.
          </p>
        </div>
        <div className="space-y-2">
          <MarqueeRow />
          <MarqueeRow reverse />
        </div>
      </div>
    </section>
  );
}
