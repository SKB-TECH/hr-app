import CEOMessage from "@/components/CEOMessage";
import ReusableHero from "../../../../components/shared/ReusableHero";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen ">
      <ReusableHero>
        <h2 className="font-bold text-4xl leading-tight sm:text-7xl md:text-8xl lg:text-[100px] text-white wrap-break-word">
          ABOUT
        </h2>
      </ReusableHero>
      <div className=" px-6 py-16 md:px-12 max-w-7xl mx-auto">
        {/* this heading does not match with figma */}
        {/* <h2 className="text-4xl font-black text-center">About Us</h2> */}
        <CEOMessage />
      </div>
    </div>
  );
};

export default AboutUsPage;
