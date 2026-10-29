import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import ProjectsSection from '@/components/ProjectsSection';
import MiniProjectsSection from '@/components/MiniProjectsSection';
import EducationSection from '@/components/EducationSection';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ui/ScrollProgress';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-transparent text-[#121214] dark:text-[#f4f4f6]">
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Primary Sticky/Floating Navbar */}
      <Navbar />

      <main>
        {/* 1. Hero: Oversized Typography, Portrait & Profile Links */}
        <Hero />

        {/* 2. Skills: Clean Categorized Stack */}
        <Skills />

        {/* 3. Projects: Prominent Full-Stack Featured Project Cards */}
        <ProjectsSection />

        {/* 4. Mini Projects: Compact Architectural & Focused Applications */}
        <MiniProjectsSection />

        {/* 5. Education: Professional Training & Academic Credentials */}
        <EducationSection />

        {/* 6. Contact: Monumental Direct Call to Action */}
        <Contact />
      </main>

      {/* Footer: Understated Copyright & Live Clock */}
      <Footer />
    </div>
  );
}
