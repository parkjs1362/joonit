import { Metadata } from 'next';
import AnimatedSection from '@/components/AnimatedSection';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: '연락처',
  description: 'Joonit 블로그 연락처',
};

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AnimatedSection>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
          연락
        </h1>
        <p className="text-muted text-lg mb-10 max-w-2xl">
          궁금한 점이 있으시거나 협업 제안이 있으시다면 아래 채널로 연락해 주세요.
        </p>
      </AnimatedSection>

      <div className="grid gap-6 sm:grid-cols-2">
        <AnimatedSection delay={0.1}>
          <a
            href={`mailto:${siteConfig.author.email}`}
            className="block p-7 rounded-3xl border border-border bg-card/60 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/10 transition-colors backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-3">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <h2 className="text-lg font-semibold">이메일</h2>
            </div>
            <p className="text-muted text-sm">{siteConfig.author.email}</p>
          </a>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="p-7 rounded-3xl border border-border bg-card/60 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-3">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                />
              </svg>
              <h2 className="text-lg font-semibold">문의 가이드</h2>
            </div>
            <ul className="text-muted text-sm list-disc ml-5 space-y-1">
              <li>제목에 한 줄로 요약 (예: “블로그 피드백”, “협업 제안”)</li>
              <li>관련 링크나 스크린샷이 있으면 함께</li>
              <li>원하는 답변 형태(간단 피드백/깊은 리뷰 등)를 적어주시면 더 빠릅니다</li>
            </ul>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
