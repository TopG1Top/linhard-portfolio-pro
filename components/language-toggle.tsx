"use client"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/components/lang-provider"
export function LanguageToggle(){
  const { locale, setLocale } = useI18n()
  const other = locale === "de" ? "en" : "de"
  return <Button variant="ghost" className="rounded-2xl" onClick={() => setLocale(other)} aria-label="Language">{locale.toUpperCase()}</Button>
}
