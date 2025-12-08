import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "@/styles/fonts";
import Topbar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next"


export const metadata: Metadata = {
  title: {
    default: "Zypher Imports – Genuine Japanese Vehicle Parts in Sri Lanka",
    template: "%s | Zypher Imports",
  },
  description:
    "Zypher Imports supplies genuine Japanese car and bike parts in Sri Lanka. OEM verified, direct import, fast delivery.",
  keywords: [
    "Zypher Imports",
    "Japanese Imports Sri Lanka",
    "genuine car parts",
    "bike parts direct from Japan",
    "OEM vehicle parts Sri Lanka",
  ],
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Topbar />
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
