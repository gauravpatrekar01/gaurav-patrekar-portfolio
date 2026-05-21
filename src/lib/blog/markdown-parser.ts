import matter from 'gray-matter';
import { BlogMetadata, BlogPost } from './types';

export function parseMarkdownFile(content: string): { metadata: BlogMetadata; content: string } {
  try {
    const { data, content: mdContent } = matter(content);
    
    const metadata: BlogMetadata = {
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      tags: Array.isArray(data.tags) ? data.tags : [],
      cover: data.cover || '/images/blog/default-cover.jpg',
      featured: data.featured || false,
      author: data.author || 'Gaurav Patrekar',
      readingTime: calculateReadingTime(mdContent),
    };

    return { metadata, content: mdContent };
  } catch (error) {
    console.error('Error parsing markdown:', error);
    return {
      metadata: {
        title: 'Error',
        description: 'Failed to parse blog post',
        date: new Date().toISOString(),
        tags: [],
        cover: '/images/blog/default-cover.jpg',
      },
      content: '',
    };
  }
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function generateSlug(filename: string): string {
  return filename
    .replace(/\.md$|\.mdx$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function extractExcerpt(content: string, length: number = 150): string {
  return content
    .replace(/[#*`[\]()]/g, '')
    .split('\n')
    .filter(line => line.trim())
    .join(' ')
    .substring(0, length)
    .trim() + '...';
}

export function highlightCode(html: string): string {
  return html
    .replace(/<pre><code class="language-(\w+)">/g, '<pre><code class="hljs language-$1">')
    .replace(/<code class="language-(\w+)">/g, '<code class="hljs language-$1">');
}
