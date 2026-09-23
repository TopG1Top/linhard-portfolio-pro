import { ArrowUpRight, Github, ExternalLink, Fingerprint, LockKeyhole, Radio } from "lucide-react";
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
  if (p.placeholder) {
    return (
      <div className={cn("h-full min-w-0", className)}>
        <Card className="corner-lines group flex h-full min-h-[30rem] flex-col overflow-hidden rounded-lg border-dashed bg-card/45 shadow-none transition duration-300 hover:border-primary/40 hover:bg-card/70">
          <div className="relative flex h-52 items-center justify-center overflow-hidden border-b bg-slate-950 text-slate-100 sm:h-64">
            <div className="scan-grid absolute inset-0 opacity-70" />
            <div className="absolute inset-x-8 top-8 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
              <span>Slot encrypted</span>
              <span className="inline-flex items-center gap-2 text-emerald-300/80"><Radio className="h-3 w-3 animate-pulse" /> Standby</span>
            </div>
            <div className="relative grid h-24 w-24 place-items-center rounded-full border border-white/10 bg-white/[0.035] shadow-[0_0_50px_rgba(99,102,241,0.16)]">
              <Fingerprint className="h-11 w-11 text-indigo-300/80 transition duration-500 group-hover:scale-110 group-hover:text-emerald-300" />
              <span className="absolute inset-2 rounded-full border border-dashed border-emerald-300/20 transition duration-700 group-hover:rotate-45" />
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent px-4 pb-4 pt-12 text-xs font-semibold uppercase tracking-wide">
              <span>{p.category}</span>
              <span>{p.year}</span>
            </div>
          </div>
          <CardHeader className="pb-2">
            <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-md border border-dashed px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              <LockKeyhole className="h-3 w-3" /> {p.status}
            </div>
            <CardTitle className="leading-tight">{p.title}</CardTitle>
            <CardDescription>{p.blurb}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col gap-4 pt-2">
            <p className="text-sm font-medium text-foreground">{p.impact}</p>
            <div className="mt-auto flex flex-wrap gap-2">
              {p.tech.map((tag) => <Badge key={tag} className="rounded-md border-dashed bg-transparent">{tag}</Badge>)}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("h-full min-w-0 transition-transform duration-300 will-change-transform hover:-translate-y-1.5", className)}>
      <Card className="group flex h-full flex-col overflow-hidden rounded-lg border bg-card/85 shadow-sm transition duration-300 hover:border-primary/30 hover:shadow-2xl">
        <div className={cn("relative overflow-hidden border-b bg-muted", featured ? "h-52 sm:h-64" : "h-44 sm:h-48")}>
          <img
            src={p.image.src}
            alt={p.image.alt}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-transparent to-emerald-400/0 transition duration-500 group-hover:from-indigo-500/10 group-hover:to-emerald-400/10" />
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
              {!p.demo && !p.github && p.status ? (
                <span className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  <LockKeyhole className="h-3.5 w-3.5" /> {p.status}
                </span>
              ) : null}
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
