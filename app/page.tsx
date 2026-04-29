"use client";

import {
  ArrowRight,
  Code,
  Database,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Rocket,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
} from "lucide-react";
import Link from "next/link";
import { site } from "@/lib/site";
import { Section } from "@/components/section";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/projects";
import { TechMarquee } from "@/components/tech-marquee";
import { useI18n } from "@/components/lang-provider";
import { ProjectCard } from "@/components/project-card";
import { cn } from "@/lib/utils";

const stats = [
  { value: "4", label: "ausgewählte Projekte" },
  { value: "2+", label: "Jahre Praxis" },
  { value: "10+", label: "Tools & Technologien" },
  { value: "CH", label: "Fokus & Ausbildung" },
];

const focusAreas = [
  {
    icon: Rocket,
    title: "Schnell von Idee zu Demo",
    text: "MVPs, Web-Apps und kleine Tools mit sichtbarem Fortschritt statt endloser Theorie.",
  },
  {
    icon: ShieldCheck,
    title: "Sauber und belastbar",
    text: "Struktur, Validierung, klare Komponenten und Details, die später Zeit sparen.",
  },
  {
    icon: Database,
    title: "Daten verständlich machen",
    text: "Dashboards, Datenbanken und UI-Flows, die Informationen wirklich nutzbar machen.",
  },
];

const codeLines = [
  "const focus = ['UX', 'Performance', 'Clean Code'];",
  "ship(project).with({ polish: true, data: readable });",
  "measure(flow).then(improve).repeat();",
];

export default function HomePage() {
  const { t } = useI18n();
  const featuredProject = projects[0];

  return (
    <>
      <Section className="overflow-hidden pb-12 pt-12 md:pt-16">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,hsl(var(--background))_0%,hsl(var(--muted))_45%,hsl(var(--background))_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(99,102,241,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.08)_1px,transparent_1px)] bg-[size:44px_44px]" />

        <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs shadow-sm md:text-sm">
              <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <span className="font-medium text-muted-foreground">{t("hero.available")}</span>
            </div>

            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">
              {site.name}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
              Ich entwickle schnelle Web-Apps, datenbasierte Tools und interaktive Experiences
              mit klarem UI, sauberem Code und Fokus auf echte Wirkung.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={site.cvUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ size: "lg" }), "rounded-lg")}
              >
                <Download className="mr-2 h-5 w-5" /> {t("hero.cv")}
              </a>

              <Link
                href="/contact"
                className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "rounded-lg")}
              >
                <Mail className="mr-2 h-5 w-5" /> {t("hero.contact")}
              </Link>

              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium"
              >
                <Github className="h-4 w-4" />
                <span className="underline-offset-4 hover:underline">{t("hero.viewGithub")}</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium"
              >
                <Linkedin className="h-4 w-4" />
                <span className="underline-offset-4 hover:underline">{t("hero.viewLinkedIn")}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" /> {site.location}
              </span>
              <span className="inline-flex items-center gap-2">
                <GraduationCap className="h-4 w-4" /> EFZ Applikationsentwicklung
              </span>
              <span className="inline-flex items-center gap-2">
                <Code className="h-4 w-4" /> Sauberer Code, starke UX
              </span>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((item) => (
                <div key={item.label} className="rounded-lg border bg-card/80 p-4 shadow-sm">
                  <div className="text-2xl font-black">{item.value}</div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-lg border bg-card/90 shadow-2xl">
              <div className="flex items-center gap-2 border-b bg-muted/70 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-rose-500" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="ml-auto inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                  <TerminalSquare className="h-4 w-4" /> portfolio.tsx
                </span>
              </div>

              <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
                <div className="border-b p-5 lg:border-b-0 lg:border-r">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-md border bg-background px-3 py-1 text-xs font-semibold">
                    <Sparkles className="h-4 w-4 text-primary" /> build mode
                  </div>
                  <div className="space-y-3 font-mono text-xs leading-6 text-muted-foreground">
                    {codeLines.map((line, index) => (
                      <div key={line} className="rounded-md bg-slate-950 px-3 py-2 text-slate-200">
                        <span className="mr-3 text-slate-500">{String(index + 1).padStart(2, "0")}</span>
                        {line}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <TechMarquee />
                  </div>
                </div>

                <div className="p-4">
                  <div className="overflow-hidden rounded-md border bg-muted">
                    <img
                      src={featuredProject.image.src}
                      alt={featuredProject.image.alt}
                      className="aspect-[16/10] w-full object-cover"
                    />
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {projects.slice(1, 4).map((project) => (
                      <div key={project.title} className="overflow-hidden rounded-md border bg-muted">
                        <img
                          src={project.image.src}
                          alt={project.image.alt}
                          className="aspect-[4/3] w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="py-8">
        <div className="grid gap-4 md:grid-cols-3">
          {focusAreas.map((area) => {
            const Icon = area.icon;
            return (
              <div key={area.title} className="rounded-lg border bg-card/80 p-5 shadow-sm">
                <Icon className="h-6 w-6 text-primary" />
                <h2 className="mt-4 text-lg font-bold tracking-tight">{area.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{area.text}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section className="pt-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Ausgewählte Projekte</h2>
              <Badge className="rounded-md">{t("projects.notice")}</Badge>
            </div>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Nicht nur Repo-Links: jedes Projekt zeigt jetzt klarer, was es kann und warum es
              spannend ist.
            </p>
          </div>

          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "secondary" }), "rounded-lg")}
          >
            {t("projects.allRepos")} <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {projects.map((p, index) => (
            <ProjectCard key={p.title} p={p} featured={index === 0} />
          ))}
        </div>
      </Section>
    </>
  );
}
