import SectionComponent from "@/components/common/section/Section";
import HeroSectionComponent from "@/components/common/HeroSection/HeroSectionComponent";
import FeaturedJobsSection from "@/components/platform/landing/hero/FeaturedJobsSection";
import LatestJobsOpenSection from "@/components/platform/landing/hero/LatestJobsOpenSection";
import CompagniesSection from "@/components/platform/landing/hero/CompagniesSection";
import ExecutiveAboutSection from "@/components/platform/landing/about/ExecutiveAboutSection";
import ExecutiveVisionSection from "@/components/platform/landing/vision/ExecutiveVisionSection";
import ExecutiveMilestonesSection from "@/components/platform/landing/milestones/ExecutiveMilestonesSection";
import ExecutiveStatsSection from "@/components/platform/landing/stats/ExecutiveStatsSection";
import PostJobsCta from "@/components/platform/companies/PostJobsCta";

const HomePage = () => {
  return (
    <div className="w-full bg-[#F8F8FD]">
      {/* 1. Hero Section: Photographic Header with Integrated Executive Search */}
      <HeroSectionComponent />

      {/* 2. Partners Bar: Clean White Marquee Band with 50% Opacity */}
      <CompagniesSection />

      {/* 3. About Section: Exuta 2-Column Collage & Experience Card */}
      <ExecutiveAboutSection />

      {/* 4. Core Categories / Capabilities */}
      <SectionComponent />

      {/* 5. Vision Section: Strategic Capabilities & Editorial Layout */}
      <ExecutiveVisionSection />

      {/* 6. Featured Opportunities Showcase */}
      <FeaturedJobsSection />

      {/* 7. Milestones & Story: 2x2 Metric Grid */}
      <ExecutiveMilestonesSection />

      {/* 8. Impact & Statistics Panel: Gold Metrics on Deep Corporate Navy */}
      <ExecutiveStatsSection />

      {/* 9. Latest Job Openings */}
      <LatestJobsOpenSection />

      {/* 10. Final Call to Action */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 w-full max-w-7xl mx-auto">
        <PostJobsCta />
      </div>
    </div>
  );
};

export default HomePage;
