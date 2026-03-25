import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function ContactFooter() {
  return (
    <footer className="bg-white pt-32 pb-16 px-6 border-t border-gray-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-gray-50 to-transparent -z-10"></div>
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-24 relative z-10">
        <div className="flex-1 max-w-2xl">
          <h2 className="text-7xl sm:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-[0.9]">
            Have questions?<br/><span className="text-gray-300">Let's connect</span>
          </h2>
          <a href="mailto:commercial@electro.com" className="text-4xl sm:text-5xl font-bold text-gray-900 hover:text-[#ffb800] transition-colors inline-block border-b-4 border-transparent hover:border-[#ffb800] pb-2">
            commercial@electro.com
          </a>
        </div>
        
        <div className="flex-1 max-w-2xl bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-100 relative">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#ffb800] rounded-full blur-3xl opacity-50"></div>
          <form className="space-y-10 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="relative group">
                <input type="text" id="name" placeholder=" " className="peer w-full border-b-2 border-gray-200 py-4 focus:outline-none focus:border-black transition-colors bg-transparent text-lg font-medium" />
                <label htmlFor="name" className="absolute left-0 top-4 text-gray-400 text-lg font-medium transition-all peer-focus:-top-6 peer-focus:text-sm peer-focus:text-black peer-focus:font-bold peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-black peer-not-placeholder-shown:font-bold cursor-text">Full name</label>
              </div>
              <div className="relative group">
                <input type="text" id="company" placeholder=" " className="peer w-full border-b-2 border-gray-200 py-4 focus:outline-none focus:border-black transition-colors bg-transparent text-lg font-medium" />
                <label htmlFor="company" className="absolute left-0 top-4 text-gray-400 text-lg font-medium transition-all peer-focus:-top-6 peer-focus:text-sm peer-focus:text-black peer-focus:font-bold peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-black peer-not-placeholder-shown:font-bold cursor-text">Organization name</label>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="relative group">
                <input type="tel" id="phone" placeholder=" " className="peer w-full border-b-2 border-gray-200 py-4 focus:outline-none focus:border-black transition-colors bg-transparent text-lg font-medium" />
                <label htmlFor="phone" className="absolute left-0 top-4 text-gray-400 text-lg font-medium transition-all peer-focus:-top-6 peer-focus:text-sm peer-focus:text-black peer-focus:font-bold peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-black peer-not-placeholder-shown:font-bold cursor-text">+1 (555) 000-0000</label>
              </div>
              <div className="relative group">
                <input type="email" id="email" placeholder=" " className="peer w-full border-b-2 border-gray-200 py-4 focus:outline-none focus:border-black transition-colors bg-transparent text-lg font-medium" />
                <label htmlFor="email" className="absolute left-0 top-4 text-gray-400 text-lg font-medium transition-all peer-focus:-top-6 peer-focus:text-sm peer-focus:text-black peer-focus:font-bold peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-black peer-not-placeholder-shown:font-bold cursor-text">name@email.com</label>
              </div>
            </div>
            <button className="w-full bg-[#1a1a1a] text-white py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-4 hover:bg-[#ffb800] hover:text-black transition-all duration-300 mt-12 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
              Get in Touch
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <ArrowRight className="w-5 h-5" />
              </div>
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto mt-40 pt-12 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-6 text-sm text-gray-500 font-bold tracking-wide uppercase relative z-10">
        <div className="flex items-center gap-2">
          <span>Made by</span>
          <span className="text-black font-black">Lynksen</span>
        </div>
        <div className="flex gap-12">
          <a href="#" className="hover:text-black transition-colors">Terms & Conditions</a>
          <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
        </div>
        <div>© 2026 Electro solutions, Lda</div>
      </div>
    </footer>
  );
}
