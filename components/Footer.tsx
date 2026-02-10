import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export default function Footer() {
  return (
    <footer className="border-t border-border/70 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold tracking-tight">
              {siteConfig.title}
            </p>
            <p className="text-sm text-muted mt-1 max-w-md">
              {siteConfig.description}
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
            <Link href="/blog" className="hover:text-foreground transition-colors">
              글
            </Link>
            <Link href="/about" className="hover:text-foreground transition-colors">
              소개
            </Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">
              연락
            </Link>
            <span
              aria-hidden="true"
              className="h-4 w-px bg-border/90"
            />
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              개인정보처리방침
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              이용약관
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${siteConfig.author.email}`}
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-border bg-card/40 text-muted hover:text-foreground hover:bg-card/70 transition-colors"
              aria-label="Email"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>
          </div>
        </div>

        <p className="mt-10 text-xs text-muted">
          &copy; {new Date().getFullYear()} {siteConfig.title}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
