export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  highlights: string[];
  image?: string;
  imageAlt?: string;
  liveUrl?: string;
  githubUrl?: string;
  isMini?: boolean;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface EducationItem {
  title: string;
  institution: string;
  period: string;
  location: string;
  description?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  handle: string;
  icon: 'github' | 'linkedin' | 'leetcode' | 'mail' | 'phone';
}

export interface PersonalInfo {
  name: string;
  role: string;
  phone: string;
  phoneRaw: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  leetcodeUrl: string;
  location: string;
}
