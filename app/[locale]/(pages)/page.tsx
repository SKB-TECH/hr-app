
import HeroSection from "@/components/landing/hero/HeroSection";
import SectionComponent from "@/components/common/section/Section";

const HomePage = () => {
    return (
        <>
            <HeroSection />
            {/*  Companies we helped grow  */}
            <SectionComponent
                title="Explore by"
                highlight="category"
                isExpanded={true}
                showAllText="Show all jobs"
                showAllLink="/jobs"
            />
        </>
    );
};

export default HomePage;
