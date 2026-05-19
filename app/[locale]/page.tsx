import ContactSection from "@/components/contact/ContactSection";
import ReusableHero from "../../components/shared/ReusableHero";
import HomeHeroContent from "../../components/static/HomeHeroContent";
import MissionSection from "@/components/contact/MissionSection";
import ServiceSection from "@/components/ui/serviceSection";
import JobSection from "@/components/ui/JobSection";

const Page = () => {
  return (
    <main className="flex-1">
      <ReusableHero>
        <HomeHeroContent />
      </ReusableHero>

      <MissionSection />
      <ServiceSection />
      <JobSection />
      <ContactSection />
    </main>
  );
};

export default Page;
