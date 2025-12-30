import type { Metadata } from "next";
import { Playfair_Display, Inter, Lora } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://interworld.co.ug'),
  title: {
    default: 'Interworld | Transforming Vision into Lasting Impact',
    template: '%s | Interworld',
  },
  description: 'Interworld is a purpose-driven African institution turning bold ideas into practical solutions that strengthen communities, empower industries, and shape a sustainable future.',
  keywords: ['innovation', 'research', 'sustainability', 'development', 'Uganda', 'East Africa', 'consulting', 'agriculture', 'circular economy'],
  authors: [{ name: 'Interworld Innovative Development Organisation' }],
  creator: 'Interworld',
  publisher: 'Interworld Innovative Development Organisation Limited',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://interworld.co.ug',
    siteName: 'Interworld',
    title: 'Interworld | Transforming Vision into Lasting Impact',
    description: 'A purpose-driven African institution turning bold ideas into practical solutions that strengthen communities and shape a sustainable future.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Interworld - Transforming Vision into Impact',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interworld | Transforming Vision into Lasting Impact',
    description: 'A purpose-driven African institution turning bold ideas into practical solutions.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
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
        className={`${playfair.variable} ${inter.variable} ${lora.variable} antialiased font-inter`}
      >
        {children}
      </body>
    </html>
  );
}
