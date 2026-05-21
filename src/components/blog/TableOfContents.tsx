import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface Heading {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  contentHtml: string;
  className?: string;
}

export function TableOfContents({ contentHtml, className = '' }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Parse headings from HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(contentHtml, 'text/html');
    const headingElements = doc.querySelectorAll('h2, h3, h4');

    const extractedHeadings: Heading[] = [];
    headingElements.forEach((el, index) => {
      if (!el.id) {
        el.id = `heading-${index}`;
      }
      extractedHeadings.push({
        id: el.id,
        title: el.textContent || '',
        level: parseInt(el.tagName[1]),
      });
    });

    setHeadings(extractedHeadings);

    // Observe headings for scroll tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0% -50% 0%' }
    );

    headingElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [contentHtml]);

  if (headings.length === 0) return null;

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`sticky top-24 ${className}`}
    >
      <nav className="bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800 p-4">
        <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
          <ChevronDown className="w-4 h-4" />
          On this page
        </h3>

        <ul className="space-y-2">
          {headings.map((heading) => {
            const isActive = heading.id === activeId;
            const paddingLeft = (heading.level - 2) * 12;

            return (
              <motion.li
                key={heading.id}
                whileHover={{ x: 4 }}
                style={{ paddingLeft }}
              >
                <button
                  onClick={() => handleClick(heading.id)}
                  className={`text-sm transition-all duration-200 block w-full text-left ${
                    isActive
                      ? 'text-primary font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {heading.title}
                </button>
              </motion.li>
            );
          })}
        </ul>
      </nav>
    </motion.aside>
  );
}
