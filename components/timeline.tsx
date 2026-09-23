export function Timeline({ items }: { items: { role: string; company: string; period: string; points: string[] }[] }) {
  return (
    <div className="space-y-0">
      {items.map((e, i) => (
        <article key={e.role} className="rise-in group grid gap-4 border-t py-8 first:border-t-0 md:grid-cols-[9rem_1fr] md:gap-8 md:py-10">
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-secondary">{e.period}</div>
            <div className="mt-2 font-mono text-xs text-muted-foreground">EXP_{String(i + 1).padStart(2, "0")}</div>
          </div>
          <div className="relative pl-6 md:pl-8">
            <div className="absolute bottom-0 left-0 top-0 w-px bg-border transition group-hover:bg-primary/50" />
            <div className="absolute left-[-4px] top-2 h-2 w-2 rounded-full bg-secondary shadow-[0_0_14px_hsl(var(--secondary))]" />
            <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
              <h2 className="max-w-3xl text-xl font-black tracking-tight md:text-2xl">{e.role}</h2>
              <span className="w-fit rounded-md border px-2.5 py-1 text-xs font-semibold text-muted-foreground">{e.company}</span>
            </div>
            <ul className="mt-5 grid gap-3 text-sm leading-6 text-muted-foreground">
              {e.points.map((pt) => <li key={pt} className="flex gap-3"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />{pt}</li>)}
            </ul>
          </div>
        </article>
      ))}
    </div>
  )
}
