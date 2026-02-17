import { Metadata } from 'next';
import AnimatedSection from '@/components/AnimatedSection';

export const metadata: Metadata = {
  title: '이용약관',
  description: 'Joonit 블로그 이용약관',
};

export default function TermsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AnimatedSection>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.12] mb-8">
          이용약관
        </h1>

        <div className="prose prose-lg mx-auto max-w-[72ch]">
          <h2>제1조 (목적)</h2>
          <p>
            이 약관은 Joonit 블로그(이하 &quot;본 사이트&quot;)가 제공하는
            서비스의 이용 조건 및 절차, 이용자와 본 사이트 간의 권리·의무 및
            책임사항을 규정함을 목적으로 합니다.
          </p>

          <h2>제2조 (용어의 정의)</h2>
          <ul>
            <li>
              <strong>서비스</strong>: 본 사이트가 제공하는 블로그 콘텐츠 열람 및
              관련 기능 일체를 의미합니다.
            </li>
            <li>
              <strong>이용자</strong>: 본 사이트에 접속하여 서비스를 이용하는 자를
              말합니다.
            </li>
          </ul>

          <h2>제3조 (서비스의 제공)</h2>
          <p>본 사이트는 다음과 같은 서비스를 제공합니다:</p>
          <ul>
            <li>블로그 게시물 열람</li>
            <li>개발/역사/일상 관련 정보 제공</li>
            <li>기타 본 사이트가 정하는 서비스</li>
          </ul>

          <h2>제4조 (저작권 및 지적재산권)</h2>
          <p>
            본 사이트에 게시된 모든 콘텐츠(글, 이미지, 코드 등)의 저작권은
            본 사이트 운영자에게 있으며, 관련 법률에 의해 보호됩니다.
          </p>
          <ul>
            <li>
              이용자는 개인적·비상업적 목적으로 콘텐츠를 열람할 수 있습니다.
            </li>
            <li>
              콘텐츠를 인용할 경우, 반드시 출처(사이트명 및 URL)를 명시해야
              합니다.
            </li>
            <li>
              본 사이트의 콘텐츠를 무단으로 복제·배포·전송·전시·판매하는 행위는
              금지됩니다.
            </li>
          </ul>

          <h2>제5조 (코드 예제 이용)</h2>
          <p>
            블로그에 포함된 코드 예제는 별도의 라이선스 표기가 없는 한 학습 및
            프로젝트 참고 용도로 자유롭게 사용할 수 있습니다. 다만, 코드 예제를
            그대로 상업적 제품에 사용하는 경우 사전 허가를 받아야 합니다.
          </p>

          <h2>제6조 (면책 조항)</h2>
          <ul>
            <li>
              본 사이트는 제공하는 정보의 정확성·완전성을 보장하지 않으며,
              콘텐츠의 이용으로 인해 발생하는 손해에 대해 책임을 지지 않습니다.
            </li>
            <li>
              본 사이트의 콘텐츠는 교육·참고 목적이며, 전문적인 조언을 대체하지
              않습니다.
            </li>
            <li>
              외부 링크로 연결된 사이트의 내용에 대해서는 책임을 지지 않습니다.
            </li>
          </ul>

          <h2>제7조 (이용자의 의무)</h2>
          <p>이용자는 다음 행위를 하여서는 안 됩니다:</p>
          <ul>
            <li>본 사이트의 운영을 방해하는 행위</li>
            <li>타인의 명예를 훼손하거나 불이익을 주는 행위</li>
            <li>저작권 등 지적재산권을 침해하는 행위</li>
            <li>기타 관련 법령에 위반되는 행위</li>
          </ul>

          <h2>제8조 (약관의 변경)</h2>
          <p>
            본 약관은 필요한 경우 변경될 수 있으며, 변경된 약관은 사이트에
            공지함으로써 효력이 발생합니다. 이용자가 변경된 약관에 동의하지 않는
            경우, 서비스 이용을 중단할 수 있습니다.
          </p>

          <p className="text-muted text-sm mt-8">시행일자: 2026년 2월 9일</p>
        </div>
      </AnimatedSection>
    </div>
  );
}
