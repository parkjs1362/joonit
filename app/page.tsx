import Link from 'next/link';
import PostCard from '@/components/PostCard';
import AnimatedSection from '@/components/AnimatedSection';
import { getLatestPosts } from '@/lib/posts';

export default async function HomePage() {
  const latestPosts = await getLatestPosts(3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero Section */}
      <AnimatedSection className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          안녕하세요, <span className="text-primary">Joonit</span>입니다
        </h1>
        <p className="text-lg text-muted max-w-2xl mx-auto">
          개발, 기술, 그리고 일상에 대한 이야기를 나누는 공간입니다.
          새로운 것을 배우고 경험을 공유하는 것을 좋아합니다.
        </p>
        <div className="flex justify-center gap-4 mt-8">
          <Link
            href="/blog"
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
          >
            블로그 보기
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 border border-border rounded-lg hover:bg-card transition-colors"
          >
            소개
          </Link>
        </div>
      </AnimatedSection>

      {/* Latest Posts Section */}
      <AnimatedSection delay={0.2}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">최신 글</h2>
          <Link
            href="/blog"
            className="text-primary hover:text-primary-hover transition-colors"
          >
            모든 글 보기 &rarr;
          </Link>
        </div>

        {latestPosts.length > 0 ? (
          <div className="grid gap-6">
            {latestPosts.map((post) => (
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
