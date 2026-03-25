import React from 'react';
import { Globe, ArrowRight, ChevronDown } from 'lucide-react';

export default function Navbar({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center cursor-pointer" onClick={() => onNavigate('hero')}>
          <span className="text-2xl font-black tracking-tighter text-gray-800 flex items-center">
            elec
            <span className="relative inline-flex items-center justify-center">
              <span className="absolute w-5 h-5 bg-[#ffb800] rounded-full -z-10"></span>
              t
            </span>
            ro
          </span>
        </div>

        {/* Links */}
        <div className="hidden lg:flex items-center gap-10 text-[15px] font-medium text-gray-700">
          <button onClick={() => onNavigate('services')} className="flex items-center gap-1 hover:text-black transition-colors">
            Services <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          <button onClick={() => onNavigate('projects')} className="hover:text-black transition-colors">Projects</button>
          <button onClick={() => onNavigate('about')} className="hover:text-black transition-colors">About us</button>
          <button onClick={() => onNavigate('careers')} className="hover:text-black transition-colors">Careers</button>
          <button onClick={() => onNavigate('contacts')} className="hover:text-black transition-colors">Contacts</button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:flex items-center gap-2 bg-[#f0f0f9] hover:bg-[#e4e4f0] text-[#1a1a1a] px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors">
            <Globe className="w-4 h-4" /> EN
          </button>
          <button onClick={() => onNavigate('contacts')} className="bg-[#1a1a1a] hover:bg-black text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#ffb800] flex items-center justify-center">
              <ArrowRight className="w-3 h-3 text-black" />
            </div>
            Get in Touch
          </button>
        </div>
      </div>
    </nav>
  );
}
