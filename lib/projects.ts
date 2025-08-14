export const projects = [
  {
    title: "TaskFlow – Kollaboratives Taskboard",
    blurb: "Ein schnelles Kanban‑Board mit Realtime‑Sync (WebSockets) und Drag & Drop – gebaut für Teams.",
    tech: ["React", "TypeScript", "Node.js", "WebSockets", "PostgreSQL"],
    github: "https://github.com/linhard/taskflow",
    demo: "https://taskflow.example.com",
  },
  {
    title: "ShopWave – Headless E‑Commerce",
    blurb: "API‑getriebener Store mit Stripe‑Checkout, CMS‑Integration und ultraschnellen Seiten.",
    tech: ["Next.js", "Stripe", "Prisma", "Vercel"],
    github: "https://github.com/linhard/shopwave",
    demo: "https://shopwave.example.com",
  },
  {
    title: "DevNotes – Markdown Wissensbasis",
    blurb: "Persönliches Wissensnetz mit Suche, Tagging, und Offline‑Support (PWA).",
    tech: ["React", "PWA", "IndexedDB", "Tailwind"],
    github: "https://github.com/linhard/devnotes",
    demo: "https://devnotes.example.com",
  },
] as const
