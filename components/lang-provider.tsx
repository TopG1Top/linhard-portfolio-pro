"use client"
import React, {createContext, useContext, useEffect, useMemo, useState} from "react"
import {messages, type Locale} from "@/lib/i18n"

type Ctx = { locale: Locale; setLocale: (l: Locale)=>void; t: (key: string)=>string }
const LangCtx = createContext<Ctx | null>(null)

export function LangProvider({children}:{children: React.ReactNode}) {
  const [mounted, setMounted] = useState(false)
  const [locale, setLocale] = useState<Locale>("de")

  useEffect(() => {
    const saved = (typeof window !== "undefined" && (localStorage.getItem("locale") as Locale)) || "de"
    setLocale(saved); setMounted(true)
  }, [])

  const dict = messages[locale]
  const t = useMemo(() => (key: string) => dict[key] ?? key, [dict])

  if (!mounted) return null
  return <LangCtx.Provider value={{locale, setLocale, t}}>{children}</LangCtx.Provider>
}
export function useI18n(){
  const ctx = useContext(LangCtx)
  if(!ctx) throw new Error("useI18n must be used inside LangProvider")
  return ctx
}
