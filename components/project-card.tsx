import { Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { projects } from "@/lib/projects";

type Project = typeof projects[number]; // <- nimmt den Typ aus deiner Liste

export function ProjectCard({ p }: { p: Project }) {
  return (
    <div className="transition-transform will-change-transform hover:-translate-y-1 hover:scale-[1.01]">
      <Card className="group rounded-3xl overflow-hidden">
        <div className="relative h-40 bg-gradient-to-br from-indigo-500/15 to-emerald-500/15" />
        <CardHeader className="pb-2">
          <CardTitle className="flex items-start justify-between gap-2">
            <span>{p.title}</span>
            <div className="flex items-center gap-1">
              {p.demo && (
                <a href={p.demo} target="_blank" rel="noreferrer" className="rounded-xl border px-2 py-1 text-xs inline-flex items-center gap-1">
                  <ExternalLink className="h-4 w-4" /> Demo
                </a>
              )}
              {p.github && (
                <a href={p.github} target="_blank" rel="noreferrer" className="rounded-xl border px-2 py-1 text-xs inline-flex items-center gap-1">
                  <Github className="h-4 w-4" /> Code
                </a>
              )}
            </div>
          </CardTitle>
          <CardDescription>{p.blurb}</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="flex flex-wrap gap-2">
            {p.tech.map((t) => (
              <Badge key={t} className="rounded-xl">
                {t}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
