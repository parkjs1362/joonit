import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { parseMDX } from '@/lib/mdx';
import { siteConfig } from '@/lib/config';
import AnimatedSection from '@/components/AnimatedSection';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: '글을 찾을 수 없습니다',
    };
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: post.frontmatter.date,
      url: `${siteConfig.url}/blog/${slug}`,
      ...(post.frontmatter.image && { images: [post.frontmatter.image] }),
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { content } = await parseMDX(post.content);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
    },
    url: `${siteConfig.url}/blog/${slug}`,
    ...(post.frontmatter.tags && { keywords: post.frontmatter.tags.join(', ') }),
  };

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AnimatedSection>
        <Link
          href="/blog"
          className="inline-flex items-center text-muted hover:text-foreground transition-colors mb-8"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          블로그로 돌아가기
        </Link>

        <header className="mb-8">
          <time className="text-sm text-muted">{post.frontmatter.date}</time>
          <h1 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">
            {post.frontmatter.title}
          </h1>
          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.frontmatter.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <div className="prose prose-lg max-w-none">{content}</div>
      </AnimatedSection>
    </article>
  );
}
