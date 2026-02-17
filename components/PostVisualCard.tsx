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
  fillHeight?: boolean;
  variant?: 'hero' | 'feature' | 'compact' | 'default';
  cardClassName?: string;
  imageWrapClassName?: string;
}

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
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
  fillHeight = false,
  variant = 'default',
  cardClassName,
  imageWrapClassName,
}: PostVisualCardProps) {
  const cover = getCoverImage({ category, image });
  const reduceMotion = useReducedMotion();

  const variantStyles = {
    default: {
      meta: 'text-[11px] font-semibold tracking-[0.08em] uppercase text-white/75',
      title:
        'mt-3 font-display text-lg sm:text-xl font-semibold tracking-tight leading-[1.12] text-white drop-shadow-[0_1px_10px_rgba(0,0,0,0.24)] line-clamp-2',
      description: 'mt-3 text-sm leading-relaxed text-white/75 line-clamp-2',
      overlay: 'bg-gradient-to-t from-black/62 via-black/12 to-black/8',
      tagLimit: 3,
    },
    hero: {
      meta: 'text-[11px] font-semibold tracking-[0.08em] uppercase text-white/80',
      title:
        'mt-3 font-display text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight leading-[1.1] text-white drop-shadow-[0_1px_12px_rgba(0,0,0,0.28)] line-clamp-3',
      description: 'mt-3 text-sm sm:text-[15px] leading-relaxed text-white/80 line-clamp-3',
      overlay: 'bg-gradient-to-t from-black/66 via-black/14 to-black/7',
      tagLimit: 4,
    },
    feature: {
      meta: 'text-[11px] font-semibold tracking-[0.08em] uppercase text-white/75',
      title:
        'mt-3 font-display text-lg sm:text-xl font-semibold tracking-tight leading-[1.12] text-white drop-shadow-[0_1px_10px_rgba(0,0,0,0.24)] line-clamp-2',
      description: 'mt-3 text-sm leading-relaxed text-white/75 line-clamp-2',
      overlay: 'bg-gradient-to-t from-black/64 via-black/12 to-black/8',
      tagLimit: 3,
    },
    compact: {
      meta: 'text-[10px] font-semibold tracking-[0.08em] uppercase text-white/70',
      title:
        'mt-2.5 font-display text-base sm:text-lg font-semibold tracking-tight leading-[1.14] text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.22)] line-clamp-2',
      description: 'mt-2.5 text-sm leading-relaxed text-white/72 line-clamp-2',
      overlay: 'bg-gradient-to-t from-black/62 via-black/12 to-black/9',
      tagLimit: 2,
    },
  } as const;

  const style = variantStyles[variant];

  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        whileHover: { y: -4, scale: 1.01 },
        transition: { type: 'spring' as const, stiffness: 300, damping: 25 },
      };

  return (
    <motion.article
      {...motionProps}
      className={cx(fillHeight && 'lg:h-full')}
    >
      <Link
        href={`/blog/${slug}`}
        className={cx(
          'focus-ring card-hover group block overflow-hidden rounded-3xl border border-[rgba(255,255,255,0.08)] bg-card/80 hover:bg-card/95',
          fillHeight && 'lg:h-full',
          cardClassName
        )}
      >
        <div
          className={cx(
            'relative',
            aspectClassName,
            fillHeight && 'lg:aspect-auto lg:h-full',
            imageWrapClassName
          )}
        >
          <Image
            src={cover}
            alt={getCoverAlt({ title, category })}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover scale-[1.01] transition-transform duration-700 group-hover:scale-[1.05]"
          />
          <div className={cx('absolute inset-0', style.overlay)} />

          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <div className={cx('flex flex-wrap items-center gap-x-3 gap-y-2', style.meta)}>
              <time className="text-white/70">{date}</time>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/40" />
              {category && (
                <span className="text-white/80">{category}</span>
              )}
            </div>

            <h2 className={style.title}>
              {title}
            </h2>

            <p className={style.description}>
              {description}
            </p>

            {tags && tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.slice(0, style.tagLimit).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-[11px] rounded-full border border-white/20 bg-black/16 text-white/75 backdrop-blur"
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
