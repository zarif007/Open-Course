import { IDocContent } from '@/types/courseTopic';
import DOMPurify from 'dompurify';
import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markdown';

const DocDisplay = ({ content }: { content: IDocContent }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const sanitizeConfig = {
    ALLOWED_TAGS: [
      'p',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'a',
      'ul',
      'ol',
      'li',
      'code',
      'pre',
      'strong',
      'em',
      'blockquote',
      'table',
      'thead',
      'tbody',
      'tr',
      'th',
      'td',
      'img',
      'br',
      'hr',
      'div',
      'span',
    ],
    ALLOWED_ATTR: [
      'href',
      'target',
      'rel',
      'src',
      'alt',
      'class',
      'id',
      'style',
    ],
    ADD_ATTR: ['target'],
  };

  const formatContent = (rawContent: string) => {
    let formatted = rawContent
      .replace(
        /<h([1-6])>/g,
        '<h$1 class="text-xl md:text-2xl font-bold my-4">'
      )
      .replace(/<p>/g, '<p class="my-3 text-base">')
      .replace(/<ul>/g, '<ul class="list-disc pl-6 my-4">')
      .replace(/<ol>/g, '<ol class="list-decimal pl-6 my-4">')
      .replace(/<li>/g, '<li class="my-1">')
      .replace(/<a /g, '<a class="text-blue-600 dark:text-blue-400 underline" ')
      .replace(
        /<blockquote>/g,
        '<blockquote class="border-l-4 border-rose-500 pl-4 italic my-4">'
      )
      .replace(
        /<code>/g,
        '<code class="bg-gray-200 dark:bg-gray-800 rounded px-1">'
      )
      .replace(
        /<pre><code/g,
        '<pre class="bg-gray-900 text-white rounded-md p-4 my-4 overflow-x-auto"><code'
      );

    return formatted;
  };

  useEffect(() => {
    if (contentRef.current) {
      const codeBlocks = contentRef.current.querySelectorAll('pre code');
      codeBlocks.forEach((block) => {
        Prism.highlightElement(block);
      });

      const links = contentRef.current.querySelectorAll('a');
      links.forEach((link) => {
        if (link.hostname !== window.location.hostname) {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
        }
      });
    }
  }, [content.content]);

  const formattedContent = formatContent(content.content);
  const sanitizedHtml = DOMPurify.sanitize(formattedContent, sanitizeConfig);

  return (
    <div className="rounded-lg p-4 mx-auto w-full min-h-[45vh] md:min-h-[80vh] border-[3px] border-rose-500 bg-slate-100 dark:bg-[#0a0a0a] overflow-hidden shadow-lg">
      <div
        ref={contentRef}
        className="prose prose-slate dark:prose-invert max-w-none overflow-x-auto px-2"
        dangerouslySetInnerHTML={{
          __html: sanitizedHtml,
        }}
      />
    </div>
  );
};

export default DocDisplay;
