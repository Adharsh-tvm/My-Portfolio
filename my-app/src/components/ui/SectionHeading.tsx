'use client';

import React from 'react';

interface SectionHeadingProps {
  number: string;
  category: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({
  number,
  category,
  title,
  subtitle,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div className={`mb-16 md:mb-20 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <div className={`inline-flex items-center gap-3 mb-4 ${align === 'center' ? 'justify-center' : ''}`}>
        <span className="font-mono text-xs uppercase tracking-widest text-[#71717a] dark:text-neutral-400 px-2 py-1 bg-[#f3f3ee] dark:bg-[#18181c] rounded border border-black/5 dark:border-white/10">
          {number}
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#52525b] dark:text-neutral-300">
          {category}
        </span>
        <div className="h-px w-8 bg-neutral-300 dark:bg-neutral-700" />
      </div>

      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#121214] dark:text-white leading-[1.1]">
        {title}
      </h2>

      {subtitle && (
        <p className={`mt-4 text-base sm:text-lg text-[#57575f] dark:text-neutral-400 max-w-2xl leading-relaxed ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
