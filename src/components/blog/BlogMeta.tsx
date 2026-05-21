import { formatDistanceToNow, format } from 'date-fns';
import { Clock, Calendar, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BlogMetaProps {
  date: string;
  readingTime?: number;
  author?: string;
  tags?: string[];
  className?: string;
}

export function BlogMeta({
  date,
  readingTime,
  author = 'Gaurav Patrekar',
  tags = [],
  className = '',
}: BlogMetaProps) {
  const publishDate = new Date(date);
  const dateFormatted = format(publishDate, 'MMMM dd, yyyy');
  const relativeDate = formatDistanceToNow(publishDate, { addSuffix: true });

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Date and Reading Time */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <time dateTime={date} title={dateFormatted}>
            {dateFormatted} ({relativeDate})
          </time>
        </div>

        {readingTime && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{readingTime} min read</span>
          </div>
        )}

        {author && (
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{author}</span>
          </div>
        )}
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-medium">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
