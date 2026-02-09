import { slugifyHeading } from '@/lib/slugify';

export interface HeadingItem {
  id: string;
  text: string;
  level: 2 | 3;
}

function stripInlineMarkdown(text: string): string {
  return text
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // [text](url)
    .replace(/<[^>]+>/g, '') // inline JSX/HTML tags
    .trim();
}

export function extractHeadingsFromMDX(mdx: string): HeadingItem[] {
  const lines = mdx.split('\n');
  const headings: HeadingItem[] = [];
  let inFence = false;

  for (const raw of lines) {
    const line = raw.trim();
    if (line.startsWith('```')) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+)$/.exec(line);
    if (!match) continue;

    const level = match[1].length as 2 | 3;
    const text = stripInlineMarkdown(match[2].replace(/\s+#+\s*$/, ''));
    const id = slugifyHeading(text);
    headings.push({ id, text, level });
  }

  return headings;
}

export function estimateReadingMinutes(text: string): number {
  const normalized = text
    .replace(/```[\s\S]*?```/g, ' ') // code fences
    .replace(/`[^`]+`/g, ' ') // inline code
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Rough heuristic that works "ok" for mixed KR/EN:
  // - Treat English words by whitespace
  // - Treat Korean by character count
  const words = normalized.split(' ').filter(Boolean).length;
  const krChars = (normalized.match(/[\uac00-\ud7af]/g) || []).length;

  const minutesByWords = words / 220;
  const minutesByKr = krChars / 500; // ~500 Hangul chars/min as a rough read speed
  const minutes = Math.max(minutesByWords, minutesByKr);

  return Math.max(1, Math.round(minutes));
}

