'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import CourseSuggestions from './CourseSuggestions';

interface CoursePromptInputProps {
  prompt: string;
  setPrompt: (value: string) => void;
  handleSubmit: () => void;
}

const placeholderExamples = [
  'Learn React from scratch',
  'Advanced Python for Data Science',
  'JavaScript for Beginners',
  'Digital Marketing Mastery',
  'Machine Learning Basics',
  'Web Design with CSS',
  'Photography Fundamentals',
];

const CoursePromptInput = ({
  prompt,
  setPrompt,
  handleSubmit,
}: CoursePromptInputProps) => {
  const [currentPlaceholder, setCurrentPlaceholder] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);

  useEffect(() => {
    const currentExample = placeholderExamples[currentExampleIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentIndex < currentExample.length) {
          setCurrentPlaceholder(currentExample.slice(0, currentIndex + 1));
          setCurrentIndex((prev) => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentIndex > 0) {
          setCurrentPlaceholder(currentExample.slice(0, currentIndex - 1));
          setCurrentIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
          setCurrentExampleIndex(
            (prev) => (prev + 1) % placeholderExamples.length
          );
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, currentExampleIndex]);

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center space-y-4 my-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          What Course do you want to{' '}
          <span className="px-2 rounded-md animate-gradient-border bg-[length:400%_100%] bg-gradient-to-r from-rose-500 via-rose-500 to-blue-500 dark:from-rose-800 dark:via-rose-800 dark:to-blue-800">
            build
          </span>{' '}
          today
        </h1>
        <p className="text:sm md:text-xl text-muted-foreground">
          Curate & Create any course with the power of{' '}
          <span className="font-bold text-[black] dark:text-[white]">AI</span>
        </p>
      </div>
      <div className="relative p-[2px] rounded-md animate-gradient-border bg-[length:400%_100%] bg-gradient-to-r from-rose-500 via-rose-500 to-blue-500 dark:from-rose-800 dark:via-rose-800 dark:to-blue-800">
        <div className="bg-background rounded-md flex flex-col items-center gap-3">
          <div className="relative w-full">
            <Textarea
              placeholder={`Example: '${currentPlaceholder}${
                currentPlaceholder ? '|' : ''
              }'`}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSubmit();
              }}
              className="min-h-[120px] text-lg shadow-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground flex-1 px-4 py-6 pr-12 resize-none placeholder:text-sm md:placeholder:text-lg"
            />
            <Button
              className="absolute right-3 bottom-3 h-12 w-12"
              variant="default"
              onClick={handleSubmit}
            >
              <ArrowUp className="w-10 h-10" />
            </Button>
          </div>
        </div>
      </div>

      <CourseSuggestions onSuggestionClick={handleSuggestionClick} />
    </div>
  );
};

export default CoursePromptInput;
