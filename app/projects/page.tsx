"use client";

import { Section } from "@/components/section";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { useI18n } from "@/components/lang-provider";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/page-intro";

export default function ProjectsPage() {
  const { t } = useI18n();

  return (
    <Section className="py-12 md:py-16">
      <PageIntro
        index="02"
        eyebrow="Selected systems"
        title="Projekte mit echter Funktion, nicht nur Oberfläche."
        description="Von Games und Live-Dashboards bis zu einer verschlüsselten Privacy-PWA — jedes Projekt zeigt eine andere Seite meines Engineerings."
      />
      <div className="flex flex-col gap-4 border-b pb-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="rounded-md">7 released</Badge>
          <Badge className="rounded-md bg-transparent text-muted-foreground">2 classified slots</Badge>
        </div>
        <a
          href={site.github}
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants({ variant: "secondary" }), "signal-button rounded-lg")}
        >
          {t("projects.allRepos")} <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {projects.map((p, index) => (
          <ProjectCard key={p.title} p={p} featured={index === 0} />
        ))}
      </div>
    </Section>
  );
}
