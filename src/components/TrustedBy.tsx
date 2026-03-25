import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function TrustedBy() {
  return (
    <section className="py-32 bg-gradient-to-br from-[#1e104a] to-[#4c1d95] text-white overflow-hidden relative">
      <div className="max-w-[1600px] mx-auto px-6 mb-24 flex flex-col lg:flex-row justify-between items-end gap-12">
        <div className="max-w-3xl">
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-medium mb-8 tracking-tight leading-[1.1]">Trusted by car wash leaders</h2>
          <p className="text-xl sm:text-2xl text-purple-200 leading-relaxed font-light max-w-2xl">
            We support car wash operators with robust, user-focused solutions that guarantee uptime, drive sales and improve operational control.
          </p>
        </div>
        <button className="bg-[#ffb800] text-[#1a1a1a] px-8 py-4 rounded-xl font-medium flex items-center gap-3 hover:bg-white transition-colors shrink-0 text-base">
          <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center">
            <ArrowRight className="w-3.5 h-3.5 text-[#1a1a1a]" />
          </div>
          Get in Touch
        </button>
      </div>

      {/* Logos Carousel Placeholder */}
      <div className="flex gap-6 px-6 overflow-x-auto pb-12 hide-scrollbar snap-x snap-mandatory max-w-[1600px] mx-auto">
        {['ElefanteAzul', 'Super2000', 'edp', 'Feijao Verde', 'galp'].map((logo, i) => (
          <div key={i} className="w-72 h-40 shrink-0 bg-white/5 backdrop-blur-sm rounded-[2rem] flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors cursor-pointer snap-center">
            <span className="text-white/60 font-medium text-xl tracking-wider">{logo}</span>
          </div>
        ))}
      </div>

      {/* Terminal Images Section */}
      <div className="bg-white text-gray-900 mt-24 pt-32 pb-24">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex justify-between items-center mb-16">
            <button className="text-gray-400 hover:text-gray-900 font-medium transition-colors">Previous</button>
            <button className="text-gray-400 hover:text-gray-900 font-medium transition-colors">Next</button>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-medium text-gray-300 mb-16 max-w-4xl leading-tight">
            Our terminal adapts seamlessly to any car wash setup with smart integration and unmatched reliability.
          </h2>

          <div className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-[400px] h-[500px] shrink-0 bg-gray-100 rounded-[2rem] snap-center overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">
                  Image {i}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
