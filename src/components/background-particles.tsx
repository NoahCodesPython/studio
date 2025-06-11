
"use client";

import React, { useRef, useEffect, useCallback } from 'react';
import { useTheme } from '@/components/theme-provider';

const BackgroundParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  
  useEffect(() => setMounted(true), []);

  const animationFrameIdRef = useRef<number | undefined>();
  const particlesRef = useRef<Particle[]>([]);

  // Define Particle class
  class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
    canvasWidth: number;
    canvasHeight: number;

    constructor(canvasWidth: number, canvasHeight: number, particleColor: string) {
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.x = Math.random() * this.canvasWidth;
      this.y = Math.random() * this.canvasHeight;
      this.size = Math.random() * 2.5 + 0.5; // Slightly smaller max size, fixed after creation
      this.speedX = Math.random() * 0.8 - 0.4; // Slightly slower speeds
      this.speedY = Math.random() * 0.8 - 0.4;
      this.color = particleColor;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Bounce off edges
      if (this.x + this.size < 0 || this.x - this.size > this.canvasWidth) {
          this.x = this.speedX > 0 ? -this.size : this.canvasWidth + this.size; 
      } else if (this.x - this.size < 0 && this.speedX < 0) {
           this.speedX *= -1;
      } else if (this.x + this.size > this.canvasWidth && this.speedX > 0) {
           this.speedX *= -1;
      }


      if (this.y + this.size < 0 || this.y - this.size > this.canvasHeight) {
          this.y = this.speedY > 0 ? -this.size : this.canvasHeight + this.size;
      } else if (this.y - this.size < 0 && this.speedY < 0) {
          this.speedY *= -1;
      } else if (this.y + this.size > this.canvasHeight && this.speedY > 0) {
          this.speedY *= -1;
      }
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const initializeEffect = useCallback(() => {
    if (!mounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.warn("BackgroundParticles: Could not get 2D context.");
      return;
    }

    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = undefined;
    }

    canvas.width = window.innerWidth || document.documentElement.clientWidth || 300;
    canvas.height = window.innerHeight || document.documentElement.clientHeight || 300;

    const currentParticleColor = resolvedTheme === 'dark' ? 'rgba(200, 200, 200, 0.25)' : 'rgba(50, 50, 50, 0.25)'; // Slightly more transparent
    const particleCount = 25; // Reduced particle count
    particlesRef.current = []; 

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(new Particle(canvas.width, canvas.height, currentParticleColor));
    }

    const animateParticles = () => {
      if (!canvasRef.current || !ctx) { 
        if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesRef.current.length; i++) {
        particlesRef.current[i].update();
        particlesRef.current[i].draw(ctx);
      }
      animationFrameIdRef.current = requestAnimationFrame(animateParticles);
    };

    animateParticles();

  }, [mounted, resolvedTheme]); // Particle class is stable if defined outside or if its deps are included

  useEffect(() => {
    let resizeHandler: () => void;
    const timer = setTimeout(() => {
      initializeEffect();
      // Debounce resize handler or make it simpler if performance is an issue
      resizeHandler = () => initializeEffect();
      window.addEventListener('resize', resizeHandler);
    }, 2500); // Delay initialization

    return () => {
      clearTimeout(timer);
      if (resizeHandler) {
        window.removeEventListener('resize', resizeHandler);
      }
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = undefined;
      }
    };
  }, [initializeEffect]);

  if (!mounted) return null;

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" />;
};

export default BackgroundParticles;
