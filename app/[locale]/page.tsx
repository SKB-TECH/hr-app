import PaginationWrapper from "@/components/ReusablePagination/PaginationWrapper";
import ReusableHeroSection from "@/components/ui/HeroSection/ReusableHeroSection";
import { ReusableTittle } from "@/components/ui/ReusableTittle";

const Page = () => {
  return (
    <main className="flex-1 space-y-8 p-6">
      <ReusableHeroSection
        title="Find your  "
        highlight=" dream job"
        subtitle="Find your next career at companies like HubSpot, Nike, and Dropbox"
        searchEnabled={true}
        popularTags={["UI Designer", "UX Researcher", "Android", "Admin"]}
      />
      <PaginationWrapper />
    </main>
  );
};

export default Page;
