import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  BlogHeader,
  BlogCard,
  BlogSearch,
  BlogFilterBar,
  BlogListSkeleton,
} from '@/components/blog';
import { useBlogPosts, useBlogTags } from '@/lib/blog/hooks';

export default function BlogListPage() {
  const [selectedTag, setSelectedTag] = useState<string>();
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const { data: posts = [], isLoading: postsLoading, error: postsError } = useBlogPosts(
    selectedTag,
    searchQuery
  );
  const { data: tags = [], isLoading: tagsLoading } = useBlogTags();

  // Filter posts based on search and tag
  const filteredPosts = useMemo(() => {
    let result = posts;

    if (selectedTag) {
      result = result.filter((post) => post.tags.includes(selectedTag));
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return result;
  }, [posts, selectedTag, searchQuery]);

  const displayPosts = filteredPosts.slice((page - 1) * 9, page * 9);
  const totalPages = Math.ceil(filteredPosts.length / 9);

  if (postsError) {
    return (
      <div className="min-h-screen section-container py-20">
        <BlogHeader />
        <Alert variant="destructive" className="max-w-2xl mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load blog posts. Please make sure the backend is running.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen section-container py-20">
      <BlogHeader />

      <div className="max-w-7xl mx-auto">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <BlogSearch onResultsChange={(query) => {
            setSearchQuery(query);
            setPage(1);
          }} />
        </motion.div>

        {/* Filter Bar */}
        {!tagsLoading && tags.length > 0 && (
          <BlogFilterBar
            tags={tags}
            selectedTag={selectedTag}
            onTagChange={(tag) => {
              setSelectedTag(tag);
              setPage(1);
            }}
            postCount={filteredPosts.length}
          />
        )}

        {/* Posts Grid */}
        {postsLoading ? (
          <BlogListSkeleton />
        ) : displayPosts.length > 0 ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            >
              {displayPosts.map((post, idx) => (
                <BlogCard key={post.slug} post={post} index={idx} />
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center items-center gap-2"
              >
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => {
                      setPage(i + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                      page === i + 1
                        ? 'bg-primary text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
              No articles found
            </p>
            {(selectedTag || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedTag(undefined);
                  setSearchQuery('');
                  setPage(1);
                }}
                className="text-primary hover:underline font-medium"
              >
                Clear filters
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
