"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { heading } from "@/lib/typography";
import { ArrowRight, ArrowUpRight, Check, LockKeyhole, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

const sealed = {
  salt: "XsAbRYnaCDozs4wtdbbD9w==",
  iv: "JLO4p39IH3gp505F",
  data: "De0BneLFQ3Uw2nHOGdCg7pLfDvlGTRTmkQt9NRjf/Ut+N/+YrUBNXMu8qScoWsK0RFN7QX2csyGchG+ONpbkVffUTk9bNG6fdSHGgrZPTJjFJD/KIQ6+PYpWZsSVyOP3DVJxUcSaeuou8Npe8++aTjO2LslKbOh6SMAoMSL7GwPCBrnCSk4XTCV9pvvXrQuoNTHRDuAknBXi/WhysPah2Tgm3Tqti6lsri/zqspCwMd1DxhrhDMAbJtbKgYsQGIAx0niV0Hi+0NP6U/mhxkENAMlEYn0U1uam8fsNgGEJ+00WMBXFNi8M3GGoyP01f9OvuoA0RfN83CK2rzEn7kDLufNAEN+nNIoPZmzTwntzKbARQ9sKQBlTbIY4YUWvY8EUyqYw25joi8jR7ThQK/Da6fZSwjl1AM6m/A95eBv1lW5JIWCtMpdXJxUarIULVEukVLK9sLyYWxybx4reOUtcE8zaRilgJsaAE0KrZT5vAya6vS+wOCJTNlhyFxYExS6+7l6LnN22t+z9+v0B5UDFI2OW2bGYmNCG07wF8WqF8VqdZZwo24we/Qv5VwC3CFsDKk73MeiiRasc1i3BOKjFnf6U42LLyvx6+pc0qOvHcE3JNQMX/HHMlj+8xsP9ROFPcQQthSVO9E8TofTIc1vX6Qicx5OyRjvFUkR4GL0VLTdc05rIt/++Hh1rV4uF1hWJUnTVNVOKRyC6g+mu96kQIsh6TMq65Z8mzsNfYguHzXY+QtUgVbFeN9snIC+QalWs+dK5oKEXvpFvyR+76zK6keRQf2V7n5at6hbiO2lbBDk6o9j9udW3Cjva/GitIV4iP0s2sMPP2DgV//s8v/HCZfIaePFI0VSAcOE/0rl+pSe3sLZsXI77M16CpXNHfy64krbsxWSHt+4Z1WrLze754rcpPhLeaLIL96QCqW1vW4HZXGd3VPBRVRkZ4FAj9VJdIIhnBBojSI6InMd2d4eQl9fLSKlzcO8IwTMRIKSoD4lGhTgiznf00BRBpodcnMNL8kTMdCnXvq7d4d7wSET7sDCRoRmA8AphNy7IItnqb3NULkzI6R3LEGJR0m2GkDpgNbu2m+ugDU5Gl/RFI0S+Qrnwy/iuboU29W+AgLomTAWmJjgN27NTH9NFErQ/5SYaUMK2tkA4dR0vb5D+1jpvkB2fuS2YfOhAD4mutZzIevkKcW0pd/FCwHnSHIu7fY2mwkG63sDkQ6zMRzg8LMPSQ3eWdnbUnB7w23yTpfO4UZF+bI7zVBwcYYumL264EfrxNjOeOtW1igPZUW5e8OUtWXaWZyJpFvZMQumWgcLgm1No1Kwfv4trFBwce1o/AtAtUHeuWLgP5F+n2NpXuFymFVAijBgkFi2IK4xLtdP43tDYlLKd/A6HSMcQXviTkWMUt2YHYRBJ4J1c0XBhcMjntAQf7i9V60E1ukT3HA4ylfOS3FprkLlKabNqXYHGofhMl1PdNUfNVbXYnCs9bl4RwUQKJG8/lm12MUnleZOVZ4nmVb0wsdctyR3hMImFghqxLYsTnbQ0wJy69MdrXCxv3nyBXO2R0EHH6NnUQy4ss8J10q3W6tYJoO071vUbjGOMP6N3olRXmrAV6oxtPH4OKHpynj/+VbEZNSb3zMDIdZsZwCf0tkzvcDhf09n9Vybjf/5KbVhwIrCU3zSsoFkbS7GyQumceQYfxZgvRsL75f8iDrs1zUVyEgzCDRRlb12D9M1TFQfQJ+Lm4aQOKKbWnFAEGpQ4BUNpSacj98Ki9ZPKHsXK52BjV+zbTQkx05FgpH7i+u18hD0PFKziMGQhMBnIuq5EqKp6xHQV4gp2NazvabMHG0LHGOrhgd7nRY=",
  iterations: 240000,
};

type Dossier = {
  eyebrow: string;
  title: string;
  lead: string;
  sections: { number: string; title: string; body: string }[];
  closing: string;
};

const phases = [
  { index: "01", label: "Die Oberfläche", title: "Jedes System zeigt eine Tür.", text: "Nicht jede Tür ist sichtbar. Jede Eingabe, jede Freigabe und jede Abhängigkeit definiert, wo Vertrauen beginnt — und wo es endet." },
  { index: "02", label: "Die Identität", title: "Der Schlüssel ist ein Mensch.", text: "Sicherheit entscheidet sich an Identitäten, Gewohnheiten und Berechtigungen. Ein starkes System macht den richtigen Weg leicht und den falschen schwer." },
  { index: "03", label: "Die Daten", title: "Was nie geteilt wird, kann nicht abfliessen.", text: "Lokale Datenhaltung und Verschlüsselung reduzieren Angriffsflächen bereits in der Produktarchitektur. Weniger gespeicherte Daten bedeuten weniger Risiko." },
  { index: "04", label: "Der Zugang", title: "Vertrauen wird persönlich erteilt.", text: "Hinter dieser Schwelle liegt ein technisches Dossier. Eine persönliche Anfrage öffnet den Weg; den Zugangscode vergebe ich anschliessend direkt." },
];

function fromBase64(value: string) {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}

async function decryptDossier(code: string): Promise<Dossier> {
  const keyMaterial = await crypto.subtle.importKey("raw", new TextEncoder().encode(code.trim()), "PBKDF2", false, ["deriveKey"]);
  const key = await crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: fromBase64(sealed.salt), iterations: sealed.iterations, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"],
  );
  const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: fromBase64(sealed.iv) }, key, fromBase64(sealed.data));
  return JSON.parse(new TextDecoder().decode(plain)) as Dossier;
}

export function CyberVault() {
  const ref = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState(0);
  const [dialog, setDialog] = useState<"request" | "code" | null>(null);
  const [mailOpened, setMailOpened] = useState(false);
  const [dossier, setDossier] = useState<Dossier | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [opening, setOpening] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const mechanismTurn = useTransform(scrollYProgress, [0, 1], [0, 192]);
  const innerTurn = useTransform(scrollYProgress, [0, 1], [0, -148]);
  const sealScale = useTransform(scrollYProgress, [0, .75, 1], [.78, 1, 1.06]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(3, Math.floor(value * 4));
    setPhase((current) => current === next ? current : next);
  });

  useEffect(() => {
    if (!dialog && !dossier) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDialog(null);
        setDossier(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [dialog, dossier]);

  function requestAccess(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const reason = String(form.get("reason") || "").trim();
    const subject = encodeURIComponent("Anfrage: Zugang zum Cybersecurity-Dossier");
    const body = encodeURIComponent(`Hallo Linhard,\n\nich möchte Zugang zum Cybersecurity-Dossier anfragen.\n\nName: ${name}\nE-Mail: ${email}\nInteresse / Projekt: ${reason}\n\nFreundliche Grüsse\n${name}`);
    setMailOpened(true);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  async function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setOpening(true);
    try {
      const content = await decryptDossier(code);
      setDossier(content);
      setDialog(null);
      setCode("");
    } catch {
      setError("Dieser Code konnte den Bereich nicht entschlüsseln. Bitte prüfe die Freigabe.");
    } finally {
      setOpening(false);
    }
  }

  return (
    <>
      <section ref={ref} id="cybersecurity" className="cyber-vault" aria-labelledby="cyber-title">
        <div className="cyber-vault-sticky">
          <motion.div className="cyber-grid" style={prefersReducedMotion ? undefined : { y: gridY }} aria-hidden="true" />
          <div className="cyber-vault-top"><span>CYBERSECURITY / RESTRICTED AREA</span><span>SECURITY BY DESIGN</span></div>
          <div className="cyber-vault-layout">
            <div className="cyber-phase-list" aria-label="Sicherheitsprinzipien">
              {phases.map((item, index) => <div className={phase === index ? "is-active" : ""} key={item.index}><span>{item.index}</span><strong>{item.label}</strong><i /></div>)}
            </div>
            <div className="cyber-mechanism" aria-hidden="true">
              <motion.div className="cyber-orbit cyber-orbit-outer" style={prefersReducedMotion ? undefined : { rotate: mechanismTurn, scale: sealScale }} />
              <motion.div className="cyber-orbit cyber-orbit-inner" style={prefersReducedMotion ? undefined : { rotate: innerTurn }} />
              <div className={`cyber-lock ${dossier ? "cyber-lock-open" : ""}`}>
                <div className="cyber-lock-shackle" />
                <div className="cyber-lock-body"><LockKeyhole strokeWidth={1.05} /></div>
              </div>
              <div className="cyber-mechanism-caption"><span>AUTHORIZATION REQUIRED</span><span>0{phase + 1} / 04</span></div>
            </div>
            <div className="cyber-phase-copy">
              <AnimatePresence mode="wait">
                <motion.div key={phase} initial={{ opacity: 0, y: 26, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -18, filter: "blur(6px)" }} transition={{ duration: prefersReducedMotion ? 0 : .5, ease: [0.22, 1, 0.36, 1] }}>
                  <p className="lux-label"><span />{phases[phase].label}</p>
                  <h2 id="cyber-title">{heading(phases[phase].title)}</h2>
                  <p>{phases[phase].text}</p>
                </motion.div>
              </AnimatePresence>
              <div className="cyber-actions">
                <button type="button" onClick={() => { setMailOpened(false); setDialog("request"); }}>Zugang anfragen <ArrowUpRight aria-hidden="true" /></button>
                <button type="button" onClick={() => setDialog("code")}>Code eingeben <ArrowRight aria-hidden="true" /></button>
              </div>
            </div>
          </div>
          <div className="cyber-vault-bottom"><span>VERSCHLÜSSELTES DOSSIER · FREIGABE NACH PERSÖNLICHER ANFRAGE</span><div><motion.i style={{ scaleX: barScale }} /></div><span>SCROLL TO EXPLORE</span></div>
        </div>
      </section>

      <AnimatePresence>
        {dialog && <motion.div className="cyber-dialog-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setDialog(null); }}>
          <motion.div className="cyber-dialog" role="dialog" aria-modal="true" aria-label={dialog === "request" ? "Zugang anfragen" : "Zugangscode eingeben"} initial={{ opacity: 0, y: 36, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: .98 }} transition={{ duration: .4, ease: [0.22, 1, 0.36, 1] }}>
            <button className="cyber-close" type="button" aria-label="Schliessen" onClick={() => setDialog(null)}><X /></button>
            <p className="lux-label"><span />{dialog === "request" ? "Persönliche Freigabe" : "Secure access"}</p>
            {dialog === "request" ? <>
              <h2>Der Zugang beginnt mit einem Gespräch</h2>
              <p className="cyber-dialog-intro">Beschreibe kurz, warum du das technische Dossier sehen möchtest. Die Nachricht wird in deinem Mailprogramm vorbereitet. Nach dem Absenden kann ich dir den Freigabecode persönlich schicken.</p>
              <form onSubmit={requestAccess}>
                <label>Name<input name="name" autoComplete="name" required placeholder="Dein Name" /></label>
                <label>E-Mail<input name="email" type="email" autoComplete="email" required placeholder="name@unternehmen.ch" /></label>
                <label>Interesse oder Projekt<textarea name="reason" required rows={3} placeholder="Worum geht es dir?" /></label>
                <button type="submit">Anfrage im Mailprogramm öffnen <ArrowUpRight /></button>
              </form>
              {mailOpened && <p className="cyber-feedback"><Check /> Bitte sende die vorbereitete E-Mail in deinem Mailprogramm ab. Erst danach erreicht mich deine Anfrage.</p>}
            </> : <>
              <h2>Freigabe verifizieren</h2>
              <p className="cyber-dialog-intro">Gib den persönlich erhaltenen Code ein. Das Dossier wird lokal in deinem Browser entschlüsselt.</p>
              <form onSubmit={unlock}>
                <label>Persönlicher Zugangscode<input type="password" value={code} onChange={(event) => setCode(event.target.value)} autoComplete="off" required placeholder="Freigabecode" /></label>
                <button type="submit" disabled={opening}>{opening ? "Entschlüsselung läuft…" : "Dossier öffnen"} <ArrowRight /></button>
              </form>
              {error && <p className="cyber-error" role="alert">{error}</p>}
              <button className="cyber-dialog-switch" type="button" onClick={() => setDialog("request")}>Noch keinen Code? Zugang anfragen <ArrowUpRight /></button>
            </>}
          </motion.div>
        </motion.div>}
      </AnimatePresence>

      <AnimatePresence>
        {dossier && <motion.div className="cyber-dossier-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="cyber-dossier" role="dialog" aria-modal="true" aria-label="Cybersecurity-Dossier">
            <button className="cyber-close" type="button" aria-label="Dossier schliessen" onClick={() => setDossier(null)}><X /></button>
            <p className="lux-label"><span />{dossier.eyebrow}</p>
            <h2>{heading(dossier.title)}</h2>
            <p className="cyber-dossier-lead">{dossier.lead}</p>
            <div className="cyber-dossier-sections">{dossier.sections.map((item) => <article key={item.number}><span>{item.number}</span><h3>{heading(item.title)}</h3><p>{item.body}</p></article>)}</div>
            <p className="cyber-dossier-closing">{dossier.closing}</p>
            <a href={`mailto:${site.email}?subject=Gespräch%20zum%20Cybersecurity-Dossier`}>Gespräch beginnen <ArrowUpRight /></a>
          </div>
        </motion.div>}
      </AnimatePresence>
    </>
  );
}
