import { Section } from "@/components/section"
import { Timeline } from "@/components/timeline"

const EXPERIENCE = [
  {
    role: "Applikationsentwickler EFZ (in Ausbildung) · Berufsmaturität Typ Wirtschaft",
    company: "Berufsfachschule / Lehrbetrieb",
    period: "2023 – heute",
    points: [
      "Grundlagen & Praxis: OOP, Datenbanken (MySQL, MongoDB, CouchDB), Netzwerke",
      "Webtechnologien: HTML, CSS, JavaScript/TypeScript, PHP",
      "Clean Code, User-Centered Design, Performanceoptimierung",
    ],
  },
  {
    role: "Private Projekte & Kundenaufträge",
    company: "Freelance",
    period: "2021 – heute",
    points: [
      "Portfolio- & Business-Webseiten mit Next.js/React/Tailwind",
      "Kleine Backends & APIs (Node.js/Express) inkl. Datenbanken",
      "Domains, Hosting & Deployments (z. B. Vercel), DNS & E-Mail-Setup",
      "Kontaktformulare (SMTP/Outlook), Analytics & Performance-Tuning",
      "Support, Fehleranalyse & Weiterentwicklung nach Go-Live",
    ],
  },
  {
    role: "Open-Source & Projekte",
    company: "GitHub: TopG1Top",
    period: "laufend",
    points: [
      "Veröffentlichung & Pflege eigener Repos",
      "Dokumentation, Issue-Tracking und kontinuierliche Verbesserung",
    ],
  },
]

export default function ExperiencePage() {
  return (
    <Section>
      <h2 className="text-2xl font-bold tracking-tight">Erfahrung</h2>
      <Timeline items={EXPERIENCE} />
    </Section>
  )
}
