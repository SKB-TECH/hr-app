
import ReusableHeroSection from "./HeroSection/ReusableHeroSection";
import AllJobs from "./jobSection/AllJobs";
import PaginationWrapper from "./ReusablePagination/PaginationWrapper";


export default function JobsPage() {
  return (
    <div className="">
      <ReusableHeroSection
        title="Find your  "
        highlight=" dream job"
        subtitle="Find your next career at companies like HubSpot, Nike, and Dropbox"
        searchEnabled={true}
        popularTags={["UI Designer", "UX Researcher", "Android", "Admin"]}
      />
      <AllJobs />
      <PaginationWrapper />
    </div>

  );
}
