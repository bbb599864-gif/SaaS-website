import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Monitor, CreditCard, Smartphone, TrendingUp, Laptop, Banknote } from 'lucide-react';

const phases = [
  {
    text: "CUSTOM SOFTWARE\nPROVIDED",
    percent: "19%",
    icons: null
  },
  {
    text: "MACHINES DELIVERED\nAND INSTALLED",
    percent: "58%",
    icons: [
      <Smartphone key="1" className="w-12 h-12 text-[#ffb800]" strokeWidth={1.5} />,
      <Monitor key="2" className="w-12 h-12 text-[#ffb800]" strokeWidth={1.5} />,
      <CreditCard key="3" className="w-12 h-12 text-[#ffb800]" strokeWidth={1.5} />
    ]
  },
  {
    text: "OUR FOCUS\nIS ON YOUR SIDE",
    percent: "95%",
    icons: [
      <TrendingUp key="1" className="w-12 h-12 text-[#ffb800]" strokeWidth={1.5} />,
      <Laptop key="2" className="w-12 h-12 text-[#ffb800]" strokeWidth={1.5} />,
      <Banknote key="3" className="w-12 h-12 text-[#ffb800]" strokeWidth={1.5} />
    ]
  }
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase(1), 1500);
    const timer2 = setTimeout(() => setPhase(2), 3000);
    const timer3 = setTimeout(() => onComplete(), 4500);
    return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center text-center"
        >
          <div className="h-24 flex items-center justify-center gap-8 mb-8">
            {phases[phase].icons && phases[phase].icons?.map((icon, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1, type: 'spring' }}
              >
                {icon}
              </motion.div>
            ))}
          </div>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight whitespace-pre-line mb-6">
            {phases[phase].text}
          </h2>
          <div className="text-sm font-medium text-gray-500">
            {phases[phase].percent}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
