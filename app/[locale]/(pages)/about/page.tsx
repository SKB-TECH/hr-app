import CEOMessage from "@/app/[locale]/(pages)/about/components/CEOMessage";
import ReusableHero from "../../../../components/shared/ReusableHero";
import ContactSection from "@/components/contact/ContactSection";
import OurTeam from "./components/OurTeam";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen ">
      <ReusableHero>
        <h2 className="font-bold text-4xl leading-tight sm:text-5xl md:text-6xl  text-white wrap-break-word">
          ABOUT
        </h2>
      </ReusableHero>
      <div className="">
        {/* leon: deleted about us page title, which was not needed*/}
        <CEOMessage />
        <OurTeam />
        <ContactSection />
      </div>
    </div>
  );
};

export default AboutUsPage;
