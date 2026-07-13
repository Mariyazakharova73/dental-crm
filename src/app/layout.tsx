import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/app/providers";
import "@/app/styles/globals.css";
import { QueryProvider } from "./providers/query-provider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Dental CRM",
  description: "CRM для управления стоматологической клиникой",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
