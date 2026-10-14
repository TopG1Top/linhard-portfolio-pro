"use client";

import { motion, useMotionValueEvent, useTransform, type MotionValue } from "framer-motion";
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
  const line = useTransform(progress, [.12, .72], [0, 1]);
  return <div className="project-instrument project-instrument-city" aria-hidden="true"><div className="instrument-chrome"><span>URBAN SIGNALS</span><span>LIVE SYSTEM MAP</span></div><div className="city-radar"><div className="city-sweep" /><div className="city-rings" /><span className="city-node city-node-a" /><span className="city-node city-node-b" /><span className="city-node city-node-c" /><span className="city-node city-node-d" /><motion.svg viewBox="0 0 400 400"><motion.path d="M80 260 L155 110 L270 155 L330 285 L160 305 Z" fill="none" stroke="currentColor" strokeWidth="1" style={{ pathLength: line }} /></motion.svg><strong>CONTROL ROOM</strong></div><div className="instrument-footer"><span>WETTER</span><span>LUFT</span><span>KARTE</span></div></div>;
}

function CasinoInstrument({ progress }: Props) {
  const wheel = useTransform(progress, [0, 1], [0, 810]);
  const reelA = useTransform(progress, [.1, .7], ["-110%", "0%"]);
  const reelB = useTransform(progress, [.1, .78], ["-170%", "0%"]);
  const reelC = useTransform(progress, [.1, .86], ["-230%", "0%"]);
  return <div className="project-instrument project-instrument-casino" aria-hidden="true"><div className="instrument-chrome"><span>LUXE NOIR / TABLE 01</span><span>DEMO EXPERIENCE</span></div><div className="casino-stage"><motion.div className="casino-wheel" style={{ rotate: wheel }}><div className="casino-wheel-inner"><span>0</span><span>17</span><span>32</span><span>8</span></div></motion.div><span className="casino-marker" /><div className="casino-reels"><div><motion.span style={{ y: reelA }}>♠<br />7</motion.span></div><div><motion.span style={{ y: reelB }}>◆<br />7</motion.span></div><div><motion.span style={{ y: reelC }}>♣<br />7</motion.span></div></div></div><div className="instrument-footer"><span>ROULETTE</span><span>BLACKJACK</span><span>SLOTS</span></div></div>;
}

function GradesInstrument({ progress }: Props) {
  const line = useTransform(progress, [.14, .76], [0, 1]);
  const [grade, setGrade] = useState("4.2");
  useMotionValueEvent(progress, "change", (value) => setGrade((4.2 + Math.min(1, Math.max(0, (value - .15) / .6)) * 1.3).toFixed(1)));
  return <div className="project-instrument project-instrument-grades" aria-hidden="true"><div className="instrument-chrome"><span>SWISS GRADE ENGINE</span><span>TARGET / 6.0</span></div><div className="grades-chart"><div className="grades-grid" /><motion.svg viewBox="0 0 400 250"><motion.path d="M18 213 C90 195 115 200 160 155 S230 165 275 108 S340 95 390 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ pathLength: line }} /></motion.svg><div className="grades-result"><span>ZIELNOTE</span><strong>{grade}</strong><em>/ 6.0</em></div><div className="grades-marker" /></div><div className="instrument-footer"><span>SIMULATION</span><span>PLANUNG</span><span>EXPORT</span></div></div>;
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
