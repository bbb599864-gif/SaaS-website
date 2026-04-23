import * as React from "react";
import { motion } from "motion/react";
import { Package, Droplets, Coffee, Zap, Car, Camera, ArrowRight } from "lucide-react";
import MiniMachine from "../MiniMachine";

export function ServiceCards() {
  const services = [
    {
      title: "Smart Fridge",
      category: "Automated Retail",
      description: "Control access, ensure food safety, and boost sales with secure payments via smart fridges.",
      image: "https://images.unsplash.com/photo-1584263347416-85a696b4eda7?auto=format&fit=crop&q=80&w=1200",
      icon: Package,
    },
    {
      title: "Laundromat",
      category: "Self-Service",
      description: "Offer easy payments, run sites remotely, and reduce costs with secure, connected laundromats.",
      image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&q=80&w=1200",
      icon: Droplets,
    },
    {
      title: "Smart Coffee",
      category: "Kiosks",
      description: "Smart coffee points with flexible payments, remote control, and detailed insights.",
      image: "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&q=80&w=1200",
      icon: Coffee,
    },
    {
      title: "EV Charger",
      category: "Infrastructure",
      description: "Easy payments, remote control, and seamless integrations in rugged hardware for any weather.",
      image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=1200",
      icon: Zap,
    },
    {
      title: "Car Wash",
      category: "Automotive",
      description: "Drive more visits and revenue with smart, secure payment solutions for car washes.",
      image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=1200",
      icon: Car,
    },
    {
      title: "Photobooth",
      category: "Entertainment",
      description: "Boost sales and cut costs with secure, cashless payments for photobooths in any location.",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1200",
      icon: Camera,
    },
  ];

  return (
    <div className="w-full bg-transparent min-h-screen py-12 overflow-x-hidden">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-32 flex justify-end">
        <div className="max-w-2xl text-right">
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1] transition-all duration-500 hover:blur-[4px] cursor-default"
          >
            Explore our services<br />and use cases
          </motion.h1>
          <p className="text-lg md:text-xl text-slate-500 mt-8 ml-auto max-w-md font-medium">
            Boost sales, reduce costs and improve operational efficiency with remote access to real-time data.
          </p>
        </div>
      </div>

      {/* Staggered Cards Section */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 justify-items-center items-start">
        {services.map((service, index) => {
          // Determine if the card should be on the left or the right
          const isEven = index % 2 === 0;
          
          let marginClass = '';
          if (index === 1) marginClass = 'md:mt-32 lg:mt-48';
          else if (index > 1 && isEven) marginClass = 'md:-mt-32 lg:-mt-48';

          return (
            <motion.div
              key={index}
              // Animate from -100px (left) or 100px (right)
              initial={{ opacity: 0, x: isEven ? -100 : 100 }}
              // Animate to 0 when in view
              whileInView={{ opacity: 1, x: 0 }}
              // once: false ensures it animates out when scrolling up, margin triggers it slightly early
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              className={`group w-full h-[500px] md:h-[700px] lg:h-[800px] [perspective:2000px] cursor-pointer ${marginClass}`}
            >
              <div className="relative w-full h-full transition-transform duration-[800ms] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-xl hover:shadow-2xl rounded-[2.5rem]">
                
                {/* Front Side */}
                <div className="absolute w-full h-full [backface-visibility:hidden] bg-[#f8f9fa] rounded-[2.5rem] overflow-hidden border border-slate-200 flex flex-col p-8 md:p-12">
                  <div className="w-full text-left">
                    <p className="text-slate-400 font-semibold uppercase tracking-wider text-sm md:text-base mb-2">Name</p>
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight">{service.title}</h3>
                  </div>
                  
                  <div className="flex-1 flex items-center justify-center w-full relative -mt-8">
                    <div className="w-full h-full max-h-[400px] md:max-h-[500px] lg:max-h-[600px] transition-transform duration-[1.5s] ease-out group-hover:scale-105">
                       <MiniMachine name={service.title} />
                    </div>
                  </div>
                </div>

                {/* Back Side (Explanation Details) */}
                <div className="absolute w-full h-full [backface-visibility:hidden] rounded-[2.5rem] bg-[#1a1429] text-white [transform:rotateY(180deg)] p-8 md:p-12 flex flex-col shadow-inner overflow-hidden border border-slate-800 text-inherit">
                  <h3 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-[#e6dfff] mb-auto text-left">
                    {service.title}
                  </h3>
                  
                  <div className="mt-auto flex flex-col">
                    <div className="h-px w-full bg-white/10 mb-8" />
                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 w-full text-left">
                      <div className="flex flex-col w-full md:w-1/3">
                        <span className="text-[#a8a1c9] text-lg font-medium mb-1">Type</span>
                        <span className="text-[#e6dfff] text-xl font-bold">Devices</span>
                      </div>
                      <div className="flex flex-col w-full md:w-2/3">
                        <p className="text-[#a8a1c9] text-lg md:text-xl leading-relaxed mb-10">
                          {service.description}
                        </p>
                        <div>
                          <button className="flex items-center gap-3 bg-white text-slate-900 pr-5 pl-2 py-2 rounded-xl font-semibold transition-transform shadow-md hover:shadow-lg hover:scale-105 active:scale-95 text-sm md:text-base w-fit">
                            <div className="bg-[#1a1429] text-white rounded-lg p-1.5 flex items-center justify-center">
                              <ArrowRight className="w-4 h-4 -rotate-45" strokeWidth={3} />
                            </div>
                            Explore Service
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
