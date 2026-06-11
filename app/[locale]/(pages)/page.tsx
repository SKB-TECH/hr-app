import SectionComponent from "@/components/common/section/Section";
import Link from "next/link";
import HeroSectionComponent from "@/components/common/HeroSection/HeroSectionComponent";
import CompaniesCategoryHeader from "@/components/pages/landing/hero/CompaniesCategoryHeader";
import FeaturedJobsSection from "@/components/pages/landing/hero/FeaturedJobsSection";
import LatestJobsOpenSection from "@/components/pages/landing/hero/LatestJobsOpenSection";

const HomePage = () => {
  return (
    <>
      <HeroSectionComponent />
      <CompaniesCategoryHeader />
      <FeaturedJobsSection />
      <LatestJobsOpenSection />
    </>
  );
};

export default HomePage;
