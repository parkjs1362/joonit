function stableHash(input: string): string {
  // Small deterministic hash to keep IDs stable without pulling extra deps.
  let h = 0;
  for (let i = 0; i < input.length; i += 1) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return h.toString(36);
}

export function slugifyHeading(input: string): string {
  const base = input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    // Keep unicode letters/numbers/marks (Korean included), drop punctuation.
    .replace(/[^\p{Letter}\p{Number}\p{Mark}-]+/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  if (base.length > 0) return base;
  return `section-${stableHash(input)}`;
}

