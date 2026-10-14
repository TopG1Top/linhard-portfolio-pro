"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Download } from "lucide-react";
import { useRef } from "react";
import { projects, type Project } from "@/lib/projects";
import { site } from "@/lib/site";
import { CyberVault } from "@/components/cyber-vault";
import { ScrollSequence } from "@/components/scroll-sequence";

const projectNarratives: Record<string, { eyebrow: string; statement: string; detail: string }> = {
  "Calc — Private Vault": { eyebrow: "Privacy architecture", statement: "Privatsphäre beginnt nicht in den Einstellungen.", detail: "Sie beginnt in der Architektur. Ein Rechner, ein verschlüsselter Vault und kein Weg über fremde Server." },
  "CityPulse Control Room": { eyebrow: "Live intelligence", statement: "Viele Signale. Eine ruhige Entscheidungsebene.", detail: "Wetter, Luftqualität, Karte und lokale Daten werden zu einem klaren Lagebild verdichtet." },
  "Casino LUXE NOIR": { eyebrow: "Interaction system", statement: "Eine digitale Welt braucht eine eigene Haltung.", detail: "Drei Spielmodi, konsistente Session-Logik und ein Interface, bei dem jede Reaktion bewusst gestaltet ist." },
  "Noten-Optimizer Pro (CH)": { eyebrow: "Decision tool", statement: "Aus einer Zahl wird ein konkreter nächster Schritt.", detail: "Schweizer Notenlogik, Simulation, Lernplanung und Kalenderexport in einem verständlichen Arbeitsfluss." },
  "ULTRAKRASS – Shooterball (HTML5)": { eyebrow: "Browser engineering", statement: "Performance ist erst gut, wenn man sie spürt.", detail: "Game-Loops, Partikel, Boss-System und präzises Feedback – vollständig clientseitig im Browser." },
  "FC Brugg – AFV Ergebnisse & Torschützen": { eyebrow: "Sports data", statement: "Information funktioniert, wenn sie sofort lesbar ist.", detail: "Resultate und Torschützen für Mannschaft, Staff und Fans – ohne Umwege auf einen Screen gebracht." },
  "Portfolio OS": { eyebrow: "Creative frontend", statement: "Ein Portfolio kann selbst zum Produkt werden.", detail: "Fenster-Manager, Dock, Terminal und Notizen bilden ein interaktives Mini-Betriebssystem im Browser." },
};

const featured = [
  "Calc — Private Vault", "CityPulse Control Room", "Casino LUXE NOIR", "Noten-Optimizer Pro (CH)",
  "ULTRAKRASS – Shooterball (HTML5)", "FC Brugg – AFV Ergebnisse & Torschützen", "Portfolio OS",
].map((title) => projects.find((project) => project.title === title)!).filter(Boolean);

const philosophy = [
  { label: "Klarheit", title: "Komplexität darf bleiben. Verwirrung nicht.", body: "Gute digitale Produkte zeigen nicht, wie viel Technik in ihnen steckt. Sie geben Menschen Sicherheit im nächsten Schritt — ruhig, präzise und ohne Reibung.", signal: "CLARITY" },
  { label: "Architektur", title: "Vertrauen entsteht unter der Oberfläche.", body: "Ein Interface ist nur so stark wie das System dahinter. Datenfluss, Performance, Privatsphäre und Zustände denke ich von Anfang an mit.", signal: "STRUCTURE" },
  { label: "Wirkung", title: "Jedes Detail muss etwas verändern.", body: "Bewegung gibt Orientierung. Gestaltung schafft Hierarchie. Code macht die Idee belastbar. Erst im Zusammenspiel wird daraus ein Produkt mit Substanz.", signal: "IMPACT" },
];

const principles = [
  { label: "Verstehen", title: "Erst das Problem. Dann der Pixel.", body: "Ziel, Nutzer und Risiko werden geklärt, bevor eine Oberfläche entsteht. Der richtige Start spart nicht Zeit — er verhindert die falsche Richtung.", signal: "DISCOVER" },
  { label: "Verdichten", title: "Alles Überflüssige wird zur Störung.", body: "Daten, Funktionen und Inhalte reduziere ich auf das, was eine Entscheidung wirklich braucht. Weniger Oberfläche. Mehr Orientierung.", signal: "REDUCE" },
  { label: "Konstruieren", title: "Design und Engineering sprechen dieselbe Sprache.", body: "Interface, Code und Bewegung folgen einem gemeinsamen System. Jede Reaktion hat einen Zweck, jeder Zustand eine klare Antwort.", signal: "BUILD" },
  { label: "Ausliefern", title: "Fertig ist erst, was draussen besteht.", body: "Responsive Zustände, Performance, Zugänglichkeit und Deployment sind Teil der Gestaltung — nicht der letzte Punkt einer Checkliste.", signal: "SHIP" },
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.22 }} transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function ProjectChapter({ project, index }: { project: Project; index: number }) {
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.06]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const imageReveal = useTransform(scrollYProgress, [0, .22, .75, 1], ["inset(14% 9%)", "inset(0% 0%)", "inset(0% 0%)", "inset(10% 7%)"]);
  const copyY = useTransform(scrollYProgress, [0.16, 0.48, 0.82], [70, 0, -40]);
  const copyOpacity = useTransform(scrollYProgress, [0.12, 0.32, 0.72, 0.9], [0, 1, 1, 0]);
  const lineScale = useTransform(scrollYProgress, [0.16, 0.58], [0, 1]);
  const orbitRotate = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const signalScale = useTransform(scrollYProgress, [0.12, .84], [0, 1]);
  const narrative = projectNarratives[project.title];
  const href = project.demo || project.github;

  return (
    <section ref={section} className="lux-case" aria-labelledby={`case-${index}`}>
      <div className="lux-case-sticky">
        <motion.div className="lux-case-media" style={{ scale: imageScale, y: imageY, clipPath: imageReveal }}><img src={project.image.src} alt={project.image.alt} decoding="async" /></motion.div>
        <div className="lux-case-shade" />
        <motion.div className="lux-case-target" style={{ rotate: orbitRotate }} aria-hidden="true"><span /><span /><span /><span /></motion.div>
        <div className="lux-case-data" aria-hidden="true"><span>SYS / {String(index + 1).padStart(2, "0")}</span><span>{narrative.eyebrow}</span><span>ACTIVE</span></div>
        <div className="lux-case-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div>
        <motion.div className="lux-case-copy" style={{ y: copyY, opacity: copyOpacity }}>
          <p className="lux-label"><span />{narrative.eyebrow}</p>
          <h2 id={`case-${index}`}>{narrative.statement}</h2>
          <p className="lux-case-detail">{narrative.detail}</p>
          <div className="lux-case-facts">{project.highlights.map((item) => <span key={item}>{item}</span>)}</div>
          {href ? <a className="lux-link" href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>Projekt ansehen <ArrowUpRight aria-hidden="true" /></a> : <span className="lux-link lux-link-muted">{project.status}</span>}
        </motion.div>
        <motion.div className="lux-case-rule" style={{ scaleX: lineScale }} aria-hidden="true" />
        <motion.div className="lux-case-signal" style={{ scaleX: signalScale }} aria-hidden="true" />
        <div className="lux-case-meta" aria-hidden="true"><span>{project.category}</span><span>{project.year}</span></div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const hero = useRef<HTMLElement>(null);
  const { scrollYProgress: pageProgress } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({ target: hero, offset: ["start start", "end start"] });
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.09]);
  const heroCopyY = useTransform(heroProgress, [0, 1], [0, -90]);
  const heroCopyOpacity = useTransform(heroProgress, [0, 0.72], [1, 0]);

  return (
    <div className="lux-site">
      <motion.div className="lux-progress" style={{ scaleX: pageProgress }} aria-hidden="true" />

      <section ref={hero} className="lux-hero" aria-labelledby="hero-title">
        <div className="lux-hero-sticky">
          <motion.div className="lux-hero-media" style={{ scale: heroScale }}><img src="/linhard-monolith-hero.png" alt="Gläserner Monolith in einer dunklen architektonischen Umgebung" /></motion.div>
          <div className="lux-hero-shade" />
          <motion.div className="lux-hero-copy" style={{ y: heroCopyY, opacity: heroCopyOpacity }}>
            <motion.p className="lux-label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.35 }}><span />Linhard Zejneli · Schweiz</motion.p>
            <h1 id="hero-title"><span className="lux-title-line"><motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.05, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>Digitale Produkte.</motion.span></span><span className="lux-title-line"><motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.05, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}>Präzise gebaut.</motion.span></span></h1>
            <motion.div className="lux-hero-bottom" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.85 }}>
              <p>Ich verbinde Engineering, Daten und Interface-Design zu Systemen, die verständlich funktionieren und dauerhaft bestehen.</p>
              <a href="#selected">Arbeiten ansehen <ArrowDownRight aria-hidden="true" /></a>
            </motion.div>
          </motion.div>
          <div className="lux-hero-status"><span>Applikationsentwicklung</span><span>EFZ · Berufsmaturität</span><span>Verfügbar für neue Projekte</span></div>
        </div>
      </section>

      <ScrollSequence id="haltung" eyebrow="Haltung" chapters={philosophy} image="/linhard-data-observatory.png" endnote="IDEA / SYSTEM / EXPERIENCE" />

      <section id="selected" className="lux-selected" aria-labelledby="selected-title"><Reveal className="lux-selected-heading"><p className="lux-label"><span />Ausgewählte Arbeiten · 2025—2026</p><h2 id="selected-title">Sieben Systeme.<br /><em>Sieben klare Aufgaben.</em></h2><p>Vom verschlüsselten Local-first-Vault über Live-Daten bis zum Browser-Game. Jedes Projekt beginnt bei einem echten Problem und endet in einer funktionierenden Anwendung.</p></Reveal></section>
      <div className="lux-cases">{featured.map((project, index) => <ProjectChapter project={project} index={index} key={project.title} />)}</div>
      <CyberVault />

      <section className="lux-index" aria-labelledby="index-title">
        <Reveal className="lux-index-heading"><p className="lux-label"><span />Projektindex</p><h2 id="index-title">Arbeiten im Überblick.</h2></Reveal>
        <div className="lux-index-list">{featured.map((project, index) => { const href = project.demo || project.github; const content = <><span>{String(index + 1).padStart(2, "0")}</span><strong>{project.title}</strong><em>{project.category}</em><i>{project.year}</i><ArrowUpRight aria-hidden="true" /></>; return href ? <a key={project.title} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>{content}</a> : <div key={project.title}>{content}</div>; })}</div>
      </section>

      <ScrollSequence id="arbeitsweise" eyebrow="Arbeitsweise" chapters={principles} endnote="METHOD / 04 PHASES" />

      <section className="lux-profile" aria-labelledby="profile-title">
        <div className="lux-profile-image"><img src="/linhard-finale-object.png" alt="Präzises Objekt aus poliertem Metall und optischem Glas" /></div><div className="lux-profile-shade" />
        <Reveal className="lux-profile-copy"><p className="lux-label"><span />Profil</p><h2 id="profile-title">Technik mit Klarheit.<br /><em>Ehrgeiz mit Substanz.</em></h2><div className="lux-profile-text"><p>Ich bin {site.name}, Applikationsentwickler in Ausbildung mit Berufsmaturität Wirtschaft. Frontend, Backend und Datenbanken verbinde ich zu einem sauberen Ganzen.</p><p>Leistungsfussball und Captain-Erfahrung prägen meine Arbeitsweise: Verantwortung übernehmen, unter Druck ruhig bleiben und konsequent bis zum Ende liefern.</p></div><div className="lux-profile-links"><a className="lux-link" href="/about">Profil lesen <ArrowRight aria-hidden="true" /></a><a className="lux-link" href={site.cvUrl} target="_blank" rel="noreferrer">CV öffnen <Download aria-hidden="true" /></a></div></Reveal>
      </section>

      <footer className="lux-contact" aria-labelledby="contact-title"><div className="lux-contact-top"><p className="lux-label"><span />Nächster Schritt</p><span>Zug · Schweiz</span></div><h2 id="contact-title">Lassen Sie uns etwas bauen, das Bestand hat.</h2><a className="lux-contact-mail" href={`mailto:${site.email}`}><span>{site.email}</span><ArrowUpRight aria-hidden="true" /></a><div className="lux-contact-bottom"><span>© 2026 Linhard Zejneli</span><div><a href={site.github} target="_blank" rel="noreferrer">GitHub</a><a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={site.cvUrl} target="_blank" rel="noreferrer">Curriculum Vitae</a></div></div></footer>
    </div>
  );
}
