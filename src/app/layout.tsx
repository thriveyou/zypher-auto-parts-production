import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "@/styles/fonts";
import Topbar from "@/components/TopBar";
import Navbar from "@/components/Navbar";


export const metadata: Metadata = {
  title: {
    default: "Zypher Auto Parts – Genuine Japanese Vehicle Parts in Sri Lanka",
    template: "%s | Zypher Auto Parts",
  },
  description:
    "Zypher Auto Parts supplies genuine Japanese car and bike parts in Sri Lanka. OEM verified, direct import, fast delivery.",
  keywords: [
    "Zypher Auto Parts",
    "Japanese auto parts Sri Lanka",
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
      </body>
    </html>
  );
}
