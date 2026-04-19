"use client";

import { useEffect, useRef } from "react";

/**
 * StarsBackground (Evolved v2 - Optimized)
 * High-performance star field using offscreen canvas sprites and lerp smoothing.
 * Optimized to handle 2400+ stars with zero GPU overhead from shadowBlur.
 */
export function StarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false }); // Better performance for background
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { x: number; y: number; z: number; size: number; opacity: number; color: string }[] = [];
    const starCount = 2400;
    
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Create a pre-rendered star sprite to avoid expensive CPU/GPU effects in the loop
    const spriteSize = 32;
    const starSprite = document.createElement("canvas");
    starSprite.width = spriteSize;
    starSprite.height = spriteSize;
    const sCtx = starSprite.getContext("2d");
    if (sCtx) {
      const gradient = sCtx.createRadialGradient(
        spriteSize / 2, spriteSize / 2, 0,
        spriteSize / 2, spriteSize / 2, spriteSize / 2
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.4)");
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.1)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      sCtx.fillStyle = gradient;
      sCtx.fillRect(0, 0, spriteSize, spriteSize);
    }

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      
      stars = [];
      for (let i = 0; i < starCount; i++) {
        const opacity = Math.random();
        let colorType = "white";
        if (opacity > 0.92) colorType = "cyan";
        else if (opacity < 0.08) colorType = "violet";

        stars.push({
          x: Math.random() * width * 4 - width * 2,
          y: Math.random() * height * 4 - height * 2,
          z: Math.random() * width,
          size: Math.random() * 1.5 + 0.5,
          opacity: opacity,
          color: colorType
        });
      }
    };

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX - width / 2) * 0.12;
      targetY = (e.clientY - height / 2) * 0.12;
    };

    const animate = () => {
      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;

      // Clear with efficient color
      ctx.fillStyle = "#08080f";
      ctx.fillRect(0, 0, width, height);

      stars.forEach((star) => {
        star.z -= 0.7; // Approaching speed
        if (star.z <= 0) {
          star.z = width;
          star.x = Math.random() * width * 4 - width * 2;
          star.y = Math.random() * height * 4 - height * 2;
        }

        const factor = width / star.z;
        const x = (star.x - mouseX) * factor + width / 2;
        const y = (star.y - mouseY) * factor + height / 2;
        const size = star.size * factor * 0.6;

        // Frustum culling
        if (x < -50 || x > width + 50 || y < -50 || y > height + 50) return;

        const currentOpacity = star.opacity * (1 - star.z / width);
        ctx.globalAlpha = currentOpacity;

        // Use pre-rendered sprite for glowing stars, or simple arc for far ones
        if (star.opacity > 0.7) {
          const s = size * 4; // Glow area proportional to star size
          ctx.drawImage(starSprite, x - s/2, y - s/2, s, s);
        } else {
          ctx.beginPath();
          ctx.arc(x, y, size / 2, 0, Math.PI * 2);
          ctx.fillStyle = "white";
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", init);
    window.addEventListener("mousemove", handleMouseMove);
    init();
    animate();

    return () => {
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ background: "#08080F" }}
    />
  );
}
