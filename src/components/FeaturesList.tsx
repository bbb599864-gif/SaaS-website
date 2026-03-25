import React from 'react';

export default function FeaturesList() {
  return (
    <section className="py-24 px-6 max-w-[1600px] mx-auto bg-white">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        <div className="flex-1">
          <h2 className="text-5xl sm:text-6xl font-medium text-gray-900 mb-6 tracking-tight leading-[1.1]">
            Clean Cars,<br />Smarter Operations
          </h2>
          
          <div className="mt-16 space-y-16">
            {/* Feature 1 */}
            <div className="border-t border-gray-200 pt-8">
              <div className="text-sm font-bold text-gray-500 mb-4 tracking-wide uppercase">Contactless payments</div>
              <h3 className="text-3xl sm:text-4xl font-medium text-gray-900 mb-6 tracking-tight">Speed up service with smarter payments</h3>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-xl font-light">
                Elecctro simplifies payments with contactless technology, helping you reduce operational costs and remove the burden of managing cash on site.
              </p>
              <ul className="space-y-6">
                <li className="flex justify-between items-center border-b border-gray-100 pb-6 group cursor-pointer">
                  <span className="font-medium text-gray-900 group-hover:text-[#ffb800] transition-colors text-lg">Accept payments 24/7, unattended</span>
                  <span className="text-gray-300 font-mono text-sm">01</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-100 pb-6 group cursor-pointer">
                  <span className="font-medium text-gray-900 group-hover:text-[#ffb800] transition-colors text-lg">Eliminate coins, fraud and delays</span>
                  <span className="text-gray-300 font-mono text-sm">02</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-100 pb-6 group cursor-pointer">
                  <span className="font-medium text-gray-900 group-hover:text-[#ffb800] transition-colors text-lg">Increase convenience for your customers</span>
                  <span className="text-gray-300 font-mono text-sm">03</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-100 pb-6 group cursor-pointer">
                  <span className="font-medium text-gray-900 group-hover:text-[#ffb800] transition-colors text-lg">Reduce maintenance and collection costs</span>
                  <span className="text-gray-300 font-mono text-sm">04</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="bg-[#f4f5f7] rounded-[2rem] aspect-[4/5] overflow-hidden relative sticky top-32 flex items-center justify-center">
             {/* Placeholder for the payment terminal image */}
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
      </div>
    </section>
  );
}
