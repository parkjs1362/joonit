import Link from 'next/link';
import Image from 'next/image';
import AnimatedSection from '@/components/AnimatedSection';
import { getAllPosts, getAllCategories } from '@/lib/posts';
import { getCoverAlt, getCoverImage } from '@/lib/covers';
import HomePostsSection from './HomePostsSection';

const categoryLead: Record<string, string> = {
  개발: '웹, UI, 성능, DX',
  역사: '사실 기반 스토리텔링',
  일상: '질문, 루틴, 기록',
};

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
      data-layout-version="home-v3"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14"
    >
      <AnimatedSection className="mb-14 rounded-[2rem] chromatic-surface hero-glow p-5 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full glass-edge px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.16em] uppercase">
                Joonit Journal
              </span>
            </div>

            <h1 className="mt-6 font-display text-[clamp(2.1rem,5.4vw,4.2rem)] font-semibold tracking-tight leading-[0.98]">
              읽히는 구조와
              <br />
              <span className="text-primary">기억되는 색감</span>으로
              <br />
              블로그를 다듬습니다.
            </h1>

            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-muted">
              개발, 역사, 일상을 실제 운영 경험 중심으로 정리합니다. 카드 레이아웃과
              타이포를 계속 개선해, 정보 밀도와 가독성이 함께 남도록 설계합니다.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/blog"
                className="focus-ring rounded-2xl bg-primary px-5 py-3 text-white dark:text-background font-semibold shadow-sm transition-colors hover:bg-primary-hover"
              >
                최신 글 보기
              </Link>
              <Link
                href="/about"
                className="focus-ring rounded-2xl border border-border bg-background/55 px-5 py-3 font-semibold transition-colors hover:bg-background/80"
              >
                소개 보기
              </Link>
              <Link
                href="/contact"
                className="focus-ring rounded-2xl border border-border bg-background/45 px-5 py-3 font-semibold text-muted transition-colors hover:text-foreground hover:bg-background/75"
              >
                연락하기
              </Link>
            </div>

            {categories.length > 0 && (
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {categories.slice(0, 3).map((category) => (
                  <Link
                    key={category}
                    href={`/blog?category=${encodeURIComponent(category)}`}
                    className="focus-ring card-hover glass-edge group block overflow-hidden rounded-3xl"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={getCoverImage({ category })}
                        alt={`${category} 카테고리 대표 이미지`}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover scale-[1.02] transition-transform duration-700 group-hover:scale-[1.08]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/15 to-black/10" />
                      <div className="absolute inset-0 p-4 flex flex-col justify-end">
                        <p className="text-sm font-semibold tracking-tight text-white">{category}</p>
                        <p className="mt-1 text-xs text-white/75">
                          {categoryLead[category] ?? '기록'}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-5 grid gap-4">
            {featured && featuredCover ? (
              <Link
                href={`/blog/${featured.slug}`}
                className="focus-ring card-hover glass-edge group block overflow-hidden rounded-3xl"
              >
                <div className="relative aspect-[16/11] sm:aspect-[4/3]">
                  <Image
                    src={featuredCover}
                    alt={getCoverAlt({ title: featured.title, category: featured.category })}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover scale-[1.02] transition-transform duration-700 group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/18 to-black/8" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-semibold tracking-[0.14em] uppercase text-white/75">
                      <time className="text-white/70">{featured.date}</time>
                      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/40" />
                      <span className="text-white/80">{featured.category}</span>
                    </div>
                    <p className="mt-3 font-display text-2xl sm:text-3xl font-semibold tracking-tight leading-[1.06] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.42)] line-clamp-3">
                      {featured.title}
                    </p>
                    <p className="mt-3 text-sm text-white/78 leading-relaxed line-clamp-2">
                      {featured.description}
                    </p>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="glass-edge rounded-3xl p-6">
                <p className="text-sm text-muted">추천할 글이 아직 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection
        delay={0.18}
        className="rounded-[2rem] chromatic-surface p-5 sm:p-8 lg:p-10"
      >
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-muted">
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
