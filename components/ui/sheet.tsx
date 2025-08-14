import * as React from "react"
import { cn } from "@/lib/utils"
export function Sheet({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur">
      <div className="mx-auto mt-6 w-[92%] max-w-md rounded-2xl border bg-background p-4 shadow-xl">
        <div className="flex justify-end">
          <button onClick={onClose} className="rounded-xl border px-3 py-1 text-sm">Schliessen</button>
        </div>
        {children}
      </div>
    </div>
  )
}
