'use client';

import React from 'react';
import SectionHeading from './ui/SectionHeading';
import ProjectCard from './ProjectCard';
import { MAIN_PROJECTS } from '@/data/portfolioData';

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 md:py-32 bg-transparent relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="03"
          category="Featured Work"
          title="Featured Projects"
          subtitle="Production-grade full-stack systems engineered with Clean Architecture, microservices, robust authentication, and high performance."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {MAIN_PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              compact={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

