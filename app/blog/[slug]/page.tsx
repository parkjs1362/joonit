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

  const allPosts = await getAllPosts();
  const index = allPosts.findIndex((p) => p.slug === slug);
  const newerPost = index > 0 ? allPosts[index - 1] : null;
  const olderPost = index >= 0 && index < allPosts.length - 1 ? allPosts[index + 1] : null;
  const relatedPosts = allPosts
    .filter((p) => p.category === post.frontmatter.category && p.slug !== slug)
    .slice(0, 3);

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
      <article className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="min-w-0">
            <div className="mx-auto max-w-[72ch]">
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
                    <Link
                      href={`/blog?category=${encodeURIComponent(post.frontmatter.category)}`}
                      className="px-2.5 py-0.5 rounded-full border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                    >
                      {post.frontmatter.category}
                    </Link>
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
                        <Link
                          key={tag}
                          href={`/blog?q=${encodeURIComponent(tag)}`}
                          className="px-2.5 py-1 text-xs rounded-full border border-border bg-card/70 text-muted"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  )}
                </header>
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <div className="mt-10 prose prose-lg max-w-none">
                  {content}
                </div>

                {(newerPost || olderPost || relatedPosts.length > 0) && (
                  <div className="mt-16 space-y-8">
                    {(newerPost || olderPost) && (
                      <div className="grid gap-4 sm:grid-cols-2">
                        {newerPost && (
                          <Link
                            href={`/blog/${newerPost.slug}`}
                            className="group rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-sm hover:border-primary/25 hover:shadow-lg hover:shadow-primary/10 transition-colors"
                          >
                            <p className="text-xs font-semibold tracking-wide text-muted uppercase">
                              더 최근 글
                            </p>
                            <p className="mt-2 font-display text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                              {newerPost.title}
                            </p>
                            <p className="mt-3 text-sm text-muted line-clamp-2">
                              {newerPost.description}
                            </p>
                          </Link>
                        )}

                        {olderPost && (
                          <Link
                            href={`/blog/${olderPost.slug}`}
                            className="group rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-sm hover:border-primary/25 hover:shadow-lg hover:shadow-primary/10 transition-colors"
                          >
                            <p className="text-xs font-semibold tracking-wide text-muted uppercase">
                              이전 글
                            </p>
                            <p className="mt-2 font-display text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                              {olderPost.title}
                            </p>
                            <p className="mt-3 text-sm text-muted line-clamp-2">
                              {olderPost.description}
                            </p>
                          </Link>
                        )}
                      </div>
                    )}

                    {relatedPosts.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold">같은 카테고리의 다른 글</p>
                        <div className="mt-4 grid gap-4 md:grid-cols-3">
                          {relatedPosts.map((p) => (
                            <Link
                              key={p.slug}
                              href={`/blog/${p.slug}`}
                              className="group rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-sm hover:border-primary/25 hover:shadow-lg hover:shadow-primary/10 transition-colors"
                            >
                              <p className="text-sm text-muted">{p.date}</p>
                              <p className="mt-2 font-display text-lg font-semibold tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                                {p.title}
                              </p>
                              <p className="mt-3 text-sm text-muted line-clamp-2">
                                {p.description}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </AnimatedSection>
            </div>
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
