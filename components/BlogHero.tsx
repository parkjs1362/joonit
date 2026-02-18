'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion, type Transition } from 'framer-motion';
import { getCoverAlt, getCoverImage } from '@/lib/covers';
import { getCategoryColor } from '@/lib/categoryColors';

interface BlogHeroProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  category?: string;
  image?: string;
}

export default function BlogHero({
  slug,
  title,
  description,
  date,
  category,
  image,
}: BlogHeroProps) {
  const cover = getCoverImage({ category, image });
  const catColor = getCategoryColor(category ?? '');
  const reduceMotion = useReducedMotion();

  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: {
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1] as Transition['ease'],
        },
      };

  return (
    <motion.article {...motionProps} className="mb-16">
      <Link
        href={`/blog/${slug}`}
        className="focus-ring group block"
      >
        {/* 커버 이미지 */}
        <div className="relative aspect-[2/1] overflow-hidden rounded-2xl bg-card border border-border">
          <Image
            src={cover}
            alt={getCoverAlt({ title, category })}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 70vw"
            className="object-cover scale-[1.01] transition-transform duration-700 group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>

        {/* 텍스트 섹션 */}
        <div className="mt-7">
          {/* 메타 */}
          <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.1em] uppercase text-muted">
            <time dateTime={date}>{date}</time>
            {category && (
              <>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-border" />
                <span className={`${catColor.text}`}>{category}</span>
              </>
            )}
          </div>

          {/* 제목 — Playfair Display */}
          <h2 className="mt-4 font-editorial text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.08] text-foreground group-hover:text-primary transition-colors duration-200">
            {title}
          </h2>

          {/* 설명 */}
          <p className="mt-5 text-base sm:text-lg text-muted leading-relaxed max-w-2xl line-clamp-2">
            {description}
          </p>

          {/* 읽기 CTA */}
          <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
            <span>읽기</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
