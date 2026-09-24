"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Download } from "lucide-react";
import { useRef } from "react";
import { site } from "@/lib/site";
import { projects, type Project } from "@/lib/projects";

const intro = "Engineering, Daten und Interface-Design werden zu Produkten, die klar funktionieren und sich präzise anfühlen.";

const stories = [
  {
    project: projects.find((project) => project.title === "Calc — Private Vault")!,
    mode: "obsidian",
    chapter: "Privacy architecture",
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
    reverse: true,
  },
  {
    project: projects.find((project) => project.title === "Casino LUXE NOIR")!,
    mode: "noir",
    chapter: "Interaction design",
    headline: "Interaktion braucht Haltung.",
    text: "Roulette, Blackjack und Slots in einer zusammenhängenden Dark-Luxury-Welt. Animation, Session-Logik und Game-Feel folgen derselben Idee: Jede Reaktion muss sich absichtlich anfühlen.",
    action: "Experience starten",
  },
  {
    project: projects.find((project) => project.title === "Noten-Optimizer Pro (CH)")!,
    mode: "paper",
    chapter: "Decision systems",
    headline: "Aus einer Zahl wird ein nächster Schritt.",
    text: "Durchschnitt, Simulation und Lernplan greifen ineinander. Das Tool übersetzt Schweizer Notenlogik in konkrete Entscheidungen — bis zum Kalender-Export.",
    action: "Repository öffnen",
    reverse: true,
  },
  {
    project: projects.find((project) => project.title === "ULTRAKRASS – Shooterball (HTML5)")!,
    mode: "arcade",
    chapter: "Game feel",
    headline: "Performance muss man fühlen.",
    text: "Fünf Level, Boss-Kampf, Endless-Modus und ein reaktives Effektsystem. Ein Canvas-Experiment darüber, wie Timing, Feedback und Geschwindigkeit ein Spiel tragen.",
    action: "Code ansehen",
  },
] as const;

const archiveProjects = [
  projects.find((project) => project.title === "FC Brugg – AFV Ergebnisse & Torschützen")!,
  projects.find((project) => project.title === "Portfolio OS")!,
];

function ProjectScene({ project, mode, chapter, headline, text, action, reverse = false, index }: {
  project: Project;
  mode: string;
  chapter: string;
  headline: string;
  text: string;
  action: string;
  reverse?: boolean;
  index: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 0.5, 1], [150, 0, -120]);
  const imageScale = useTransform(scrollYProgress, [0, 0.48, 1], [0.82, 1, 0.9]);
  const imageRotate = useTransform(scrollYProgress, [0, 0.5, 1], [reverse ? -7 : 7, 0, reverse ? 5 : -5]);
  const copyY = useTransform(scrollYProgress, [0.18, 0.5, 0.82], [70, 0, -45]);
  const copyOpacity = useTransform(scrollYProgress, [0.17, 0.38, 0.77, 0.92], [0, 1, 1, 0]);
  const scanY = useTransform(scrollYProgress, [0.22, 0.76], ["-12%", "112%"]);
  const orbitScale = useTransform(scrollYProgress, [0.12, 0.8], [0.72, 1.18]);
  const href = project.demo || project.github;

  return (
    <section ref={sectionRef} className={`work-scene work-scene--${mode} ${reverse ? "work-scene--reverse" : ""}`}>
      <div className="work-sticky">
        <motion.div className="scene-orbit" style={{ scale: orbitScale }} aria-hidden="true" />
        <div className="scene-counter" aria-hidden="true"><span>0{index + 1}</span><i /><span>05</span></div>
        <motion.div className="project-visual" style={{ y: imageY, scale: imageScale, rotateY: imageRotate }}>
          <div className="project-depth project-depth--back" aria-hidden="true" />
          <div className="project-depth project-depth--mid" aria-hidden="true" />
          <div className="project-frame">
            <img src={project.image.src} alt={project.image.alt} />
            <motion.i className="project-scan" style={{ y: scanY }} aria-hidden="true" />
          </div>
          <div className="project-visual-caption" aria-hidden="true"><span>{project.category}</span><span>{project.year}</span></div>
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
          ) : <span className="scene-link scene-link--quiet">{project.status}</span>}
        </motion.div>
      </div>
    </section>
  );
}

function ObservatoryScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.18]);
  const imageX = useTransform(scrollYProgress, [0, 1], ["0%", "-4%"]);
  const signalX = useTransform(scrollYProgress, [0.05, 0.88], ["-8%", "105%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.12, 0.73, 0.9], [0, 1, 1, 0]);
  const stepOne = useTransform(scrollYProgress, [0.08, 0.2, 0.34], [0.25, 1, 0.35]);
  const stepTwo = useTransform(scrollYProgress, [0.3, 0.48, 0.63], [0.25, 1, 0.35]);
  const stepThree = useTransform(scrollYProgress, [0.58, 0.76, 0.92], [0.25, 1, 0.35]);

  return (
    <section ref={sectionRef} className="observatory" aria-labelledby="method-title">
      <div className="observatory-sticky">
        <motion.img className="observatory-image" src="/linhard-data-observatory.png" alt="Architektonischer Datenraum aus Glas, Licht und Metall" style={{ scale: imageScale, x: imageX }} />
        <div className="observatory-shade" />
        <motion.div className="observatory-copy" style={{ opacity: titleOpacity }}>
          <p className="scene-chapter">Arbeitsweise / 03 Phasen</p>
          <h2 id="method-title">Vom Signal<br />zum System.</h2>
          <p>Ich beginne nicht mit Effekten, sondern mit der Frage, was ein Produkt wirklich leisten muss. Erst dann werden Struktur, Code und Bewegung sichtbar.</p>
        </motion.div>
        <div className="signal-track" aria-hidden="true"><motion.i style={{ x: signalX }} /></div>
        <div className="method-steps" aria-label="Arbeitsprozess">
          <motion.div style={{ opacity: stepOne }}><span>01</span><strong>Verstehen</strong><p>Nutzer, Ziel und Risiko präzise lesen.</p></motion.div>
          <motion.div style={{ opacity: stepTwo }}><span>02</span><strong>Verdichten</strong><p>Flow, Daten und Architektur zu einem System verbinden.</p></motion.div>
          <motion.div style={{ opacity: stepThree }}><span>03</span><strong>Ausliefern</strong><p>Testen, schärfen und zuverlässig online bringen.</p></motion.div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const bridgeRef = useRef<HTMLElement>(null);
  const { scrollYProgress: pageProgress } = useScroll();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const { scrollYProgress: bridgeProgress } = useScroll({ target: bridgeRef, offset: ["start end", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.24]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "13%"]);
  const copyX = useTransform(scrollYProgress, [0, 0.72], ["0%", "-20%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.58], [1, 0]);
  const veilOpacity = useTransform(scrollYProgress, [0, 0.86, 1], [0.05, 0.56, 0.82]);
  const bridgeTextY = useTransform(bridgeProgress, [0.12, 0.54], [90, 0]);
  const bridgeTextOpacity = useTransform(bridgeProgress, [0.12, 0.42], [0, 1]);

  return (
    <div className="portfolio-stage">
      <motion.div className="page-progress" style={{ scaleX: pageProgress }} aria-hidden="true" />
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
            <p className="hero-kicker">Digital Product Engineering · Schweiz</p>
            <motion.h1 id="hero-title" initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }} transition={{ duration: 1.25, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}>
              Ich baue digitale<span>Systeme, die bleiben.</span>
            </motion.h1>
            <div className="hero-intro">
              <p aria-label={intro}>
                {intro.split(" ").map((word, index) => <motion.span key={`${word}-${index}`} initial={{ opacity: 0.12 }} animate={{ opacity: 1 }} transition={{ duration: 0.42, delay: 1.05 + index * 0.045 }} aria-hidden="true">{word} </motion.span>)}
              </p>
              <a href="#work" className="round-link" aria-label="Zu den ausgewählten Projekten"><ArrowDownRight aria-hidden="true" /></a>
            </div>
          </motion.div>
          <div className="hero-side-note" aria-hidden="true"><span>Scroll to inspect</span><i /></div>
          <div className="hero-signature" aria-hidden="true"><span>LZ</span><i /><span>Portfolio · 2026</span></div>
        </div>
      </section>

      <section ref={bridgeRef} id="work" className="opening-scene">
        <div className="bridge-geometry" aria-hidden="true"><span>07</span><i /><i /><i /></div>
        <motion.div className="opening-copy" style={{ y: bridgeTextY, opacity: bridgeTextOpacity }}>
          <div className="opening-line" />
          <p className="opening-overline">Ausgewählte Systeme · 2025—2026</p>
          <h2>Kein Schaufenster.<span>Ein Blick in die Maschine.</span></h2>
          <p className="opening-note">Sieben reale Builds. Fünf davon erzählen ihre Geschichte hier in Bewegung — vom privaten Vault bis zum Browser-Game.</p>
          <a href="#privacy" className="text-link">Geschichte beginnen <ArrowDownRight aria-hidden="true" /></a>
        </motion.div>
      </section>

      <div id="privacy">{stories.map((story, index) => <ProjectScene key={story.project.title} {...story} index={index} />)}</div>

      <ObservatoryScene />

      <section className="archive-scene" aria-labelledby="archive-title">
        <div className="archive-heading">
          <div><p className="scene-chapter">Project archive / 02</p><h2 id="archive-title">Zwei weitere<br />Systeme im Feld.</h2></div>
          <p>Nicht jedes Projekt braucht dieselbe Bühne. Aber jedes braucht eine klare Aufgabe, belastbare Technik und eine Oberfläche, die sofort Orientierung gibt.</p>
        </div>
        <div className="archive-runway">
          {archiveProjects.map((project, index) => {
            const href = project.demo || project.github;
            return (
              <article className="archive-project" key={project.title}>
                <div className="archive-image"><img src={project.image.src} alt={project.image.alt} /><div /></div>
                <div className="archive-index" aria-hidden="true">0{index + 6}</div>
                <div className="archive-copy">
                  <div><p>{project.category} · {project.year}</p><h3>{project.title}</h3></div>
                  <p>{project.impact}</p>
                  {href && <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} aria-label={`${project.title} öffnen`}><ArrowUpRight /></a>}
                </div>
                <div className="archive-tech">{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="experience-scene" aria-labelledby="experience-title">
        <div className="experience-intro">
          <p className="scene-chapter">Entwicklung / 2021—heute</p>
          <h2 id="experience-title">Lernen.<br />Anwenden.<br /><span>Ausliefern.</span></h2>
        </div>
        <div className="experience-line">
          <article><time>2021</time><h3>Erste eigene Builds</h3><p>Web-Apps, Dashboards und Experimente werden vom Konzept bis zum Deployment selbst gebaut.</p></article>
          <article><time>2023</time><h3>EFZ + Berufsmaturität</h3><p>Applikationsentwicklung trifft Wirtschaft: OOP, Datenbanken, Netzwerke und moderne Webentwicklung.</p></article>
          <article><time>Heute</time><h3>Sieben Systeme. Ein Standard.</h3><p>Privacy, Daten, Game-Loops und Product UX — dokumentiert, testbar und online erlebbar.</p></article>
        </div>
        <div className="experience-statement"><span>7</span><p>realisierte Projekte<br />zwischen Code und Produkt</p></div>
      </section>

      <section className="profile-scene" aria-labelledby="profile-title">
        <div className="profile-grid">
          <div><p className="scene-chapter">Profil / Linhard Zejneli</p><h2 id="profile-title">Technik mit Klarheit. Ehrgeiz mit Substanz.</h2></div>
          <div className="profile-story">
            <p>Ich bin {site.name}, Applikationsentwickler in Ausbildung mit Berufsmaturität Wirtschaft. Frontend, Backend und Datenbanken verbinde ich zu einem sauberen Ganzen.</p>
            <p>Leistungsfussball und Captain-Erfahrung prägen meine Arbeitsweise: Verantwortung übernehmen, unter Druck ruhig bleiben und konsequent bis zum Ende liefern.</p>
            <div className="profile-links"><a href="/about" className="scene-link">Mehr über mich <ArrowRight aria-hidden="true" /></a><a href={site.cvUrl} target="_blank" rel="noreferrer" className="scene-link">CV öffnen <Download aria-hidden="true" /></a></div>
          </div>
        </div>
        <div className="profile-principles">
          <div><span>01</span><strong>Build before buzz</strong><p>Ideen werden früh zu funktionierenden Prototypen.</p></div>
          <div><span>02</span><strong>Details schaffen Vertrauen</strong><p>Performance, Datenschutz und responsive Zustände gehören zum Produkt.</p></div>
          <div><span>03</span><strong>Komplexität wird Klarheit</strong><p>Technik wird in verständliche Entscheidungen übersetzt.</p></div>
        </div>
        <div className="stack-rail" aria-label="Technologien"><div>React · Next.js · TypeScript · Python · SQL · Node.js · Web Crypto · IndexedDB · Docker · Product UX · React · Next.js · TypeScript · Python · SQL · Node.js · Web Crypto · IndexedDB · Docker · Product UX ·</div></div>
      </section>

      <footer className="finale" aria-labelledby="finale-title">
        <img src="/linhard-finale-object.png" alt="Polierte Chromkugel in einem präzisen Ring aus optischem Glas" className="finale-image" />
        <div className="finale-shade" />
        <div className="finale-content">
          <p className="scene-chapter">Nächster Build / Gemeinsam</p>
          <h2 id="finale-title">Eine gute Idee verdient eine präzise Umsetzung.</h2>
          <p className="finale-lead">Wenn das nächste Produkt klar, schnell und unverwechselbar werden soll, beginnt die Zusammenarbeit hier.</p>
          <a className="finale-mail" href={`mailto:${site.email}`}>{site.email}<ArrowUpRight aria-hidden="true" /></a>
        </div>
        <div className="finale-meta">
          <span>Schweiz · Verfügbar für neue Projekte</span>
          <div><a href={site.github} target="_blank" rel="noreferrer">GitHub</a><a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={site.cvUrl} target="_blank" rel="noreferrer">CV</a></div>
        </div>
      </footer>
    </div>
  );
}
