"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Fingerprint, ShieldCheck, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/logo-mark";

const stages = [
  { title: "Umgebung erfassen", detail: "Sicherer Browserkontext / lokale Zufallssequenz" },
  { title: "Signatur berechnen", detail: "SHA-256 / flüchtiger Wert nur für diesen Aufruf" },
  { title: "Erlebnis öffnen", detail: "Initialisierung abgeschlossen / keine Speicherung" },
];

export function EntryVerification() {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<"pending" | "ready" | "limited">("pending");
  const [digest, setDigest] = useState("");
  const [nonce, setNonce] = useState("");
  const [open, setOpen] = useState(true);
  const skipRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let active = true;
    let closing: ReturnType<typeof setTimeout>;
    const runCheck = async () => {
      try {
        if (!window.isSecureContext || !window.crypto?.subtle) throw new Error("Web Crypto unavailable");
        const challenge = window.crypto.getRandomValues(new Uint8Array(16));
        const hash = await window.crypto.subtle.digest("SHA-256", challenge);
        const hex = (bytes: Uint8Array) => Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("").toUpperCase();
        if (active) { setNonce(hex(challenge)); setDigest(hex(new Uint8Array(hash))); setResult("ready"); }
      } catch { if (active) setResult("limited"); }
    };
    void runCheck();
    const total = reduced ? 600 : 3700;
    const started = performance.now();
    const interval = window.setInterval(() => {
      const next = Math.min(100, Math.round(((performance.now() - started) / total) * 100));
      setProgress(next);
      if (next >= 100) { window.clearInterval(interval); closing = setTimeout(() => { if (active) setOpen(false); }, reduced ? 80 : 320); }
    }, reduced ? 50 : 40);
    return () => { active = false; window.clearInterval(interval); clearTimeout(closing); };
  }, [reduced]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    const focused = document.activeElement as HTMLElement | null;
    const roots = Array.from(document.querySelectorAll<HTMLElement>(".site-header, main"));
    const prior = roots.map(el => el.inert);
    roots.forEach(el => { el.inert = true; });
    document.body.style.overflow = "hidden";
    skipRef.current?.focus({ preventScroll: true });
    const skip = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab") { event.preventDefault(); skipRef.current?.focus(); }
    };
    window.addEventListener("keydown", skip);
    return () => { document.body.style.overflow = previous; roots.forEach((el,i) => { el.inert = prior[i]; }); window.removeEventListener("keydown", skip); focused?.focus({ preventScroll: true }); };
  }, [open]);

  const stage = Math.min(2, Math.floor(progress / 34));
  const shown = Math.round(Math.min(1, Math.max(0,(progress-20)/50))*64);
  return <AnimatePresence>{open && <motion.div className={`entry-verification entry-v3 entry-stage-${stage}`} role="dialog" aria-modal="true" aria-label="Lokaler Systemcheck" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? .05 : .5 }}>
    <div className="entry-noise" aria-hidden="true" />
    <div className="entry-top"><span><LogoMark /> LINHARD ZEJNELI / SECURE EXPERIENCE</span><span>INITIALISIERUNG / {String(progress).padStart(3,"0")}%</span></div>
    <div className="entry-body">
      <div className="entry-visual" aria-hidden="true">
        <svg className="entry-circuit" viewBox="0 0 400 400" fill="none"><path className="entry-circuit-base" d="M30 100H100V150H160M370 100H300V150H240M30 300H100V250H160M370 300H300V250H240"/><motion.path d="M30 100H100V150H160M370 100H300V150H240M30 300H100V250H160M370 300H300V250H240" animate={{pathLength:progress/100}} transition={{duration:.1}}/>{[[30,100],[370,100],[30,300],[370,300]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="4"/>)}</svg>
        <div className="entry-calibration"><span>INPUT / LOCAL</span><span>SHA-256 / BROWSER</span></div>
        <div className="entry-hash-field">{Array.from({length:8},(_,i)=><span key={i} className={shown>i*8?"is-decoded":""}>{digest?digest.slice(i*8,i*8+8).slice(0,Math.max(0,shown-i*8)).padEnd(8,"·"):"········"}</span>)}</div>
        <div className="entry-fingerprint"><Fingerprint strokeWidth={.65} /><motion.i style={{top:`${(progress*2)%100}%`}}/><div className="entry-identity-stamp"><LogoMark/></div></div>
        <div className="entry-scan-ruler">{Array.from({length:24},(_,i)=><i key={i} className={progress>i/24*100?"is-lit":""}/>)}</div>
        <div className="entry-challenge"><span>CHALLENGE / EPHEMERAL</span><code>{nonce||"INITIALISING LOCAL CRYPTO"}</code></div>
        <span className="entry-corner entry-corner-tl"/><span className="entry-corner entry-corner-tr"/><span className="entry-corner entry-corner-bl"/><span className="entry-corner entry-corner-br"/>
      </div>
      <div className="entry-copy"><p className="lux-label"><span/>PRÄZISION / VOM ERSTEN MOMENT</p><h2>Jedes Detail<br/> hat eine Identität</h2><p className="entry-description">Ein neuer Aufruf erzeugt einen neuen lokalen Hash. Keine Registrierung, keine biometrische Erfassung und keine Übertragung der Prüfdaten.</p><div className="entry-current"><span>0{stage+1} / 03</span><strong>{stages[stage].title}</strong><p>{stages[stage].detail}</p></div><div className="entry-progress"><motion.div style={{scaleX:progress/100}}/></div><div className="entry-steps">{stages.map((s,i)=><span key={s.title} className={i<=stage?"is-active":""}>0{i+1} {s.title}</span>)}</div></div>
    </div>
    <div className="entry-bottom"><span><ShieldCheck aria-hidden="true"/>{result==="limited"?"BASISMODUS / SEITE BLEIBT NUTZBAR":result==="ready"?"LOKALER SHA-256-TEST ERFOLGREICH":"LOKALER TEST LÄUFT"}</span><span>VISUELLE STARTSEQUENZ / KEINE IDENTITÄTSPRÜFUNG</span><button ref={skipRef} type="button" onClick={()=>setOpen(false)} aria-label="Startsequenz überspringen">Überspringen <X aria-hidden="true"/></button></div>
  </motion.div>}</AnimatePresence>;
}
