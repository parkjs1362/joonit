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
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: {
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1] as Transition['ease'],
        },
      };

  return (
    <motion.article {...motionProps} className="mb-10">
      <Link
        href={`/blog/${slug}`}
        className="focus-ring card-hover group block overflow-hidden rounded-2xl border border-border bg-white dark:bg-card/80"
      >
        <div className="grid gap-0 md:grid-cols-[minmax(260px,340px)_1fr]">
          <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[280px]">
            <Image
              src={cover}
              alt={getCoverAlt({ title, category })}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 340px"
              className="object-cover scale-[1.01] transition-transform duration-700 group-hover:scale-[1.06]"
            />
          </div>

          <div className="p-6 sm:p-7">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold tracking-[0.08em] uppercase text-muted">
              <time dateTime={date}>{date}</time>
              {category && (
                <>
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-border" />
                  <span className={catColor.text}>{category}</span>
                </>
              )}
            </div>

            <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-[2rem] font-semibold tracking-tight leading-[1.2] text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-3">
              {title}
            </h2>

            <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed line-clamp-3 max-w-2xl">
              {description}
            </p>

            <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
              <span>읽기</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
