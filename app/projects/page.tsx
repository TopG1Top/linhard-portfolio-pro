"use client";

import { Section } from "@/components/section";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/components/lang-provider";

export default function ProjectsPage() {
  const { t } = useI18n();

  return (
    <Section>
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold tracking-tight">{t("projects.title")}</h2>
        <Badge className="rounded-full">{t("projects.notice")}</Badge>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.title} p={p} />
        ))}
      </div>
    </Section>
  );
}
