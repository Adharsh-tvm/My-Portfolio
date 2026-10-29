'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const NAV_LINKS = [
  { name: 'Home', href: '#hero' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Mini Projects', href: '#mini-projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        scrolled
          ? 'py-3.5 bg-[#fbfbf9]/90 dark:bg-[#0a0a0c]/90 backdrop-blur-md border-b border-black/5 dark:border-white/10 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: Availability Pill */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#141417] border border-black/10 dark:border-white/10 shadow-xs text-xs font-medium text-[#121214] dark:text-neutral-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Available for Opportunities</span>
          </div>

          {/* Center: Clean Minimal Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-xs font-medium text-[#121214] dark:text-neutral-300">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right: Theme Toggle & Black/White Pill Button & Mobile Toggle */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Let's Talk CTA */}
            <a
              href="#contact"
              className="group hidden sm:inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold tracking-wider text-white dark:text-[#121214] bg-[#121214] dark:bg-white rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all duration-200 shadow-sm hover:shadow active:scale-95"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#141417] text-[#121214] dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-black/5 dark:border-white/10 bg-[#fbfbf9]/95 dark:bg-[#0e0e12]/95 backdrop-blur-lg px-6 pt-4 pb-6 mt-2 space-y-3 shadow-xl transition-all">
          <div className="grid grid-cols-2 gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-[#121214] dark:text-neutral-200 hover:bg-[#f3f3ee] dark:hover:bg-[#1c1c21] rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-2 border-t border-black/5 dark:border-white/10 flex flex-col gap-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 text-xs font-semibold uppercase tracking-wider text-white dark:text-[#121214] bg-[#121214] dark:bg-white rounded-xl shadow-sm"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </motion.header>
  );
}
