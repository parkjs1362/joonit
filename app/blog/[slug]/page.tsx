import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { parseMDX } from '@/lib/mdx';
import { siteConfig } from '@/lib/config';
import AnimatedSection from '@/components/AnimatedSection';
import ReadingProgress from '@/components/ReadingProgress';
import TableOfContents from '@/components/TableOfContents';
import { extractHeadingsFromMDX, estimateReadingMinutes } from '@/lib/content';

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
  const headings = extractHeadingsFromMDX(post.content);
  const readingMinutes = estimateReadingMinutes(post.content);

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
    <>
      <ReadingProgress />
      <article className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="min-w-0">
            <AnimatedSection>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors"
              >
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                글 목록으로
              </Link>

              <header className="mt-8">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
                  <time>{post.frontmatter.date}</time>
                  <span className="h-1 w-1 rounded-full bg-border" />
                  <span className="px-2.5 py-0.5 rounded-full border border-primary/20 bg-primary/5 text-primary">
                    {post.frontmatter.category}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-border" />
                  <span>{readingMinutes}분 읽기</span>
                </div>

                <h1 className="font-display mt-4 text-4xl sm:text-5xl font-semibold tracking-tight">
                  {post.frontmatter.title}
                </h1>

                {post.frontmatter.description && (
                  <p className="mt-5 text-lg text-muted leading-relaxed">
                    {post.frontmatter.description}
                  </p>
                )}

                {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {post.frontmatter.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs rounded-full border border-border bg-card/70 text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="mt-10 prose prose-lg max-w-none">
                {content}
              </div>
            </AnimatedSection>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              <TableOfContents headings={headings} />

              <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm">
                <p className="text-sm font-semibold">{siteConfig.author.name}</p>
                <p className="mt-1 text-sm text-muted leading-relaxed">
                  {siteConfig.description}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
