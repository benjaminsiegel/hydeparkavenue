import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const socialImage = "https://benjaminsiegel.github.io/hydeparkavenue/og.png";

export const metadata: Metadata = {
  title: "Hyde Park Avenue Action",
  description: "See what Boston plans to build on Hyde Park Avenue, compare the safer alternatives, and ask the City to act.",
  openGraph: {
    title: "Don’t pave over safety",
    description: "Compare Boston's Hyde Park Avenue plans and ask the City to build real pedestrian safety improvements.",
    images: [{ url: socialImage, width: 1200, height: 630, alt: "Don’t pave over safety - Hyde Park Avenue Action" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Don’t pave over safety",
    description: "Compare Boston's Hyde Park Avenue plans and ask the City to build real pedestrian safety improvements.",
    images: [socialImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
