import React, { useEffect, useRef } from 'react';

export const HeroProfessionalBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mouse coordinates with easing
    let mouseX = width * 0.5;
    let mouseY = height * 0.4;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Glowing Ambient Orbs for gentle liquid aura
    const orbs = [
      { x: width * 0.25, y: height * 0.35, radius: 240, vx: 0.18, vy: 0.12, color: 'rgba(6, 182, 212, 0.08)' }, // Cyan
      { x: width * 0.75, y: height * 0.45, radius: 280, vx: -0.15, vy: -0.16, color: 'rgba(59, 130, 246, 0.07)' }, // Blue
      { x: width * 0.5, y: height * 0.75, radius: 220, vx: 0.12, vy: -0.14, color: 'rgba(16, 185, 129, 0.05)' } // Emerald
    ];

    // Subtle Grid Intersection Sparkles
    const gridSpacing = 44;
    const cols = Math.ceil(width / gridSpacing);
    const rows = Math.ceil(height / gridSpacing);

    interface Sparkle {
      col: number;
      row: number;
      phase: number;
      speed: number;
      maxAlpha: number;
    }

    const sparkles: Sparkle[] = [];
    const sparkleCount = Math.min(30, Math.floor((cols * rows) * 0.08));
    for (let i = 0; i < sparkleCount; i++) {
      sparkles.push({
        col: Math.floor(Math.random() * cols),
        row: Math.floor(Math.random() * rows),
        phase: Math.random() * Math.PI * 2,
        speed: 0.015 + Math.random() * 0.02,
        maxAlpha: 0.4 + Math.random() * 0.4
      });
    }

    let time = 0;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      // 1. Draw Slow-Moving Ambient Glowing Orbs
      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce gently off boundaries
        if (orb.x < width * 0.1 || orb.x > width * 0.9) orb.vx *= -1;
        if (orb.y < height * 0.1 || orb.y > height * 0.9) orb.vy *= -1;

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'rgba(11, 17, 32, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Interactive Cursor Spotlight on the Ledger Grid
      const mouseGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 280);
      mouseGrad.addColorStop(0, 'rgba(56, 189, 248, 0.14)');
      mouseGrad.addColorStop(0.5, 'rgba(6, 182, 212, 0.05)');
      mouseGrad.addColorStop(1, 'rgba(11, 17, 32, 0)');

      ctx.fillStyle = mouseGrad;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 280, 0, Math.PI * 2);
      ctx.fill();

      // 3. Crisp, Executive Technical Grid (Vertical & Horizontal lines)
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = 0; x <= width; x += gridSpacing) {
        const distToMouse = Math.abs(x - mouseX);
        const mouseFactor = Math.max(0, 1 - distToMouse / 260);
        const alpha = 0.025 + mouseFactor * 0.08;

        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y <= height; y += gridSpacing) {
        const distToMouse = Math.abs(y - mouseY);
        const mouseFactor = Math.max(0, 1 - distToMouse / 260);
        const alpha = 0.025 + mouseFactor * 0.08;

        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 4. Subtle Shimmering Intersection Crosshairs / Dots
      sparkles.forEach((s) => {
        s.phase += s.speed;
        const currentAlpha = Math.sin(s.phase) * s.maxAlpha;
        if (currentAlpha > 0.05) {
          const px = s.col * gridSpacing;
          const py = s.row * gridSpacing;

          // Dot
          ctx.beginPath();
          ctx.arc(px, py, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(56, 189, 248, ${currentAlpha})`;
          ctx.fill();

          // Subtle Crosshair mark at intersection
          ctx.strokeStyle = `rgba(103, 232, 249, ${currentAlpha * 0.6})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(px - 4, py);
          ctx.lineTo(px + 4, py);
          ctx.moveTo(px, py - 4);
          ctx.lineTo(px, py + 4);
          ctx.stroke();
        }
      });

      // 5. Elegant Flowing Chart Curve (Professional Accounting Trendline)
      ctx.beginPath();
      const waveY = height * 0.78;
      ctx.moveTo(0, waveY);
      for (let x = 0; x <= width; x += 15) {
        const sine1 = Math.sin(x * 0.003 + time * 0.8) * 22;
        const sine2 = Math.cos(x * 0.006 - time * 0.5) * 12;
        ctx.lineTo(x, waveY + sine1 + sine2);
      }
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.16)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Second harmonized trendline
      ctx.beginPath();
      const waveY2 = height * 0.84;
      ctx.moveTo(0, waveY2);
      for (let x = 0; x <= width; x += 20) {
        const sine1 = Math.sin(x * 0.0025 + time * 0.6) * 18;
        const sine2 = Math.sin(x * 0.005 + time * 0.3) * 10;
        ctx.lineTo(x, waveY2 + sine1 + sine2);
      }
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.12)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10" aria-hidden="true">
      {/* Dynamic Animated Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block opacity-90" />

      {/* Subtle Top & Bottom Fade Out for smooth blend into page */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0B1120] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0B1120] to-transparent pointer-events-none" />
    </div>
  );
};
