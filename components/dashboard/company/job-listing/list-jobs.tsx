import DataTableClient from "./data-table-client";
import JobListingCards from "./job-listing-cards";

function ListJobs() {
  return (
    <>
      {/* Desktop: table */}
      <div className="hidden sm:block">
        <DataTableClient />
      </div>

      {/* Mobile: cards */}
      <div className="sm:hidden ">
        <JobListingCards />
      </div>
    </>
  );
}

export default ListJobs;
