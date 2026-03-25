import React from 'react';

export default function TransitionOverlay({ isTransitioning }: { isTransitioning: boolean }) {
  if (!isTransitioning) return null;
  
  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      <div className="absolute top-0 bottom-0 w-[150vw] bg-[#ffef5c] animate-wave-1 -left-[150vw]"></div>
      <div className="absolute top-0 bottom-0 w-[150vw] bg-[#ff6b00] animate-wave-2 -left-[150vw]"></div>
      <div className="absolute top-0 bottom-0 w-[150vw] bg-[#1e104a] animate-wave-3 -left-[150vw]"></div>
    </div>
  );
}
