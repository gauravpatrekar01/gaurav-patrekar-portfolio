import { motion } from 'framer-motion';
import { Share2, Link as LinkIcon, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ShareButtonsProps {
  title: string;
  slug: string;
  className?: string;
}

export function ShareButtons({ title, slug, className = '' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const baseUrl = window.location.origin;
  const postUrl = `${baseUrl}/blog/${slug}`;
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(title);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=Check out this article: ${postUrl}`,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-2 ${className}`}
    >
      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
        Share:
      </span>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
          className="gap-2"
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <LinkIcon className="w-4 h-4" />
          )}
          {copied ? 'Copied' : 'Copy'}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => window.open(shareLinks.twitter, '_blank')}
            >
              <span>Share on Twitter</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => window.open(shareLinks.linkedin, '_blank')}
            >
              <span>Share on LinkedIn</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => window.open(shareLinks.facebook, '_blank')}
            >
              <span>Share on Facebook</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => window.open(shareLinks.email, '_blank')}
            >
              <span>Share via Email</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
}
