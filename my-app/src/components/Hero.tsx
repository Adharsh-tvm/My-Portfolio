'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon, PhoneIcon } from '@/components/ui/Icons';
import { PERSONAL_INFO } from '@/data/portfolioData';
import Image from 'next/image';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 140, mass: 0.5 };

  // Counter-drift for background typography
  const textParallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [16, -16]), springConfig);
  const textParallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);

  // Positive drift for front cutout portrait
  const portraitParallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), springConfig);
  const portraitParallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-8, 8]), springConfig);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch' || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Scroll depth transformation
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0.25]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.98]);

  return (
    <motion.section
      id="hero"
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ opacity: heroOpacity, scale: heroScale }}
      className="relative min-h-[calc(100vh-1rem)] lg:min-h-[92vh] pt-20 pb-8 md:pt-24 md:pb-10 flex flex-col justify-center items-center overflow-hidden bg-transparent scroll-mt-24"
    >
      {/* Floating Canvas Card Container */}
      <div className="relative w-full max-w-[1260px] mx-auto px-3 sm:px-6 lg:px-8 z-10">
        <div className="relative w-full rounded-[24px] sm:rounded-[36px] bg-white/90 dark:bg-[#141417]/90 backdrop-blur-sm border border-black/5 dark:border-white/10 shadow-[0_25px_65px_-15px_rgba(0,0,0,0.06),0_0_1px_1px_rgba(0,0,0,0.02)] dark:shadow-[0_25px_65px_-15px_rgba(0,0,0,0.4)] pt-8 sm:pt-12 md:pt-14 pb-6 md:pb-2 overflow-hidden transition-colors duration-300">
          
          {/* Subtle Canvas Dot Pattern */}
          <div className="absolute inset-0 bg-dot-subtle opacity-15 dark:opacity-10 pointer-events-none" />

          {/* MAIN STAGE: Typography + Cutout Portrait + Foreground Elements */}
          <div className="relative min-h-[360px] sm:min-h-[460px] md:min-h-[540px] lg:min-h-[580px] flex items-end justify-center">

            {/* LAYER 1: Headline with Thick Black Outline, Slightly Rounded Letterforms & Grey-White Mix Gradient */}
            <motion.div
              style={{
                x: textParallaxX,
                y: textParallaxY,
              }}
              className="absolute top-4 sm:top-6 md:top-8 lg:top-10 left-0 right-0 z-25 flex items-center justify-center select-none whitespace-nowrap pointer-events-none"
            >
              <div className="relative inline-flex items-center justify-center">
                {/* Background Layer: Thick Black Outline with rounded vertices */}
                <div
                  aria-hidden="true"
                  className="font-hero-rounded hero-name-stroke-back text-[clamp(2.8rem,11.5vw,8.8rem)] leading-none uppercase tracking-[0.02em] flex items-center gap-2.5 sm:gap-5 md:gap-7 select-none"
                >
                  <span>ADHARSH</span>
                  <span>S</span>
                </div>

                {/* Foreground Layer: Grey and White Mix Color Gradient Filling */}
                <h1
                  className="absolute inset-0 z-10 font-hero-rounded hero-name-fill-front text-[clamp(2.8rem,11.5vw,8.8rem)] leading-none uppercase tracking-[0.02em] flex items-center gap-2.5 sm:gap-5 md:gap-7 select-none"
                >
                  <span>ADHARSH</span>
                  <span>S</span>
                </h1>
              </div>
            </motion.div>

            {/* LAYER 2: Central Cutout Portrait */}
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              style={{
                x: portraitParallaxX,
                y: portraitParallaxY,
              }}
              className="absolute z-15 flex justify-center items-end bottom-0 left-1/2 -translate-x-1/2 max-w-[310px] sm:max-w-[400px] md:max-w-[490px] lg:max-w-[560px] xl:max-w-[590px] w-full"
            >
              <div
                className="relative w-full overflow-hidden select-none pointer-events-none"
                style={{
                  aspectRatio: '1254 / 1034',
                  opacity: 0.92,
                  maskImage: 'linear-gradient(to top, transparent 0%, black 4%, black 96%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 4%, black 96%, transparent 100%)',
                }}
              >
                <Image
                  src="/portrait-cutout.png"
                  alt="Adharsh S — MERN Stack Developer"
                  fill
                  className="object-contain object-bottom pointer-events-none mix-blend-multiply dark:mix-blend-normal"
                  style={{
                    filter: 'grayscale(100%) contrast(1.15) brightness(0.95)',
                  }}
                  priority
                  sizes="(max-width: 640px) 310px, (max-width: 768px) 400px, (max-width: 1024px) 490px, 590px"
                />
              </div>
            </motion.div>

            {/* LAYER 3: Bottom Left Foreground Content (Desktop/Tablet) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:block absolute bottom-6 lg:bottom-9 left-7 lg:left-11 z-30 max-w-[300px]"
            >
              <div className="inline-block px-2.5 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[#121214] dark:text-neutral-200 font-mono text-[11px] font-semibold tracking-wider uppercase mb-2">
                Specialization
              </div>
              <h2 className="font-display font-extrabold text-xl lg:text-2xl text-[#121214] dark:text-white tracking-tight leading-snug">
                {PERSONAL_INFO.role}
              </h2>
              <p className="text-xs sm:text-sm text-[#57575f] dark:text-neutral-400 leading-relaxed mt-2 mb-4 font-normal">
                Building scalable full-stack applications, robust backend architectures, and high-performance digital products.
              </p>
              <div className="flex items-center gap-2.5">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#121214] dark:bg-white text-white dark:text-[#121214] text-xs font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all duration-200 shadow-md active:scale-95"
                >
                  <span>Get In Touch</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white dark:bg-[#1a1a1f] border border-black/10 dark:border-white/10 text-xs font-medium text-[#121214] dark:text-neutral-200 hover:border-black/30 dark:hover:border-white/30 transition-all duration-200"
                >
                  <span>Projects</span>
                </a>
              </div>
            </motion.div>

            {/* LAYER 4: Bottom Right Foreground Contact & Coding Profiles (Desktop/Tablet) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:flex absolute bottom-6 lg:bottom-9 right-7 lg:right-11 z-30 flex-col gap-2"
            >
              {/* GitHub */}
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white dark:bg-[#1a1a1f] border border-black/10 dark:border-white/10 shadow-xs hover:border-black/30 dark:hover:border-white/30 hover:shadow-sm hover:translate-x-1 transition-all duration-200 text-xs font-medium text-[#121214] dark:text-neutral-200 min-w-[140px]"
              >
                <GithubIcon className="w-3.5 h-3.5 text-[#52525b] dark:text-neutral-400 group-hover:text-[#121214] dark:group-hover:text-white transition-colors" />
                <span>GitHub</span>
              </a>

              {/* LinkedIn */}
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white dark:bg-[#1a1a1f] border border-black/10 dark:border-white/10 shadow-xs hover:border-black/30 dark:hover:border-white/30 hover:shadow-sm hover:translate-x-1 transition-all duration-200 text-xs font-medium text-[#121214] dark:text-neutral-200 min-w-[140px]"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-[#52525b] dark:text-neutral-400 group-hover:text-[#121214] dark:group-hover:text-white transition-colors" />
                <span>LinkedIn</span>
              </a>

              {/* LeetCode */}
              <a
                href={PERSONAL_INFO.leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white dark:bg-[#1a1a1f] border border-black/10 dark:border-white/10 shadow-xs hover:border-black/30 dark:hover:border-white/30 hover:shadow-sm hover:translate-x-1 transition-all duration-200 text-xs font-medium text-[#121214] dark:text-neutral-200 min-w-[140px]"
              >
                <LeetCodeIcon className="w-3.5 h-3.5 text-[#52525b] dark:text-neutral-400 group-hover:text-[#121214] dark:group-hover:text-white transition-colors" />
                <span>LeetCode</span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="group inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white dark:bg-[#1a1a1f] border border-black/10 dark:border-white/10 shadow-xs hover:border-black/30 dark:hover:border-white/30 hover:shadow-sm hover:translate-x-1 transition-all duration-200 text-xs font-medium text-[#121214] dark:text-neutral-200 min-w-[140px]"
              >
                <Mail className="w-3.5 h-3.5 text-[#52525b] dark:text-neutral-400 group-hover:text-[#121214] dark:group-hover:text-white transition-colors" />
                <span>Email</span>
              </a>

              {/* Phone */}
              <a
                href={`tel:${PERSONAL_INFO.phoneRaw}`}
                className="group inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white dark:bg-[#1a1a1f] border border-black/10 dark:border-white/10 shadow-xs hover:border-black/30 dark:hover:border-white/30 hover:shadow-sm hover:translate-x-1 transition-all duration-200 text-xs font-medium text-[#121214] dark:text-neutral-200 min-w-[140px]"
              >
                <PhoneIcon className="w-3.5 h-3.5 text-[#52525b] dark:text-neutral-400 group-hover:text-[#121214] dark:group-hover:text-white transition-colors" />
                <span>Phone</span>
              </a>
            </motion.div>
          </div>

          {/* MOBILE CONTENT CONTAINER */}
          <div className="md:hidden pt-4 pb-4 px-4 flex flex-col items-center text-center border-t border-black/5 dark:border-white/10 mt-2 bg-transparent">
            <div className="inline-block px-2.5 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[#121214] dark:text-neutral-200 font-mono text-[10px] font-semibold tracking-wider uppercase mb-1.5">
              Specialization
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-[#121214] dark:text-white tracking-tight">
              {PERSONAL_INFO.role}
            </h2>
            <p className="text-xs text-[#57575f] dark:text-neutral-400 leading-relaxed mt-1.5 mb-4 max-w-sm">
              Building scalable full-stack applications, robust backend architectures, and high-performance digital products.
            </p>
            <div className="flex items-center gap-2 mb-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#121214] dark:bg-white text-white dark:text-[#121214] text-xs font-semibold shadow-md"
              >
                <span>Get In Touch</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white dark:bg-[#1a1a1f] border border-black/10 dark:border-white/10 text-xs font-medium text-[#121214] dark:text-neutral-200"
              >
                <span>Projects</span>
              </a>
            </div>

            {/* Mobile Contact & Coding Profiles Grid */}
            <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-full bg-white dark:bg-[#1a1a1f] border border-black/10 dark:border-white/10 text-xs font-medium text-[#121214] dark:text-neutral-200 shadow-xs"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-full bg-white dark:bg-[#1a1a1f] border border-black/10 dark:border-white/10 text-xs font-medium text-[#121214] dark:text-neutral-200 shadow-xs"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={PERSONAL_INFO.leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-full bg-white dark:bg-[#1a1a1f] border border-black/10 dark:border-white/10 text-xs font-medium text-[#121214] dark:text-neutral-200 shadow-xs"
              >
                <LeetCodeIcon className="w-3.5 h-3.5" />
                <span>LeetCode</span>
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-full bg-white dark:bg-[#1a1a1f] border border-black/10 dark:border-white/10 text-xs font-medium text-[#121214] dark:text-neutral-200 shadow-xs"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </a>
              <a
                href={`tel:${PERSONAL_INFO.phoneRaw}`}
                className="col-span-2 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-full bg-white dark:bg-[#1a1a1f] border border-black/10 dark:border-white/10 text-xs font-medium text-[#121214] dark:text-neutral-200 shadow-xs"
              >
                <PhoneIcon className="w-3.5 h-3.5" />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
