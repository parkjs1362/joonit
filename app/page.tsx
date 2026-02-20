import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import HeroSection from '@/components/HeroSection';
import { getAllPosts, getAllCategories } from '@/lib/posts';
import { getCoverImage } from '@/lib/covers';
import HomePostsSection from './HomePostsSection';

function getCategoryMeta(
  posts: Array<{ category?: string; tags?: string[] }>,
  categories: string[]
) {
  const meta: Record<string, { summary: string; count: number }> = {};

  for (const category of categories) {
    const inCategory = posts.filter((post) => post.category === category);
    const count = inCategory.length;
    const tagCounter = new Map<string, number>();

    for (const post of inCategory) {
      for (const tag of post.tags ?? []) {
        const normalized = tag.trim();
        if (!normalized) continue;
        tagCounter.set(normalized, (tagCounter.get(normalized) ?? 0) + 1);
      }
    }

    const topTags = [...tagCounter.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([tag]) => tag);

    meta[category] = {
      summary: topTags.length > 0 ? topTags.join(', ') : `${count}편 발행`,
      count,
    };
  }

  return meta;
}

export default async function HomePage() {
  const posts = await getAllPosts();
  const categories = await getAllCategories();
  const featured = posts[0];
  const latestPosts = featured ? posts.slice(1) : posts;
  const featuredCover = featured
    ? getCoverImage({ category: featured.category, image: featured.image })
    : null;
  const categoriesWithPosts = categories.filter((category) =>
    posts.some((post) => post.category === category)
  );
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recentPostsCount = posts.filter((post) => {
    const published = new Date(`${post.date}T00:00:00`);
    return !Number.isNaN(published.getTime()) && published >= sevenDaysAgo;
  }).length;
  const categoryMeta = getCategoryMeta(posts, categories);

  return (
    <div data-layout-version="home-v5">
      {/* Hero — 전체 너비, 흰 배경 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection
          featured={featured}
          categories={categories}
          featuredCover={featuredCover}
          stats={{
            totalPosts: posts.length,
            categoryCount: categoriesWithPosts.length,
            recentPostsCount,
          }}
          categoryMeta={categoryMeta}
        />
      </div>

      {/* 구분선 */}
      <div className="border-t border-[rgba(0,0,0,0.08)] dark:border-white/[0.06]" />

      {/* 최신 글 섹션 — Apple 연회색 배경 */}
      <div className="bg-[#f5f5f7] dark:bg-transparent">
        <AnimatedSection
          delay={0.18}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
        >
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#6e6e73] dark:text-muted">
                Fresh Dispatch
              </p>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#1d1d1f] dark:text-foreground">
                최신 글
              </h2>
            </div>
            <Link
              href="/blog"
              className="focus-ring rounded-full border border-[rgba(0,0,0,0.12)] dark:border-border bg-white dark:bg-background/55 px-4 py-2 text-sm font-semibold text-[#0071e3] dark:text-primary transition-colors hover:text-[#0077ed] dark:hover:text-primary-hover hover:bg-[#f0f0f0] dark:hover:bg-background/75"
            >
              모든 글 보기 &rarr;
            </Link>
          </div>

          <HomePostsSection posts={latestPosts} categories={categories} />
        </AnimatedSection>
      </div>
    </div>
  );
}
