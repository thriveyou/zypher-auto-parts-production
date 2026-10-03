import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "@/styles/fonts";
import Topbar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { defaultOgImage, siteConfig, siteJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Genuine Japanese Vehicle Parts in Sri Lanka`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  category: "auto parts",
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
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Genuine Japanese Vehicle Parts in Sri Lanka`,
    description: siteConfig.description,
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Genuine Japanese Vehicle Parts in Sri Lanka`,
    description: siteConfig.description,
    images: [defaultOgImage.url],
  },
  keywords: [
    "Zypher Imports",
    "genuine car parts Sri Lanka",
    "Japanese car parts Sri Lanka",
    "bike parts Sri Lanka",
    "OEM parts Sri Lanka",
    "Japanese spare parts Sri Lanka",
    "car spare parts Sri Lanka",
    "motorbike parts Sri Lanka",
    "import vehicle parts Japan to Sri Lanka",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[110] focus:rounded focus:bg-white focus:p-3 focus:text-[#9A0111]">
          Skip to content
        </a>
        <Topbar />
        <Navbar />
        {children}
        <Footer />
        <Analytics />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </body>
    </html>
  );
}
