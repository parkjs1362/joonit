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
  const cover = getCoverImage({ category, image });
  const catColor = getCategoryColor(category ?? '');

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 14 }}
      transition={{ duration: reduceMotion ? 0 : 0.22, delay: reduceMotion ? 0 : Math.min(index * 0.04, 0.3) }}
      className="group border-t border-border first:border-t-0"
    >
      <Link
        href={`/blog/${slug}`}
        className="focus-ring flex items-start gap-6 py-7"
      >
        {/* 텍스트 영역 */}
        <div className="min-w-0 flex-1">
          {/* 메타 */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold tracking-[0.1em] uppercase text-muted">
            <time dateTime={date}>{date}</time>
            {category && (
              <>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-border" />
                <span className={catColor.text}>{category}</span>
              </>
            )}
          </div>

          {/* 제목 */}
          <h2 className="mt-2.5 text-xl sm:text-2xl font-semibold tracking-tight leading-[1.18] group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {title}
          </h2>

          {/* 설명 */}
          <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2 max-w-xl">
            {description}
          </p>

          {/* 태그 */}
          {tags && tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[11px] rounded-full border border-border bg-card/80 text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 썸네일 */}
        <div className="relative hidden sm:block w-[120px] md:w-[160px] shrink-0">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-card">
            <Image
              src={cover}
              alt={getCoverAlt({ title, category })}
              fill
              className="object-cover scale-[1.01] transition-transform duration-500 group-hover:scale-[1.06]"
              sizes="(max-width: 768px) 120px, 160px"
            />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
