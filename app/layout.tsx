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

const socialTitle = "Hyde Park Avenue: We organized. The City listened.";
const socialDescription = "Neighbors helped secure safety improvements in Hyde Park Avenue’s fall 2026 repaving. Read the update and explore the campaign archive.";
const socialImage = "https://foresthills.boston/hyde-park-avenue-october-2026.jpg";

export const metadata: Metadata = {
  title: socialTitle,
  description: socialDescription,
  openGraph: {
    title: socialTitle,
    description: socialDescription,
    images: [{ url: socialImage, width: 2000, height: 1500, alt: socialTitle }],
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
