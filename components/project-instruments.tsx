"use client";

import { AnimatePresence, motion, useMotionValueEvent, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { Typewriter } from "@/components/kinetic-text";

type Props = { progress: MotionValue<number> };

function EncryptionInstrument({ progress }: Props) {
  const [digest, setDigest] = useState("".padEnd(64, "·"));
  const [count, setCount] = useState(0);
  useEffect(() => {
    let active = true;
    if (!window.crypto?.subtle) return;
    window.crypto.subtle.digest("SHA-256", new TextEncoder().encode("CALC PRIVATE VAULT / PORTFOLIO DEMO")).then((buffer) => {
      if (active) setDigest(Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, "0")).join(""));
    }).catch(() => undefined);
    return () => { active = false; };
  }, []);
  useMotionValueEvent(progress, "change", (value) => setCount(Math.max(0, Math.min(64, Math.round((value - .12) * 105)))));
  const shown = digest.slice(0, count).padEnd(64, "·");
  return <div className="project-instrument project-instrument-crypto" aria-hidden="true"><div className="instrument-chrome"><span>CRYPTO / LOCAL</span><span>SHA-256 · DEMO</span></div><div className="crypto-terminal"><p>INPUT&nbsp;&nbsp; CALC / PRIVATE VAULT</p><p>MODE&nbsp;&nbsp;&nbsp; LOCAL-FIRST · AES-GCM</p><div className="crypto-hash"><span>DERIVED FINGERPRINT</span><code>{shown.slice(0, 32)}<br />{shown.slice(32)}</code></div><div className="crypto-seal"><span className={count > 54 ? "is-sealed" : ""}>{count > 54 ? "SEALED / 256 BIT" : "DERIVING / KEY MATERIAL"}</span><i /></div></div></div>;
}

function CityInstrument({ progress }: Props) {
  const [phase, setPhase] = useState(0);
  const route = useTransform(progress, [.18, .76], [0, 1]);
  useMotionValueEvent(progress, "change", (value) => setPhase(value < .42 ? 0 : value < .57 ? 1 : 2));
  const phases = [
    { code: "01 / LOCATE", title: "Eine Stadt. Ein klares Lagebild.", detail: "Standort und Umgebung werden räumlich geordnet.", metric: "SEARCH → MAP" },
    { code: "02 / SYNTHESIZE", title: "Signale werden Kontext.", detail: "Wetter, Luft und Verkehr erhalten eine gemeinsame Ebene.", metric: "3 SIGNALS / 1 VIEW" },
    { code: "03 / DECIDE", title: "Das Wesentliche bleibt.", detail: "Nicht mehr Daten. Die richtige Entscheidungsebene.", metric: "CONTEXT / READY" },
  ];
  return <div className={`project-instrument atlas-instrument atlas-phase-${phase}`} aria-hidden="true">
    <div className="atlas-header"><span>URBAN SIGNALS <i /></span><span>CONTROL ROOM / DEMO</span></div>
    <div className="atlas-map">
      <svg viewBox="0 0 600 430" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g className="atlas-streets"><path d="M-20 315 C90 280 145 302 232 235 S380 165 625 197" /><path d="M-10 112 C94 137 120 194 228 169 S445 56 627 80" /><path d="M45 -15 C68 116 176 177 176 441" /><path d="M390 -20 C350 105 390 224 544 446" /><path d="M560 -20 C496 124 441 216 470 447" /><path d="M-20 397 C130 343 254 369 379 311 S527 304 624 348" /></g>
        <g className="atlas-blocks"><path d="M91 55 152 84 137 130 74 112Z" /><path d="M251 36 329 19 347 84 272 106Z" /><path d="M250 244 313 228 337 274 278 300Z" /><path d="M370 126 450 111 462 159 386 179Z" /><path d="M67 235 120 225 133 280 82 299Z" /><path d="M466 302 543 307 520 369 453 353Z" /></g>
        <motion.path className="atlas-route" d="M84 331 C151 309 158 255 225 243 S321 180 389 181 S478 157 524 98" style={{ pathLength: route }} />
        <circle className="atlas-origin" cx="84" cy="331" r="5" /><circle className="atlas-destination" cx="524" cy="98" r="5" />
      </svg>
      <span className="atlas-coordinate atlas-coordinate-a">47°10′N</span><span className="atlas-coordinate atlas-coordinate-b">08°30′E</span>
      <div className="atlas-beacon atlas-beacon-a" /><div className="atlas-beacon atlas-beacon-b" /><div className="atlas-crosshair" />
      <div className="atlas-map-label">CITYPULSE <span>SPATIAL / SIGNAL LAYER</span></div>
    </div>
    <div className="atlas-readout"><div className="atlas-readout-index"><span>SYS / 02</span><span>0{phase + 1}—03</span></div><AnimatePresence mode="wait"><motion.div key={phase} initial={{ opacity: 0, y: 18, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -13, filter: "blur(5px)" }} transition={{ duration: .55 }}><span className="atlas-code">{phases[phase].code}</span><strong>{phases[phase].title}</strong><p>{phases[phase].detail}</p></motion.div></AnimatePresence><span className="atlas-metric">{phases[phase].metric}</span></div>
    <div className="atlas-timeline"><span /><span className={phase >= 1 ? "is-active" : ""} /><span className={phase >= 2 ? "is-active" : ""} /></div>
  </div>;
}

function CasinoInstrument({ progress }: Props) {
  const [phase, setPhase] = useState(0);
  const wheel = useTransform(progress, [.14, .82], [0, 540]);
  useMotionValueEvent(progress, "change", (value) => setPhase(value < .42 ? 0 : value < .57 ? 1 : 2));
  const phases = [
    { eyebrow: "01 / THE TABLE", title: "Präzision im Spiel.", detail: "Jeder Einsatz beginnt mit einer bewussten Geste." },
    { eyebrow: "02 / THE HAND", title: "Spannung ohne Lärm.", detail: "Karten, Zustand und Reaktion folgen derselben Logik." },
    { eyebrow: "03 / THE SESSION", title: "Ein System. Drei Modi.", detail: "Das Erlebnis bleibt vom ersten bis zum letzten Zug konsistent." },
  ];
  return <div className={`project-instrument luxe-instrument luxe-phase-${phase}`} aria-hidden="true">
    <div className="luxe-header"><span className="luxe-monogram">LN</span><span>LUXE NOIR <i /> PRIVATE TABLE</span><span>DEMO / NO WAGER</span></div>
    <div className="luxe-theatre"><div className="luxe-theatre-rule" />
      <AnimatePresence mode="wait">
        {phase === 0 ? <motion.div className="luxe-roulette" key="roulette" initial={{ opacity: 0, scale: .88, filter: "blur(8px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0, scale: 1.08, filter: "blur(7px)" }} transition={{ duration: .65 }}><motion.div className="luxe-wheel" style={{ rotate: wheel }}><span>0</span><span>17</span><span>32</span><span>8</span><i /></motion.div><div className="luxe-ball" /><div className="luxe-chip luxe-chip-a"><span>01</span></div><div className="luxe-chip luxe-chip-b"><span>05</span></div></motion.div> : phase === 1 ? <motion.div className="luxe-hand" key="hand" initial={{ opacity: 0, y: 28, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -22, filter: "blur(7px)" }} transition={{ duration: .65 }}><div className="luxe-card"><span>7</span><strong>♠</strong><small>7</small></div><div className="luxe-card"><span>A</span><strong>♠</strong><small>A</small></div><div className="luxe-hand-line" /><p>BLACKJACK / HAND 01</p></motion.div> : <motion.div className="luxe-session" key="session" initial={{ opacity: 0, y: 25, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -20 }} transition={{ duration: .65 }}><span>SESSION / LOCAL</span><div><b>01</b><strong>ROULETTE</strong><i /></div><div><b>02</b><strong>BLACKJACK</strong><i /></div><div><b>03</b><strong>SLOTS</strong><i /></div></motion.div>}
      </AnimatePresence>
    </div>
    <div className="luxe-narrative"><span>{phases[phase].eyebrow}</span><strong>{phases[phase].title}</strong><p>{phases[phase].detail}</p></div><div className="luxe-bottom"><span>INTERACTION / SYSTEM</span><div><i className={phase === 0 ? "is-active" : ""} /><i className={phase === 1 ? "is-active" : ""} /><i className={phase === 2 ? "is-active" : ""} /></div><span>0{phase + 1} / 03</span></div>
  </div>;
}

function GradesInstrument({ progress }: Props) {
  const [phase, setPhase] = useState(0);
  const [nextGrade, setNextGrade] = useState(5);
  const grade = ((19.5 + nextGrade) / 5).toFixed(1);
  const scale = useTransform(progress, [.18, .82], [0, 1]);
  const railY = useTransform(scale, [0, 1], ["31%", "17%"]);
  useMotionValueEvent(progress, "change", (value) => { setPhase(value < .42 ? 0 : value < .57 ? 1 : 2); setNextGrade(5 + Math.min(1, Math.max(0, (value - .42) / .25))); });
  const phases = [
    { code: "01 / IST-ZUSTAND", title: "Gewichtung verstehen.", note: "Beispieldaten · Schweizer Skala" },
    { code: "02 / SZENARIO", title: "Was wäre, wenn?", note: "Nächste Prüfung simulieren" },
    { code: "03 / ZIELPLAN", title: "Aus Ziel wird Plan.", note: "Lernschritte + Kalenderexport" },
  ];
  return <div className={`project-instrument grade-instrument grade-phase-${phase}`} aria-hidden="true"><div className="grade-header"><span>SWISS GRADE ENGINE</span><span>CH / 1.0—6.0</span></div><div className="grade-main"><div className="grade-rail"><div className="grade-rail-scale"><span>6.0</span><span>5.0</span><span>4.0</span><span>3.0</span><span>2.0</span><span>1.0</span></div><div className="grade-rail-track"><i /><motion.b style={{ y: railY }} /><span>Ø</span></div></div><div className="grade-workspace"><div className="grade-equation"><span>GEWICHTETER DURCHSCHNITT</span><strong>Σ (Note × Gewicht)<i />Σ Gewicht</strong></div><div className="grade-rows"><div><span>MATHEMATIK</span><b>4.5</b><em>× 2</em></div><div><span>DEUTSCH</span><b>5.0</b><em>× 1</em></div><div><span>PROJEKT</span><b>5.5</b><em>× 1</em></div>{phase > 0 && <motion.div className="grade-next-row" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }}><span>NÄCHSTE PRÜFUNG</span><b>{nextGrade.toFixed(1)}</b><em>× 1</em></motion.div>}</div><div className="grade-output"><span>{phase === 0 ? "AKTUELLER Ø" : "SIMULIERTER Ø"}</span><strong>{grade}</strong><em>/ 6.0</em></div></div></div><div className="grade-narrative"><span>{phases[phase].code}</span><strong>{phases[phase].title}</strong><p>{phases[phase].note}</p></div><div className="grade-bottom"><span>ILLUSTRATIVE DEMO</span><div><i className={phase === 0 ? "is-active" : ""} /><i className={phase === 1 ? "is-active" : ""} /><i className={phase === 2 ? "is-active" : ""} /></div><span>0{phase + 1} / 03</span></div></div>;
}

function GameInstrument({ progress }: Props) {
  const x = useTransform(progress, [.08, .84], ["-50%", "74%"]);
  const y = useTransform(progress, [.08, .35, .62, .84], ["35%", "-28%", "24%", "-10%"]);
  const rotation = useTransform(progress, [.08, .84], [0, 1100]);
  return <div className="project-instrument project-instrument-game" aria-hidden="true"><div className="instrument-chrome"><span>CANVAS / 60 FPS</span><span>LEVEL 05</span></div><div className="game-field"><div className="game-lanes"><i /><i /><i /><i /></div><span className="game-obstacle game-obstacle-a" /><span className="game-obstacle game-obstacle-b" /><span className="game-obstacle game-obstacle-c" /><motion.div className="game-ball" style={{ x, y, rotate: rotation }}><span /></motion.div><div className="game-boss">BOSS<br /><b>CORE</b></div></div><div className="instrument-footer"><span>PARTICLES</span><span>SHAKE</span><span>SLOW-MO</span></div></div>;
}

function SportsInstrument({ progress }: Props) {
  const x = useTransform(progress, [.1, .8], ["-220%", "175%"]);
  const y = useTransform(progress, [.1, .45, .8], ["28%", "-125%", "-12%"]);
  const pathLength = useTransform(progress, [.12, .8], [0, 1]);
  return <div className="project-instrument project-instrument-sport" aria-hidden="true"><div className="instrument-chrome"><span>FC BRUGG / MATCH DATA</span><span>PLAY 01</span></div><div className="sport-pitch"><div className="sport-half" /><div className="sport-center" /><div className="sport-goal sport-goal-left" /><div className="sport-goal sport-goal-right" /><motion.svg viewBox="0 0 400 250"><motion.path d="M44 177 C125 175 130 49 215 91 S277 183 365 102" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 7" style={{ pathLength }} /></motion.svg><motion.div className="sport-ball" style={{ x, y }}>●</motion.div><span className="sport-score">RESULTAT / TORE / TEAM</span></div><div className="instrument-footer"><span>MANNSCHAFT</span><span>SPIEL</span><span>TOR</span></div></div>;
}

function OsInstrument({ progress }: Props) {
  const x1 = useTransform(progress, [.1, .75], ["-14%", "0%"]);
  const x2 = useTransform(progress, [.1, .75], ["18%", "0%"]);
  const y3 = useTransform(progress, [.1, .75], ["24%", "0%"]);
  return <div className="project-instrument project-instrument-os" aria-hidden="true"><div className="instrument-chrome"><span>PORTFOLIO / OS</span><span>WINDOWS ACTIVE</span></div><div className="os-desktop"><motion.div className="os-window os-window-a" style={{ x: x1 }}><span>PORTFOLIO.EXE</span><i /><i /><i /></motion.div><motion.div className="os-window os-window-b" style={{ x: x2 }}><span>PROJECTS / 07</span><b>01&nbsp; CALC<br />02&nbsp; CITYPULSE<br />03&nbsp; LUXE NOIR</b></motion.div><motion.div className="os-window os-window-c" style={{ y: y3 }}><span>TERMINAL</span><code>&gt; <Typewriter text="system ready_" delay={100} /></code></motion.div></div><div className="instrument-footer"><span>DOCK</span><span>TERMINAL</span><span>WINDOWS</span></div></div>;
}

export function ProjectInstrument({ index, progress }: { index: number; progress: MotionValue<number> }) {
  switch (index) {
    case 0: return <EncryptionInstrument progress={progress} />;
    case 1: return <CityInstrument progress={progress} />;
    case 2: return <CasinoInstrument progress={progress} />;
    case 3: return <GradesInstrument progress={progress} />;
    case 4: return <GameInstrument progress={progress} />;
    case 5: return <SportsInstrument progress={progress} />;
    default: return <OsInstrument progress={progress} />;
  }
}
