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
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Prevent body scroll while overlay is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header
        aria-label="Site navigation"
        className={[
          'fixed top-0 inset-x-0 z-[100] h-[72px]',
          'transition-[background,backdrop-filter,border-color] duration-[180ms]',
          scrolled || open
            ? 'bg-[rgba(10,22,40,0.96)] backdrop-blur-[12px] border-b border-[--border-subtle]'
            : 'bg-transparent border-b border-transparent',
        ].join(' ')}
      >
        <div className="max-w-[1240px] mx-auto h-full px-6 md:px-10 flex items-center">
          {/* Logo */}
          <Link href="/" aria-label="DigiSci — back to homepage" className="shrink-0">
            <Image
              src="/assets/logo-lockup.svg"
              alt="DigiSci"
              width={174}
              height={30}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="ml-auto hidden md:flex items-center gap-8">
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

          {/* Mobile hamburger / close button */}
          <button
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            aria-controls="mobile-nav-overlay"
            onClick={() => setOpen(o => !o)}
            className="ml-auto md:hidden flex flex-col justify-center items-center w-11 h-11 gap-[6px] rounded-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent]"
          >
            <span className={[
              'block w-6 h-px bg-[--text-primary] transition-[transform,opacity] duration-[180ms] origin-center',
              open ? 'translate-y-[7px] rotate-45' : '',
            ].join(' ')} />
            <span className={[
              'block w-6 h-px bg-[--text-primary] transition-opacity duration-[180ms]',
              open ? 'opacity-0' : '',
            ].join(' ')} />
            <span className={[
              'block w-6 h-px bg-[--text-primary] transition-[transform,opacity] duration-[180ms] origin-center',
              open ? '-translate-y-[7px] -rotate-45' : '',
            ].join(' ')} />
          </button>
        </div>
      </header>

      {/* Full-screen mobile overlay */}
      <div
        id="mobile-nav-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!open}
        className={[
          'fixed inset-0 z-[99] md:hidden',
          'bg-[--surface-base] flex flex-col',
          'transition-[opacity,transform] duration-[280ms]',
          open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none',
        ].join(' ')}
      >
        {/* Overlay header spacer (height of fixed nav) */}
        <div className="h-[72px] shrink-0" />

        {/* Nav links */}
        <nav aria-label="Mobile navigation" className="flex-1 flex flex-col px-6 py-8 overflow-y-auto">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="font-sans font-semibold text-[32px] leading-[1.1] tracking-[-0.01em] text-[--text-primary] py-5 border-b border-[--border-subtle] hover:text-[--accent] transition-colors duration-[120ms]"
            >
              {label}
            </Link>
          ))}

          <div className="mt-auto pt-10">
            <Button
              variant="primary"
              size="lg"
              as="a"
              href="/contact"
              onClick={() => setOpen(false)}
              className="w-full justify-center"
            >
              Request a briefing
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}
