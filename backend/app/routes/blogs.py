from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from ..services.blog_service import BlogService, BlogPost, BlogListItem

router = APIRouter(prefix="/blogs", tags=["blogs"])
blog_service = BlogService(blogs_dir="blogs")


@router.get("", response_model=List[BlogListItem])
async def get_blogs(
    tag: Optional[str] = Query(None),
    q: Optional[str] = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(9, ge=1, le=50),
):
    """
    Get blog posts with optional filtering by tag or search query.
    
    - **tag**: Filter by tag
    - **q**: Search query (searches title, description, and tags)
    - **page**: Page number for pagination
    - **limit**: Number of posts per page
    """
    try:
        if q:
            posts = blog_service.search_posts(q)
        elif tag:
            posts = blog_service.filter_posts_by_tag(tag)
        else:
            posts = blog_service.get_all_posts()

        # Pagination
        start = (page - 1) * limit
        end = start + limit
        paginated_posts = posts[start:end]

        # Convert to BlogListItem
        return [
            BlogListItem(
                slug=post.slug,
                title=post.title,
                description=post.description,
                date=post.date,
                tags=post.tags,
                cover=post.cover,
                featured=post.featured,
                author=post.author,
                readingTime=post.readingTime,
                excerpt=post.excerpt,
            )
            for post in paginated_posts
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/featured", response_model=List[BlogListItem])
async def get_featured_blogs(limit: int = Query(3, ge=1, le=10)):
    """Get featured blog posts."""
    try:
        posts = blog_service.get_featured_posts(limit=limit)
        return [
            BlogListItem(
                slug=post.slug,
                title=post.title,
                description=post.description,
                date=post.date,
                tags=post.tags,
                cover=post.cover,
                featured=post.featured,
                author=post.author,
                readingTime=post.readingTime,
                excerpt=post.excerpt,
            )
            for post in posts
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/related/{slug}", response_model=List[BlogListItem])
async def get_related_posts(slug: str, limit: int = Query(3, ge=1, le=10)):
    """Get posts related to a specific post."""
    try:
        posts = blog_service.get_related_posts(slug, limit=limit)
        return [
            BlogListItem(
                slug=post.slug,
                title=post.title,
                description=post.description,
                date=post.date,
                tags=post.tags,
                cover=post.cover,
                featured=post.featured,
                author=post.author,
                readingTime=post.readingTime,
                excerpt=post.excerpt,
            )
            for post in posts
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/search", response_model=List[BlogListItem])
async def search_blogs(q: str = Query(...)):
    """Search blog posts by query."""
    if not q or len(q) < 2:
        raise HTTPException(status_code=400, detail="Query must be at least 2 characters")

    try:
        posts = blog_service.search_posts(q)
        return [
            BlogListItem(
                slug=post.slug,
                title=post.title,
                description=post.description,
                date=post.date,
                tags=post.tags,
                cover=post.cover,
                featured=post.featured,
                author=post.author,
                readingTime=post.readingTime,
                excerpt=post.excerpt,
            )
            for post in posts
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/tags", response_model=List[str])
async def get_tags():
    """Get all available tags."""
    try:
        return blog_service.get_all_tags()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{slug}", response_model=BlogPost)
async def get_blog(slug: str):
    """Get a specific blog post by slug."""
    try:
        post = blog_service.get_post_by_slug(slug)
        if not post:
            raise HTTPException(status_code=404, detail="Blog post not found")
        return post
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
