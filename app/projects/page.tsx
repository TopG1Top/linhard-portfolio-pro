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

export default function ProjectsPage() {
  const { t } = useI18n();

  return (
    <Section>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{t("projects.title")}</h2>
            <Badge className="rounded-md">{t("projects.notice")}</Badge>
          </div>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Eine kuratierte Auswahl mit Kontext, Bildern, Tech-Stack und Links zu Code oder Demo.
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
  );
}
