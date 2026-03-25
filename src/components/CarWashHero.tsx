import React from 'react';
import { Droplets, CreditCard, MonitorSmartphone, Wrench } from 'lucide-react';

export default function CarWashHero() {
  return (
    <section className="pt-32 pb-24 px-6 max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center gap-16">
      {/* Left: 3D Model Placeholder */}
      <div className="flex-1 w-full bg-[#f4f5f7] rounded-[2rem] min-h-[500px] flex items-center justify-center relative overflow-hidden border border-gray-100">
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-80 h-80 relative transform hover:scale-105 transition-transform duration-700">
               {/* Base */}
               <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 h-8 bg-gray-200 rounded-lg transform -skew-x-12"></div>
               {/* Pillars */}
               <div className="absolute left-8 bottom-14 w-16 h-48 bg-gradient-to-b from-gray-100 to-gray-300 border-x-4 border-t-4 border-[#ffb800] rounded-t-xl shadow-lg z-10">
                 <div className="w-full h-8 bg-[#1a1a1a] mt-8"></div>
                 <div className="w-full h-8 bg-[#1a1a1a] mt-8"></div>
               </div>
               <div className="absolute right-8 bottom-14 w-16 h-48 bg-gradient-to-b from-gray-100 to-gray-300 border-x-4 border-t-4 border-[#ffb800] rounded-t-xl shadow-lg z-10">
                 <div className="w-full h-8 bg-[#1a1a1a] mt-8"></div>
                 <div className="w-full h-8 bg-[#1a1a1a] mt-8"></div>
               </div>
               {/* Top Bar */}
               <div className="absolute top-10 left-4 right-4 h-20 bg-white shadow-xl rounded-xl border-b-4 border-gray-200 flex items-center justify-center z-20">
                  <span className="text-[#ffb800] font-black text-2xl tracking-widest drop-shadow-sm">Car Wash</span>
               </div>
               {/* Brushes */}
               <div className="absolute top-36 left-1/2 -translate-x-1/2 w-48 h-12 bg-blue-500/20 rounded-full blur-md"></div>
            </div>
         </div>
      </div>

      {/* Right: Content */}
      <div className="flex-1">
        <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6 tracking-tight">Car Wash</h2>
        <p className="text-lg text-gray-600 mb-12 leading-relaxed max-w-2xl">
          Streamline car wash operations with a weather-proof payment terminal that accepts cards, wallets and apps, plus a powerful operating platform with real-time alerts and performance metrics.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 mb-12">
          <div>
            <div className="w-12 h-12 bg-[#fff8e6] rounded-xl flex items-center justify-center mb-4">
              <Droplets className="w-6 h-6 text-[#ffb800]" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">Water Resistant</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Weather-proof and water resistant for outdoor use</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-[#fff8e6] rounded-xl flex items-center justify-center mb-4">
              <CreditCard className="w-6 h-6 text-[#ffb800]" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">Payment systems</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Built-in support for bank cards, wallets and payment apps, private cards or tokens</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-[#fff8e6] rounded-xl flex items-center justify-center mb-4">
              <MonitorSmartphone className="w-6 h-6 text-[#ffb800]" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">User interface</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Interactive touchscreens with intuitive navigation</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-[#fff8e6] rounded-xl flex items-center justify-center mb-4">
              <Wrench className="w-6 h-6 text-[#ffb800]" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">Maintenance & monitoring</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Real-time alerts for faults, events and urgent actions</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button className="px-8 py-4 bg-white border-2 border-gray-200 hover:border-gray-900 text-gray-900 rounded-xl font-bold transition-colors">
            Learn More
          </button>
          <button className="px-8 py-4 bg-[#1a1a1a] hover:bg-black text-white rounded-xl font-bold transition-colors">
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
}
