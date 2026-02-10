'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import PostListItem from '@/components/PostListItem';
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
    <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
      <aside className="space-y-6 lg:sticky lg:top-28 self-start">
        <div className="rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-sm">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-muted">
            검색
          </p>
          <div className="relative mt-3">
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
              placeholder="제목, 태그, 카테고리..."
              className="w-full rounded-2xl border border-border bg-background/40 px-10 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <p className="mt-4 text-sm text-muted">
            {filteredPosts.length}개의 글
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-sm">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-muted mb-3">
            주제
          </p>
          <CategoryFilter
            categories={categories}
            selected={selected}
            onChange={setSelected}
            variant="sidebar"
          />
        </div>
      </aside>

      <section>
        {filteredPosts.length > 0 ? (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post, idx) => (
                <PostListItem
                  key={post.slug}
                  index={idx + 1}
                  slug={post.slug}
                  title={post.title}
                  description={post.description}
                  date={post.date}
                  category={post.category}
                  tags={post.tags}
                  image={post.image}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-12 text-muted">
            <p>해당 조건에 맞는 글이 없습니다.</p>
          </div>
        )}
      </section>
    </div>
  );
}
