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

const socialTitle = "Hyde Park Avenue: No repaving without safety improvements";
const socialDescription = "Compare Boston’s current resurfacing plan with safer alternatives and tell Mayor Wu’s Streets Team to do better.";
const socialImage = "https://benjaminsiegel.github.io/hydeparkavenue/og-hyde-park-avenue.png";

export const metadata: Metadata = {
  title: socialTitle,
  description: socialDescription,
  openGraph: {
    title: socialTitle,
    description: socialDescription,
    images: [{ url: socialImage, width: 1200, height: 630, alt: socialTitle }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description: socialDescription,
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
