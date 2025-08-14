"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Github, Linkedin, Menu } from "lucide-react"
import { site } from "@/lib/site"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sheet } from "@/components/ui/sheet"
import { LanguageToggle } from "@/components/language-toggle"
import { useI18n } from "@/components/lang-provider"

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { t } = useI18n()

  useEffect(() => { document.body.style.overflow = open ? "hidden" : "auto" }, [open])

  return (
    <div className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-gradient-to-br from-indigo-500 to-emerald-400 animate-pulse" />
          <span className="font-semibold tracking-tight">{site.name}</span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {site.nav.map((n) => (
            <Link key={n.href} href={n.href}>
              <Button variant="ghost" className="rounded-full">
                {t(`nav.${n.key}`)}
              </Button>
            </Link>
          ))}
          <LanguageToggle />
          <ThemeToggle />
          <a href={site.github} target="_blank" rel="noreferrer">
            <Button variant="ghost" className="rounded-2xl"><Github className="h-5 w-5" /></Button>
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer">
            <Button variant="ghost" className="rounded-2xl"><Linkedin className="h-5 w-5" /></Button>
          </a>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <Button variant="ghost" onClick={() => setOpen(true)} className="rounded-2xl"><Menu className="h-6 w-6" /></Button>
        </div>
      </div>

      <Sheet open={open} onClose={() => setOpen(false)}>
        <div className="grid gap-1">
          {site.nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="w-full">
              <Button className="w-full justify-start rounded-xl" variant="ghost">{t(`nav.${n.key}`)}</Button>
            </Link>
          ))}
          <div className="flex gap-2 pt-2">
            <a className="flex-1" href={site.github} target="_blank" rel="noreferrer">
              <Button className="w-full rounded-xl" variant="secondary"><Github className="mr-2 h-4 w-4" /> GitHub</Button>
            </a>
            <a className="flex-1" href={site.linkedin} target="_blank" rel="noreferrer">
              <Button className="w-full rounded-xl" variant="secondary"><Linkedin className="mr-2 h-4 w-4" /> LinkedIn</Button>
            </a>
          </div>
        </div>
      </Sheet>
    </div>
  )
}
