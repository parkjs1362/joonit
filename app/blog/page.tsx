import { Metadata } from 'next';
import AnimatedSection from '@/components/AnimatedSection';
import { getAllPosts, getAllCategories } from '@/lib/posts';
import BlogContent from './BlogContent';

export const metadata: Metadata = {
  title: '블로그',
  description: '모든 블로그 글 목록',
};

type SearchParams = Record<string, string | string[] | undefined>;

function pickFirst(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

interface BlogPageProps {
  searchParams?: Promise<SearchParams>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const posts = await getAllPosts();
  const categories = await getAllCategories();
  const sp = (await searchParams) ?? {};
  const initialCategory = pickFirst(sp.category);
  const initialQuery = pickFirst(sp.q);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
      <AnimatedSection>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight leading-[1.08] mb-4">
          글
        </h1>
        <p className="text-muted text-base sm:text-lg leading-[1.8] mb-10 max-w-2xl">
          개발, 역사, 일상을 가능한 한 실행 가능한 기준으로 정리한 글 목록입니다.
        </p>
      </AnimatedSection>

      <BlogContent
        posts={posts}
        categories={categories}
        initialCategory={initialCategory}
        initialQuery={initialQuery}
      />
    </div>
  );
}
