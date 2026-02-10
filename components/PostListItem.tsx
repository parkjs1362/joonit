'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getCoverAlt, getCoverImage } from '@/lib/covers';

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

function pad2(n: number) {
  return String(n).padStart(2, '0');
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
  const cover = getCoverImage({ category, image });

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 14 }}
      transition={{ duration: 0.25 }}
    >
      <Link
        href={`/blog/${slug}`}
        className="group block rounded-3xl border border-border bg-card/70 p-6 transition-colors hover:bg-card/85"
      >
        <div className="flex items-start gap-6">
          <div className="hidden sm:block w-12 pt-1">
            <p className="text-xs font-mono text-muted tracking-widest">
              {pad2(index)}
            </p>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold tracking-[0.14em] uppercase text-muted">
              <time>{date}</time>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-border" />
              {category ? (
                <span className="text-primary">{category}</span>
              ) : (
                <span>글</span>
              )}
            </div>

            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.1] group-hover:text-primary transition-colors line-clamp-2">
              {title}
            </h2>

            <p className="mt-4 text-muted leading-relaxed line-clamp-2">
              {description}
            </p>

            {tags && tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs rounded-full border border-border bg-card/80 text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="relative hidden md:block w-[180px] shrink-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-card">
              <Image
                src={cover}
                alt={getCoverAlt({ title, category })}
                fill
                className="object-cover scale-[1.02] transition-transform duration-500 group-hover:scale-[1.07]"
                sizes="180px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/70 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

