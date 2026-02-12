'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { getCoverAlt, getCoverImage } from '@/lib/covers';

interface PostVisualCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  category?: string;
  tags?: string[];
  image?: string;
  aspectClassName?: string;
  priority?: boolean;
}

export default function PostVisualCard({
  slug,
  title,
  description,
  date,
  category,
  tags,
  image,
  aspectClassName = 'aspect-[4/5]',
  priority = false,
}: PostVisualCardProps) {
  const cover = getCoverImage({ category, image });
  const reduceMotion = useReducedMotion();

  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        whileHover: { y: -2 },
        transition: { duration: 0.28 },
      };

  return (
    <motion.article
      {...motionProps}
    >
      <Link
        href={`/blog/${slug}`}
        className="focus-ring card-hover group block overflow-hidden rounded-3xl border border-border bg-card/70 hover:bg-card/85"
      >
        <div className={`relative ${aspectClassName}`}>
          <Image
            src={cover}
            alt={getCoverAlt({ title, category })}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover scale-[1.02] transition-transform duration-700 group-hover:scale-[1.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10" />

          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-semibold tracking-[0.14em] uppercase text-white/75">
              <time className="text-white/70">{date}</time>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/40" />
              {category && (
                <span className="text-white/80">{category}</span>
              )}
            </div>

            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-semibold tracking-tight leading-[1.05] text-white drop-shadow-[0_1px_18px_rgba(0,0,0,0.32)] line-clamp-2">
              {title}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-white/75 line-clamp-2">
              {description}
            </p>

            {tags && tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-[11px] rounded-full border border-white/20 bg-black/20 text-white/75 backdrop-blur"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
