import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function TrustedBy() {
  return (
    <section className="py-32 bg-[#4c1d95] text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-[#4c1d95] to-purple-800 opacity-50 -z-10"></div>
      <div className="max-w-[1600px] mx-auto px-6 mb-24 flex flex-col lg:flex-row justify-between items-end gap-12">
        <div className="max-w-3xl">
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">Trusted by car wash leaders</h2>
          <p className="text-xl sm:text-2xl text-purple-200 leading-relaxed font-medium max-w-2xl">
            We support car wash operators with robust, user-focused solutions that guarantee uptime, drive sales and improve operational control.
          </p>
        </div>
        <button className="bg-[#ffb800] text-[#1a1a1a] px-10 py-5 rounded-2xl font-black flex items-center gap-4 hover:bg-white transition-colors shrink-0 text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transform duration-300">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <ArrowRight className="w-5 h-5 text-[#1a1a1a]" />
          </div>
          Get in Touch
        </button>
      </div>

      {/* Logos Carousel Placeholder */}
      <div className="flex gap-6 px-6 overflow-x-auto pb-12 hide-scrollbar snap-x snap-mandatory">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="w-72 h-40 shrink-0 bg-white/5 backdrop-blur-sm rounded-[2rem] flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors cursor-pointer snap-center">
            <span className="text-white/40 font-black text-2xl tracking-widest uppercase">LOGO {i}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
