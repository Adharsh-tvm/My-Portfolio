/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata, Viewport } from 'next';
import GlassBubblesBackground from '@/components/GlassBubblesBackground';
import './globals.css';

export const metadata: Metadata = {
  title: 'Adharsh S — MERN Stack Developer',
  description:
    'Portfolio of Adharsh S, MERN Stack Developer. Specializing in scalable web applications, Clean Architecture, Next.js, React, Node.js, MongoDB, and high-performance engineering.',
  keywords: [
    'Adharsh S',
    'MERN Stack Developer',
    'Full Stack Developer',
    'Next.js Portfolio',
    'React Developer',
    'Node.js Architect',
    'TypeScript',
    'Clean Architecture',
  ],
  authors: [{ name: 'Adharsh S' }],
  creator: 'Adharsh S',
  openGraph: {
    title: 'Adharsh S — MERN Stack Developer',
    description:
      'Engineering resilient web platforms, scalable backend architectures, and polished digital experiences.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Adharsh S Portfolio',
  },
};

export const viewport: Viewport = {
  themeColor: '#fbfbf9',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth antialiased" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var isDark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@800;900&family=Bebas+Neue&family=Space+Grotesk:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#fbfbf9] dark:bg-[#0a0a0c] text-[#121214] dark:text-[#f4f4f6] selection:bg-[#121214] selection:text-[#fbfbf9] dark:selection:bg-[#f4f4f6] dark:selection:text-[#0a0a0c] overflow-x-hidden min-h-screen relative transition-colors duration-300">
        {/* Shared Interactive Glass Bubble Background across all pages & sections */}
        <GlassBubblesBackground />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
