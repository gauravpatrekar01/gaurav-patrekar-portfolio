import { useEffect } from 'react';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: (code, language) => {
      if (language && hljs.getLanguage(language)) {
        try {
          return hljs.highlight(code, { language, ignoreIllegals: true }).value;
        } catch (err) {
          console.error('Highlight error:', err);
          return code;
        }
      }
      return code;
    },
  });

  // Add IDs to headings for TOC
  const originalHeadingRule = md.renderer.rules.heading_open;
  md.renderer.rules.heading_open = (tokens, idx, options, env, renderer) => {
    const token = tokens[idx];
    const content = tokens[idx + 1].content;
    const id = content
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    token.attrSet('id', id);
    return originalHeadingRule
      ? originalHeadingRule(tokens, idx, options, env, renderer)
      : renderer.renderToken(tokens, idx, options);
  };

  const html = md.render(content);

  useEffect(() => {
    // Re-highlight code blocks after rendering
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  }, [content]);

  return (
    <div
      className={`prose prose-sm dark:prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
