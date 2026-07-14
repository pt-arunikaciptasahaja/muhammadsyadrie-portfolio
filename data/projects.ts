export type ProjectGroup = "Enterprise & Apps" | "Web3 & Data" | "Full-Stack Commerce";

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
    group: "Enterprise & Apps",
    summary: "Used-car marketplace surface with comparison-led browsing and campaign-ready lead generation.",
    details:
      "Worked across responsive listing, detail, and inquiry surfaces where search behavior, lead quality, and mobile performance were central to the business funnel.",
    stack: ["React", "TypeScript", "CMS", "GA4", "Tag Manager"],
    architecture: ["Listing interaction analytics", "SEO-friendly vehicle detail metadata", "Mobile-first conversion tracking"],
    impact: "A complex catalogue experience condensed into fast, scannable UI.",
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
    id: "adiraku",
    title: "adiraku app",
    group: "Enterprise & Apps",
    summary: "Mobile product ecosystem for financing, servicing, and customer lifecycle interactions.",
    details:
      "Supported a broad customer lifecycle surface connected to financing and service journeys, with emphasis on release reliability, observability, and production-quality interaction patterns.",
    stack: ["Mobile Web", "React", "Design Systems", "Firebase Analytics"],
    architecture: ["Journey-level analytics", "Reusable interface primitives", "Release-safe feature segmentation"],
    impact: "A high-surface-area application with mature product engineering concerns.",
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
    title: "tinybitty.shop",
    group: "Full-Stack Commerce",
    summary: "Mobile-first cookie commerce and corporate gifting experience with WhatsApp-assisted ordering.",
    details:
      "Designed and developed product browsing, bundles, brand storytelling, cart behavior, and corporate-gifting flows for a premium FMCG cookie brand.",
    stack: ["Next.js", "TypeScript", "SEO", "Image Optimization", "WhatsApp Ordering"],
    architecture: ["SEO-friendly content and product structure", "Optimized image delivery for mobile commerce", "Conversion path from product discovery to assisted order"],
    impact: "Commerce implementation with a practical blend of brand, speed, and conversion thinking.",
    className: "md:col-span-1"
  },
  {
    id: "mvhome",
    title: "mvhome.id",
    group: "Full-Stack Commerce",
    summary: "Full-stack ISP acquisition platform and role-based CMS for broadband service discovery.",
    details:
      "Built a Node.js, MySQL, and API-backed platform with customer journeys for coverage checking, product discovery, registration, SEO content, careers, and independent content management.",
    stack: ["Node.js", "MySQL", "React", "REST APIs", "Role-Based CMS"],
    architecture: ["Reusable data modules for products, articles, leads, jobs, FAQs, users, banners, and legal content", "Filtering and pagination for operational CMS workflows", "Responsive acquisition and onboarding journeys"],
    impact: "A full-stack client platform spanning acquisition UX, APIs, and internal content operations.",
    className: "md:col-span-1"
  },
  {
    id: "tokyo-crumb",
    title: "Tokyo Crumb order widget",
    group: "Full-Stack Commerce",
    summary: "Embeddable ordering widget optimized for quick selection, cart clarity, and low-friction repeat orders.",
    details:
      "A compact full-stack widget pattern with stateful ordering, analytics events, and responsive behavior for embedded contexts.",
    stack: ["TypeScript", "React", "API Routes", "Payment UX"],
    architecture: ["Embeddable state machine", "Cart and order telemetry", "Lightweight API integration"],
    impact: "A small surface with strong product-thinking density.",
    className: "md:col-span-2"
  }
];
