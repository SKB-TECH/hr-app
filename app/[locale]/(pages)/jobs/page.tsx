import Navbar from "@/components/ui/Navbar";
import ReusableHeroSection from "./HeroSection/ReusableHeroSection";
import PaginationWrapper from "./ReusablePagination/PaginationWrapper";

export default function JobsPage() {
  return (
    <div>
      <Navbar />
      <ReusableHeroSection
        title="Find your  "
        highlight=" dream job"
        subtitle="Find your next career at companies like HubSpot, Nike, and Dropbox"
        searchEnabled={true}
        popularTags={["UI Designer", "UX Researcher", "Android", "Admin"]}
      />
      <PaginationWrapper />
    </div>
  );
}
