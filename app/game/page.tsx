"use client";

import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

/**
 * ULTRAKRASS – Runner (Single-File)
 * Saubere Canvas-Engine (Endless-Runner) für deine Portfolio-Seite.
 * - 60 FPS, fixed timestep; konsistentes Physikgefühl
 * - Responsive + Retina-scharf (DPR-Scaling)
 * - Space/Tap = Sprung, P = Pause, R = Reset
 * - LocalStorage Highscore
 * - Dark/Light kompatibel: liest Tailwind HSL-Variablen und wandelt sie in valide Canvas-Farben um
 */

type Vec2 = { x: number; y: number };
type Obstacle = { x: number; y: number; r: number; speed: number };

// Physik-/Spielkonstanten (bewusst sprechend und zentral)
const GRAVITY = 2000;       // px/s^2
const JUMP_VELOCITY = -800; // px/s
const FLOOR_HEIGHT = 90;    // Bodenhöhe
const PLAYER_X = 120;       // fixe X-Position
const PLAYER_RADIUS = 22;   // Spieler als Kreis
const SPAWN_MIN = 0.9;      // min. Sekunden bis nächstes Hindernis
const SPAWN_MAX = 1.6;      // max. Sekunden bis nächstes Hindernis

// Hilfsfunktionen
const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));
const rand = (min: number, max: number) => min + Math.random() * (max - min);
const circlesIntersect = (a: Vec2, ar: number, b: Vec2, br: number) => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy <= (ar + br) * (ar + br);
};

/** Konvertiert Tailwind HSL-Variablen (z.B. "222 24% 7%") zu gültigen CSS-Farben für Canvas. */
function toCanvasColor(raw: string, fallback: string) {
  const v = (raw || "").trim();
  if (!v) return fallback;
  // Tailwind liefert häufig "H S% L%" – hier in hsl(...) wrappen
  if (/^\d+/.test(v)) return `hsl(${v})`;
  // Falls schon "#rrggbb", rgb(), rgba(), hsl() etc. – einfach durchreichen
  return v;
}

export default function GamePage() {
  // Refs für Canvas und Loop
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loopReq = useRef<number>();
  const firstMount = useRef(true);

  // UI-State (führt zu Re-render für HUD)
  const [score, setScore] = useState(0);
  const [high, setHigh] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    return Number(localStorage.getItem("runner_high") || 0);
  });
  const [paused, setPaused] = useState(false);
  const [dead, setDead] = useState(false);

  // Simulationszustand – mutabel, nicht rendernd
  const sim = useRef({
    w: 900,
    h: 420,
    playerY: 0,
    playerVy: 0,
    baseSpeed: 360,        // Grundtempo; steigt langsam an (Difficulty Curve)
    time: 0,
    spawnIn: 1,
    obstacles: [] as Obstacle[],
  });

  /** Setzt das Spiel auf Anfangszustand zurück. */
  function reset() {
    const s = sim.current;
    s.playerY = s.h - FLOOR_HEIGHT - PLAYER_RADIUS;
    s.playerVy = 0;
    s.baseSpeed = 360;
    s.time = 0;
    s.spawnIn = 1;
    s.obstacles = [];
    setScore(0);
    setDead(false);
  }

  /** Responsive Canvas: CSS-Größe und Pixel-Größe (DPR) sauber setzen. */
  function resizeCanvas() {
    const c = canvasRef.current!;
    const parent = c.parentElement!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // 2 reicht für Schärfe + Performance
    const aspect = sim.current.w / sim.current.h;

    const maxW = Math.min(parent.clientWidth - 2, 1000);
    const targetW = Math.max(300, maxW);
    const targetH = targetW / aspect;

    c.style.width = `${targetW}px`;
    c.style.height = `${targetH}px`;
    c.width = Math.floor(targetW * dpr);
    c.height = Math.floor(targetH * dpr);
  }

  /** Springen nur, wenn (quasi) am Boden – verhindert Doppelsprünge. */
  function jump() {
    if (paused || dead) return;
    const s = sim.current;
    if (s.playerY >= s.h - FLOOR_HEIGHT - PLAYER_RADIUS - 1) {
      s.playerVy = JUMP_VELOCITY;
    }
  }

  // Input (Keyboard + Touch)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        jump();
      }
      if (e.key.toLowerCase() === "p") setPaused((p) => !p);
      if (e.key.toLowerCase() === "r") reset();
    };
    const onTouch = (e: TouchEvent) => {
      e.preventDefault();
      jump();
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouch, { passive: false });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouch);
    };
  }, [paused, dead]);

  // Initialisierung + ResizeObserver
  useEffect(() => {
    reset();
    resizeCanvas();
    const ro = new ResizeObserver(resizeCanvas);
    ro.observe(canvasRef.current!.parentElement!);
    return () => ro.disconnect();
  }, []);

  // Game Loop – fixed timestep Physik + rAF Rendering
  useEffect(() => {
    // bei Hot Reload/State-Wechsel Loop sauber erneuern
    if (!firstMount.current && loopReq.current) cancelAnimationFrame(loopReq.current);
    firstMount.current = false;

    let last = performance.now();
    let acc = 0;
    const STEP = 1 / 60;

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      acc += dt;

      while (acc >= STEP) {
        update(STEP);
        acc -= STEP;
      }
      render();
      loopReq.current = requestAnimationFrame(tick);
    };

    loopReq.current = requestAnimationFrame(tick);
    return () => {
      if (loopReq.current) cancelAnimationFrame(loopReq.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, dead]);

  /** Simulationsschritt: Physik, Spawns, Kollisionen, Score. */
  function update(dt: number) {
    if (paused || dead) return;

    const s = sim.current;
    s.time += dt;
    s.baseSpeed += dt * 4; // Difficulty Curve: langsam schneller

    // Player-Physik
    s.playerVy += GRAVITY * dt;
    s.playerY += s.playerVy * dt;
    s.playerY = clamp(s.playerY, 0, s.h - FLOOR_HEIGHT - PLAYER_RADIUS);
    if (s.playerY >= s.h - FLOOR_HEIGHT - PLAYER_RADIUS) {
      s.playerVy = Math.max(0, s.playerVy);
    }

    // Spawn neuer Bälle
    s.spawnIn -= dt;
    if (s.spawnIn <= 0) {
      s.spawnIn = rand(SPAWN_MIN, SPAWN_MAX);
      const r = rand(16, 28);
      const speed = s.baseSpeed + rand(0, 60);
      s.obstacles.push({ x: s.w + r + 10, y: s.h - FLOOR_HEIGHT - r, r, speed });
    }

    // Obstacles updaten & Kollision prüfen
    for (let i = s.obstacles.length - 1; i >= 0; i--) {
      const o = s.obstacles[i];
      o.x -= o.speed * dt;

      // Kollision → Game Over + Highscore aktualisieren
      if (
        circlesIntersect(
          { x: PLAYER_X, y: s.playerY },
          PLAYER_RADIUS,
          { x: o.x, y: o.y },
          o.r
        )
      ) {
        setDead(true);
        setHigh((h) => {
          const newHigh = Math.max(h, Math.floor(s.time * 10));
          localStorage.setItem("runner_high", String(newHigh));
          return newHigh;
        });
      }

      // Aus dem Bild → entfernen + Score++
      if (o.x < -o.r) {
        s.obstacles.splice(i, 1);
        setScore((sc) => sc + 1);
      }
    }
  }

  /** Render-Schritt: Hintergrund, Boden, Player, Bälle, HUD. */
  function render() {
    const c = canvasRef.current!;
    const ctx = c.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const s = sim.current;

    // Themefarben aus Tailwind-Vars lesen (HSL → kann "222 24% 7%" liefern)
    const root = getComputedStyle(document.documentElement);
    const BG = toCanvasColor(root.getPropertyValue("--background"), "#0b0b12");
    const FG = toCanvasColor(root.getPropertyValue("--foreground"), "#e5e7eb");

    // Akzentfarben bewusst hart definiert (markant & CI-tauglich)
    const ACCENT = "#7c3aed";   // Violett
    const ACCENT2 = "#10b981";  // Smaragd
    const LINE = "rgba(255,255,255,.08)";

    ctx.save();
    ctx.scale(dpr, dpr);

    const w = c.width / dpr;
    const h = c.height / dpr;

    // Hintergrund mit sanftem Verlauf (zweite Farbe als rgba statt 8-stelliger Hex)
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, BG);
    g.addColorStop(1, "rgba(15, 23, 42, 0.12)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // Bodenlinie + dezentes Grid
    ctx.fillStyle = LINE;
    ctx.fillRect(0, h - FLOOR_HEIGHT, w, 2);
    ctx.strokeStyle = "rgba(255,255,255,.04)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, h - FLOOR_HEIGHT + 2);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    // Player (Glow + Körper)
    const py = s.playerY;
    ctx.beginPath();
    ctx.arc(PLAYER_X, py, PLAYER_RADIUS + 10, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(124,58,237,.15)";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(PLAYER_X, py, PLAYER_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = ACCENT;
    ctx.fill();

    // Bälle (Obstacles) – stilisierte Kreise
    s.obstacles.forEach((o) => {
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI*2);
      ctx.fillStyle = ACCENT2;
      ctx.fill();

      ctx.strokeStyle = "rgba(255,255,255,.35)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r * 0.6, 0, Math.PI*2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(o.x - o.r * 0.7, o.y);
      ctx.lineTo(o.x + o.r * 0.7, o.y);
      ctx.stroke();
    });

    // HUD
    ctx.fillStyle = FG;
    ctx.font = "600 16px ui-sans-serif, system-ui";
    const hs = `High: ${high}`;
    ctx.fillText(`Score: ${score}`, 14, 22);
    ctx.fillText(hs, w - ctx.measureText(hs).width - 14, 22);

    if (paused) drawBanner(ctx, w, h, "PAUSE", "P → Weiter  •  Space/Tap → Springen");
    if (dead)   drawBanner(ctx, w, h, "GAME OVER", "R → Reset  •  Space/Tap → Springen");

    ctx.restore();
  }

  /** Halbtransparentes Banner für Pause/GameOver. */
  function drawBanner(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    title: string,
    sub: string
  ) {
    ctx.fillStyle = "rgba(15,23,42,.6)";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.font = "800 34px ui-sans-serif, system-ui";
    ctx.fillText(title, w / 2, h / 2 - 6);
    ctx.font = "500 14px ui-sans-serif, system-ui";
    ctx.fillText(sub, w / 2, h / 2 + 22);
    ctx.textAlign = "left";
  }

  // UI-Handler
  const togglePause = () => setPaused((p) => !p);

  // Sicherheit: einmal initial resetten (falls Hot Reload ohne Resize)
  useEffect(() => { reset(); }, []);

  return (
    <Section>
      <div className="mx-auto max-w-4xl">
        <header className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">ULTRAKRASS – Runner</h1>
            <p className="text-sm text-muted-foreground">
              Springe über Fußbälle.{" "}
              <kbd className="rounded border px-1 py-0.5">Space</kbd> /
              <span className="ml-1 rounded border px-1 py-0.5">Tap</span> = Sprung,
              <kbd className="ml-2 rounded border px-1 py-0.5">P</kbd> Pause.
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="rounded-2xl" onClick={togglePause}>
              {paused ? <Play className="mr-2 h-4 w-4" /> : <Pause className="mr-2 h-4 w-4" />}
              {paused ? "Resume" : "Pause"}
            </Button>
            <Button className="rounded-2xl" variant="secondary" onClick={reset}>
              <RotateCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>
        </header>

        <div className="rounded-3xl border bg-gradient-to-b from-background to-muted/40 p-3">
          <canvas
            ref={canvasRef}
            className="block w-full rounded-2xl bg-background"
            aria-label="Runner Game Canvas"
          />
        </div>

        <footer className="mt-4 text-center text-xs text-muted-foreground">
          Clean Code • 60 FPS Canvas • Mobile Ready • Local Highscore
        </footer>
      </div>
    </Section>
  );
}
