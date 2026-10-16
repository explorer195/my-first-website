import type { Metadata, Viewport } from "next";
import { Geist_Mono, Mona_Sans } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Cursor } from "@/components/motion/cursor";
import { MotionProvider } from "@/components/motion/motion-provider";
import { siteConfig } from "@/lib/site";
import "./globals.css";

// One variable family covers display and body text; the width axis gives
// the expanded headline style.
const monaSans = Mona_Sans({
  variable: "--font-mona",
  subsets: ["latin"],
  axes: ["wdth"],
});

// Labels only, never the first thing on screen: skip the preload so the
// headline font downloads first on slow connections.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Digital Growth, AI & Technology Company`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Digital Growth, AI & Technology Company`,
    description: siteConfig.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Digital Growth, AI & Technology Company`,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#030a1c",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${monaSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-svh">
        <a
          href="#main"
          className="sr-only-focusable fixed top-4 left-4 z-60 bg-primary px-6 py-4 text-sm font-medium text-primary-foreground"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <Cursor />
        </MotionProvider>
      </body>
    </html>
  );
}
