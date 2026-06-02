import SectionComponent from "@/components/common/section/Section";
import HeroSectionComponent from "@/components/common/HeroSection/HeroSectionComponent";
import CompaniesSection from "@/components/landing/CompagniesSection";
import FeaturedJobsSection from "@/components/landing/FeatureJobsSection";
import LatestJobsSection from "@/components/landing/LatestJobSection";
const HomePage = () => {
    return (
        <>
            <HeroSectionComponent/>
            <CompaniesSection/>
            <SectionComponent
                title="Explore by"
                highlight="category"
                isExpanded={true}
                showAllText="Show all jobs"
                showAllLink="/jobs"
            />
            <FeaturedJobsSection/>
            <LatestJobsSection/>
        </>
    );
};

export default HomePage;
