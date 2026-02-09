'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface PostCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  category?: string;
  tags?: string[];
  image?: string;
}

function pickCover(category: string | undefined): string {
  // Category-level unified covers (same image for all posts in a category).
  const byCategory: Record<string, string> = {
    개발: '/images/covers/dev-1.svg',
    역사: '/images/covers/history-1.svg',
    일상: '/images/covers/daily-1.svg',
    default: '/images/covers/default-1.svg',
  };

  if (!category) return byCategory.default;
  return byCategory[category] ?? byCategory.default;
}

export default function PostCard({
  slug,
  title,
  description,
  date,
  category,
  tags,
  image,
}: PostCardProps) {
  const cover = image || pickCover(category);
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href={`/blog/${slug}`}
        className="group relative block overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/10"
      >
        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(800px_circle_at_20%_0%,color-mix(in_srgb,var(--primary)_12%,transparent),transparent_55%)]" />

        <div className="relative flex flex-col">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={cover}
              alt={`${title} cover`}
              fill
              className="object-cover scale-[1.02] transition-transform duration-500 group-hover:scale-[1.08]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/85 via-transparent to-transparent" />
          </div>

          <div className="p-6 flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <time className="text-sm text-muted">{date}</time>
              {category && (
                <span className="px-2.5 py-0.5 text-xs font-medium rounded-full border border-primary/20 bg-primary/5 text-primary">
                  {category}
                </span>
              )}
            </div>

            <h2 className="font-display text-2xl font-semibold tracking-tight group-hover:text-primary transition-colors">
              {title}
            </h2>

            <p className="text-muted leading-relaxed line-clamp-2">
              {description}
            </p>

            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs rounded-full border border-border bg-card/70 text-muted"
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
