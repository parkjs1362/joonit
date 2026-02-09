import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { siteConfig } from '@/lib/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const blogPosts = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const staticPages = [
    { url: siteConfig.url, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${siteConfig.url}/blog`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${siteConfig.url}/about`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${siteConfig.url}/privacy`, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${siteConfig.url}/terms`, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${siteConfig.url}/contact`, priority: 0.5, changeFrequency: 'monthly' as const },
  ].map((page) => ({
    ...page,
    lastModified: new Date(),
  }));

  return [...staticPages, ...blogPosts];
}
