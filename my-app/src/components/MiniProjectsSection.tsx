'use client';

import React from 'react';
import SectionHeading from './ui/SectionHeading';
import ProjectCard from './ProjectCard';
import { MINI_PROJECTS } from '@/data/portfolioData';

export default function MiniProjectsSection() {
  return (
    <section id="mini-projects" className="py-24 md:py-32 bg-transparent relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="04"
          category="Focused Implementations"
          title="Mini Projects"
          subtitle="Targeted applications showcasing specific architectural patterns, algorithmic processing, and computer vision pipelines."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {MINI_PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              compact={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

