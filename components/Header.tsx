'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const applyTheme = (newTheme: 'light' | 'dark' | 'system') => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');

    if (newTheme === 'system') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemDark) {
        root.classList.add('dark');
      }
    } else {
      root.classList.add(newTheme);
    }
  };

  useEffect(() => {
    // This runs only on the client; we use state here to avoid hydration mismatch for the icon.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    applyTheme(nextTheme);
  };

  const getThemeIcon = () => {
    if (!mounted) return null;

    if (theme === 'light') {
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    }
    if (theme === 'dark') {
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      );
    }
    return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    );
  };

  const navItems = [
    { href: '/blog', label: '글' },
    { href: '/about', label: '소개' },
    { href: '/contact', label: '연락' },
  ];

  return (
    <motion.header
      initial={reduceMotion ? { y: 0 } : { y: -100 }}
      animate={{ y: 0 }}
      transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 100, damping: 20 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-black/[0.06] dark:bg-[#07080d]/85 dark:border-white/[0.06]"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus-ring focus:absolute focus:left-4 focus:top-4 focus:z-[70] rounded-xl border border-border bg-card/90 px-4 py-2 text-sm font-semibold text-foreground backdrop-blur"
        >
          본문으로 건너뛰기
        </a>

        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="focus-ring text-lg sm:text-xl font-bold tracking-[-0.02em] text-[#1d1d1f] dark:text-foreground hover:text-primary transition-colors"
          >
            Joonit
          </Link>

          <div className="hidden sm:flex items-center gap-5">
            {navItems.map((item) => {
              const isActive =
                item.href === '/blog'
                  ? pathname.startsWith('/blog')
                  : pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`focus-ring group relative py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#1d1d1f] dark:text-foreground'
                      : 'text-[#1d1d1f]/75 dark:text-muted hover:text-[#1d1d1f] dark:hover:text-foreground'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 -bottom-0.5 h-px w-full bg-primary origin-left transition-transform ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <button
            onClick={toggleTheme}
            className="focus-ring p-2 rounded-xl border border-black/10 dark:border-border bg-[#f5f5f7]/60 dark:bg-card/60 hover:bg-[#f5f5f7] dark:hover:bg-card/80 transition-colors"
            aria-label="Toggle theme"
          >
            {getThemeIcon()}
          </button>
        </div>

        <div className="sm:hidden mt-3 flex gap-2 overflow-x-auto scrollbar-hide pb-2 -mb-2">
          {navItems.map((item) => {
            const isActive =
              item.href === '/blog' ? pathname.startsWith('/blog') : pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`focus-ring px-4 py-2 text-sm font-medium tracking-[0.01em] rounded-full border border-border bg-card/60 whitespace-nowrap transition-colors ${
                  isActive ? 'text-foreground' : 'text-muted hover:text-foreground'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </motion.header>
  );
}
