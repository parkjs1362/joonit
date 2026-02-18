'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import BlogHero from '@/components/BlogHero';
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
      const hay = [post.title, post.description, post.category, ...(post.tags ?? [])]
        .join(' ')
        .toLowerCase();
      return hay.includes(normalizedQuery);
    });

  const [heroPosts, listPosts] = filteredPosts.length > 0
    ? [filteredPosts.slice(0, 1), filteredPosts.slice(1)]
    : [[], []];

  return (
    <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
      {/* 사이드바 */}
      <aside className="space-y-5 lg:sticky lg:top-28 self-start">
        {/* 검색 */}
        <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm">
          <p className="text-xs font-semibold tracking-[0.08em] uppercase text-muted mb-3">
            검색
          </p>
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
              placeholder="제목, 태그, 카테고리..."
              aria-label="블로그 글 검색"
              className="w-full rounded-xl border border-border bg-background/40 px-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </div>
          <p className="mt-3 text-xs text-muted">{filteredPosts.length}개의 글</p>
        </div>

        {/* 카테고리 */}
        <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm">
          <p className="text-xs font-semibold tracking-[0.08em] uppercase text-muted mb-3">
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

      {/* 메인 컨텐츠 */}
      <section>
        {filteredPosts.length === 0 ? (
          <div className="py-20 text-center text-muted">
            <p>해당 조건에 맞는 글이 없습니다.</p>
          </div>
        ) : (
          <>
            {/* Hero — 최신 글 */}
            {heroPosts.map((post) => (
              <BlogHero
                key={post.slug}
                slug={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                category={post.category}
                image={post.image}
              />
            ))}

            {/* 리스트 구분선 */}
            {listPosts.length > 0 && (
              <div className="mb-2 flex items-center gap-4">
                <p className="text-xs font-semibold tracking-[0.1em] uppercase text-muted shrink-0">
                  더 많은 글
                </p>
                <div className="flex-1 h-px bg-border" />
              </div>
            )}

            {/* 리스트 — 나머지 글 */}
            <AnimatePresence mode="popLayout">
              {listPosts.map((post, idx) => (
                <PostListItem
                  key={post.slug}
                  index={idx}
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
          </>
        )}
      </section>
    </div>
  );
}
