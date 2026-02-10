'use client';

import type { ReactNode } from 'react';
import React, { isValidElement, useMemo, useState } from 'react';

type CodeLikeElement = React.ReactElement<{
  className?: string;
  children?: ReactNode;
}>;

function nodeToText(node: ReactNode): string {
  if (node === null || node === undefined) return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join('');
  if (isValidElement<{ children?: ReactNode }>(node)) return nodeToText(node.props.children);
  return '';
}

function findCodeElement(node: ReactNode): CodeLikeElement | null {
  if (node === null || node === undefined) return null;

  if (Array.isArray(node)) {
    for (const child of node) {
      const found = findCodeElement(child);
      if (found) return found;
    }
    return null;
  }

  if (!isValidElement<{ children?: ReactNode }>(node)) return null;

  if (node.type === 'code') {
    return node as CodeLikeElement;
  }

  return findCodeElement(node.props.children);
}

function languageFromClassName(className?: string): string | undefined {
  if (!className) return undefined;
  const match =
    className.match(/(?:^|\\s)language-([a-z0-9_-]+)(?:\\s|$)/i) ||
    className.match(/(?:^|\\s)lang-([a-z0-9_-]+)(?:\\s|$)/i);
  if (!match) return undefined;

  const raw = match[1].toLowerCase();
  const map: Record<string, string> = {
    js: 'JavaScript',
    jsx: 'JSX',
    ts: 'TypeScript',
    tsx: 'TSX',
    bash: 'Shell',
    sh: 'Shell',
    zsh: 'Shell',
    json: 'JSON',
    yaml: 'YAML',
    yml: 'YAML',
    md: 'Markdown',
    html: 'HTML',
    css: 'CSS',
  };
  return map[raw] ?? raw.toUpperCase();
}

async function copyToClipboard(text: string) {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  // Fallback for older browsers.
  const el = document.createElement('textarea');
  el.value = text;
  el.setAttribute('readonly', 'true');
  el.style.position = 'fixed';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

export default function CodeBlock({ children }: { children: ReactNode }) {
  const codeEl = useMemo(() => findCodeElement(children), [children]);
  const language = useMemo(
    () => languageFromClassName(codeEl?.props?.className),
    [codeEl],
  );
  const codeText = useMemo(() => {
    const raw = codeEl ? nodeToText(codeEl.props.children) : nodeToText(children);
    // Avoid an extra trailing newline when copying.
    return raw.replace(/\\n$/, '');
  }, [children, codeEl]);

  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    if (!codeText.trim()) return;
    try {
      await copyToClipboard(codeText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // Ignore copy errors (clipboard permissions, etc.)
    }
  };

  return (
    <div className="not-prose my-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-card/60 px-4 py-3">
        <span className="text-xs font-semibold tracking-wide text-muted uppercase">
          {language ?? 'Code'}
        </span>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/50 px-3 py-1.5 text-xs font-semibold text-muted hover:text-foreground hover:bg-card/70 transition-colors"
          aria-label="Copy code to clipboard"
        >
          {copied ? '복사됨' : '복사'}
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-4 12h6a2 2 0 002-2v-8a2 2 0 00-2-2h-6a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </button>
      </div>

      <pre className="overflow-x-auto p-5 text-sm leading-6 font-mono">
        {children}
      </pre>
    </div>
  );
}
