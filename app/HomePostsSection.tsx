'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import PostCard from '@/components/PostCard';
import CategoryFilter from '@/components/CategoryFilter';
import type { PostMeta } from '@/lib/posts';

interface HomePostsSectionProps {
  posts: PostMeta[];
  categories: string[];
}

export default function HomePostsSection({ posts, categories }: HomePostsSectionProps) {
  const [selected, setSelected] = useState('전체');
  const reduceMotion = useReducedMotion();

  const filteredPosts =
    selected === '전체'
      ? posts.slice(0, 6)
      : posts.filter((post) => post.category === selected).slice(0, 6);

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
        <AnimatePresence mode="popLayout">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 [grid-auto-rows:1fr]">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                className="h-full"
                layout={!reduceMotion}
                initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={reduceMotion ? undefined : {
                  delay: index * 0.05,
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
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
          </div>
        </AnimatePresence>
      ) : (
        <div className="text-center py-12 text-[#6e6e73] dark:text-muted">
          <p>해당 카테고리에 작성된 글이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
