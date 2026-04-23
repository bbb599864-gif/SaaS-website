import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function ContactFooter() {
  return (
    <footer className="bg-[#f8f9fa] pt-16 pb-16 px-6 border-t border-gray-100 relative overflow-hidden">
      
      {/* The Form Card */}
      <div className="w-full max-w-6xl mx-auto bg-white rounded-[2rem] shadow-xl p-8 md:p-12 lg:p-16 relative z-20 flex flex-col lg:flex-row gap-12 lg:gap-24 items-center md:items-start justify-between border border-slate-100 mb-32">
        
        {/* Left Side: Headlines */}
        <div className="flex flex-col gap-6 w-full lg:w-1/2">
          <h2 className="text-5xl md:text-6xl font-semibold text-slate-900 tracking-tight leading-none">
            Have questions?
            <br />
            <span className="text-slate-300">Let's connect</span>
          </h2>
          <a 
            href="mailto:comercial@elecctro.com" 
            className="text-2xl md:text-3xl font-medium text-slate-900 hover:text-slate-600 transition-colors mt-auto pt-8"
          >
            comercial@elecctro.com
          </a>
        </div>

        {/* Right Side: Form */}
        <div className="flex flex-col gap-4 w-full lg:w-1/2">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="flex-1 bg-[#f4f4f5] rounded-2xl p-4">
              <label className="text-xs font-semibold text-slate-900 block mb-1">Name</label>
              <input 
                type="text" 
                placeholder="Full name" 
                className="w-full bg-transparent border-none outline-none text-slate-600 placeholder:text-slate-400 font-medium"
              />
            </div>
            <div className="flex-1 bg-[#f4f4f5] rounded-2xl p-4">
              <label className="text-xs font-semibold text-slate-900 block mb-1">Company</label>
              <input 
                type="text" 
                placeholder="Organization name" 
                className="w-full bg-transparent border-none outline-none text-slate-600 placeholder:text-slate-400 font-medium"
              />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="flex-1 bg-[#f4f4f5] rounded-2xl p-4">
              <label className="text-xs font-semibold text-slate-900 block mb-1">Phone</label>
              <input 
                type="text" 
                placeholder="+1 (555) 000-0000" 
                className="w-full bg-transparent border-none outline-none text-slate-600 placeholder:text-slate-400 font-medium"
              />
            </div>
            <div className="flex-1 bg-[#f4f4f5] rounded-2xl p-4">
              <label className="text-xs font-semibold text-slate-900 block mb-1">Email</label>
              <input 
                type="email" 
                placeholder="name@email.com" 
                className="w-full bg-transparent border-none outline-none text-slate-600 placeholder:text-slate-400 font-medium"
              />
            </div>
          </div>

          <button className="w-full bg-[#1a1429] hover:bg-[#2d2442] transition-colors text-white rounded-2xl p-3 mt-4 flex items-center justify-between group">
            <div className="bg-[#ffb800] rounded-xl p-2 group-hover:scale-105 transition-transform">
              <ArrowRight className="w-5 h-5 text-[#1a1429]" />
            </div>
            <span className="font-semibold px-4">Get in Touch</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-12 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-6 text-sm text-gray-500 font-medium relative z-10">
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
