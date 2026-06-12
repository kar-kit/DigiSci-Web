import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Insights | AI-Enabled Biotech Operations | DigiSci',
  description: 'Practical perspectives on AI strategy, pharmaceutical manufacturing, and digital quality systems. Written for biotech and pharmaceutical operations leaders.',
};

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
