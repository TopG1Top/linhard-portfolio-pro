// lib/projects.ts
export type Project = {
  title: string
  blurb: string
  tech: string[]
  github?: string
  demo?: string
}

export const projects: Project[] = [
  {
    title: "Noten-Optimizer Pro (CH)",
    blurb:
      "Gewichteter Noten-Ø (Schweizer Skala 1.0–6.0), Was-wäre-wenn-Simulator, Zielnote → benötigte nächste Note je Fach sowie Lernplan-Generator inkl. ICS-Kalender-Export.",
    tech: ["Python", "Streamlit", "Pandas", "ICS", "Docker"],
    github: "https://github.com/TopG1Top/noten-optimizer-pro",
    // demo: "https://<dein-streamlit-link>"   // sobald du ihn deployt hast, hier eintragen
  },
  {
    title: "FC Brugg – AFV Ergebnisse & Torschützen",
    blurb:
      "Kleine Streamlit-App, die die Resultate und Torschützen (1. Mannschaft & Junioren B1) übersichtlich zeigt – ideal für Fans & Staff.",
    tech: ["Python", "Streamlit"],
    github: "https://github.com/TopG1Top/fcbrugg-afv-app",
    // demo: "https://<dein-streamlit-link>"
  },
  {
    title: "ULTRAKRASS – Shooterball (HTML5)",
    blurb:
      "Arcade-Shooter im Browser: 5-Level-Kampagne + Boss, Endless-Modus, Perks, Partikeleffekte, Screen-Shake/Slow-Mo, Neon-Look – 100% clientseitig.",
    tech: ["JavaScript", "HTML5 Canvas", "CSS"],
    github: "https://github.com/TopG1Top/Shooterballgame",
    // demo: "https://topg1top.github.io/Shooterballgame/" // nach GitHub Pages-Aktivierung
  },
]
