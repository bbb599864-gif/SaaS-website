import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contacts" className="w-full py-32 px-6 bg-gradient-to-br from-[#4a2b8c] to-[#8b3dff] text-white">
      <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-6xl md:text-[100px] font-black tracking-tighter uppercase leading-[0.9] mb-12">
            Get in<br/>touch<br/>with us
          </h2>
          <div className="space-y-8">
            <div>
              <h4 className="text-xl font-bold mb-2">Follow Elecctro online</h4>
              <div className="flex gap-4">
                <a href="#" className="hover:text-[#ffb800] transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-[#ffb800] transition-colors">Twitter</a>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Email</h4>
              <a href="mailto:commercial@elecctro.com" className="text-2xl hover:text-[#ffb800] transition-colors">commercial@elecctro.com</a>
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-[2rem]">
          <h3 className="text-2xl font-bold mb-8">Get in touch with our team to discuss your needs</h3>
          <form className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Name</label>
                <input type="text" placeholder="Full name" className="w-full bg-transparent border-b border-white/30 pb-3 outline-none focus:border-white transition-colors text-lg" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Company</label>
                <input type="text" placeholder="Organization name" className="w-full bg-transparent border-b border-white/30 pb-3 outline-none focus:border-white transition-colors text-lg" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Phone</label>
                <input type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-transparent border-b border-white/30 pb-3 outline-none focus:border-white transition-colors text-lg" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Email</label>
                <input type="email" placeholder="name@email.com" className="w-full bg-transparent border-b border-white/30 pb-3 outline-none focus:border-white transition-colors text-lg" />
              </div>
            </div>
            <button type="button" className="bg-[#ffb800] text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-white transition-colors flex items-center gap-3 w-full justify-center mt-8">
              <ArrowRight className="w-5 h-5" /> Get in Touch
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
