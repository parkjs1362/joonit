import { getAllPosts } from '@/lib/posts';
import { siteConfig } from '@/lib/config';

export const runtime = 'nodejs';

function cdata(value: string) {
  // CDATA can't contain "]]>", so split if it ever appears.
  return `<![CDATA[${value.replace(/]]>/g, ']]]]><![CDATA[>')}]]>`;
}

export async function GET() {
  const posts = await getAllPosts();
  const now = new Date().toUTCString();

  const itemsXml = posts
    .map((post) => {
      const url = `${siteConfig.url}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();

      return [
        '<item>',
        `<title>${cdata(post.title)}</title>`,
        `<link>${url}</link>`,
        `<guid isPermaLink="true">${url}</guid>`,
        `<pubDate>${pubDate}</pubDate>`,
        post.category ? `<category>${cdata(post.category)}</category>` : '',
        post.description ? `<description>${cdata(post.description)}</description>` : '',
        '</item>',
      ]
        .filter(Boolean)
        .join('');
    })
    .join('');

  const rssXml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '<channel>',
    `<title>${cdata(siteConfig.title)}</title>`,
    `<link>${siteConfig.url}</link>`,
    `<description>${cdata(siteConfig.description)}</description>`,
    '<language>ko-KR</language>',
    `<lastBuildDate>${now}</lastBuildDate>`,
    '<generator>Next.js</generator>',
    itemsXml,
    '</channel>',
    '</rss>',
  ].join('');

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      // Cache on CDN but keep it reasonably fresh.
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

