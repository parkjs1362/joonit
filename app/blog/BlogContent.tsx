'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PostCard from '@/components/PostCard';
import CategoryFilter from '@/components/CategoryFilter';
import type { PostMeta } from '@/lib/posts';

interface BlogContentProps {
  posts: PostMeta[];
  categories: string[];
  initialCategory?: string;
  initialQuery?: string;
}

export default function BlogContent({
  posts,
  categories,
  initialCategory,
  initialQuery,
}: BlogContentProps) {
  const safeInitialCategory =
    initialCategory && categories.includes(initialCategory) ? initialCategory : '전체';

  const [selected, setSelected] = useState(safeInitialCategory);
  const [query, setQuery] = useState(initialQuery ?? '');

  const normalizedQuery = query.trim().toLowerCase();
  const filteredPosts = posts
    .filter((post) => (selected === '전체' ? true : post.category === selected))
    .filter((post) => {
      if (!normalizedQuery) return true;
      const hay = [
        post.title,
        post.description,
        post.category,
        ...(post.tags ?? []),
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(normalizedQuery);
    });

  return (
    <div>
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="검색: 제목, 태그, 카테고리..."
                className="w-full rounded-2xl border border-border bg-card/60 px-10 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          <p className="text-sm text-muted whitespace-nowrap">
            {filteredPosts.length}개의 글
          </p>
        </div>

        <CategoryFilter
          categories={categories}
          selected={selected}
          onChange={setSelected}
        />
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <PostCard
                  slug={post.slug}
                  title={post.title}
                  description={post.description}
                  date={post.date}
                  category={post.category}
                  tags={post.tags}
                  image={post.image}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-12 text-muted">
          <p>해당 카테고리에 작성된 글이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
