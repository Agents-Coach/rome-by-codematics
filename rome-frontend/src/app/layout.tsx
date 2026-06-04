import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rome by Codematics — AI Sales Rep on WhatsApp",
  description:
    "Connect your WhatsApp number. Configure your offer. Rome's AI handles every message — qualifying leads, answering FAQs, and booking calls 24/7.",
  keywords: ["AI sales agent", "WhatsApp automation", "AI chatbot", "sales automation"],
  openGraph: {
    title: "Rome by Codematics — AI Sales Rep on WhatsApp",
    description: "Your AI sales rep that works 24/7 on WhatsApp.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#09090b] text-[#a1a1aa]">
        {children}
      </body>
    </html>
  );
}
