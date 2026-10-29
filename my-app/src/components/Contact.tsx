'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import SectionHeading from './ui/SectionHeading';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { Mail, Copy, Check, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon, PhoneIcon } from '@/components/ui/Icons';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-24 md:py-36 bg-transparent relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="06"
          category="Get In Touch"
          title="Let's Build Something Great"
          subtitle="Looking for a dedicated MERN Stack Developer or software engineer? Direct communication is always welcome."
        />

        {/* Big Editorial CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-[#121214] text-white p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-2xl"
        >
          {/* Subtle Background Architectural Grid */}
          <div className="absolute inset-0 bg-grid-subtle opacity-10 pointer-events-none" />

          {/* Atmospheric Backlight */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-neutral-800/60 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-mono text-neutral-300 mb-6 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Full-Time Roles & Opportunities</span>
            </div>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] mb-6 text-white font-display">
              Ready to collaborate on your next digital product?
            </h3>

            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-xl mb-10">
              Feel free to reach out via phone or email for discussions regarding upcoming engineering roles,
              system architecture, or web projects.
            </p>

            {/* Direct Contact Actions: Email & Phone */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 mb-10">
              {/* Mailto link */}
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="group inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white text-[#121214] font-semibold text-sm hover:bg-neutral-200 transition-all duration-200 shadow-md active:scale-98"
              >
                <Mail className="w-4 h-4" />
                <span>{PERSONAL_INFO.email}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* Tel link */}
              <a
                href={`tel:${PERSONAL_INFO.phoneRaw}`}
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-sm transition-all duration-200 active:scale-98"
              >
                <PhoneIcon className="w-4 h-4 text-emerald-400" />
                <span>{PERSONAL_INFO.phone}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* Copy Email Button */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 font-mono text-xs uppercase tracking-wider transition-colors active:scale-98 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-sans normal-case text-xs font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-neutral-400" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>

            {/* Configurable Coding & Social Profiles */}
            <div className="pt-8 border-t border-white/10 flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono text-neutral-400">
              <span className="text-neutral-500 font-semibold tracking-wider uppercase">Profiles:</span>

              {/* GitHub */}
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-neutral-500" />
              </a>

              {/* LinkedIn */}
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-neutral-500" />
              </a>

              {/* LeetCode */}
              <a
                href={PERSONAL_INFO.leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors"
              >
                <LeetCodeIcon className="w-4 h-4" />
                <span>LeetCode</span>
                <ArrowUpRight className="w-3 h-3 text-neutral-500" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
