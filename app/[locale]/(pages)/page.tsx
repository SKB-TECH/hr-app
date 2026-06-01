import SectionComponent from "@/components/common/section/Section";
import HeroSectionComponent from "@/components/common/HeroSection/HeroSectionComponent";
import CompaniesSection from "@/components/landing/CompagniesSection";
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
        </>
    );
};

export default HomePage;
