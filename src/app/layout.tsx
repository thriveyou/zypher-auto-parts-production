// src/app/layout.tsx
import "./globals.css";
import { Poppins, Saira } from "next/font/google";

export const poppins = Poppins({ subsets: ["latin"], weight: ["400","600","700"] });
export const saira   = Saira({ subsets: ["latin"], weight: ["600","700"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
