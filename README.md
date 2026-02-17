# Joonit Blog

Joonit 개인 블로그 | 개발·역사·일상 기록

읽기 좋은 글과, 정돈된 레이아웃을 기준으로 꾸준히 다듬습니다.
바이브 코딩으로 빠르게 만들고, 실제로 쓰면서 계속 고칩니다.

**Live**: https://joonit.vercel.app

## Built With

- Next.js (App Router)
- Tailwind CSS v4
- MDX (frontmatter + markdown)
- Vercel

## Features

- 다크모드 지원 (시스템 설정 연동 + 수동 토글)
- MDX 블로그 시스템
- 페이지 전환 및 스크롤 애니메이션
- 반응형 디자인
- SEO 최적화

## Getting Started

### 설치

```bash
git clone <your-repo-url>
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
├── app/                    # App Router routes/layouts
├── components/             # UI components
├── content/posts/          # MDX posts
├── lib/                    # MDX/posts helpers
└── public/                 # static assets (covers, favicon, etc.)
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
category: "개발"
tags: ["태그1", "태그2"]
image: "/images/cover.jpg"  # 선택사항 (없으면 카테고리 커버를 기본으로 사용)
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

`main` 브랜치로 푸시하면 Vercel이 자동으로 배포합니다.

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

## License

MIT
