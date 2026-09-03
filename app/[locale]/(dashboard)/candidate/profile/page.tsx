import AboutSection from "@/components/dashboard/candidate/applicant/profile/AboutSection";
import AdditionalDetailsSection from "@/components/dashboard/candidate/applicant/profile/AdditionalDetailsSection";
import ExperiencesSection from "@/components/dashboard/candidate/applicant/profile/ExperiencesSection";
import PortfoliosSection from "@/components/dashboard/candidate/applicant/profile/PortfoliosSection";
import ProfileSection from "@/components/dashboard/candidate/applicant/profile/ProfileSection";
import SkillsSection from "@/components/dashboard/candidate/applicant/profile/SkillsSection";
import SocialLinksSection from "@/components/dashboard/candidate/applicant/profile/SocialLinksSection";
import EducationsSection from "@/components/dashboard/candidate/applicant/profile/EducationsSection";
import CertificationSection from "@/components/dashboard/candidate/applicant/profile/CertificationSection";
import ResumesSection from "@/components/dashboard/candidate/applicant/profile/ResumesSection";

export default function ProfilePage() {
  return (
    <main className='flex-1 bg-white px-5 sm:px-7 py-8 font-epilogue'>
      <div className='max-w-7xl  grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6'>
        <div className='flex flex-col gap-6'>
          <ProfileSection />
          <AboutSection />
          <ExperiencesSection />
          <EducationsSection />
          <CertificationSection />
          <SkillsSection />
          <ResumesSection />
          <PortfoliosSection />
        </div>

        <div className='flex flex-col gap-6'>
          <AdditionalDetailsSection />
          <SocialLinksSection />
        </div>
      </div>
    </main>
  );
}
