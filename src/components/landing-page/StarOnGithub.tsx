'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PiGithubLogoDuotone, PiStarDuotone } from 'react-icons/pi';

const StarOnGithub = () => {
  const [stars, setStars] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const response = await fetch(
          'https://api.github.com/repos/zarif007/Open-Course'
        );
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setStars(data.stargazers_count);
      } catch (err) {
        console.error('Error fetching stars:', err);
        setError(true);
      }
    };

    fetchStars();
  }, []);

  return (
    <Link
      href="https://github.com/zarif007/Open-Course"
      target="_blank"
      className="flex items-center text-gray-800 dark:text-slate-300"
    >
      <div className="flex items-center space-x-2 px-2 py-1 bg-slate-300 dark:bg-gray-800 rounded-l">
        <PiStarDuotone className="w-6 h-6" />
        <p className="font-bold">Star us on</p>
        <PiGithubLogoDuotone className="w-6 h-6" />
      </div>
      <div className="rounded-r bg-slate-200 dark:bg-gray-700 px-2 py-1">
        <p className="font-semibold">
          {error ? '—' : stars === null ? '...' : stars}
        </p>
      </div>
    </Link>
  );
};

export default StarOnGithub;
