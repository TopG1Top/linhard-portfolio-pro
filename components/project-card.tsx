import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { projects } from "@/lib/projects";
import { cn } from "@/lib/utils";

type Project = typeof projects[number]; // <- nimmt den Typ aus deiner Liste

export function ProjectCard({
  p,
  featured = false,
  className,
}: {
  p: Project;
  featured?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("h-full min-w-0 transition-transform will-change-transform hover:-translate-y-1", className)}>
      <Card className="group flex h-full flex-col overflow-hidden rounded-lg border bg-card/85 shadow-sm transition-shadow hover:shadow-xl">
        <div className={cn("relative overflow-hidden border-b bg-muted", featured ? "h-52 sm:h-64" : "h-44 sm:h-48")}>
          <img
            src={p.image.src}
            alt={p.image.alt}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-slate-950/85 to-transparent px-4 pb-4 pt-12 text-xs font-semibold uppercase tracking-wide text-white">
            <span>{p.category}</span>
            <span>{p.year}</span>
          </div>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <span className="min-w-0 leading-tight">{p.title}</span>
            <div className="flex flex-wrap items-center gap-1 sm:shrink-0">
              {p.demo && (
                <a href={p.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs transition hover:bg-accent">
                  <ExternalLink className="h-4 w-4" /> Demo
                </a>
              )}
              {p.github && (
                <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs transition hover:bg-accent">
                  <Github className="h-4 w-4" /> Code
                </a>
              )}
            </div>
          </CardTitle>
          <CardDescription>{p.blurb}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-4 pt-2">
          <p className="text-sm font-medium text-foreground">{p.impact}</p>
          <div className="grid gap-2 text-sm text-muted-foreground">
            {p.highlights.map((item) => (
              <div key={item} className="flex items-start gap-2">
                <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {p.tech.map((t) => (
              <Badge key={t} className="rounded-md">
                {t}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
