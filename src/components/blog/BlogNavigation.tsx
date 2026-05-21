import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BlogListItem } from '@/lib/blog/types';

interface NavigationLink {
  post?: BlogListItem;
  direction: 'prev' | 'next';
}

interface BlogNavigationProps {
  previous?: NavigationLink['post'];
  next?: NavigationLink['post'];
}

export function BlogNavigation({ previous, next }: BlogNavigationProps) {
  if (!previous && !next) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800"
    >
      {previous ? (
        <Link to={`/blog/${previous.slug}`}>
          <motion.div
            whileHover={{ x: -4 }}
            className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-primary hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <ArrowLeft className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="text-xs uppercase font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Previous
                </p>
                <h4 className="font-semibold text-slate-900 dark:text-white line-clamp-2 hover:text-primary transition-colors">
                  {previous.title}
                </h4>
              </div>
            </div>
          </motion.div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link to={`/blog/${next.slug}`} className="md:text-right">
          <motion.div
            whileHover={{ x: 4 }}
            className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-primary hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
          >
            <div className="flex items-start justify-end gap-3">
              <div>
                <p className="text-xs uppercase font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Next
                </p>
                <h4 className="font-semibold text-slate-900 dark:text-white line-clamp-2 hover:text-primary transition-colors">
                  {next.title}
                </h4>
              </div>
              <ArrowRight className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
            </div>
          </motion.div>
        </Link>
      ) : (
        <div />
      )}
    </motion.nav>
  );
}
