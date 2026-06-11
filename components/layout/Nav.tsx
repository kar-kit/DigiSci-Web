'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const NAV_LINKS = [
  { label: 'Approach', href: '/approach' },
  { label: 'Sectors',  href: '/sectors' },
  { label: 'About',    href: '/about' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      aria-label="Site navigation"
      className={[
        'fixed top-0 inset-x-0 z-[100] h-[72px]',
        'transition-[background,backdrop-filter,border-color] duration-[180ms]',
        scrolled
          ? 'bg-[rgba(10,22,40,0.92)] backdrop-blur-[12px] border-b border-[--border-subtle]'
          : 'bg-transparent border-b border-transparent',
      ].join(' ')}
    >
      <div className="max-w-[1240px] mx-auto h-full px-10 flex items-center">
        <Link href="/" aria-label="DigiSci — back to homepage" className="shrink-0">
          <Image
            src="/assets/logo-lockup.svg"
            alt="DigiSci"
            width={174}
            height={30}
            priority
          />
        </Link>

        <nav aria-label="Primary" className="ml-auto flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="font-sans text-sm tracking-[0.04em] text-[--text-secondary] hover:text-[--text-primary] transition-colors duration-[120ms]"
            >
              {label}
            </Link>
          ))}
          <Button variant="primary" size="sm" as="a" href="/contact">
            Request a briefing
          </Button>
        </nav>
      </div>
    </header>
  );
}
