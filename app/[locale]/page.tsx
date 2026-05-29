import ReusableHeroSection from "@/components/ui/HeroSection/ReusableHeroSection";
import Navbar from "@/components/common/navbar/Navbar";

const Page = () => {
  return (
    <main className='flex-1 space-y-8'>
      <Navbar />
      <ReusableHeroSection
        title='Find your  '
        highlight=' dream job'
        subtitle='Find your next career at companies like HubSpot, Nike, and Dropbox'
        searchEnabled={true}
        popularTags={["UI Designer", "UX Researcher", "Android", "Admin"]}
      />
    </main>
  );
};

export default Page;
