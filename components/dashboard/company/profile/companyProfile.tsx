import ProfileContent from "./profileContent";
import ProfileHeroSection from "./profileHeroSection";
import TechStack from "./techStack";
import { similarJobs } from "@/data/jobDetailsData";
import CompanyProfileTeam from "./companyProfileTeam";
import BenefitSection from "./benefitSection";
import OpenPositionCard from "./openPositionCard";
import { companyProfiles } from "@/data/companyDetails";

export default function CompanyProfile() {
  const companyDetails = companyProfiles[0];
  return (
    <main className="">
      <ProfileHeroSection />
      <hr className="bg-neutral-20 " />
      <div className="lg:gap-20 px-4 md:px-8 md:w-full py-6 md:py-10">
        <div className="flex flex-col lg:flex-row gap-15">
          <div className="w-full lg:w-2/3">
            <ProfileContent />
          </div>

          <div className="w-full lg:w-1/3">
            <TechStack />
          </div>
        </div>
        <div className="w-full lg:w-2/3 gap-15">
          <CompanyProfileTeam teamMembers={companyDetails.teamMembers} />
          <div className="w-full mx-auto">
            <BenefitSection perks={companyDetails.perks} />
          </div>
          <OpenPositionCard jobs={similarJobs} />
        </div>
      </div>
    </main>
  );
}
