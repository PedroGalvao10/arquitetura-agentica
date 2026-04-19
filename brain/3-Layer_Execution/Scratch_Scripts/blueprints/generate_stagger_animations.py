import sys
import os

def generate_stagger_component():
    """
    Gera o código TypeScript para o componente StaggerReveal.
    """
    code = '''
import { motion, useInView } from "framer-motion";
import { useRef, forwardRef, useImperativeHandle } from "react";

const itemVariants = {
  hidden: { opacity: 0, y: 56, filter: "blur(4px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const StaggerReveal = forwardRef(({ children, className = "", staggerInterval = 0.14 }, forwardedRef) => {
  const internalRef = useRef(null);
  const isInView = useInView(internalRef, { once: true, amount: 0.15 });

  useImperativeHandle(forwardedRef, () => internalRef.current);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: staggerInterval } },
  };

  return (
    <motion.div
      ref={internalRef}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
});

export const StaggerItem = ({ children, className = "" }) => (
  <motion.div className={className} variants={itemVariants}>
    {children}
  </motion.div>
);
'''
    return code

if __name__ == "__main__":
    print("--- STAGGER COMPONENT (TSX) ---")
    print(generate_stagger_component())
    print("\n--- DEPENDENCIES ---")
    print("npm install framer-motion")
