import JobListHeader from "@/components/dashboard/company/job-listing/job-list-header";
import ListJobs from "@/components/dashboard/company/job-listing/list-jobs";

function page() {
  return (
    <div className="min-w-0 flex-1 px-4 pb-10 sm:px-6 lg:px-8">
      {/*  header*/}
      <JobListHeader />
      <ListJobs />
    </div>
  );
}

export default page;
