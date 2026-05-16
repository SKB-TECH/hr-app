import { useTranslations } from "next-intl";
import ReusableButton from "@/components/ui/ReusableButton";
import { ArrowRight } from "lucide-react";
import { ReusableTittle } from "@/components/ui/ReusableTittle";
import ContactSection from "@/components/contact/ContactSection";
import ReusableHero from "../../components/shared/ReusableHero";
import HomeHeroContent from "../../components/static/HomeHeroContent";
import MissionSection from "../../components/contact/MissionSection";

const Page = () => {
  return (
    <main className="flex-1">
      <ReusableHero>
        <HomeHeroContent />
      </ReusableHero>

      <MissionSection />
      <ContactSection />
    </main>
  );
};

export default Page;
