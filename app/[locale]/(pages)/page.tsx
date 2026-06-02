import SectionComponent from "@/components/common/section/Section";
import Link from "next/link";
import HeroSectionComponent from "@/components/common/HeroSection/HeroSectionComponent";
import CompaniesCategoryHeader from "@/components/landing/hero/CompaniesCategoryHeader";
import FeaturedJobsSection from "@/components/landing/hero/FeaturedJobsSection";
import LatestJobsOpenSection from "@/components/landing/hero/LatestJobsOpenSection";

const HomePage = () => {
    return (
        <>
            <HeroSectionComponent/>
            <CompaniesCategoryHeader/>
            <FeaturedJobsSection/>
            <LatestJobsOpenSection/>
        </>
    );
};

export default HomePage;
