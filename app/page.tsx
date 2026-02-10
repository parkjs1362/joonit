import Link from 'next/link';
import Image from 'next/image';
import AnimatedSection from '@/components/AnimatedSection';
import { getAllPosts, getAllCategories } from '@/lib/posts';
import { getCoverAlt, getCoverImage } from '@/lib/covers';
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Hero Section */}
      <AnimatedSection className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] items-start mb-16">
        <div>
          <div className="flex items-center gap-3">
            <div
              aria-hidden="true"
              className="w-12 h-12 rounded-2xl border border-primary/20 bg-primary/10 text-primary flex items-center justify-center font-display text-xl"
            >
              J
            </div>
            <div>
              <p className="text-sm font-semibold leading-none">Joonit</p>
              <p className="text-xs text-muted mt-1">개발, 역사, 일상 기록</p>
            </div>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl font-semibold tracking-tight mt-6">
            안녕하세요,
            <span className="text-primary"> Joonit</span>입니다.
          </h1>
          <p className="text-lg text-muted leading-relaxed mt-6 max-w-xl">
            웹 개발과 제품 감각, 그리고 역사와 일상을 짧고 구체적인 글로 남깁니다.
            오래 읽어도 피곤하지 않은 레이아웃을 목표로 계속 다듬고 있습니다.
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
              <div className="grid gap-4 sm:grid-cols-3 max-w-xl">
                {categories.slice(0, 3).map((c) => {
                  const subtitle =
                    c === '개발'
                      ? '웹, UI, 성능, DX'
                      : c === '역사'
                        ? '기술과 사회의 교차점'
                        : c === '일상'
                          ? '습관, 기록, 생각 정리'
                          : '기록';

                  return (
                    <Link
                      key={c}
                      href={`/blog?category=${encodeURIComponent(c)}`}
                      className="group block overflow-hidden rounded-3xl border border-border bg-card/70 hover:bg-card/85 transition-colors"
                    >
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={getCoverImage({ category: c })}
                          alt={`${c} 카테고리 대표 이미지`}
                          fill
                          sizes="(max-width: 640px) 100vw, 33vw"
                          className="object-cover scale-[1.02] transition-transform duration-700 group-hover:scale-[1.08]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-black/10" />
                        <div className="absolute inset-0 p-5 flex flex-col justify-end">
                          <p className="text-sm font-semibold tracking-tight text-white">
                            {c}
                          </p>
                          <p className="mt-1 text-xs text-white/75">
                            {subtitle}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-sm">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-muted">
            추천 글
          </p>

          {featured && featuredCover ? (
            <Link
              href={`/blog/${featured.slug}`}
              className="group mt-4 block overflow-hidden rounded-3xl border border-border bg-card/70"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={featuredCover}
                  alt={getCoverAlt({ title: featured.title, category: featured.category })}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover scale-[1.02] transition-transform duration-700 group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-semibold tracking-[0.14em] uppercase text-white/75">
                    <time className="text-white/70">{featured.date}</time>
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/40" />
                    <span className="text-white/80">{featured.category}</span>
                  </div>
                  <p className="mt-3 font-display text-3xl font-semibold tracking-tight leading-[1.05] text-white drop-shadow-[0_1px_18px_rgba(0,0,0,0.32)] line-clamp-2">
                    {featured.title}
                  </p>
                  <p className="mt-3 text-sm text-white/75 leading-relaxed line-clamp-2">
                    {featured.description}
                  </p>
                </div>
              </div>
            </Link>
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
