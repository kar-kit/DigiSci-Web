import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact DigiSci | Book a Discovery Call',
  description: 'Start a conversation. Book a 30-minute discovery call or send an enquiry about AI strategy, digital operations, or manufacturing transformation.',
  openGraph: {
    type: 'website',
    url: '/contact',
    title: 'Contact DigiSci | Book a Discovery Call',
    description: 'Start a conversation. Book a 30-minute discovery call or send an enquiry about AI strategy, digital operations, or manufacturing transformation.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
