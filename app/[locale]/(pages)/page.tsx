import SectionComponent from "@/components/common/section/Section";
import HeroSectionComponent from "@/components/common/HeroSection/HeroSectionComponent";
import FeaturedJobsSection from "@/components/landing/hero/FeaturedJobsSection";
import LatestJobsOpenSection from "@/components/landing/hero/LatestJobsOpenSection";
import CompagniesSection from "@/components/landing/hero/CompagniesSection";

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
