import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import Image from 'next/image';

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-semibold mt-6 mb-3">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold mt-5 mb-2">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="my-4 leading-relaxed">{children}</p>
  ),
  a: ({ href, children }) => {
    const isExternal = href?.startsWith('http');
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary-hover underline underline-offset-2"
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href || '/'}
        className="text-primary hover:text-primary-hover underline underline-offset-2"
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
    <blockquote className="border-l-4 border-primary pl-4 my-4 italic text-muted">
      {children}
    </blockquote>
  ),
  code: ({ children, className }) => {
    const isCodeBlock = className?.includes('language-');
    if (isCodeBlock) {
      return <code className={className}>{children}</code>;
    }
    return (
      <code className="px-1.5 py-0.5 rounded bg-card text-sm font-mono">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="p-4 rounded-lg overflow-x-auto my-4 bg-card border border-border">
      {children}
    </pre>
  ),
  img: ({ src, alt }) => (
    <Image
      src={src || ''}
      alt={alt || ''}
      width={800}
      height={400}
      className="rounded-lg my-4"
    />
  ),
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
