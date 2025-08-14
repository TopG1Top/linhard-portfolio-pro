"use client";

import { useState } from "react";
import { Section } from "@/components/section";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
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
      setStatus("error");                // <<< wichtig: Fehler sichtbar machen
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
      setName(""); setEmail(""); setMessage("");
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setError(err?.message || "Unerwarteter Fehler");
    }
  }

  return (
    <Section>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle>{t("contact.title")}</CardTitle>
            <CardDescription>{t("contact.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-3" noValidate>
              <Input
                placeholder="Dein Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required                // <<< Browser-Validation
                minLength={2}
                name="name"
              />
              <Input
                placeholder="Deine E-Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                name="email"
              />
              <Textarea
                placeholder="Kurze Nachricht…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                required
                minLength={10}
                name="message"
              />

              <div className="flex items-center gap-2">
                <Button type="submit" className="rounded-2xl" disabled={status === "sending"}>
                  {status === "sending" ? "Senden…" : t("contact.send")}
                </Button>

                {/* Erfolg/Fehler klar anzeigen */}
                {status === "ok" && (
                  <span className="text-sm text-emerald-600" aria-live="polite">
                    Gesendet! Danke 🙌
                  </span>
                )}
                {error && (
                  <span className="text-sm text-red-600" aria-live="polite">
                    {error}
                  </span>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle>{t("contact.alt")}</CardTitle>
            <CardDescription>E-Mail & Socials</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm">
            <a className="underline-offset-4 hover:underline" href={`mailto:${site.email}`}>{site.email}</a>
            <a className="underline-offset-4 hover:underline" href={site.github} target="_blank" rel="noreferrer">GitHub</a>
            <a className="underline-offset-4 hover:underline" href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
