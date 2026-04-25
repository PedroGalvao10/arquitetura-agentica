import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  as?: 'button' | 'a' | 'div';
  href?: string;
  onClick?: () => void;
  strength?: number;
}

export function MagneticButton({
  children,
  className = '',
  as: Component = 'button',
  href,
  onClick,
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const commonProps = {
    ref: ref as any,
    className: `relative inline-block transition-colors duration-300 ${className}`,
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    style: {
      x: springX,
      y: springY,
    },
    ...(Component === 'a' ? { href } : {}),
    ...(Component === 'button' ? { onClick, type: 'button' as const } : {}),
  };

  const MotionComponent = motion[Component as keyof typeof motion] || motion.div;
  
  return (
    // @ts-ignore
    <MotionComponent
      {...commonProps}
    >
      <span className="relative z-10">{children}</span>
      {isHovered && (
        <motion.div
          layoutId="magnetic-glow"
          className="absolute inset-0 bg-white/5 rounded-full blur-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        />
      )}
    </MotionComponent>
  );
}
