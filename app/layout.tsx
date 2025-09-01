import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Script from "next/script"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Anderson Map - دليل الفروع الشامل | Complete Branch Directory",
  description:
    "Find Anderson branches across all 48 Algerian wilayas. Interactive directory with search, filtering, and contact information. دليل شامل لفروع أندرسون في جميع أنحاء الجزائر",
  keywords: "Anderson, Algeria, branches, locations, directory, wilaya, contact, فروع, الجزائر, أندرسون, دليل",
  authors: [{ name: "Anderson Map" }],
  openGraph: {
    title: "Anderson Map - Complete Branch Directory",
    description: "Find Anderson branches across Algeria with our interactive directory",
    type: "website",
    locale: "ar_DZ",
    alternateLocale: ["fr_DZ", "en_US"],
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-H2BCRC2S8C" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H2BCRC2S8C', {
              page_title: 'Anderson Map',
              page_location: window.location.href,
            });
          `}
        </Script>
      </head>
      <body className="antialiased font-sans">{children}</body>
    </html>
  )
}
