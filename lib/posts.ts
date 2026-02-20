import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');
const baseCategories = ['개발', '역사', '일상', '여행'] as const;

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags?: string[];
  image?: string;
  draft?: boolean;
}

export async function getAllPosts(): Promise<PostMeta[]> {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || 'Untitled',
        description: data.description || '',
        date: data.date || new Date().toISOString().split('T')[0],
        category: data.category || '개발',
        tags: data.tags || [],
        image: data.image,
        draft: data.draft || false,
      };
    })
    .filter((post) => !post.draft);

  return posts.sort((a, b) => {
    if (a.date === b.date) {
      return a.slug.localeCompare(b.slug);
    }
    return a.date > b.date ? -1 : 1;
  });
}

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: {
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || new Date().toISOString().split('T')[0],
      category: data.category || '개발',
      tags: data.tags || [],
      image: data.image,
    },
    content,
  };
}

export async function getLatestPosts(count: number = 5): Promise<PostMeta[]> {
  const posts = await getAllPosts();
  return posts.slice(0, count);
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const discovered = [...new Set(posts.map((post) => post.category).filter(Boolean))];
  const extras = discovered
    .filter((category) => !baseCategories.includes(category as (typeof baseCategories)[number]))
    .sort((a, b) => a.localeCompare(b, 'ko-KR'));
  return [...baseCategories, ...extras];
}
