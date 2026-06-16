import SectionComponent from "@/components/common/section/Section";
import HeroSectionComponent from "@/components/common/HeroSection/HeroSectionComponent";
import FeaturedJobsSection from "@/components/pages/landing/hero/FeaturedJobsSection";
import LatestJobsOpenSection from "@/components/pages/landing/hero/LatestJobsOpenSection";
import CompagniesSection from "@/components/pages/landing/hero/CompagniesSection";
import { companiesPageCopy } from "@/data/companies";
import PostJobsCta from "@/components/pages/companies/PostJobsCta";
import "./companies/companies.css";

const HomePage = () => {
  return (
    <main className="w-full  ">
      <HeroSectionComponent />
      <CompagniesSection />
      <SectionComponent />
      <div className="px-4 md:px-12   w-full max-w-7xl mx-auto">
        <PostJobsCta copy={companiesPageCopy.cta} />
      </div>
      <FeaturedJobsSection />
      <LatestJobsOpenSection />
    </main>
  );
};

export default HomePage;
