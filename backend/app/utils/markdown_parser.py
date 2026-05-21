import re
from datetime import datetime
from typing import Optional

import frontmatter
import markdown


class MarkdownParseError(Exception):
    """Custom exception for markdown parsing errors."""


def parse_frontmatter(content: str) -> tuple[dict, str]:
    """Parse markdown and frontmatter using python-frontmatter."""
    try:
        parsed = frontmatter.loads(content)
        metadata = parsed.metadata or {}
        markdown_content = parsed.content or ""
        return metadata, markdown_content.strip()
    except Exception as exc:
        raise MarkdownParseError(f"Failed to parse frontmatter: {exc}") from exc


def markdown_to_html(content: str) -> str:
    """Convert markdown to HTML with code highlighting."""
    try:
        extensions = [
            "fenced_code",
            "codehilite",
            "tables",
            "toc",
            "nl2br",
        ]

        extension_configs = {
            "codehilite": {
                "guess_lang": False,
                "pygments_style": "default",
            }
        }

        return markdown.markdown(
            content,
            extensions=extensions,
            extension_configs=extension_configs,
            output_format="html5",
        )
    except Exception as exc:
        raise MarkdownParseError(f"Failed to convert markdown to HTML: {exc}") from exc


def calculate_reading_time(content: str) -> int:
    """Calculate estimated reading time in minutes."""
    words_per_minute = 200
    words = len(re.findall(r"\w+", content))
    return max(1, round(words / words_per_minute))


def extract_excerpt(content: str, length: int = 150) -> str:
    """Extract a clean text excerpt from markdown content."""
    text = re.sub(r"<[^>]+>", "", content)
    text = re.sub(r"[#*>`~\[\](){}]", "", text)
    text = re.sub(r"\s+", " ", text).strip()

    if len(text) <= length:
        return text

    excerpt = text[:length]
    last_space = excerpt.rfind(" ")
    if last_space > 0:
        excerpt = excerpt[:last_space]

    return excerpt.strip() + "..."


def generate_slug(filename: str) -> str:
    """Generate a URL-friendly slug from a filename."""
    slug = filename.lower().replace("_", "-").replace(" ", "-")
    slug = re.sub(r"[^a-z0-9-]", "", slug)
    slug = re.sub(r"-+", "-", slug)
    return slug.strip("-")


def validate_metadata(metadata: dict) -> dict:
    """Validate and normalize markdown frontmatter metadata."""
    defaults = {
        "title": "Untitled",
        "description": "",
        "date": datetime.now().isoformat(),
        "tags": [],
        "cover": "/images/blog/default-cover.jpg",
        "author": "Gaurav Patrekar",
        "featured": False,
    }

    normalized = {**defaults, **(metadata or {})}

    if isinstance(normalized["tags"], str):
        normalized["tags"] = [tag.strip() for tag in normalized["tags"].split(",") if tag.strip()]
    elif not isinstance(normalized["tags"], list):
        normalized["tags"] = []

    try:
        if isinstance(normalized["date"], datetime):
            normalized["date"] = normalized["date"].isoformat()
        else:
            datetime.fromisoformat(str(normalized["date"]))
    except (TypeError, ValueError):
        normalized["date"] = datetime.now().isoformat()

    return normalized
