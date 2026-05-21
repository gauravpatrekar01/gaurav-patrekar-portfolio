# Blog System - Complete Setup Guide

A production-grade modern blogging system integrated into your portfolio website.

## 📁 Project Structure

```
├── blogs/                          # Markdown blog posts
│   ├── getting-started-with-fastapi.md
│   ├── react-hooks-guide.md
│   ├── typescript-best-practices.md
│   ├── css-grid-vs-flexbox.md
│   └── web-performance-guide.md
│
├── backend/                        # FastAPI Backend
│   ├── main.py                     # FastAPI app entry point
│   ├── requirements.txt            # Python dependencies
│   └── app/
│       ├── routes/blogs.py         # Blog API routes
│       ├── services/blog_service.py # Blog business logic
│       └── utils/markdown_parser.py # Markdown parsing utilities
│
└── src/                            # React Frontend
    ├── components/blog/            # Blog components
    │   ├── BlogCard.tsx            # Blog post card component
    │   ├── BlogHeader.tsx          # Blog page header
    │   ├── BlogMeta.tsx            # Post metadata display
    │   ├── BlogNavigation.tsx       # Next/Previous navigation
    │   ├── BlogSearch.tsx          # Search functionality
    │   ├── BlogFilterBar.tsx       # Tag filtering
    │   ├── CodeBlock.tsx           # Syntax-highlighted code blocks
    │   ├── MarkdownRenderer.tsx    # Markdown to HTML renderer
    │   ├── RelatedPosts.tsx        # Related posts section
    │   ├── ShareButtons.tsx        # Social sharing buttons
    │   ├── TableOfContents.tsx     # Dynamic table of contents
    │   └── BlogSkeleton.tsx        # Loading skeletons
    │
    ├── pages/blog/                 # Blog pages
    │   ├── Index.tsx               # Blog listing page (/blog)
    │   └── Detail.tsx              # Blog detail page (/blog/:slug)
    │
    ├── lib/blog/                   # Blog utilities
    │   ├── types.ts                # TypeScript types
    │   ├── markdown-parser.ts      # Markdown parsing utilities
    │   ├── seo.ts                  # SEO utilities
    │   ├── constants.ts            # Constants
    │   └── hooks.ts                # React Query hooks
    │
    └── App.tsx                     # Updated with blog routes
```

## 🚀 Getting Started

### 1. Frontend Setup

#### Install Dependencies

```bash
cd gaurav-patrekar-portfolio
npm install
# or
bun install
```

#### Run Development Server

```bash
npm run dev
# or
bun dev
```

The frontend will be available at `http://localhost:5173`

### 2. Backend Setup

#### Create Python Virtual Environment

```bash
cd backend
python -m venv venv

# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate
```

#### Install Dependencies

```bash
pip install -r requirements.txt
```

#### Run FastAPI Server

```bash
python main.py
```

The backend will be available at `http://localhost:8000`

Interactive API docs available at `http://localhost:8000/docs`

## 📝 Blog Post Format

Create markdown files in the `blogs/` directory with the following format:

```markdown
---
title: "Your Blog Title"
description: "A brief description for SEO (150-160 chars)"
date: "2026-05-21"
tags: ["Tag1", "Tag2", "Tag3"]
cover: "/images/blog/cover-image.jpg"
featured: true
author: "Your Name"
---

# Your Blog Content

Regular markdown content here...

## Section 2

More content...

\`\`\`javascript
// Code blocks with syntax highlighting
const example = "code";
\`\`\`
```

### Frontmatter Fields

- **title** (required): Blog post title
- **description** (required): SEO description
- **date** (required): Publication date (ISO format: YYYY-MM-DD)
- **tags** (required): Array of tags
- **cover** (optional): Cover image URL
- **featured** (optional): Mark as featured (boolean)
- **author** (optional): Author name (defaults to "Gaurav Patrekar")

## 🔗 API Endpoints

### Base URL: `http://localhost:8000/api`

#### Get All Blog Posts

```bash
GET /blogs?page=1&limit=9&tag=FastAPI&q=search-query
```

Query Parameters:
- `page`: Page number (default: 1)
- `limit`: Posts per page (default: 9, max: 50)
- `tag`: Filter by tag
- `q`: Search query

#### Get Single Blog Post

```bash
GET /blogs/{slug}
```

#### Get Featured Posts

```bash
GET /blogs/featured?limit=3
```

#### Get All Tags

```bash
GET /blogs/tags
```

#### Search Posts

```bash
GET /blogs/search?q=keyword
```

#### Get Related Posts

```bash
GET /blogs/related/{slug}?limit=3
```

## 🎨 Features

### Frontend Components

- **BlogCard**: Displays blog post in a grid with cover image, title, excerpt, tags, date, and reading time
- **BlogHeader**: Hero section for blog listing page
- **BlogSearch**: Real-time search with dropdown results
- **BlogFilterBar**: Tag-based filtering
- **TableOfContents**: Dynamic table of contents with scroll tracking
- **CodeBlock**: Syntax-highlighted code blocks with copy button
- **ShareButtons**: Social sharing (Twitter, LinkedIn, Facebook, Email)
- **RelatedPosts**: Shows related posts based on tags
- **BlogNavigation**: Next/Previous article navigation
- **BlogSkeleton**: Loading states

### SEO Optimization

- Dynamic meta tags
- OpenGraph tags
- Twitter Card tags
- Canonical URLs
- JSON-LD structured data
- Sitemap generation (ready to implement)
- robots.txt support

### Performance Features

- Lazy loading images
- Code splitting with React.lazy
- Markdown parsing optimization
- Query caching with React Query
- Responsive images

### UI/UX Features

- Smooth animations with Framer Motion
- Dark mode support
- Mobile-first responsive design
- Reading time estimation
- Relative date formatting
- Skeleton loading states
- Smooth scroll animations
- Scroll-to-top button (on detail page)

## 📊 Search and Filter

- **Tag-based filtering**: Click tags to filter posts
- **Full-text search**: Search by title, description, or tags
- **Pagination**: Navigate through posts with page numbers
- **Featured posts**: Highlight important posts

## 🔍 SEO Features

The system includes:

- Automatic meta tags generation
- OpenGraph tags for social sharing
- JSON-LD structured data
- Proper heading structure (H1-H4)
- Image alt text support
- Reading time estimation
- Canonical URL support

## 🎯 Usage Examples

### Access the Blog

1. **Blog Listing Page**: `http://localhost:5173/blog`
2. **Individual Post**: `http://localhost:5173/blog/getting-started-with-fastapi`

### Adding a New Blog Post

1. Create a new `.md` file in the `blogs/` directory
2. Add frontmatter with metadata
3. Write your content in markdown
4. Refresh the page - the post will appear automatically

### Creating Blog Navigation Links

The blog is integrated into the main navbar. Click "Blog" to access the blog listing page.

## 🛠️ Customization

### Modify Styling

All components use Tailwind CSS and are located in `src/components/blog/`. Customize by editing the className strings.

### Adjust Posts Per Page

Edit `POSTS_PER_PAGE` in `src/lib/blog/constants.ts`

### Change API URL

Update `BLOG_API_URL` in `src/lib/blog/constants.ts`

### Customize Featured Posts Count

Edit `FEATURED_POSTS_COUNT` in `src/lib/blog/constants.ts`

## 🚀 Deployment

### Frontend (Vercel/Netlify)

```bash
npm run build
```

Deploy the `dist/` folder

### Backend (Heroku/Railway)

```bash
# Install Python 3.11
# Set environment variables
# Deploy main.py with requirements.txt
```

## 📦 Future Enhancements

The architecture is designed to easily add:

- **MongoDB/PostgreSQL**: Replace markdown files with database
- **Admin Dashboard**: Create/edit posts from UI
- **Comments System**: Add user comments
- **Analytics**: Track page views and engagement
- **Newsletter**: Email subscription system
- **Tags Cloud**: Visualize popular tags
- **Related Posts**: AI-powered recommendations
- **Full-text Search**: Elasticsearch integration

## 🐛 Troubleshooting

### Blog posts not loading

1. Check if backend is running: `http://localhost:8000/health`
2. Verify `blogs/` directory exists
3. Check console errors in browser DevTools
4. Ensure markdown files have correct frontmatter

### Search not working

1. Check if search query is at least 2 characters
2. Verify tags are properly formatted in frontmatter
3. Check API response in Network tab

### Styling issues

1. Ensure Tailwind CSS is loaded
2. Check className spelling
3. Verify dark mode classes are applied

## 📚 Resources

- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [React Docs](https://react.dev/)
- [Markdown Guide](https://www.markdownguide.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 📄 License

This blog system is part of your portfolio. Use it freely!

---

**Happy Blogging! 🚀**
