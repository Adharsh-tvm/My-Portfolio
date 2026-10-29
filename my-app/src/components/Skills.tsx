'use client';

import React from 'react';
import { motion } from 'motion/react';
import SectionHeading from './ui/SectionHeading';
import { SKILL_CATEGORIES } from '@/data/portfolioData';

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 bg-transparent relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="02"
          category="Technical Stack"
          title="Skills & Technologies"
          subtitle="A comprehensive breakdown of engineering competencies, frameworks, architectures, and development tools."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl bg-white dark:bg-[#141417] border border-black/10 dark:border-white/10 p-6 sm:p-7 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)] hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-3.5 mb-4">
                  <h3 className="text-base sm:text-lg font-bold text-[#121214] dark:text-neutral-100 tracking-tight group-hover:text-black dark:group-hover:text-white transition-colors">
                    {category.title}
                  </h3>
                  <span className="font-mono text-[11px] font-medium text-[#71717a] dark:text-neutral-400 bg-[#f7f7f4] dark:bg-[#1c1c22] px-2 py-0.5 rounded border border-black/5 dark:border-white/10">
                    {category.skills.length}
                  </span>
                </div>
              </div>

              {/* Skill Labels */}
              <div className="flex flex-wrap gap-2 pt-1">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs px-2.5 py-1 rounded bg-[#f7f7f4] dark:bg-[#1a1a20] border border-black/5 dark:border-white/10 text-[#121214] dark:text-neutral-200 hover:bg-[#ebebe6] dark:hover:bg-[#26262e] transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
