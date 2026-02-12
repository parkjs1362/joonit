import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import Image from 'next/image';
import { slugifyHeading } from '@/lib/slugify';
import type { ElementType, ReactNode } from 'react';
import CodeBlock from '@/components/CodeBlock';

function getText(node: unknown): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(getText).join('');
  if (node && typeof node === 'object' && 'props' in node) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return getText((node as any).props?.children);
  }
  return '';
}

function HeadingLink({
  level,
  children,
  className,
}: {
  level: 1 | 2 | 3;
  children: ReactNode;
  className: string;
}) {
  const text = getText(children);
  const id = slugifyHeading(text);
  const Tag = (`h${level}` as unknown) as ElementType;

  return (
    <Tag
      id={id}
      className={`font-display scroll-mt-28 group ${className}`}
      >
        <a
          href={`#${id}`}
          className="no-underline text-inherit hover:text-inherit"
        >
          {children}
        </a>
      <span
        aria-hidden="true"
        className="ml-2 align-middle text-muted opacity-0 group-hover:opacity-100 transition-opacity select-none"
      >
        #
      </span>
    </Tag>
  );
}

const components: MDXComponents = {
  h1: ({ children }) => (
    <HeadingLink
      level={1}
      className="text-3xl sm:text-4xl font-semibold tracking-tight mt-10 mb-4"
    >
      {children}
    </HeadingLink>
  ),
  h2: ({ children }) => (
    <HeadingLink
      level={2}
      className="text-2xl sm:text-3xl font-semibold tracking-tight mt-10 mb-3"
    >
      {children}
    </HeadingLink>
  ),
  h3: ({ children }) => (
    <HeadingLink
      level={3}
      className="text-xl sm:text-2xl font-semibold tracking-tight mt-8 mb-2"
    >
      {children}
    </HeadingLink>
  ),
  p: ({ children }) => (
    <p className="my-4 leading-[1.85]">{children}</p>
  ),
  a: ({ href, children }) => {
    const isExternal = href?.startsWith('http');
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary-hover underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors"
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href || '/'}
        className="text-primary hover:text-primary-hover underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors"
      >
        {children}
      </Link>
    );
  },
  ul: ({ children }) => (
    <ul className="my-4 ml-6 list-disc space-y-2">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 ml-6 list-decimal space-y-2">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-6 rounded-xl border border-border bg-card/60 px-5 py-4 text-foreground/85">
      <div className="flex gap-3">
        <span className="mt-2 h-2.5 w-2.5 flex-none rounded-full bg-primary/70" />
        <div className="[&>p]:my-0">{children}</div>
      </div>
    </blockquote>
  ),
  code: ({ children, className }) => {
    const isCodeBlock = className?.includes('language-');
    if (isCodeBlock) {
      return <code className={className}>{children}</code>;
    }
    return (
      <code className="px-1.5 py-0.5 rounded-md bg-card text-sm font-mono border border-border/70">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <CodeBlock>{children}</CodeBlock>
  ),
  img: ({ src, alt }) => {
    if (!src) return null;
    return (
      <Image
        src={src}
        alt={alt || ''}
        width={800}
        height={400}
        sizes="(max-width: 768px) 100vw, 800px"
        className="rounded-2xl my-6 border border-border"
      />
    );
  },
  hr: () => <hr className="my-8 border-border" />,
  table: ({ children }) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full border border-border">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="px-4 py-2 bg-card border border-border font-semibold text-left">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2 border border-border">{children}</td>
  ),
};

export default components;
