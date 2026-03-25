import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

const variants = {
  initial: { x: "100%" },
  enter: (i: number) => ({
    x: "0%",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: i * 0.1 }
  }),
  exit: {
    x: "-100%",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0 }
  }
};

export default function TransitionOverlay({ 
  isTransitioning, 
  colors = ['#ffef5c', '#ff6b00', '#1e104a'] 
}: { 
  isTransitioning: boolean,
  colors?: string[]
}) {
  return (
    <AnimatePresence>
      {isTransitioning && (
        <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden">
          {colors.map((color, index) => (
            <motion.svg
              key={index}
              custom={index}
              variants={variants}
              initial="initial"
              animate="enter"
              exit="exit"
              className="absolute top-0 h-full w-[250vw] left-[-50vw]"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
              style={{ zIndex: 100 + index }}
            >
              <path 
                d="M 20 0 C 0 50 0 50 20 100 L 80 100 C 60 50 60 50 80 0 Z" 
                fill={color} 
              />
            </motion.svg>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
