"use client";

const clientLogos = [
  "Adira Finance",
  "momotor.id",
  "momobil.id",
  "moservice.id",
  "adiraku",
  "Alpha Stream",
  "Tiny Bitty",
  "MVHome",
  "Tokyo Crumb",
  "Binar Academy",
  "Bank Sinarmas"
];

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const repeated = [...clientLogos, ...clientLogos];

  return (
    <div className="marquee-mask overflow-hidden">
      <div className={`flex w-max gap-3 py-2 ${reverse ? "marquee-right" : "marquee-left"}`}>
        {repeated.map((client, index) => (
          <div
            key={`${client}-${index}`}
            className="flex h-16 min-w-44 items-center justify-center rounded-[8px] border border-line bg-white/[0.035] px-6 font-mono text-sm font-semibold uppercase tracking-[0.18em] text-slate-300 shadow-[0_1px_0_rgba(255,255,255,0.05)_inset] backdrop-blur transition hover:border-white/40 hover:text-platinum"
          >
            {client}
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
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Trusted Product Surfaces</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-platinum md:text-3xl">Platforms, brands, and product ecosystems I have worked on.</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-400 md:text-right">
            Enterprise finance, automotive acquisition, commerce, Web3, training, and banking operations experience across both product and platform surfaces.
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
