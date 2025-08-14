"use client"
import { useEffect, useRef, useState } from "react"
import { Section } from "@/components/section"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Obstacle = { x: number; y: number; r: number; passed?: boolean }

export default function GamePage() {
  return (
    <Section>
      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle>⚽ Jump Runner</CardTitle>
        </CardHeader>
        <CardContent>
          <GameCanvas />
        </CardContent>
      </Card>
    </Section>
  )
}

function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const [running, setRunning] = useState(false)
  const [score, setScore] = useState(0)
  const [best, setBest] = useState<number>(() => Number(localStorage.getItem("bestScore") || 0))

  useEffect(() => { return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) } }, [])

  useEffect(() => {
    const c = canvasRef.current; if (!c) return
    const ctx = c.getContext("2d")!
    let width = c.parentElement ? Math.min(900, c.parentElement.clientWidth - 24) : 800
    let height = 280
    c.width = width; c.height = height

    // Game state
    const ground = height - 40
    const player = { x: 80, y: ground, vy: 0, r: 16 }
    let obstacles: Obstacle[] = []
    let lastSpawn = 0
    let time = 0
    let alive = false
    let localScore = 0

    function reset() {
      obstacles = []; lastSpawn = 0; time = 0; alive = true; localScore = 0
      player.y = ground; player.vy = 0
      setScore(0)
    }

    function spawn() {
      const r = 14 + Math.random() * 10
      obstacles.push({ x: width + r, y: ground - r, r })
    }

    function drawBall(o: Obstacle) {
      ctx.beginPath()
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2)
      ctx.fillStyle = "#e5e7eb55"
      ctx.fill()
      ctx.lineWidth = 2
      ctx.strokeStyle = "#94a3b8"
      ctx.stroke()

      // simple football pattern
      ctx.beginPath()
      ctx.strokeStyle = "#64748b"
      ctx.moveTo(o.x - o.r*0.8, o.y)
      ctx.lineTo(o.x + o.r*0.8, o.y)
      ctx.moveTo(o.x, o.y - o.r*0.8)
      ctx.lineTo(o.x, o.y + o.r*0.8)
      ctx.stroke()
    }

    function drawPlayer() {
      // simple character: head + body
      ctx.beginPath()
      ctx.arc(player.x, player.y - player.r - 6, player.r * 0.8, 0, Math.PI * 2)
      ctx.fillStyle = "#a78bfa"
      ctx.fill()

      ctx.beginPath()
      ctx.roundRect(player.x - player.r * 0.6, player.y - player.r * 0.6, player.r * 1.2, player.r * 1.2, 6)
      ctx.fillStyle = "#34d399"
      ctx.fill()
    }

    function jump() {
      if (!alive) { reset(); return }
      if (player.y >= ground - 1) {
        player.vy = -8.6
      }
    }

    function onKey(e: KeyboardEvent) { if (e.code === "Space" || e.code === "ArrowUp") { e.preventDefault(); jump() } }
    function onPointer() { jump() }

    window.addEventListener("keydown", onKey)
    c.addEventListener("pointerdown", onPointer)

    function loop(ts: number) {
      if (!running) { rafRef.current = requestAnimationFrame(loop); return }
      if (!alive) { rafRef.current = requestAnimationFrame(loop); return }
      const dt = 16
      time += dt
      ctx.clearRect(0,0,width,height)

      // background
      const grad = ctx.createLinearGradient(0,0,0,height)
      grad.addColorStop(0, "rgba(99,102,241,0.06)")
      grad.addColorStop(1, "rgba(16,185,129,0.06)")
      ctx.fillStyle = grad
      ctx.fillRect(0,0,width,height)

      // ground line
      ctx.strokeStyle = "#334155"
      ctx.beginPath()
      ctx.moveTo(0, ground + 0.5)
      ctx.lineTo(width, ground + 0.5)
      ctx.stroke()

      // spawn
      if (time - lastSpawn > 900 + Math.random()*700) {
        spawn(); lastSpawn = time
      }

      // update obstacles
      for (const o of obstacles) {
        o.x -= 3.6
        drawBall(o)
        // score
        if (!o.passed && o.x + o.r < player.x - player.r) {
          o.passed = true
          localScore += 1
          setScore(localScore)
        }
        // collision (circle-circle approx with player's body)
        const dx = (player.x) - o.x
        const dy = (player.y - player.r*0.2) - o.y
        const dist = Math.hypot(dx, dy)
        if (dist < o.r + player.r*0.9) {
          alive = false
          const newBest = Math.max(localScore, Number(localStorage.getItem("bestScore") || 0))
          localStorage.setItem("bestScore", String(newBest))
          setBest(newBest)
        }
      }
      // remove off-screen
      obstacles = obstacles.filter(o => o.x + o.r > -20)

      // update player
      player.vy += 0.45
      player.y += player.vy
      if (player.y > ground) { player.y = ground; player.vy = 0 }

      drawPlayer()

      // HUD
      ctx.fillStyle = "#94a3b8"
      ctx.font = "bold 16px ui-sans-serif, system-ui, -apple-system"
      ctx.fillText(`Score: ${localScore}  •  Best: ${Math.max(best, localScore)}`, 12, 22)
      if (!alive) {
        ctx.fillStyle = "#e11d48"
        ctx.font = "bold 18px ui-sans-serif, system-ui, -apple-system"
        ctx.fillText("Game Over – click or press SPACE to retry", 12, 46)
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    // start loop
    rafRef.current = requestAnimationFrame(loop)

    // cleanup
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener("keydown", onKey)
      c.removeEventListener("pointerdown", onPointer)
    }
  }, [running, best])

  return (
    <div className="space-y-3">
      <canvas ref={canvasRef} className="w-full rounded-2xl border bg-background" style={{maxWidth: "900px"}} />
      <div className="flex items-center gap-2">
        <Button onClick={() => setRunning(true)} className="rounded-2xl">Start</Button>
        <Button onClick={() => { setRunning(false) }} variant="outline" className="rounded-2xl">Pause</Button>
        <span className="text-sm text-muted-foreground">Steuerung: SPACE/Click = Sprung</span>
      </div>
    </div>
  )
}
