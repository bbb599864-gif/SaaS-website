import React from 'react';

export default function StatsSection() {
  return (
    <section className="py-32 px-6 max-w-[1600px] mx-auto bg-white">
      <div className="flex flex-col lg:flex-row gap-24 items-center">
        <div className="flex-1 max-w-2xl">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-gray-900 tracking-tight leading-[1.1] mb-8">
            Join the growing network of car wash operators who trust Elecctro to power their business.
          </h2>
        </div>
        <div className="flex-1 flex flex-col sm:flex-row gap-16 w-full">
          <div className="flex-1">
            <div className="text-7xl sm:text-8xl lg:text-9xl font-medium text-gray-900 mb-4 tracking-tighter">
              1500<span className="text-[#ffb800]">+</span>
            </div>
            <p className="text-xl text-gray-600 font-light">Terminals installed</p>
          </div>
          <div className="flex-1">
            <div className="text-7xl sm:text-8xl lg:text-9xl font-medium text-gray-900 mb-4 tracking-tighter">
              200k<span className="text-[#ffb800]">+</span>
            </div>
            <p className="text-xl text-gray-600 font-light">Transactions per day</p>
          </div>
        </div>
      </div>
    </section>
  );
}
