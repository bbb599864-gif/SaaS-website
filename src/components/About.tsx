import React from 'react';

export default function About() {
  return (
    <section id="about" className="w-full py-32 px-6 max-w-[1600px] mx-auto border-t border-gray-100">
      <div className="grid lg:grid-cols-2 gap-16 mb-24">
        <div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">About<br/>Elecctro</h2>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-2xl text-gray-800 font-medium">Powering the future of unattended services through smart, connected IoT solutions.</p>
        </div>
      </div>

      <div className="w-full h-[500px] rounded-[3rem] overflow-hidden mb-24">
        <img src="https://picsum.photos/seed/office/1600/900" alt="Office" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-24">
        <div className="bg-[#1e104a] text-white p-10 rounded-3xl">
          <h3 className="text-2xl font-bold mb-4">Practical Intelligence</h3>
          <p className="text-gray-300">We connect the physical and digital with clarity, using data wisely to make grounded, effective decisions.</p>
        </div>
        <div className="bg-[#1e104a] text-white p-10 rounded-3xl">
          <h3 className="text-2xl font-bold mb-4">Humanity at the centre</h3>
          <p className="text-gray-300">We prioritise transparency, well-being and a safe culture where people thrive and excellence follows.</p>
        </div>
        <div className="bg-[#1e104a] text-white p-10 rounded-3xl">
          <h3 className="text-2xl font-bold mb-4">Simple solutions, real impact</h3>
          <p className="text-gray-300">We create intuitive tools that cut through complexity, focusing only on what adds measurable value.</p>
        </div>
      </div>
    </section>
  );
}
