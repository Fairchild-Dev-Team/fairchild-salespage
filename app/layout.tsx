import {
  Bricolage_Grotesque,
  Geist_Mono,
  Miriam_Libre,
  Schibsted_Grotesk,
} from "next/font/google"
import { ReactLenis } from "lenis/react"
import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
})

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
  display: "swap",
})

const miriamLibre = Miriam_Libre({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-miriam",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "FairChild Institute",
    template: "%s | FairChild Institute",
  },
  description:
    "FairChild Institute — programmes, courses, Interview Prep, and Fellowship for ambitious tech careers.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={cn(
        "font-sans antialiased",
        bricolageGrotesque.variable,
        schibstedGrotesk.variable,
        miriamLibre.variable,
        geistMono.variable
      )}
    >
      <body>
        <ThemeProvider>
          <ReactLenis root>{children}</ReactLenis>
        </ThemeProvider>
      </body>
    </html>
  )
}
