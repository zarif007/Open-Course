import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-200 dark:bg-gray-900 text-slate-800 dark:text-slate-200 py-6 px-4 text-center">
      <p className="text-lg font-semibold mb-3">
        <span className="bg-gradient-to-r from-rose-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
          Made with love for the people
        </span>{' '}
        — Crafted by Zarif
      </p>
      <div className="flex justify-center gap-6 text-2xl">
        <a
          href="https://github.com/zarif007"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-rose-500 transition-colors duration-200"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/md-zarif-ul-huq/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-rose-500 transition-colors duration-200"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
