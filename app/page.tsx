"use client";

import { motion, useScroll } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { featuredProjects as featured, projects, showcaseEntries } from "@/lib/projects";
import { site } from "@/lib/site";
import { CyberVault } from "@/components/cyber-vault";
import { ScrollSequence } from "@/components/scroll-sequence";
import { WordReveal } from "@/components/kinetic-text";
import { ProfileSequence } from "@/components/profile-sequence";
import { CinematicHero } from "@/components/cinematic-hero";
import { ProjectExperience } from "@/components/project-experience";
import { LogoMark } from "@/components/logo-mark";
import { PrivateDossier } from "@/components/private-projects";
import { BuildSequence } from "@/components/build-sequence";

const privateProjects = projects.filter(project => project.placeholder);
const number = (value: number) => String(value).padStart(2, "0");
const philosophy = [
  { label: "Klarheit", title: "Komplexität darf bleiben. Verwirrung nicht.", body: "Gute digitale Produkte zeigen nicht, wie viel Technik in ihnen steckt. Sie geben Menschen Sicherheit im nächsten Schritt, ruhig, präzise und ohne Reibung.", signal: "CLARITY" },
  { label: "Architektur", title: "Vertrauen entsteht unter der Oberfläche.", body: "Ein Interface ist nur so stark wie das System dahinter. Datenfluss, Performance, Privatsphäre und Zustände denke ich von Anfang an mit.", signal: "STRUCTURE" },
  { label: "Wirkung", title: "Jedes Detail muss etwas verändern.", body: "Bewegung gibt Orientierung. Gestaltung schafft Hierarchie. Code macht die Idee belastbar. Erst im Zusammenspiel wird daraus ein Produkt mit Substanz.", signal: "IMPACT" },
];

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const [preview, setPreview] = useState(0);
  const previewEntry = showcaseEntries[preview];
  const privatePreview = previewEntry.kind !== "project";
  return <div className="lux-site experience-v2">
    <motion.div className="lux-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
    <CinematicHero />
    <ScrollSequence id="haltung" eyebrow="Haltung" chapters={philosophy} image="/linhard-data-observatory.png" endnote="IDEA / SYSTEM / EXPERIENCE" />
    <section id="selected" className="work-prelude" aria-labelledby="selected-title">
      <div className="work-prelude-kicker"><p className="lux-label"><span />Ausgewählte Arbeiten · 2025 / 2026</p><span>SCROLL-DRIVEN CASE STUDIES</span></div>
      <WordReveal id="selected-title" text="Keine Schablone Acht eigene Welten" />
      <div className="work-prelude-bottom">
        <div className="work-prelude-count"><strong>{number(featured.length)}</strong><span>PROJEKTE<br />+ {privateProjects.length} PRIVATE KONZEPTSTUDIEN<br />+ CYBERSECURITY DOSSIER</span></div>
        <p>Privatsphäre. Globale Ereignisse. Spielmechanik. Jedes Projekt hat seine eigene Aufgabe und verdient eine eigene Geschichte. Entdecke, was unter der Oberfläche steckt.</p>
        <a href="#project-1" aria-label="Zum ersten Projekt"><ArrowDownRight /></a>
      </div>
      <div className="work-prelude-strip" aria-label="Projekte direkt auswählen">
        {showcaseEntries.map((entry, i) => <a href={`#${entry.anchor}`} key={entry.title} className={entry.title === "SIGNAL" ? "work-link-signal" : undefined}><span>{number(i + 1)}{entry.title === "SIGNAL" && <small>NEU</small>}</span>{entry.label}</a>)}
      </div>
    </section>
    <div className="lux-cases">{showcaseEntries.map((entry, index) => entry.kind === "project"
      ? <ProjectExperience key={entry.title} project={entry.project!} index={entry.index} position={index + 1} total={showcaseEntries.length} />
      : entry.kind === "private"
        ? <PrivateDossier key={entry.title} index={entry.index} position={index + 1} />
        : <CyberVault key={entry.title} position={index + 1} />)}</div>
    <section className="lux-index experience-index" aria-labelledby="index-title">
      <div className="lux-index-heading"><p className="lux-label"><span />Projektindex / Direktzugriff</p><WordReveal id="index-title" text="Von der Idee in die Anwendung." /></div>
      <div className="experience-index-layout">
        <div className="index-image-preview" aria-hidden="true">
          {showcaseEntries.map((entry, i) => entry.kind === "project" ? <img key={entry.title} src={entry.project!.image.src} alt="" loading="lazy" className={preview === i ? "is-active" : ""} /> : null)}
          <div className={`index-private-preview ${privatePreview ? "is-active" : ""}`}><LogoMark /><p>{previewEntry.title}</p><small>{previewEntry.kind === "cybersecurity" ? "DOSSIER / PERSÖNLICHE FREIGABE" : "PROJEKTKONZEPT / EINBLICK AUF ANFRAGE"}</small></div>
          <span>SELECTED WORK / {number(preview + 1)}</span>
        </div>
        <div className="lux-index-list">
          {showcaseEntries.map((entry, index) => {
            const href = entry.kind === "project" ? entry.project!.demo || entry.project!.github || `#${entry.anchor}` : `#${entry.anchor}`;
            return <a key={entry.title} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} onMouseEnter={() => setPreview(index)} onFocus={() => setPreview(index)}><span>{number(index + 1)}</span><strong>{entry.title}</strong><ArrowUpRight aria-hidden="true" /></a>;
          })}
        </div>
      </div>
    </section>
    <BuildSequence />
    <ProfileSequence />
    <footer className="lux-contact experience-contact" aria-labelledby="contact-title">
      <div className="lux-contact-top"><p className="lux-label"><span />Die nächste gute Idee beginnt im Gespräch.</p><span>Schweiz</span></div>
      <WordReveal id="contact-title" text="Etwas Gutes entsteht nicht von allein." />
      <div className="contact-invitation"><p>Eine Idee mit technischen Fragen? Ein Interface, das mehr Klarheit braucht? Lass uns herausfinden, was daraus werden kann.</p><span>OFFEN FÜR AUSTAUSCH & NEUE PROJEKTE <i /></span></div>
      <a className="lux-contact-mail" href={`mailto:${site.email}`}><span>{site.email}</span><ArrowUpRight aria-hidden="true" /></a>
      <div className="lux-contact-bottom"><span>© 2026 Linhard Zejneli / Mit Haltung gebaut.</span><div><a href={site.github} target="_blank" rel="noreferrer">GitHub</a><a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={site.cvUrl} target="_blank" rel="noreferrer">Curriculum Vitae</a></div></div>
    </footer>
  </div>;
}
