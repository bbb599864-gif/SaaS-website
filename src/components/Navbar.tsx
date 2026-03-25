import React, { useState } from 'react';
import { Globe, ArrowRight, ChevronDown, ShoppingCart, Coffee, Gamepad2, Cigarette, Car, Box, WashingMachine, Zap, Droplets, Camera, Monitor, Candy, Grid } from 'lucide-react';

const dropdownServices = [
  { name: 'Snacks', icon: ShoppingCart },
  { name: 'OCS', icon: Coffee },
  { name: 'Kiddie Ride', icon: Gamepad2 },
  { name: 'Cigarettes', icon: Cigarette },
  { name: 'Parkomat', icon: Car },
  { name: 'Smart Fridge', icon: Box },
  { name: 'Laundromat', icon: WashingMachine },
  { name: 'EV Charger', icon: Zap },
  { name: 'Car Wash', icon: Car },
  { name: 'Water', icon: Droplets },
  { name: 'Photobooth', icon: Camera },
  { name: 'Kiosk', icon: Monitor },
  { name: 'Coffee', icon: Coffee },
  { name: 'Candy', icon: Candy },
  { name: 'All Services', icon: Grid, isAll: true },
];

export default function Navbar({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
          <span className="text-2xl font-black tracking-tighter text-gray-800 flex items-center">
            elecc
            <span className="relative inline-flex items-center justify-center">
              <span className="absolute w-5 h-5 bg-[#ffb800] rounded-full -z-10"></span>
              t
            </span>
            ro
          </span>
        </div>

        {/* Links */}
        <div className="hidden lg:flex items-center gap-10 text-[15px] font-medium text-gray-700 h-full">
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button 
              onClick={() => onNavigate('services')} 
              className="flex items-center gap-1 hover:text-black transition-colors h-full"
            >
              Services <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isServicesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] bg-white shadow-2xl border border-gray-100 rounded-b-3xl p-8 grid grid-cols-3 gap-x-8 gap-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                {dropdownServices.map((service, i) => (
                  <button 
                    key={i}
                    onClick={() => onNavigate(service.name === 'Car Wash' ? 'car-wash' : 'services')}
                    className={`flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left ${service.isAll ? 'col-start-3 justify-end' : ''}`}
                  >
                    <div className="w-12 h-12 bg-[#fff8e6] rounded-xl flex items-center justify-center shrink-0">
                      <service.icon className="w-6 h-6 text-[#ffb800]" strokeWidth={1.5} />
                    </div>
                    <span className="font-medium text-gray-900 text-base">{service.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => onNavigate('projects')} className="hover:text-black transition-colors">Projects</button>
          <button onClick={() => onNavigate('about')} className="hover:text-black transition-colors">About us</button>
          <button onClick={() => onNavigate('careers')} className="hover:text-black transition-colors">Careers</button>
          <button onClick={() => onNavigate('contacts')} className="hover:text-black transition-colors">Contacts</button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:flex items-center gap-2 bg-[#f0f0f9] hover:bg-[#e4e4f0] text-[#1a1a1a] px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors">
            <Globe className="w-4 h-4" /> EN
          </button>
          <button onClick={() => onNavigate('contacts')} className="bg-[#1a1a1a] hover:bg-black text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#ffb800] flex items-center justify-center">
              <ArrowRight className="w-3 h-3 text-black" />
            </div>
            Get in Touch
          </button>
        </div>
      </div>
    </nav>
  );
}
