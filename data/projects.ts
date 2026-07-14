export type ProjectGroup =
  | "Enterprise & Apps"
  | "Enterprise Marketplaces"
  | "Web3 & Data"
  | "Full-Stack Commerce"
  | "Acquisition Ecosystems"
  | "Embedded Commerce";

export type Project = {
  id: string;
  title: string;
  group: ProjectGroup;
  summary: string;
  details: string;
  stack: string[];
  architecture: string[];
  impact: string;
  className: string;
};

export const projects: Project[] = [
  {
    id: "momotor",
    title: "momotor.id",
    group: "Enterprise & Apps",
    summary: "Automotive financing acquisition platform supporting high-intent discovery, leads, and SEO-led growth.",
    details:
      "Contributed to one of Adira Finance's primary digital acquisition channels, supporting 100K-300K monthly visits and thousands of financing applications while modernizing customer journeys, SEO, analytics, and release quality.",
    stack: ["Next.js", "TypeScript", "GraphQL", "GA4", "Microsoft Clarity", "SEO"],
    architecture: ["JSON-LD, metadata, XML sitemap, robots.txt, and AI crawler accessibility", "Journey-level analytics for search, campaign, article, and lead flows", "Headless WordPress articles served through the primary Next.js domain"],
    impact: "Helped connect acquisition UX to measurable qualified-lead and organic-discovery outcomes.",
    className: "md:col-span-2 md:row-span-2"
  },
 {
    id: "momobil",
    title: "momobil.id",
    group: "Enterprise Marketplaces",
    summary: "An automotive commerce ecosystem engineered for high-intent search, semantic visibility, and precision lead generation.",
    details:
      "Architected responsive, conversion-critical surfaces for a massive enterprise vehicle catalogue. By synthesizing fluid, comparison-led browsing with rigorous analytics (GA4/GTM) and deep SEO metadata, the platform transforms complex automotive inventory into a frictionless, mobile-first acquisition engine.",
    stack: ["Headless CMS", "Next.js", "Semantic SEO", "GA4 / GTM", "GraphQL"],
    architecture: [
      "Granular behavioral telemetry orchestrated to map and optimize high-intent buyer journeys",
      "Dynamic, semantic metadata architecture designed for aggressive organic search visibility",
      "Lightning-fast, scannable UI components built to handle sprawling enterprise data payloads"
    ],
    impact: "Forged a seamless connection between complex automotive inventory and high-conversion user journeys.",
    className: "md:col-span-1"
  },
  {
    id: "moservice",
    title: "moservice.id",
    group: "Enterprise & Apps",
    summary: "Automotive service booking experience for aftersales discovery, scheduling, and regional intent.",
    details:
      "Built around low-friction appointment capture, service discovery, and funnel instrumentation so operational teams could understand intent and improve conversion paths.",
    stack: ["Next.js", "REST APIs", "Tailwind CSS", "A/B Testing"],
    architecture: ["Booking funnel telemetry", "Location-aware service pages", "Performance budgets for mobile users"],
    impact: "Operational product UX with clear service intent and measurable acquisition paths.",
    className: "md:col-span-1"
  },
  {
    id: "arunika",
    title: "Arunika Studio",
    group: "Enterprise & Apps",
    summary: "Company portfolio and digital presence for a working software and product studio.",
    details:
      "Built as a polished company portfolio surface for presenting services, credibility, project context, and technical capability in a concise, conversion-aware format.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "SEO", "Web Design"],
    architecture: ["Responsive portfolio architecture", "Reusable content sections for services and project proof", "SEO-ready metadata and fast static delivery"],
    impact: "A focused company presence designed to communicate trust, technical sharpness, and service clarity.",
    className: "md:col-span-2"
  },
  {
    id: "alpha-stream",
    title: "Alpha Stream Terminal",
    group: "Web3 & Data",
    summary: "Crypto market-intelligence terminal for dense Pump.fun data exploration and Solana research workflows.",
    details:
      "A production side project translating dense market information into a clear terminal-style dashboard, demonstrating data-heavy interface design beyond conventional commerce and CMS products.",
    stack: ["Solana", "Realtime Data", "TypeScript", "Dashboard UX", "Web3"],
    architecture: ["Reusable frontend components for high-density market data", "Stream-oriented interface states for fast scanning", "Token intelligence patterns designed for research workflows"],
    impact: "A focused proof point for Web3, analytics, and complex technical UI delivery.",
    className: "md:col-span-3 md:row-span-2"
  },
  {
    id: "tinybitty",
    title: "Tiny Bitty",
    group: "Full-Stack Commerce",
    summary: "Mobile-first cookie commerce and corporate gifting experience with WhatsApp-assisted ordering.",
    details:
      "Designed and developed product browsing, bundles, brand storytelling, cart behavior, and corporate-gifting flows for a premium FMCG cookie brand.",
    stack: ["Next.js", "TypeScript", "SEO", "Image Optimization", "UI / UX"],
    architecture: ["SEO-friendly content and product structure", "Optimized image delivery for mobile commerce", "Conversion path from product discovery to assisted order"],
    impact: "Commerce implementation with a practical blend of brand, speed, and conversion thinking.",
    className: "md:col-span-1"
  },
  {
    id: "mvhome",
    title: "mvhome.id",
    group: "Acquisition Ecosystems",
    summary: "A frictionless onboarding platform for broadband services, powered by interactive diagnostic tools and localized content.",
    details:
      "Designed a complete end-to-end user journey for a modern ISP. By weaving custom bandwidth speed tests and area coverability mapping into the interface, the platform empowers users to validate service instantly before seamlessly transitioning into a dynamic, CMS-driven registration flow.",
    stack: ["Node.js", "Next.js", "MySQL", "Interactive Data", "Content Architecture"],
    architecture: [
      "Real-time service validation via integrated speed diagnostics and area mapping",
      "Centralized CMS dashboard orchestrating products, dynamic promotional banners, and localized (EN-ID) articles",
      "Scalable REST API backbone linking frontend intent with internal operational workflows"
    ],
    impact: "Streamlined the telecom acquisition funnel by merging interactive network diagnostics with automated service onboarding.",
    className: "md:col-span-1"
  },
  {
    id: "tokyo-crumb",
    title: "Tokyo Crumb",
    group: "Embedded Commerce",
    summary: "A portable, state-driven micro-storefront engineered to eliminate checkout friction and accelerate repeat conversions.",
    details:
      "Designed a highly embeddable, headless ordering interface that brings the point of sale directly into any digital context. By combining fluid state transitions with an intuitive selection UX, the component transforms passive traffic into immediate transactions without interrupting the user's flow.",
    stack: ["TypeScript", "React", "Headless UI", "Behavioral Telemetry"],
    architecture: [
      "Portable state-machine architecture designed for seamless cross-environment embedding",
      "Real-time cart telemetry and granular event tracking for conversion analytics",
      "Zero-friction payment routing via a lightweight, edge-optimized API layer"
    ],
    impact: "Proves that highly dense, meticulously optimized micro-interactions can drastically shorten the path to purchase.",
    className: "md:col-span-2"
  }
];
