import { scrapeWebsite } from '@/actions/scrapeWebsite';
import { useAppSelector } from '@/redux/store';
import { da } from 'date-fns/locale';
import { Mic } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

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
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-rose-500 ml-auto max-w-[80%]'
                      : 'bg-gray-100 dark:bg-neutral-800 mr-auto max-w-[80%]'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  ) : (
                    message.content
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="p-4 rounded-lg bg-gray-100 dark:bg-neutral-800 mr-auto max-w-[80%]">
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
    </div>
  );
};

export default CourseAskAI;
