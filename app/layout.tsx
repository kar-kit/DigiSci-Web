import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, Source_Serif_4 } from 'next/font/google';
import Script from 'next/script';
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { GA_ID } from '@/lib/gtag';

const fontSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const fontSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const fontMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

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
    <html lang="en" className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable}`}>
      <body>
        <Nav />
        {children}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
        />
        {GA_ID && (
          <>
            <Script id="ga-consent" strategy="beforeInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                wait_for_update: 500,
              });
            `}</Script>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-config" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { send_page_view: true });
            `}</Script>
          </>
        )}
      </body>
    </html>
  );
}
