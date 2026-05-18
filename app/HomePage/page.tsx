import React from "react";
import Hero from "@/components/shared/Hero";
import { Misson } from "@/components/misson";
import JobSection from "../../components/ui/JobSection";
import ContactSection from "../../components/contact/ContactSection";
import ServiceSection from "../../components/ui/serviceSection";

const HomePage = () => {
  return (
    <div className="">
      <Hero />
      <Misson />
      <ServiceSection />
      <JobSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
