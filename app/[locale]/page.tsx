
import HeroSection from "@/components/landing/hero/HeroSection";
import SectionComponent from "@/components/common/section/Section";

const Page = () => {
  return (
      <>
        <HeroSection />
        {/*  Companies we helped grow  */}
          <SectionComponent title="Explore by" highlight="category" showAllLink="#jobs"/>
      </>
  );
};

export default Page;
