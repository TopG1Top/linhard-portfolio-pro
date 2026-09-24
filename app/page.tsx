"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Download } from "lucide-react";
import { useRef } from "react";
import { site } from "@/lib/site";
import { projects, type Project } from "@/lib/projects";

const intro = "Engineering, Daten und Interface-Design werden zu Produkten, die klar funktionieren und sich präzise anfühlen.";

const stories = [
  {
    project: projects.find((project) => project.title === "Calc — Private Vault")!,
    mode: "obsidian",
    chapter: "Privacy",
    headline: "Was privat ist, bleibt privat.",
    text: "Eine Local-first PWA mit doppelter Identität: alltäglich ein präziser Rechner, dahinter ein verschlüsselter Medien-Vault — ohne Cloud und ohne Recovery-Backdoor.",
    action: "Konzept ansehen",
  },
  {
    project: projects.find((project) => project.title === "CityPulse Control Room")!,
    mode: "ice",
    chapter: "Data clarity",
    headline: "Komplexe Signale. Eine klare Lage.",
    text: "Wetter, Luftqualität, Karte und lokale Signale werden nicht bloss gesammelt. CityPulse übersetzt sie in eine ruhige, sofort lesbare Entscheidungsebene.",
    action: "Live-System öffnen",
  },
  {
    project: projects.find((project) => project.title === "Casino LUXE NOIR")!,
    mode: "noir",
    chapter: "Interaction",
    headline: "Interaktion braucht Haltung.",
    text: "Roulette, Blackjack und Slots in einer zusammenhängenden Dark-Luxury-Welt. Animation, Session-Logik und Game-Feel folgen derselben Idee: Jede Reaktion muss sich absichtlich anfühlen.",
    action: "Experience starten",
  },
] as const;

function ProjectScene({
  project,
  mode,
  chapter,
  headline,
  text,
  action,
}: {
  project: Project;
  mode: string;
  chapter: string;
  headline: string;
  text: string;
  action: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 0.5, 1], [150, 0, -120]);
  const imageScale = useTransform(scrollYProgress, [0, 0.48, 1], [0.82, 1, 0.9]);
  const imageRotate = useTransform(scrollYProgress, [0, 0.5, 1], [7, 0, -5]);
  const copyY = useTransform(scrollYProgress, [0.18, 0.5, 0.82], [70, 0, -45]);
  const copyOpacity = useTransform(scrollYProgress, [0.17, 0.38, 0.77, 0.92], [0, 1, 1, 0]);
  const scanY = useTransform(scrollYProgress, [0.22, 0.76], ["-12%", "112%"]);
  const href = project.demo || project.github;

  return (
    <section ref={sectionRef} className={`work-scene work-scene--${mode}`}>
      <div className="work-sticky">
        <div className="scene-orbit" aria-hidden="true" />
        <motion.div className="project-visual" style={{ y: imageY, scale: imageScale, rotateY: imageRotate }}>
          <div className="project-depth project-depth--back" aria-hidden="true" />
          <div className="project-depth project-depth--mid" aria-hidden="true" />
          <div className="project-frame">
            <img src={project.image.src} alt={project.image.alt} />
            <motion.i className="project-scan" style={{ y: scanY }} aria-hidden="true" />
          </div>
        </motion.div>

        <motion.div className="project-copy" style={{ y: copyY, opacity: copyOpacity }}>
          <p className="scene-chapter">{chapter}</p>
          <h2>{headline}</h2>
          <p className="scene-description">{text}</p>
          <div className="project-proof" aria-label="Technische Schwerpunkte">
            {project.highlights.map((highlight) => <span key={highlight}>{highlight}</span>)}
          </div>
          {href ? (
            <a className="scene-link" href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
              {action} <ArrowUpRight aria-hidden="true" />
            </a>
          ) : (
            <span className="scene-link scene-link--quiet">{project.status}</span>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const bridgeRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const { scrollYProgress: bridgeProgress } = useScroll({
    target: bridgeRef,
    offset: ["start end", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.24]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "13%"]);
  const copyX = useTransform(scrollYProgress, [0, 0.72], ["0%", "-20%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.58], [1, 0]);
  const veilOpacity = useTransform(scrollYProgress, [0, 0.86, 1], [0.05, 0.56, 0.82]);
  const bridgeImageY = useTransform(bridgeProgress, [0, 1], ["-20%", "18%"]);
  const bridgeTextY = useTransform(bridgeProgress, [0.12, 0.54], [90, 0]);
  const bridgeTextOpacity = useTransform(bridgeProgress, [0.12, 0.42], [0, 1]);

  return (
    <div className="portfolio-stage">
      <motion.div className="entry-shutter" initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 1.15, delay: 0.55, ease: [0.65, 0, 0.35, 1] }} aria-hidden="true">
        <motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, ease: "easeInOut" }} />
      </motion.div>

      <section ref={heroRef} className="hero-sequence" aria-labelledby="hero-title">
        <div className="hero-sticky">
          <motion.div className="hero-image-wrap" style={{ scale: imageScale, y: imageY }}>
            <img src="/linhard-monolith-hero.png" alt="Gläserner Monolith in einem dunklen architektonischen Raum" className="hero-image" />
          </motion.div>
          <div className="hero-shade" />
          <motion.div className="hero-veil" style={{ opacity: veilOpacity }} />

          <motion.div className="hero-copy" style={{ x: copyX, opacity: copyOpacity }}>
            <motion.h1 id="hero-title" initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }} transition={{ duration: 1.25, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}>
              Ich baue digitale
              <span>Systeme, die bleiben.</span>
            </motion.h1>
            <div className="hero-intro">
              <p aria-label={intro}>
                {intro.split(" ").map((word, index) => (
                  <motion.span key={`${word}-${index}`} initial={{ opacity: 0.12 }} animate={{ opacity: 1 }} transition={{ duration: 0.42, delay: 1.05 + index * 0.045 }} aria-hidden="true">{word} </motion.span>
                ))}
              </p>
              <a href="#work" className="round-link" aria-label="Zu den ausgewählten Projekten"><ArrowDownRight aria-hidden="true" /></a>
            </div>
          </motion.div>

          <div className="hero-signature" aria-hidden="true"><span>LZ</span><i /><span>Portfolio · 2026</span></div>
        </div>
      </section>

      <section ref={bridgeRef} id="work" className="opening-scene">
        <motion.div className="bridge-image" style={{ y: bridgeImageY }} aria-hidden="true">
          <img src="/linhard-monolith-hero.png" alt="" />
        </motion.div>
        <motion.div className="opening-copy" style={{ y: bridgeTextY, opacity: bridgeTextOpacity }}>
          <div className="opening-line" />
          <p className="opening-overline">Ausgewählte Systeme</p>
          <h2>Kein Schaufenster.<span>Ein Blick in die Maschine.</span></h2>
          <a href="#privacy" className="text-link">Geschichte beginnen <ArrowDownRight aria-hidden="true" /></a>
        </motion.div>
      </section>

      <div id="privacy">
        {stories.map((story) => <ProjectScene key={story.project.title} {...story} />)}
      </div>

      <section className="method-scene" aria-labelledby="method-title">
        <div className="method-visual" aria-hidden="true">
          <div className="method-screen method-screen--back"><img src="/projects/noten-optimizer-pro.svg" alt="" /></div>
          <div className="method-screen method-screen--middle"><img src="/projects/shooterball.svg" alt="" /></div>
          <div className="method-screen method-screen--front"><img src="/projects/portfolio-os.svg" alt="" /></div>
        </div>
        <div className="method-copy">
          <p className="scene-chapter">Arbeitsweise</p>
          <h2 id="method-title">Richtung vor Geschwindigkeit.</h2>
          <p>Ich entwickle vom Nutzen nach innen: zuerst der Flow, dann die Architektur, danach die Bewegung. So wird aus einer Idee ein Produkt statt nur eine Oberfläche.</p>
          <div className="method-sequence" aria-label="Vorgehen">
            <span>Verstehen</span><i /><span>Verdichten</span><i /><span>Ausliefern</span>
          </div>
        </div>
      </section>

      <section className="profile-scene" aria-labelledby="profile-title">
        <div className="profile-grid">
          <div>
            <p className="scene-chapter">Profil</p>
            <h2 id="profile-title">Technik mit Klarheit. Ehrgeiz mit Substanz.</h2>
          </div>
          <div className="profile-story">
            <p>Ich bin {site.name}, Applikationsentwickler in Ausbildung mit Berufsmaturität Wirtschaft. Frontend, Backend und Datenbanken verbinde ich zu einem sauberen Ganzen.</p>
            <p>Leistungsfussball und Captain-Erfahrung prägen meine Arbeitsweise: Verantwortung übernehmen, unter Druck ruhig bleiben und konsequent bis zum Ende liefern.</p>
            <a href={site.cvUrl} target="_blank" rel="noreferrer" className="scene-link">CV öffnen <Download aria-hidden="true" /></a>
          </div>
        </div>
        <div className="stack-rail" aria-label="Technologien">
          <div>React · Next.js · TypeScript · Python · SQL · Node.js · Web Crypto · IndexedDB · Docker · Product UX · React · Next.js · TypeScript · Python · SQL · Node.js · Web Crypto · IndexedDB · Docker · Product UX ·</div>
        </div>
      </section>

      <footer className="finale" aria-labelledby="finale-title">
        <div className="finale-symbol" aria-hidden="true"><span>L</span><span>Z</span></div>
        <p className="scene-chapter">Nächster Build</p>
        <h2 id="finale-title">Eine gute Idee verdient eine präzise Umsetzung.</h2>
        <a className="finale-mail" href={`mailto:${site.email}`}>{site.email}<ArrowUpRight aria-hidden="true" /></a>
        <div className="finale-meta">
          <span>Schweiz · Verfügbar für neue Projekte</span>
          <div><a href={site.github} target="_blank" rel="noreferrer">GitHub</a><a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={site.cvUrl} target="_blank" rel="noreferrer">CV</a></div>
        </div>
      </footer>
    </div>
  );
}
