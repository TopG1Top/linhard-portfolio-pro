// lib/projects.ts
export type Project = {
  title: string
  blurb: string
  category: string
  year: string
  image: {
    src: string
    alt: string
  }
  impact: string
  highlights: string[]
  tech: string[]
  github?: string
  demo?: string
}

export const projects: Project[] = [
  {
    title: "Noten-Optimizer Pro (CH)",
    category: "Education Tool",
    year: "2026",
    image: {
      src: "/projects/noten-optimizer-pro.svg",
      alt: "Dashboard-Preview des Noten-Optimizer Pro mit Durchschnitt, Simulation und Lernplan.",
    },
    impact: "Macht Notenplanung konkret: Zielnote, Lernplan und Kalender-Export in einem Flow.",
    highlights: ["Was-wäre-wenn-Simulator", "Zielnote-Rechner", "ICS-Kalender-Export"],
    blurb:
      "Gewichteter Noten-Ø (Schweizer Skala 1.0–6.0), Was-wäre-wenn-Simulator, Zielnote → benötigte nächste Note je Fach sowie Lernplan-Generator inkl. ICS-Kalender-Export.",
    tech: ["Python", "Streamlit", "Pandas", "ICS", "Docker"],
    github: "https://github.com/TopG1Top/noten-optimizer-pro",
  },
  {
    title: "FC Brugg – AFV Ergebnisse & Torschützen",
    category: "Sports Dashboard",
    year: "2026",
    image: {
      src: "/projects/fcbrugg-afv.svg",
      alt: "Football-Dashboard für FC Brugg mit Resultaten, Spielfeld und Torschützen.",
    },
    impact: "Bringt Resultate und Torschützen schnell lesbar auf einen Screen für Fans und Staff.",
    highlights: ["1. Mannschaft & Junioren B1", "Resultat-Übersicht", "Fanfreundliche Darstellung"],
    blurb:
      "Kleine Streamlit-App, die die Resultate und Torschützen (1. Mannschaft & Junioren B1) übersichtlich zeigt – ideal für Fans & Staff.",
    tech: ["Python", "Streamlit"],
    github: "https://github.com/TopG1Top/fcbrugg-afv-app",
  },
  {
    title: "ULTRAKRASS – Shooterball (HTML5)",
    category: "Browser Game",
    year: "2025",
    image: {
      src: "/projects/shooterball.svg",
      alt: "Neon-Arcade-Shooterball-Szene mit Bossbar, Gegnern und Partikeleffekten.",
    },
    impact: "Zeigt Game-Feel im Browser: schnelle Loops, Effekte und saubere Canvas-Interaktion.",
    highlights: ["5-Level-Kampagne", "Boss & Endless-Modus", "Particles, Shake, Slow-Mo"],
    blurb:
      "Arcade-Shooter im Browser: 5-Level-Kampagne + Boss, Endless-Modus, Perks, Partikeleffekte, Screen-Shake/Slow-Mo, Neon-Look – 100% clientseitig.",
    tech: ["JavaScript", "HTML5 Canvas", "CSS"],
    github: "https://github.com/TopG1Top/Shooterballgame",
  },
  {
    title: "Casino LUXE NOIR",
    category: "Interactive Demo",
    year: "2025",
    image: {
      src: "/projects/casino-luxe-noir.svg",
      alt: "Premium-Casino-Interface mit Roulette, Blackjack-Karten, Chips und Session-Stats.",
    },
    impact: "Ein polished Demo-Projekt mit mehreren Spielmodi, Animationen und lokaler Session-Logik.",
    highlights: ["Roulette, Blackjack, Slots", "Lokaler Account-Bereich", "Dark-Luxury-UI"],
    blurb:
      "Premium Casino-Simulator als Demo-Projekt mit Roulette, Blackjack, Slots, animierten Table-Games, lokalem Account-Bereich, Session-Stats und edlem Dark-Luxury-UI.",
    tech: ["JavaScript", "HTML", "CSS", "Animation", "LocalStorage"],
    github: "https://github.com/TopG1Top/Casino-Luxe",
    demo: "https://casinoluxe.netlify.app/",
  },
]
