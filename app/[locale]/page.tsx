import { useTranslations } from "next-intl";
import ReusableButton from "@/components/ui/ReusableButton";
import { ArrowRight } from "lucide-react";
import { ReusableTittle } from "@/components/ui/ReusableTittle";
import ContactSection from "@/components/contact/ContactSection";
import ReusableHero from "../../components/shared/ReusableHero";
import HomeHeroContent from "../../components/static/HomeHeroContent";

const Page = () => {
  return (
    <main className="flex-1">
      <ReusableHero>
        <HomeHeroContent />
      </ReusableHero>

      <ReusableTittle
        firstTittle="misson"
        secondTittle="We’ve managed over 2.5 million candidates"
        text="Our mission is to connect talented professionals with companies that value their skills and potential. We believe in building meaningful career relationships that benefit both employers and candidates. With years of experience in recruitment, we pride ourselves on finding the perfect match for every role."
      />

      <ReusableButton
        text="Submit"
        icon={<ArrowRight className="text-black ml-8 text-4xl" />}
      />

      <ContactSection />
    </main>
  );
};

export default Page;
