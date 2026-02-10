export function getCoverImage({
  category,
  image,
}: {
  category?: string;
  image?: string;
}): string {
  if (image) return image;

  // Category-level unified covers (same image for all posts in a category).
  const byCategory: Record<string, string> = {
    개발: '/images/covers/dev-1.svg',
    역사: '/images/covers/history-1.svg',
    일상: '/images/covers/daily-1.svg',
    default: '/images/covers/default-1.svg',
  };

  if (!category) return byCategory.default;
  return byCategory[category] ?? byCategory.default;
}

export function getCoverAlt({
  title,
  category,
}: {
  title: string;
  category?: string;
}): string {
  const prefix = category ? `${category} ` : '';
  return `${prefix}${title} 커버 이미지`;
}

