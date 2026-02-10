'use client';

import { motion } from 'framer-motion';

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onChange: (category: string) => void;
  variant?: 'pills' | 'sidebar';
}

export default function CategoryFilter({
  categories,
  selected,
  onChange,
  variant = 'pills',
}: CategoryFilterProps) {
  const allCategories = ['전체', ...categories];

  if (variant === 'sidebar') {
    return (
      <div className="space-y-1">
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => onChange(category)}
            className="group relative w-full rounded-xl border border-border bg-card/60 px-4 py-3 text-left transition-colors hover:bg-card/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"
          >
            {selected === category && (
              <motion.span
                layoutId="category-indicator-sidebar"
                className="absolute inset-0 rounded-xl border border-primary/25 bg-primary/10"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span
              className={`relative z-10 text-sm font-semibold tracking-tight ${
                selected === category
                  ? 'text-foreground'
                  : 'text-muted group-hover:text-foreground'
              }`}
            >
              {category}
            </span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 -mb-2">
      {allCategories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className="relative px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap border border-border bg-card/50 hover:bg-card/70 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          {selected === category && (
            <motion.span
              layoutId="category-indicator-pills"
              className="absolute inset-0 bg-primary rounded-full shadow-sm"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
            />
          )}
          <span
            className={`relative z-10 ${
              selected === category
                ? 'text-white dark:text-background'
                : 'text-muted hover:text-foreground'
            }`}
          >
            {category}
          </span>
        </button>
      ))}
    </div>
  );
}
