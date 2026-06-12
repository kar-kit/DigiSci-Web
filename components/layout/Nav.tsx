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

  // Close drawer on route change / resize above mobile breakpoint
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

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

          {/* Mobile hamburger */}
          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(o => !o)}
            className="ml-auto md:hidden flex flex-col justify-center items-center w-11 h-11 gap-[6px] rounded-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent]"
          >
            <span className={[
              'block w-6 h-px bg-[--text-primary] transition-[transform,opacity] duration-[180ms]',
              open ? 'translate-y-[7px] rotate-45' : '',
            ].join(' ')} />
            <span className={[
              'block w-6 h-px bg-[--text-primary] transition-opacity duration-[180ms]',
              open ? 'opacity-0' : '',
            ].join(' ')} />
            <span className={[
              'block w-6 h-px bg-[--text-primary] transition-[transform,opacity] duration-[180ms]',
              open ? '-translate-y-[7px] -rotate-45' : '',
            ].join(' ')} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={[
          'fixed top-[72px] inset-x-0 z-[99] md:hidden',
          'bg-[rgba(10,22,40,0.98)] backdrop-blur-[12px]',
          'border-b border-[--border-subtle]',
          'transition-[opacity,transform] duration-[180ms]',
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none',
        ].join(' ')}
      >
        <nav aria-label="Mobile primary" className="max-w-[1240px] mx-auto px-6 py-6 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="font-sans text-base tracking-[0.04em] text-[--text-secondary] hover:text-[--text-primary] py-3 border-b border-[--border-subtle] last:border-0 transition-colors duration-[120ms]"
            >
              {label}
            </Link>
          ))}
          <div className="pt-4">
            <Button variant="primary" size="lg" as="a" href="/contact" className="w-full justify-center">
              Request a briefing
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}
