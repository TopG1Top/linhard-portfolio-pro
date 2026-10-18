"use client";

import { useEffect, useRef } from "react";
import { LogoMark } from "@/components/logo-mark";

const TAU = Math.PI * 2;
const clamp = (n: number) => Math.max(0, Math.min(1, n));
const ease = (n: number) => { const t = clamp(n); return t * t * (3 - 2 * t); };
const random = (n: number) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const fragments = Array.from({ length: 280 }, (_, i) => ({
  angle: random(i + 1) * TAU, radius: .32 + random(i + 301) * .38,
  depth: random(i + 601), speed: .2 + random(i + 901) * .6,
}));

/** A projected mechanical sculpture, assembled once per visit without a 3D library. */
export function EntryIdentityField({ progress, reduced }: { progress: number; reduced: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(progress);
  useEffect(() => { progressRef.current = progress; }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !ctx) return;
    let frame = 0;
    let size = 600;
    let smooth = reduced ? 1 : 0;
    let previous = 0;
    const resize = () => {
      size = canvas.clientWidth;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const observer = new ResizeObserver(() => {
      resize();
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    });
    observer.observe(canvas);
    resize();

    const draw = (now: number) => {
      const delta = Math.min(48, now - (previous || now));
      previous = now;
      smooth += (progressRef.current / 100 - smooth) * (1 - Math.exp(-delta / 75));
      const p = reduced ? 1 : smooth;
      const assembly = ease(p / .35);
      const unlock = ease((p - .57) / .25);
      const tilt = (1 - ease((p - .2) / .5)) * .75 + .07;
      const turn = (1 - assembly) * 1.35 + p * .17;
      const zoom = 1 + ease((p - .87) / .13) * .055;
      ctx.clearRect(0, 0, size, size);
      ctx.save();
      ctx.translate(size / 2, size / 2);
      ctx.scale(size * zoom, size * zoom);

      const project = (x: number, y: number, z = 0): [number, number] => {
        const yy = y * Math.cos(tilt) - z * Math.sin(tilt);
        const zz = y * Math.sin(tilt) + z * Math.cos(tilt);
        const perspective = 1.7 / (1.7 + zz);
        return [x * perspective, yy * perspective];
      };
      const point = (r: number, angle: number, z = 0) => project(Math.cos(angle) * r, Math.sin(angle) * r, z);
      const polygon = (points: [number, number][], fill: string | CanvasGradient, stroke?: string) => {
        ctx.beginPath();
        points.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
        ctx.closePath(); ctx.fillStyle = fill; ctx.fill();
        if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = .0008; ctx.stroke(); }
      };

      const halo = ctx.createRadialGradient(0, 0, .04, 0, 0, .5);
      halo.addColorStop(0, `rgba(230,191,127,${.10 + unlock * .1})`);
      halo.addColorStop(.48, `rgba(169,123,67,${.07 + Math.sin(p * Math.PI) * .04})`);
      halo.addColorStop(1, "rgba(120,85,40,0)");
      ctx.fillStyle = halo; ctx.fillRect(-.5, -.5, 1, 1);

      // Dust is pulled into the mechanism, then leaves as a resolved light field.
      ctx.globalCompositeOperation = "lighter";
      fragments.forEach((f, i) => {
        const converge = ease((p - f.depth * .12) / .43);
        const r = f.radius * (1 - converge) + (.225 + f.depth * .095) * converge + unlock * f.speed * .17;
        const a = f.angle + p * f.speed * 1.7;
        const [x, y] = point(r, a, (f.depth - .5) * .24 * (1 - converge));
        const alpha = (.18 + f.depth * .57) * (1 - unlock * .65);
        ctx.strokeStyle = `rgba(224,195,145,${alpha})`;
        ctx.lineWidth = .0008 + f.depth * .0005;
        ctx.beginPath(); ctx.moveTo(x, y);
        ctx.lineTo(x + Math.cos(a) * .005 * (1 - converge), y + Math.sin(a) * .005 * (1 - converge)); ctx.stroke();
        if (i % 11 === 0) { ctx.fillStyle = `rgba(255,229,180,${alpha})`; ctx.fillRect(x, y, .002, .002); }
      });
      ctx.globalCompositeOperation = "source-over";

      // Individually bevelled metal segments settle into three concentric tracks.
      for (let track = 2; track >= 0; track--) {
        const count = track === 1 ? 64 : 32;
        const base = .228 + track * .042;
        for (let i = 0; i < count; i++) {
          const arrive = ease((p - (i % 8) * .009 - track * .025) / .26);
          const expansion = (1 - arrive) * (.14 + random(i + track * 70) * .15);
          const r = base + expansion + unlock * track * .012;
          const a = i / count * TAU + turn * (track === 1 ? -1 : 1);
          const b = a + TAU / count * (track === 1 ? .62 : .87);
          const width = track === 1 ? .008 : .021;
          const z = (1 - arrive) * .18 + track * .012;
          const light = (Math.cos(a - p * 3.5) + 1) / 2;
          const shade = Math.round(32 + light * 90);
          const metal = ctx.createLinearGradient(...point(r, a, z), ...point(r + width, b, z));
          metal.addColorStop(0, `rgb(${shade + 20},${shade + 12},${shade})`);
          metal.addColorStop(.28, `rgb(${shade + 57},${shade + 40},${shade + 14})`);
          metal.addColorStop(1, "#171a1c");
          ctx.globalAlpha = .25 + arrive * .75;
          polygon([point(r, a, z), point(r + width, a, z), point(r + width, b, z), point(r, b, z)], metal, `rgba(245,215,160,${.08 + light * .34})`);
          if (track === 1 && i / count < p) {
            ctx.strokeStyle = `rgba(246,213,156,${.4 + light * .6})`; ctx.lineWidth = .002;
            ctx.beginPath(); ctx.moveTo(...point(r + width, a, z)); ctx.lineTo(...point(r + width, b, z)); ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      // Six shutter blades withdraw to uncover the signature.
      for (let i = 0; i < 6; i++) {
        const a = i / 6 * TAU + (1 - assembly) * .55;
        const distance = unlock * .16 + (1 - assembly) * .12;
        const offsetX = Math.cos(a + .5) * distance;
        const offsetY = Math.sin(a + .5) * distance;
        const pts: [number, number][] = [[0, 0], point(.214, a), point(.214, a + TAU / 6), point(.094, a + 1.5)];
        const plate = ctx.createLinearGradient(-.2, -.2, .2, .2);
        plate.addColorStop(0, i % 2 ? "#38352e" : "#242727"); plate.addColorStop(.5, "#131719"); plate.addColorStop(1, "#080c0e");
        ctx.globalAlpha = (1 - unlock * .95) * assembly;
        polygon(pts.map(([x, y]) => [x + offsetX, y + offsetY]), plate, "#b79a6266");
      }
      ctx.globalAlpha = 1;

      const scanning = ease((p - .27) / .1) * (1 - ease((p - .64) / .1));
      if (scanning > .001) {
        const y = -.24 + clamp((p - .28) / .37) * .48;
        const beam = ctx.createLinearGradient(0, y - .05, 0, y + .002);
        beam.addColorStop(0, "#ddbe8000"); beam.addColorStop(1, `rgba(244,220,171,${scanning * .15})`);
        ctx.save(); ctx.beginPath(); ctx.arc(0, 0, .22, 0, TAU); ctx.clip();
        ctx.fillStyle = beam; ctx.fillRect(-.23, y - .05, .46, .05);
        ctx.strokeStyle = `rgba(255,237,194,${scanning * .9})`; ctx.lineWidth = .0015;
        ctx.beginPath(); ctx.moveTo(-.23, y); ctx.lineTo(.23, y); ctx.stroke(); ctx.restore();
      }

      const release = ease((p - .72) / .28);
      if (release > 0) {
        ctx.strokeStyle = `rgba(218,189,136,${(1 - release) * .35})`; ctx.lineWidth = .001;
        ctx.beginPath(); ctx.arc(0, 0, .21 + release * .28, 0, TAU); ctx.stroke();
      }
      const flare = Math.sin(clamp((p - .62) / .22) * Math.PI) * .6;
      const light = ctx.createRadialGradient(0, 0, 0, 0, 0, .47);
      light.addColorStop(0, `rgba(255,237,198,${flare})`); light.addColorStop(.2, `rgba(212,164,92,${flare * .2})`); light.addColorStop(1, "#d4a45c00");
      ctx.save(); ctx.scale(1, .035); ctx.fillStyle = light; ctx.fillRect(-.5, -.5, 1, 1); ctx.restore();
      ctx.restore();
      if (!reduced && !document.hidden) frame = requestAnimationFrame(draw);
    };
    const resume = () => { cancelAnimationFrame(frame); previous = 0; if (!document.hidden) frame = requestAnimationFrame(draw); };
    document.addEventListener("visibilitychange", resume);
    frame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); document.removeEventListener("visibilitychange", resume); };
  }, [reduced]);

  return <div className={`entry-sculpture ${progress >= 63 ? "is-unsealed" : ""}`} aria-hidden="true">
    <div className="entry-sculpture-aura" />
    <canvas ref={canvasRef} />
    <div className="entry-core-mark"><LogoMark /><span>AUTHORED BY LZ</span></div>
    <div className="entry-orbit-label entry-orbit-label-top"><i />{progress < 63 ? "SIGNATURE CORE" : "SIGNATURE RESOLVED"}<i /></div>
    <div className="entry-orbit-label entry-orbit-label-bottom">{progress < 63 ? "ASSEMBLING THE EXPERIENCE" : "THE EXPERIENCE IS YOURS"}</div>
    <span className="entry-axis-label entry-axis-left">LZ / CH</span><span className="entry-axis-label entry-axis-right">0{Math.min(3, Math.floor(progress / 34) + 1)}</span>
  </div>;
}
