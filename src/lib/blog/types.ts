export interface BlogMetadata {
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover: string;
  featured?: boolean;
  author?: string;
  readingTime?: number;
}

export interface BlogPost extends BlogMetadata {
  slug: string;
  content: string;
  htmlContent?: string;
}

export interface BlogListItem extends BlogMetadata {
  slug: string;
  excerpt: string;
}

export interface SearchResult extends BlogListItem {
  score: number;
}
