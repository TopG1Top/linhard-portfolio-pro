import type { Metadata } from "next"
import "./globals.css"
import { site } from "@/lib/site"
import { Navbar } from "@/components/navbar"
import { LangProvider } from "@/components/lang-provider"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: `${site.name} — Digital Product Engineer`,
  description: "Portfolio von Linhard Zejneli — Webentwicklung, datenbasierte Tools und digitale Produkte aus der Schweiz.",
  openGraph: {
    title: `${site.name} — Digital Product Engineer`,
    description: "Webentwicklung, datenbasierte Tools und digitale Produkte aus der Schweiz.",
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
        <LangProvider>
          <Navbar />
          <main>{children}</main>
        </LangProvider>
      </body>
    </html>
  )
}
