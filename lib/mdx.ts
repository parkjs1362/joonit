import { compileMDX } from 'next-mdx-remote/rsc';
import components from '@/components/MDXComponents';

export async function parseMDX(source: string) {
  const { content, frontmatter } = await compileMDX<{
    title: string;
    description: string;
    date: string;
    tags?: string[];
    image?: string;
  }>({
    source,
    components,
    options: {
      parseFrontmatter: true,
    },
  });

  return { content, frontmatter };
}
