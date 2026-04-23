import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Mail, ArrowRight, CheckCircle2, ShieldCheck, Cpu, Database } from 'lucide-react';

interface LoginFlowProps {
  onComplete: () => void;
}

export default function LoginFlow({ onComplete }: LoginFlowProps) {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const quizQuestions = [
    {
      id: 1,
      title: "System Integrity Check",
      question: "Which protocol is primarily used for real-time telemetry in our automated retail network?",
      options: ["HTTP/1.1", "MQTT", "FTP", "SMTP"],
      correct: 1
    },
    {
      id: 2,
      title: "Security Protocol",
      question: "What is the mandatory encryption standard for all edge-to-cloud transactions?",
      options: ["AES-128", "AES-256", "DES", "RSA-1024"],
      correct: 1
    },
    {
      id: 3,
      title: "Operational Logic",
      question: "In the event of a local power failure, how does the Smart Fridge maintain inventory state?",
      options: ["Cloud Sync", "Non-Volatile RAM", "Manual Logging", "Battery Backup Only"],
      correct: 1
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setStep(1);
    }
  };

  const handleQuizAnswer = (index: number) => {
    if (step < quizQuestions.length) {
      setStep(step + 1);
    } else {
      setStep(step + 1);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-6xl bg-white rounded-[2.5rem] shadow-2xl shadow-black/5 overflow-hidden flex flex-col lg:flex-row min-h-187.5"
      >
        {/* Left Side: Form Content */}
        <div className="flex-1 p-8 sm:p-12 lg:p-20 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="w-full max-w-md mx-auto lg:mx-0"
              >
                {/* Logo Section */}
                <div className="flex items-center gap-3 mb-12">
                  <span className="text-2xl font-black tracking-tighter text-gray-800 flex items-center">
                    elecc
                    <span className="relative inline-flex items-center justify-center">
                      <span className="absolute w-5 h-5 bg-[#ffb800] rounded-full -z-10"></span>
                      t
                    </span>
                    ro
                  </span>
                </div>

                <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Welcome Back</h1>
                <p className="text-gray-500 mb-10 font-medium">Log in to manage your automated retail network.</p>

                {/* Social Logins */}
                <div className="space-y-3 mb-10">
                  <button className="flex items-center justify-center gap-3 w-full py-3 px-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-all font-bold text-gray-700 text-sm shadow-sm">
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                    Continue with Google
                  </button>
                  <button className="flex items-center justify-center gap-3 w-full py-3 px-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-all font-bold text-gray-700 text-sm shadow-sm">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                    Continue with Enterprise SSO
                  </button>
                </div>

                <div className="relative flex items-center justify-center mb-10">
                  <div className="grow border-t border-gray-100"></div>
                  <span className="shrink mx-4 text-gray-400 text-[10px] font-black uppercase tracking-[0.4em]">Or</span>
                  <div className="grow border-t border-gray-100"></div>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Email_Address</label>
                    <div className="relative">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#f8f9fb] border border-gray-100 rounded-lg py-3.5 pl-14 pr-4 focus:outline-none focus:ring-2 focus:ring-[#ffb800]/20 focus:border-[#ffb800] transition-all font-medium text-gray-900"
                        placeholder="operator@command.center"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Security_Key</label>
                    <div className="relative">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[#f8f9fb] border border-gray-100 rounded-lg py-3.5 pl-14 pr-4 focus:outline-none focus:ring-2 focus:ring-[#ffb800]/20 focus:border-[#ffb800] transition-all font-medium text-gray-900"
                        placeholder="••••••••••••"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-1">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#ffb800] focus:ring-[#ffb800]" />
                      <span className="text-sm font-bold text-gray-500 group-hover:text-gray-700 transition-colors">Remember me</span>
                    </label>
                    <button type="button" className="text-sm font-bold text-[#ffb800] hover:underline">Forgot Key?</button>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1a1a1a] hover:bg-black text-white font-bold py-3.5 rounded-lg transition-all flex items-center justify-center gap-3 group mt-4 shadow-xl shadow-black/10"
                  >
                    Authenticate System
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <p className="text-center text-sm font-bold text-gray-500 mt-8">
                    New operator? <button type="button" className="text-[#ffb800] hover:underline">Request Access</button>
                  </p>
                </form>
              </motion.div>
            )}

            {step >= 1 && step <= 3 && (
              <motion.div
                key={`quiz-${step}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full max-w-md mx-auto lg:mx-0"
              >
                <div className="flex items-center justify-between mb-10">
                  <span className="text-xs font-black text-[#ffb800] uppercase tracking-[0.4em]">Integrity_Check_{step}/3</span>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className={`w-12 h-1.5 rounded-full transition-all duration-700 ${i <= step ? 'bg-[#ffb800]' : 'bg-gray-100'}`} />
                    ))}
                  </div>
                </div>

                <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight italic uppercase">{quizQuestions[step-1].title}</h3>
                <p className="text-gray-500 mb-12 leading-relaxed font-medium text-lg">{quizQuestions[step-1].question}</p>

                <div className="space-y-4">
                  {quizQuestions[step-1].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuizAnswer(idx)}
                      className="w-full text-left p-6 rounded-2xl border border-gray-100 bg-[#f8f9fb] hover:border-[#ffb800] hover:bg-[#fff8e6] transition-all font-bold text-gray-700 flex items-center justify-between group shadow-sm"
                    >
                      {option}
                      <div className="w-7 h-7 rounded-full border-2 border-gray-200 group-hover:border-[#ffb800] flex items-center justify-center transition-colors">
                        <div className="w-3 h-3 rounded-full bg-[#ffb800] scale-0 group-hover:scale-100 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md mx-auto lg:mx-0 text-center lg:text-left"
              >
                <div className="w-24 h-24 bg-green-50 rounded-[2.5rem] flex items-center justify-center mb-10 mx-auto lg:mx-0 shadow-lg shadow-green-500/10">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <h2 className="text-5xl font-black text-gray-900 mb-4 tracking-tighter italic uppercase">Access_Granted</h2>
                <p className="text-gray-500 mb-12 font-medium text-lg">Identity verified. Initializing command center protocols...</p>
                
                <div className="flex justify-center lg:justify-start gap-4">
                  <div className="animate-bounce delay-0 w-4 h-4 bg-[#ffb800] rounded-full shadow-[0_0_15px_rgba(255,184,0,0.5)]" />
                  <div className="animate-bounce delay-150 w-4 h-4 bg-[#ffb800] rounded-full shadow-[0_0_15px_rgba(255,184,0,0.5)]" />
                  <div className="animate-bounce delay-300 w-4 h-4 bg-[#ffb800] rounded-full shadow-[0_0_15px_rgba(255,184,0,0.5)]" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Visual Content */}
        <div className="hidden lg:flex flex-1 p-10 relative">
          <div className="w-full h-full relative overflow-hidden rounded-[4rem] rounded-tr-[16rem] rounded-bl-[16rem] shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
              className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 hover:scale-100"
              alt="Industrial Tech"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-linear-to-br from-[#1a1a1a]/90 via-[#1a1a1a]/40 to-transparent flex flex-col justify-end p-16">
              <div className="max-w-md">
                <div className="w-16 h-2 bg-[#ffb800] mb-8 rounded-full shadow-[0_0_20px_rgba(255,184,0,0.5)]" />
                <h2 className="text-5xl font-black text-white mb-6 leading-[0.95] tracking-tighter uppercase italic">
                  The Future of <span className="text-[#ffb800]">Automated</span> Retail
                </h2>
                <p className="text-white/80 font-medium leading-relaxed text-lg">
                  Monitor thousands of edge nodes, manage revenue streams, and optimize performance with our trusted industrial SaaS platform.
                </p>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute top-10 right-10 bg-white/10 backdrop-blur-xl border border-white/20 px-8 py-4 rounded-3xl flex items-center gap-4 shadow-2xl">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
              <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">System_Status:_Stable</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

