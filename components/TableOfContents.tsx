import type { HeadingItem } from '@/lib/content';

interface TableOfContentsProps {
  headings: HeadingItem[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  if (!headings || headings.length === 0) return null;

  return (
    <nav aria-label="목차" className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm">
      <p className="text-xs font-semibold tracking-wide text-muted">
        목차
      </p>
      <ul className="mt-3 space-y-2 text-sm">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? 'pl-4' : ''}>
            <a
              href={`#${h.id}`}
              className="text-muted hover:text-foreground transition-colors"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
