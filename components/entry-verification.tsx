"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Fingerprint, ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";

const stages = [
  { title: "Verbindung prüfen", detail: "Sicherer Kontext und Browserumgebung" },
  { title: "Kryptografie testen", detail: "Lokaler SHA-256-Funktionstest" },
  { title: "System freigeben", detail: "Portfolio-Erlebnis wird initialisiert" },
];

export function EntryVerification() {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<"pending" | "ready" | "limited">("pending");
  const [open, setOpen] = useState(true);

  useEffect(() => {
    let active = true;
    const runCheck = async () => {
      try {
        if (!window.isSecureContext || !window.crypto?.subtle) throw new Error("Web Crypto unavailable");
        const sample = new TextEncoder().encode("LINHARD / LOCAL BROWSER CHECK");
        await window.crypto.subtle.digest("SHA-256", sample);
        if (active) setResult("ready");
      } catch {
        if (active) setResult("limited");
      }
    };
    void runCheck();
    const total = reduced ? 700 : 3300;
    const started = performance.now();
    const interval = window.setInterval(() => {
      const next = Math.min(100, Math.round(((performance.now() - started) / total) * 100));
      setProgress(next);
      if (next >= 100) { window.clearInterval(interval); window.setTimeout(() => { if (active) setOpen(false); }, reduced ? 80 : 390); }
    }, reduced ? 50 : 35);
    return () => { active = false; window.clearInterval(interval); };
  }, [reduced]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const skip = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", skip);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", skip); };
  }, [open]);

  const stage = Math.min(2, Math.floor(progress / 34));

  return <AnimatePresence>{open && <motion.div className="entry-verification" role="dialog" aria-modal="true" aria-label="Lokaler Systemcheck" initial={{ opacity: 1 }} exit={{ opacity: 0, filter: "blur(16px)" }} transition={{ duration: reduced ? .05 : .65 }}>
    <div className="entry-noise" aria-hidden="true" />
    <div className="entry-top"><span>LINHARD ZEJNELI / SECURE EXPERIENCE</span><span>SESSION · {String(progress).padStart(3, "0")}%</span></div>
    <div className="entry-body">
      <div className="entry-visual" aria-hidden="true"><div className="entry-ring entry-ring-outer" /><div className="entry-ring entry-ring-inner" /><div className="entry-fingerprint"><Fingerprint strokeWidth={.72} /><motion.i style={{ top: `${progress}%` }} /></div><span className="entry-corner entry-corner-tl" /><span className="entry-corner entry-corner-tr" /><span className="entry-corner entry-corner-bl" /><span className="entry-corner entry-corner-br" /></div>
      <div className="entry-copy"><p className="lux-label"><span />LOKALER SYSTEMCHECK / 01</p><h2>Präzision beginnt<br />vor dem ersten Klick.</h2><p className="entry-description">Eine kontrollierte Startsequenz prüft die Browserumgebung. Keine Registrierung. Keine biometrische Erfassung. Keine Datenübertragung.</p><div className="entry-current"><span>0{stage + 1} / 03</span><strong>{stages[stage].title}</strong><p>{stages[stage].detail}</p></div><div className="entry-progress"><motion.div style={{ scaleX: progress / 100 }} /></div><div className="entry-steps">{stages.map((item, index) => <span key={item.title} className={index <= stage ? "is-active" : ""}>{String(index + 1).padStart(2, "0")} {item.title}</span>)}</div></div>
    </div>
    <div className="entry-bottom"><span><ShieldCheck aria-hidden="true" /> {result === "limited" ? "EINGESCHRÄNKTER BROWSERKONTEXT · SEITE BLEIBT NUTZBAR" : result === "ready" ? "LOKALER FUNKTIONSTEST ERFOLGREICH" : "PRÜFUNG LÄUFT"}</span><span>KEINE IDENTITÄTSPRÜFUNG</span><button type="button" onClick={() => setOpen(false)} aria-label="Startsequenz überspringen">Überspringen <X aria-hidden="true" /></button></div>
  </motion.div>}</AnimatePresence>;
}
