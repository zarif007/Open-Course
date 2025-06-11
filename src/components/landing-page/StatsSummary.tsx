'use client';
import React, { useState, useEffect } from 'react';

interface Stat {
  label: string;
  value: number;
}

const useCountUp = (target: number, duration = 1500, trigger = true) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) {
      setCount(0);
      return;
    }

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const progressRatio = Math.min(progress / duration, 1);
      setCount(Math.floor(progressRatio * target));

      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);

    return () => setCount(0);
  }, [target, duration, trigger]);

  return count;
};

const StatsSummary: React.FC = () => {
  const [data, setData] = useState<{
    totalCourses: number;
    aiCourses: number;
    totalEnrollments: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats');
        if (!res.ok) throw new Error('Failed to fetch stats');
        const json = await res.json();

        setData({
          totalCourses: json.totalCourses,
          aiCourses: json.aiCourses,
          totalEnrollments: json.totalEnrollments,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        setData({ totalCourses: 0, aiCourses: 0, totalEnrollments: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    { label: 'Total Courses', value: data?.totalCourses ?? 0 },
    { label: 'AI-Generated Courses', value: data?.aiCourses ?? 0 },
    { label: 'Total Enrollments', value: data?.totalEnrollments ?? 0 },
  ];

  return (
    <div className="mt-8 flex justify-center items-center gap-2 sm:gap-4 md:gap-6 flex-wrap">
      {stats.map(({ label, value }, idx) => {
        const count = useCountUp(value, 1500, !loading);

        return (
          <div
            key={idx}
            className="w-[120px] sm:w-[150px] md:w-[180px] h-[100px] sm:h-[110px] md:h-[120px] 
                   bg-white dark:bg-neutral-900 px-4 sm:px-5 md:px-6 py-4 rounded-xl shadow 
                   border border-neutral-200 dark:border-neutral-800 
                   text-center flex flex-col justify-center"
          >
            <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-rose-500 tabular-nums">
              {loading ? 0 : count}
            </div>
            <div className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300">
              {label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsSummary;
