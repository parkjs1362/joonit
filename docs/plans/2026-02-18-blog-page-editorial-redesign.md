# Blog Page Editorial Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 블로그 목록 페이지를 Masonry 카드 그리드에서 편집장 스타일(Hero + 리스트)의 문예지/에디토리얼 디자인으로 전면 개편한다.

**Architecture:**
최신 글을 풀 이미지 Editorial Hero로 강조하고, 나머지 글들은 깔끔한 수평 리스트로 나열한다. 좌측 sticky 사이드바(검색 + 카테고리 필터)는 유지한다. 에디토리얼 무드를 위해 Playfair Display 세리프 폰트를 Hero 헤딩에 추가하고, 여백·타이포그래피 중심의 흑백 + 포인트 컬러 디자인을 적용한다.

**Tech Stack:** Next.js 16 (App Router), Tailwind CSS v4, Framer Motion, Google Fonts (Playfair Display 추가)

---

## 변경 파일 요약

| 파일 | 작업 |
|---|---|
| `app/globals.css` | Playfair Display 폰트 추가 |
| `components/BlogHero.tsx` | 신규 생성 — Editorial Hero |
| `components/PostListItem.tsx` | 수정 — 에디토리얼 스타일 업데이트 |
| `app/blog/BlogContent.tsx` | 수정 — 새 레이아웃 적용 |
| `app/blog/page.tsx` | 수정 — 헤더 타이포그래피 업그레이드 |

---

## Task 1: Playfair Display 폰트 추가

**Files:**
- Modify: `app/globals.css`

### Step 1: Playfair Display Google Font import 추가

`app/globals.css` 최상단 `@import url(...)` 블록에 `Playfair Display` 추가:

```css
@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400..700&family=Noto+Sans+KR:wght@300..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap");
```

### Step 2: CSS 변수 및 `@theme inline`에 editorial 폰트 등록

`:root` 블록 안에 추가:
```css
--font-editorial-stack: "Playfair Display", "Georgia", "Times New Roman", serif;
```

`@theme inline` 블록 안에 추가:
```css
--font-editorial: var(--font-editorial-stack);
```

### Step 3: 개발 서버에서 폰트 로드 확인

```bash
cd ~/Dropbox/code/joonit && npm run dev
```

브라우저에서 `http://localhost:3000` 열어서 DevTools → Network 탭에서 `Playfair Display` 폰트가 로드되는지 확인.

### Step 4: 커밋

```bash
cd ~/Dropbox/code/joonit
git add app/globals.css
git commit -m "feat: Playfair Display 에디토리얼 폰트 추가"
```

---

## Task 2: BlogHero 컴포넌트 신규 생성

**Files:**
- Create: `components/BlogHero.tsx`

### Step 1: 컴포넌트 파일 생성

`components/BlogHero.tsx`:

```tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { getCoverAlt, getCoverImage } from '@/lib/covers';
import { getCategoryColor } from '@/lib/categoryColors';

interface BlogHeroProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  category?: string;
  tags?: string[];
  image?: string;
}

export default function BlogHero({
  slug,
  title,
  description,
  date,
  category,
  tags,
  image,
}: BlogHeroProps) {
  const cover = getCoverImage({ category, image });
  const catColor = getCategoryColor(category ?? '');
  const reduceMotion = useReducedMotion();

  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
      };

  return (
    <motion.article {...motionProps} className="mb-16">
      <Link
        href={`/blog/${slug}`}
        className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm"
      >
        {/* 커버 이미지 */}
        <div className="relative aspect-[2/1] overflow-hidden rounded-2xl bg-card border border-border">
          <Image
            src={cover}
            alt={getCoverAlt({ title, category })}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 70vw"
            className="object-cover scale-[1.01] transition-transform duration-700 group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>

        {/* 텍스트 섹션 */}
        <div className="mt-7">
          {/* 메타 */}
          <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.1em] uppercase text-muted">
            <time>{date}</time>
            {category && (
              <>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-border" />
                <span className={`${catColor.text}`}>{category}</span>
              </>
            )}
          </div>

          {/* 제목 — Playfair Display */}
          <h2 className="mt-4 font-editorial text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.08] text-foreground group-hover:text-primary transition-colors duration-200">
            {title}
          </h2>

          {/* 설명 */}
          <p className="mt-5 text-base sm:text-lg text-muted leading-relaxed max-w-2xl line-clamp-2">
            {description}
          </p>

          {/* 읽기 CTA */}
          <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
            <span>읽기</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
```

### Step 2: 개발 서버에서 컴포넌트 임시 확인

`app/blog/page.tsx`에 임시로 import해서 렌더링되는지 확인 (다음 Task에서 정식 통합).

```tsx
// 임시 확인용 — 나중에 BlogContent에서 사용
import BlogHero from '@/components/BlogHero';
```

아직 page.tsx는 수정하지 말 것. 다음 Task에서 BlogContent를 통해 통합됨.

### Step 3: 커밋

```bash
cd ~/Dropbox/code/joonit
git add components/BlogHero.tsx
git commit -m "feat: BlogHero 에디토리얼 히어로 컴포넌트 추가"
```

---

## Task 3: PostListItem 에디토리얼 스타일 업데이트

**Files:**
- Modify: `components/PostListItem.tsx`

### Step 1: 현재 파일 읽기

`components/PostListItem.tsx` 전체를 읽고 현재 구조를 파악한다.

### Step 2: 에디토리얼 스타일로 전면 교체

아래 내용으로 교체한다. 주요 변경점:
- 박스(border 카드) 제거 → 수평 구분선 방식으로 변경
- 번호 제거, 더 깔끔한 메타 표시
- 썸네일 유지하되 비율·스타일 정제
- 타이포그래피 크기·무게 조정

```tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getCoverAlt, getCoverImage } from '@/lib/covers';
import { getCategoryColor } from '@/lib/categoryColors';

interface PostListItemProps {
  index: number;
  slug: string;
  title: string;
  description: string;
  date: string;
  category?: string;
  tags?: string[];
  image?: string;
}

export default function PostListItem({
  index,
  slug,
  title,
  description,
  date,
  category,
  tags,
  image,
}: PostListItemProps) {
  const cover = getCoverImage({ category, image });
  const catColor = getCategoryColor(category ?? '');

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 14 }}
      transition={{ duration: 0.22, delay: Math.min(index * 0.04, 0.3) }}
      className="group border-t border-border py-7 first:border-t-0"
    >
      <Link
        href={`/blog/${slug}`}
        className="flex items-start gap-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm"
      >
        {/* 텍스트 영역 */}
        <div className="min-w-0 flex-1">
          {/* 메타 */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold tracking-[0.1em] uppercase text-muted">
            <time>{date}</time>
            {category && (
              <>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-border" />
                <span className={catColor.text}>{category}</span>
              </>
            )}
          </div>

          {/* 제목 */}
          <h2 className="mt-2.5 text-xl sm:text-2xl font-semibold tracking-tight leading-[1.18] group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {title}
          </h2>

          {/* 설명 */}
          <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2 max-w-xl">
            {description}
          </p>

          {/* 태그 */}
          {tags && tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[11px] rounded-full border border-border bg-card/80 text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 썸네일 */}
        <div className="relative hidden sm:block w-[120px] md:w-[160px] shrink-0">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-card">
            <Image
              src={cover}
              alt={getCoverAlt({ title, category })}
              fill
              className="object-cover scale-[1.01] transition-transform duration-500 group-hover:scale-[1.06]"
              sizes="(max-width: 768px) 120px, 160px"
            />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
```

### Step 3: 빌드 타입 체크

```bash
cd ~/Dropbox/code/joonit && npx tsc --noEmit
```

오류가 없어야 한다.

### Step 4: 커밋

```bash
cd ~/Dropbox/code/joonit
git add components/PostListItem.tsx
git commit -m "refactor: PostListItem 에디토리얼 스타일로 업데이트"
```

---

## Task 4: BlogContent 레이아웃 전면 교체

**Files:**
- Modify: `app/blog/BlogContent.tsx`

### Step 1: 현재 BlogContent 읽기

`app/blog/BlogContent.tsx` 전체를 읽어 현재 import와 state 구조를 파악한다.

### Step 2: BlogContent 교체

주요 변경:
- `PostVisualCard` → `BlogHero` (첫 번째 글) + `PostListItem` (나머지)
- masonry `columns-*` 레이아웃 제거
- `AnimatePresence` + `layout` 기반 리스트 유지
- 사이드바 구조 유지 (검색 + 카테고리)
- Hero와 리스트 사이에 구분 헤더 추가

```tsx
'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import BlogHero from '@/components/BlogHero';
import PostListItem from '@/components/PostListItem';
import CategoryFilter from '@/components/CategoryFilter';
import type { PostMeta } from '@/lib/posts';

interface BlogContentProps {
  posts: PostMeta[];
  categories: string[];
  initialCategory?: string;
  initialQuery?: string;
}

export default function BlogContent({
  posts,
  categories,
  initialCategory,
  initialQuery,
}: BlogContentProps) {
  const safeInitialCategory =
    initialCategory && categories.includes(initialCategory) ? initialCategory : '전체';

  const [selected, setSelected] = useState(safeInitialCategory);
  const [query, setQuery] = useState(initialQuery ?? '');

  const normalizedQuery = query.trim().toLowerCase();
  const filteredPosts = posts
    .filter((post) => (selected === '전체' ? true : post.category === selected))
    .filter((post) => {
      if (!normalizedQuery) return true;
      const hay = [post.title, post.description, post.category, ...(post.tags ?? [])]
        .join(' ')
        .toLowerCase();
      return hay.includes(normalizedQuery);
    });

  const [heroPosts, listPosts] = filteredPosts.length > 0
    ? [filteredPosts.slice(0, 1), filteredPosts.slice(1)]
    : [[], []];

  return (
    <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
      {/* 사이드바 */}
      <aside className="space-y-5 lg:sticky lg:top-28 self-start">
        {/* 검색 */}
        <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm">
          <p className="text-xs font-semibold tracking-[0.08em] uppercase text-muted mb-3">
            검색
          </p>
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="제목, 태그, 카테고리..."
              aria-label="블로그 글 검색"
              className="w-full rounded-xl border border-border bg-background/40 px-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </div>
          <p className="mt-3 text-xs text-muted">{filteredPosts.length}개의 글</p>
        </div>

        {/* 카테고리 */}
        <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm">
          <p className="text-xs font-semibold tracking-[0.08em] uppercase text-muted mb-3">
            주제
          </p>
          <CategoryFilter
            categories={categories}
            selected={selected}
            onChange={setSelected}
            variant="sidebar"
          />
        </div>
      </aside>

      {/* 메인 컨텐츠 */}
      <section>
        {filteredPosts.length === 0 ? (
          <div className="py-20 text-center text-muted">
            <p>해당 조건에 맞는 글이 없습니다.</p>
          </div>
        ) : (
          <>
            {/* Hero — 최신 글 */}
            {heroPosts.map((post) => (
              <BlogHero
                key={post.slug}
                slug={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                category={post.category}
                tags={post.tags}
                image={post.image}
              />
            ))}

            {/* 리스트 구분선 */}
            {listPosts.length > 0 && (
              <div className="mb-2 flex items-center gap-4">
                <p className="text-xs font-semibold tracking-[0.1em] uppercase text-muted shrink-0">
                  더 많은 글
                </p>
                <div className="flex-1 h-px bg-border" />
              </div>
            )}

            {/* 리스트 — 나머지 글 */}
            <AnimatePresence mode="popLayout">
              {listPosts.map((post, idx) => (
                <PostListItem
                  key={post.slug}
                  index={idx}
                  slug={post.slug}
                  title={post.title}
                  description={post.description}
                  date={post.date}
                  category={post.category}
                  tags={post.tags}
                  image={post.image}
                />
              ))}
            </AnimatePresence>
          </>
        )}
      </section>
    </div>
  );
}
```

### Step 3: 빌드 타입 체크

```bash
cd ~/Dropbox/code/joonit && npx tsc --noEmit
```

### Step 4: 브라우저에서 `/blog` 확인

개발 서버에서 `http://localhost:3000/blog` 열어서 확인:
- [ ] Hero가 최신 글로 렌더링되는가
- [ ] 나머지 글이 리스트로 표시되는가
- [ ] 검색하면 Hero가 교체되는가
- [ ] 카테고리 필터가 동작하는가
- [ ] 모바일 레이아웃이 깔끔한가 (DevTools에서 375px 확인)

### Step 5: 커밋

```bash
cd ~/Dropbox/code/joonit
git add app/blog/BlogContent.tsx
git commit -m "feat: 블로그 목록 에디토리얼 레이아웃 적용 (Hero + List)"
```

---

## Task 5: 블로그 페이지 헤더 타이포그래피 업그레이드

**Files:**
- Modify: `app/blog/page.tsx`

### Step 1: 현재 page.tsx 읽기

`app/blog/page.tsx` 전체를 읽어 h1과 설명 문구의 현재 스타일을 파악한다.

### Step 2: 헤더를 에디토리얼 스타일로 수정

h1에 `font-editorial` 적용, 크기·여백 업그레이드:

```tsx
<AnimatedSection>
  <h1 className="font-editorial text-5xl sm:text-6xl font-bold tracking-tight leading-[1.06] mb-5">
    글
  </h1>
  <p className="text-muted text-base sm:text-lg leading-[1.8] mb-12 max-w-xl">
    개발, 역사, 그리고 일상. 지금의 생각을 가능한 한 좋은 문장으로 남깁니다.
  </p>
</AnimatedSection>
```

### Step 3: 브라우저 확인

`http://localhost:3000/blog` 열어서 Playfair Display 폰트로 "글" 헤딩이 렌더링되는지 확인.

### Step 4: 커밋

```bash
cd ~/Dropbox/code/joonit
git add app/blog/page.tsx
git commit -m "style: 블로그 페이지 헤더 에디토리얼 타이포그래피 적용"
```

---

## Task 6: 전체 빌드 검증 및 버전 업

**Files:**
- Modify: `package.json`

### Step 1: 프로덕션 빌드

```bash
cd ~/Dropbox/code/joonit && npm run build
```

빌드 에러가 없어야 한다.

### Step 2: 다크모드 확인

브라우저 DevTools에서 다크모드 강제 전환 후 `/blog` 확인:
- [ ] 배경/텍스트 색상이 정상인가
- [ ] 카드 border가 다크모드 CSS 변수를 따르는가
- [ ] Hero 이미지 그라디언트가 적절한가

### Step 3: package.json 버전 업

`package.json`의 `"version"` 필드를 `"0.6.0"` → `"0.7.0"` 으로 변경.

### Step 4: 최종 커밋

```bash
cd ~/Dropbox/code/joonit
git add package.json
git commit -m "chore: v0.7.0 — 블로그 에디토리얼 디자인 개편"
```

---

## 완료 체크리스트

- [ ] Playfair Display 폰트가 Hero h2와 page h1에 적용됨
- [ ] BlogHero 컴포넌트: 최신 글을 풀 이미지 + 큰 타이포그래피로 표시
- [ ] PostListItem: 박스 제거, 구분선 + 에디토리얼 텍스트 레이아웃
- [ ] BlogContent: Hero + 리스트 구조, 사이드바 유지
- [ ] 검색/필터 정상 동작 (Hero도 교체됨)
- [ ] 다크모드 정상
- [ ] 모바일 레이아웃 정상 (375px)
- [ ] 프로덕션 빌드 통과
- [ ] package.json v0.7.0 업데이트

---

## 참고 사항

**`font-editorial` 클래스가 적용 안 될 경우:**
Tailwind v4에서 커스텀 폰트 유틸리티는 `@theme inline` 블록의 `--font-editorial` 값에서 자동 생성된다. `font-editorial` 클래스가 작동하려면 `app/globals.css`의 `@theme inline` 안에 `--font-editorial: var(--font-editorial-stack);` 이 있어야 한다.

**Hero 이미지가 없는 경우:**
`getCoverImage()`가 카테고리 기반 기본 커버 이미지를 반환하므로 모든 글에 이미지가 표시된다.

**필터 후 글이 1개인 경우:**
`heroPosts`에만 들어가고 `listPosts`는 빈 배열이 되어 "더 많은 글" 구분선이 숨겨진다. 정상 동작.
