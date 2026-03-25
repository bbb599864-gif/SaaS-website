import React from 'react';
import { Droplets, CreditCard, Pointer, Settings, ArrowRight } from 'lucide-react';

export default function CarWashHero() {
  return (
    <section className="pt-32 pb-24 px-6 max-w-[1600px] mx-auto flex flex-col lg:flex-row items-start gap-20">
      {/* Left: 3D Model Placeholder */}
      <div className="flex-1 w-full bg-[#f4f5f7] rounded-[2rem] min-h-[600px] flex items-center justify-center relative overflow-hidden border border-gray-100">
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-96 bg-white rounded-3xl shadow-2xl border-8 border-gray-200 flex flex-col items-center p-6 relative transform hover:scale-105 transition-transform duration-700">
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
      <div className="flex-1 flex flex-col justify-center pt-8">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-medium text-gray-900 mb-6 tracking-tight">
          Car Wash
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl font-light">
          Streamline car wash operations with a weather-proof payment terminal that accepts cards, wallets and apps, plus a powerful online platform with real-time alerts and performance metrics.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10 mb-16">
          <div>
            <div className="w-12 h-12 bg-[#ffef5c] rounded-xl flex items-center justify-center mb-5">
              <Droplets className="w-6 h-6 text-gray-900" strokeWidth={1.5} />
            </div>
            <h3 className="font-medium text-gray-900 text-lg mb-2">Water Resistant</h3>
            <p className="text-gray-600 leading-relaxed font-light">Weather-proof and water resistant for outdoor use</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-[#ffef5c] rounded-xl flex items-center justify-center mb-5">
              <CreditCard className="w-6 h-6 text-gray-900" strokeWidth={1.5} />
            </div>
            <h3 className="font-medium text-gray-900 text-lg mb-2">Payment systems</h3>
            <p className="text-gray-600 leading-relaxed font-light">Built-in support for bank cards, wallets and payment apps, private cards or tokens</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-[#ffef5c] rounded-xl flex items-center justify-center mb-5">
              <Pointer className="w-6 h-6 text-gray-900" strokeWidth={1.5} />
            </div>
            <h3 className="font-medium text-gray-900 text-lg mb-2">User interface</h3>
            <p className="text-gray-600 leading-relaxed font-light">Interactive touchscreens with intuitive navigation</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-[#ffef5c] rounded-xl flex items-center justify-center mb-5">
              <Settings className="w-6 h-6 text-gray-900" strokeWidth={1.5} />
            </div>
            <h3 className="font-medium text-gray-900 text-lg mb-2">Maintenance & monitoring</h3>
            <p className="text-gray-600 leading-relaxed font-light">Real-time alerts for faults, events and urgent actions</p>
          </div>
        </div>

        <div className="flex items-center gap-8 border-t border-gray-200 pt-8">
          <a href="#" className="text-gray-900 font-medium hover:text-gray-600 transition-colors underline underline-offset-4 decoration-2">
            Learn More
          </a>
          <button className="bg-[#1a1a1a] hover:bg-black text-white px-8 py-4 rounded-xl text-base font-medium transition-colors flex items-center gap-3">
            Get in Touch
            <div className="w-6 h-6 rounded-full bg-[#ffb800] flex items-center justify-center">
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
