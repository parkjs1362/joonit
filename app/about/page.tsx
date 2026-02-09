import { Metadata } from 'next';
import AnimatedSection from '@/components/AnimatedSection';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: '소개',
  description: 'Joonit 블로그 소개 페이지',
};

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AnimatedSection>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-8">
          소개
        </h1>

        <div className="prose prose-lg max-w-none">
          <p>
            안녕하세요! 저는 <strong>Joonit</strong>입니다.
          </p>

          <p>
            개발을 좋아하고, 새로운 기술을 배우는 것에 즐거움을 느낍니다.
            이 블로그는 제가 배우고 경험한 것들을 기록하고 공유하기 위한 공간입니다.
          </p>

          <h2>기술 스택</h2>
          <ul>
            <li>
              <strong>Frontend</strong>: React, Next.js, TypeScript, Tailwind CSS
            </li>
            <li>
              <strong>Backend</strong>: Node.js, NestJS, PostgreSQL
            </li>
            <li>
              <strong>Tools</strong>: Git, Docker, AWS
            </li>
          </ul>

          <h2>관심 분야</h2>
          <ul>
            <li>웹 개발 및 사용자 경험 최적화</li>
            <li>클린 코드와 소프트웨어 아키텍처</li>
            <li>생산성 도구 및 자동화</li>
            <li>AI 및 머신러닝 활용</li>
          </ul>

          <h2>연락처</h2>
          <p>
            궁금한 점이 있으시거나 협업 제안이 있으시다면 언제든지 연락해 주세요!
          </p>
          <ul>
            <li>
              <a
                href={siteConfig.author.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.author.email}`}>
                {siteConfig.author.email}
              </a>
            </li>
          </ul>
        </div>
      </AnimatedSection>
    </div>
  );
}
