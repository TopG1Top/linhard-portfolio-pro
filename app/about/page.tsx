"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Download } from "lucide-react";
import { Typewriter } from "@/components/kinetic-text";
import { site } from "@/lib/site";

const principles = [
  { number: "01", title: "Verstehen", signal: "CONTEXT / PURPOSE", body: "Ich beginne nicht beim Effekt. Ich kläre Ziel, Nutzer und Risiko — damit die richtige Frage vor dem ersten Pixel steht." },
  { number: "02", title: "Verbinden", signal: "INTERFACE / LOGIC / DATA", body: "Oberfläche, Logik und Daten gehören zusammen. Eine gute Idee wird erst stark, wenn sie als ganzes System funktioniert." },
  { number: "03", title: "Verantworten", signal: "TEST / REFINE / DELIVER", body: "Qualität zeigt sich ausserhalb der Demo: in verständlichen Zuständen, sauberem Code und dem Willen, Details zu Ende zu denken." },
];

export default function AboutPage() {
  return <div className="about-cinematic">
    <section className="about-cinematic-hero" aria-labelledby="about-cinematic-title">
      <div className="about-cinematic-image"><img src="/linhard-finale-object.png" alt="" /></div>
      <div className="about-cinematic-grid" aria-hidden="true" />
      <div className="about-cinematic-top"><span>LINHARD ZEJNELI / PROFIL</span><span>APPLIKATIONSENTWICKLUNG · SCHWEIZ</span><span>01 / 03</span></div>
      <div className="about-cinematic-orbit" aria-hidden="true"><span /><i /><b /></div>
      <div className="about-cinematic-main">
        <motion.p className="lux-label" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}><span />DER MENSCH HINTER DEN SYSTEMEN</motion.p>
        <motion.h1 id="about-cinematic-title" initial={{ opacity: 0, y: 55, filter: "blur(12px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1, delay: .15, ease: [.22, 1, .36, 1] }}>Klar denken.<br /><em>Konsequent bauen.</em></motion.h1>
        <motion.div className="about-cinematic-intro" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .45 }}><p>Ich bin Linhard Zejneli. Mich faszinieren digitale Produkte, die komplexe Technik in einen klaren nächsten Schritt übersetzen.</p><a href="#about-story">Meine Geschichte <ArrowDownRight aria-hidden="true" /></a></motion.div>
      </div>
      <div className="about-cinematic-bottom"><span>ENGINEERING × DISCIPLINE</span><span>SCROLLEN / ENTDECKEN</span></div>
    </section>

    <section className="about-story" id="about-story" aria-labelledby="about-story-title">
      <div className="about-story-head"><span className="lux-label"><span />01 / WER ICH BIN</span><span>PERSON / PRACTICE / PRINCIPLE</span></div>
      <div className="about-story-layout">
        <motion.div className="about-story-statement" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .9, ease: [.22, 1, .36, 1] }}><h2 id="about-story-title">Ich baue lieber etwas, das bleibt, als etwas, das nur kurz beeindruckt.</h2><div className="about-story-signal" aria-hidden="true"><i /><span>DENKEN → BAUEN → VERBESSERN</span></div></motion.div>
        <div className="about-story-details"><motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .75 }}>Als Applikationsentwickler in Ausbildung mit Berufsmaturität Wirtschaft arbeite ich an Web-Apps, Datenwerkzeugen und Interfaces — vom Konzept bis zum funktionierenden Produkt.</motion.p><motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .75, delay: .12 }}>Leistungsfussball und Captain-Erfahrung haben meine Arbeitsweise geprägt: ruhig bleiben, Verantwortung übernehmen und mit dem Team auch dann eine Lösung finden, wenn es anspruchsvoll wird.</motion.p><div className="about-story-facts"><div><span>01 / AUSBILDUNG</span><strong>EFZ Applikationsentwicklung<br />BM Wirtschaft</strong></div><div><span>02 / FOKUS</span><strong>Web-Apps · Daten · UX<br />Privacy-aware Systeme</strong></div><div><span>03 / HALTUNG</span><strong>Verstehen · Bauen<br />Verantworten</strong></div></div></div>
      </div>
    </section>

    <section className="about-protocol" aria-labelledby="about-protocol-title"><div className="about-protocol-heading"><span className="lux-label"><span />02 / MEIN PROTOKOLL</span><h2 id="about-protocol-title">Drei Schritte.<br /><em>Ein Anspruch.</em></h2><p>Gute Produkte entstehen nicht zufällig. Sie werden durch klare Entscheidungen, verlässliches Handwerk und konsequente Weiterentwicklung gebaut.</p></div><div className="about-protocol-list">{principles.map((item, index) => <motion.article key={item.number} initial={{ opacity: 0, x: 70, filter: "blur(8px)" }} whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }} viewport={{ once: true, amount: .45 }} transition={{ duration: .75, delay: index * .12, ease: [.22, 1, .36, 1] }}><div className="about-protocol-index"><span>{item.number}</span><span>{item.signal}</span></div><div className="about-protocol-content"><h3>{item.title}</h3><p>{item.body}</p></div><div className="about-protocol-trace" aria-hidden="true"><span /></div></motion.article>)}</div></section>

    <section className="about-cinematic-end"><div className="about-cinematic-end-scan" aria-hidden="true"><span /><span /><span /></div><span className="lux-label"><span />03 / NÄCHSTER SCHRITT</span><h2>Die beste Idee<br />ist die, <em>die wir bauen.</em></h2><div className="about-cinematic-typed"><Typewriter text="Klarheit ist kein Zufall. Sie ist eine Entscheidung." delay={250} /></div><div className="about-cinematic-actions"><a href={`mailto:${site.email}`}>Kontakt aufnehmen <ArrowUpRight aria-hidden="true" /></a><a href={site.cvUrl} target="_blank" rel="noreferrer">CV öffnen <Download aria-hidden="true" /></a></div></section>
  </div>;
}
