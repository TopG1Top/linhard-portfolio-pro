"use client"
import { useEffect, useRef } from "react"
export function TechMarquee() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    let x = 0; let raf:number
    const tick = () => { x -= 0.4; el.style.transform = `translateX(${x}px)`; if (x <= -el.scrollWidth/2) x = 0; raf = requestAnimationFrame(tick) }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
  const items = ["React","TypeScript","Python","Next.js","MongoDB","MySQL","Docker","Tailwind","Clean Code","UX","Performance","Streamlit","Canvas"]
  return (
    <div className="relative overflow-hidden rounded-lg border bg-gradient-to-b from-background to-muted p-4">
      <div className="whitespace-nowrap will-change-transform" ref={ref}>
        {[...items, ...items].map((t,i)=>(<span key={i} className="mr-3 inline-flex items-center rounded-md border bg-background/70 px-3 py-1 text-sm opacity-85">{t}</span>))}
      </div>
    </div>
  )
}
