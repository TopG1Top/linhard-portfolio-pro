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
  status?: string
  placeholder?: boolean
}

export const projects: Project[] = [
  {
    title: "Casino LUXE NOIR",
    category: "Interactive Demo",
    year: "2025",
    image: {
      src: "/projects/casino-luxe-noir-v2.webp",
      alt: "Cineastische Skulptur aus schwarzem Glas mit Roulette-Mechanik, Kartenformen und Metallchips.",
    },
    impact: "Ein polished Demo-Projekt mit mehreren Spielmodi, Animationen und lokaler Session-Logik.",
    highlights: ["Roulette, Blackjack, Slots", "Lokaler Account-Bereich", "Dark-Luxury-UI"],
    blurb:
      "Premium Casino-Simulator als Demo-Projekt mit Roulette, Blackjack, Slots, animierten Table-Games, lokalem Account-Bereich, Session-Stats und edlem Dark-Luxury-UI.",
    tech: ["JavaScript", "HTML", "CSS", "Animation", "LocalStorage"],
    github: "https://github.com/TopG1Top/Casino-Luxe",
    demo: "https://casinoluxe.netlify.app/",
  },
  {
    title: "Calc — Private Vault",
    category: "Privacy PWA",
    year: "2026",
    image: {
      src: "/projects/calc-private-vault-v2.webp",
      alt: "Monumentaler Tresor aus Rauchglas mit Präzisionsregler und grüner Verschlüsselungslinie.",
    },
    impact: "Versteckt einen vollständig lokalen, verschlüsselten Medien-Vault hinter einem echten, unauffälligen Rechner.",
    highlights: ["AES-GCM 256-bit & PBKDF2", "Auto-Lock, Alben & Favoriten", "Verschlüsselte .cvault-Backups"],
    blurb:
      "Eine Local-first PWA mit doppelter Identität: Im Alltag ein vollwertiger Calculator, nach geheimer PIN-Eingabe ein privater Foto- und Video-Vault — ohne Cloud, Tracker oder Recovery-Backdoor.",
    tech: ["React", "TypeScript", "Web Crypto", "IndexedDB", "Dexie", "PWA"],
    status: "Private by design",
  },
  {
    title: "Noten-Optimizer Pro (CH)",
    category: "Education Tool",
    year: "2026",
    image: {
      src: "/projects/noten-optimizer-v2.webp",
      alt: "Transparente Glasstufen führen zu einer schwebenden Zielkugel in einem präzisen Messring.",
    },
    impact: "Macht Notenplanung konkret: Zielnote, Lernplan und Kalender-Export in einem Flow.",
    highlights: ["Was-wäre-wenn-Simulator", "Zielnote-Rechner", "ICS-Kalender-Export"],
    blurb:
      "Gewichteter Noten-Ø (Schweizer Skala 1.0–6.0), Was-wäre-wenn-Simulator, Zielnote → benötigte nächste Note je Fach sowie Lernplan-Generator inkl. ICS-Kalender-Export.",
    tech: ["Python", "Streamlit", "Pandas", "ICS", "Docker"],
    github: "https://github.com/TopG1Top/noten-optimizer-pro",
  },
  {
    title: "CityPulse Control Room",
    category: "Live City Dashboard",
    year: "2026",
    image: {
      src: "/projects/citypulse-v2.webp",
      alt: "Leuchtendes Stadtmodell aus Glas mit ruhigen Datenwellen und verbundenen Verkehrsadern.",
    },
    impact: "Verwandelt jede Stadt in ein Live-Dashboard mit Wetter, Luftqualität, Karte und smarter Lageeinschätzung.",
    highlights: ["Stadtsuche mit Geocoding", "Live-Wetter & Luftqualität", "Karte + Traffic Intelligence"],
    blurb:
      "Futuristisches City-Control-Dashboard: Stadt eingeben, Karte öffnen, Wetterdaten analysieren und aktuelle City-Signale auf einen Blick sehen.",
    tech: ["Next.js", "TypeScript", "Open-Meteo", "OpenStreetMap", "Tailwind"],
    demo: "/citypulse",
  },
  {
    title: "FC Brugg – AFV Ergebnisse & Torschützen",
    category: "Sports Dashboard",
    year: "2026",
    image: {
      src: "/projects/fcbrugg-v2.webp",
      alt: "Architektonisches Fussballfeld aus grünem Glas mit Spielermarkern und Flugkurve.",
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
      src: "/projects/shooterball-v2.webp",
      alt: "Chromkugel rast durch ein Hindernisfeld aus Glas auf einen leuchtenden Bosskörper zu.",
    },
    impact: "Zeigt Game-Feel im Browser: schnelle Loops, Effekte und saubere Canvas-Interaktion.",
    highlights: ["5-Level-Kampagne", "Boss & Endless-Modus", "Particles, Shake, Slow-Mo"],
    blurb:
      "Arcade-Shooter im Browser: 5-Level-Kampagne + Boss, Endless-Modus, Perks, Partikeleffekte, Screen-Shake/Slow-Mo, Neon-Look – 100% clientseitig.",
    tech: ["JavaScript", "HTML5 Canvas", "CSS"],
    github: "https://github.com/TopG1Top/Shooterballgame",
  },
  {
    title: "Portfolio OS",
    category: "Creative Frontend",
    year: "2026",
    image: {
      src: "/projects/portfolio-os-v2.webp",
      alt: "Modulares Betriebssystem als räumliche Architektur aus schwebenden Glasflächen und Chrom.",
    },
    impact: "Ein auffälliges Side-Project, das Kreativität, Vanilla-JavaScript und UI-Interaktion zeigt.",
    highlights: ["Fenster-Manager & Dock", "Command Palette & Terminal", "Statisch hostbar auf Vercel"],
    blurb:
      "Interaktives Portfolio als Mini-Betriebssystem mit Apps, Fenster-Manager, Terminal, Notizen, Themes und Canvas-Wallpaper.",
    tech: ["HTML", "CSS", "JavaScript", "Canvas", "Static Site"],
    demo: "/portfolio-os",
  },
  {
    title: "PROJECT_08 // CLASSIFIED",
    category: "Encrypted Build Slot",
    year: "NEXT",
    image: {
      src: "/og.svg",
      alt: "Reservierter Projektplatz mit klassifiziertem Status.",
    },
    impact: "Ein reservierter Platz für das nächste Projekt mit echtem technischen Anspruch und einer Demo, die im Gedächtnis bleibt.",
    highlights: ["Briefing verschlüsselt", "Systemarchitektur in Arbeit", "Reveal folgt nach Launch"],
    blurb: "Die Spezifikation bleibt vorerst unter Verschluss. Freigabe erst, wenn Idee, Engineering und Präsentation dem Portfolio-Standard entsprechen.",
    tech: ["CLASSIFIED", "BUILDING", "SOON"],
    status: "Access restricted",
    placeholder: true,
  },
  {
    title: "PROJECT_09 // SIGNAL PENDING",
    category: "Reserved Project Slot",
    year: "NEXT",
    image: {
      src: "/og.svg",
      alt: "Reservierter Projektplatz mit ausstehendem Signal.",
    },
    impact: "Freier Raum für ein kommendes Produkt, Experiment oder Tool — bewusst sichtbar, damit das Portfolio weiter wachsen kann.",
    highlights: ["Konzept nicht veröffentlicht", "Launch-Sequenz offline", "Nächster Build wird vorbereitet"],
    blurb: "Noch kein austauschbarer Platzhalter, sondern eine klare Ankündigung: Hier erscheint das nächste Projekt erst dann, wenn es wirklich etwas Neues zeigt.",
    tech: ["RESERVED", "R&D", "TBA"],
    status: "Awaiting signal",
    placeholder: true,
  },
]
