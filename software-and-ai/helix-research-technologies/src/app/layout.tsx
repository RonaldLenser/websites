import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SITE, asset } from "@/lib/data";
import Header from "@/components/header";
import Footer from "@/components/footer";
import StickyCta from "@/components/sticky-cta";
import RevealObserver from "@/components/reveal-observer";
import { OrganizationJsonLd } from "@/components/json-ld";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const interTight = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"], weight: ["500", "600"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `AI agents for lab and medical supply companies | ${SITE.name}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: SITE.url,
    title: `AI agents for lab and medical supply companies | ${SITE.name}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `AI agents for lab and medical supply companies | ${SITE.name}`,
    description: SITE.description,
  },
  icons: {
    icon: [{ url: asset("/icon.svg"), type: "image/svg+xml" }],
  },
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } } : {}),
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {GTM_ID ? (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        ) : null}
        <OrganizationJsonLd />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <StickyCta />
        <RevealObserver />
        {process.env.NEXT_PUBLIC_STATIC_EXPORT === "1" ? null : <Analytics />}
      </body>
    </html>
  );
}
