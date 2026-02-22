import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "@/styles/fonts";
import Topbar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next"

const siteUrl = "https://www.zypherimports.lk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Zypher Imports | Genuine Japanese Vehicle Parts in Sri Lanka",
    template: "%s | Zypher Imports",
  },
  description:
    "Zypher Imports supplies genuine Japanese car and bike parts in Sri Lanka. OEM verified, direct import, fast delivery with smooth customs and doorstep delivery.",
  applicationName: "Zypher Imports",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Zypher Imports",
    title: "Zypher Imports | Genuine Japanese Vehicle Parts in Sri Lanka",
    description:
      "Genuine Japanese car and bike parts, sourced from Japan, OEM verified, shipped fast to Sri Lanka.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Zypher Imports - Genuine Japanese Vehicle Parts in Sri Lanka",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zypher Imports | Genuine Japanese Vehicle Parts in Sri Lanka",
    description:
      "Genuine Japanese car and bike parts, sourced from Japan, OEM verified, shipped fast to Sri Lanka.",
    images: ["/og.jpg"],
  },
  keywords: [
    "Zypher Imports",
    "genuine car parts Sri Lanka",
    "Japanese car parts Sri Lanka",
    "bike parts Sri Lanka",
    "OEM parts Sri Lanka",
    "import vehicle parts Japan to Sri Lanka",
  ],
};
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  name: "Zypher Imports",
  url: "https://www.zypherimports.lk",
  telephone: ["+94701007202", "+817091117384"],
  areaServed: "Sri Lanka",
  description:
    "Zypher Imports supplies genuine Japanese car and bike parts in Sri Lanka. Direct sourcing from Japan with OEM verification and fast delivery.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Topbar />
        <Navbar />
        {children}
        <Footer />
        <Analytics />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
