import SectionComponent from "@/components/common/section/Section";
import HeroSectionComponent from "@/components/common/HeroSection/HeroSectionComponent";
import FeaturedJobsSection from "@/components/pages/landing/hero/FeaturedJobsSection";
import LatestJobsOpenSection from "@/components/pages/landing/hero/LatestJobsOpenSection";
import CompagniesSection from "@/components/pages/landing/hero/CompagniesSection";

const HomePage = () => {
  return (
    <>
      <HeroSectionComponent />
      <CompagniesSection />
      <SectionComponent />
      <FeaturedJobsSection />
      <LatestJobsOpenSection />
    </>
  );
};

export default HomePage;
