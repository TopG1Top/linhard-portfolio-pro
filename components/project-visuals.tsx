"use client";

import { AnimatePresence, motion, useMotionValueEvent, useTransform, type MotionValue } from "framer-motion";
import { Fingerprint, LockKeyhole, Check, Terminal, Minus, X } from "lucide-react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const SignalInstrument = dynamic(() => import("@/components/signal-instrument"), { ssr: false });

type Props = { progress: MotionValue<number> };
function usePhase(progress: MotionValue<number>) {
  const [phase, setPhase] = useState(0);
  useMotionValueEvent(progress, "change", value => setPhase(Math.min(2, Math.floor(value * 3))));
  return phase;
}
function Chrome({ name, meta }: { name: string; meta: string }) {
  return <div className="visual-chrome"><span><i />{name}</span><span>{meta}</span></div>;
}
function Footer({ left, right }: { left: string; right: string }) {
  return <div className="visual-footer"><span>{left}</span><span>{right}</span></div>;
}

function CipherBlock({ index, progress }: Props & { index: number }) {
  const lock = useTransform(progress, [.04 + index * .013, .22 + index * .013], [0, 1]);
  const offset = useTransform(lock, [0, 1], [index % 2 ? -28 : 28, 0]);
  const opacity = useTransform(lock, [0, 1], [.1, 1]);
  return <motion.span className="cipher-block" style={{ y: offset, opacity }}><span>{["d8f1", "9a3c", "b017", "ef42", "7c5a", "0e69", "a3d8", "6f12", "92ae", "3db4", "c1f0", "84b7", "5a29", "e60d", "f381", "2c9e"][index]}</span></motion.span>;
}
function EncryptionInstrument({ progress }: Props) {
  const phase = usePhase(progress);
  const [digest, setDigest] = useState("".padEnd(64, "·"));
  const [count, setCount] = useState(0);
  const width = useTransform(progress, [.1, .65], ["0%", "100%"]);
  const scan = useTransform(progress, [0, .66, 1], ["0%", "100%", "100%"]);
  const seal = useTransform(progress, [.57, .72], [0, 1]);
  useEffect(() => {
    let active = true;
    window.crypto?.subtle?.digest("SHA-256", new TextEncoder().encode("CALC PRIVATE VAULT / PORTFOLIO DEMO")).then(buffer => {
      if (active) setDigest(Array.from(new Uint8Array(buffer), byte => byte.toString(16).padStart(2, "0")).join(""));
    }).catch(() => undefined);
    return () => { active = false; };
  }, []);
  useMotionValueEvent(progress, "change", value => setCount(Math.min(64, Math.max(0, Math.floor(value * 120)))));
  return <div className={`project-instrument visual-cipher visual-phase-${phase}`} aria-hidden="true"><Chrome name="CALC / PRIVATE VAULT" meta="CRYPTOGRAPHIC STUDY" />
    <div className="cipher-chamber"><div className="cipher-matrix">{Array.from({ length: 16 }, (_, index) => <CipherBlock key={index} index={index} progress={progress} />)}</div><div className="cipher-core"><Fingerprint className="cipher-print" strokeWidth={.65} /><motion.div className="cipher-lock" style={{ opacity: seal }}><LockKeyhole strokeWidth={1} /></motion.div><motion.i className="cipher-scan" style={{ top: scan }} /></div><motion.div className="cipher-shutter cipher-shutter-left" style={{ scaleX: seal }} /><motion.div className="cipher-shutter cipher-shutter-right" style={{ scaleX: seal }} /><span className="cipher-chamber-caption">{["INPUT → KEY MATERIAL", "KEY MATERIAL → CIPHERTEXT", "LOCAL / ENCRYPTED / YOURS"][phase]}</span></div>
    <div className="cipher-output"><div><span>SHA-256 / DEMO-FINGERPRINT</span><span>{count}/64</span></div><code>{digest.slice(0, count).padEnd(64, "·")}</code><div className="cipher-output-rule"><motion.i style={{ width }} /></div></div><Footer left="PBKDF2 → AES-GCM" right={phase === 2 ? "SEALED / 256 BIT" : "LOCAL-FIRST ARCHITECTURE"} /></div>;
}

const streets = ["M-10 145 L540 145", "M-10 230 L540 230", "M-10 320 L540 320", "M115 -10 L115 420", "M235 -10 L235 420", "M370 -10 L370 420", "M490 -10 L490 420", "M-10 395 L435 -10"];
function CityInstrument({ progress }: Props) {
  const phase = usePhase(progress);
  const route = useTransform(progress, [.06, .6], [0, 1]);
  const elevation = useTransform(progress, [0, .4, .8], [0, -28, -48]);
  const tilt = useTransform(progress, [0, .6, 1], [48, 35, 18]);
  const scan = useTransform(progress, [0, 1], ["-10%", "110%"]);
  return <div className={`project-instrument visual-atlas visual-phase-${phase}`} aria-hidden="true"><Chrome name="CITYPULSE / URBAN SIGNALS" meta="SPATIAL STUDY" />
    <div className="atlas-scene"><div className="atlas-axis-label">SCHWEIZ / STADTMODELL</div><motion.div className="atlas-terrain" style={{ rotateX: tilt, rotateZ: -28 }}><div className="atlas-plane atlas-plane-base" /><motion.div className="atlas-plane atlas-plane-streets" style={{ y: elevation }}><svg viewBox="0 0 540 410"><g>{streets.map(d => <path key={d} d={d} />)}</g><g className="atlas-buildings">{Array.from({ length: 18 }, (_, i) => <rect key={i} x={40 + (i % 6) * 82} y={60 + Math.floor(i / 6) * 100} width={25 + i % 3 * 6} height={35 + i % 4 * 5} />)}</g><motion.path className="atlas-active-route" d="M50 350 L115 320 L235 230 L370 230 L370 145 L490 145 L490 60" style={{ pathLength: route }} /><circle cx="490" cy="60" r="7" className="atlas-location-dot" /></svg><motion.div className="atlas-laser" style={{ left: scan }} /><span className="atlas-map-pin"><i /><b>01</b></span></motion.div><motion.div className="atlas-plane atlas-plane-weather" style={{ y: elevation, opacity: phase > 0 ? 1 : 0 }}><span>ATMOSPHERE / LAYER 02</span><div className="atlas-weather-contour" /><div className="atlas-weather-contour atlas-weather-contour-two" /></motion.div></motion.div><span className="atlas-north">N ↑</span></div>
    <div className="atlas-signal-list">{["Standort", "Wetter", "Luftqualität"].map((label, i) => <div key={label} className={phase >= i ? "is-resolved" : ""}><span>0{i + 1}</span><strong>{label}</strong><span>{phase >= i ? "VERKNÜPFT" : "BEREIT"}</span><i /></div>)}</div><Footer left="GEOCODING → CONTEXT" right="ILLUSTRATIVE DATENEBENEN" /></div>;
}

function PlayingCard({ progress, index }: Props & { index: number }) {
  const x = useTransform(progress, [.29 + index * .018, .45 + index * .018, .65], [120, (index - 2) * 49, (index - 2) * 43]);
  const y = useTransform(progress, [.29 + index * .018, .46 + index * .018, .65], [-140, Math.abs(index - 2) * 10, 10]);
  const rotate = useTransform(progress, [.29, .46, .65], [35, (index - 2) * 11, (index - 2) * 5]);
  const opacity = useTransform(progress, [.28 + index * .018, .34 + index * .018], [0, 1]);
  return <motion.div className={`table-card table-card-${index}`} style={{ x, y, rotate, opacity }}><span>{["K", "7", "A", "Q", "10"][index]}<small>{index % 2 ? "♦" : "♠"}</small></span><strong>{index % 2 ? "♦" : "♠"}</strong><span>{["K", "7", "A", "Q", "10"][index]}</span></motion.div>;
}
function SlotReel({ index, progress }: Props & { index: number }) {
  const y = useTransform(progress, [.67 + index * .025, .92], ["-70%", "0%"]);
  return <div className="noir-reel"><motion.div style={{ y }}><span>7</span><span>♠</span><span>♦</span><span>7</span><span>♣</span></motion.div></div>;
}
function CasinoInstrument({ progress }: Props) {
  const phase = usePhase(progress);
  const spin = useTransform(progress, [0, .12, .24, .33], [-160, -35, -4, 0]);
  const wheelOpacity = useTransform(progress, [.25, .35], [1, 0]);
  const wheelScale = useTransform(progress, [.25, .35], [1, .8]);
  const cardsOpacity = useTransform(progress, [.62, .72], [1, 0]);
  const reelsOpacity = useTransform(progress, [.66, .75], [0, 1]);
  return <div className={`project-instrument visual-noir visual-phase-${phase}`} aria-hidden="true"><Chrome name="LUXE NOIR" meta="PRIVATE TABLE / DEMO" /><div className="noir-table"><span className="noir-table-watermark">LN</span><div className="noir-table-arc" /><motion.div className="noir-roulette" style={{ opacity: wheelOpacity, scale: wheelScale }}><div className="noir-roulette-pointer" /><motion.div className="noir-rotor" style={{ rotate: spin }}>{Array.from({ length: 24 }, (_, i) => <span key={i} style={{ rotate: `${i * 15}deg` }}><b>{[0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1][i]}</b></span>)}<i /></motion.div><div className="noir-roulette-center">LN<small>ROULETTE</small></div></motion.div><motion.div className="noir-cards" style={{ opacity: cardsOpacity }}>{Array.from({ length: 5 }, (_, index) => <PlayingCard key={index} index={index} progress={progress} />)}</motion.div><motion.div className="noir-reels" style={{ opacity: reelsOpacity }}>{[0, 1, 2].map(i => <SlotReel key={i} index={i} progress={progress} />)}</motion.div><div className="noir-table-inscription">{["FAITES VOS JEUX", "THE ART OF THE HAND", "THREE MODES. ONE WORLD."][phase]}</div></div><div className="noir-ledger"><span>0{phase + 1} / 03</span><strong>{["Roulette", "Blackjack", "Slots"][phase]}</strong><span>SIMULATOR<br />KEIN ECHTGELD</span></div><Footer left="STATE → ACTION → RESPONSE" right="LOCAL SESSION" /></div>;
}

function GradesInstrument({ progress }: Props) {
  const phase = usePhase(progress);
  const [next, setNext] = useState(5);
  const path = useTransform(progress, [.32, .85], [0, 1]);
  const pointX = useTransform(progress, [.33, .85], [140, 450]);
  const pointY = useTransform(progress, [.33, .85], [210, 83]);
  const goal = useTransform(progress, [.63, .75], [0, 1]);
  useMotionValueEvent(progress, "change", value => setNext(5 + Math.min(1, Math.max(0, (value - .33) / .5))));
  const average = phase === 0 ? 19.5 / 4 : (19.5 + next) / 5;
  return <div className={`project-instrument visual-grades visual-phase-${phase}`} aria-hidden="true"><Chrome name="SWISS GRADE ENGINE" meta="CH / 1.0—6.0" /><div className="grade-composition"><div className="grade-primary"><span>{phase ? "SIMULIERTER Ø" : "GEWICHTETER Ø"}</span><strong>{average.toFixed(2)}<small>/6</small></strong><span>{phase ? `NÄCHSTE PRÜFUNG ${next.toFixed(1)} × 1` : "19.5 GEWICHTETE PUNKTE / 4"}</span></div><div className="grade-plot"><svg viewBox="0 0 520 300"><g className="grade-grid-lines">{[60, 120, 180, 240].map(y => <path key={y} d={`M40 ${y} H490`} />)}{[40, 140, 240, 340, 440].map(x => <path key={x} d={`M${x} 30 V260`} />)}</g><path className="grade-baseline" d="M40 220 L140 210" /><motion.path className="grade-curve-area" d="M140 210 C230 210 250 156 310 145 S385 95 450 83 L450 260 L140 260Z" style={{ opacity: path }} /><motion.path className="grade-curve" d="M140 210 C230 210 250 156 310 145 S385 95 450 83" style={{ pathLength: path }} /><motion.g style={{ opacity: goal }}><path className="grade-goal-line" d="M40 83 H490" /><text x="355" y="69">ZIEL / PLANUNG</text></motion.g><motion.circle className="grade-plot-point" r="6" cx={pointX} cy={pointY} /><text x="9" y="65">6.0</text><text x="9" y="185">4.0</text><text x="40" y="286">IST</text><text x="390" y="286">SZENARIO →</text></svg></div></div><div className="grade-input-strip">{[["MATHE", "4.5", "×2"], ["DEUTSCH", "5.0", "×1"], ["PROJEKT", "5.5", "×1"]].map(row => <div key={row[0]}><span>{row[0]}</span><strong>{row[1]}</strong><small>{row[2]}</small></div>)}</div><Footer left="BEISPIELDATEN / KURVE SCHEMATISCH" right={phase === 2 ? "LERNPLAN → ICS" : "SIMULATE → UNDERSTAND"} /></div>;
}

function GameInstrument({ progress }: Props) {
  const phase = usePhase(progress);
  const x = useTransform(progress, [0, .28, .48, .64, .85, 1], ["7%", "30%", "44%", "59%", "79%", "87%"]);
  const y = useTransform(progress, [0, .28, .48, .64, .85, 1], ["65%", "25%", "62%", "35%", "47%", "42%"]);
  const path = useTransform(progress, [0, .9], [0, 1]);
  const boss = useTransform(progress, [.7, 1], [1, .15]);
  return <div className={`project-instrument visual-game visual-phase-${phase}`} aria-hidden="true"><Chrome name="SHOOTERBALL" meta="CANVAS / BROWSER ENGINE" /><div className="kinetic-arena"><div className="arena-perspective"><div className="arena-grid" /></div><svg className="arena-trajectory" viewBox="0 0 500 320" preserveAspectRatio="none"><motion.path d="M35 208 L150 80 L220 198 L295 112 L395 150 L435 134" style={{ pathLength: path }} /></svg>{[0, 1, 2].map(i => <div key={i} className={`arena-gate arena-gate-${i}`}><span /><i /><small>0{i + 1}</small></div>)}<motion.div className="arena-orb" style={{ left: x, top: y }}><i /><span className="arena-orb-trail" />{Array.from({ length: 8 }, (_, i) => <span key={i} className="arena-spark" style={{ "--spark-angle": `${i * 45}deg`, animationDelay: `${i * .12}s` } as React.CSSProperties} />)}</motion.div><motion.div className="arena-core" style={{ opacity: boss }}><span /><b>CORE</b><i /></motion.div><div className="arena-hud"><span>{["CAMPAIGN / 01—05", "IMPACT / FEEDBACK", "BOSS / ENDLESS"][phase]}</span><span>SCROLL-DRIVEN DEMO</span></div></div><div className="arena-meter">{["PARTICLES", "SCREEN SHAKE", "SLOW MOTION"].map((name, i) => <div key={name} className={phase === i ? "is-active" : ""}><span>{name}</span><i /></div>)}</div><Footer left="INPUT → LOOP → FRAME" right="100% CLIENTSIDE" /></div>;
}

const players = [[12, 45], [28, 20], [31, 73], [46, 44], [62, 23], [67, 64], [84, 45]];
function SportsInstrument({ progress }: Props) {
  const phase = usePhase(progress);
  const path = useTransform(progress, [.12, .78], [0, 1]);
  const x = useTransform(progress, [.12, .32, .52, .78], ["15%", "46%", "65%", "92%"]);
  const y = useTransform(progress, [.12, .32, .52, .78], ["47%", "45%", "26%", "47%"]);
  return <div className={`project-instrument visual-sport visual-phase-${phase}`} aria-hidden="true"><Chrome name="FC BRUGG / MATCH OBSERVATORY" meta="ILLUSTRATIVER SPIELZUG" /><div className="match-scoreboard"><span>FCB</span><div><AnimatePresence mode="popLayout"><motion.strong key={phase === 2 ? "goal" : "start"} initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ duration: .5 }}>{phase === 2 ? "1" : "0"}</motion.strong></AnimatePresence><i>:</i><strong>0</strong></div><span>GAST</span></div><div className="match-pitch"><div className="match-pitch-lines"><i /><i /><i /><i /></div><svg viewBox="0 0 500 260" preserveAspectRatio="none"><motion.path d="M75 122 L230 117 L325 68 L460 122" style={{ pathLength: path }} /></svg>{players.map(([left, top], i) => <span className={`match-player match-player-${i}`} key={i} style={{ left: `${left}%`, top: `${top}%` }}>{i + 1}</span>)}<motion.span className="match-ball" style={{ left: x, top: y }} /><span className="match-goal-reveal">TOR / DATEN WERDEN LESBAR</span></div><div className="match-event"><span>{["01 / MANNSCHAFT", "02 / SPIEL", "03 / TOR"][phase]}</span><strong>{["Das Team im Blick.", "Den Verlauf verstehen.", "Das Ergebnis zuerst."][phase]}</strong></div><Footer left="1. MANNSCHAFT / JUNIOREN B1" right="SCHEMATISCHE MATCH-DATEN" /></div>;
}

function OsWindow({ progress, index, children }: Props & { index: number; children: React.ReactNode }) {
  const x = useTransform(progress, [0, .25 + index * .12, .85], [index % 2 ? 100 : -100, 0, index === 2 ? -15 : 0]);
  const y = useTransform(progress, [0, .25 + index * .12, .85], [70 + index * 30, 0, index === 2 ? -10 : 0]);
  const rotateY = useTransform(progress, [0, .4], [index % 2 ? -25 : 25, 0]);
  const opacity = useTransform(progress, [index * .1, .2 + index * .1], [0, 1]);
  return <motion.div className={`desktop-window desktop-window-${index}`} style={{ x, y, rotateY, opacity }}>{children}</motion.div>;
}
function OsInstrument({ progress }: Props) {
  const phase = usePhase(progress);
  const [count, setCount] = useState(0);
  useMotionValueEvent(progress, "change", value => setCount(Math.min(35, Math.floor(value * 48))));
  return <div className={`project-instrument visual-desktop visual-phase-${phase}`} aria-hidden="true"><Chrome name="PORTFOLIO OS" meta="DESKTOP / BROWSER EDITION" /><div className="desktop-workspace"><div className="desktop-wallpaper">OS<span>EXPERIMENT / 07</span></div><OsWindow progress={progress} index={0}><div className="desktop-titlebar"><span>EXPLORER</span><Minus size={10} /><X size={10} /></div><div className="desktop-files">{["Projects", "About", "Notes"].map((name, i) => <span key={name}><i>{["↗", "◈", "≡"][i]}</i>{name}</span>)}</div></OsWindow><OsWindow progress={progress} index={1}><div className="desktop-titlebar"><span>COMMAND PALETTE</span><kbd>⌘ K</kbd></div><div className="desktop-command"><span>⌕</span> Open a project…</div><div className="desktop-command-result"><span>↗</span> Portfolio OS <Check size={12} /></div></OsWindow><OsWindow progress={progress} index={2}><div className="desktop-titlebar"><Terminal size={11} /><span>TERMINAL</span><span>●</span></div><code><span>linhard@portfolio:~</span><br />$ {"open --creative-mode --ready".slice(0, count)}<i /></code></OsWindow><div className="desktop-dock">{["↗", "⌘", ">_", "≡"].map((icon, i) => <span key={icon} className={phase === i % 3 ? "is-focused" : ""}>{icon}</span>)}</div></div><Footer left="WINDOWS / FOCUS / STATE" right="VANILLA JAVASCRIPT" /></div>;
}

export function ProjectInstrument({ index, progress }: Props & { index: number }) {
  const props = { progress };
  return <div className="visual-shell">{index === 0 ? <EncryptionInstrument {...props} /> : index === 1 ? <CityInstrument {...props} /> : index === 2 ? <CasinoInstrument {...props} /> : index === 3 ? <GradesInstrument {...props} /> : index === 4 ? <GameInstrument {...props} /> : index === 5 ? <SportsInstrument {...props} /> : index === 7 ? <SignalInstrument {...props} /> : <OsInstrument {...props} />}</div>;
}
