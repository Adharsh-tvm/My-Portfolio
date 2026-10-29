'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  depth: number; // 0.3 to 1.0 for spatial layering
  alpha: number;
}

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Mouse coordinates with smoothing
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 160,
      active: false,
    };

    let particles: Particle[] = [];

    const initParticles = () => {
      const isMobile = width < 768;
      // High performance: fewer particles on mobile
      const count = isMobile ? 24 : 52;
      particles = [];

      for (let i = 0; i < count; i++) {
        const depth = Math.random() * 0.7 + 0.3; // 0.3 (far) to 1.0 (near)
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          // Slower organic float for depth
          vx: (Math.random() - 0.5) * 0.35 * depth,
          vy: (Math.random() - 0.5) * 0.35 * depth,
          radius: (Math.random() * 1.4 + 0.8) * depth,
          depth,
          alpha: Math.random() * 0.18 + 0.08, // Subtle low contrast
        });
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.parentElement?.getBoundingClientRect() || canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      initParticles();
    };

    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Page Visibility API to pause when tab is hidden
    let isTabVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible && !prefersReducedMotion) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    let lastTime = performance.now();

    const render = (time: number) => {
      if (!isTabVisible) return;

      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // 1. Soft cursor-responsive ambient radial glow
      if (mouse.active && mouse.x > -500) {
        const glowRadius = 280;
        const radialGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          glowRadius
        );
        radialGlow.addColorStop(0, 'rgba(18, 18, 20, 0.035)');
        radialGlow.addColorStop(0.5, 'rgba(18, 18, 20, 0.012)');
        radialGlow.addColorStop(1, 'rgba(18, 18, 20, 0)');

        ctx.fillStyle = radialGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      const connectionDistance = width < 768 ? 95 : 125;

      // 2. Draw connecting lines first
      ctx.lineWidth = 0.75;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDistance) {
            const lineAlpha = (1 - dist / connectionDistance) * 0.12 * Math.min(p1.depth, p2.depth);
            ctx.strokeStyle = `rgba(18, 18, 20, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // 3. Update & render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          // Slow organic motion
          p.x += p.vx * delta * 60;
          p.y += p.vy * delta * 60;

          // Mouse gentle organic push
          if (mouse.active) {
            const mdx = p.x - mouse.x;
            const mdy = p.y - mouse.y;
            const mdist = Math.hypot(mdx, mdy);
            if (mdist < mouse.radius && mdist > 0) {
              const force = (1 - mdist / mouse.radius) * 0.6 * p.depth;
              p.x += (mdx / mdist) * force;
              p.y += (mdy / mdist) * force;
            }
          }

          // Boundary wrap
          if (p.x < -10) p.x = width + 10;
          else if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          else if (p.y > height + 10) p.y = -10;
        }

        // Draw particle dot
        ctx.fillStyle = `rgba(18, 18, 20, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    if (prefersReducedMotion) {
      // Static single draw
      render(performance.now());
    } else {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      style={{ opacity: 0.95 }}
      aria-hidden="true"
    />
  );
}

