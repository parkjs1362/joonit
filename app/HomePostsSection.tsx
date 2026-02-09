'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PostCard from '@/components/PostCard';
import CategoryFilter from '@/components/CategoryFilter';
import type { PostMeta } from '@/lib/posts';

interface HomePostsSectionProps {
  posts: PostMeta[];
  categories: string[];
}

export default function HomePostsSection({ posts, categories }: HomePostsSectionProps) {
  const [selected, setSelected] = useState('전체');

  const filteredPosts =
    selected === '전체'
      ? posts.slice(0, 3)
      : posts.filter((post) => post.category === selected).slice(0, 3);

  return (
    <div>
      <div className="mb-6">
        <CategoryFilter
          categories={categories}
          selected={selected}
          onChange={setSelected}
        />
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
