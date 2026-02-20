# NomadCoders-Inspired Design Overhaul Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Joonit 블로그를 NomadCoders 스타일의 밝고 활기찬 디자인으로 전면 개편한다.

**Architecture:** 현재 Apple-미니멀 디자인(흰 배경 + #0071e3 단일 포인트)을 NomadCoders의 "밝은 배경 + 카테고리별 컬러 + 활기찬 카드 호버 + 재미있는 톤" 방향으로 전환한다. 기존 컴포넌트 구조(Header, HeroSection, PostCard 등)는 유지하고 스타일링만 변경한다. Tailwind CSS + Framer Motion 기반.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, Framer Motion v12, CSS Variables

---

## 레퍼런스 분석: NomadCoders vs 현재 Joonit

| 요소 | NomadCoders | 현재 Joonit |
|------|-------------|-------------|
| 색상 | 밝은 흰 배경 + 카테고리별 컬러 뱃지 | 흰 배경 + #0071e3 단일 포인트 |
| 카드 호버 | translateY(-5~10px) + 이미지 scale(1.1) | y:-8 scale:1.02 + 이미지 scale(1.05) |
| 카테고리 | 초급(녹), 중급(노), 고급(파) 컬러 뱃지 | 모두 #0071e3 단일색 뱃지 |
| 톤 | 펀 + 이모지 ("Reviews 🔥") | Apple 미니멀, 절제된 |
| 히어로 | 대형 타이틀 + 부제 + 통계 | 대형 타이틀 + 카테고리 타일 |
| 카드 이미지 | hover시 scale(1.1) 줌 | hover시 scale(1.05) 줌 |
| 네비 | 상단 고정, 깔끔한 메뉴 | 상단 고정, 모바일 pill |

---

## Task 1: 카테고리별 컬러 시스템 추가

**Files:**
- Modify: `app/globals.css`
- Create: `lib/categoryColors.ts`

**Step 1: globals.css에 카테고리 컬러 CSS 변수 추가**

`app/globals.css`의 `:root` 블록 안에 다음 변수를 추가한다:

```css
/* Category colors (NomadCoders-inspired) */
--cat-dev: #3b82f6;        /* 개발 — 파란 */
--cat-dev-bg: #eff6ff;
--cat-history: #f59e0b;    /* 역사 — 노란 */
--cat-history-bg: #fffbeb;
--cat-life: #10b981;       /* 일상 — 초록 */
--cat-life-bg: #ecfdf5;
```

`.dark` 블록에도 대응 변수 추가:

```css
--cat-dev: #60a5fa;
--cat-dev-bg: rgba(96,165,250,0.1);
--cat-history: #fbbf24;
--cat-history-bg: rgba(251,191,36,0.1);
--cat-life: #34d399;
--cat-life-bg: rgba(52,211,153,0.1);
```

**Step 2: 카테고리 컬러 유틸리티 파일 생성**

`lib/categoryColors.ts`:

```ts
const categoryColorMap: Record<string, { text: string; bg: string; border: string }> = {
  개발: {
    text: 'text-blue-500 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-500/10',
    border: 'border-blue-200 dark:border-blue-500/20',
  },
  역사: {
    text: 'text-amber-500 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-500/10',
    border: 'border-amber-200 dark:border-amber-500/20',
  },
  일상: {
    text: 'text-emerald-500 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    border: 'border-emerald-200 dark:border-emerald-500/20',
  },
};

const fallback = {
  text: 'text-gray-500 dark:text-gray-400',
  bg: 'bg-gray-50 dark:bg-gray-500/10',
  border: 'border-gray-200 dark:border-gray-500/20',
};

export function getCategoryColor(category: string) {
  return categoryColorMap[category] ?? fallback;
}
```

**Step 3: 빌드 검증**

Run: `cd ~/Dropbox/code/joonit && npm run build`
Expected: 빌드 성공

**Step 4: 커밋**

```bash
git add app/globals.css lib/categoryColors.ts
git commit -m "feat: 카테고리별 컬러 시스템 추가 (NomadCoders 스타일)"
```

---

## Task 2: PostCard에 카테고리 컬러 뱃지 적용

**Files:**
- Modify: `components/PostCard.tsx`

**Step 1: getCategoryColor import 추가**

파일 상단에:
```tsx
import { getCategoryColor } from '@/lib/categoryColors';
```

**Step 2: 카테고리 뱃지 스타일 변경**

현재 코드 (모두 #0071e3):
```tsx
<span className="... border-[#0071e3]/20 bg-[#0071e3]/5 text-[#0071e3] ...">
```

변경:
```tsx
const catColor = getCategoryColor(category);
// ...
<span className={`px-2.5 py-0.5 text-xs rounded-full border ${catColor.border} ${catColor.bg} ${catColor.text} dark:border-current/20 dark:bg-current/5 font-medium`}>
```

**Step 3: 카드 호버 효과 강화 (NomadCoders 스타일)**

현재:
```tsx
whileHover={{ y: -8, scale: 1.02 }}
transition={{ type: 'spring', stiffness: 400, damping: 30 }}
```

변경 (더 강한 부유감):
```tsx
whileHover={{ y: -10, scale: 1.02 }}
transition={{ type: 'spring', stiffness: 300, damping: 25 }}
```

이미지 호버 줌 강화:
```tsx
// 현재: group-hover:scale-[1.05]
// 변경: group-hover:scale-[1.1]
```

**Step 4: 빌드 검증**

Run: `cd ~/Dropbox/code/joonit && npm run build`
Expected: 빌드 성공

**Step 5: 커밋**

```bash
git add components/PostCard.tsx
git commit -m "feat: PostCard 카테고리 컬러 뱃지 + 호버 강화"
```

---

## Task 3: PostVisualCard에 카테고리 컬러 적용

**Files:**
- Modify: `components/PostVisualCard.tsx`

**Step 1: getCategoryColor import 추가**

```tsx
import { getCategoryColor } from '@/lib/categoryColors';
```

**Step 2: 카테고리 표시에 컬러 적용**

현재 메타 영역의 카테고리 텍스트가 `text-white/75`로 통일되어 있다면,
카테고리 부분만 뱃지 스타일로 변경:

```tsx
const catColor = getCategoryColor(category);
// ...
<span className={`px-2 py-0.5 text-[11px] rounded-full ${catColor.bg} ${catColor.text} font-medium backdrop-blur`}>
  {category}
</span>
```

**Step 3: 이미지 호버 줌 강화**

```tsx
// 현재: group-hover:scale-[1.08]
// 변경: group-hover:scale-[1.12]
```

**Step 4: 빌드 검증**

Run: `cd ~/Dropbox/code/joonit && npm run build`
Expected: 빌드 성공

**Step 5: 커밋**

```bash
git add components/PostVisualCard.tsx
git commit -m "feat: PostVisualCard 카테고리 컬러 뱃지 + 줌 강화"
```

---

## Task 4: HeroSection 리디자인

**Files:**
- Modify: `components/HeroSection.tsx`

**Step 1: 히어로 타이틀을 NomadCoders 톤으로 변경**

현재 Apple 스타일의 절제된 히어로를 좀 더 활기찬 톤으로:

- 기존: "구체적으로 기억되는 기록을 씁니다" (절제된 톤)
- 변경: 더 직접적이고 활기찬 카피 + 통계 표시

히어로 하단에 블로그 통계 섹션 추가:
```tsx
<div className="flex items-center justify-center gap-8 mt-10">
  <div className="text-center">
    <p className="text-2xl sm:text-3xl font-bold text-foreground">80+</p>
    <p className="text-sm text-muted mt-1">발행된 글</p>
  </div>
  <div className="h-8 w-px bg-border" />
  <div className="text-center">
    <p className="text-2xl sm:text-3xl font-bold text-foreground">3</p>
    <p className="text-sm text-muted mt-1">카테고리</p>
  </div>
  <div className="h-8 w-px bg-border" />
  <div className="text-center">
    <p className="text-2xl sm:text-3xl font-bold text-foreground">매주</p>
    <p className="text-sm text-muted mt-1">업데이트</p>
  </div>
</div>
```

**Step 2: 카테고리 타일에 컬러 적용**

기존 카테고리 타일의 border/아이콘에 카테고리별 컬러를 적용한다.
`getCategoryColor`를 사용하여 각 카테고리 타일의 좌측 또는 상단에 컬러 악센트를 추가:

```tsx
import { getCategoryColor } from '@/lib/categoryColors';

// 카테고리 타일 렌더링 시:
const catColor = getCategoryColor(cat.name);
<div className={`... border-l-4 ${catColor.border.replace('border-', 'border-l-')}`}>
```

**Step 3: 빌드 검증**

Run: `cd ~/Dropbox/code/joonit && npm run build`
Expected: 빌드 성공

**Step 4: 커밋**

```bash
git add components/HeroSection.tsx
git commit -m "feat: HeroSection 통계 섹션 + 카테고리 컬러 타일"
```

---

## Task 5: CategoryFilter 컬러 적용

**Files:**
- Modify: `components/CategoryFilter.tsx`

**Step 1: 카테고리 필터 버튼에 컬러 적용**

현재 선택된 카테고리가 단일색이라면, 카테고리별 컬러를 적용한다:

```tsx
import { getCategoryColor } from '@/lib/categoryColors';

// 선택 상태일 때:
const catColor = getCategoryColor(cat);
// active: `${catColor.bg} ${catColor.text} ${catColor.border}`
// inactive: 기존 muted 스타일 유지
```

**Step 2: 빌드 검증**

Run: `cd ~/Dropbox/code/joonit && npm run build`
Expected: 빌드 성공

**Step 3: 커밋**

```bash
git add components/CategoryFilter.tsx
git commit -m "feat: CategoryFilter 카테고리별 컬러 적용"
```

---

## Task 6: 블로그 상세 페이지 카테고리 뱃지 컬러 적용

**Files:**
- Modify: `app/blog/[slug]/page.tsx`

**Step 1: 상세 페이지 카테고리 뱃지에 getCategoryColor 적용**

현재 상세 페이지의 카테고리 뱃지도 `#0071e3` 단일색이므로, 카테고리별 컬러로 변경:

```tsx
import { getCategoryColor } from '@/lib/categoryColors';

// 카테고리 뱃지 부분:
const catColor = getCategoryColor(post.category);
<span className={`px-3 py-1 text-xs rounded-full border ${catColor.border} ${catColor.bg} ${catColor.text} font-medium`}>
  {post.category}
</span>
```

**Step 2: 빌드 검증**

Run: `cd ~/Dropbox/code/joonit && npm run build`
Expected: 빌드 성공

**Step 3: 커밋**

```bash
git add app/blog/[slug]/page.tsx
git commit -m "feat: 블로그 상세 카테고리 뱃지 컬러 적용"
```

---

## Task 7: globals.css 카드 호버 효과 강화

**Files:**
- Modify: `app/globals.css`

**Step 1: card-hover 유틸리티 업데이트**

NomadCoders의 더 뚜렷한 호버 이펙트를 반영:

```css
.card-hover {
  transition: transform 200ms ease, box-shadow 240ms ease;
}

.card-hover:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.12);
}

.dark .card-hover:hover {
  box-shadow: 0 24px 64px rgba(96, 165, 250, 0.10);
}
```

**Step 2: 빌드 검증**

Run: `cd ~/Dropbox/code/joonit && npm run build`
Expected: 빌드 성공

**Step 3: 커밋**

```bash
git add app/globals.css
git commit -m "style: card-hover 효과 강화 (NomadCoders 스타일)"
```

---

## Task 8: Footer에 카테고리 링크 + 통계 추가

**Files:**
- Modify: `components/Footer.tsx`

**Step 1: Footer에 카테고리 바로가기 추가**

NomadCoders 푸터처럼 주요 카테고리 링크를 추가:

```tsx
<div className="flex flex-wrap gap-2">
  {['개발', '역사', '일상'].map((cat) => (
    <Link
      key={cat}
      href={`/blog?category=${cat}`}
      className="px-3 py-1.5 text-xs rounded-full border border-border bg-card/60 text-muted hover:text-foreground transition-colors"
    >
      {cat}
    </Link>
  ))}
</div>
```

**Step 2: 빌드 검증**

Run: `cd ~/Dropbox/code/joonit && npm run build`
Expected: 빌드 성공

**Step 3: 커밋**

```bash
git add components/Footer.tsx
git commit -m "feat: Footer 카테고리 바로가기 추가"
```

---

## Task 9: 버전 업데이트 + 최종 빌드 검증

**Files:**
- Modify: `package.json`

**Step 1: 버전 업데이트**

`package.json`의 `version`을 `0.5.3` → `0.6.0`으로 변경 (디자인 마이너 업데이트).

**Step 2: 최종 빌드 검증**

Run: `cd ~/Dropbox/code/joonit && npm run build`
Expected: 빌드 성공, 전체 페이지 정적 생성

**Step 3: 커밋 + 푸시**

```bash
git add package.json
git commit -m "chore: v0.6.0 — NomadCoders 스타일 디자인 개편"
git push
```

---

## 수정 파일 요약

| # | 파일 | 변경 내용 |
|---|------|-----------|
| 1 | `app/globals.css` | 카테고리 CSS 변수 + card-hover 강화 |
| 2 | `lib/categoryColors.ts` | 카테고리→컬러 매핑 유틸리티 (신규) |
| 3 | `components/PostCard.tsx` | 컬러 뱃지 + 호버/줌 강화 |
| 4 | `components/PostVisualCard.tsx` | 컬러 뱃지 + 줌 강화 |
| 5 | `components/HeroSection.tsx` | 통계 섹션 + 카테고리 컬러 타일 |
| 6 | `components/CategoryFilter.tsx` | 필터 버튼 카테고리 컬러 |
| 7 | `app/blog/[slug]/page.tsx` | 상세 뱃지 컬러 |
| 8 | `components/Footer.tsx` | 카테고리 바로가기 |
| 9 | `package.json` | 0.5.3 → 0.6.0 |
