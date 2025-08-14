import { Section } from "@/components/section"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { site } from "@/lib/site"

export default function AboutPage() {
  return (
    <Section>
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 rounded-3xl">
          <CardHeader>
            <CardTitle>Über mich</CardTitle>
            <CardDescription>Kurze Story, klare Werte, Fokus auf Wirkung.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Ich bin {site.name}, EFZ-Auszubildender im Bereich Applikationsentwicklung mit
              Berufsmaturität Typ Wirtschaft. Ich habe Erfahrung mit SQL-Datenbanken (MySQL),
              NoSQL-Datenbanken (MongoDB, CouchDB) sowie Frontend- und Backend-Entwicklung.
              Ich nutze Tools wie Wireshark, Hashcat, Git, VS Code, phpMyAdmin, Docker und
              verschiedene KI-Tools (z. B. ChatGPT) zur Effizienzsteigerung. Zudem kenne ich
              Webtechnologien (HTML, CSS, JavaScript, PHP), Clean Code, User-Centered Design
              und Performanceoptimierung.
            </p>
            <p>
              Neben der Technik habe ich mehrere Jahre Leistungsfussball gespielt und war Captain
              meiner Mannschaft. Diese Erfahrung hat mir Disziplin, Führungsstärke, Teamgeist und
              Durchhaltevermögen vermittelt – Eigenschaften, die ich heute auch in meine Projekte
              einbringe.
            </p>
            <p>
              Mein Anspruch: <strong>Messbarer Mehrwert</strong>. Egal ob Startup-MVP, internes Tool
              oder öffentliche Plattform – ich denke in User Flows, Edge Cases und in der Realität
              deiner Nutzer:innen.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <Badge className="rounded-xl">Remote/Hybrid</Badge>
              <Badge className="rounded-xl">Deutsch & Englisch</Badge>
              <Badge className="rounded-xl">Open-Source-Mindset</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle>Quick Facts</CardTitle>
            <CardDescription>TL;DR</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Status</span><span className="font-medium">EFZ in Ausbildung (BM Wirtschaft)</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Schwerpunkte</span><span className="font-medium">Full-Stack, Web-Apps & APIs</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Datenbanken</span><span className="font-medium">MySQL · MongoDB · CouchDB</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Tools</span><span className="font-medium">Git · Docker · VS Code · Wireshark</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Soft Skills</span><span className="font-medium">Captain-Erfahrung, Teamlead</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  )
}
