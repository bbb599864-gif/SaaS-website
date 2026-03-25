import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Projects() {
  return (
    <section id="projects" className="w-full py-32 px-6 max-w-[1600px] mx-auto border-t border-gray-100">
      <div className="grid lg:grid-cols-2 gap-16 mb-24">
        <div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">Explore our projects</h2>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-2xl text-gray-800 font-medium">Innovative IoT solutions solving real challenges and driving measurable results for our clients.</p>
        </div>
      </div>

      <div className="space-y-12">
        {/* Project 1 */}
        <div className="grid lg:grid-cols-2 gap-12 bg-gray-50 rounded-[3rem] p-8 md:p-16 border border-gray-100">
          <div className="flex flex-col justify-between">
            <div>
              <div className="text-sm font-bold text-gray-400 mb-4">01</div>
              <h3 className="text-4xl font-bold mb-6">RevGuard Coffee</h3>
              <p className="text-xl text-gray-600 mb-8">IoT serving control that protects coffee roaster contracts and stops revenue leakage in every cup.</p>
            </div>
            <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider bg-black text-white px-6 py-4 rounded-xl w-fit hover:bg-gray-800 transition-colors">
              <ArrowRight className="w-4 h-4" /> Explore Project
            </button>
          </div>
          <div className="h-[400px] rounded-3xl overflow-hidden">
            <img src="https://picsum.photos/seed/coffee-machine/800/600" alt="Coffee Machine" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>

        {/* Project 2 */}
        <div className="grid lg:grid-cols-2 gap-12 bg-gray-50 rounded-[3rem] p-8 md:p-16 border border-gray-100">
          <div className="flex flex-col justify-between">
            <div>
              <div className="text-sm font-bold text-gray-400 mb-4">02</div>
              <h3 className="text-4xl font-bold mb-6">CapsuLock</h3>
              <p className="text-xl text-gray-600 mb-8">Secure coffee capsule system with cashless payment and brewing control for unattended environments.</p>
            </div>
            <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider bg-black text-white px-6 py-4 rounded-xl w-fit hover:bg-gray-800 transition-colors">
              <ArrowRight className="w-4 h-4" /> Explore Project
            </button>
          </div>
          <div className="h-[400px] rounded-3xl overflow-hidden">
            <img src="https://picsum.photos/seed/capsule/800/600" alt="Capsule System" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>
      </div>
    </section>
  );
}
