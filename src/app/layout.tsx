import "./globals.css";
import { Poppins, Saira } from "next/font/google";
import Topbar from "@/components/TopBar";
import Navbar from "@/components/Navbar";

export const poppins = Poppins({ subsets: ["latin"], weight: ["400","600","700"] });
export const saira   = Saira({ subsets: ["latin"], weight: ["600","700"] });

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