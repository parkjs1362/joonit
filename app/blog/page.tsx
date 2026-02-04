import { Metadata } from 'next';
import PostCard from '@/components/PostCard';
import AnimatedSection from '@/components/AnimatedSection';
import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: '블로그',
  description: '모든 블로그 글 목록',
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <AnimatedSection>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">블로그</h1>
        <p className="text-muted mb-8">
          개발, 기술, 그리고 일상에 대한 글들을 모아놓았습니다.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        {posts.length > 0 ? (
          <div className="grid gap-6">
            {posts.map((post) => (
              <PostCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted">
            <p>아직 작성된 글이 없습니다.</p>
            <p className="mt-2">곧 새로운 글이 올라올 예정입니다!</p>
          </div>
        )}
      </AnimatedSection>
    </div>
  );
}
