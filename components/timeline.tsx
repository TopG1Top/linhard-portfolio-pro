export function Timeline({ items }: { items: { role: string; company: string; period: string; points: string[] }[] }) {
  return (
    <div className="mt-6 space-y-6">
      {items.map((e, i) => (
        <div key={i} className="relative">
          <div className="absolute left-2 top-0 h-full w-[2px] bg-border" />
          <div className="relative ml-6 rounded-2xl border p-4">
            <div className="absolute -left-[7px] top-3 h-3 w-3 rounded-full bg-gradient-to-br from-indigo-500 to-emerald-400" />
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="font-semibold">{e.role} · {e.company}</div>
              <div className="text-sm text-muted-foreground">{e.period}</div>
            </div>
            <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
              {e.points.map((pt, j) => <li key={j}>{pt}</li>)}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}
