"use client";

import * as React from "react";
import { motion, useAnimation, type Variants } from "framer-motion";

/**
 * FloatingProfile (Evolved v2)
 * Premium draggable profile card with orbital-physics movement.
 * Evolved: Refined animation cycle and interactive glassmorphism.
 */
export function FloatingProfile() {
  const controls = useAnimation();

  const moveRandomly = React.useCallback(async () => {
    try {
      // Delay to avoid hydration flickers
      await new Promise(r => setTimeout(r, 1200));
      
      while (true) {
        const nextX = (Math.random() - 0.5) * 550;
        const nextY = (Math.random() - 0.5) * 350;
        const nextRotateX = (Math.random() - 0.5) * 25;
        const nextRotateY = (Math.random() - 0.5) * 25;
        const nextRotateZ = (Math.random() - 0.5) * 10;
        const duration = 12 + Math.random() * 8; // Slower, more elegant movement

        await controls.start({
          x: nextX,
          y: nextY,
          rotateX: nextRotateX,
          rotateY: nextRotateY,
          rotateZ: nextRotateZ,
          transition: { 
            duration, 
            ease: "circInOut" // Smoother curve for orbital feel
          }
        });
      }
    } catch {
      // Quietly handle interruptions
    }
  }, [controls]);

  React.useEffect(() => {
    moveRandomly();
    return () => controls.stop();
  }, [moveRandomly, controls]);

  const cardVariants: Variants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 255, 255, 0.1)",
      transition: { type: "spring", stiffness: 400, damping: 20 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      animate={controls}
      className="fixed bottom-[15%] right-[5%] md:right-[12%] z-[50000] pointer-events-none"
    >
      <motion.div
        drag
        dragMomentum={false}
        variants={cardVariants}
        whileHover="hover"
        whileTap="tap"
        className="pointer-events-auto cursor-grab active:cursor-grabbing preserve-3d"
      >
        <div className="w-40 md:w-48 aspect-[3/3.6] bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-6 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group">
          {/* Internal Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="w-16 h-16 md:w-24 md:h-24 bg-black/30 rounded-full flex items-center justify-center mb-4 shadow-inner border-[3px] border-white/40 overflow-hidden pointer-events-none relative z-10">
            <img
              src="/assets/pedro-profile.png"
              alt="Pedro Galvão"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              draggable={false}
            />
          </div>
          
          <div className="text-center mt-2 pointer-events-none relative z-10">
            <p className="font-bold text-sm md:text-base text-white tracking-tight">Pedro Galvão</p>
            <p className="text-[10px] md:text-xs text-white/60 mt-1 uppercase tracking-widest font-medium">Architect</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
