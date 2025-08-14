"use client"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) {
    return <Button variant="ghost" className="rounded-2xl" aria-label="Theme"><span className="inline-block h-5 w-5" /></Button>
  }
  const current = theme === "system" ? resolvedTheme : theme
  const next = current === "dark" ? "light" : "dark"
  return (
    <Button variant="ghost" onClick={() => setTheme(next!)} className="rounded-2xl" aria-label="Theme togglen" title="Theme togglen">
      {current === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )
}
