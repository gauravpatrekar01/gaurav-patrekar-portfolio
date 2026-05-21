import { motion } from 'framer-motion';
import { Code, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface CodeBlockProps {
  language: string;
  code: string;
}

export function CodeBlock({ language, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative my-6 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 dark:bg-slate-950"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800 dark:bg-slate-900 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            {language}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 px-2 text-slate-400 hover:text-white hover:bg-slate-700"
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm leading-relaxed">
          <code
            className={`language-${language}`}
            dangerouslySetInnerHTML={{ __html: code }}
          />
        </pre>
      </div>
    </motion.div>
  );
}
