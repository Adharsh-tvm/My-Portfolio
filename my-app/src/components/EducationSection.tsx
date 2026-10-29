'use client';

import React from 'react';
import { motion } from 'motion/react';
import SectionHeading from './ui/SectionHeading';
import { EDUCATION } from '@/data/portfolioData';

export default function EducationSection() {
  return (
    <section id="education" className="py-24 md:py-32 bg-transparent relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="05"
          category="Background & Learning"
          title="Education & Training"
          subtitle="Academic credentials and rigorous software engineering immersion in production-grade full-stack systems."
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Subtle Vertical Timeline Connector Line */}
          <div className="absolute left-4 sm:left-6 top-3 bottom-3 w-px bg-black/10 dark:bg-white/15 pointer-events-none" />

          <div className="space-y-8 sm:space-y-10">
            {EDUCATION.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-12 sm:pl-16 group"
              >
                {/* Timeline Dot */}
                <div className="absolute left-2.5 sm:left-4.5 top-5 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white dark:bg-[#0c0c0e] border-2 border-[#121214] dark:border-white group-hover:bg-[#121214] dark:group-hover:bg-white transition-colors duration-200 z-10" />

                {/* Entry Card */}
                <div className="rounded-2xl bg-white dark:bg-[#141417] border border-black/10 dark:border-white/10 p-6 sm:p-8 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.09)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)] hover:border-black/20 dark:hover:border-white/20 transition-all duration-300">
                  {/* Period Badge & Location */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-full bg-[#f3f3ee] dark:bg-[#1c1c22] text-[#121214] dark:text-neutral-200 border border-black/5 dark:border-white/10">
                      {item.period}
                    </span>
                    <span className="text-xs font-mono text-[#71717a] dark:text-neutral-400">
                      {item.location}
                    </span>
                  </div>

                  {/* Degree / Program Title */}
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#121214] dark:text-white tracking-tight mb-2">
                    {item.title}
                  </h3>

                  {/* Institution */}
                  <div className="text-sm sm:text-base font-semibold text-[#52525b] dark:text-neutral-300 mb-3">
                    {item.institution}
                  </div>

                  {/* Description if present */}
                  {item.description && (
                    <p className="text-xs sm:text-sm text-[#57575f] dark:text-neutral-400 leading-relaxed pt-2 border-t border-black/5 dark:border-white/10">
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
