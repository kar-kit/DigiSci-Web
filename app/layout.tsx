import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL('https://digisci.solutions'),
  title: "DigiSci Consulting — AI for Regulated Manufacturing",
  description:
    "AI-first boutique consultancy at the intersection of cell & gene therapy manufacturing, pharmaceutical operations, and artificial intelligence.",
  openGraph: {
    siteName: 'DigiSci',
    type: 'website',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'DigiSci — AI for Biotech & Pharma Operations' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DigiSci',
  url: 'https://digisci.solutions',
  logo: {
    '@type': 'ImageObject',
    url: 'https://digisci.solutions/assets/logo-lockup.svg',
  },
  sameAs: ['https://www.linkedin.com/in/kwok-pang'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
        />
      </body>
    </html>
  );
}
