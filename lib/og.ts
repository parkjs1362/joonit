import { siteConfig } from '@/lib/config';

export function toAbsoluteUrl(input: string): string {
  if (!input) return siteConfig.url;
  if (input.startsWith('http://') || input.startsWith('https://')) return input;
  if (input.startsWith('/')) return `${siteConfig.url}${input}`;
  return `${siteConfig.url}/${input}`;
}

type GoogleFontParams = {
  family: string;
  weight?: number;
  text: string;
};

const fontCache = new Map<string, Promise<ArrayBuffer>>();

// Fetch a woff2 font file from Google Fonts for the exact text we render in OG images.
// This keeps payloads small and ensures Korean text renders correctly in ImageResponse.
export async function getGoogleFont({
  family,
  weight = 400,
  text,
}: GoogleFontParams): Promise<ArrayBuffer> {
  const key = `${family}:${weight}:${text}`;
  const cached = fontCache.get(key);
  if (cached) return cached;

  const promise = (async () => {
    const familyParam = encodeURIComponent(family).replace(/%20/g, '+');
    const cssUrl = `https://fonts.googleapis.com/css2?family=${familyParam}:wght@${weight}&text=${encodeURIComponent(
      text,
    )}&display=swap`;

    const css = await fetch(cssUrl, {
      headers: {
        // Some environments require a UA to return font CSS reliably.
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      // Fonts are public and cacheable; Edge/runtime can revalidate as needed.
      cache: 'force-cache',
    }).then((res) => res.text());

    const match = css.match(/src:\\s*url\\((.+?)\\)\\s*format\\('woff2'\\)/);
    if (!match?.[1]) {
      throw new Error(`Failed to find woff2 font URL for "${family}" (${weight}).`);
    }

    const fontUrl = match[1];
    return fetch(fontUrl, { cache: 'force-cache' }).then((res) => res.arrayBuffer());
  })();

  fontCache.set(key, promise);
  return promise;
}

