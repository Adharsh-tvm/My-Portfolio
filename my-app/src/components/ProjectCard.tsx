'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import { Project } from '@/types/portfolio';
import Image from 'next/image';

interface ProjectCardProps {
  project: Project;
  index: number;
  compact?: boolean;
}

export default function ProjectCard({ project, index, compact = false }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // Restrained subtle tilt: max 5 degrees
    setTilt({
      x: y * -6,
      y: x * 6,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const hasLiveUrl = Boolean(project.liveUrl && project.liveUrl !== '#' && project.liveUrl.trim().length > 0);
  const hasGithubUrl = Boolean(project.githubUrl && project.githubUrl !== '#' && project.githubUrl.trim().length > 0);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isHovered
          ? 'transform 0.1s ease-out'
          : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
      }}
      className={`group relative rounded-2xl bg-white dark:bg-[#141417] border border-black/10 dark:border-white/10 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.06),0_0_1px_1px_rgba(0,0,0,0.03)] dark:shadow-[0_15px_35px_-10px_rgba(0,0,0,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col justify-between ${
        compact ? 'min-h-[460px]' : 'min-h-[520px]'
      }`}
    >
      {/* Top Project Preview Image / Neutral Architecture Placeholder */}
      <div className={`relative w-full overflow-hidden border-b border-black/10 dark:border-white/10 bg-[#f4f4f0] dark:bg-[#16161a] ${compact ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}>
        {project.image ? (
          <Image
            src={project.image}
            alt={project.imageAlt || project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          />
        ) : (
          /* Neutral Minimalist Placeholder Screen */
          <div className="w-full h-full p-6 sm:p-8 flex flex-col justify-between font-mono select-none bg-gradient-to-br from-[#fafaf8] to-[#eeebe4] dark:from-[#19191e] dark:to-[#121215] group-hover:scale-[1.02] transition-transform duration-500 ease-out">
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-400 group-hover:bg-neutral-800 dark:group-hover:bg-neutral-200 transition-colors" />
                <span className="text-xs font-semibold tracking-wider text-[#121214] dark:text-neutral-200 uppercase">
                  {project.title.split('—')[0].trim()}
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-[#202026] text-[#71717a] dark:text-neutral-400 border border-black/5 dark:border-white/10">
                {compact ? 'MINI PROJECT' : 'FEATURED PROJECT'}
              </span>
            </div>

            {/* Center Geometric Wireframe Mockup */}
            <div className="my-auto py-4 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-[#202026] border border-black/10 dark:border-white/10 shadow-xs flex items-center justify-center text-[#121214] dark:text-neutral-200 mb-3 group-hover:border-black/30 dark:group-hover:border-white/30 transition-colors">
                <ExternalLink className="w-6 h-6 stroke-[1.5] text-[#52525b] dark:text-neutral-400" />
              </div>
              <div className="text-sm font-sans font-bold text-[#121214] dark:text-white tracking-tight">
                {project.title}
              </div>
              <div className="text-[11px] text-[#71717a] dark:text-neutral-400 font-mono mt-1">
                Project Preview Placeholder
              </div>
            </div>

            {/* Bottom Status Wire */}
            <div className="flex items-center justify-between text-[10px] text-[#71717a] dark:text-neutral-400 pt-2 border-t border-black/5 dark:border-white/10">
              <span>SYSTEM ARCHITECTURE</span>
              <span className="font-semibold text-[#121214] dark:text-neutral-200">{project.technologies[0]}</span>
            </div>
          </div>
        )}
      </div>

      {/* Card Content & Details */}
      <div className={`flex-1 flex flex-col justify-between ${compact ? 'p-5 sm:p-6' : 'p-6 sm:p-8'}`}>
        <div>
          {/* Title */}
          <h3 className={`font-display font-bold text-[#121214] dark:text-white tracking-tight group-hover:text-black dark:group-hover:text-neutral-200 transition-colors ${
            compact ? 'text-lg sm:text-xl mb-2' : 'text-xl sm:text-2xl mb-2.5'
          }`}>
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#57575f] dark:text-neutral-400 leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Key Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="space-y-1.5 mb-5">
              {project.highlights.slice(0, compact ? 3 : 4).map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#52525b] dark:text-neutral-300 leading-normal">
                  <span className="text-neutral-400 dark:text-neutral-500 font-mono mt-0.5 select-none">↳</span>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {/* Technology Stack */}
          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-black/5 dark:border-white/10 mb-5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] sm:text-[11px] text-[#52525b] dark:text-neutral-300 bg-[#f7f7f4] dark:bg-[#1a1a20] border border-black/5 dark:border-white/10 px-2 py-0.5 rounded hover:bg-neutral-200/80 dark:hover:bg-[#25252d] transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links (Live Demo & GitHub) */}
          <div className="flex items-center gap-3 pt-1">
            {/* Live Demo */}
            {hasLiveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white dark:text-[#121214] bg-[#121214] dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all duration-200 shadow-xs"
              >
                <span>Live Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-neutral-400 dark:text-neutral-500 bg-[#f7f7f4] dark:bg-[#1a1a20] border border-black/5 dark:border-white/10 cursor-not-allowed select-none"
                title="Live Demo destination pending configuration"
              >
                <span>Live Demo</span>
              </span>
            )}

            {/* GitHub */}
            {hasGithubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-[#121214] dark:text-neutral-200 bg-[#f7f7f4] dark:bg-[#1a1a20] hover:bg-neutral-200/80 dark:hover:bg-[#25252d] border border-black/10 dark:border-white/10 transition-all duration-200"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            ) : (
              <span
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-neutral-400 dark:text-neutral-500 bg-[#f7f7f4] dark:bg-[#1a1a20] border border-black/5 dark:border-white/10 cursor-not-allowed select-none"
                title="GitHub repository destination pending configuration"
              >
                <GithubIcon className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
                <span>GitHub</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
