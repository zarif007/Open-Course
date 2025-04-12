import { IDocContent } from '@/types/courseTopic';
import DOMPurify from 'dompurify';
import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-sql';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/toolbar/prism-toolbar.js';
import 'prismjs/plugins/toolbar/prism-toolbar.css';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js';

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
      'button',
      'svg',
      'path',
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
      'data-language',
      'data-line',
      'data-start',
      'aria-hidden',
      'viewBox',
      'd',
      'fill',
      'xmlns',
      'width',
      'height',
      'stroke',
      'stroke-width',
      'stroke-linecap',
      'stroke-linejoin',
    ],
    ADD_ATTR: ['target'],
  };

  const addCodeLanguageClasses = (html: string) => {
    // Find code blocks with language hints (```javascript, ```python, etc.)
    const regex =
      /<pre><code class="[^"]*">(?:\s*)([\s\S]*?)(?:\s*)<\/code><\/pre>/g;
    const codeLanguages = {
      js: 'language-javascript',
      javascript: 'language-javascript',
      jsx: 'language-jsx',
      ts: 'language-typescript',
      typescript: 'language-typescript',
      py: 'language-python',
      python: 'language-python',
      java: 'language-java',
      bash: 'language-bash',
      sh: 'language-bash',
      css: 'language-css',
      html: 'language-markup',
      json: 'language-json',
      sql: 'language-sql',
      md: 'language-markdown',
      markdown: 'language-markdown',
    };

    // Check for language hints at the beginning of code blocks
    return html.replace(regex, (match, codeContent) => {
      // Extract first line to check for language indicator
      const firstLine = codeContent.trim().split('\n')[0];
      let language = 'language-none';

      // Check if the first line is a language indicator
      if (firstLine.match(/^[a-zA-Z0-9+#]+$/)) {
        const langKey = firstLine.toLowerCase();
        if (codeLanguages[langKey as keyof typeof codeLanguages]) {
          language = codeLanguages[langKey as keyof typeof codeLanguages];
          // Remove the language indicator line
          codeContent = codeContent.replace(firstLine + '\n', '');
        }
      }

      return `<pre class="line-numbers"><code class="bg-gray-200 dark:bg-gray-800 rounded px-1 ${language}">${codeContent}</code></pre>`;
    });
  };

  const formatContent = (rawContent: string) => {
    // Basic HTML formatting
    let formatted = rawContent
      .replace(/<h1>/g, '<h1 class="text-3xl font-bold my-6">')
      .replace(/<h2>/g, '<h2 class="text-2xl font-bold my-5">')
      .replace(/<h3>/g, '<h3 class="text-xl font-bold my-4">')
      .replace(/<h4>/g, '<h4 class="text-lg font-bold my-3">')
      .replace(/<h5>/g, '<h5 class="text-base font-bold my-2">')
      .replace(/<h6>/g, '<h6 class="text-sm font-bold my-2">')
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
        '<code class="font-mono bg-gray-200 dark:bg-gray-800 rounded px-1">'
      )
      .replace(
        /<pre><code/g,
        '<pre class="relative group rounded-md p-0 my-6 overflow-hidden bg-[#1e1e1e] text-white"><code'
      )
      .replace(
        /<table>/g,
        '<table class="min-w-full border border-gray-300 my-4">'
      )
      .replace(
        /<th>/g,
        '<th class="border border-gray-300 px-4 py-2 bg-gray-100 dark:bg-gray-700">'
      )
      .replace(/<td>/g, '<td class="border border-gray-300 px-4 py-2">');

    // Add language detection and enhanced formatting for code blocks
    formatted = addCodeLanguageClasses(formatted);

    // Add copy button to code blocks
    formatted = formatted.replace(
      /<pre class="line-numbers"><code/g,
      `<pre class="line-numbers relative group"><div class="absolute right-2 top-2 hidden group-hover:block">
        <button class="bg-gray-700 hover:bg-gray-600 text-white rounded px-2 py-1 text-xs" onclick="navigator.clipboard.writeText(this.parentNode.parentNode.querySelector('code').innerText)">
          Copy
        </button>
      </div><code`
    );

    return formatted;
  };

  useEffect(() => {
    if (contentRef.current) {
      // Apply syntax highlighting to code blocks
      const codeBlocks = contentRef.current.querySelectorAll('pre code');
      codeBlocks.forEach((block) => {
        Prism.highlightElement(block);
      });

      // Make external links open in new tab
      const links = contentRef.current.querySelectorAll('a');
      links.forEach((link) => {
        if (link.hostname !== window.location.hostname) {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
        }
      });

      // Add click event for code block copy buttons
      const copyButtons = contentRef.current.querySelectorAll('pre button');
      copyButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
          const codeBlock = (e.currentTarget as HTMLElement)
            .closest('pre')
            ?.querySelector('code');
          if (codeBlock) {
            navigator.clipboard.writeText(codeBlock.textContent || '');

            // Show "Copied!" feedback
            const originalText = (e.currentTarget as HTMLElement).textContent;
            (e.currentTarget as HTMLElement).textContent = 'Copied!';
            setTimeout(() => {
              (e.currentTarget as HTMLElement).textContent = originalText;
            }, 2000);
          }
        });
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

      <style jsx global>{`
        /* Custom styles for code blocks */
        .prose pre {
          margin: 1.5em 0;
          padding: 0;
          background: #1e1e1e;
          border-radius: 0.5rem;
          overflow: hidden;
        }

        .prose pre code {
          padding: 1rem;
          font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', monospace;
          font-size: 0.9rem;
          line-height: 1.5;
          display: block;
          overflow-x: auto;
        }

        /* Line numbers styling */
        .line-numbers .line-numbers-rows {
          position: absolute;
          pointer-events: none;
          top: 1rem;
          left: 0.75rem;
          width: 3em;
          letter-spacing: -1px;
          border-right: 1px solid #999;
          user-select: none;
        }

        .line-numbers-rows > span {
          display: block;
          counter-increment: linenumber;
        }

        .line-numbers-rows > span:before {
          content: counter(linenumber);
          color: #999;
          display: block;
          padding-right: 0.8em;
          text-align: right;
        }

        /* Token colors */
        .token.comment,
        .token.prolog,
        .token.doctype,
        .token.cdata {
          color: #6a9955;
        }

        .token.punctuation {
          color: #d4d4d4;
        }

        .token.property,
        .token.tag,
        .token.boolean,
        .token.number,
        .token.constant,
        .token.symbol,
        .token.deleted {
          color: #b5cea8;
        }

        .token.selector,
        .token.attr-name,
        .token.string,
        .token.char,
        .token.builtin,
        .token.inserted {
          color: #ce9178;
        }

        .token.operator,
        .token.entity,
        .token.url,
        .language-css .token.string,
        .style .token.string {
          color: #d4d4d4;
        }

        .token.atrule,
        .token.attr-value,
        .token.keyword {
          color: #569cd6;
        }

        .token.function,
        .token.class-name {
          color: #dcdcaa;
        }

        .token.regex,
        .token.important,
        .token.variable {
          color: #d16969;
        }

        /* Dark mode adjustments */
        .dark .prose pre {
          background: #1e1e1e;
        }

        .dark .prose pre code {
          color: #d4d4d4;
        }
      `}</style>
    </div>
  );
};

export default DocDisplay;
