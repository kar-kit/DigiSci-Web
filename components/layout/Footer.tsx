import Image from 'next/image';
import Link from 'next/link';
import { Mail } from 'lucide-react';

const NAVIGATE_LINKS = [
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
      className="bg-[var(--surface-sunken)] border-t border-[var(--border-subtle)]"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 pt-16 pb-10">

        {/* Footer grid: brand + navigate + connect */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between mb-14">

          {/* Brand column */}
          <div className="flex flex-col gap-4 shrink-0 max-w-[200px]">
            <Link href="/" aria-label="DigiSci — back to homepage" className="self-start">
              <Image
                src="/assets/logomark.svg"
                alt="DigiSci"
                width={40}
                height={40}
              />
            </Link>
            <p className="font-serif text-sm leading-[1.65] text-[var(--text-secondary)]">
              AI-Native Transformation for Biotech Operations.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {/* Navigate column */}
            <nav aria-label="Footer navigation">
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)] mb-1">
                  Navigate
                </span>
                {NAVIGATE_LINKS.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="font-sans text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-[120ms]"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Connect column */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)] mb-1">
                Connect
              </span>
              <a
                href="https://www.linkedin.com/in/kwok-pang"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kwok Pang on LinkedIn (opens in new tab)"
                className="inline-flex items-center gap-2 font-sans text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-[120ms]"
              >
                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 .774v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn — Kwok Pang
              </a>
              <a
                href="mailto:hello@digisci.solutions"
                aria-label="Email DigiSci"
                className="inline-flex items-center gap-2 font-sans text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-[120ms]"
              >
                <Mail size={14} aria-hidden="true" />
                hello@digisci.solutions
              </a>
              <span className="font-sans text-sm text-[var(--text-tertiary)]">
                UK · United States · Europe
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="font-mono text-xs tracking-[0.04em] text-[var(--text-tertiary)]">
              © 2026 DigiSci Consulting
            </p>
            <Link
              href="/privacy"
              className="font-mono text-xs tracking-[0.04em] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors duration-[120ms]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookies"
              className="font-mono text-xs tracking-[0.04em] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors duration-[120ms]"
            >
              Cookie Policy
            </Link>
            <span className="font-mono text-xs tracking-[0.04em] text-[var(--text-tertiary)]">
              digisci.solutions
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
