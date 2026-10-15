"use client";

import { AnimatePresence, motion, useInView, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { heading } from "@/lib/typography";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import type { Project } from "@/lib/projects";
import { projectScenes } from "@/lib/project-scenes";
import { ProjectInstrument } from "@/components/project-visuals";

const actNames = ["Die Idee", "Das System", "Das Ergebnis"];

function ActProgress({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const fill = useTransform(progress, [index / 3, (index + 1) / 3], [0, 1]);
  return <span className="story-timeline-track"><motion.i style={{ scaleX: fill }} /></span>;
}

export function ProjectExperience({ project, index }: { project: Project; index: number }) {
  const section = useRef<HTMLElement>(null);
  const [act, setAct] = useState(0);
  const reduced = useReducedMotion();
  const inView = useInView(section, { margin: "15% 0px 15% 0px" });
  const { scrollYProgress: progress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const visualProgress = useSpring(progress, { stiffness: 120, damping: 30, mass: .35, restDelta: .0005 });
  useMotionValueEvent(progress, "change", value => setAct(Math.min(2, Math.floor(value * 3))));
  const imageScale = useTransform(progress, [0, .33, .66, 1], [1.12, 1.04, 1.08, 1]);
  const imageX = useTransform(progress, [0, 1], [index % 2 ? "-5%" : "5%", "0%"]);
  const aperture = useTransform(progress, [0, .16, .8, 1], ["inset(10% 8% 10% 8%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(4% 2% 4% 2%)"]);
  const scene = projectScenes[index][act];
  const href = project.demo || project.github;
  function seek(next: number) {
    const node = section.current;
    if (!node) return;
    const top = window.scrollY + node.getBoundingClientRect().top;
    window.scrollTo({ top: top + (node.offsetHeight - window.innerHeight) * (next / 3 + .065), behavior: reduced ? "instant" : "smooth" });
  }
  return <section ref={section} id={`project-${index + 1}`} className={`project-story story-${index} story-act-${act} ${inView ? "story-in-view" : ""}`} aria-labelledby={`story-title-${index}`}>
    <div className="story-sticky">
      <motion.div className="story-backdrop" style={reduced ? {} : { scale: imageScale, x: imageX, clipPath: aperture }}><img src={project.image.src} alt="" loading="lazy" decoding="async" /></motion.div>
      <div className="story-vignette" /><div className="story-hairline" aria-hidden="true" />
      <header className="story-header"><a href="#selected" className="story-project-name"><span>{String(index + 1).padStart(2, "0")} / 07</span>{project.title}</a><span>{project.category} · {project.year}</span></header>
      <div className="story-body">
        <div className="story-editorial">
          <div className="story-act-label"><span>0{act + 1}</span><i /><span>{actNames[act]}</span></div>
          <div className="story-text-stage" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.article key={act} data-act={act} initial={reduced ? false : { opacity: 0, clipPath: index % 2 ? "inset(0 0 100% 0)" : "inset(0 100% 0 0)", x: index % 2 ? 0 : 18, y: index % 2 ? 16 : 0 }} animate={{ opacity: 1, clipPath: "inset(0 0% 0% 0)", x: 0, y: 0 }} exit={{ opacity: 0, transition: { duration: .16 } }} transition={{ duration: reduced ? 0 : .75, ease: [.19, 1, .22, 1] }}>
                <h2 id={`story-title-${index}`}>{heading(scene.title)}</h2><p className="story-description">{scene.body}</p>
                <div className="story-notes">{scene.notes.map((note, i) => { const [key, value] = note.split(" / "); return <motion.div key={note} initial={reduced ? false : { opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: reduced ? 0 : .1 + i * .09 }}><span>{key}</span><strong>{value}</strong></motion.div>; })}</div>
              </motion.article>
            </AnimatePresence>
          </div>
          <div className="story-actions">{href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>{project.demo ? "Live erleben" : "Code entdecken"}<ArrowUpRight size={15} /></a> : <a href="mailto:linhard79@hotmail.com?subject=Anfrage%20Calc%20Private%20Vault">Einblick anfragen<ArrowUpRight size={15} /></a>}<span>{project.tech.slice(0, 3).join(" / ")}</span></div>
        </div>
        <div className="story-visual"><span className="story-visual-caption">{["CRYPTOGRAPHIC STUDY", "SPATIAL INTELLIGENCE", "THE INTERACTION THEATRE", "A STUDY IN PROGRESSION", "KINETIC PLAYGROUND", "THE MATCH OBSERVATORY", "A DESKTOP IN THE BROWSER"][index]}</span><ProjectInstrument index={index} progress={reduced ? progress : visualProgress} /><div className="story-visual-foot"><span>INTERAKTIVE VISUALISIERUNG</span><span>SCROLL TO EXPLORE <ArrowDown size={11} /></span></div></div>
      </div>
      <nav className="story-timeline" aria-label={`Kapitel ${project.title}`}>{actNames.map((name, i) => <button key={name} onClick={() => seek(i)} aria-current={act === i ? "step" : undefined}><span>0{i + 1}</span><strong>{name}</strong><ActProgress progress={progress} index={i} /></button>)}</nav>
      <motion.div className="story-total-progress" style={{ scaleX: progress }} aria-hidden="true" />
    </div>
  </section>;
}

