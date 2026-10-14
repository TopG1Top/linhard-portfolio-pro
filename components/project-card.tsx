"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, LockKeyhole } from "lucide-react";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function ProjectCard({ p, featured = false, className }: { p: Project; featured?: boolean; className?: string }) {
  const href = p.demo || p.github;
  return (
    <motion.article className={cn("project-tile", p.placeholder && "project-tile-locked", featured && "project-tile-featured", className)} initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .9, ease: [.22, 1, .36, 1] }}>
      <div className="project-tile-media">
        {!p.placeholder && <img src={p.image.src} alt={p.image.alt} loading="lazy" />}
        <div className="project-tile-grid" aria-hidden="true" />
        <div className="project-tile-orbit" aria-hidden="true"><span /><span /></div>
        {p.placeholder && <LockKeyhole className="project-tile-lock" aria-hidden="true" />}
        <div className="project-tile-media-meta"><span>{p.category}</span><span>{p.year}</span></div>
      </div>
      <div className="project-tile-body">
        <div className="project-tile-kicker"><span>{p.placeholder ? "RESTRICTED / R&D" : "SELECTED SYSTEM"}</span><span>{p.status || "BUILD / LIVE"}</span></div>
        <h2>{p.title}</h2>
        <p className="project-tile-impact">{p.impact}</p>
        <p className="project-tile-blurb">{p.blurb}</p>
        <div className="project-tile-features">{p.highlights.map((item) => <span key={item}>{item}</span>)}</div>
        <div className="project-tile-bottom"><div>{p.tech.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>{href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} aria-label={`${p.title} öffnen`}><ArrowUpRight aria-hidden="true" /></a> : <LockKeyhole aria-label="Nicht öffentlich" />}</div>
      </div>
    </motion.article>
  );
}
