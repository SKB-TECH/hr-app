import GreetingFilter from "@/components/dashboard/Company/overview/GreetingFilter";
import QuickStatsBanner from "@/components/dashboard/Company/overview/QuickStatsBanner";
import JobStatisticsSection from "@/components/dashboard/Company/overview/JobStatisticsSection";
import JobOpenCard from "@/components/dashboard/Company/overview/JobOpenCard";
import ApplicantsSummary from "@/components/dashboard/Company/overview/ApplicantsSummary";
import JobUpdatesSection from "@/components/dashboard/Company/overview/JobUpdatesSection";

function Page() {
  return (
    <div className="min-h-screen px-4 sm:px-10 pb-20">
      <GreetingFilter name="Maria" dateRange="Jul 19 - Jul 25" />

      <QuickStatsBanner />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 mt-5">
        <JobStatisticsSection />
        <div className="flex flex-col gap-5">
          <JobOpenCard />
          <ApplicantsSummary />
        </div>
      </div>

      <div className="mt-5">
        <JobUpdatesSection />
      </div>
    </div>
  );
}

export default Page;
