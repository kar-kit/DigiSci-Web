import Image from 'next/image';
import Link from 'next/link';

const PAGE_LINKS = [
  { label: 'Home',               href: '/' },
  { label: 'About',              href: '/about' },
  { label: 'Services',           href: '/services' },
  { label: 'Industry Expertise', href: '/industry' },
  { label: 'Case Studies',       href: '/case-studies' },
  { label: 'Insights',           href: '/insights' },
  { label: 'Contact',            href: '/contact' },
];

export function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="bg-[--surface-sunken] border-t border-[--border-subtle]"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Wordmark */}
          <Link href="/" aria-label="DigiSci — back to homepage" className="shrink-0 self-start">
            <Image
              src="/assets/logo-lockup.svg"
              alt="DigiSci"
              width={140}
              height={24}
            />
          </Link>

          {/* Page links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {PAGE_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-sans text-sm tracking-[0.04em] text-[--text-secondary] hover:text-[--text-primary] transition-colors duration-[120ms]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[--border-subtle] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs tracking-[0.04em] text-[--text-tertiary]">
            © {new Date().getFullYear()} DigiSci Solutions Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
