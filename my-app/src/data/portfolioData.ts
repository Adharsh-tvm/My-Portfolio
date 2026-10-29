import { PersonalInfo, Project, SkillCategory, EducationItem, SocialLink } from '@/types/portfolio';

export const PERSONAL_INFO: PersonalInfo = {
  name: 'ADHARSH S',
  role: 'MERN STACK DEVELOPER',
  phone: '+91 8891580990',
  phoneRaw: '+918891580990',
  email: 'adharshkattaikonam@gmail.com',
  // Configure actual profile URLs here when available
  linkedinUrl: 'https://linkedin.com/in/your-profile',
  githubUrl: 'https://github.com/your-profile',
  leetcodeUrl: 'https://leetcode.com/u/your-profile',
  location: 'Trivandrum, Kerala',
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    url: PERSONAL_INFO.githubUrl,
    handle: 'GitHub Profile',
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    url: PERSONAL_INFO.linkedinUrl,
    handle: 'LinkedIn Profile',
    icon: 'linkedin',
  },
  {
    name: 'LeetCode',
    url: PERSONAL_INFO.leetcodeUrl,
    handle: 'LeetCode Profile',
    icon: 'leetcode',
  },
  {
    name: 'Email',
    url: `mailto:${PERSONAL_INFO.email}`,
    handle: PERSONAL_INFO.email,
    icon: 'mail',
  },
  {
    name: 'Phone',
    url: `tel:${PERSONAL_INFO.phoneRaw}`,
    handle: PERSONAL_INFO.phone,
    icon: 'phone',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming Languages',
    skills: ['JavaScript (ES6+)', 'TypeScript'],
  },
  {
    title: 'Frontend',
    skills: [
      'React.js',
      'Next.js',
      'Tailwind CSS',
      'HTML5',
      'CSS3',
      'Redux Toolkit',
      'React Router',
    ],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT', 'Socket.IO', 'WebRTC'],
  },
  {
    title: 'Databases',
    skills: ['MongoDB', 'PostgreSQL', 'Firebase'],
  },
  {
    title: 'AI Technologies',
    skills: ['LLMs', 'RAG', 'Vector Databases', 'Embeddings', 'Semantic Search'],
  },
  {
    title: 'Cloud & Tools',
    skills: [
      'AWS (EC2, S3)',
      'Git',
      'GitHub',
      'Vercel',
      'Postman',
      'VS Code',
      'Figma',
      'pnpm',
      'Docker',
    ],
  },
  {
    title: 'Concepts',
    skills: ['Data Structures & Algorithms', 'Object-Oriented Programming (OOP)'],
  },
  {
    title: 'Architecture',
    skills: [
      'Clean Architecture',
      'Event-Driven Architecture',
      'Repository Pattern',
    ],
  },
];

export const MAIN_PROJECTS: Project[] = [
  {
    id: 'nest-and-nail',
    title: 'Nest & Nail',
    description:
      'A full-stack home-service marketplace connecting clients with verified professionals, featuring location-based discovery, scheduling, real-time communication, video meetings, payments, and worker verification.',
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Node.js',
      'Express',
      'MongoDB',
      'AWS S3',
      'Socket.IO',
      'Razorpay',
      'Zustand',
      'Tailwind CSS',
      'Nginx',
      'PM2',
      'Certbot',
    ],
    highlights: [
      'Clean Architecture, SOLID principles, Dependency Injection, DTOs, and Mappers.',
      'JWT authentication, HttpOnly Cookies, OTP verification, Google OAuth, password reset, and role-based access control.',
      'Geospatial worker discovery, scheduling, booking validation, and availability management.',
      'Real-time chat using Socket.IO and video meetings using WebRTC.',
      'Razorpay payments, wallet transactions, worker verification, and document uploads.',
      'Deployment using AWS EC2, S3, Nginx, PM2, Certbot SSL, and Vercel.',
    ],
    // Replace with actual screenshot path when available, e.g. '/projects/nest-and-nail.png'
    image: '',
    imageAlt: 'Nest & Nail - Home Service Marketplace',
    liveUrl: '',
    githubUrl: '',
    isMini: false,
  },
  {
    id: 'vintage-fashion',
    title: 'Vintage Fashion',
    description:
      'A full-stack fashion e-commerce platform supporting product discovery, secure payments, order management, inventory management, and administrative operations.',
    technologies: [
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'JWT',
      'Razorpay',
      'Cloudinary',
      'Socket.IO',
      'Nodemailer',
      'Google OAuth',
    ],
    highlights: [
      'MVC architecture, authentication, OTP verification, Google OAuth, and role-based access control.',
      'Product management, search, pagination, filtering, cart, inventory, reviews, coupons, and promotional offers.',
      'Razorpay payment verification, order tracking, cancellations, and wallet refunds.',
      'Admin dashboard for users, products, orders, inventory, coupons, sales analytics, and real-time chat.',
    ],
    // Replace with actual screenshot path when available, e.g. '/projects/vintage-fashion.png'
    image: '',
    imageAlt: 'Vintage Fashion - E-Commerce Platform',
    liveUrl: '',
    githubUrl: '',
    isMini: false,
  },
];

export const MINI_PROJECTS: Project[] = [
  {
    id: 'adukkala',
    title: 'Adukkala',
    description:
      'A full-stack recipe discovery and management application with secure authentication, recipe search, favorites, and personalized preferences.',
    technologies: [
      'Next.js',
      'React',
      'Express.js',
      'TypeScript',
      'PostgreSQL',
      'Prisma',
      'Tailwind CSS',
    ],
    highlights: [
      'REST API development and database modeling.',
      'Third-party recipe API integration.',
      'Secure JWT authentication.',
      'Recipe search, favorites, and personalized preferences.',
    ],
    // Replace with actual screenshot path when available
    image: '',
    imageAlt: 'Adukkala - Recipe Discovery Application',
    liveUrl: '',
    githubUrl: '',
    isMini: true,
  },
  {
    id: 'lenscard-aadhaar-ocr',
    title: 'LensCard — Aadhaar OCR Application',
    description:
      'An Aadhaar OCR application that allows users to upload Aadhaar card images and extract structured information using image preprocessing and OCR.',
    technologies: [
      'React',
      'TypeScript',
      'Express.js',
      'Tailwind CSS',
      'Sharp',
      'Tesseract.js',
    ],
    highlights: [
      'Clean Architecture and dependency injection.',
      'Sharp-based image preprocessing.',
      'Tesseract OCR and regex-driven parsing.',
      'In-memory image processing without persistent image storage.',
      'Upload validation and structured data extraction.',
    ],
    // Replace with actual screenshot path when available
    image: '',
    imageAlt: 'LensCard — Aadhaar OCR Application',
    liveUrl: '',
    githubUrl: '',
    isMini: true,
  },
];

export const EDUCATION: EducationItem[] = [
  {
    title: 'Professional Training — Full Stack Development (MERN Stack)',
    institution: 'Brototype',
    period: '2024–2026',
    location: 'Trivandrum, Kerala',
    description:
      'Professional training focused on building and deploying production-grade full-stack applications, responsive frontends, scalable Node.js backends, authentication systems, real-time features, payment integrations, third-party APIs, Clean Architecture, and performance optimization.',
  },
  {
    title: 'Master of Arts (M.A.) in English Language and Literature',
    institution: 'AJ College of Science and Technology, Kerala University',
    period: '2022–2024',
    location: 'Trivandrum, Kerala',
  },
  {
    title: 'Bachelor of Arts (B.A.) in English Communicative',
    institution: 'AJ College of Science and Technology, Kerala University',
    period: '2019–2022',
    location: 'Trivandrum, Kerala',
  },
];
