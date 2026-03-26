import React from 'react';
import { ArrowRight, Box, Coffee, Car, WashingMachine, Camera, Monitor, Zap, Droplets, ShoppingCart, Cigarette, Gamepad2, Candy } from 'lucide-react';

const services = [
  { title: 'Snacks', desc: 'Boost sales, improve efficiency and cut costs with fast payments, smart data and remote control.', icon: ShoppingCart },
  { title: 'Smart Fridge', desc: 'Control access, ensure food safety and boost sales with secure payments and full remote management.', icon: Box },
  { title: 'OCS', desc: 'Smart coffee points with flexible payments, remote control, detailed insights and compact hardware.', icon: Coffee },
  { title: 'Photobooth', desc: 'Capture more smiles and revenue with seamless cashless payments and remote monitoring.', icon: Camera },
  { title: 'Laundromat', desc: 'Offer easy payments, run sites remotely and reduce costs with secure, connected laundry solutions.', icon: WashingMachine },
  { title: 'Kiosk', desc: 'Cashless, secure and smart solutions to optimise self-checkout kiosks and micro markets anywhere.', icon: Monitor },
  { title: 'Kiddie Ride', desc: 'Drive more sales with simple, contactless payments for ride operators of any size or location.', icon: Gamepad2 },
  { title: 'EV Charger', desc: 'Easy payments, remote control, seamless integrations and rugged hardware for any weather.', icon: Zap },
  { title: 'Cigarettes', desc: 'Enable age-verified, secure and cashless sales for tobacco vending with real-time data and control.', icon: Cigarette },
  { title: 'Coffee', desc: 'Upgrade coffee machines with fast payments, telemetry and loyalty programs to boost sales.', icon: Coffee },
  { title: 'Car Wash', desc: 'Drive more visits and revenue with smart, secure and seamless payment solutions for car washes.', icon: Car },
  { title: 'Candy', desc: 'Cashless, secure and smart payment solutions for candy dispensers in any location.', icon: Candy },
  { title: 'Parkomat', desc: 'Enable fast cashless access, real-time control and smooth integration with any parking setup.', icon: Car },
  { title: 'Water', desc: 'Cashless, secure and remotely managed solutions for profitable water and ice vending.', icon: Droplets },
];

export default function Services() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-[1600px] mx-auto bg-white">
      {/* Header */}
      <div className="flex flex-col lg:flex-row gap-16 mb-32">
        <div className="flex-1">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-medium text-gray-900 tracking-tight leading-[1.1]">
            Explore our services<br/>and use cases
          </h1>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-2xl text-gray-900 font-medium mb-6 leading-relaxed">
            Boost sales, reduce costs and improve operational efficiency with remote access to real-time data.
          </p>
          <p className="text-lg text-gray-500 leading-relaxed">
            Elecctro enables smart payments, telemetry and operational efficiency.
          </p>
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-32">
        {services.map((service, index) => {
          const isEven = index % 2 === 0;
          return (
            <div key={index} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}>
              {/* Image Placeholder */}
              <div className="flex-1 w-full flex justify-center items-center">
                <div className="w-72 h-[28rem] bg-white rounded-3xl border border-gray-100 flex flex-col items-center shadow-2xl relative overflow-hidden group p-4">
                   <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 opacity-50 pointer-events-none"></div>
                   
                   {/* Image Container */}
                   <div className="w-full flex-1 relative z-20 rounded-2xl overflow-hidden mb-6 bg-gray-100 shadow-inner">
                     <img 
                       src={`https://picsum.photos/seed/${service.title.replace(/\s+/g, '')}/600/800`} 
                       alt={service.title} 
                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                       referrerPolicy="no-referrer"
                     />
                   </div>

                   {/* Icon & Bar */}
                   <div className="relative z-20 w-full flex items-center justify-between px-4 pb-2">
                     <div className="w-1/2 h-2 bg-gray-200 rounded-full"></div>
                     <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-50">
                       <service.icon className="w-6 h-6 text-gray-400" strokeWidth={1.5} />
                     </div>
                   </div>
                </div>
              </div>

              {/* Content Card */}
              <div className="flex-1 w-full">
                <div className="bg-[#1e104a] text-white rounded-[2rem] p-12 sm:p-16 shadow-2xl">
                  <h2 className="text-5xl sm:text-6xl font-medium mb-16 tracking-tight">{service.title}</h2>
                  
                  <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 mb-12">
                    <div className="flex flex-col gap-1 w-32 shrink-0">
                      <span className="text-purple-300 font-medium text-sm tracking-wider uppercase">Type</span>
                      <span className="font-bold text-lg">Devices</span>
                    </div>
                    <p className="text-lg text-purple-100 leading-relaxed flex-1 font-light">
                      {service.desc}
                    </p>
                  </div>

                  <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-3 text-sm border border-white/20">
                    <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 text-[#1e104a]" />
                    </div>
                    Explore Service
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
