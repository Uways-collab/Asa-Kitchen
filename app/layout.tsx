import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Beauty Endowed | Luxury Wellness Sanctuary in Ketu, Lagos",
  description:
    "Discover personalized skincare, restorative massage, hammam-inspired rituals, and thoughtful self-care experiences at Beauty Endowed — a private wellness sanctuary in Ketu, Lagos, Nigeria.",
  keywords: [
    "beauty sanctuary Lagos",
    "spa Ketu Lagos",
    "massage Lagos",
    "facial treatment Lagos",
    "wellness Ketu",
    "hammam Lagos",
    "Beauty Endowed",
  ],
  openGraph: {
    title: "Beauty Endowed | Luxury Wellness Sanctuary",
    description:
      "A private beauty and wellness sanctuary in Ketu, Lagos offering personalized skincare, massage, hammam rituals, and luxury self-care experiences.",
    type: "website",
    locale: "en_NG",
    siteName: "Beauty Endowed",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#233D32",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://beautyendowed.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Manrope:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
