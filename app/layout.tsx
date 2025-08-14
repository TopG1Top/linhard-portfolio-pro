import type { Metadata } from "next"
import "./globals.css"
import { site } from "@/lib/site"
import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "next-themes"
import { LangProvider } from "@/components/lang-provider"

export const metadata: Metadata = {
  title: `${site.name} – Portfolio`,
  description: site.tagline,
  openGraph: {
    title: `${site.name} – Portfolio`,
    description: site.tagline,
    url: "https://example.com",
    siteName: site.name,
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    locale: "de_CH",
    type: "website",
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LangProvider>
            <Navbar />
            <main>{children}</main>
            <footer className="border-t">
              <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-3">
                <div>© {new Date().getFullYear()} {site.name}. Alle Rechte vorbehalten.</div>
                <div className="inline-flex items-center gap-4">
                  <a href={site.github} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">GitHub</a>
                  <a href={site.linkedin} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">LinkedIn</a>
                  <a href={`mailto:${site.email}`} className="underline-offset-4 hover:underline">Kontakt</a>
                </div>
              </div>
            </footer>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
