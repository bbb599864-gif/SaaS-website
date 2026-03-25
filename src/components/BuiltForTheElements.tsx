import React from 'react';

export default function BuiltForTheElements() {
  return (
    <section className="py-24 px-6 max-w-[1600px] mx-auto bg-white">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        {/* Left: Sticky Content */}
        <div className="flex-1 lg:sticky lg:top-32">
          <div className="text-sm font-bold text-gray-500 mb-4 tracking-wide uppercase">Ready for anything</div>
          <h2 className="text-5xl sm:text-6xl font-medium text-gray-900 mb-6 tracking-tight leading-[1.1]">
            Built for the elements,<br />made for users
          </h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-xl font-light mt-12">
            With weather-resistant hardware, real-time alerts and modern touchscreens, Elecctro keeps your car wash operations smart, resilient and easy to use.
            <br /><br />
            Offer smooth payments, act fast on issues and stay in control.
          </p>
        </div>
        
        {/* Right: Scrolling List */}
        <div className="flex-1 space-y-32">
          {/* Item 1 */}
          <div className="relative">
            <div className="text-sm font-mono text-gray-400 mb-4">[ 01 - 04 ]</div>
            <h3 className="text-3xl sm:text-4xl font-medium text-gray-900 mb-8 tracking-tight leading-tight">
              Weather-proof and water resistant for outdoor use
            </h3>
            <div className="inline-block px-4 py-2 bg-[#fff8e6] text-[#ffb800] rounded-md font-medium text-sm">
              Rugged hardware
            </div>
          </div>

          {/* Item 2 */}
          <div className="relative">
            <div className="text-sm font-mono text-gray-400 mb-4">[ 02 - 04 ]</div>
            <h3 className="text-3xl sm:text-4xl font-medium text-gray-900 mb-8 tracking-tight leading-tight">
              Accept bank cards, payment apps, virtual wallets and QR codes
            </h3>
            <div className="inline-block px-4 py-2 bg-[#fff8e6] text-[#ffb800] rounded-md font-medium text-sm">
              Cashless payments
            </div>
          </div>

          {/* Item 3 */}
          <div className="relative">
            <div className="text-sm font-mono text-gray-400 mb-4">[ 03 - 04 ]</div>
            <h3 className="text-3xl sm:text-4xl font-medium text-gray-900 mb-8 tracking-tight leading-tight">
              Interactive touchscreens with intuitive navigation
            </h3>
            <div className="inline-block px-4 py-2 bg-gray-100 text-gray-600 rounded-md font-medium text-sm">
              Customer experience
            </div>
          </div>

          {/* Item 4 */}
          <div className="relative">
            <div className="text-sm font-mono text-gray-400 mb-4">[ 04 - 04 ]</div>
            <h3 className="text-3xl sm:text-4xl font-medium text-gray-900 mb-8 tracking-tight leading-tight">
              Enable contactless payments, real-time insights and full remote control for your unattended car wash stations
            </h3>
            <div className="inline-block px-4 py-2 bg-gray-100 text-gray-600 rounded-md font-medium text-sm">
              Smart operations
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
