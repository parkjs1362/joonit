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
          <div className="grid gap-6 lg:grid-cols-12">
            {bento[0] && (
              <motion.div
                key={bento[0].slug}
                layout={!reduceMotion}
                className="lg:col-span-7"
                {...cardMotion}
              >
                <PostVisualCard
                  slug={bento[0].slug}
                  title={bento[0].title}
                  description={bento[0].description}
                  date={bento[0].date}
                  category={bento[0].category}
                  tags={bento[0].tags}
                  image={bento[0].image}
                  aspectClassName="aspect-[16/10] sm:aspect-[16/9]"
                  priority
                />
              </motion.div>
            )}

            <div className="lg:col-span-5 grid gap-6">
              {bento[1] && (
                <motion.div
                  key={bento[1].slug}
                  layout={!reduceMotion}
                  {...cardMotion}
                >
                  <PostVisualCard
                    slug={bento[1].slug}
                    title={bento[1].title}
                    description={bento[1].description}
                    date={bento[1].date}
                    category={bento[1].category}
                    tags={bento[1].tags}
                    image={bento[1].image}
                    aspectClassName="aspect-[4/3]"
                  />
                </motion.div>
              )}

              {bento[2] && (
                <motion.div
                  key={bento[2].slug}
                  layout={!reduceMotion}
                  {...cardMotion}
                >
                  <PostVisualCard
                    slug={bento[2].slug}
                    title={bento[2].title}
                    description={bento[2].description}
                    date={bento[2].date}
                    category={bento[2].category}
                    tags={bento[2].tags}
                    image={bento[2].image}
                    aspectClassName="aspect-[4/3]"
                  />
                </motion.div>
              )}
            </div>

            {bento.slice(3, 6).map((post) => (
              <motion.div
                key={post.slug}
                layout={!reduceMotion}
                className="lg:col-span-4"
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
                  aspectClassName="aspect-[4/5]"
                />
              </motion.div>
            ))}
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
