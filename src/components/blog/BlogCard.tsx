import { motion } from 'framer-motion';
import { formatDistanceToNow, format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { BlogListItem } from '@/lib/blog/types';

interface BlogCardProps {
  post: BlogListItem;
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  const publishDate = new Date(post.date);
  const dateFormatted = format(publishDate, 'MMM dd, yyyy');
  const relativeDate = formatDistanceToNow(publishDate, { addSuffix: true });

  return (
    <Link to={`/blog/${post.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        viewport={{ once: true, margin: '-100px' }}
        whileHover={{ y: -8 }}
        className="h-full group"
      >
        <div className="h-full bg-white dark:bg-slate-900 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-shadow duration-300">
          {/* Image Container */}
          <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700">
            {post.cover && post.cover !== '/images/blog/default-cover.jpg' ? (
              <img
                src={post.cover}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">📝</div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Blog Post</p>
                </div>
              </div>
            )}
            {post.featured && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-amber-500 hover:bg-amber-600">Featured</Badge>
              </div>
            )}
          </div>

          {/* Content Container */}
          <div className="p-4 flex flex-col h-[220px]">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs font-medium"
                >
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{post.tags.length - 2}
                </Badge>
              )}
            </div>

            {/* Title */}
            <h3 className="font-bold text-lg line-clamp-2 text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 flex-grow mb-3">
              {post.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <time title={dateFormatted}>{relativeDate}</time>
                {post.readingTime && (
                  <>
                    <span>•</span>
                    <span>{post.readingTime} min read</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
