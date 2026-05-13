import React from "react";
import Hero from "@/components/shared/Hero";
import ContactSection from "@/components/contact/ContactSection";

const Page = () => {
  return (
    <main className="flex-1">
      <Hero />
      <ContactSection />
    </main>
  );
};

export default Page;
