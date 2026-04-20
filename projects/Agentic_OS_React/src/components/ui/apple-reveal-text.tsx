"use client";

import { motion, type Variants } from "framer-motion";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface AppleRevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

/**
 * AppleRevealText
 * Premium word-by-word reveal effect.
 * Evolved: Optimized word splitting and variant definitions for better performance.
 */
export function AppleRevealText({
  text,
  className,
  delay = 0,
  once = true,
}: AppleRevealTextProps) {
  const words = useMemo(() => text.split(" "), [text]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.06, 
        delayChildren: delay 
      },
    },
  };

  const childVariants: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 120,
      },
    },
    hidden: { opacity: 0, y: 15 },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      className={cn("inline-flex flex-wrap", className)}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-flex">
          <motion.span
            variants={childVariants}
            className="inline-block"
          >
            {word}
          </motion.span>
          {index < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </motion.span>
  );
}

interface LetterTypewriterProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

/**
 * LetterTypewriter
 * Classic letter-by-letter reveal.
 * Evolved: Uses specialized transition for high-frequency updates.
 */
export function LetterTypewriter({
  text,
  className,
  delay = 0,
  once = true,
}: LetterTypewriterProps) {
  const letters = useMemo(() => Array.from(text), [text]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.02, 
        delayChildren: delay 
      },
    },
  };

  const letterVariants: Variants = {
    visible: {
      opacity: 1,
      transition: { duration: 0.1, ease: "linear" },
    },
    hidden: {
      opacity: 0,
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      className={cn("inline-block", className)}
    >
      {letters.map((letter, index) => (
        <motion.span 
          variants={letterVariants} 
          key={`${letter}-${index}`}
          className="inline-block whitespace-pre"
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
}
