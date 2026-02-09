'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface PostCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  category?: string;
  tags?: string[];
}

export default function PostCard({ slug, title, description, date, category, tags }: PostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href={`/blog/${slug}`}
        className="group block p-6 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <time className="text-sm text-muted">{date}</time>
            {category && (
              <span className="px-2.5 py-0.5 text-xs font-medium rounded-full border border-primary/30 text-primary bg-primary/5">
                {category}
              </span>
            )}
          </div>

          <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
            {title}
          </h2>

          <p className="text-muted line-clamp-2">
            {description}
          </p>

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
