import { Metadata } from 'next';
import AnimatedSection from '@/components/AnimatedSection';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: '소개',
  description:
    '프론트엔드 개발자 Joonit의 블로그. 웹 개발 실전 경험, 역사, 일상을 기록합니다.',
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AnimatedSection>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.12] mb-8">
          소개
        </h1>

        <div className="prose prose-lg mx-auto max-w-[72ch]">
          <h2>만드는 사람</h2>
          <p>
            안녕하세요. <strong>박준상(Joonit)</strong>입니다.
            프론트엔드 개발을 주로 하고 있으며, 웹 기술로 실용적인 도구를 만드는 데 관심이 많습니다.
          </p>
          <p>
            주로 <strong>React, Next.js, TypeScript</strong>를 사용하고,
            성능 최적화와 접근성 개선을 꾸준히 신경 쓰고 있습니다.
            만들고 배우는 과정에서 얻은 것들을 이 블로그에 기록합니다.
          </p>

          <h2>이 블로그에서 다루는 것</h2>
          <ul>
            <li>
              <strong>개발</strong> — 프론트엔드 구현, UI/UX, 성능, SEO, 개발 환경(DX)에 대한 실전 경험을 공유합니다.
              직접 만들고 배포하면서 겪은 문제와 해결 과정을 구체적으로 기록합니다.
            </li>
            <li>
              <strong>역사</strong> — 기술과 사회가 맞물리는 순간을 다룹니다.
              표준의 탄생, 인프라의 변화, 정보 흐름의 역사를 통해 현재 기술의 맥락을 짚습니다.
            </li>
            <li>
              <strong>일상</strong> — 습관 설계, 생산성, 생각 정리.
              개발자로서 지속 가능한 루틴을 만들어가는 과정을 공유합니다.
            </li>
          </ul>

          <h2>블로그 운영 원칙</h2>
          <ul>
            <li>결론만 말하기보다, 왜 그렇게 했는지(맥락)를 함께 남기기</li>
            <li>가능하면 코드와 예제로 설명하기</li>
            <li>나중의 내가 다시 읽어도 이해되는 글 쓰기</li>
          </ul>

          <h2>기술 스택</h2>
          <p>이 블로그는 다음 기술로 만들어졌습니다:</p>
          <ul>
            <li>Next.js (App Router) + TypeScript</li>
            <li>Tailwind CSS + Framer Motion</li>
            <li>MDX (콘텐츠 관리)</li>
            <li>Vercel (배포)</li>
          </ul>

          <h2>연락처</h2>
          <p>
            질문이나 협업 제안이 있다면 편하게 연락 주세요.
          </p>
          <ul>
            <li>
              이메일:{' '}
              <a href={`mailto:${siteConfig.author.email}`}>
                {siteConfig.author.email}
              </a>
            </li>
            <li>
              GitHub:{' '}
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                {siteConfig.social.github.replace('https://github.com/', '@')}
              </a>
            </li>
          </ul>
        </div>
      </AnimatedSection>
    </div>
  );
}
