import os
from pathlib import Path
from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel
from ..utils.markdown_parser import (
    parse_frontmatter,
    markdown_to_html,
    calculate_reading_time,
    extract_excerpt,
    generate_slug,
    validate_metadata,
)


class BlogMetadata(BaseModel):
    title: str
    description: str
    date: str
    tags: List[str]
    cover: str
    featured: Optional[bool] = False
    author: Optional[str] = "Gaurav Patrekar"
    readingTime: Optional[int] = None


class BlogPost(BlogMetadata):
    slug: str
    content: str
    htmlContent: Optional[str] = None


class BlogListItem(BlogMetadata):
    slug: str
    excerpt: str


class BlogService:
    def __init__(self, blogs_dir: str = "blogs"):
        self.blogs_dir = Path(blogs_dir)
        self.blogs_dir.mkdir(exist_ok=True)

    def get_all_posts(self) -> List[BlogPost]:
        """Get all blog posts sorted by date (newest first)."""
        posts = []

        if not self.blogs_dir.exists():
            return posts

        for file_path in sorted(
            self.blogs_dir.glob("*.md"), reverse=True
        ):
            try:
                post = self.parse_blog_file(file_path)
                if post:
                    posts.append(post)
            except Exception as e:
                print(f"Error parsing {file_path}: {str(e)}")
                continue

        # Sort by date, newest first
        posts.sort(key=lambda p: p.date, reverse=True)
        return posts

    def get_post_by_slug(self, slug: str) -> Optional[BlogPost]:
        """Get a specific blog post by slug."""
        if not self.blogs_dir.exists():
            return None

        for file_path in self.blogs_dir.glob("*.md"):
            if generate_slug(file_path.stem) == slug:
                return self.parse_blog_file(file_path)

        return None

    def parse_blog_file(self, file_path: Path) -> Optional[BlogPost]:
        """Parse a markdown blog file."""
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()

            metadata, markdown_content = parse_frontmatter(content)
            metadata = validate_metadata(metadata)

            slug = generate_slug(file_path.stem)
            reading_time = calculate_reading_time(markdown_content)
            excerpt = extract_excerpt(markdown_content)
            html_content = markdown_to_html(markdown_content)

            metadata["readingTime"] = reading_time

            post = BlogPost(
                slug=slug,
                content=markdown_content,
                htmlContent=html_content,
                excerpt=excerpt,
                **metadata,
            )

            return post
        except Exception as e:
            print(f"Error parsing blog file {file_path}: {str(e)}")
            return None

    def get_all_tags(self) -> List[str]:
        """Get all unique tags from all posts."""
        tags = set()
        posts = self.get_all_posts()

        for post in posts:
            tags.update(post.tags)

        return sorted(list(tags))

    def filter_posts_by_tag(self, tag: str) -> List[BlogPost]:
        """Get all posts with a specific tag."""
        posts = self.get_all_posts()
        return [post for post in posts if tag in post.tags]

    def search_posts(self, query: str) -> List[BlogPost]:
        """Search posts by title, description, or tags."""
        posts = self.get_all_posts()
        query_lower = query.lower()

        results = []
        for post in posts:
            if (
                query_lower in post.title.lower()
                or query_lower in post.description.lower()
                or any(query_lower in tag.lower() for tag in post.tags)
            ):
                results.append(post)

        return results

    def get_featured_posts(self, limit: int = 3) -> List[BlogPost]:
        """Get featured posts."""
        posts = self.get_all_posts()
        featured = [post for post in posts if post.featured]
        return featured[:limit]

    def get_related_posts(self, slug: str, limit: int = 3) -> List[BlogPost]:
        """Get posts related to a specific post by tags."""
        post = self.get_post_by_slug(slug)
        if not post:
            return []

        all_posts = self.get_all_posts()
        related = []

        for other_post in all_posts:
            if other_post.slug == slug:
                continue

            # Calculate relevance by number of shared tags
            shared_tags = set(post.tags) & set(other_post.tags)
            if shared_tags:
                related.append((other_post, len(shared_tags)))

        # Sort by number of shared tags
        related.sort(key=lambda x: x[1], reverse=True)

        return [post for post, _ in related[:limit]]
