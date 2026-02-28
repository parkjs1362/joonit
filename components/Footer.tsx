import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export default function Footer() {
  return (
    <footer className="border-t border-border/70 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap gap-2 mb-6">
          {['개발', '경제', '역사', '일상', '여행'].map((cat) => (
            <Link
              key={cat}
              href={`/blog?category=${encodeURIComponent(cat)}`}
              className="px-3 py-1.5 text-xs rounded-full border border-border bg-card/60 text-muted hover:text-foreground transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-lg font-semibold tracking-tight">
              {siteConfig.title}
            </p>
            <p className="text-sm text-muted mt-1 max-w-md">
              {siteConfig.description}
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium tracking-[0.02em] text-muted">
            <Link href="/blog" className="focus-ring hover:text-foreground transition-colors">
              글
            </Link>
            <Link href="/about" className="focus-ring hover:text-foreground transition-colors">
              소개
            </Link>
            <Link href="/contact" className="focus-ring hover:text-foreground transition-colors">
              연락
            </Link>
            <span
              aria-hidden="true"
              className="h-4 w-px bg-border/90"
            />
            <Link href="/privacy" className="focus-ring hover:text-foreground transition-colors">
              개인정보처리방침
            </Link>
            <Link href="/terms" className="focus-ring hover:text-foreground transition-colors">
              이용약관
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${siteConfig.author.email}`}
              className="focus-ring inline-flex items-center gap-2 rounded-xl border border-border bg-card/60 px-4 py-2 text-sm text-muted hover:text-foreground hover:bg-card/80 transition-colors"
            >
              <span className="text-xs font-semibold tracking-[0.03em]">
                Email
              </span>
              <span className="text-sm">{siteConfig.author.email}</span>
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
