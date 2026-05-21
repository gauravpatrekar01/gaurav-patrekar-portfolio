import os
import json
from pathlib import Path
from typing import Optional
from datetime import datetime
import markdown
import re
from enum import Enum

class MarkdownParseError(Exception):
    """Custom exception for markdown parsing errors."""
    pass


def parse_frontmatter(content: str) -> tuple[dict, str]:
    """
    Parse YAML-like frontmatter from markdown content.
    Returns (metadata_dict, content_without_frontmatter)
    """
    if not content.startswith('---'):
        return {}, content

    try:
        parts = content.split('---', 2)
        if len(parts) < 3:
            return {}, content

        frontmatter_str = parts[1].strip()
        markdown_content = parts[2].strip()

        # Simple YAML-like parser
        metadata = {}
        for line in frontmatter_str.split('\n'):
            if ':' not in line:
                continue

            key, value = line.split(':', 1)
            key = key.strip()
            value = value.strip()

            # Parse different value types
            if value.lower() in ('true', 'false'):
                metadata[key] = value.lower() == 'true'
            elif value.startswith('[') and value.endswith(']'):
                # Parse array
                try:
                    metadata[key] = json.loads(value)
                except json.JSONDecodeError:
                    # Fallback: split by comma
                    metadata[key] = [
                        v.strip().strip('"\'')
                        for v in value[1:-1].split(',')
                    ]
            elif value.startswith('"') and value.endswith('"'):
                metadata[key] = value[1:-1]
            elif value.startswith("'") and value.endswith("'"):
                metadata[key] = value[1:-1]
            else:
                metadata[key] = value

        return metadata, markdown_content

    except Exception as e:
        raise MarkdownParseError(f"Failed to parse frontmatter: {str(e)}")


def markdown_to_html(content: str) -> str:
    """Convert markdown to HTML with code highlighting."""
    try:
        # Use markdown with extensions
        extensions = [
            'markdown.extensions.codehilite',
            'markdown.extensions.fenced_code',
            'markdown.extensions.tables',
            'markdown.extensions.toc',
            'markdown.extensions.nl2br',
        ]

        html = markdown.markdown(content, extensions=extensions)
        return html
    except Exception as e:
        raise MarkdownParseError(f"Failed to convert markdown to HTML: {str(e)}")


def calculate_reading_time(content: str) -> int:
    """Calculate estimated reading time in minutes."""
    words_per_minute = 200
    word_count = len(content.split())
    return max(1, round(word_count / words_per_minute))


def extract_excerpt(content: str, length: int = 150) -> str:
    """Extract a text excerpt from markdown content."""
    # Remove markdown formatting
    text = re.sub(r'[#*`\[\]()~]', '', content)
    text = re.sub(r'\n+', ' ', text)
    text = text.strip()

    if len(text) <= length:
        return text

    # Cut at word boundary
    excerpt = text[:length]
    last_space = excerpt.rfind(' ')
    if last_space > 0:
        excerpt = excerpt[:last_space]

    return excerpt + '...'


def generate_slug(filename: str) -> str:
    """Generate URL-friendly slug from filename."""
    # Remove extension
    name = os.path.splitext(filename)[0]

    # Convert to lowercase and replace spaces/underscores with hyphens
    slug = name.lower().replace('_', '-').replace(' ', '-')

    # Remove special characters
    slug = re.sub(r'[^a-z0-9-]', '', slug)

    # Remove consecutive hyphens
    slug = re.sub(r'-+', '-', slug)

    # Remove leading/trailing hyphens
    slug = slug.strip('-')

    return slug


def validate_metadata(metadata: dict) -> dict:
    """Validate and normalize blog metadata."""
    required_fields = {
        'title': 'Untitled',
        'description': '',
        'date': datetime.now().isoformat(),
        'tags': [],
        'cover': '/images/blog/default-cover.jpg',
    }

    # Fill in missing required fields
    for key, default_value in required_fields.items():
        if key not in metadata:
            metadata[key] = default_value

    # Ensure tags is a list
    if isinstance(metadata['tags'], str):
        metadata['tags'] = [tag.strip() for tag in metadata['tags'].split(',')]
    elif not isinstance(metadata['tags'], list):
        metadata['tags'] = []

    # Ensure date is valid ISO format
    try:
        datetime.fromisoformat(metadata['date'])
    except (ValueError, TypeError):
        metadata['date'] = datetime.now().isoformat()

    # Set defaults for optional fields
    metadata.setdefault('author', 'Gaurav Patrekar')
    metadata.setdefault('featured', False)

    return metadata
