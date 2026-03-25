import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import TransitionOverlay from './components/TransitionOverlay';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import About from './components/About';
import Careers from './components/Careers';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CarWashPage from './components/CarWashPage';

function App() {
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'car-wash'>('home');

  const handleLoadingComplete = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setLoading(false);
      setIsTransitioning(false);
    }, 1000);
  };

  const scrollTo = (id: string) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    setTimeout(() => {
      if (id === 'home' || id === 'hero') {
        setCurrentPage('home');
        window.scrollTo(0, 0);
      } else {
        if (currentPage !== 'home') {
          setCurrentPage('home');
          setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'instant' });
          }, 50);
        } else {
          document.getElementById(id)?.scrollIntoView({ behavior: 'instant' });
        }
      }
      setIsTransitioning(false);
    }, 1000);
  };

  const handleMachineClick = (machineName: string) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    setTimeout(() => {
      if (machineName === 'CAR WASH') {
        setCurrentPage('car-wash');
      }
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
          <Navbar onNavigate={scrollTo} />
          <main className="flex-1">
            {currentPage === 'home' ? (
              <>
                <Hero onMachineClick={handleMachineClick} />
                <Services />
                <Projects />
                <About />
                <Careers />
                <Contact />
                <Footer />
              </>
            ) : (
              <CarWashPage />
            )}
          </main>
        </>
      )}
    </div>
  );
}

export default App;

