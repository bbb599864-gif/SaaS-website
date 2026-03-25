import React from 'react';

export default function StatsSection() {
  return (
    <section className="py-32 px-6 max-w-[1600px] mx-auto bg-white">
      <div className="flex flex-col lg:flex-row gap-24 items-center">
        <div className="flex-1 max-w-2xl">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-12">
            Optimise your car wash business and boost profitability with Electro
          </h2>
          <div className="w-24 h-2 bg-[#ffb800] rounded-full"></div>
        </div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-20 w-full">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gray-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
            <div className="text-sm font-bold text-gray-400 mb-4 tracking-widest uppercase">Operational costs</div>
            <div className="text-7xl sm:text-8xl font-black text-gray-900 mb-4 tracking-tighter flex items-baseline">
              -18<span className="text-4xl sm:text-5xl text-gray-300 ml-2">%</span>
            </div>
            <p className="text-lg text-gray-600 font-medium leading-relaxed">Savings on utilities and staffing</p>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-gray-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
            <div className="text-sm font-bold text-gray-400 mb-4 tracking-widest uppercase">Machine uptime</div>
            <div className="text-7xl sm:text-8xl font-black text-gray-900 mb-4 tracking-tighter flex items-baseline">
              99<span className="text-4xl sm:text-5xl text-gray-300 ml-2">%</span>
            </div>
            <p className="text-lg text-gray-600 font-medium leading-relaxed">Less downtime with platform alerts</p>
          </div>
          <div className="sm:col-span-2 bg-[#1a1a1a] text-white p-12 sm:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ffb800]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="text-sm font-bold text-gray-400 mb-6 tracking-widest uppercase">Payment efficiency</div>
              <div className="text-8xl sm:text-9xl font-black mb-6 tracking-tighter flex items-baseline text-white">
                25<span className="text-5xl sm:text-6xl text-gray-500 ml-4">%</span>
              </div>
              <p className="text-xl text-gray-300 font-medium max-w-md leading-relaxed">More transactions through cashless systems</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
