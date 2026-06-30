// ============================================================
// PLACEHOLDER CONTENT — swap these for your real details.
// Search the repo for "[Your Name]" etc. to find everything.
// ============================================================

export const SITE = {
  name: "Sejal Dewangan",
  shortName: "SD",
  role: "Full Stack Developer",
  email: "shubham.dewangan.3440@gmail.com",
  city: "Durg-Bhilai, Chhattisgarh",
  utc: "UTC+5:30",
  year: 2025,
  url: "https://yourname.dev",
  socials: {
    github: "https://github.com/Sejaldewangan",
    linkedin: "https://www.linkedin.com/in/sejal-dewangan-411a3439b",
  },
  handles: {
    github: "@Sejaldewangan",
    linkedin: "/sejal-dewangan",
  },
};

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const PRELOADER_PHRASES = [
  "compiling components...",
  "optimizing assets...",
  "ready.",
];

export type Chapter = {
  kicker: string;
  title: string;
  sub: string;
  visualLabel: string;
};

export const CHAPTERS: Chapter[] = [
  {
    kicker: "01 — THE CRAFT",
    title: "Most developers write code.",
    sub: "They ship features. They fix bugs. They move on.",
    visualLabel: "~/terminal",
  },
  {
    kicker: "02 — THE OBSESSION",
    title: "I obsess over the experience.",
    sub: "Every animation timed. Every interaction considered.",
    visualLabel: "ui/showcase",
  },
  {
    kicker: "03 — THE STANDARD",
    title: "Performance is not optional.",
    sub: "Sub-second loads. 95+ Lighthouse. Real-world fast.",
    visualLabel: "lighthouse",
  },
  {
    kicker: "04 — THE RANGE",
    title: "Full stack, end to end.",
    sub: "React · Node · Postgres · Redis · AWS. I own the whole thing.",
    visualLabel: "architecture",
  },
  {
    kicker: "05 — THE PROOF",
    title: "Let me show you the work.",
    sub: "Scroll on. The receipts are below.",
    visualLabel: "projects",
  },
];

export type Project = {
  n: string;
  name: string;
  tags: string[];
  description: string;
  live: string;
  github: string;
  metric: string;
};

export const PROJECTS: Project[] = [
  {
    n: "01",
    name: "Auction Engine",
    tags: ["Next.js", "WebSocket", "Postgres", "Redis"],
    description:
      "A real-time auction platform handling 2,000 concurrent bids with sub-50ms latency. Optimistic UI, conflict resolution, and a live leaderboard that never drops a frame.",
    live: "https://example.com",
    github: "https://github.com/yourhandle/auction",
    metric: "2k concurrent bids · <50ms",
  },
  {
    n: "02",
    name: "Studio Folio",
    tags: ["React", "GSAP", "Three.js", "Tailwind"],
    description:
      "An award-style agency site driven by scroll. WebGL transitions, pinned cinematic sections, and a 98 Lighthouse score on mobile. UI-heavy, performance-first.",
    live: "https://example.com",
    github: "https://github.com/yourhandle/folio",
    metric: "98 Lighthouse · 60fps scroll",
  },
  {
    n: "03",
    name: "Ledger API",
    tags: ["Node", "Express", "Postgres", "Docker"],
    description:
      "A double-entry accounting API with idempotent transactions, audit trails, and 99.98% uptime. Designed the schema, the rate limiter, and the CI/CD pipeline end-to-end.",
    live: "https://example.com",
    github: "https://github.com/yourhandle/ledger",
    metric: "99.98% uptime · 12ms p50",
  },
  {
    n: "04",
    name: "useScrollKit",
    tags: ["TypeScript", "Open Source", "React"],
    description:
      "An open-source hooks library for scroll-driven UI. 1.2k stars, used in production by other teams. Tree-shakeable, typed, and documented to the line.",
    live: "https://example.com",
    github: "https://github.com/yourhandle/scrollkit",
    metric: "1.2k★ · 40k weekly installs",
  },
];

export const STATS = [
  { target: 3, suffix: "+", label: "Years experience" },
  { target: 20, suffix: "+", label: "Projects shipped" },
  { target: 95, suffix: "+", label: "Avg Lighthouse" },
  { target: 12, suffix: "k+", label: "GitHub commits" },
];

export type SkillCat = {
  category: string;
  items: { name: string; level: string; value: number }[];
};

export const SKILLS: SkillCat[] = [
  {
    category: "Frontend",
    items: [
      { name: "React / Next.js", level: "Expert", value: 95 },
      { name: "TypeScript", level: "Expert", value: 92 },
      { name: "GSAP / Framer", level: "Advanced", value: 85 },
      { name: "Three.js / WebGL", level: "Advanced", value: 78 },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node / Express", level: "Expert", value: 90 },
      { name: "PostgreSQL", level: "Advanced", value: 84 },
      { name: "Redis", level: "Advanced", value: 80 },
      { name: "GraphQL", level: "Advanced", value: 75 },
    ],
  },
  {
    category: "Tooling",
    items: [
      { name: "AWS / Vercel", level: "Advanced", value: 82 },
      { name: "Docker / CI", level: "Advanced", value: 80 },
      { name: "Postgres tuning", level: "Advanced", value: 76 },
      { name: "Rust", level: "Learning", value: 45 },
    ],
  },
];

export const TIMELINE = [
  { year: "2019", text: "Started coding" },
  { year: "2020", text: "First freelance project" },
  { year: "2021", text: "Joined first product team" },
  { year: "2022", text: "Led a frontend platform rebuild" },
  { year: "2023", text: "Shipped to 1M+ users" },
  { year: "2024", text: "Open to opportunities" },
];

export const PROCESS = [
  {
    n: 1,
    icon: "Search",
    title: "Discover",
    body: "Understanding the problem before touching the keyboard.",
  },
  {
    n: 2,
    icon: "PenTool",
    title: "Design",
    body: "Wireframes and component maps before writing a line.",
  },
  {
    n: 3,
    icon: "Code2",
    title: "Build",
    body: "Component-first, test-driven, performance-aware from day one.",
  },
  {
    n: 4,
    icon: "Zap",
    title: "Optimize",
    body: "Lighthouse. Bundle analyzer. Real-device testing. Iterate.",
  },
  {
    n: 5,
    icon: "Rocket",
    title: "Ship",
    body: "CI/CD. Monitoring. Documentation. Owned end-to-end.",
  },
];

export const PROJECT_TYPES = [
  "Web app",
  "Marketing site",
  "API / backend",
  "Full product",
  "Something else",
];
