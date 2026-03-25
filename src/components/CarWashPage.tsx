import React, { useEffect } from 'react';
import CarWashHero from './CarWashHero';
import CashlessTech from './CashlessTech';
import FeaturesList from './FeaturesList';
import BuiltForTheElements from './BuiltForTheElements';
import TrustedBy from './TrustedBy';
import StatsSection from './StatsSection';
import ContactFooter from './ContactFooter';

export default function CarWashPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <CarWashHero />
      <CashlessTech />
      <FeaturesList />
      <TrustedBy />
      <BuiltForTheElements />
      <StatsSection />
      <ContactFooter />
    </div>
  );
}
