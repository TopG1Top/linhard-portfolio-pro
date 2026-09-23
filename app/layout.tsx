import type { Metadata } from "next"
import "./globals.css"
import { site } from "@/lib/site"
import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "next-themes"
import { LangProvider } from "@/components/lang-provider"
import { SiteUnlock } from "@/components/site-unlock"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: `${site.name} – Portfolio`,
  description: site.tagline,
  openGraph: {
    title: `${site.name} – Portfolio`,
    description: site.tagline,
    url: "/",
    siteName: site.name,
    images: [{ url: "/og.svg", width: 1200, height: 630 }],
    locale: "de_CH",
    type: "website",
  },
  icons: [{ rel: "icon", url: "/favicon.svg" }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LangProvider>
            <SiteUnlock />
            <Navbar />
            <main>{children}</main>
            <footer className="mt-12 border-t bg-card/35">
              <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="font-semibold text-foreground">{site.name}</div>
                  <div className="mt-1">© {new Date().getFullYear()} · Entwickelt in der Schweiz.</div>
                </div>
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
