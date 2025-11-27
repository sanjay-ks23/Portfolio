import type { Metadata } from "next";
import { Playfair_Display, JetBrains_Mono, Cinzel } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Dev Chronicles | Shorya Bansal",
  description: "A digital newspaper portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${jetbrains.variable} ${cinzel.variable} antialiased text-ink font-serif overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
