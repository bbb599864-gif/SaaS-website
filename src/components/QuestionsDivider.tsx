import React from 'react';
import { ArrowRight } from 'lucide-react';
import MiniMachine from './MiniMachine';

export default function QuestionsDivider() {
  return (
    <section className="w-full bg-[#f8f9fa] py-12 px-6 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* 3D Vending Machine centered as a decorative divider */}
      <div className="w-full max-w-[800px] h-[300px] flex items-center justify-center relative z-10">
        {/* We use the "Snacks" machine to get the vending machine model */}
        <MiniMachine name="Snacks" />
      </div>

    </section>
  );
}
