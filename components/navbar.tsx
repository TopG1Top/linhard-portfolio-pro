"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
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
  const pathname = usePathname()

  useEffect(() => { document.body.style.overflow = open ? "hidden" : "auto" }, [open])

  return (
    <div className="sticky top-0 z-40 border-b bg-background/78 backdrop-blur-xl supports-[backdrop-filter]:bg-background/72">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="group flex items-center gap-3" aria-label={`${site.name} Home`}>
          <div className="relative grid h-8 w-8 place-items-center rounded-md border bg-card text-[10px] font-black">
            <span className="relative z-10">LZ</span>
            <div className="absolute inset-1 rounded-sm bg-gradient-to-br from-indigo-500/30 to-emerald-400/30 transition group-hover:inset-0" />
          </div>
          <span className="hidden font-semibold tracking-tight sm:inline">{site.name}</span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {site.nav.map((n) => (
            <Link key={n.href} href={n.href}>
              <Button
                variant="ghost"
                className={`relative rounded-md px-3 ${pathname === n.href ? "bg-accent text-foreground" : "text-muted-foreground"}`}
              >
                {t(`nav.${n.key}`)}
                {pathname === n.href ? <span className="absolute inset-x-3 -bottom-[13px] h-px bg-secondary" /> : null}
              </Button>
            </Link>
          ))}
          <LanguageToggle />
          <ThemeToggle />
          <a href={site.github} target="_blank" rel="noreferrer">
            <Button variant="ghost" className="rounded-lg"><Github className="h-5 w-5" /></Button>
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer">
            <Button variant="ghost" className="rounded-lg"><Linkedin className="h-5 w-5" /></Button>
          </a>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <Button variant="ghost" onClick={() => setOpen(true)} className="rounded-lg" aria-label="Navigation öffnen"><Menu className="h-6 w-6" /></Button>
        </div>
      </div>

      <Sheet open={open} onClose={() => setOpen(false)}>
        <div className="grid gap-1">
          {site.nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="w-full">
              <Button className={`w-full justify-start rounded-lg ${pathname === n.href ? "bg-accent" : ""}`} variant="ghost">{t(`nav.${n.key}`)}</Button>
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
