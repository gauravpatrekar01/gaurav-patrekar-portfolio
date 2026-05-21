import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { useBlogSearch } from '@/lib/blog/hooks';

interface BlogSearchProps {
  onResultsChange?: (query: string, count: number) => void;
  className?: string;
}

export function BlogSearch({ onResultsChange, className = '' }: BlogSearchProps) {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { data: results = [], isLoading } = useBlogSearch(query);

  useEffect(() => {
    onResultsChange?.(query, results.length);
  }, [query, results.length, onResultsChange]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClear = () => {
    setQuery('');
    setShowResults(false);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <Input
          type="text"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => query && setShowResults(true)}
          className="pl-10 pr-10"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {showResults && query && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-lg z-50 max-h-96 overflow-y-auto"
        >
          {isLoading ? (
            <div className="p-4 text-center text-slate-500">
              Searching...
            </div>
          ) : results.length > 0 ? (
            <ul className="divide-y divide-slate-200 dark:divide-slate-800">
              {results.map((result) => (
                <motion.li
                  key={result.slug}
                  whileHover={{ backgroundColor: '#f1f5f9' }}
                  className="dark:hover:bg-slate-800"
                >
                  <a
                    href={`/blog/${result.slug}`}
                    onClick={() => {
                      setShowResults(false);
                      setQuery('');
                    }}
                    className="block p-3 hover:no-underline"
                  >
                    <p className="font-medium text-slate-900 dark:text-white text-sm">
                      {result.title}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1 mt-1">
                      {result.excerpt}
                    </p>
                  </a>
                </motion.li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-slate-500 text-sm">
              No articles found
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
