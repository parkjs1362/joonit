# Joonit Blog

개인 블로그 - Next.js 15 + Tailwind CSS v4 + Framer Motion + MDX

**Live**: https://joonit.vercel.app

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Content**: MDX (next-mdx-remote + gray-matter)
- **Deployment**: Vercel

## Features

- 다크모드 지원 (시스템 설정 연동 + 수동 토글)
- MDX 블로그 시스템
- 페이지 전환 및 스크롤 애니메이션
- 반응형 디자인
- SEO 최적화

## Getting Started

### 설치

```bash
git clone https://github.com/parkjs1362/joonit.git
cd joonit
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 확인

### 빌드

```bash
npm run build
npm run start
```

## Project Structure

```
joonit/
├── app/
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 홈페이지
│   ├── globals.css         # 글로벌 스타일
│   ├── not-found.tsx       # 404 페이지
│   ├── blog/
│   │   ├── page.tsx        # 블로그 목록
│   │   └── [slug]/
│   │       └── page.tsx    # 블로그 상세
│   └── about/
│       └── page.tsx        # 소개 페이지
├── components/
│   ├── Header.tsx          # 네비게이션 + 다크모드 토글
│   ├── Footer.tsx          # 푸터
│   ├── PostCard.tsx        # 블로그 카드
│   ├── AnimatedSection.tsx # 애니메이션 래퍼
│   └── MDXComponents.tsx   # MDX 커스텀 컴포넌트
├── content/
│   └── posts/              # MDX 블로그 글
│       └── hello-world.mdx
├── lib/
│   ├── mdx.ts              # MDX 파싱 유틸
│   └── posts.ts            # 포스트 조회 함수
└── public/
    └── images/             # 이미지 파일
```

## Writing Blog Posts

### 1. MDX 파일 생성

`content/posts/` 폴더에 새 `.mdx` 파일을 생성합니다.

```bash
touch content/posts/my-new-post.mdx
```

### 2. Frontmatter 작성

파일 상단에 메타데이터를 작성합니다.

```mdx
---
title: "글 제목"
description: "글 설명"
date: "2025-02-04"
tags: ["태그1", "태그2"]
image: "/images/cover.jpg"  # 선택사항
---

## 본문 내용

마크다운으로 글을 작성합니다.
```

### 3. 배포

```bash
git add .
git commit -m "feat: 새 블로그 글 추가"
git push
```

GitHub에 푸시하면 Vercel이 자동으로 배포합니다.

## MDX 지원 기능

### 코드 블록

````mdx
```typescript
const greeting = "Hello, World!";
console.log(greeting);
```
````

### 인용문

```mdx
> 인용문 내용
```

### 이미지

```mdx
![Alt text](/images/example.jpg)
```

### 링크

```mdx
[링크 텍스트](https://example.com)
```

## Customization

### 다크모드 색상 변경

`app/globals.css`에서 CSS 변수를 수정합니다.

```css
:root {
  --primary: #3b82f6;  /* 메인 색상 */
  --background: #ffffff;
  --foreground: #171717;
}

.dark {
  --primary: #60a5fa;
  --background: #0a0a0a;
  --foreground: #ededed;
}
```

### 소셜 링크 변경

`components/Footer.tsx`에서 GitHub, LinkedIn 링크를 수정합니다.

## License

MIT
