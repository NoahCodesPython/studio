
"use client";

import React, { useRef, useEffect, useCallback } from 'react';
import { useTheme } from '@/components/theme-provider';

const BackgroundParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  
  useEffect(() => setMounted(true), []);

  // Store animationFrameId in a ref to persist across re-renders of the useEffect hook
  // without causing the hook to re-run if only the ID changes.
  const animationFrameIdRef = useRef<number | undefined>();
  // Store particles in a ref so that the animateParticles function's closure
  // always has access to the latest particles array, especially if init is called by resize.
  const particlesRef = useRef<Particle[]>([]);

  // Define Particle class outside useEffect or make it part of the hook's scope
  // For simplicity here, defining it where it's used, within the hook's recreating scope.

  const initializeEffect = useCallback(() => {
    if (!mounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.warn("BackgroundParticles: Could not get 2D context.");
      return;
    }

    // Stop any existing animation loop
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = undefined;
    }

    // Set canvas dimensions - with fallbacks
    canvas.width = window.innerWidth || document.documentElement.clientWidth || 300;
    canvas.height = window.innerHeight || document.documentElement.clientHeight || 300;

    const currentParticleColor = resolvedTheme === 'dark' ? 'rgba(200, 200, 200, 0.3)' : 'rgba(50, 50, 50, 0.3)';
    const particleCount = 50;
    particlesRef.current = []; // Clear existing particles

    // Define Particle class within initializeEffect or ensure it has access to current canvas/ctx/color
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = currentParticleColor;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.01;
        else this.size = 0; // Ensure particles can disappear if too small

        // Bounce off edges
        if (this.x + this.size < 0 || this.x - this.size > canvas.width) {
            // Reinitialize particle on the opposite side to prevent getting stuck
            this.x = this.speedX > 0 ? -this.size : canvas.width + this.size; 
        } else if (this.x < 0 || this.x > canvas.width) { // Standard bounce for most cases
             this.speedX *= -1;
        }


        if (this.y + this.size < 0 || this.y - this.size > canvas.height) {
            this.y = this.speedY > 0 ? -this.size : canvas.height + this.size;
        } else if (this.y < 0 || this.y > canvas.height) {
            this.speedY *= -1;
        }
      }

      draw() {
        if (this.size <= 0) return; // Don't draw if too small
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }


    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(new Particle());
    }

    const animateParticles = () => {
      if (!canvasRef.current || !ctx) { // Ensure canvas and context are still valid
        if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesRef.current.length; i++) {
        if (particlesRef.current[i].size <=0) { // Reinitialize particle if too small
            particlesRef.current[i] = new Particle();
        }
        particlesRef.current[i].update();
        particlesRef.current[i].draw();
      }
      animationFrameIdRef.current = requestAnimationFrame(animateParticles);
    };

    animateParticles(); // Start the animation loop

  }, [mounted, resolvedTheme]); // useCallback dependencies

  useEffect(() => {
    initializeEffect(); // Run on mount and when theme changes

    window.addEventListener('resize', initializeEffect); // Re-initialize on resize

    return () => {
      window.removeEventListener('resize', initializeEffect);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = undefined;
      }
    };
  }, [initializeEffect]); // useEffect dependency

  if (!mounted) return null;

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" />;
};

export default BackgroundParticles;
