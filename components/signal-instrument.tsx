"use client";

import { motion, useMotionValueEvent, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties } from "react";

type Point = [number, number];
type Vector = [number, number, number];
type Geography = { dots: Point[]; coasts: Point[][] };
type Mesh = { dots: Vector[]; coasts: Vector[][] };

const RAD = Math.PI / 180;
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => { const t = clamp(value); return t * t * (3 - 2 * t); };
const sphere = ([lon, lat]: Point): Vector => [Math.cos(lat * RAD) * Math.sin(lon * RAD), Math.sin(lat * RAD), Math.cos(lat * RAD) * Math.cos(lon * RAD)];
const graticule: Vector[][] = [
  ...Array.from({ length: 5 }, (_, row) => Array.from({ length: 91 }, (_, col) => sphere([-180 + col * 4, -60 + row * 30]))),
  ...Array.from({ length: 12 }, (_, col) => Array.from({ length: 46 }, (_, row) => sphere([-180 + col * 30, -90 + row * 4]))),
];
const stations = [
  { name: "CH / ZÜRICH", point: sphere([8.54, 47.38]), dx: -100, dy: 21 },
  { name: "DE / BERLIN", point: sphere([13.4, 52.52]), dx: 16, dy: -17 },
  { name: "US / NEW YORK", point: sphere([-74, 40.71]), dx: -82, dy: 20 },
  { name: "SG / SINGAPORE", point: sphere([103.82, 1.35]), dx: 12, dy: 18 },
  { name: "BR / SÃO PAULO", point: sphere([-46.63, -23.55]), dx: 12, dy: 18 },
] as const;
const chapters = [
  { state: "GLOBAL OBSERVATION", area: "WELTWEIT", title: "Jedes Ereignis beginnt mit einem Signal", detail: "Politik, Wirtschaft und Technologie in einem gemeinsamen Blick", code: "WORLD / ALL TOPICS", label: "BEOBACHTEN" },
  { state: "REGIONAL FOCUS", area: "CH + DE", title: "Der Kontext rückt in den Fokus", detail: "Länder eingrenzen und räumliche Zusammenhänge erkunden", code: "FILTER / CH + DE", label: "VERDICHTEN" },
  { state: "CONTEXT RESOLVED", area: "ANALYTICS", title: "Ein Lagebild aus vielen Perspektiven", detail: "Karte, Timeline und Auswertungen als zusammenhängender Arbeitsraum", code: "MAP / TIME / CONTEXT", label: "VERSTEHEN" },
] as const;

function SignalGlobe({ progress }: { progress: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;
    let mesh: Mesh = { dots: [], coasts: [] };
    let width = 0, height = 0, frame = 0;
    let visible = false, disposed = false, firstFrame: number | undefined;
    const controller = new AbortController();

    // Orthographic projection changes the viewpoint, rather than spinning an ornamental globe.
    function draw(time: number) {
      if (!width || !height) return;
      if (firstFrame === undefined) firstFrame = time;
      const ctx = context!;
      const p = clamp(progress.get());
      const focus = ease((p - .17) / .37);
      const settle = ease((p - .69) / .23);
      const analysis = ease((p - .68) / .25);
      const assembly = reduced ? 1 : ease((time - firstFrame) / 1500);
      const lon = (-13 + focus * 24) * RAD;
      const lat = (19 + focus * 30) * RAD;
      const radius = Math.min(width * .35, height * .405) * (1 + focus * 2.25);
      const cx = width * .5, cy = height * (.51 + settle * .025);
      const sl = Math.sin(lon), cl = Math.cos(lon), sa = Math.sin(lat), ca = Math.cos(lat);
      const project = (v: Vector) => ({
        x: cx + radius * (cl * v[0] - sl * v[2]),
        y: cy - radius * (-sa * sl * v[0] + ca * v[1] - sa * cl * v[2]),
        depth: ca * sl * v[0] + sa * v[1] + ca * cl * v[2],
      });
      ctx.clearRect(0, 0, width, height);
      const aura = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(width, height) * .66);
      aura.addColorStop(0, "rgba(55, 148, 171, .13)");
      aura.addColorStop(.65, "rgba(20, 88, 111, .035)");
      aura.addColorStop(1, "rgba(4, 14, 22, 0)");
      ctx.fillStyle = aura;
      ctx.fillRect(0, 0, width, height);

      function strokeLine(vectors: Vector[], color: string, lineWidth = .6) {
        ctx.beginPath();
        let connected = false;
        for (const vector of vectors) {
          const point = project(vector);
          if (point.depth < .025) { connected = false; continue; }
          if (connected) ctx.lineTo(point.x, point.y); else ctx.moveTo(point.x, point.y);
          connected = true;
        }
        ctx.strokeStyle = color; ctx.lineWidth = lineWidth; ctx.stroke();
      }

      // Graticule is geographically projected with the particles and the coastline.
      for (const line of graticule) strokeLine(line, `rgba(130, 190, 205, ${.09 * (1 - analysis)})`);
      if (focus < .65) {
        ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(140, 220, 235, ${(1 - focus) * .28})`; ctx.lineWidth = .8; ctx.stroke();
        ctx.beginPath(); ctx.ellipse(cx, cy, radius * 1.11, radius * 1.11, 0, .1, Math.PI * .73);
        ctx.strokeStyle = `rgba(140, 220, 235, ${(1 - focus) * .24})`; ctx.stroke();
      }
      for (const coast of mesh.coasts) strokeLine(coast, `rgba(126, 200, 217, ${(.12 + focus * .2) * (1 - analysis)})`, .7);

      const scan = reduced ? .46 : (time / 7000) % 1;
      const scanY = height * scan;
      for (let i = 0; i < mesh.dots.length; i++) {
        const point = project(mesh.dots[i]);
        if (point.depth < .02 && analysis < .01) continue;
        const spread = (1 - assembly) * 45;
        const column = i % 48;
        const row = Math.floor(i / 48);
        const peak = .24 + .3 * (Math.sin(column * .37) + 1) / 2 + .46 * Math.exp(-(((column - 32) / 9) ** 2));
        const chartX = width * (.12 + column / 47 * .76);
        const chartY = height * .76 - row / Math.ceil(mesh.dots.length / 48) * peak * height * .53;
        const x = point.x * (1 - analysis) + chartX * analysis + Math.sin(i * 1.7) * spread;
        const y = point.y * (1 - analysis) + chartY * analysis + Math.cos(i * 2.3) * spread;
        if (x < -4 || x > width + 4 || y < -4 || y > height + 4) continue;
        const highlight = Math.max(0, 1 - Math.abs(y - scanY) / 26);
        const depthAlpha = point.depth < .02 ? analysis * .4 : .25 + point.depth * .4;
        ctx.fillStyle = `rgba(${highlight > .2 ? "186, 244, 247" : "115, 183, 200"}, ${(depthAlpha + highlight * .35) * (.3 + assembly * .7)})`;
        ctx.beginPath(); ctx.arc(x, y, (focus > .6 ? .9 : .7) + highlight * .5, 0, Math.PI * 2); ctx.fill();
      }

      // Geodesic packets converge on Switzerland, then resolve into the regional view.
      const destination = stations[0].point;
      for (let station = 1; station < stations.length; station++) {
        if ((focus > .8 && station > 1) || analysis > .99) continue;
        const from = stations[station].point;
        const angle = Math.acos(Math.max(-1, Math.min(1, from[0] * destination[0] + from[1] * destination[1] + from[2] * destination[2])));
        const length = ease((p + .12 - station * .045) / .3);
        const packet = reduced ? .65 : (time / 3400 + station * .21) % 1;
        ctx.beginPath();
        let connected = false;
        for (let step = 0; step <= 56; step++) {
          const t = step / 56;
          if (t > length) break;
          const a = Math.sin((1 - t) * angle) / Math.sin(angle);
          const b = Math.sin(t * angle) / Math.sin(angle);
          const lift = 1 + Math.sin(t * Math.PI) * .11 * (1 - focus);
          const v: Vector = [0, 1, 2].map(k => (a * from[k] + b * destination[k]) * lift) as Vector;
          const point = project(v);
          if (point.depth < .01) { connected = false; continue; }
          if (connected) ctx.lineTo(point.x, point.y); else ctx.moveTo(point.x, point.y);
          connected = true;
          if (Math.abs(t - packet) < .012) {
            ctx.fillStyle = "#d4f6fa"; ctx.fillRect(point.x - 1.3, point.y - 1.3, 2.6, 2.6);
          }
        }
        ctx.strokeStyle = `rgba(138, 214, 230, ${(station === 1 ? .7 : .25 * (1 - focus)) * (1 - analysis)})`;
        ctx.lineWidth = station === 1 ? 1.1 : .75; ctx.stroke();
      }

      for (let i = 0; i < stations.length; i++) {
        if ((focus > .55 && i > 1) || analysis > .1) continue;
        const station = stations[i], point = project(station.point);
        if (point.depth < .08 || point.x < 16 || point.x > width - 16 || point.y < 30 || point.y > height - 26) continue;
        const pulse = reduced ? .35 : (time / 2400 + i * .23) % 1;
        ctx.beginPath(); ctx.arc(point.x, point.y, 5 + pulse * 16, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(155, 225, 235, ${(1 - pulse) * .4})`; ctx.lineWidth = .65; ctx.stroke();
        ctx.fillStyle = "#d0f5f9"; ctx.beginPath(); ctx.arc(point.x, point.y, i < 2 ? 2.8 : 1.8, 0, Math.PI * 2); ctx.fill();
        if (focus > .4 && i < 2) {
          ctx.font = `${Math.max(8, Math.min(10, width / 52))}px ui-monospace, monospace`;
          ctx.fillStyle = "#c1e6ed"; ctx.fillText(station.name, point.x + station.dx * Math.min(1, width / 500), point.y + station.dy);
        }
      }

      if (analysis > .05) {
        ctx.strokeStyle = `rgba(138, 214, 230, ${analysis * .15})`; ctx.lineWidth = .6;
        for (let line = 0; line < 4; line++) {
          const y = height * (.24 + line * .175);
          ctx.beginPath(); ctx.moveTo(width * .11, y); ctx.lineTo(width * .89, y); ctx.stroke();
        }
        ctx.font = `${Math.max(7, Math.min(9, width / 56))}px ui-monospace, monospace`;
        ctx.fillStyle = `rgba(173, 218, 230, ${analysis * .8})`;
        [["−48 H", .12], ["−24 H", .47], ["JETZT", .82]].forEach(([label, x]) => ctx.fillText(String(label), width * Number(x), height * .82));
        ctx.fillText("ACTIVITY / SYNTHETIC", width * .12, height * .18);
      }

      const beam = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 1);
      beam.addColorStop(0, "rgba(124, 218, 235, 0)"); beam.addColorStop(1, "rgba(124, 218, 235, .055)");
      ctx.fillStyle = beam; ctx.fillRect(0, scanY - 30, width, 30);
      ctx.strokeStyle = "rgba(124, 218, 235, .18)"; ctx.lineWidth = .5;
      ctx.beginPath(); ctx.moveTo(width * .08, scanY); ctx.lineTo(width * .92, scanY); ctx.stroke();
    }

    function tick(time: number) {
      frame = 0;
      if (!visible || document.hidden || disposed) return;
      draw(time);
      if (!reduced) frame = requestAnimationFrame(tick);
    }
    function schedule() {
      if (!frame && visible && !document.hidden && !disposed) frame = requestAnimationFrame(tick);
    }
    function visibilityChanged() { cancelAnimationFrame(frame); frame = 0; schedule(); }
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width; height = entry.contentRect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      schedule();
    });
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule(); else { cancelAnimationFrame(frame); frame = 0; }
    }, { rootMargin: "80px" });
    resize.observe(canvas); observer.observe(canvas);
    document.addEventListener("visibilitychange", visibilityChanged);
    const unsubscribe = progress.on("change", schedule);
    fetch("/projects/signal-globe.json", { signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error("Geography unavailable"); return response.json() as Promise<Geography>; })
      .then(data => { if (!disposed) { mesh = { dots: data.dots.map(sphere), coasts: data.coasts.map(coast => coast.map(sphere)) }; schedule(); } })
      .catch(() => undefined); // The projected wireframe remains usable if the optional land asset cannot load.
    return () => {
      disposed = true; controller.abort(); cancelAnimationFrame(frame);
      observer.disconnect(); resize.disconnect(); unsubscribe();
      document.removeEventListener("visibilitychange", visibilityChanged);
    };
  }, [progress, reduced]);

  return <canvas ref={canvasRef} className="signal-globe" />;
}

export default function SignalInstrument({ progress }: { progress: MotionValue<number> }) {
  const [phase, setPhase] = useState(() => Math.min(2, Math.max(0, Math.floor(progress.get() * 3))));
  const reduced = useReducedMotion();
  useMotionValueEvent(progress, "change", value => setPhase(Math.min(2, Math.max(0, Math.floor(value * 3)))));
  const trace = useTransform(progress, [.04, .92], [0, 1]);
  const chapter = chapters[phase];

  return <div className={`project-instrument visual-signal signal-phase-${phase}`} aria-hidden="true">
    <div className="signal-topbar">
      <div className="signal-wordmark"><span className="signal-logowave">{[0, 1, 2, 3, 4].map(i => <i key={i} />)}</span>SIGNAL<span>.</span></div>
      <div className="signal-channel"><i />EVENT INTELLIGENCE<span>OBSERVATORY / 08</span></div>
    </div>
    <div className="signal-observatory">
      <SignalGlobe progress={progress} />
      <div className="signal-field-vignette" />
      <div className="signal-map-meta"><span>{chapter.state}</span><span>WGS 84</span></div>
      <div className="signal-reticle"><i /><i /><i /><i /><span /></div>
      <div className="signal-coordinate"><span>047° 22′ N</span><i /><span>008° 32′ E</span></div>
      <div className="signal-map-caption"><span>FIELD OF VIEW</span><motion.strong key={chapter.area} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>{chapter.area}</motion.strong><span>{phase === 0 ? "RÄUMLICH VERORTEN" : phase === 1 ? "DAS WESENTLICHE ERKENNEN" : "ZUSAMMENHÄNGE ERKUNDEN"}</span></div>
      <div className="signal-scale"><i /><i /><i /><i /><i /><span>{phase === 0 ? "GLOBAL" : "REGIONAL"}</span></div>
    </div>
    <div className="signal-spectrum"><div className="signal-spectrum-label"><span>ACTIVITY TRACE</span><span>ILLUSTRATIVE</span></div><div className="signal-spectrum-bars">{Array.from({ length: 48 }, (_, i) => <i key={i} style={{ "--band-height": `${14 + ((i * 17 + i * i * 3) % 84)}%`, "--band-delay": `${i * -.13}s` } as CSSProperties} />)}</div><svg viewBox="0 0 500 40" preserveAspectRatio="none"><motion.path d="M0 29 H30 L37 24 L43 33 L51 16 L59 31 H94 L102 27 L109 32 L118 7 L127 30 H165 L175 21 L184 32 L194 12 L204 30 H245 L252 25 L259 33 L270 4 L281 30 H321 L330 18 L340 31 L350 9 L362 29 H403 L412 22 L421 32 L431 14 L441 30 H500" style={{ pathLength: trace }} /></svg></div>
    <div className="signal-evidence"><div className="signal-evidence-code"><span>0{phase + 1} / 03</span><span>{chapter.code}</span><i /></div><motion.div key={phase} initial={reduced ? false : { opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }}><strong>{chapter.title}</strong><p>{chapter.detail}</p></motion.div><div className="signal-process">{chapters.map((item, i) => <span key={item.label} className={phase === i ? "is-current" : phase > i ? "is-complete" : ""}><i />{item.label}</span>)}</div></div>
    <div className="signal-bottom"><span>PORTFOLIO-DEMO</span><span>SYNTHETISCHE SZENARIEN</span></div>
  </div>;
}
