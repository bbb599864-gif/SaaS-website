import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import TransitionOverlay from './components/TransitionOverlay';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import CarWashPage from './components/CarWashPage';
import ContactFooter from './components/ContactFooter';
import LoginFlow from './components/LoginFlow';
import Dashboard from './components/Dashboard';
import AnalyticsDemo from './components/AnalyticsDemo';

function App() {
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'car-wash' | 'services' | 'projects' | 'about' | 'careers' | 'contacts' | 'login' | 'dashboard' | 'analytics'>('home');

  const handleLoadingComplete = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setLoading(false);
      setIsTransitioning(false);
    }, 1000);
  };

  const navigateTo = (page: string) => {
    if (isTransitioning) return;
    
    // Map string to valid page type, default to home if not found
    let targetPage: 'home' | 'car-wash' | 'services' | 'projects' | 'about' | 'careers' | 'contacts' | 'login' | 'dashboard' | 'analytics' = 'home';
    if (page === 'car-wash') targetPage = 'car-wash';
    if (page === 'services') targetPage = 'services';
    if (page === 'projects') targetPage = 'projects';
    if (page === 'about') targetPage = 'about';
    if (page === 'careers') targetPage = 'careers';
    if (page === 'contacts') targetPage = 'contacts';
    if (page === 'login') targetPage = 'login';
    if (page === 'dashboard') targetPage = 'dashboard';
    if (page === 'analytics') targetPage = 'analytics';
    if (page === 'home') targetPage = 'home';

    if (currentPage === targetPage) return;

    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentPage(targetPage);
      window.scrollTo(0, 0);
      setIsTransitioning(false);
    }, 1000);
  };

  const handleMachineClick = (machineName: string) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    setTimeout(() => {
      if (machineName === 'CAR WASH') {
        setCurrentPage('car-wash');
      } else {
        setCurrentPage('services');
      }
      window.scrollTo(0, 0);
      setIsTransitioning(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col">
      <TransitionOverlay isTransitioning={isTransitioning} />
      {loading ? (
        <LoadingScreen onComplete={handleLoadingComplete} />
      ) : (
        <>
          {!['login', 'dashboard'].includes(currentPage) && <Navbar onNavigate={navigateTo} />}
          <main className="flex-1">
            {currentPage === 'home' && (
              <div className="h-screen overflow-hidden">
                <Hero onMachineClick={handleMachineClick} />
              </div>
            )}
            {currentPage === 'services' && (
              <div className="bg-white min-h-screen">
                <Services />
                <ContactFooter />
              </div>
            )}
            {currentPage === 'car-wash' && (
              <CarWashPage />
            )}
            {currentPage === 'login' && (
              <LoginFlow onComplete={() => navigateTo('dashboard')} />
            )}
            {currentPage === 'dashboard' && (
              <Dashboard onLogout={() => navigateTo('home')} />
            )}
            {currentPage === 'analytics' && (
              <AnalyticsDemo />
            )}
            {['projects', 'about', 'careers', 'contacts'].includes(currentPage) && (
              <div className="min-h-screen bg-white pt-32 px-6 flex flex-col items-center justify-center">
                <h1 className="text-5xl font-bold capitalize mb-4">{currentPage.replace('-', ' ')}</h1>
                <p className="text-gray-500">This page is under construction.</p>
              </div>
            )}
          </main>
        </>
      )}
    </div>
  );
}

export default App;

