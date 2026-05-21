import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ChevronUp } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  BlogMeta,
  BlogNavigation,
  RelatedPosts,
  ShareButtons,
  TableOfContents,
  BlogDetailSkeleton,
  MarkdownRenderer,
} from '@/components/blog';
import { useBlogPost, useBlogPosts } from '@/lib/blog/hooks';

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { data: post, isLoading: postLoading, error: postError } = useBlogPost(
    slug || ''
  );
  const { data: allPosts = [] } = useBlogPosts();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (postError) {
    return (
      <div className="min-h-screen section-container py-20 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button
            onClick={() => navigate('/blog')}
            className="mb-8 text-primary hover:underline font-medium"
          >
            ← Back to blog
          </button>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Could not find this blog post. It may have been removed or the URL is incorrect.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (postLoading || !post) {
    return (
      <div className="min-h-screen section-container py-20">
        <BlogDetailSkeleton />
      </div>
    );
  }

  // Get related posts by tags
  const relatedPosts = allPosts.filter(
    (p) =>
      p.slug !== post.slug &&
      p.tags.some((tag) => post.tags.includes(tag))
  );

  // Get previous and next posts by date
  const sortedPosts = [...allPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const currentIndex = sortedPosts.findIndex((p) => p.slug === post.slug);
  const nextPost =
    currentIndex > 0 ? sortedPosts[currentIndex - 1] : undefined;
  const previousPost =
    currentIndex < sortedPosts.length - 1
      ? sortedPosts[currentIndex + 1]
      : undefined;

  return (
    <div className="min-h-screen section-container py-12 md:py-20">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/blog')}
        className="mb-8 text-primary hover:underline font-medium"
      >
        ← Back to blog
      </motion.button>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Main Content */}
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3"
          >
            {/* Header */}
            <header className="mb-8">
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white"
              >
                {post.title}
              </motion.h1>

              <BlogMeta
                date={post.date}
                readingTime={post.readingTime}
                author={post.author}
                tags={post.tags}
                className="mb-8 pb-8 border-b border-slate-200 dark:border-slate-800"
              />

              <ShareButtons title={post.title} slug={post.slug} />
            </header>

            {/* Cover Image */}
            {post.cover && post.cover !== '/images/blog/default-cover.jpg' && (
              <motion.img
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                src={post.cover}
                alt={post.title}
                className="w-full h-96 object-cover rounded-lg mb-12 shadow-lg"
              />
            )}

            {/* Content */}
            <motion.article
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <MarkdownRenderer
                content={post.content}
                className="mb-12"
              />
            </motion.article>

            {/* Post Navigation */}
            <BlogNavigation previous={previousPost} next={nextPost} />

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <RelatedPosts posts={relatedPosts} limit={3} />
            )}
          </motion.main>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <TableOfContents contentHtml={post.htmlContent || post.content} />
          </aside>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-primary text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </div>
  );
}
