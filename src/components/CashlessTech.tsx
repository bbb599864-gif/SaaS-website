import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CashlessTech() {
  return (
    <section className="py-24 px-6 max-w-[1600px] mx-auto bg-white">
      <div className="flex flex-col lg:flex-row items-center gap-20">
        {/* Left: 3D Terminal Placeholder */}
        <div className="flex-1 w-full bg-[#f4f5f7] rounded-[2rem] min-h-[600px] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-96 bg-white rounded-3xl shadow-2xl border-8 border-gray-200 flex flex-col items-center p-6 relative">
              <div className="w-full h-48 bg-[#ffb800] rounded-xl mb-8 flex items-center justify-center text-white font-bold text-xl text-center">
                Pagamento<br/>Automático
              </div>
              <div className="w-16 h-16 bg-[#1a1a1a] rounded-full mb-6"></div>
              <div className="w-full h-3 bg-gray-200 rounded-full mb-3"></div>
              <div className="w-3/4 h-3 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="flex-1">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-medium text-gray-900 mb-8 tracking-tight leading-[1.1]">
            Cashless technology for any machine
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed font-light">
            Upgrade your car wash with a modern, weather-proof payment terminal that accepts all major payment methods.
          </p>
          <p className="text-lg sm:text-xl text-gray-600 mb-12 leading-relaxed font-light">
            Elecctro integrates seamlessly with your existing setup, offering a smooth experience for your customers and powerful management tools for you.
          </p>
          
          <button className="flex items-center gap-3 text-gray-900 font-medium hover:text-gray-600 transition-colors group text-lg">
            Explore Features
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
