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
            안녕하세요. <strong>Joonit</strong>입니다.
          </p>

          <p>
            만들고 배우는 과정을 좋아합니다. 이 블로그는 그 과정에서 얻은 것들을
            가능한 한 <strong>짧고, 구체적으로</strong> 기록해 두기 위해 만들었습니다.
          </p>

          <h2>여기서 쓰는 글</h2>
          <ul>
            <li>
              <strong>개발</strong>: 웹, UI, 성능, DX
            </li>
            <li>
              <strong>역사</strong>: 기술과 사회가 맞물리는 순간(표준, 인프라, 정보의 역사)
            </li>
            <li>
              <strong>일상</strong>: 습관, 기록, 생각 정리
            </li>
          </ul>

          <h2>이 블로그의 원칙</h2>
          <ul>
            <li>결론만 말하기보다, 왜 그렇게 했는지(맥락)를 함께 남기기</li>
            <li>가능하면 코드/예제로 설명하기</li>
            <li>나중의 내가 다시 읽어도 이해되는 글 쓰기</li>
          </ul>

          <h2>만드는 방식</h2>
          <p>
            정해진 기술 스택을 강조하기보다, 먼저 만들고(대충이라도) 쓰면서 다듬는
            방식으로 운영합니다. 필요하면 과감히 바꾸고, 바뀐 이유를 기록해 둡니다.
          </p>

          <h2>연락처</h2>
          <p>
            질문이나 협업 제안이 있다면 편하게 연락 주세요.
          </p>
          <ul>
            <li>
              <a href={`mailto:${siteConfig.author.email}`}>
                {siteConfig.author.email}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.author.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub (github.com/parkjs1362)
              </a>
            </li>
          </ul>
        </div>
      </AnimatedSection>
    </div>
  );
}
