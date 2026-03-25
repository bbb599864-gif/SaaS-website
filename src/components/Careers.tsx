import React from 'react';

export default function Careers() {
  return (
    <section id="careers" className="w-full py-32 px-6 max-w-[1600px] mx-auto border-t border-gray-100">
      <div className="grid lg:grid-cols-2 gap-16 mb-24">
        <div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">Careers<br/>at Elecctro</h2>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-2xl text-gray-800 font-medium">Join a team where innovation meets impact.</p>
        </div>
      </div>

      <div className="bg-[#1e104a] text-white rounded-[3rem] p-12 md:p-24 grid lg:grid-cols-2 gap-16">
        <div>
          <h3 className="text-4xl font-bold mb-12">Why Join<br/>Elecctro</h3>
          <ul className="space-y-6 text-xl text-gray-300">
            <li className="flex items-center gap-4"><div className="w-2 h-2 bg-[#ffb800] rounded-full"></div> Flexible working hours</li>
            <li className="flex items-center gap-4"><div className="w-2 h-2 bg-[#ffb800] rounded-full"></div> 25 days of annual leave</li>
            <li className="flex items-center gap-4"><div className="w-2 h-2 bg-[#ffb800] rounded-full"></div> Day off on your birthday</li>
            <li className="flex items-center gap-4"><div className="w-2 h-2 bg-[#ffb800] rounded-full"></div> Private health insurance</li>
            <li className="flex items-center gap-4"><div className="w-2 h-2 bg-[#ffb800] rounded-full"></div> Training and certification budget</li>
          </ul>
        </div>
        <div>
          <h3 className="text-4xl font-bold mb-12">Our Hiring Process</h3>
          <div className="space-y-6">
            {[
              'Application review by our recruitment team',
              'Introductory chat with talent acquisition',
              'Technical interview, when applicable',
              'Challenge project, when applicable',
              'Final interview with management and offer'
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-6 bg-white/5 p-4 rounded-2xl">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center font-bold">{i+1}</div>
                <p className="font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
