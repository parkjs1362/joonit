import { Metadata } from 'next';
import AnimatedSection from '@/components/AnimatedSection';
import { getAllPosts, getAllCategories } from '@/lib/posts';
import BlogContent from './BlogContent';

export const metadata: Metadata = {
  title: '블로그',
  description: '모든 블로그 글 목록',
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const categories = await getAllCategories();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <AnimatedSection>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">블로그</h1>
        <p className="text-muted mb-8">
          개발, 기술, 그리고 일상에 대한 글들을 모아놓았습니다.
        </p>
      </AnimatedSection>

      <BlogContent posts={posts} categories={categories} />
    </div>
  );
}
