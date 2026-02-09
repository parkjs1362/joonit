'use client';

import { motion } from 'framer-motion';

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({ categories, selected, onChange }: CategoryFilterProps) {
  const allCategories = ['전체', ...categories];

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 -mb-2">
      {allCategories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className="relative px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors duration-200"
        >
          {selected === category && (
            <motion.span
              layoutId="category-indicator"
              className="absolute inset-0 bg-primary rounded-full"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
            />
          )}
          <span
            className={`relative z-10 ${
              selected === category
                ? 'text-white'
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
