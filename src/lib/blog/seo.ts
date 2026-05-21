import { BlogMetadata } from './types';

const SITE_URL = 'https://gauravpatrekar.dev';
const SITE_NAME = 'Gaurav Patrekar';
const AUTHOR = 'Gaurav Patrekar';

export interface SEOConfig {
  title: string;
  description: string;
  image?: string;
  url: string;
  type?: 'article' | 'website';
  publishedDate?: string;
  tags?: string[];
}

export function generateMetaTags(config: SEOConfig): string {
  const url = `${SITE_URL}${config.url}`;
  const image = config.image || `${SITE_URL}/og-image.jpg`;
  const type = config.type || 'website';

  return `
    <!-- Primary Meta Tags -->
    <meta name="title" content="${escapeHtml(config.title)}" />
    <meta name="description" content="${escapeHtml(config.description)}" />
    <meta name="keywords" content="${escapeHtml((config.tags || []).join(', '))}" />
    <meta name="author" content="${AUTHOR}" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="canonical" href="${url}" />

    <!-- Open Graph Tags -->
    <meta property="og:type" content="${type}" />
    <meta property="og:title" content="${escapeHtml(config.title)}" />
    <meta property="og:description" content="${escapeHtml(config.description)}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:site_name" content="${SITE_NAME}" />

    <!-- Twitter Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(config.title)}" />
    <meta name="twitter:description" content="${escapeHtml(config.description)}" />
    <meta name="twitter:image" content="${image}" />
    <meta name="twitter:creator" content="@gauravpatrekar" />

    ${config.publishedDate ? `<meta property="article:published_time" content="${config.publishedDate}" />` : ''}
    ${config.tags?.length ? `<meta property="article:tag" content="${escapeHtml(config.tags.join(', '))}" />` : ''}
  `;
}

export function generateJsonLd(
  type: 'BlogPosting' | 'Blog',
  data: BlogMetadata & { slug: string; url: string }
): string {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
    headline: data.title,
    description: data.description,
    image: data.cover,
    datePublished: data.date,
    author: {
      '@type': 'Person',
      name: data.author || AUTHOR,
    },
  };

  if (type === 'BlogPosting') {
    return JSON.stringify({
      ...baseData,
      '@id': `${SITE_URL}${data.url}`,
      url: `${SITE_URL}${data.url}`,
      keywords: data.tags.join(', '),
    });
  }

  return JSON.stringify({
    '@type': 'Blog',
    name: SITE_NAME,
    description: 'A developer blog focused on web development and technology',
    url: SITE_URL,
    image: '/og-image.jpg',
  });
}

export function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export function generateSitemap(posts: Array<{ slug: string; date: string }>): string {
  const baseUrl = SITE_URL;
  const postUrls = posts
    .map(
      (post) => `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  ${postUrls}
</urlset>`;
}
