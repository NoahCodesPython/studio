
"use client";

import React, { useRef, useEffect } from 'react';
import { useTheme } from '@/components/theme-provider';

const BackgroundParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);


  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      // console.warn("BackgroundParticles: Could not get 2D context.");
      return; // Exit if context cannot be obtained
    }

    let animationFrameId: number;
    const particles: Particle[] = [];
    const particleCount = 50;
    
    // particleColor is determined here, so init() will use the correct theme-based color
    const particleColor = resolvedTheme === 'dark' ? 'rgba(200, 200, 200, 0.3)' : 'rgba(50, 50, 50, 0.3)';

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor(color: string) {
        // Uses canvas.width/height which are set in init() before Particle instances are created
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = color;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.01;

        // Use canvas.width/height from the closure, which are updated by init()
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        // ctx is from the closure of the useEffect hook
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    function init() {
      // Critical: Set canvas dimensions to current window size *before* creating particles
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      particles.length = 0; // Clear existing particles
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(particleColor)); // particleColor is from useEffect scope
      }
    }

    function animate() {
      if (!canvasRef.current) { // Safety check if canvas is removed
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    init(); // Initial setup of particles for this effect run
    animate(); // Start animation loop

    const handleResize = () => {
      if (!canvasRef.current) return; // Guard
      // init() will now handle setting canvas dimensions and re-creating particles
      init(); 
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) { // Ensure animationFrameId is defined before cancelling
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [mounted, resolvedTheme]); // Dependencies remain the same

  if (!mounted) return null;

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" />;
};

export default BackgroundParticles;
