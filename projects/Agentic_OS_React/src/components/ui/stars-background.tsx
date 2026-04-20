"use client";

import { useEffect, useRef } from "react";

/**
 * StarsBackground (Evolved v2 - Optimized)
 * High-performance star field using offscreen canvas sprites and lerp smoothing.
 * Optimized to handle 2400+ stars with zero GPU overhead from shadowBlur.
 */
/**
 * StarsBackground (Cosmos Edition)
 * High-performance star field using offscreen canvas sprites and depth layers.
 * Enhanced with nebula-like gradients and multi-colored stellar bodies.
 */
interface StarsBackgroundProps {
  density?: number;
  opacity?: number;
  speedFactor?: number;
  warpSpeed?: number; // New prop for transition effect
}

export function StarsBackground({
  density = 400,
  opacity = 1,
  speedFactor = 1,
  warpSpeed = 0,
}: StarsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Explicitly use alpha: true
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { x: number; y: number; z: number; size: number; opacity: number; color: string; speed: number }[] = [];
    
    let width = window.innerWidth;
    let height = window.innerHeight;

    const createSprite = (baseColor: string, glowColor: string) => {
      const spriteSize = 64;
      const sprite = document.createElement("canvas");
      sprite.width = spriteSize;
      sprite.height = spriteSize;
      const sCtx = sprite.getContext("2d");
      if (sCtx) {
        const center = spriteSize / 2;
        const gradient = sCtx.createRadialGradient(center, center, 0, center, center, center);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.1, baseColor);
        gradient.addColorStop(0.3, glowColor);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        sCtx.fillStyle = gradient;
        sCtx.fillRect(0, 0, spriteSize, spriteSize);
      }
      return sprite;
    };

    const sprites = {
      white: createSprite("rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0.1)"),
      blue: createSprite("rgba(147, 197, 253, 0.9)", "rgba(59, 130, 246, 0.2)"),
      purple: createSprite("rgba(196, 181, 253, 0.9)", "rgba(139, 92, 246, 0.2)"),
      gold: createSprite("rgba(253, 224, 71, 0.8)", "rgba(234, 179, 8, 0.15)"),
    };

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      
      stars = [];
      const safeDensity = Math.min(density, 2500); 
      
      for (let i = 0; i < safeDensity; i++) {
        const z = Math.random() * width * 1.5;
        const starOpacity = (Math.random() * 0.5 + 0.5) * opacity;
        
        let colorKey: keyof typeof sprites = "white";
        const rand = Math.random();
        if (rand > 0.97) colorKey = "gold";
        else if (rand > 0.90) colorKey = "purple";
        else if (rand > 0.80) colorKey = "blue";

        stars.push({
          x: Math.random() * width * 6 - width * 3,
          y: Math.random() * height * 6 - height * 3,
          z: z,
          size: Math.random() * 1.8 + 0.6,
          opacity: starOpacity,
          color: colorKey,
          speed: (Math.random() * 0.4 + 0.1) * speedFactor
        });
      }
    };

    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX - width / 2) * 0.1;
      targetY = (e.clientY - height / 2) * 0.1;
    };

    const animate = () => {
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Effect parameters based on warpSpeed
      const currentSpeedMult = 1 + (warpSpeed * 50);
      const trailLengthMult = 1 + (warpSpeed * 20);

      stars.forEach((star) => {
        const effectiveSpeed = star.speed * currentSpeedMult;
        star.z -= effectiveSpeed;

        if (star.z <= 1) {
          star.z = width * 1.5;
          star.x = Math.random() * width * 6 - width * 3;
          star.y = Math.random() * height * 6 - height * 3;
        }

        const factor = width / star.z;
        const px = (star.x - mouseX) * factor + width / 2;
        const py = (star.y - mouseY) * factor + height / 2;
        const size = star.size * factor * 0.5;

        // Depth-based opacity
        const depthOpacity = (1 - star.z / (width * 1.5)) * star.opacity;
        ctx.globalAlpha = Math.max(0, Math.min(1, depthOpacity));

        if (warpSpeed > 0.05) {
          // Draw trails
          const prevFactor = width / (star.z + effectiveSpeed * trailLengthMult);
          const oldX = (star.x - mouseX) * prevFactor + width / 2;
          const oldY = (star.y - mouseY) * prevFactor + height / 2;

          ctx.beginPath();
          ctx.strokeStyle = star.color === "white" ? "#fff" : star.color === "blue" ? "#60a5fa" : star.color === "purple" ? "#a78bfa" : "#fbbf24";
          ctx.lineWidth = size * 0.8;
          ctx.lineCap = "round";
          ctx.moveTo(px, py);
          ctx.lineTo(oldX, oldY);
          ctx.stroke();
        } else {
          // Draw standard sprites
          const sprite = sprites[star.color as keyof typeof sprites];
          const s = size * 8;
          ctx.drawImage(sprite, px - s / 2, py - s / 2, s, s);
        }
      });

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", init);
    if (warpSpeed < 0.1) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    init();
    animate();

    return () => {
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, opacity, speedFactor, warpSpeed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
