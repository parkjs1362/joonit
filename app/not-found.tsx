import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24 text-center">
      <AnimatedSection>
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-muted mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
        >
          홈으로 돌아가기
        </Link>
      </AnimatedSection>
    </div>
  );
}
