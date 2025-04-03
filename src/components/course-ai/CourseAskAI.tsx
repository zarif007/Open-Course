import { scrapeWebsite } from '@/actions/scrapeWebsite';
import { useAppSelector } from '@/redux/store';
import { set } from 'cypress/types/lodash';
import { Mic } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const CourseAskAI = () => {
  const [body, setBody] = useState('');
  const currentCourseTopic = useAppSelector(
    (state) => state.courseViewReducer.value.currentCourseTopic
  );

  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const scrapeWebsiteData = async () => {
      const lastVersion = currentCourseTopic.versions.at(-1);
      if (lastVersion?.data && 'url' in lastVersion.data) {
        const url = (lastVersion.data as { url: string }).url;
        const data = await scrapeWebsite(url);
        console.log(data.body);
        setBody(data.body || '');
      }
    };
    if (currentCourseTopic) {
      scrapeWebsiteData();
    }
  }, [currentCourseTopic]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      console.log('Submitted:', inputText);
      setInputText('');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 overflow-y-auto p-4">
        <div className="text-center h-full flex items-center justify-center">
          {body}
        </div>
      </main>

      <div className="sticky bottom-0 w-full bg-white dark:bg-black border-gray-200 dark:border-neutral-800 py-4 px-4">
        <div className="container mx-auto max-w-6xl">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center gap-2 absolute left-4 top-1/2 -translate-y-1/2">
              <Mic className="w-4 h-4 text-gray-400 dark:text-neutral-400" />
            </div>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full p-4 pl-20 pr-32 rounded-lg bg-gray-100 dark:bg-neutral-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-neutral-400 border border-gray-300 dark:border-neutral-800 focus:outline-none focus:border-gray-400 dark:focus:border-neutral-700 focus:ring-1 focus:ring-gray-400 dark:focus:ring-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Ask anything..."
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button
                type="submit"
                disabled={!inputText.trim()}
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
