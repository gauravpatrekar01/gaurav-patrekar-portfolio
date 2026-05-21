import logging
import os
from datetime import datetime
from pathlib import Path
from typing import List, Optional

from pydantic import BaseModel, Field

from ..utils.markdown_parser import (
    calculate_reading_time,
    extract_excerpt,
    generate_slug,
    markdown_to_html,
    parse_frontmatter,
    validate_metadata,
)

logger = logging.getLogger("portfolio_blog_api.blog_service")


class BlogMetadata(BaseModel):
    title: str
    description: str
    date: datetime
    tags: List[str]
    cover: str
    featured: bool = False
    author: str = "Gaurav Patrekar"
    reading_time: int = Field(..., alias="readingTime")

    model_config = {
        "populate_by_name": True,
        "json_encoders": {datetime: lambda value: value.isoformat()},
    }


class BlogPost(BlogMetadata):
    slug: str
    excerpt: str
    content: str
    html_content: Optional[str] = Field(None, alias="htmlContent")


class BlogListItem(BlogMetadata):
    slug: str
    excerpt: str


class BlogService:
    def __init__(self, blogs_dir: str = "blogs"):
        self.blogs_dir = Path(blogs_dir)
        self.blogs_dir.mkdir(exist_ok=True)

    def get_all_posts(self) -> List[BlogPost]:
        """Get all blog posts sorted by date (newest first)."""
        posts: List[BlogPost] = []

        if not self.blogs_dir.exists():
            logger.warning("Blogs directory does not exist: %s", self.blogs_dir)
            return posts

        for file_path in sorted(self.blogs_dir.glob("*.md")):
            post = self.parse_blog_file(file_path)
            if post:
                posts.append(post)

        posts.sort(key=lambda p: p.date, reverse=True)
        return posts

    def get_post_by_slug(self, slug: str) -> Optional[BlogPost]:
        """Get a specific blog post by slug."""
        if not self.blogs_dir.exists():
            logger.warning("Blogs directory does not exist when looking for slug: %s", slug)
            return None

        for file_path in self.blogs_dir.glob("*.md"):
            if generate_slug(file_path.stem) == slug:
                return self.parse_blog_file(file_path)

        logger.info("Blog post not found for slug: %s", slug)
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
            excerpt = metadata.get("excerpt") or extract_excerpt(markdown_content)
            html_content = markdown_to_html(markdown_content)

            post = BlogPost(
                slug=slug,
                content=markdown_content,
                html_content=html_content,
                excerpt=excerpt,
                reading_time=reading_time,
                **metadata,
            )

            return post
        except Exception as exc:
            logger.exception("Failed to parse blog file %s", file_path)
            return None

    def get_all_tags(self) -> List[str]:
        """Get all unique tags from all posts."""
        tags = set()
        for post in self.get_all_posts():
            tags.update(post.tags)
        return sorted(tags)

    def filter_posts_by_tag(self, tag: str) -> List[BlogPost]:
        """Get all posts with a specific tag."""
        return [post for post in self.get_all_posts() if tag in post.tags]

    def search_posts(self, query: str) -> List[BlogPost]:
        """Search posts by title, description, or tags."""
        query_lower = query.strip().lower()
        return [
            post
            for post in self.get_all_posts()
            if query_lower in post.title.lower()
            or query_lower in post.description.lower()
            or any(query_lower in tag.lower() for tag in post.tags)
        ]

    def get_featured_posts(self, limit: int = 3) -> List[BlogPost]:
        """Get featured posts."""
        return [post for post in self.get_all_posts() if post.featured][:limit]

    def get_related_posts(self, slug: str, limit: int = 3) -> List[BlogPost]:
        """Get posts related to a specific post by tags."""
        current_post = self.get_post_by_slug(slug)
        if not current_post:
            return []

        related = []
        for post in self.get_all_posts():
            if post.slug == slug:
                continue

            shared_tags = set(current_post.tags) & set(post.tags)
            if shared_tags:
                related.append((post, len(shared_tags)))

        related.sort(key=lambda item: item[1], reverse=True)
        return [post for post, _ in related[:limit]]
