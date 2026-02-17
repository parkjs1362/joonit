'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getCoverAlt, getCoverImage } from '@/lib/covers';

interface PostCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  category?: string;
  tags?: string[];
  image?: string;
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
  const cover = getCoverImage({ category, image });
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <Link
        href={`/blog/${slug}`}
        className="group block overflow-hidden rounded-2xl border border-[rgba(0,0,0,0.08)] dark:border-border bg-white dark:bg-card card-hover"
      >
        <div className="relative flex flex-col">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={cover}
              alt={getCoverAlt({ title, category })}
              fill
              className="object-cover scale-[1.01] transition-transform duration-500 group-hover:scale-[1.05]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          <div className="p-6 flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <time className="text-sm text-[#6e6e73] dark:text-muted">{date}</time>
              {category && (
                <span className="px-2.5 py-0.5 text-xs font-medium rounded-full border border-[#0071e3]/20 dark:border-primary/20 bg-[#0071e3]/5 dark:bg-primary/5 text-[#0071e3] dark:text-primary">
                  {category}
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-[1.35rem] font-semibold tracking-tight leading-[1.14] text-[#1d1d1f] dark:text-foreground group-hover:text-[#0071e3] dark:group-hover:text-primary transition-colors">
              {title}
            </h2>

            <p className="text-[#6e6e73] dark:text-muted leading-relaxed line-clamp-2">
              {description}
            </p>

            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs rounded-full border border-[rgba(0,0,0,0.08)] dark:border-border bg-[#f5f5f7] dark:bg-card/70 text-[#6e6e73] dark:text-muted"
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
