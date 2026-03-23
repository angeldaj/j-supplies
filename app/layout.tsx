import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";

import "./globals.css";
import { Shell } from "@/components/layout/shell";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "J Supplies - Cuidado Personal",
  description: "Tienda profesional de cuidado personal recurrente con experiencia premium para clientes y operacion.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${display.variable} ${body.variable} theme`}>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
