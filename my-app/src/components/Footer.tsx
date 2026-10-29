'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';

export default function Footer() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Indian Standard Time (IST)
      const istTime = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setTime(istTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-transparent border-t border-black/5 dark:border-white/10 py-12 text-xs font-mono text-[#71717a] dark:text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-bold text-[#121214] dark:text-white font-sans">
              {PERSONAL_INFO.name}
            </span>
            <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">•</span>
            <span>© {new Date().getFullYear()} {PERSONAL_INFO.name}. All Rights Reserved.</span>
          </div>

          {/* Local IST Time Clock */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f3f3ee] dark:bg-[#18181c] border border-black/5 dark:border-white/10 text-[#52525b] dark:text-neutral-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>KERALA, INDIA:</span>
            <span className="font-bold text-[#121214] dark:text-white">{time || '00:00:00'} IST</span>
          </div>

          {/* Back to top & Tech info */}
          <div className="flex items-center gap-6">
            <span className="hidden lg:inline text-neutral-400 dark:text-neutral-500">
              NEXT.JS • REACT • TAILWIND CSS
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#121214] dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-white transition-colors cursor-pointer font-semibold uppercase tracking-wider"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
