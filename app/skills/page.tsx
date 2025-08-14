import { Section } from "@/components/section"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

const SKILLS: Record<string, string[]> = {
  "Sprachen": ["TypeScript", "JavaScript", "SQL", "HTML", "CSS", "Python"],
  "Frontend": ["React", "Next.js", "Tailwind", "Framer Motion", "Vite"],
  "Backend": ["Node.js", "Express", "NestJS", "Prisma", "MongoDB", "PostgreSQL"],
  "DevOps": ["Docker", "CI/CD", "Vercel", "Railway", "Linux"],
  "Tools": ["Git", "Figma", "Jira", "Notion", "Postman"],
}

export default function SkillsPage() {
  return (
    <Section>
      <h2 className="text-2xl font-bold tracking-tight">Skills</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {Object.entries(SKILLS).map(([cat, items]) => (
          <Card key={cat} className="rounded-3xl">
            <CardHeader>
              <CardTitle>{cat}</CardTitle>
              <CardDescription>Werkzeuge & Technologien</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {items.map((it) => <span key={it} className="inline-flex items-center rounded-xl border px-2.5 py-0.5 text-xs font-medium">{it}</span>)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}
