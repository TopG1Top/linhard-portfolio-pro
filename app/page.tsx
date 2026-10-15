"use client";

import { motion, useScroll } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";
import { CyberVault } from "@/components/cyber-vault";
import { ScrollSequence } from "@/components/scroll-sequence";
import { WordReveal } from "@/components/kinetic-text";
import { ProfileSequence } from "@/components/profile-sequence";
import { CinematicHero } from "@/components/cinematic-hero";
import { ProjectExperience } from "@/components/project-experience";
import { BuildSequence } from "@/components/build-sequence";

const featured = ["Calc — Private Vault", "CityPulse Control Room", "Casino LUXE NOIR", "Noten-Optimizer Pro (CH)", "ULTRAKRASS – Shooterball (HTML5)", "FC Brugg – AFV Ergebnisse & Torschützen", "Portfolio OS"].map(title => projects.find(project => project.title === title)!).filter(Boolean);

const philosophy = [
  { label: "Klarheit", title: "Komplexität darf bleiben. Verwirrung nicht.", body: "Gute digitale Produkte zeigen nicht, wie viel Technik in ihnen steckt. Sie geben Menschen Sicherheit im nächsten Schritt — ruhig, präzise und ohne Reibung.", signal: "CLARITY" },
  { label: "Architektur", title: "Vertrauen entsteht unter der Oberfläche.", body: "Ein Interface ist nur so stark wie das System dahinter. Datenfluss, Performance, Privatsphäre und Zustände denke ich von Anfang an mit.", signal: "STRUCTURE" },
  { label: "Wirkung", title: "Jedes Detail muss etwas verändern.", body: "Bewegung gibt Orientierung. Gestaltung schafft Hierarchie. Code macht die Idee belastbar. Erst im Zusammenspiel wird daraus ein Produkt mit Substanz.", signal: "IMPACT" },
];

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const [preview, setPreview] = useState(0);
  return <div className="lux-site experience-v2"><motion.div className="lux-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
    <CinematicHero />
    <ScrollSequence id="haltung" eyebrow="Haltung" chapters={philosophy} image="/linhard-data-observatory.png" endnote="IDEA / SYSTEM / EXPERIENCE" />
    <section id="selected" className="work-prelude" aria-labelledby="selected-title"><div className="work-prelude-kicker"><p className="lux-label"><span />Ausgewählte Arbeiten · 2025—2026</p><span>SCROLL-DRIVEN CASE STUDIES</span></div><WordReveal id="selected-title" text="Keine Schablone. Sieben eigene Welten." /><div className="work-prelude-bottom"><div className="work-prelude-count"><strong>07</strong><span>PROJEKTE<br />VOM KONZEPT BIS ZUM CODE</span></div><p>Privatsphäre. Live-Daten. Spielmechanik. Jedes Projekt hat seine eigene Aufgabe — und verdient eine eigene Geschichte. Entdecke, was unter der Oberfläche steckt.</p><a href="#project-1" aria-label="Zum ersten Projekt"><ArrowDownRight /></a></div><div className="work-prelude-strip" aria-label="Projekte direkt auswählen">{featured.map((p, i) => <a href={`#project-${i + 1}`} key={p.title}><span>0{i + 1}</span>{["Private Vault", "CityPulse", "Luxe Noir", "Grade Engine", "Shooterball", "FC Brugg", "Portfolio OS"][i]}</a>)}</div></section>
    <div className="lux-cases">{featured.map((project, index) => <ProjectExperience key={project.title} project={project} index={index} />)}</div>
    <CyberVault />
    <section className="lux-index experience-index" aria-labelledby="index-title"><div className="lux-index-heading"><p className="lux-label"><span />Projektindex / Direktzugriff</p><WordReveal id="index-title" text="Von der Idee in die Anwendung." /></div><div className="experience-index-layout"><div className="index-image-preview" aria-hidden="true">{featured.map((p, i) => <img key={p.title} src={p.image.src} alt="" loading="lazy" className={preview === i ? "is-active" : ""} />)}<span>SELECTED WORK / 0{preview + 1}</span></div><div className="lux-index-list">{featured.map((project, index) => { const href = project.demo || project.github || `#project-${index + 1}`; return <a key={project.title} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} onMouseEnter={() => setPreview(index)} onFocus={() => setPreview(index)}><span>0{index + 1}</span><strong>{project.title}</strong><ArrowUpRight aria-hidden="true" /></a>; })}</div></div></section>
    <BuildSequence />
    <ProfileSequence />
    <footer className="lux-contact experience-contact" aria-labelledby="contact-title"><div className="lux-contact-top"><p className="lux-label"><span />Die nächste gute Idee beginnt im Gespräch.</p><span>Zug · Schweiz</span></div><WordReveal id="contact-title" text="Etwas Gutes entsteht nicht von allein." /><div className="contact-invitation"><p>Eine Idee mit technischen Fragen? Ein Interface, das mehr Klarheit braucht? Lass uns herausfinden, was daraus werden kann.</p><span>OFFEN FÜR AUSTAUSCH & NEUE PROJEKTE <i /></span></div><a className="lux-contact-mail" href={`mailto:${site.email}`}><span>{site.email}</span><ArrowUpRight aria-hidden="true" /></a><div className="lux-contact-bottom"><span>© 2026 Linhard Zejneli / Mit Haltung gebaut.</span><div><a href={site.github} target="_blank" rel="noreferrer">GitHub</a><a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={site.cvUrl} target="_blank" rel="noreferrer">Curriculum Vitae</a></div></div></footer>
  </div>;
}
