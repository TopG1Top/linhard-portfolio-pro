"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const home = pathname === "/";

  return (
    <header className={`site-header ${home ? "site-header--overlay" : ""}`}>
      <Link href="/" className="brand-mark" aria-label={`${site.name} – Startseite`}>
        <span>Linhard</span><span>Zejneli</span>
      </Link>
      <nav aria-label="Hauptnavigation">
        <Link href={home ? "#selected" : "/projects"}>Arbeiten</Link>
        <Link href={home ? "#cybersecurity" : "/#cybersecurity"}>Cybersecurity</Link>
        <Link href="/about">Profil</Link>
        <a className="contact-link" href={`mailto:${site.email}`}>
          Kontakt <ArrowUpRight aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}
