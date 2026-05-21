import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { BLOG_API_URL } from './constants';
import { BlogPost, BlogListItem } from './types';

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: ['blog', 'post', slug],
    queryFn: async () => {
      const response = await fetch(`${BLOG_API_URL}/blogs/${slug}`);
      if (!response.ok) throw new Error('Failed to fetch blog post');
      return response.json() as Promise<BlogPost>;
    },
    staleTime: 1000 * 60 * 60,
  });
}

export function useBlogPosts(tag?: string, search?: string) {
  return useQuery({
    queryKey: ['blog', 'posts', tag, search],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (tag) params.append('tag', tag);
      if (search) params.append('q', search);

      const response = await fetch(
        `${BLOG_API_URL}/blogs?${params.toString()}`
      );
      if (!response.ok) throw new Error('Failed to fetch blog posts');
      return response.json() as Promise<BlogListItem[]>;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useBlogTags() {
  return useQuery({
    queryKey: ['blog', 'tags'],
    queryFn: async () => {
      const response = await fetch(`${BLOG_API_URL}/blogs/tags`);
      if (!response.ok) throw new Error('Failed to fetch tags');
      return response.json() as Promise<string[]>;
    },
    staleTime: 1000 * 60 * 60,
  });
}

export function useBlogSearch(query: string) {
  return useQuery({
    queryKey: ['blog', 'search', query],
    queryFn: async () => {
      const response = await fetch(`${BLOG_API_URL}/blogs/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Failed to search blogs');
      return response.json() as Promise<BlogListItem[]>;
    },
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 5,
  });
}

export function useInfiniteBlogPosts(tag?: string) {
  return useInfiniteQuery({
    queryKey: ['blog', 'infinite', tag],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        page: pageParam.toString(),
      });
      if (tag) params.append('tag', tag);

      const response = await fetch(`${BLOG_API_URL}/blogs?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch blog posts');
      return response.json() as Promise<BlogListItem[]>;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
}
