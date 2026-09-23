import { PageIntro } from "@/components/page-intro";
import { Section } from "@/components/section";
import { Braces, Boxes, Container, Database, Wrench } from "lucide-react";

const SKILLS = [
  { category: "Languages", label: "Fundament", icon: Braces, items: ["TypeScript", "JavaScript", "SQL", "HTML", "CSS", "Python", "PHP"] },
  { category: "Frontend", label: "Interface systems", icon: Boxes, items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Vite", "Canvas"] },
  { category: "Backend & Data", label: "Logic & persistence", icon: Database, items: ["Node.js", "Express", "Prisma", "MySQL", "MongoDB", "CouchDB", "IndexedDB"] },
  { category: "Delivery", label: "Ship & operate", icon: Container, items: ["Docker", "Git", "CI/CD", "Vercel", "Railway", "Linux"] },
  { category: "Workflow", label: "Build toolkit", icon: Wrench, items: ["VS Code", "Postman", "Figma", "Jira", "Notion", "Wireshark", "AI Tooling"] },
];

export default function SkillsPage() {
  return (
    <Section className="py-12 md:py-16">
      <PageIntro
        index="04"
        eyebrow="Capabilities"
        title="Ein Stack, der Ideen in Produkte übersetzt."
        description="Nicht möglichst viele Logos, sondern Werkzeuge, die zusammen funktionieren — vom ersten Interface bis zu Daten, Testing und Deployment."
      />

      <div className="overflow-hidden rounded-lg border bg-card/55">
        {SKILLS.map((group, index) => {
          const Icon = group.icon;
          return (
            <article key={group.category} className="group grid gap-6 border-t p-5 first:border-t-0 md:grid-cols-[15rem_1fr] md:p-7">
              <div className="flex items-start gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md border bg-background text-primary transition group-hover:border-primary/40 group-hover:text-secondary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">0{index + 1} · {group.label}</span>
                  <h2 className="mt-1 font-bold">{group.category}</h2>
                </div>
              </div>
              <div className="flex flex-wrap content-start gap-2">
                {group.items.map((skill) => (
                  <span key={skill} className="rounded-md border bg-background/70 px-3 py-2 text-sm font-medium transition hover:-translate-y-0.5 hover:border-secondary/40 hover:text-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col justify-between gap-4 rounded-lg border border-dashed p-5 text-sm text-muted-foreground sm:flex-row sm:items-center">
        <span className="technical-label">Current learning protocol</span>
        <span>Security-minded PWAs · Web Crypto · bessere Produktarchitektur · hochwertige Microinteractions</span>
      </div>
    </Section>
  );
}
