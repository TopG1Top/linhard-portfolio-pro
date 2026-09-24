import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { Section } from "@/components/section";
import { site } from "@/lib/site";

const channels = [
  {
    label: "E-Mail",
    value: site.email,
    href: `mailto:${site.email}`,
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "@TopG1Top",
    href: site.github,
    icon: Github,
  },
  {
    label: "LinkedIn",
    value: "Profil öffnen",
    href: site.linkedin,
    icon: Linkedin,
  },
];

export default function ContactPage() {
  return (
    <Section className="py-12 md:py-16">
      <PageIntro
        index="05"
        eyebrow="Contact channel"
        title="Eine gute Idee verdient eine direkte Verbindung."
        description="Projekt, Zusammenarbeit oder technische Frage: Schreib mir kurz, worum es geht. Ich antworte klar und ohne Umwege."
      />

      <div className="overflow-hidden rounded-lg border bg-slate-950 text-slate-100 shadow-2xl">
        {channels.map(({ label, value, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            className="group grid gap-4 border-t border-white/10 p-6 first:border-t-0 sm:grid-cols-[12rem_1fr_auto] sm:items-center md:p-8"
          >
            <span className="inline-flex items-center gap-3 text-sm font-semibold text-slate-400">
              <Icon className="h-5 w-5 text-cyan-300" /> {label}
            </span>
            <span className="text-xl font-bold tracking-tight md:text-2xl">{value}</span>
            <ArrowUpRight className="h-5 w-5 text-slate-500 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
          </a>
        ))}
      </div>
    </Section>
  );
}
