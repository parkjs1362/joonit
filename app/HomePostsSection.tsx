'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import PostVisualCard from '@/components/PostVisualCard';
import CategoryFilter from '@/components/CategoryFilter';
import type { PostMeta } from '@/lib/posts';

interface HomePostsSectionProps {
  posts: PostMeta[];
  categories: string[];
}

export default function HomePostsSection({ posts, categories }: HomePostsSectionProps) {
  const [selected, setSelected] = useState('전체');
  const reduceMotion = useReducedMotion();

  const cardMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, scale: 0.98 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.98 },
        transition: { duration: 0.25 },
      };

  const filteredPosts =
    selected === '전체'
      ? posts.slice(0, 6)
      : posts.filter((post) => post.category === selected).slice(0, 6);

  const bento = filteredPosts.slice(0, 6);

  const slotStyles = [
    {
      container: 'lg:col-span-7 lg:row-span-2',
      aspect: 'aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto',
      variant: 'hero' as const,
      fillHeight: true,
    },
    {
      container: 'lg:col-span-5',
      aspect: 'aspect-[4/3]',
      variant: 'feature' as const,
      fillHeight: false,
    },
    {
      container: 'lg:col-span-5',
      aspect: 'aspect-[4/3]',
      variant: 'feature' as const,
      fillHeight: false,
    },
    {
      container: 'lg:col-span-4',
      aspect: 'aspect-[4/5]',
      variant: 'compact' as const,
      fillHeight: false,
    },
    {
      container: 'lg:col-span-4',
      aspect: 'aspect-[4/5]',
      variant: 'compact' as const,
      fillHeight: false,
    },
    {
      container: 'lg:col-span-4',
      aspect: 'aspect-[4/5]',
      variant: 'compact' as const,
      fillHeight: false,
    },
  ];

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
          <div className="grid gap-6 lg:grid-cols-12 lg:auto-rows-[minmax(220px,1fr)]">
            {bento.map((post, index) => {
              const slot = slotStyles[index];
              if (!slot) return null;

              return (
                <motion.div
                  key={post.slug}
                  layout={!reduceMotion}
                  className={`${slot.container} self-stretch h-full`}
                  {...cardMotion}
                >
                  <PostVisualCard
                    slug={post.slug}
                    title={post.title}
                    description={post.description}
                    date={post.date}
                    category={post.category}
                    tags={post.tags}
                    image={post.image}
                    variant={slot.variant}
                    aspectClassName={slot.aspect}
                    fillHeight={slot.fillHeight}
                    priority={index === 0}
                    cardClassName="glass-edge"
                  />
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      ) : (
        <div className="text-center py-12 text-muted">
          <p>해당 카테고리에 작성된 글이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
