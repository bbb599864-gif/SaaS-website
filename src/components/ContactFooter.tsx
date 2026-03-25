import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function ContactFooter() {
  return (
    <footer className="bg-white pt-32 pb-16 px-6 border-t border-gray-100 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto flex flex-col items-center text-center relative z-10 mb-32">
        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-medium text-gray-900 mb-8 tracking-tight leading-[1.1] max-w-4xl">
          Ready to upgrade your car wash?
        </h2>
        <p className="text-xl text-gray-600 mb-12 leading-relaxed font-light max-w-2xl">
          Get in touch with our team to learn more about how Elecctro can help you streamline operations and boost profitability.
        </p>
        <button className="bg-[#1a1a1a] hover:bg-black text-white px-8 py-4 rounded-xl text-base font-medium transition-colors flex items-center gap-3">
          Contact Us
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </div>
        </button>
      </div>

      <div className="max-w-[1600px] mx-auto pt-12 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-6 text-sm text-gray-500 font-medium relative z-10">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900 text-lg tracking-tight">elecctro</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Made by</span>
          <span className="text-black font-bold">Lynksen</span>
        </div>
        <div className="flex gap-12">
          <a href="#" className="hover:text-black transition-colors">Terms & Conditions</a>
          <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
        </div>
        <div>© 2024 Elecctro solutions, Lda</div>
      </div>
    </footer>
  );
}
