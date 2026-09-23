"use client";

import { useState } from "react";
import { CheckCircle2, Github, Linkedin, Loader2, Mail, Send } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { Section } from "@/components/section";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { contactSchema } from "@/lib/validations";
import { useI18n } from "@/components/lang-provider";
import { site } from "@/lib/site";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<null | "idle" | "sending" | "ok" | "error">(null);
  const [error, setError] = useState<string | null>(null);
  const { t } = useI18n();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setStatus("idle");

    const payload = { name, email, message };
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message || "Fehlerhafte Eingabe");
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Server Error");
      setStatus("ok");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unerwarteter Fehler");
    }
  }

  return (
    <Section className="py-12 md:py-16">
      <PageIntro
        index="05"
        eyebrow="Contact channel"
        title="Eine gute Idee verdient eine direkte Verbindung."
        description="Projekt, Zusammenarbeit oder einfach eine technische Frage: Schreib mir kurz, worum es geht. Ich antworte klar und ohne Umwege."
      />

      <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="rounded-lg border bg-slate-950 p-6 text-slate-100 shadow-2xl md:p-8">
          <div className="flex items-center justify-between">
            <span className="technical-label text-slate-500">Direct channels</span>
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.8)]" />
          </div>
          <h2 className="mt-8 text-2xl font-black tracking-tight">Kontakt ohne Umwege.</h2>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            Für konkrete Anfragen ist E-Mail am schnellsten. Code und aktuelle Builds findest du direkt auf GitHub.
          </p>
          <div className="mt-8 grid gap-3">
            <a href={`mailto:${site.email}`} className="group flex items-center justify-between rounded-lg border border-white/10 p-4 transition hover:border-emerald-300/40 hover:bg-white/[0.04]">
              <span className="inline-flex items-center gap-3"><Mail className="h-5 w-5 text-emerald-300" /> E-Mail</span>
              <span className="text-xs text-slate-500 transition group-hover:text-slate-300">{site.email}</span>
            </a>
            <a href={site.github} target="_blank" rel="noreferrer" className="group flex items-center justify-between rounded-lg border border-white/10 p-4 transition hover:border-indigo-300/40 hover:bg-white/[0.04]">
              <span className="inline-flex items-center gap-3"><Github className="h-5 w-5 text-indigo-300" /> GitHub</span>
              <span className="text-xs text-slate-500 transition group-hover:text-slate-300">@TopG1Top</span>
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="group flex items-center justify-between rounded-lg border border-white/10 p-4 transition hover:border-sky-300/40 hover:bg-white/[0.04]">
              <span className="inline-flex items-center gap-3"><Linkedin className="h-5 w-5 text-sky-300" /> LinkedIn</span>
              <span className="text-xs text-slate-500 transition group-hover:text-slate-300">Profil öffnen</span>
            </a>
          </div>
        </aside>

        <div className="glass-panel corner-lines rounded-lg p-6 md:p-8">
          <div className="mb-6">
            <span className="technical-label text-secondary">Secure message form</span>
            <h2 className="mt-2 text-2xl font-black tracking-tight">{t("contact.title")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t("contact.subtitle")}</p>
          </div>
          <form onSubmit={onSubmit} className="grid gap-5" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold">
                Name
                <Input value={name} onChange={(e) => setName(e.target.value)} required minLength={2} name="name" className="h-12 rounded-md bg-background/70" />
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                E-Mail
                <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required name="email" className="h-12 rounded-md bg-background/70" />
              </label>
            </div>
            <label className="grid gap-2 text-sm font-semibold">
              Nachricht
              <Textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={7} required minLength={10} name="message" className="resize-none rounded-md bg-background/70" />
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button type="submit" className="signal-button rounded-lg" disabled={status === "sending"}>
                {status === "sending" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                {status === "sending" ? "Wird gesendet…" : t("contact.send")}
              </Button>
              {status === "ok" ? (
                <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600" aria-live="polite">
                  <CheckCircle2 className="h-4 w-4" /> Nachricht gesendet.
                </span>
              ) : null}
              {error ? <span className="text-sm text-red-600" aria-live="polite">{error}</span> : null}
            </div>
          </form>
        </div>
      </div>
    </Section>
  );
}
