'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle } from 'lucide-react';

interface LoadingStep {
  id: number;
  text: string;
  status: 'pending' | 'loading' | 'complete';
}

interface LoadingIndicatorProps {
  steps: LoadingStep[];
}

const LoadingIndicator = ({ steps }: LoadingIndicatorProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-8 w-full max-w-md mx-auto"
  >
    <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
      Building Your Course
    </h3>
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {steps.map((step) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: step.status !== 'pending' ? 1 : 0.5,
              height: 'auto',
            }}
            className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800"
          >
            <div className="flex-shrink-0">
              {step.status === 'complete' ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : step.status === 'loading' ? (
                <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-gray-300 dark:border-neutral-700" />
              )}
            </div>
            <span
              className={`text-sm ${
                step.status === 'complete'
                  ? 'text-gray-600 dark:text-neutral-300'
                  : step.status === 'loading'
                    ? 'text-gray-900 dark:text-white font-medium'
                    : 'text-gray-500 dark:text-neutral-500'
              }`}
            >
              {step.text}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
    <p className="text-sm text-gray-500 dark:text-neutral-400 mt-6">
      This may take a few moments...
    </p>
  </motion.div>
);

export default LoadingIndicator;
