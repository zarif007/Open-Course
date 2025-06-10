'use client';

import { motion } from 'framer-motion';

const COURSE_SUGGESTIONS = [
  'Python for Beginners',
  'How to Bake a Cake',
  'Digital Marketing Basics',
  'Photography for Beginners',
  'Excel Data Analysis',
  'Mobile App Development',
  'Guitar for Beginners',
];

interface CourseSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

const CourseSuggestions = ({ onSuggestionClick }: CourseSuggestionsProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="hidden md:block w-full max-w-4xl mx-auto mt-6"
  >
    <div className="text-center mb-4">
      <p className="text-sm text-gray-600 dark:text-neutral-400">
        Try one of these popular courses:
      </p>
    </div>
    <div className="flex flex-wrap gap-2 justify-center">
      {COURSE_SUGGESTIONS.map((suggestion, index) => (
        <motion.button
          key={suggestion}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSuggestionClick(suggestion)}
          className="px-4 py-2 text-sm font-medium rounded-md border border-slate-100 dark:border-gray-950 bg-white dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-neutral-600"
        >
          {suggestion}
        </motion.button>
      ))}
    </div>
  </motion.div>
);

export default CourseSuggestions;
