import React from 'react';
import Scene from './Scene';
import { MousePointer2 } from 'lucide-react';

interface HeroProps {
  onMachineClick?: (machineName: string) => void;
}

export default function Hero({ onMachineClick }: HeroProps) {
  return (
    <section id="hero" className="pt-24 pb-12 px-4 sm:px-6 flex flex-col min-h-screen">
      <div className="relative flex-1 w-full max-w-[1600px] mx-auto bg-isometric-grid rounded-[2rem] overflow-hidden border border-gray-200 shadow-sm min-h-[600px]">
        <Scene onMachineClick={onMachineClick} />
        <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 bg-[#ff5a00] text-white p-4 sm:p-5 rounded-xl flex items-center gap-4 shadow-xl max-w-sm z-20 border-4 border-[#ff5a00]">
          <div className="bg-white p-3 rounded-lg flex items-center justify-center relative shrink-0">
            <MousePointer2 className="w-8 h-8 text-[#ff5a00] fill-white drop-shadow-md" />
          </div>
          <p className="font-medium text-[15px] leading-snug">
            Click any 3D object to view detailed<br/>information and explore features.
          </p>
        </div>
      </div>
    </section>
  );
}
