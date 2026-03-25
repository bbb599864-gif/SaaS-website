import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Services() {
  return (
    <section id="services" className="w-full py-32 px-6 max-w-[1600px] mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 mb-24">
        <div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8">Explore our services<br/>and use cases</h2>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-2xl text-gray-800 font-medium mb-6">Boost sales, reduce costs and improve operational efficiency with remote access to real-time data.</p>
          <p className="text-lg text-gray-500">Elecctro enables smart payments, telemetry and operational efficiency.</p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: 'Smart Fridge', desc: 'Secure, unattended retail with smart access and payments.' },
          { title: 'Coffee', desc: 'Telemetry and cashless payments for coffee machines.' },
          { title: 'EV Charger', desc: 'Seamless payment integration for EV charging stations.' },
          { title: 'Laundromat', desc: 'Remote control and payments for laundry equipment.' },
          { title: 'Car Wash', desc: 'Drive more revenue with smart payment solutions.' },
          { title: 'Kiosk', desc: 'Self-service kiosks with integrated payment systems.' }
        ].map((service, i) => (
          <div key={i} className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-full h-48 bg-gray-200 rounded-2xl mb-8 flex items-center justify-center overflow-hidden">
              <img src={`https://picsum.photos/seed/${service.title}/600/400`} alt={service.title} className="w-full h-full object-cover opacity-80 mix-blend-multiply" referrerPolicy="no-referrer" />
            </div>
            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
            <p className="text-gray-600 mb-8">{service.desc}</p>
            <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:text-[#ff6b00] transition-colors">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <ArrowRight className="w-4 h-4" />
              </div>
              Explore Service
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
