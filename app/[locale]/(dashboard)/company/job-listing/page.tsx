import JobListHeader from "@/components/dashboard/company/job-listing/job-list-header";
import ListJobs from "@/components/dashboard/company/job-listing/list-jobs";

function page() {
  return (
    <div className="flex-1  sm:px-4  lg:px-6 pb-10">
      {/*  header*/}
      <JobListHeader />
      <ListJobs />
    </div>
  );
}

export default page;
