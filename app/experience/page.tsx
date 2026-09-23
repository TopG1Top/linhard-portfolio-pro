import { PageIntro } from "@/components/page-intro";
import { Section } from "@/components/section";
import { Timeline } from "@/components/timeline";

const EXPERIENCE = [
  {
    role: "Applikationsentwickler EFZ · Berufsmaturität Wirtschaft",
    company: "Ausbildung",
    period: "2023 — heute",
    points: [
      "OOP, Datenbanken, Netzwerke und moderne Webentwicklung in Theorie und Praxis",
      "Arbeit mit MySQL, MongoDB, CouchDB, JavaScript, TypeScript, PHP und Python",
      "Clean Code, User-Centered Design, Testing und Performance als feste Qualitätskriterien",
    ],
  },
  {
    role: "Eigene Produkte & Kundenlösungen",
    company: "Independent",
    period: "2021 — heute",
    points: [
      "Web-Apps, Dashboards, PWA-Prototypen und interaktive Browser-Experiences",
      "Von UI-Konzept und Datenmodell bis Deployment, Domain und laufender Verbesserung",
      "Fehleranalyse und Weiterentwicklung anhand echter Nutzung statt nur theoretischer Anforderungen",
    ],
  },
  {
    role: "Open Source & Product Experiments",
    company: "GitHub · TopG1Top",
    period: "laufend",
    points: [
      "Eigene Repositories mit nachvollziehbarer Dokumentation und reproduzierbaren Builds",
      "Kontinuierliche Experimente mit Datenschutz, Visualisierung, Game Loops und Produkt-UX",
    ],
  },
];

export default function ExperiencePage() {
  return (
    <Section className="py-12 md:py-16">
      <PageIntro
        index="03"
        eyebrow="Experience"
        title="Lernen, anwenden, ausliefern."
        description="Meine Erfahrung wächst nicht nur über Zeit, sondern über echte Builds: Anforderungen verstehen, Entscheidungen treffen und funktionierende Ergebnisse liefern."
      />
      <div className="mb-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-border md:grid-cols-4">
        {[
          ["2021", "erste eigene Builds"],
          ["2023", "Start EFZ + BM"],
          ["7", "realisierte Projekte"],
          ["∞", "Lernkurve"],
        ].map(([value, label]) => (
          <div key={label} className="bg-card/90 p-5 md:p-6">
            <div className="text-2xl font-black md:text-3xl">{value}</div>
            <div className="mt-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>
      <Timeline items={EXPERIENCE} />
    </Section>
  );
}
