export const siteConfig = {
  url: 'https://joonit.vercel.app',
  title: 'Joonit',
  description: '웹 개발 실전 경험과 역사·일상의 맥락을 구체적으로 기록합니다.',
  author: {
    name: 'Joonit',
    email: 'joonit1362@gmail.com',
  },
  social: {
    github: 'https://github.com/parkjs1362',
  },
  keywords: ['블로그', '개발', '웹', '기록', '역사', '일상'] as string[],
  analytics: {
    gaId: '', // TODO: GA4 Measurement ID 발급 후 입력 (예: G-XXXXXXXXXX)
  },
} as const;
