import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-8 px-6 border-t border-gray-100 bg-white">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500 font-medium">
        <div>© 2026 Elecctro Solutions, Lda</div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-black transition-colors">Terms & Conditions</a>
          <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
        </div>
        <div>All rights reserved</div>
      </div>
    </footer>
  );
}
