'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { getCoverAlt, getCoverImage } from '@/lib/covers';
import { getCategoryColor } from '@/lib/categoryColors';

interface PostListItemProps {
  index: number;
  slug: string;
  title: string;
  description: string;
  date: string;
  category?: string;
  tags?: string[];
  image?: string;
}

export default function PostListItem({
  index,
  slug,
  title,
  description,
  date,
  category,
  tags,
  image,
}: PostListItemProps) {
  const reduceMotion = useReducedMotion();
  const motionVariants = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 12 },
      };
  const cover = getCoverImage({ category, image });
  const catColor = getCategoryColor(category ?? '');

  return (
    <motion.article
      layout
      initial={motionVariants.initial}
      animate={motionVariants.animate}
      exit={motionVariants.exit}
      transition={{ duration: reduceMotion ? 0 : 0.2, delay: reduceMotion ? 0 : Math.min(index * 0.03, 0.24) }}
      className="mb-3"
    >
      <Link
        href={`/blog/${slug}`}
        className="focus-ring card-hover flex min-h-[11rem] sm:min-h-[12rem] items-stretch gap-4 sm:gap-5 rounded-xl border border-border bg-white/80 dark:bg-card/70 p-4 sm:p-5"
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold tracking-[0.08em] uppercase text-muted">
            <time dateTime={date}>{date}</time>
            {category && (
              <>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-border" />
                <span className={catColor.text}>{category}</span>
              </>
            )}
          </div>

          <h2 className="mt-2 text-lg sm:text-xl font-semibold tracking-tight leading-[1.24] text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {title}
          </h2>

          <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2 max-w-2xl min-h-[2.7rem]">
            {description}
          </p>

          <div className="mt-3 min-h-6">
            {tags && tags.length > 0 && (
              <div className="flex min-h-6 flex-wrap gap-1.5">
                {tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[11px] rounded-full border border-border bg-card/70 text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="relative hidden sm:block w-[112px] md:w-[148px] shrink-0">
          <div className="relative h-full min-h-[104px] overflow-hidden rounded-lg border border-border bg-card">
            <Image
              src={cover}
              alt={getCoverAlt({ title, category })}
              fill
              className="object-cover scale-[1.01] transition-transform duration-500 group-hover:scale-[1.06]"
              sizes="(max-width: 768px) 112px, 148px"
            />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
