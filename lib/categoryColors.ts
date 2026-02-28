const categoryColorMap: Record<string, { text: string; bg: string; border: string }> = {
  개발: {
    text: 'text-blue-500 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-500/10',
    border: 'border-blue-200 dark:border-blue-500/20',
  },
  경제: {
    text: 'text-lime-600 dark:text-lime-400',
    bg: 'bg-lime-50 dark:bg-lime-500/10',
    border: 'border-lime-200 dark:border-lime-500/20',
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
  여행: {
    text: 'text-sky-500 dark:text-sky-400',
    bg: 'bg-sky-50 dark:bg-sky-500/10',
    border: 'border-sky-200 dark:border-sky-500/20',
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
