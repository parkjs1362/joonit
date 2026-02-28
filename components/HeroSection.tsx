'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { getCoverAlt, getCoverImage } from '@/lib/covers';
import { getCategoryColor } from '@/lib/categoryColors';

const heroWords = ['읽히는', '구조와', '기억되는', '색감으로', '블로그를', '다듬습니다.'];
const accentWord = '기억되는';

interface HeroPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category?: string;
  image?: string;
}

interface HeroSectionProps {
  featured: HeroPost | null | undefined;
  categories: string[];
  featuredCover: string | null;
  stats: {
    totalPosts: number;
    categoryCount: number;
    recentPostsCount: number;
  };
  categoryMeta: Record<string, { summary: string; count: number }>;
}

export default function HeroSection({
  featured,
  categories,
  featuredCover,
  stats,
  categoryMeta,
}: HeroSectionProps) {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
        };

  return (
    <div className="w-full py-24 sm:py-32 text-center">
      {/* Badge */}
      <motion.div {...fadeUp(0)} className="flex justify-center">
        <span className="inline-flex items-center rounded-full border border-[rgba(0,0,0,0.1)] dark:border-white/10 bg-[#f5f5f7] dark:bg-white/5 px-4 py-1.5 text-[11px] font-semibold tracking-[0.08em] uppercase text-[#6e6e73] dark:text-muted">
          Joonit Journal
        </span>
      </motion.div>

      {/* Hero heading — word-by-word stagger */}
      <h1 className="mt-6 font-display text-[clamp(2.2rem,5vw,4rem)] font-extrabold tracking-[-0.04em] leading-[1.06] text-[#1d1d1f] dark:text-foreground">
        {heroWords.map((word, i) =>
          reduceMotion ? (
            <span
              key={word}
              style={{ marginRight: '0.25em' }}
              className={word === accentWord ? 'text-[#0071e3] dark:text-primary' : undefined}
            >
              {word}
            </span>
          ) : (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1 + i * 0.05,
                type: 'spring',
                stiffness: 200,
                damping: 20,
              }}
              style={{ display: 'inline-block', marginRight: '0.25em' }}
              className={word === accentWord ? 'text-[#0071e3] dark:text-primary' : undefined}
            >
              {word}
            </motion.span>
          )
        )}
      </h1>

      {/* Description */}
      <motion.p
        {...fadeUp(0.45)}
        className="mt-6 text-lg sm:text-xl text-[#6e6e73] dark:text-muted text-center max-w-2xl mx-auto leading-relaxed"
      >
        개발, 경제, 역사, 일상을 실제 운영 경험 중심으로 정리합니다. 카드 레이아웃과
        타이포를 계속 개선해, 정보 밀도와 가독성이 함께 남도록 설계합니다.
      </motion.p>

      {/* CTA Buttons — Apple pill style */}
      <motion.div {...fadeUp(0.6)} className="mt-10 flex flex-wrap justify-center gap-3">
        <Link
          href="/blog"
          className="focus-ring rounded-full bg-[#0071e3] dark:bg-primary text-white px-8 py-3 text-sm font-semibold hover:bg-[#0077ed] dark:hover:bg-primary-hover transition-colors"
        >
          최신 글 보기
        </Link>
        <Link
          href="/about"
          className="focus-ring rounded-full border border-[rgba(0,0,0,0.15)] dark:border-border text-[#1d1d1f] dark:text-foreground px-8 py-3 text-sm font-semibold hover:bg-[#f5f5f7] dark:hover:bg-card/80 transition-colors"
        >
          소개 보기
        </Link>
        <Link
          href="/contact"
          className="focus-ring rounded-full border border-[rgba(0,0,0,0.10)] dark:border-border text-[#6e6e73] dark:text-muted px-8 py-3 text-sm font-semibold hover:text-[#1d1d1f] dark:hover:text-foreground hover:bg-[#f5f5f7] dark:hover:bg-card/80 transition-colors"
        >
          연락하기
        </Link>
      </motion.div>

      {/* Blog stats */}
      <motion.div {...fadeUp(0.72)} className="flex items-center justify-center gap-8 mt-10">
        <div className="text-center">
          <p className="text-2xl sm:text-3xl font-bold text-foreground">
            {stats.totalPosts.toLocaleString('ko-KR')}
          </p>
          <p className="text-sm text-muted mt-1">발행된 글</p>
        </div>
        <div className="h-8 w-px bg-border" />
        <div className="text-center">
          <p className="text-2xl sm:text-3xl font-bold text-foreground">{stats.categoryCount}</p>
          <p className="text-sm text-muted mt-1">카테고리</p>
        </div>
        <div className="h-8 w-px bg-border" />
        <div className="text-center">
          <p className="text-2xl sm:text-3xl font-bold text-foreground">{stats.recentPostsCount}</p>
          <p className="text-sm text-muted mt-1">최근 7일 업데이트</p>
        </div>
      </motion.div>

      {/* Category tiles */}
      {categories.length > 0 && (
        <motion.div
          {...fadeUp(0.75)}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 max-w-6xl mx-auto"
        >
          {categories.slice(0, 5).map((category) => {
            const catColor = getCategoryColor(category);
            return (
              <Link
                key={category}
                href={`/blog?category=${encodeURIComponent(category)}`}
                className="focus-ring card-hover group block overflow-hidden rounded-2xl border border-[rgba(0,0,0,0.08)] dark:border-border bg-white dark:bg-card"
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
                    <div className={`pl-3 border-l-4 ${catColor.border}`}>
                      <p className="text-sm font-semibold tracking-tight text-white">{category}</p>
                      <p className="mt-1 text-xs text-white/75">
                        {categoryMeta[category]?.summary ?? `${categoryMeta[category]?.count ?? 0}편 발행`}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </motion.div>
      )}

      {/* Featured post */}
      {featured && featuredCover && (
        <motion.div {...fadeUp(0.9)} className="mt-14 max-w-2xl mx-auto">
          <Link
            href={`/blog/${featured.slug}`}
            className="focus-ring card-hover group block overflow-hidden rounded-2xl border border-[rgba(0,0,0,0.08)] dark:border-border bg-white dark:bg-card"
          >
            <div className="relative aspect-[16/9]">
              <Image
                src={featuredCover}
                alt={getCoverAlt({ title: featured.title, category: featured.category })}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-cover scale-[1.02] transition-transform duration-700 group-hover:scale-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/18 to-black/8" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-left">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-semibold tracking-[0.08em] uppercase text-white/75">
                  <time className="text-white/70">{featured.date}</time>
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/40" />
                  <span className="text-white/80">{featured.category}</span>
                </div>
                <p className="mt-3 font-display text-xl sm:text-2xl font-semibold tracking-tight leading-[1.1] text-white drop-shadow-[0_1px_10px_rgba(0,0,0,0.3)] line-clamp-3">
                  {featured.title}
                </p>
                <p className="mt-3 text-sm text-white/78 leading-relaxed line-clamp-2">
                  {featured.description}
                </p>
              </div>
            </div>
          </Link>
        </motion.div>
      )}
    </div>
  );
}
