"use client"
import { Github, Mail, ArrowRight, MapPin, Code, Download } from "lucide-react"
import Link from "next/link"
import { site } from "@/lib/site"
import { Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { projects } from "@/lib/projects"
import { Aurora } from "@/components/aurora"
import { TechMarquee } from "@/components/tech-marquee"
import { useI18n } from "@/components/lang-provider"

export default function HomePage() {
  const { t } = useI18n()

  return (
    <>
      <Section>
        <div className="grid items-center gap-8 md:grid-cols-2 relative">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs md:text-sm">
              <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <span className="opacity-70">{t("hero.available")}</span>
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl">
              {site.name}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              {site.tagline}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={site.cvUrl} target="_blank" rel="noreferrer">
                <Button className="rounded-2xl">
                  <Download className="mr-2 h-5 w-5" /> {t("hero.cv")}
                </Button>
              </a>
              <Link href="/contact">
                <Button variant="secondary" className="rounded-2xl">
                  <Mail className="mr-2 h-5 w-5" /> {t("hero.contact")}
                </Button>
              </Link>
              <a href={site.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm">
                <Github className="h-4 w-4" />
                <span className="underline-offset-4 hover:underline">{t("hero.viewGithub")}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> {site.location}</span>
              <span className="inline-flex items-center gap-2"><Code className="h-4 w-4" /> Sauberer Code, starke UX</span>
            </div>
          </div>
          <div className="relative">
            <Aurora />
            <TechMarquee />
            <div className="mt-3 text-xs text-muted-foreground">{t("hero.stackNote")} 😉</div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight">{t("projects.title")}</h2>
              <Badge className="rounded-full">{t("projects.notice")}</Badge>
            </div>
            <p className="text-muted-foreground">{t("projects.subtitle")}</p>
          </div>
          <a href={site.github} target="_blank" rel="noreferrer">
            <Button className="rounded-2xl" variant="secondary">{t("projects.allRepos")}</Button>
          </a>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Card key={p.title} className="rounded-3xl overflow-hidden">
              <div className="relative h-40 bg-gradient-to-br from-indigo-500/15 to-emerald-500/15" />
              <CardHeader className="pb-2">
                <CardTitle className="flex items-start justify-between gap-2">
                  <span>{p.title}</span>
                  <div className="flex items-center gap-1">
                    {p.demo && <a href={p.demo} className="rounded-xl border px-2 py-1 text-xs" target="_blank" rel="noreferrer">Demo</a>}
                    {p.github && <a href={p.github} className="rounded-xl border px-2 py-1 text-xs" target="_blank" rel="noreferrer">Code</a>}
                  </div>
                </CardTitle>
                <CardDescription>{p.blurb}</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t) => <Badge key={t} className="rounded-xl">{t}</Badge>)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  )
}
