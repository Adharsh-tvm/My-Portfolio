'use client';

import React, { useEffect, useRef } from 'react';

interface BubbleConfig {
  id: number;
  // Starting coordinates as percentages of viewport (0 - 100)
  xPct: number;
  yPct: number;
  // Visual dimensions & optical depth
  size: number;
  depth: number; // 0.25 (distant, small, slow) to 1.0 (foreground, crisp, reactive)
  // Ambient floating parameters
  ampX: number; // horizontal oscillation amplitude in px
  ampY: number; // vertical oscillation amplitude in px
  speedX: number; // horizontal oscillation frequency
  speedY: number; // vertical oscillation frequency
  phase: number; // phase offset in radians
  // Visual tweaks
  blur?: number; // optical depth of field blur in px (for distant bubbles)
  mobile: boolean; // whether this bubble appears on smaller screens (<768px)
}

// 24 meticulously placed bubbles framing the perimeter and negative spaces.
// Visible throughout all portfolio sections while scrolling.
const BUBBLE_PRESETS: BubbleConfig[] = [
  // --- TOP-LEFT PERIPHERY ---
  {
    id: 1,
    xPct: 5,
    yPct: 8,
    size: 115,
    depth: 0.95,
    ampX: 18,
    ampY: 22,
    speedX: 0.0007,
    speedY: 0.0005,
    phase: 0.2,
    mobile: true,
  },
  {
    id: 2,
    xPct: 15,
    yPct: 5,
    size: 60,
    depth: 0.52,
    ampX: 12,
    ampY: 16,
    speedX: 0.0009,
    speedY: 0.0008,
    phase: 1.4,
    mobile: false,
  },
  {
    id: 3,
    xPct: 3,
    yPct: 24,
    size: 46,
    depth: 0.38,
    ampX: 10,
    ampY: 14,
    speedX: 0.0006,
    speedY: 0.0007,
    phase: 3.1,
    blur: 1.2,
    mobile: true,
  },
  {
    id: 4,
    xPct: 26,
    yPct: 6,
    size: 52,
    depth: 0.48,
    ampX: 11,
    ampY: 15,
    speedX: 0.0008,
    speedY: 0.0007,
    phase: 4.0,
    mobile: false,
  },

  // --- TOP-RIGHT PERIPHERY ---
  {
    id: 5,
    xPct: 89,
    yPct: 7,
    size: 128,
    depth: 0.98,
    ampX: 20,
    ampY: 24,
    speedX: 0.0006,
    speedY: 0.0005,
    phase: 2.1,
    mobile: true,
  },
  {
    id: 6,
    xPct: 80,
    yPct: 15,
    size: 68,
    depth: 0.56,
    ampX: 14,
    ampY: 18,
    speedX: 0.0008,
    speedY: 0.0007,
    phase: 0.9,
    mobile: false,
  },
  {
    id: 7,
    xPct: 94,
    yPct: 22,
    size: 48,
    depth: 0.4,
    ampX: 10,
    ampY: 15,
    speedX: 0.0005,
    speedY: 0.0006,
    phase: 4.2,
    blur: 1.4,
    mobile: true,
  },
  {
    id: 8,
    xPct: 72,
    yPct: 6,
    size: 54,
    depth: 0.5,
    ampX: 12,
    ampY: 16,
    speedX: 0.0007,
    speedY: 0.0008,
    phase: 1.7,
    mobile: false,
  },

  // --- LEFT FLANK (Outer margins) ---
  {
    id: 9,
    xPct: 4,
    yPct: 40,
    size: 92,
    depth: 0.82,
    ampX: 16,
    ampY: 20,
    speedX: 0.0007,
    speedY: 0.0006,
    phase: 1.8,
    mobile: true,
  },
  {
    id: 10,
    xPct: 13,
    yPct: 48,
    size: 62,
    depth: 0.62,
    ampX: 13,
    ampY: 17,
    speedX: 0.0008,
    speedY: 0.0007,
    phase: 2.8,
    mobile: false,
  },
  {
    id: 11,
    xPct: 3,
    yPct: 66,
    size: 138,
    depth: 1.0,
    ampX: 22,
    ampY: 26,
    speedX: 0.0005,
    speedY: 0.0004,
    phase: 0.5,
    mobile: true,
  },

  // --- RIGHT FLANK (Outer margins) ---
  {
    id: 12,
    xPct: 92,
    yPct: 38,
    size: 98,
    depth: 0.86,
    ampX: 17,
    ampY: 21,
    speedX: 0.0007,
    speedY: 0.0006,
    phase: 3.5,
    mobile: true,
  },
  {
    id: 13,
    xPct: 83,
    yPct: 46,
    size: 64,
    depth: 0.65,
    ampX: 13,
    ampY: 17,
    speedX: 0.0009,
    speedY: 0.0007,
    phase: 1.2,
    mobile: false,
  },
  {
    id: 14,
    xPct: 93,
    yPct: 66,
    size: 132,
    depth: 0.96,
    ampX: 20,
    ampY: 25,
    speedX: 0.0006,
    speedY: 0.0005,
    phase: 2.9,
    mobile: true,
  },

  // --- BOTTOM-LEFT PERIPHERY ---
  {
    id: 15,
    xPct: 6,
    yPct: 83,
    size: 82,
    depth: 0.72,
    ampX: 15,
    ampY: 18,
    speedX: 0.0008,
    speedY: 0.0006,
    phase: 4.8,
    mobile: false,
  },
  {
    id: 16,
    xPct: 15,
    yPct: 90,
    size: 48,
    depth: 0.42,
    ampX: 10,
    ampY: 14,
    speedX: 0.0006,
    speedY: 0.0007,
    phase: 1.9,
    blur: 1.2,
    mobile: true,
  },

  // --- BOTTOM-RIGHT PERIPHERY ---
  {
    id: 17,
    xPct: 89,
    yPct: 82,
    size: 86,
    depth: 0.76,
    ampX: 16,
    ampY: 19,
    speedX: 0.0007,
    speedY: 0.0006,
    phase: 0.7,
    mobile: false,
  },
  {
    id: 18,
    xPct: 82,
    yPct: 91,
    size: 48,
    depth: 0.38,
    ampX: 11,
    ampY: 13,
    speedX: 0.0005,
    speedY: 0.0008,
    phase: 3.8,
    blur: 1.5,
    mobile: true,
  },

  // --- SUBTLE CORNER ACCENTS & ATMOSPHERIC DEPTH ---
  {
    id: 19,
    xPct: 50,
    yPct: 2,
    size: 38,
    depth: 0.35,
    ampX: 8,
    ampY: 10,
    speedX: 0.0005,
    speedY: 0.0005,
    phase: 5.1,
    blur: 1.5,
    mobile: false,
  },
  {
    id: 20,
    xPct: 20,
    yPct: 15,
    size: 74,
    depth: 0.62,
    ampX: 14,
    ampY: 17,
    speedX: 0.0008,
    speedY: 0.0007,
    phase: 2.4,
    mobile: false,
  },
  {
    id: 21,
    xPct: 76,
    yPct: 14,
    size: 70,
    depth: 0.58,
    ampX: 13,
    ampY: 17,
    speedX: 0.0007,
    speedY: 0.0007,
    phase: 4.5,
    mobile: false,
  },
  {
    id: 22,
    xPct: 52,
    yPct: 96,
    size: 42,
    depth: 0.36,
    ampX: 9,
    ampY: 11,
    speedX: 0.0005,
    speedY: 0.0006,
    phase: 1.3,
    blur: 1.4,
    mobile: false,
  },
  {
    id: 23,
    xPct: 2,
    yPct: 52,
    size: 56,
    depth: 0.45,
    ampX: 11,
    ampY: 14,
    speedX: 0.0008,
    speedY: 0.0006,
    phase: 3.3,
    mobile: true,
  },
  {
    id: 24,
    xPct: 96,
    yPct: 53,
    size: 58,
    depth: 0.46,
    ampX: 11,
    ampY: 14,
    speedX: 0.0007,
    speedY: 0.0008,
    phase: 0.4,
    mobile: true,
  },
];

interface BubbleRuntimeState {
  el: HTMLDivElement | null;
  baseX: number;
  baseY: number;
  size: number;
  depth: number;
  ampX: number;
  ampY: number;
  speedX: number;
  speedY: number;
  phase: number;
  // Current dynamic displacement (spring-damped)
  dispX: number;
  dispY: number;
  targetDispX: number;
  targetDispY: number;
}

export default function GlassBubblesBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bubblesStateRef = useRef<BubbleRuntimeState[]>([]);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // 1. Accessibility Check: prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const isMobile = width < 768;

    // Filter presets for device profile
    const activePresets = isMobile
      ? BUBBLE_PRESETS.filter((b) => b.mobile)
      : BUBBLE_PRESETS;

    // Initialize runtime states with exact pixel coordinates
    const updateDimensions = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      bubblesStateRef.current = activePresets.map((preset, index) => {
        const baseX = (preset.xPct / 100) * width - preset.size / 2;
        const baseY = (preset.yPct / 100) * height - preset.size / 2;
        const existing = bubblesStateRef.current[index];

        return {
          el: elementsRef.current[index] || null,
          baseX,
          baseY,
          size: preset.size,
          depth: preset.depth,
          ampX: preset.ampX,
          ampY: preset.ampY,
          speedX: preset.speedX,
          speedY: preset.speedY,
          phase: preset.phase,
          dispX: existing ? existing.dispX : 0,
          dispY: existing ? existing.dispY : 0,
          targetDispX: existing ? existing.targetDispX : 0,
          targetDispY: existing ? existing.targetDispY : 0,
        };
      });
    };

    updateDimensions();

    // Mouse coordinates tracker
    const mouse = {
      x: -2000,
      y: -2000,
      active: false,
    };

    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -2000;
      mouse.y = -2000;
    };

    const handleResize = () => {
      updateDimensions();
    };

    if (!isTouchDevice && !prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.addEventListener('mouseleave', handleMouseLeave);
    }
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Page visibility to pause RAF and save resources
    let isVisible = !document.hidden;
    let animationFrameId: number;

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible && !prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(loop);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Initial positioning for reduced motion
    if (prefersReducedMotion) {
      bubblesStateRef.current.forEach((b) => {
        if (b.el) {
          b.el.style.transform = `translate3d(${b.baseX}px, ${b.baseY}px, 0)`;
        }
      });
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }

    // High-performance animation loop (Composite transform only, zero React state re-renders)
    const loop = (currentTime: number) => {
      if (!isVisible) return;

      const states = bubblesStateRef.current;
      const count = states.length;

      for (let i = 0; i < count; i++) {
        const b = states[i];
        if (!b.el) continue;

        // 1. Calculate ambient drift (smooth trigonometric floating)
        const ambX = Math.sin(currentTime * b.speedX + b.phase) * b.ampX;
        const ambY = Math.cos(currentTime * b.speedY + b.phase) * b.ampY;

        // 2. Interactive Cursor Physics (Repulsion Force Field)
        if (mouse.active && !isTouchDevice) {
          // Bubble current center in viewport coordinates
          const centerX = b.baseX + ambX + b.dispX + b.size / 2;
          const centerY = b.baseY + ambY + b.dispY + b.size / 2;

          const dx = centerX - mouse.x;
          const dy = centerY - mouse.y;
          const dist = Math.hypot(dx, dy);

          // Dynamic influence radius based on bubble size and depth
          const influenceRadius = (160 + b.size * 0.75) * (0.65 + b.depth * 0.35);

          if (dist < influenceRadius && dist > 0) {
            const normalizedDist = dist / influenceRadius;
            // Smooth cosine falloff for organic physical repulsion
            const falloff = Math.pow(1 - normalizedDist, 1.7);
            const maxPush = 95 * b.depth; // Foreground bubbles repel more prominently

            const normalX = dx / dist;
            const normalY = dy / dist;

            b.targetDispX = normalX * maxPush * falloff;
            b.targetDispY = normalY * maxPush * falloff;
          } else if (dist < influenceRadius * 1.35) {
            // Subtle exterior draft wave
            const draftDist = (dist - influenceRadius) / (influenceRadius * 0.35);
            const draftFalloff = (1 - draftDist) * 0.12 * b.depth;
            b.targetDispX = (dx / dist) * 15 * draftFalloff;
            b.targetDispY = (dy / dist) * 15 * draftFalloff;
          } else {
            // Natural return to baseline
            b.targetDispX = 0;
            b.targetDispY = 0;
          }
        } else {
          b.targetDispX = 0;
          b.targetDispY = 0;
        }

        // 3. Smooth spring-damping interpolation (velocity damping)
        const springDamping = 0.075 * (0.8 + b.depth * 0.3);
        b.dispX += (b.targetDispX - b.dispX) * springDamping;
        b.dispY += (b.targetDispY - b.dispY) * springDamping;

        // 4. Subtle Optical Scroll Parallax (gentle wave that stays within viewport bounds)
        const scrollParallax = Math.sin(scrollY * 0.0015 + b.phase) * 16 * b.depth;

        // 5. Total composite position
        const totalX = b.baseX + ambX + b.dispX;
        const totalY = b.baseY + ambY + b.dispY + scrollParallax;

        // Update DOM transform directly without reflow
        b.el.style.transform = `translate3d(${totalX.toFixed(2)}px, ${totalY.toFixed(2)}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {BUBBLE_PRESETS.map((preset, index) => {
        // Individualized glass characteristics based on optical depth
        const isForeground = preset.depth >= 0.8;
        const isMidground = preset.depth >= 0.5 && preset.depth < 0.8;

        const tierClass = isForeground
          ? 'glass-sphere-foreground'
          : isMidground
          ? 'glass-sphere-midground'
          : 'glass-sphere-distant';

        const opacity = isForeground
          ? 0.98
          : isMidground
          ? 0.88
          : 0.72;

        const filter = preset.blur ? `blur(${preset.blur}px)` : undefined;

        return (
          <div
            key={preset.id}
            ref={(el) => {
              elementsRef.current[index] = el;
            }}
            className={`glass-sphere ${tierClass} ${!preset.mobile ? 'hidden md:block' : ''}`}
            style={{
              width: preset.size,
              height: preset.size,
              opacity,
              filter,
              top: 0,
              left: 0,
            }}
          />
        );
      })}
    </div>
  );
}
