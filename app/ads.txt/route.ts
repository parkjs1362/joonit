import { siteConfig } from '@/lib/config';

export const runtime = 'nodejs';

export function GET() {
  return new Response(`${siteConfig.adsense.adsTxt}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=300',
    },
  });
}
