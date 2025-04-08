import { scrapeWebsite } from '@/actions/scrapeWebsite';
import { useAppSelector } from '@/redux/store';
import { Mic, Send } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';

const CourseAskAI = () => {
  const currentCourseTopic = useAppSelector(
    (state) => state.courseViewReducer.value.currentCourseTopic
  );

  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<
    Array<{ role: 'user' | 'assistant'; content: string }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [scrapedContent, setScrapedContent] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([]);
  }, []);

  useEffect(() => {
    const scrapeWebsiteData = async () => {
      try {
        const lastVersion = currentCourseTopic.versions.at(-1);
        if (lastVersion?.data && 'url' in lastVersion.data) {
          const url = (lastVersion.data as { url: string }).url;
          const data = await scrapeWebsite(url);

          if (data && typeof data === 'object' && 'textContent' in data) {
            setScrapedContent(data.textContent as string);
          }
        }
      } catch (error) {
        console.error('Error scraping website:', error);
      }
    };

    if (currentCourseTopic) {
      scrapeWebsiteData();
    }
  }, [currentCourseTopic]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && scrapedContent) {
      const userMessage = { role: 'user' as const, content: inputText };
      setMessages((prev) => [...prev, userMessage]);
      setInputText('');
      setIsLoading(true);

      try {
        const response = await fetch('/api/ai/ai-ask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            context: scrapedContent,
            messages: [...messages, userMessage],
          }),
        });

        const data = await response.json();

        if (response.ok && data.response) {
          setMessages((prev) => [
            ...prev,
            { role: 'assistant', content: data.response },
          ]);
        } else {
          console.error('Error from RAG API:', data.error);
          setMessages((prev) => [
            ...prev,
            {
              role: 'assistant',
              content:
                'I encountered an error processing your request. Please try again later.',
            },
          ]);
        }
      } catch (error) {
        console.error('Error calling RAG API:', error);
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              'I encountered an error processing your request. Please try again later.',
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 overflow-y-auto p-4">
        <div className="max-w-6xl mx-auto">
          {messages.length === 0 ? (
            <div className="text-center h-full flex items-center justify-center">
              <p className="text-gray-500 dark:text-neutral-400">
                Ask any question about this course topic!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`rounded-lg p-4 max-w-[85%] ${
                      message.role === 'user'
                        ? 'bg-rose-500 text-white'
                        : 'bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white'
                    }`}
                  >
                    {message.role === 'assistant' ? (
                      <div className="markdown-content">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            code({ node, className, children, ...props }) {
                              const match = /language-(\w+)/.exec(
                                className || ''
                              );
                              return match ? (
                                <SyntaxHighlighter
                                  style={vscDarkPlus}
                                  language={match[1]}
                                  PreTag="div"
                                  customStyle={{
                                    borderRadius: '0.375rem',
                                    margin: '0.5rem 0',
                                    fontSize: '0.875rem',
                                  }}
                                >
                                  {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                              ) : (
                                <code
                                  className={`${className} bg-gray-200 dark:bg-neutral-700 px-1 py-0.5 rounded text-sm`}
                                  {...props}
                                >
                                  {children}
                                </code>
                              );
                            },
                            p({ children }) {
                              return (
                                <p className="mb-4 last:mb-0">{children}</p>
                              );
                            },
                            a({ node, children, href, ...props }) {
                              return (
                                <a
                                  className="text-blue-500 hover:text-blue-700 underline"
                                  href={href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  {...props}
                                >
                                  {children}
                                </a>
                              );
                            },
                            ul({ children }) {
                              return (
                                <ul className="list-disc ml-6 mb-4 space-y-1">
                                  {children}
                                </ul>
                              );
                            },
                            ol({ children }) {
                              return (
                                <ol className="list-decimal ml-6 mb-4 space-y-1">
                                  {children}
                                </ol>
                              );
                            },
                            li({ children }) {
                              return <li className="mb-1">{children}</li>;
                            },
                            blockquote({ children }) {
                              return (
                                <blockquote className="border-l-4 border-gray-300 dark:border-neutral-600 pl-4 py-1 my-2 italic">
                                  {children}
                                </blockquote>
                              );
                            },
                            h1({ children }) {
                              return (
                                <h1 className="text-2xl font-bold mb-4 mt-6">
                                  {children}
                                </h1>
                              );
                            },
                            h2({ children }) {
                              return (
                                <h2 className="text-xl font-bold mb-3 mt-5">
                                  {children}
                                </h2>
                              );
                            },
                            h3({ children }) {
                              return (
                                <h3 className="text-lg font-bold mb-2 mt-4">
                                  {children}
                                </h3>
                              );
                            },
                            table({ children }) {
                              return (
                                <div className="overflow-x-auto mb-4">
                                  <table className="min-w-full border-collapse border border-gray-300 dark:border-neutral-700">
                                    {children}
                                  </table>
                                </div>
                              );
                            },
                            thead({ children }) {
                              return (
                                <thead className="bg-gray-200 dark:bg-neutral-700">
                                  {children}
                                </thead>
                              );
                            },
                            tbody({ children }) {
                              return <tbody>{children}</tbody>;
                            },
                            tr({ children }) {
                              return (
                                <tr className="border-b border-gray-300 dark:border-neutral-700">
                                  {children}
                                </tr>
                              );
                            },
                            th({ children }) {
                              return (
                                <th className="px-4 py-2 border-r border-gray-300 dark:border-neutral-700 last:border-0">
                                  {children}
                                </th>
                              );
                            },
                            td({ children }) {
                              return (
                                <td className="px-4 py-2 border-r border-gray-300 dark:border-neutral-700 last:border-0">
                                  {children}
                                </td>
                              );
                            },
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p>{message.content}</p>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="p-4 rounded-lg bg-gray-100 dark:bg-neutral-800">
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 bg-gray-500 dark:bg-neutral-400 rounded-full animate-bounce"></div>
                      <div
                        className="h-2 w-2 bg-gray-500 dark:bg-neutral-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                      ></div>
                      <div
                        className="h-2 w-2 bg-gray-500 dark:bg-neutral-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.4s' }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>

      <div className="sticky bottom-0 w-full bg-white dark:bg-black border-t border-gray-200 dark:border-neutral-800 py-4 px-4">
        <div className="container mx-auto max-w-6xl">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center gap-2 absolute left-4 top-1/2 -translate-y-1/2">
              <Mic className="w-4 h-4 text-gray-400 dark:text-neutral-400" />
            </div>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isLoading || !scrapedContent}
              className="w-full p-4 pl-20 pr-32 rounded-lg bg-gray-100 dark:bg-neutral-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-neutral-400 border border-gray-300 dark:border-neutral-800 focus:outline-none focus:border-gray-400 dark:focus:border-neutral-700 focus:ring-1 focus:ring-gray-400 dark:focus:ring-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder={
                scrapedContent ? 'Ask anything...' : 'Loading course content...'
              }
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading || !scrapedContent}
                className="p-2 rounded-md bg-gray-200 dark:bg-neutral-800 text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ↑
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* CSS for better markdown styling */}
      <style jsx global>{`
        .markdown-content ul {
          list-style-type: disc;
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .markdown-content ol {
          list-style-type: decimal;
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .markdown-content li {
          margin-bottom: 0.25rem;
        }
        .markdown-content p {
          margin-bottom: 1rem;
        }
        .markdown-content p:last-child {
          margin-bottom: 0;
        }
        .markdown-content h1,
        .markdown-content h2,
        .markdown-content h3,
        .markdown-content h4 {
          font-weight: bold;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .markdown-content h1 {
          font-size: 1.5rem;
        }
        .markdown-content h2 {
          font-size: 1.25rem;
        }
        .markdown-content h3 {
          font-size: 1.125rem;
        }
        .markdown-content h4 {
          font-size: 1rem;
        }
        .markdown-content pre {
          margin-bottom: 1rem;
          border-radius: 0.375rem;
          overflow: auto;
        }
        .markdown-content blockquote {
          border-left: 4px solid #e2e8f0;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
        }
        .dark .markdown-content blockquote {
          border-left-color: #4b5563;
        }
      `}</style>
    </div>
  );
};

export default CourseAskAI;
