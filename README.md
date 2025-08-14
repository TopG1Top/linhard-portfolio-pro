# Linhard Zejneli – Portfolio (Pro)

- Next.js 14 (App Router, TS), Tailwind, framer-motion
- Dark/Light Mode (hydration-sicher)
- DE/EN Umschaltung (leichte i18n)
- Schöner Hero (Aurora + Tech Marquee)
- Projekte mit Hinweis-Badge
- Kontaktformular `/api/contact` mit Nodemailer (klare Fehlermeldungen)
- **Game:** `/game` – Jump Runner (über Fussbälle)

## Setup (npm)
```bash
npm install
# .env setzen
Copy-Item .env.example .env.local  # PowerShell
npm run dev
```

### SMTP (Outlook Beispiel)
In `.env.local` setzen (siehe `.env.example`), dann Server neustarten.

### Build/Start
```bash
npm run build
npm start
```

### Deploy
Vercel: Repo verbinden, Environment Variables setzen, deployen.
