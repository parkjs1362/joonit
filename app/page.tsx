import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import { getAllPosts, getAllCategories } from '@/lib/posts';
import HomePostsSection from './HomePostsSection';

export default async function HomePage() {
  const posts = await getAllPosts();
  const categories = await getAllCategories();
  const featured = posts[0];
  const latestPosts = featured ? posts.slice(1) : posts;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Hero Section */}
      <AnimatedSection className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] items-start mb-16">
        <div>
          <p className="text-sm text-muted tracking-wide uppercase">
            개발, 역사, 일상 기록
          </p>
          <h1 className="font-display text-5xl sm:text-6xl font-semibold tracking-tight mt-4">
            개발과 일상,
            <span className="text-primary"> 기록</span>
          </h1>
          <p className="text-lg text-muted leading-relaxed mt-6 max-w-xl">
            일하면서 배운 것, 만들면서 느낀 것, 그리고 시간이 지나도 남겨두고 싶은 생각들을
            한곳에 모읍니다.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href="/blog"
              className="px-5 py-3 bg-primary text-white dark:text-background rounded-2xl hover:bg-primary-hover transition-colors shadow-sm"
            >
              글 보러가기
            </Link>
            <Link
              href="/about"
              className="px-5 py-3 border border-border bg-card/40 rounded-2xl hover:bg-card/70 transition-colors"
            >
              소개 보기
            </Link>
          </div>

          {categories.length > 0 && (
            <div className="mt-10">
              <p className="text-xs font-semibold tracking-wide text-muted uppercase mb-3">
                주제
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 8).map((c) => (
                  <Link
                    key={c}
                    href={`/blog?category=${encodeURIComponent(c)}`}
                    className="px-3 py-1.5 text-sm rounded-full border border-border bg-card/50 text-muted hover:text-foreground hover:bg-card/70 transition-colors"
                  >
                    {c}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-sm">
          <p className="text-xs font-semibold tracking-wide text-muted uppercase">
            추천 글
          </p>
          {featured ? (
            <div className="mt-4">
              <p className="text-sm text-muted">{featured.date}</p>
              <Link
                href={`/blog/${featured.slug}`}
                className="mt-2 block font-display text-2xl font-semibold tracking-tight hover:text-primary transition-colors"
              >
                {featured.title}
              </Link>
              <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-3">
                {featured.description}
              </p>
              <div className="mt-5">
                <Link
                  href={`/blog/${featured.slug}`}
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-hover transition-colors"
                >
                  계속 읽기
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
                      d="M13 7h6m0 0v6m0-6L10 20"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted">아직 글이 없습니다.</p>
          )}
        </div>
      </AnimatedSection>

      {/* Latest Posts Section */}
      <AnimatedSection delay={0.2}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
            최신 글
          </h2>
          <Link
            href="/blog"
            className="text-primary hover:text-primary-hover transition-colors"
          >
            모든 글 보기 &rarr;
          </Link>
        </div>

        <HomePostsSection posts={latestPosts} categories={categories} />
      </AnimatedSection>
    </div>
  );
}
