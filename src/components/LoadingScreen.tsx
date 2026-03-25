import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <div className="flex gap-8 mb-12">
        <div className="w-16 h-20 bg-[#ffef5c] rounded-md shadow-sm border border-gray-100 flex items-center justify-center">
          <div className="w-10 h-10 bg-white rounded-sm"></div>
        </div>
        <div className="w-20 h-16 bg-[#ffef5c] rounded-md shadow-sm border border-gray-100 mt-4 flex items-center justify-center">
          <div className="w-14 h-10 bg-white rounded-sm"></div>
        </div>
        <div className="w-16 h-20 bg-[#ffef5c] rounded-md shadow-sm border border-gray-100 flex items-center justify-center">
          <div className="w-10 h-10 bg-white rounded-sm"></div>
        </div>
      </div>
      <h2 className="text-2xl font-bold tracking-tight mb-2 uppercase">Machines Delivered</h2>
      <h2 className="text-2xl font-bold tracking-tight mb-8 uppercase">And Installed</h2>
      <div className="text-sm font-medium">Loading...</div>
    </div>
  );
}
