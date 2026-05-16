import React from 'react'
import Hero from "@/components/shared/Hero";
import { Misson } from "@/components/misson";
import JobSection from '../ui/JobSection';
import ContactSection from '../contact/ContactSection';

const HomePage = () => {
  return (
    <div className=''>
      <Hero />
          <Misson />
          <JobSection />
          <ContactSection />
    </div>
  );
}

export default HomePage