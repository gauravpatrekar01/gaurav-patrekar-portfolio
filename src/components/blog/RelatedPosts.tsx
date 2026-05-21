import { motion } from 'framer-motion';
import { BlogCard } from './BlogCard';
import { BlogListItem } from '@/lib/blog/types';

interface RelatedPostsProps {
  posts: BlogListItem[];
  limit?: number;
}

export function RelatedPosts({ posts, limit = 3 }: RelatedPostsProps) {
  const displayPosts = posts.slice(0, limit);

  if (displayPosts.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800"
    >
      <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">
        Related Articles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayPosts.map((post, index) => (
          <BlogCard key={post.slug} post={post} index={index} />
        ))}
      </div>
    </motion.section>
  );
}
