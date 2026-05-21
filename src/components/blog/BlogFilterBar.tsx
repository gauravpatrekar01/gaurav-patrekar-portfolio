import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface BlogFilterBarProps {
  tags: string[];
  selectedTag?: string;
  onTagChange: (tag: string | undefined) => void;
  postCount: number;
  className?: string;
}

export function BlogFilterBar({
  tags,
  selectedTag,
  onTagChange,
  postCount,
  className = '',
}: BlogFilterBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-wrap items-center gap-3 mb-8 ${className}`}
    >
      <div className="text-sm text-slate-600 dark:text-slate-400">
        Filters:
      </div>

      {/* Clear All Button */}
      {selectedTag && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onTagChange(undefined)}
          className="text-xs"
        >
          Clear filters
        </Button>
      )}

      {/* Tag Buttons */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <motion.div key={tag} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant={selectedTag === tag ? 'default' : 'outline'}
              size="sm"
              onClick={() => onTagChange(selectedTag === tag ? undefined : tag)}
              className="text-xs"
            >
              {tag}
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Result Count */}
      <div className="ml-auto text-xs text-slate-500 dark:text-slate-400">
        {postCount} article{postCount !== 1 ? 's' : ''}
      </div>
    </motion.div>
  );
}
