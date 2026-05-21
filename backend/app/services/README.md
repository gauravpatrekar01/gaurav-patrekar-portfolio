# Services

Business logic and data processing services for the blog system.

## Services Included

- **blog_service.py**: Main blog service
  - `BlogService`: Core service for blog operations
    - get_all_posts() - Retrieve all blog posts
    - get_post_by_slug() - Get a specific blog post
    - parse_blog_file() - Parse markdown file
    - get_all_tags() - Get all unique tags
    - filter_posts_by_tag() - Filter posts by tag
    - search_posts() - Search posts by query
    - get_featured_posts() - Get featured posts
    - get_related_posts() - Get related posts
