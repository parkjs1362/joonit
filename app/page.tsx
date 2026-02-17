import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import HeroSection from '@/components/HeroSection';
import { getAllPosts, getAllCategories } from '@/lib/posts';
import { getCoverImage } from '@/lib/covers';
import HomePostsSection from './HomePostsSection';

export default async function HomePage() {
  const posts = await getAllPosts();
  const categories = await getAllCategories();
  const featured = posts[0];
  const latestPosts = featured ? posts.slice(1) : posts;
  const featuredCover = featured
    ? getCoverImage({ category: featured.category, image: featured.image })
    : null;

  return (
    <div
      data-layout-version="home-v4"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14"
    >
      <HeroSection
        featured={featured}
        categories={categories}
        featuredCover={featuredCover}
      />

      <AnimatedSection
        delay={0.18}
        className="rounded-[2rem] chromatic-surface p-5 sm:p-8 lg:p-10"
      >
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-muted">
              Fresh Dispatch
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold tracking-tight">
              최신 글
            </h2>
          </div>
          <Link
            href="/blog"
            className="focus-ring rounded-full border border-border bg-background/55 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:text-primary-hover hover:bg-background/75"
          >
            모든 글 보기 &rarr;
          </Link>
        </div>

        <HomePostsSection posts={latestPosts} categories={categories} />
      </AnimatedSection>
    </div>
  );
}
