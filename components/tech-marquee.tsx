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
  const items = ["React","TypeScript","Node.js","Next.js","MongoDB","MySQL","Docker","Tailwind","Clean Code","UCD","Performance"]
  return (
    <div className="relative overflow-hidden rounded-3xl border p-4 bg-gradient-to-b from-background to-muted">
      <div className="whitespace-nowrap will-change-transform" ref={ref}>
        {[...items, ...items].map((t,i)=>(<span key={i} className="inline-flex items-center rounded-full border px-3 py-1 text-sm mr-3 opacity-80">{t}</span>))}
      </div>
    </div>
  )
}
