import Image from 'next/image';
import Link from 'next/link';
import { Mail } from 'lucide-react';

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
        <div className="mt-12 pt-6 border-t border-[--border-subtle] flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs tracking-[0.04em] text-[--text-tertiary]">
            © {new Date().getFullYear()} DigiSci Solutions Ltd. All rights reserved.
          </p>

          {/* Contact links */}
          <div className="flex items-center gap-5">
            <a
              href="mailto:hello@digisci.solutions"
              aria-label="Email DigiSci"
              className="flex items-center gap-1.5 font-mono text-xs tracking-[0.04em] text-[--text-secondary] hover:text-[--text-primary] transition-colors duration-[120ms]"
            >
              <Mail size={14} aria-hidden="true" />
              hello@digisci.solutions
            </a>
            <a
              href="https://www.linkedin.com/company/digisci-solutions"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="DigiSci on LinkedIn (opens in new tab)"
              className="text-[--text-secondary] hover:text-[--text-primary] transition-colors duration-[120ms]"
            >
              {/* LinkedIn logomark — not in lucide-react, inlined directly */}
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
