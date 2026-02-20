'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getCoverAlt, getCoverImage } from '@/lib/covers';
import { getCategoryColor } from '@/lib/categoryColors';

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
  const catColor = getCategoryColor(category ?? '');
  return (
    <motion.article
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <Link
        href={`/blog/${slug}`}
        className="group block h-full min-h-[27rem] sm:min-h-[28rem] overflow-hidden rounded-2xl border border-[rgba(0,0,0,0.08)] dark:border-border bg-white dark:bg-card card-hover"
      >
        <div className="relative flex h-full flex-col">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={cover}
              alt={getCoverAlt({ title, category })}
              fill
              className="object-cover scale-[1.01] transition-transform duration-500 group-hover:scale-[1.1]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          <div className="flex min-h-0 flex-1 flex-col justify-between p-6">
            <div className="flex min-h-[9.75rem] flex-col gap-3">
              <div className="flex min-h-6 items-center gap-2.5">
                <time className="whitespace-nowrap text-sm text-[#6e6e73] dark:text-muted">{date}</time>
                {category && (
                  <span className={`max-w-[58%] truncate whitespace-nowrap px-2.5 py-0.5 text-xs font-medium rounded-full border ${catColor.border} ${catColor.bg} ${catColor.text}`}>
                    {category}
                  </span>
                )}
              </div>

              <h2 className="line-clamp-2 min-h-[3.05rem] text-xl sm:text-[1.35rem] font-semibold tracking-tight leading-[1.14] text-[#1d1d1f] dark:text-foreground group-hover:text-[#0071e3] dark:group-hover:text-primary transition-colors">
                {title}
              </h2>

              <p className="min-h-[2.9rem] text-[#6e6e73] dark:text-muted leading-relaxed line-clamp-2">
                {description}
              </p>
            </div>

            <div className="mt-3 h-7">
              {tags && tags.length > 0 && (
                <div className="flex h-7 items-center gap-2 overflow-hidden">
                  {tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="shrink-0 whitespace-nowrap px-2.5 py-1 text-xs rounded-full border border-[rgba(0,0,0,0.08)] dark:border-border bg-[#f5f5f7] dark:bg-card/70 text-[#6e6e73] dark:text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
