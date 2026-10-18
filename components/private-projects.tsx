"use client";

import { motion, useInView, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight, Fingerprint, LockKeyhole } from "lucide-react";
import { useRef, useState } from "react";
import { site } from "@/lib/site";

const dossiers = [
  { name: "AEGIS Security Lab", category: "CYBERSECURITY / KALI LINUX", chapters: [
    { title: "Sicherheit beginnt mit den richtigen Fragen", text: "Ein Konzept für ein abgeschottetes Security-Lab auf Basis von Kali Linux. Im Mittelpunkt stehen eigene Testsysteme, ein klar definierter Prüfbereich und nachvollziehbare Sicherheitsanalysen.", label: "Scope definieren", notes: ["Isolierte Laborumgebung", "Nur autorisierte Testsysteme", "Reproduzierbare Prüfabläufe"] },
    { title: "Nicht nur finden sondern verstehen", text: "Von der sichtbaren Angriffsfläche bis zur Einordnung eines Befunds. Netzwerkübersicht, Konfiguration und Risikobewertung werden als zusammenhängender Prüfprozess gedacht. Die Visualisierung zeigt eine schematische Analyse, keinen Live-Scan.", label: "Signale einordnen", notes: ["Inventar & Netzwerkstruktur", "Befunde mit Kontext", "Priorisierung nach Risiko"] },
    { title: "Das Entscheidende bleibt im persönlichen Gespräch", text: "Prüfabläufe und technische Details gehören nicht in eine öffentliche Demo. Bei Interesse besprechen wir den Ansatz, die Grenzen des Labs und die vorgesehenen nächsten Schritte persönlich.", label: "Einblick anfragen", notes: ["Keine öffentliche Demo", "Keine Testzugänge im Browser", "Details im direkten Austausch"] },
  ] },
  { name: "NEXUS Application Platform", category: "APP DEVELOPMENT / FULL STACK", chapters: [
    { title: "Eine Anwendung die als System gedacht ist", text: "Ein gross angelegtes Full-Stack-Produktkonzept für zusammenhängende Arbeitsabläufe. Vom App-Frontend über die Geschäftslogik bis zur Datenhaltung: Jede Ebene hat einen klaren Auftrag und definierte Schnittstellen.", label: "Architektur öffnen", notes: ["App & Web als Zugänge", "Modulare Geschäftslogik", "Konsistente Datenmodelle"] },
    { title: "Eine Anfrage verbindet die ganze Architektur", text: "Die Darstellung verfolgt eine beispielhafte Anfrage: Eingabe prüfen, Berechtigung auswerten, Aktion verarbeiten und das Ergebnis zurückgeben. Auch Fehler, Wiederholungen und Hintergrundaufgaben gehören in dieses Konzept.", label: "Datenfluss verfolgen", notes: ["Identität & Berechtigungen", "API & Hintergrundaufgaben", "Nachvollziehbare Zustände"] },
    { title: "Substanz zeigt sich unter der Oberfläche", text: "Die geplante Plattform wird hier als Architekturstudie vorgestellt. Keine öffentliche Demo, kein offenes Repository. Über Funktionsumfang, technische Entscheidungen und mögliche Einblicke sprechen wir direkt.", label: "System besprechen", notes: ["Umfangreiches Produktkonzept", "Architektur statt Codezeilen-Metrik", "Vorstellung auf Anfrage"] },
  ] },
];

function LabVisual({ progress, act }: { progress: MotionValue<number>; act: number }) {
  const scan = useTransform(progress, [0, 1], ["8%", "92%"]);
  const trace = useTransform(progress, [.05, .65], [0, 1]);
  return <div className={`lab-visual lab-act-${act}`}>
    <svg className="lab-network" viewBox="0 0 600 420" fill="none">
      <path className="lab-perimeter" d="M155 45H445L555 210 445 375H155L45 210Z" />
      <path className="lab-wire" d="M300 210 150 105M300 210 450 105M300 210 150 315M300 210 450 315M150 105H450M150 315H450" />
      <motion.path className="lab-trace" d="M150 315L300 210 450 105H150L300 210 450 315H150" style={{ pathLength: trace }} />
      {[[150,105],[450,105],[150,315],[450,315]].map(([x,y],i)=><g key={i} className={`lab-node lab-node-${i}`}><rect x={x-26} y={y-26} width="52" height="52" rx="4" /><path d={`M${x-9} ${y-7}h18v14h-18zM${x-5} ${y+11}h10`} /><text x={x} y={y+47}>{["HOST 01","GATEWAY","WORKLOAD","AUDIT"][i]}</text></g>)}
      <rect className="lab-core" x="257" y="167" width="86" height="86" rx="9" /><text className="lab-core-label" x="300" y="207">KALI</text><text x="300" y="228">LAB / LOCAL</text>
      <circle className="lab-isolation" cx="300" cy="210" r="65" />
    </svg>
    <motion.div className="lab-scan" style={{ left: scan }} />
    <div className="lab-findings"><span>{["BOUNDARY / DEFINED","ANALYSIS / ILLUSTRATIVE","DISCLOSURE / PRIVATE"][act]}</span><div>{["SCOPE", "CONTEXT", "REVIEW"].map((name,i)=><span key={name} className={i<=act?"is-ready":""}><i />{name}</span>)}</div></div>
  </div>;
}

function StackVisual({ progress, act }: { progress: MotionValue<number>; act: number }) {
  const reduced = useReducedMotion();
  const packetY = useTransform(progress, [0,.2,.4,.6,.8,1], ["9%","9%","37%","66%","66%","9%"]);
  return <div className={`nexus-visual nexus-act-${act}`}><div className="nexus-bus"><motion.i style={{ top: packetY }} /></div>
    {[{ name:"EXPERIENCE", detail:"APP / WEB", code:"interface.request()" },{name:"APPLICATION",detail:"API / DOMAIN",code:"authorize → validate → execute"},{name:"PERSISTENCE",detail:"DATA / EVENTS",code:"commit → acknowledge"}].map((layer,i)=><motion.div className={`nexus-layer nexus-layer-${i}`} key={layer.name} initial={false} animate={{ x: act===0?i*10:0 }} transition={{duration:reduced?0:.8}}><div className="nexus-layer-index">0{i+1}</div><div><span>{layer.detail}</span><strong>{layer.name}</strong><code>{act===0?"contract defined":layer.code}</code></div><div className="nexus-memory">{Array.from({length:12},(_,j)=><i key={j} style={{animationDelay:`${i*.3+j*.09}s`}} />)}</div></motion.div>)}
    <div className="nexus-receipt"><span>{["CONTRACT / COMPOSED","REQUEST / IN TRANSIT","RESPONSE / RESOLVED"][act]}</span><b>{act===2?"ACK":"···"}</b></div>
  </div>;
}

export function PrivateDossier({ index, position }: { index: number; position: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { margin: "100px" });
  const { scrollYProgress: progress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [act, setAct] = useState(0);
  useMotionValueEvent(progress, "change", value => setAct(Math.min(2,Math.floor(value*3))));
  const data = dossiers[index];
  const scene = data.chapters[act];
  function seek(i: number) { const element = ref.current; if(element)window.scrollTo({top:window.scrollY+element.getBoundingClientRect().top+(element.offsetHeight-innerHeight)*(i/3+.12),behavior:reduced?"instant":"smooth"}); }
  return <section ref={ref} id={`private-${index+1}`} className={`private-dossier dossier-${index} ${inView?"is-inview":""}`} data-act={act} aria-labelledby={`private-title-${index}`}><div className="private-sticky">
    <header className="private-top"><span>{String(position).padStart(2, "0")} / PRIVATE COLLECTION</span><span>PROJEKTKONZEPT · EINBLICK AUF ANFRAGE</span></header>
    <div className="private-layout"><div className="private-copy"><p className="lux-label"><span />{data.category}</p><p className="private-project-name">{data.name}</p><motion.div key={act} initial={reduced?false:{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:.6}}><h2 id={`private-title-${index}`}>{scene.title}</h2><p className="private-description">{scene.text}</p><ul>{scene.notes.map(note=><li key={note}>{note}</li>)}</ul></motion.div><a className="private-request" href={`mailto:${site.email}?subject=${encodeURIComponent(`Einblick anfragen: ${data.name}`)}`}>Persönlichen Einblick anfragen <ArrowUpRight size={16} /></a></div>
    <div className="private-instrument" aria-hidden="true"><div className="private-instrument-top"><span>{index===0?"AEGIS / ISOLATED ENVIRONMENT":"NEXUS / SYSTEM BLUEPRINT"}</span><LockKeyhole size={13} /></div>{index===0?<LabVisual progress={progress} act={act}/>:<StackVisual progress={progress} act={act}/>}<div className="private-seal"><div className="private-print"><Fingerprint strokeWidth={.75}/><i /></div><div><strong>PRIVATE BY INTENT</strong><span>SCHEMATISCHE KONZEPTSTUDIE / KEIN LIVE-SYSTEM</span></div><LockKeyhole size={18}/></div></div></div>
    <nav className="private-timeline" aria-label={`${data.name} Kapitel`}>{data.chapters.map((s,i)=><button key={s.label} onClick={()=>seek(i)} aria-current={act===i?"step":undefined}><small>0{i+1}</small>{s.label}<span/></button>)}</nav><motion.div className="private-progress" style={{scaleX:progress}}/>
  </div></section>;
}
