import { Metadata } from 'next';
import AnimatedSection from '@/components/AnimatedSection';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: 'Joonit 블로그 개인정보처리방침',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AnimatedSection>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.12] mb-8">
          개인정보처리방침
        </h1>

        <div className="prose prose-lg mx-auto max-w-[72ch]">
          <p>
            Joonit 블로그(이하 &quot;본 사이트&quot;)는 이용자의 개인정보를 중요시하며,
            「개인정보 보호법」을 준수하고 있습니다. 본 개인정보처리방침을 통해
            이용자가 제공하는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며,
            개인정보 보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
          </p>

          <h2>1. 수집하는 개인정보 항목</h2>
          <p>본 사이트는 다음과 같은 정보를 자동으로 수집할 수 있습니다:</p>
          <ul>
            <li>접속 로그 (IP 주소, 접속 시간, 브라우저 종류)</li>
            <li>쿠키 정보</li>
            <li>방문 페이지 기록</li>
            <li>디바이스 정보 (운영체제, 화면 해상도)</li>
          </ul>

          <h2>2. 개인정보 수집 및 이용 목적</h2>
          <p>수집된 정보는 다음 목적으로 이용됩니다:</p>
          <ul>
            <li>사이트 이용 통계 분석 및 서비스 개선</li>
            <li>콘텐츠 최적화</li>
            <li>부정 이용 방지</li>
            <li>광고 제공 및 광고 성과 측정</li>
          </ul>

          <h2>3. 개인정보 보유 및 이용 기간</h2>
          <p>
            수집된 개인정보는 수집 목적이 달성된 후 즉시 파기합니다.
            다만, 관련 법령에 의해 보존이 필요한 경우 해당 기간 동안 보관합니다.
          </p>
          <ul>
            <li>방문 기록: 3개월</li>
          </ul>

          <h2>4. 제3자 제공</h2>
          <p>본 사이트는 광고 제공을 위해 다음과 같은 제3자 서비스를 이용합니다:</p>
          <ul>
            <li>
              <strong>Google AdSense</strong>: 광고 제공 목적.
              맞춤형 광고를 위해 쿠키가 사용될 수 있습니다.
            </li>
          </ul>

          <h2>5. 쿠키 및 맞춤형 광고</h2>
          <p>
            Google을 포함한 제3자 공급업체는 쿠키를 사용하여 이용자의
            이전 방문 기록 등을 기반으로 광고를 게재할 수 있습니다.
          </p>
          <ul>
            <li>이용자는 브라우저 설정을 통해 쿠키 저장을 거부하거나 삭제할 수 있습니다.</li>
            <li>
              맞춤형 광고 노출 여부는{' '}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google 광고 설정
              </a>
              에서 관리할 수 있습니다.
            </li>
            <li>
              Google의 광고 관련 정책은{' '}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google 광고 기술 정책
              </a>
              에서 확인할 수 있습니다.
            </li>
          </ul>

          <h2>6. 정보주체의 권리</h2>
          <p>이용자는 언제든지 다음의 권리를 행사할 수 있습니다:</p>
          <ul>
            <li>개인정보 열람 요구</li>
            <li>오류 등이 있을 경우 정정 요구</li>
            <li>삭제 요구</li>
            <li>처리 정지 요구</li>
          </ul>

          <h2>7. 개인정보 보호책임자</h2>
          <ul>
            <li>성명: {siteConfig.author.name}</li>
            <li>
              이메일:{' '}
              <a href={`mailto:${siteConfig.author.email}`}>{siteConfig.author.email}</a>
            </li>
          </ul>

          <h2>8. 개인정보처리방침 변경</h2>
          <p>
            본 개인정보처리방침은 법률이나 서비스의 변경사항을 반영하기 위해
            수정될 수 있으며, 변경 시 사이트를 통해 공지합니다.
          </p>

          <p className="text-muted text-sm mt-8">시행일자: 2026년 2월 9일</p>
        </div>
      </AnimatedSection>
    </div>
  );
}
