import { PageIntro } from "@/components/page-intro";
import { Section } from "@/components/section";
import { site } from "@/lib/site";
import { ArrowUpRight, Braces, Database, ShieldCheck, Trophy } from "lucide-react";
import { AnimatedCompass } from "@/components/animated-compass";

const principles = [
  {
    icon: Braces,
    number: "01",
    title: "Build before buzz",
    text: "Ideen werden schnell zu funktionierenden Prototypen. Erst wenn der Flow stimmt, kommt die Politur.",
  },
  {
    icon: ShieldCheck,
    number: "02",
    title: "Details schaffen Vertrauen",
    text: "Validierung, Performance, Datenschutz und responsive Zustände gehören für mich zum Produkt, nicht zum Nachtrag.",
  },
  {
    icon: Database,
    number: "03",
    title: "Komplexität verständlich machen",
    text: "Gute Interfaces verstecken Technik nicht, sondern übersetzen sie in klare Entscheidungen und ruhige Abläufe.",
  },
];

export default function AboutPage() {
  return (
    <Section className="py-12 md:py-16">
      <PageIntro
        index="01"
        eyebrow="Profile"
        title="Technik mit Klarheit. Ehrgeiz mit Substanz."
        description="Ich entwickle digitale Produkte, die nicht nur in einer Demo funktionieren, sondern durch Struktur, Tempo und saubere Details überzeugen."
      />

      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <article className="glass-panel corner-lines rise-in rounded-lg p-6 md:p-9">
          <span className="technical-label text-secondary">Who I am</span>
          <h2 className="mt-4 max-w-3xl text-2xl font-black tracking-tight md:text-4xl">
            Ich bin {site.name}, Applikationsentwickler in Ausbildung und jemand, der lieber baut als nur darüber spricht.
          </h2>
          <div className="mt-7 grid gap-5 text-base leading-8 text-muted-foreground md:grid-cols-2">
            <p>
              Mein Fokus liegt auf modernen Web-Apps, datenbasierten Tools und Interfaces, die sich direkt verständlich anfühlen. Dabei verbinde ich Frontend, Backend und Datenbanken zu einem sauberen Gesamtprodukt.
            </p>
            <p>
              Mehrere Jahre Leistungsfussball und Captain-Erfahrung prägen meine Arbeitsweise: Verantwortung übernehmen, unter Druck ruhig bleiben und ein Ziel konsequent bis zum Ende verfolgen.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t pt-6">
            {["Full-Stack", "Privacy-aware", "User-centered", "Swiss precision"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2 text-sm font-semibold">
                <ArrowUpRight className="h-4 w-4 text-secondary" /> {item}
              </span>
            ))}
          </div>
        </article>

        <aside className="rise-in rise-in-delay-1 rounded-lg border bg-slate-950 p-6 text-slate-100 shadow-2xl md:p-8">
          <div className="flex items-center justify-between">
            <span className="technical-label text-slate-500">Operator profile</span>
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.8)]" />
          </div>
          <div className="mt-8 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-[0.14em] text-slate-500">Status</span>
              <p className="mt-1 font-semibold">EFZ Applikationsentwicklung · BM Wirtschaft</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-[0.14em] text-slate-500">Core systems</span>
              <p className="mt-1 font-semibold">React · Next.js · TypeScript · SQL · Python</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-[0.14em] text-slate-500">Data layer</span>
              <p className="mt-1 font-semibold">MySQL · MongoDB · CouchDB · IndexedDB</p>
            </div>
            <div className="flex items-center gap-3 border-t border-white/10 pt-6 text-sm text-slate-400">
              <Trophy className="h-5 w-5 text-amber-300" /> Captain-Mentalität trifft Produktfokus.
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-12">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <span className="technical-label text-muted-foreground">Working principles</span>
            <h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">Wie ich Projekte angehe</h2>
          </div>
          <span className="hidden font-mono text-xs text-muted-foreground sm:block">03 PRINCIPLES / 01 STANDARD</span>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <article key={principle.title} className={`rise-in rise-in-delay-${index + 1} group rounded-lg border bg-card/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-lg`}>
                <div className="flex items-center justify-between">
                  <Icon className="h-6 w-6 text-primary" />
                  <span className="font-mono text-xs text-muted-foreground">{principle.number}</span>
                </div>
                <h3 className="mt-8 text-lg font-bold">{principle.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{principle.text}</p>
              </article>
            );
          })}
        </div>
      </div>

      <section className="mt-12 grid items-center gap-8 overflow-hidden rounded-lg border bg-card/60 p-6 md:grid-cols-[0.72fr_1.28fr] md:p-10">
        <div className="mx-auto w-full">
          <AnimatedCompass />
        </div>
        <div className="relative">
          <span className="technical-label text-secondary">Direction protocol</span>
          <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight md:text-5xl">
            Richtung vor Geschwindigkeit.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
            Schnell entwickeln ist wertvoll. Entscheidend ist aber, ob Produkt, Nutzer und Technik in dieselbe Richtung zeigen. Deshalb prüfe ich bei jedem Build zuerst den Zweck, dann den Flow und erst danach den Effekt.
          </p>
          <div className="mt-7 grid grid-cols-3 gap-px overflow-hidden rounded-md border bg-border text-center">
            {["PURPOSE", "FLOW", "IMPACT"].map((item, index) => (
              <div key={item} className="bg-background/80 px-2 py-4">
                <span className="font-mono text-[10px] text-muted-foreground">0{index + 1}</span>
                <div className="mt-1 text-xs font-bold tracking-[0.12em]">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Section>
  );
}
